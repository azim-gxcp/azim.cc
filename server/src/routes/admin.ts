import type { FastifyInstance, FastifyReply } from "fastify";
import path from "path";
import { eq, and, isNull, desc, count, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db/index.js";

function parseUuid(raw: string, reply: FastifyReply) {
  const result = z.string().uuid().safeParse(raw);
  if (!result.success) {
    reply.status(400).send({ error: "Invalid ID format" });
    return null;
  }
  return result.data;
}
import { comments, subscribers, sentNewsletters, siteSettings } from "../db/schema.js";
import { requireAdmin } from "../middleware/auth.js";
import { sendBatch } from "../email/send.js";
import { newsletterEmail } from "../email/templates.js";
import { config } from "../config.js";
import {
  createFile,
  getFileContent,
  updateFile,
  fileExists,
  appendToLlmsTxt,
} from "../lib/github.js";

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

  // Approved comments
  app.get("/api/admin/comments/approved", async () => {
    const results = await db
      .select()
      .from(comments)
      .where(eq(comments.approved, true))
      .orderBy(desc(comments.createdAt));

    return results;
  });

  // Approve a comment
  app.post("/api/admin/comments/:id/approve", async (request, reply) => {
    const id = parseUuid((request.params as { id: string }).id, reply);
    if (!id) return;

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
    const id = parseUuid((request.params as { id: string }).id, reply);
    if (!id) return;

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

  // Activate a subscriber (confirm + clear unsubscribed)
  app.post("/api/admin/subscribers/:id/activate", async (request, reply) => {
    const id = parseUuid((request.params as { id: string }).id, reply);
    if (!id) return;

    const [updated] = await db
      .update(subscribers)
      .set({ confirmed: true, unsubscribedAt: null })
      .where(eq(subscribers.id, id))
      .returning({ id: subscribers.id });

    if (!updated) {
      return reply.status(404).send({ error: "Subscriber not found" });
    }

    return { message: "Subscriber activated" };
  });

  // Deactivate a subscriber (set unsubscribedAt)
  app.post("/api/admin/subscribers/:id/deactivate", async (request, reply) => {
    const id = parseUuid((request.params as { id: string }).id, reply);
    if (!id) return;

    const [updated] = await db
      .update(subscribers)
      .set({ unsubscribedAt: new Date() })
      .where(eq(subscribers.id, id))
      .returning({ id: subscribers.id });

    if (!updated) {
      return reply.status(404).send({ error: "Subscriber not found" });
    }

    return { message: "Subscriber deactivated" };
  });

  // Delete a subscriber permanently
  app.delete("/api/admin/subscribers/:id", async (request, reply) => {
    const id = parseUuid((request.params as { id: string }).id, reply);
    if (!id) return;

    const [deleted] = await db
      .delete(subscribers)
      .where(eq(subscribers.id, id))
      .returning({ id: subscribers.id });

    if (!deleted) {
      return reply.status(404).send({ error: "Subscriber not found" });
    }

    return { message: "Subscriber deleted" };
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

  // Update featured articles
  const featuredSchema = z.object({
    slugs: z
      .array(z.string().min(1).max(200))
      .max(3)
      .refine((arr) => new Set(arr).size === arr.length, {
        message: "Duplicate slugs are not allowed",
      }),
  });

  app.post("/api/admin/settings/featured", async (request, reply) => {
    const parsed = featuredSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: parsed.error.issues[0]?.message || "Invalid request" });
    }

    const { slugs } = parsed.data;
    const value = slugs.length > 0 ? JSON.stringify(slugs) : null;

    await db
      .insert(siteSettings)
      .values({ key: "featured_slugs", value, updatedAt: new Date() })
      .onConflictDoUpdate({
        target: siteSettings.key,
        set: { value, updatedAt: new Date() },
      });

    return { message: "Featured articles updated" };
  });

  // List published posts
  app.get("/api/admin/posts", async () => {
    const postsDir = path.join(process.cwd(), "..", "content", "posts");
    const fs = await import("fs");
    const matter = (await import("gray-matter")).default;

    if (!fs.existsSync(postsDir)) return [];

    const files = fs.readdirSync(postsDir).filter((f: string) => f.endsWith(".mdx"));

    return files
      .map((filename: string) => {
        const slug = filename.replace(/\.mdx$/, "");
        const raw = fs.readFileSync(path.join(postsDir, filename), "utf8");
        const { data } = matter(raw);
        if (data.published === false) return null;
        return { slug, title: data.title || slug, date: data.date || "" };
      })
      .filter((x): x is { slug: string; title: string; date: string } => x !== null)
      .sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
  });

  // Publish article
  const publishSchema = z.object({
    title: z.string().min(1),
    lede: z.string().min(1),
    kicker: z.enum([
      "Islamic Finance",
      "Economics",
      "Finance",
      "Crypto",
      "Education",
      "Unfiltered",
    ]),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    keywords: z.string().optional(),
  });

  app.post("/api/admin/publish", async (request, reply) => {
    const parts = request.parts();

    let fileBuffer: Buffer | null = null;
    let fileName = "";
    const fields: Record<string, string> = {};

    for await (const part of parts) {
      if (part.type === "file") {
        fileBuffer = await part.toBuffer();
        fileName = part.filename;
      } else {
        fields[part.fieldname] = part.value as string;
      }
    }

    if (!fileBuffer || !fileName) {
      return reply.status(400).send({ error: "File is required" });
    }

    // Validate fields
    const parsed = publishSchema.safeParse(fields);
    if (!parsed.success) {
      return reply.status(400).send({
        error: "Validation failed",
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const { title, lede, kicker, date, keywords } = parsed.data;

    // Extract text content from file
    let content: string;
    const ext = fileName.split(".").pop()?.toLowerCase();

    if (ext === "pdf") {
      const pdfParse = await import("pdf-parse");
      const result = await (pdfParse as unknown as (buf: Buffer) => Promise<{ text: string }>)(fileBuffer);
      content = result.text;
    } else if (ext === "md" || ext === "mdx") {
      const matter = (await import("gray-matter")).default;
      const { content: body } = matter(fileBuffer.toString("utf-8"));
      content = body;
    } else if (ext === "txt") {
      content = fileBuffer.toString("utf-8");
    } else {
      return reply
        .status(400)
        .send({ error: "Unsupported file type. Use .pdf, .md, or .txt" });
    }

    // Clean content
    content = content
      .replace(/\u2014/g, ",") // em dashes to commas
      .replace(/\u2013/g, "-") // en dashes to hyphens
      .replace(/\u2018|\u2019/g, "'") // smart single quotes
      .replace(/\u201C|\u201D/g, '"') // smart double quotes
      .replace(/\r\n/g, "\n") // normalize line endings
      .replace(/\r/g, "\n");

    // Remove leading H1 if it matches the title
    const h1Pattern = new RegExp(
      `^#\\s+${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\n+`,
      "i"
    );
    content = content.replace(h1Pattern, "");

    // Generate slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    // Check if slug already exists
    const exists = await fileExists(`content/posts/${slug}.mdx`);
    if (exists) {
      return reply
        .status(409)
        .send({ error: `Article with slug "${slug}" already exists` });
    }

    // Build keywords array
    const keywordArray = keywords
      ? keywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean)
      : [];

    // Build MDX content
    const keywordsYaml =
      keywordArray.length > 0
        ? `keywords: [${keywordArray.map((k) => `"${k}"`).join(", ")}]`
        : `keywords: []`;

    const mdxContent = `---
title: "${title.replace(/"/g, '\\"')}"
lede: "${lede.replace(/"/g, '\\"')}"
kicker: "${kicker}"
author: "M Azim Abdul Majeed"
date: "${date}"
published: true
${keywordsYaml}
---

${content.trim()}
`;

    // Commit MDX file to GitHub
    await createFile(
      `content/posts/${slug}.mdx`,
      mdxContent,
      `feat: publish "${title}"`
    );

    // Update llms.txt
    try {
      const { content: llmsContent, sha } =
        await getFileContent("public/llms.txt");
      const updatedLlms = appendToLlmsTxt(llmsContent, title, slug, lede);
      await updateFile(
        "public/llms.txt",
        updatedLlms,
        sha,
        `docs: add "${title}" to llms.txt`
      );
    } catch (err) {
      // Article was published, llms.txt update failed - not critical
      app.log.warn(err, "Failed to update llms.txt");
    }

    return {
      message: "Article published",
      slug,
      url: `${config.frontendUrl}/blog/${slug}`,
    };
  });
}
