# Featured Articles Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let the admin select up to 3 featured articles displayed on the homepage in a hero + 2 secondary layout.

**Architecture:** New `site_settings` DB table stores a JSON array of featured slugs. Public API serves them; admin API sets them. Homepage fetches the slugs server-side (60s ISR cache), resolves them against the post list, and renders a primary FeatureCard + up to 2 SecondaryFeatureCards.

**Tech Stack:** Fastify + Drizzle (server), Next.js 16 + React (frontend), Zod (validation)

---

### Task 1: Add site_settings table to database schema

**Files:**
- Modify: `server/src/db/schema.ts`

- [ ] **Step 1: Add the siteSettings table definition**

Add to the end of `server/src/db/schema.ts`:

```ts
export const siteSettings = pgTable("site_settings", {
  key: varchar("key", { length: 100 }).primaryKey(),
  value: text("value"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});
```

- [ ] **Step 2: Push schema to database**

Run from `server/`:
```bash
npx drizzle-kit push
```

Expected: table `site_settings` created. No data loss on existing tables.

- [ ] **Step 3: Commit**

```bash
git add server/src/db/schema.ts
git commit -m "feat: add site_settings table for key-value config"
```

---

### Task 2: Add public settings route (GET /api/settings/featured)

**Files:**
- Create: `server/src/routes/settings.ts`
- Modify: `server/src/index.ts`

- [ ] **Step 1: Create settings route file**

Create `server/src/routes/settings.ts`:

```ts
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
```

- [ ] **Step 2: Register the route in index.ts**

In `server/src/index.ts`, add the import after the existing route imports:

```ts
import { settingsRoutes } from "./routes/settings.js";
```

Add registration after the existing `await app.register(adminRoutes);` line:

```ts
await app.register(settingsRoutes);
```

- [ ] **Step 3: Build and verify**

Run from `server/`:
```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add server/src/routes/settings.ts server/src/index.ts
git commit -m "feat: add GET /api/settings/featured public endpoint"
```

---

### Task 3: Add admin endpoints (POST featured + GET posts list)

**Files:**
- Modify: `server/src/routes/admin.ts`

- [ ] **Step 1: Add siteSettings import**

In `server/src/routes/admin.ts`, add `siteSettings` to the existing schema import:

```ts
import { comments, subscribers, sentNewsletters, siteSettings } from "../db/schema.js";
```

- [ ] **Step 2: Add the featured slugs schema and POST endpoint**

Add inside the `adminRoutes` function, after the existing stats endpoint and before the publish endpoint:

```ts
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
```

- [ ] **Step 3: Add GET /api/admin/posts endpoint**

Add right after the POST endpoint above:

```ts
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
      .filter(Boolean)
      .sort((a: { date: string }, b: { date: string }) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
  });
```

Add the `path` import at the top of the file (with the other imports):

```ts
import path from "path";
```

- [ ] **Step 4: Build and verify**

Run from `server/`:
```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add server/src/routes/admin.ts
git commit -m "feat: add admin endpoints for featured articles and post listing"
```

---

### Task 4: Add frontend API functions

**Files:**
- Modify: `src/lib/api.ts`

- [ ] **Step 1: Add the three new API functions**

Add at the end of `src/lib/api.ts`, before the closing of the file:

```ts
// --- Featured articles ---

export function getFeaturedSlugs() {
  return apiFetch<{ slugs: string[] }>("/api/settings/featured");
}

export function setFeaturedSlugs(slugs: string[]) {
  return apiFetch<{ message: string }>("/api/admin/settings/featured", {
    method: "POST",
    body: JSON.stringify({ slugs }),
  });
}

export interface AdminPost {
  slug: string;
  title: string;
  date: string;
}

export function getAdminPosts() {
  return apiFetch<AdminPost[]>("/api/admin/posts");
}
```

- [ ] **Step 2: Type-check**

Run from repo root:
```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/api.ts
git commit -m "feat: add API functions for featured articles"
```

---

### Task 5: Create SecondaryFeatureCard component

**Files:**
- Create: `src/components/secondary-feature-card.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/secondary-feature-card.tsx`:

```tsx
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export function SecondaryFeatureCard({ post }: { post: PostMeta }) {
  const kickerColor =
    post.kicker === "Economics" || post.kicker === "Finance"
      ? "var(--green-5)"
      : "var(--brand)";

  return (
    <Link href={`/blog/${post.slug}`} className="block no-underline group">
      <article
        className="h-full transition-all duration-200 group-hover:-translate-y-0.5"
        style={{
          background: "var(--bg-elev)",
          borderRadius: "10px",
          padding: "clamp(24px, 3vw, 32px)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "11px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: kickerColor,
            marginBottom: "12px",
          }}
        >
          {post.kicker} &middot; {post.readTime} min
        </div>
        <h3
          className="m-0 mb-2 group-hover:text-[var(--brand)] transition-colors duration-150"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: "-0.015em",
            fontVariationSettings: "'opsz' 72",
            color: "var(--fg1)",
          }}
        >
          {post.title}
        </h3>
        <p
          className="m-0 mb-3"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            lineHeight: 1.55,
            color: "var(--fg2)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.lede}
        </p>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            color: "var(--fg3)",
            fontStyle: "italic",
          }}
        >
          {post.date}
        </div>
      </article>
    </Link>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/secondary-feature-card.tsx
git commit -m "feat: add SecondaryFeatureCard component"
```

---

### Task 6: Update homepage to display 3 featured articles

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace the homepage with featured resolution logic**

Replace the entire contents of `src/app/page.tsx`:

```tsx
import { getAllPosts, type PostMeta } from "@/lib/posts";
import { Hero } from "@/components/hero";
import { FeatureCard } from "@/components/feature-card";
import { SecondaryFeatureCard } from "@/components/secondary-feature-card";
import { ArticleCard } from "@/components/article-card";
import { ArticleGrid } from "@/components/article-grid";
import { NewsletterForm } from "@/components/newsletter-form";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.azim.cc";

async function getFeaturedSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${API_URL}/api/settings/featured`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.slugs) ? data.slugs : [];
  } catch {
    return [];
  }
}

function resolveFeatured(
  posts: PostMeta[],
  slugs: string[],
  count: number
): PostMeta[] {
  const result: PostMeta[] = [];
  const used = new Set<string>();

  for (const slug of slugs) {
    if (result.length >= count) break;
    const post = posts.find((p) => p.slug === slug);
    if (post) {
      result.push(post);
      used.add(slug);
    }
  }

  for (const post of posts) {
    if (result.length >= count) break;
    if (!used.has(post.slug)) {
      result.push(post);
      used.add(post.slug);
    }
  }

  return result;
}

export default async function HomePage() {
  const posts = getAllPosts();
  const featuredSlugs = await getFeaturedSlugs();

  const featured = resolveFeatured(posts, featuredSlugs, 3);
  const primary = featured[0];
  const secondary = featured.slice(1);
  const rest = posts.filter((p) => !featured.some((f) => f.slug === p.slug));

  return (
    <>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-14 pb-24">
        <Hero />

        {primary && <FeatureCard post={primary} />}

        {secondary.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                secondary.length === 1 ? "1fr" : "repeat(2, 1fr)",
              gap: "16px",
              marginBottom: "72px",
              marginTop: "-40px",
            }}
            className="secondary-featured-grid"
          >
            {secondary.map((post) => (
              <SecondaryFeatureCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        {rest.length > 0 && (
          <ArticleGrid>
            {rest.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </ArticleGrid>
        )}

        <NewsletterForm variant="soft" />
      </div>
    </>
  );
}
```

- [ ] **Step 2: Add responsive CSS for the secondary grid**

Add to the end of `src/app/globals.css`:

```css
@media (max-width: 640px) {
  .secondary-featured-grid {
    grid-template-columns: 1fr !important;
  }
}
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx src/app/globals.css
git commit -m "feat: homepage displays up to 3 featured articles with fallback"
```

---

### Task 7: Add featured article selector to admin dashboard

**Files:**
- Modify: `src/app/admin/page.tsx`

- [ ] **Step 1: Add imports and state for the featured selector**

In `src/app/admin/page.tsx`, update the imports:

```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { RequireAdmin, useAuth } from "@/lib/admin-auth";
import {
  getAdminStats,
  type AdminStats,
  getFeaturedSlugs,
  setFeaturedSlugs,
  getAdminPosts,
  type AdminPost,
  ApiError,
} from "@/lib/api";
```

- [ ] **Step 2: Add featured state and handlers inside DashboardContent**

Add these state declarations after the existing `stats` state inside `DashboardContent`:

```tsx
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [slots, setSlots] = useState<[string, string, string]>(["", "", ""]);
  const [featuredSaving, setFeaturedSaving] = useState(false);
  const [featuredFeedback, setFeaturedFeedback] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
```

Update the existing `useEffect` to also load posts and featured slugs:

```tsx
  useEffect(() => {
    getAdminStats().then(setStats).catch(() => {});
    getAdminPosts().then(setPosts).catch(() => {});
    getFeaturedSlugs()
      .then((data) => {
        const s = data.slugs || [];
        setSlots([s[0] || "", s[1] || "", s[2] || ""]);
      })
      .catch(() => {});
  }, []);

  async function handleSaveFeatured() {
    setFeaturedSaving(true);
    setFeaturedFeedback(null);
    try {
      const slugs = slots.filter((s) => s !== "");
      await setFeaturedSlugs(slugs);
      setFeaturedFeedback({ message: "Featured articles updated", type: "success" });
      setTimeout(() => setFeaturedFeedback(null), 3000);
    } catch (err) {
      setFeaturedFeedback({
        message: err instanceof ApiError ? err.message : "Failed to save",
        type: "error",
      });
    } finally {
      setFeaturedSaving(false);
    }
  }

  function updateSlot(index: number, value: string) {
    setSlots((prev) => {
      const next = [...prev] as [string, string, string];
      next[index] = value;
      return next;
    });
  }
```

- [ ] **Step 3: Add the featured articles section to the JSX**

Add this block between the stats grid `</div>` and the quick links `<div>` (after the closing `</div>` of the stats grid, around line 122 in the current file):

```tsx
      {/* Featured articles */}
      <div style={{ ...cardStyle, marginBottom: "32px" }}>
        <h2
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--fg1)",
            margin: "0 0 16px",
          }}
        >
          Featured Articles
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {(["Primary", "Secondary 1", "Secondary 2"] as const).map(
            (label, i) => {
              const selectedElsewhere = slots.filter(
                (s, j) => j !== i && s !== ""
              );
              return (
                <div key={label}>
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "var(--fg3)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    {label}
                  </label>
                  <select
                    value={slots[i]}
                    onChange={(e) => updateSlot(i, e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      fontSize: "14px",
                      fontFamily: "var(--font-body)",
                      background: "var(--bg-elev)",
                      border: "1px solid var(--border)",
                      borderRadius: "4px",
                      color: "var(--fg1)",
                    }}
                  >
                    <option value="">Auto (latest)</option>
                    {posts.map((p) => (
                      <option
                        key={p.slug}
                        value={p.slug}
                        disabled={selectedElsewhere.includes(p.slug)}
                      >
                        {p.title} ({p.date})
                      </option>
                    ))}
                  </select>
                </div>
              );
            }
          )}
          {featuredFeedback && (
            <p
              style={{
                fontSize: "13px",
                margin: 0,
                color:
                  featuredFeedback.type === "success" ? "#22c55e" : "#dc2626",
              }}
            >
              {featuredFeedback.message}
            </p>
          )}
          <button
            onClick={handleSaveFeatured}
            disabled={featuredSaving}
            style={{
              fontSize: "14px",
              fontWeight: 600,
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              background: "var(--brand)",
              color: "var(--fg-inverse)",
              cursor: featuredSaving ? "not-allowed" : "pointer",
              opacity: featuredSaving ? 0.7 : 1,
              fontFamily: "var(--font-body)",
              alignSelf: "flex-start",
            }}
          >
            {featuredSaving ? "Saving..." : "Save featured"}
          </button>
        </div>
      </div>
```

- [ ] **Step 4: Type-check**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/admin/page.tsx
git commit -m "feat: add featured article selector to admin dashboard"
```

---

### Task 8: Push schema to production and deploy

- [ ] **Step 1: Push all commits**

```bash
git push origin main
```

- [ ] **Step 2: On VPS5 Hosting Terminal, pull and deploy**

```bash
cd /var/www/azim.cc && git pull --ff-only && cd server && npm install && npx drizzle-kit push && npm run build && pm2 restart azim-api --update-env
```

The `drizzle-kit push` creates the `site_settings` table in production.

- [ ] **Step 3: Verify from local machine**

```bash
curl -s https://api.azim.cc/api/settings/featured
```

Expected: `{"slugs":[]}`

- [ ] **Step 4: Commit deploy script if needed (no code change, just verification)**

No commit needed. Deployment verified.
