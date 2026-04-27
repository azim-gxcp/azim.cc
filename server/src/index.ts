import Fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import rateLimit from "@fastify/rate-limit";
import { config } from "./config.js";
import { authRoutes } from "./routes/auth.js";
import { newsletterRoutes } from "./routes/newsletter.js";
import { commentRoutes } from "./routes/comments.js";
import { adminRoutes } from "./routes/admin.js";
import { settingsRoutes } from "./routes/settings.js";

const app = Fastify({ logger: true });

// CORS for frontend
const origins = [config.frontendUrl];
if (process.env.NODE_ENV !== "production") {
  origins.push("http://localhost:3000");
}
await app.register(cors, {
  origin: origins,
  methods: ["GET", "POST", "DELETE"],
  credentials: true,
});

// Global rate limit (100 req/min per IP), auth routes override below
await app.register(rateLimit, { max: 100, timeWindow: "1 minute" });

// Multipart file uploads (10 MB limit)
await app.register(multipart, { limits: { fileSize: 10_485_760 } });

// Health check
app.get("/api/health", async () => ({
  status: "ok",
  time: new Date().toISOString(),
}));

// Register routes
await app.register(authRoutes);
await app.register(newsletterRoutes);
await app.register(commentRoutes);
await app.register(adminRoutes);
await app.register(settingsRoutes);

// Start
try {
  await app.listen({ port: config.port, host: config.host });
  console.log(`API running on ${config.host}:${config.port}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
