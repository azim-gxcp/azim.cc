import type { FastifyInstance } from "fastify";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { siteSettings } from "../db/schema.js";

export async function settingsRoutes(app: FastifyInstance) {
  app.get("/api/settings/featured", async () => {
    const [row] = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, "featured_slugs"))
      .limit(1);

    if (!row?.value) {
      return { slugs: [] };
    }

    try {
      const slugs = JSON.parse(row.value);
      return { slugs: Array.isArray(slugs) ? slugs : [] };
    } catch {
      return { slugs: [] };
    }
  });
}
