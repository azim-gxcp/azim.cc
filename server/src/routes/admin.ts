import type { FastifyInstance } from "fastify";
import { eq, and, isNull, desc, count, sql } from "drizzle-orm";
import { db } from "../db/index.js";
import { comments, subscribers, sentNewsletters } from "../db/schema.js";
import { requireAdmin } from "../middleware/auth.js";
import { sendBatch } from "../email/send.js";
import { newsletterEmail } from "../email/templates.js";
import { config } from "../config.js";

export async function adminRoutes(app: FastifyInstance) {
  // All admin routes require admin role
  app.addHook("preHandler", requireAdmin);

  // Pending comments
  app.get("/api/admin/comments/pending", async () => {
    const results = await db
      .select()
      .from(comments)
      .where(eq(comments.approved, false))
      .orderBy(desc(comments.createdAt));

    return results;
  });

  // Approve a comment
  app.post("/api/admin/comments/:id/approve", async (request, reply) => {
    const { id } = request.params as { id: string };

    const [updated] = await db
      .update(comments)
      .set({ approved: true })
      .where(eq(comments.id, id))
      .returning({ id: comments.id });

    if (!updated) {
      return reply.status(404).send({ error: "Comment not found" });
    }

    return { message: "Comment approved" };
  });

  // Delete a comment
  app.delete("/api/admin/comments/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    const [deleted] = await db
      .delete(comments)
      .where(eq(comments.id, id))
      .returning({ id: comments.id });

    if (!deleted) {
      return reply.status(404).send({ error: "Comment not found" });
    }

    return { message: "Comment deleted" };
  });

  // Send newsletter for a post
  app.post("/api/admin/newsletter/send/:slug", async (request, reply) => {
    const { slug } = request.params as { slug: string };
    const body = request.body as { title: string; lede: string } | undefined;

    if (!body?.title || !body?.lede) {
      return reply
        .status(400)
        .send({ error: "Post title and lede are required" });
    }

    // Check if already sent
    const [existing] = await db
      .select()
      .from(sentNewsletters)
      .where(eq(sentNewsletters.postSlug, slug))
      .limit(1);

    if (existing) {
      return reply.status(409).send({
        error: "Newsletter already sent for this post",
        sentAt: existing.sentAt,
      });
    }

    // Get confirmed, active subscribers
    const activeSubscribers = await db
      .select({
        email: subscribers.email,
        confirmToken: subscribers.confirmToken,
      })
      .from(subscribers)
      .where(
        and(
          eq(subscribers.confirmed, true),
          isNull(subscribers.unsubscribedAt)
        )
      );

    if (activeSubscribers.length === 0) {
      return reply.status(404).send({ error: "No active subscribers" });
    }

    // Send emails in batches
    // Each subscriber gets their own unsubscribe link
    let sentCount = 0;
    const batchSize = 50;

    for (let i = 0; i < activeSubscribers.length; i += batchSize) {
      const batch = activeSubscribers.slice(i, i + batchSize);
      await Promise.all(
        batch.map((sub) => {
          const email = newsletterEmail(
            body.title,
            body.lede,
            slug,
            sub.confirmToken || ""
          );
          return import("../email/send.js").then((m) =>
            m.sendEmail({ to: sub.email, ...email })
          );
        })
      );
      sentCount += batch.length;

      if (i + batchSize < activeSubscribers.length) {
        await new Promise((r) => setTimeout(r, 1000));
      }
    }

    // Record the send
    await db.insert(sentNewsletters).values({
      postSlug: slug,
      recipientCount: sentCount,
    });

    return {
      message: `Newsletter sent to ${sentCount} subscribers`,
      recipientCount: sentCount,
    };
  });

  // List subscribers
  app.get("/api/admin/subscribers", async () => {
    const results = await db
      .select({
        id: subscribers.id,
        email: subscribers.email,
        name: subscribers.name,
        confirmed: subscribers.confirmed,
        createdAt: subscribers.createdAt,
        unsubscribedAt: subscribers.unsubscribedAt,
      })
      .from(subscribers)
      .orderBy(desc(subscribers.createdAt));

    return results;
  });

  // Dashboard stats
  app.get("/api/admin/stats", async () => {
    const [subStats] = await db
      .select({
        total: count(),
        confirmed: count(
          sql`CASE WHEN ${subscribers.confirmed} = true AND ${subscribers.unsubscribedAt} IS NULL THEN 1 END`
        ),
      })
      .from(subscribers);

    const [commentStats] = await db
      .select({
        total: count(),
        pending: count(
          sql`CASE WHEN ${comments.approved} = false THEN 1 END`
        ),
      })
      .from(comments);

    const [newsletterStats] = await db
      .select({ total: count() })
      .from(sentNewsletters);

    return {
      subscribers: {
        total: subStats?.total || 0,
        active: subStats?.confirmed || 0,
      },
      comments: {
        total: commentStats?.total || 0,
        pending: commentStats?.pending || 0,
      },
      newslettersSent: newsletterStats?.total || 0,
    };
  });
}
