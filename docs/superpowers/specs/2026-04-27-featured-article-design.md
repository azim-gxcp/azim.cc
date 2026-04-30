# Featured Article Selection

## Problem

The homepage always features the latest published article. There is no way to manually select featured posts, and the featured section only shows one article.

## Solution

Store up to 3 featured article slugs (ordered) in a database settings table. Expose them via a public API endpoint. Let the admin select them from the dashboard. The homepage reads the setting and displays a primary featured card plus up to 2 secondary cards beneath it. If fewer than 3 are selected, or if any slug is stale, the system fills remaining slots from the latest articles.

## Database

New `site_settings` table:

| Column | Type | Constraints |
|--------|------|-------------|
| key | varchar(100) | PRIMARY KEY |
| value | text | nullable |
| updated_at | timestamp with timezone | default now() |

One row: `key = "featured_slugs"`, `value` is a JSON array of 1-3 slugs:

```json
["the-great-liberation", "equity-without-illusion", "the-reckoning-of-privilege"]
```

Array position determines role: index 0 = primary, index 1-2 = secondary. An empty array or null means "auto" (latest 3 articles).

This table is intentionally generic (key-value) so future site-wide settings can reuse it without schema changes.

## API Endpoints

### GET /api/settings/featured

Public. No authentication required.

**Response (featured set):**
```json
{ "slugs": ["the-great-liberation", "equity-without-illusion", "the-reckoning-of-privilege"] }
```

**Response (not set / auto):**
```json
{ "slugs": [] }
```

### POST /api/admin/settings/featured

Admin-only (behind `requireAdmin` middleware).

**Request body:**
```json
{ "slugs": ["the-great-liberation", "equity-without-illusion"] }
```

- Array of 0 to 3 slug strings, each max 200 chars.
- Send `{ "slugs": [] }` to clear overrides and revert to auto.
- Duplicates are rejected (400).
- Validated with Zod: `z.object({ slugs: z.array(z.string().max(200)).max(3) })` plus a uniqueness check.

**Response:**
```json
{ "message": "Featured articles updated" }
```

### GET /api/admin/posts

Admin-only. Returns all published posts for the dropdown.

**Response:**
```json
[
  { "slug": "the-great-liberation", "title": "The Great Liberation", "date": "2026-04-19" },
  ...
]
```

## Admin UI

Add a "Featured Articles" section to the existing admin dashboard page (`/admin`).

Components:
- **3 dropdown slots** labeled "Primary", "Secondary 1", "Secondary 2"
- Each dropdown lists all published articles (sorted by date descending), showing `title (YYYY-MM-DD)`
- First option in each: "Auto (latest)" with empty value
- Already-selected slugs are disabled in the other dropdowns to prevent duplicates
- A "Save" button that POSTs the array of non-empty slugs
- Success/error feedback inline (same pattern as existing admin UI)

Behavior:
- On page load, fetch current featured slugs + full post list
- Pre-select the current values in each dropdown
- If a slot is "Auto", it's excluded from the saved array. E.g., if only the primary is set and the others are auto, the saved array has 1 element.

## Homepage Layout

### Current
One large `FeatureCard` for the latest article, followed by `ArticleCard` grid for the rest.

### New: Hero + 2 Secondary

```
+-----------------------------------------------+
|                                                |
|           Primary Featured (large)             |
|           (existing FeatureCard style)          |
|                                                |
+-----------------------------------------------+
|                    |                            |
|  Secondary 1      |  Secondary 2               |
|  (compact card)   |  (compact card)            |
|                    |                            |
+--------------------+----------------------------+
```

- **Primary**: Existing `FeatureCard` component, unchanged.
- **Secondary row**: Two compact cards in a 2-column grid below the primary. Each shows kicker, title, lede (truncated), and date. Matches the site's existing typography and spacing.
- **Responsive**: On mobile, secondary cards stack vertically (single column).
- If only 1 or 2 featured articles are configured, the secondary row shows 1 card (full width) or is hidden entirely.

New component: `SecondaryFeatureCard` — a smaller variant of the feature card. Kicker, linked title, truncated lede, date. No "Featured" badge (only the primary gets that).

## Homepage Logic

File: `src/app/page.tsx`

Current:
```ts
const posts = getAllPosts();
const featured = posts[0];
const rest = posts.slice(1);
```

New:
```ts
const posts = getAllPosts();
const featuredSlugs = await getFeaturedSlugs(); // GET /api/settings/featured

// Resolve slugs to posts, filling gaps from latest
const featured = resolveFeatured(posts, featuredSlugs, 3);
const primary = featured[0];
const secondary = featured.slice(1);
const rest = posts.filter(p => !featured.some(f => f.slug === p.slug));
```

`resolveFeatured(posts, slugs, count)`:
1. For each slug in the array, find the matching post. Skip if not found (unpublished/deleted).
2. Fill remaining slots (up to `count`) from `posts` in date order, skipping any already in the featured list.
3. Return the final array of up to `count` posts.

This guarantees exactly 3 featured posts (as long as 3+ published posts exist), even if some admin-selected slugs are stale.

Key details:
- `getFeaturedSlugs()` calls the API with 60-second `revalidate` (ISR). Changes propagate within one minute.
- The `rest` array excludes all featured posts so none appear twice.

## Fallback Behavior

| Scenario | Result |
|----------|--------|
| 3 slugs set, all valid | Those 3 posts featured in order |
| 3 slugs set, 1 is stale | 2 admin picks + 1 auto-filled from latest |
| 1 slug set | That post primary, 2 latest as secondary |
| Empty array / null (auto) | Latest 3 articles featured |
| API unreachable during SSR | Latest 3 articles (catch block) |
| Fewer than 3 posts exist | Show as many as available |

## Files to Create/Modify

| File | Action |
|------|--------|
| `server/src/db/schema.ts` | Add `siteSettings` table |
| `server/src/routes/admin.ts` | Add `POST /api/admin/settings/featured` and `GET /api/admin/posts` |
| `server/src/routes/settings.ts` | New file: `GET /api/settings/featured` (public) |
| `server/src/index.ts` | Register `settingsRoutes` |
| `src/app/page.tsx` | Fetch featured slugs, resolve to posts, pass primary + secondary |
| `src/app/admin/page.tsx` | Add 3-slot featured article selector |
| `src/components/secondary-feature-card.tsx` | New compact featured card component |
| `src/lib/api.ts` | Add `getFeaturedSlugs()`, `setFeaturedSlugs()`, `getAdminPosts()` |

## Out of Scope

- Featured article scheduling (auto-expire)
- Featured article preview image override
- Migrating tokens to cookies (separate security ticket)
