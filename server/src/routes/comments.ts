import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { eq, and, desc } from "drizzle-orm";
import { db } from "../db/index.js";
import { comments } from "../db/schema.js";
import { verifyTurnstile } from "../middleware/turnstile.js";

const submitSchema = z.object({
  postSlug: z.string().min(1).max(200),
  authorName: z.string().min(1).max(100),
  authorEmail: z.string().email().max(200),
  body: z.string().min(1).max(5000),
  turnstileToken: z.string(),
});

export async function commentRoutes(app: FastifyInstance) {
  // Fetch approved comments for a post
  app.get("/api/comments/:slug", async (request) => {
    const { slug } = request.params as { slug: string };

    const results = await db
      .select({
        id: comments.id,
        authorName: comments.authorName,
        body: comments.body,
        createdAt: comments.createdAt,
      })
      .from(comments)
      .where(and(eq(comments.postSlug, slug), eq(comments.approved, true)))
      .orderBy(desc(comments.createdAt));

    return results;
  });

  // Submit a new comment (requires Turnstile)
  app.post(
    "/api/comments",
    { preHandler: verifyTurnstile },
    async (request, reply) => {
      const parsed = submitSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({
          error: "Invalid comment data",
          details: parsed.error.flatten().fieldErrors,
        });
      }

      const { postSlug, authorName, authorEmail, body } = parsed.data;

      await db.insert(comments).values({
        postSlug,
        authorName,
        authorEmail,
        body,
      });

      return { message: "Your comment has been submitted for moderation" };
    }
  );
}
