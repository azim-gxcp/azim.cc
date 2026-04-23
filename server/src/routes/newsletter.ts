import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { eq, and, isNull } from "drizzle-orm";
import { db } from "../db/index.js";
import { subscribers } from "../db/schema.js";
import { sendEmail } from "../email/send.js";
import { confirmationEmail, welcomeEmail } from "../email/templates.js";
import { verifyTurnstile } from "../middleware/turnstile.js";
import { config } from "../config.js";

const subscribeSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  turnstileToken: z.string(),
});

export async function newsletterRoutes(app: FastifyInstance) {
  app.post(
    "/api/newsletter/subscribe",
    { preHandler: verifyTurnstile },
    async (request, reply) => {
      const parsed = subscribeSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({ error: "Invalid email address" });
      }

      const { email, name } = parsed.data;

      // Check if already subscribed
      const [existing] = await db
        .select()
        .from(subscribers)
        .where(eq(subscribers.email, email))
        .limit(1);

      if (existing) {
        if (existing.confirmed && !existing.unsubscribedAt) {
          return reply.status(409).send({ error: "Email already subscribed" });
        }

        // Re-subscribe: reset unsubscribed status and send new confirmation
        if (existing.unsubscribedAt) {
          const newToken = crypto.randomUUID();
          await db
            .update(subscribers)
            .set({
              confirmed: false,
              confirmToken: newToken,
              unsubscribedAt: null,
              name: name || existing.name,
            })
            .where(eq(subscribers.id, existing.id));

          const emailContent = confirmationEmail(newToken);
          await sendEmail({ to: email, ...emailContent });

          return { message: "Check your email to confirm your subscription" };
        }

        // Already pending confirmation, resend
        if (existing.confirmToken) {
          const emailContent = confirmationEmail(existing.confirmToken);
          await sendEmail({ to: email, ...emailContent });
        }

        return { message: "Check your email to confirm your subscription" };
      }

      // New subscriber
      const [sub] = await db
        .insert(subscribers)
        .values({ email, name })
        .returning({ confirmToken: subscribers.confirmToken });

      if (sub?.confirmToken) {
        const emailContent = confirmationEmail(sub.confirmToken);
        await sendEmail({ to: email, ...emailContent });
      }

      return { message: "Check your email to confirm your subscription" };
    }
  );

  app.get("/api/newsletter/confirm/:token", async (request, reply) => {
    const { token } = request.params as { token: string };

    const [sub] = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.confirmToken, token))
      .limit(1);

    if (!sub) {
      return reply.redirect(`${config.frontendUrl}/newsletter?status=invalid`);
    }

    if (sub.confirmed) {
      return reply.redirect(`${config.frontendUrl}/newsletter?status=already`);
    }

    await db
      .update(subscribers)
      .set({ confirmed: true })
      .where(eq(subscribers.id, sub.id));

    // Send welcome email
    const welcome = welcomeEmail();
    await sendEmail({ to: sub.email, ...welcome });

    return reply.redirect(`${config.frontendUrl}/newsletter?status=confirmed`);
  });

  app.get("/api/newsletter/unsubscribe/:token", async (request, reply) => {
    const { token } = request.params as { token: string };

    const [sub] = await db
      .select()
      .from(subscribers)
      .where(
        and(
          eq(subscribers.confirmToken, token),
          isNull(subscribers.unsubscribedAt)
        )
      )
      .limit(1);

    if (!sub) {
      return reply.redirect(
        `${config.frontendUrl}/newsletter?status=not-found`
      );
    }

    await db
      .update(subscribers)
      .set({ unsubscribedAt: new Date() })
      .where(eq(subscribers.id, sub.id));

    return reply.redirect(
      `${config.frontendUrl}/newsletter?status=unsubscribed`
    );
  });
}
