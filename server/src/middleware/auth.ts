import type { FastifyRequest, FastifyReply } from "fastify";
import { jwtVerify } from "jose";
import { config } from "../config.js";

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

const secret = new TextEncoder().encode(config.jwt.secret);

export async function requireAuth(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const header = request.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return reply.status(401).send({ error: "Missing authorization token" });
  }

  const token = header.slice(7);
  try {
    const { payload } = await jwtVerify(token, secret, {
      issuer: config.jwt.issuer,
    });

    (request as FastifyRequest & { user: JwtPayload }).user = {
      sub: payload.sub as string,
      email: payload.email as string,
      role: payload.role as string,
    };
  } catch {
    return reply.status(401).send({ error: "Invalid or expired token" });
  }
}

export async function requireAdmin(
  request: FastifyRequest,
  reply: FastifyReply
) {
  await requireAuth(request, reply);
  if (reply.sent) return;

  const user = (request as FastifyRequest & { user: JwtPayload }).user;
  if (user.role !== "admin") {
    return reply.status(403).send({ error: "Admin access required" });
  }
}
