import type { FastifyRequest, FastifyReply } from "fastify";
import { config } from "../config.js";

interface TurnstileResponse {
  success: boolean;
  "error-codes"?: string[];
}

export async function verifyTurnstile(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = request.body as Record<string, unknown>;
  const token = body?.turnstileToken;

  if (!token || typeof token !== "string") {
    return reply.status(400).send({ error: "Missing captcha token" });
  }

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: config.turnstileSecret,
        response: token,
      }),
    }
  );

  const data = (await res.json()) as TurnstileResponse;

  if (!data.success) {
    return reply
      .status(403)
      .send({ error: "Captcha verification failed" });
  }
}
