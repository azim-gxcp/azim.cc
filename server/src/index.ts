import Fastify from "fastify";
import cors from "@fastify/cors";
import { config } from "./config.js";
import { authRoutes } from "./routes/auth.js";
import { newsletterRoutes } from "./routes/newsletter.js";
import { commentRoutes } from "./routes/comments.js";
import { adminRoutes } from "./routes/admin.js";

const app = Fastify({ logger: true });

// CORS for frontend
await app.register(cors, {
  origin: [config.frontendUrl, "http://localhost:3000"],
  methods: ["GET", "POST", "DELETE"],
  credentials: true,
});

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

// Start
try {
  await app.listen({ port: config.port, host: config.host });
  console.log(`API running on ${config.host}:${config.port}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
