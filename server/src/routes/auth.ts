import type { FastifyInstance } from "fastify";
import { z } from "zod";
import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import { config } from "../config.js";
import { requireAuth } from "../middleware/auth.js";

const secret = new TextEncoder().encode(config.jwt.secret);

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const refreshSchema = z.object({
  refreshToken: z.string(),
});

async function createTokens(userId: string, email: string, role: string) {
  const accessToken = await new SignJWT({ email, role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuer(config.jwt.issuer)
    .setExpirationTime(config.jwt.accessTtl)
    .sign(secret);

  const refreshToken = await new SignJWT({ email, role, type: "refresh" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuer(config.jwt.issuer)
    .setExpirationTime(config.jwt.refreshTtl)
    .sign(secret);

  return { accessToken, refreshToken };
}

export async function authRoutes(app: FastifyInstance) {
  app.post("/api/auth/login", {
    config: { rateLimit: { max: 5, timeWindow: "1 minute" } },
  }, async (request, reply) => {
    const parsed = loginSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: "Invalid email or password format" });
    }

    const { email, password } = parsed.data;

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      return reply.status(401).send({ error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return reply.status(401).send({ error: "Invalid credentials" });
    }

    const tokens = await createTokens(user.id, user.email, user.role);

    return {
      ...tokens,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    };
  });

  app.post("/api/auth/refresh", {
    config: { rateLimit: { max: 30, timeWindow: "1 hour" } },
  }, async (request, reply) => {
    const parsed = refreshSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: "Missing refresh token" });
    }

    try {
      const { payload } = await jwtVerify(parsed.data.refreshToken, secret, {
        issuer: config.jwt.issuer,
      });

      if (payload.type !== "refresh") {
        return reply.status(401).send({ error: "Invalid token type" });
      }

      const tokens = await createTokens(
        payload.sub as string,
        payload.email as string,
        payload.role as string
      );

      return tokens;
    } catch {
      return reply.status(401).send({ error: "Invalid or expired refresh token" });
    }
  });

  app.get(
    "/api/auth/me",
    { preHandler: requireAuth },
    async (request) => {
      const user = (request as typeof request & { user: { sub: string; email: string; role: string } }).user;

      const [dbUser] = await db
        .select({
          id: users.id,
          email: users.email,
          name: users.name,
          role: users.role,
        })
        .from(users)
        .where(eq(users.id, user.sub))
        .limit(1);

      if (!dbUser) {
        return { error: "User not found" };
      }

      return dbUser;
    }
  );
}
