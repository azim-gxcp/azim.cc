import type { Metadata } from "next";
import { getAllPosts, type PostMeta } from "@/lib/posts";
import { Hero } from "@/components/hero";
import { FeatureCard } from "@/components/feature-card";
import { SecondaryFeatureCard } from "@/components/secondary-feature-card";
import { ArticleCard } from "@/components/article-card";
import { ArticleGrid } from "@/components/article-grid";
import { NewsletterForm } from "@/components/newsletter-form";
import {
  Pagination,
  PER_PAGE_OPTIONS,
  DEFAULT_PER,
  type PerPage,
} from "@/components/pagination";
import AnimatedBackground from "@/components/AnimatedBg";

export const revalidate = 300;

interface SearchParams {
  page?: string | string[];
  per?: string | string[];
}

function readParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** Normalise `per` + `page` search params against the count of paginatable posts. */
function resolvePagination(sp: SearchParams, total: number) {
  const perRaw = readParam(sp.per) ?? DEFAULT_PER;
  const per: PerPage = (PER_PAGE_OPTIONS as readonly string[]).includes(perRaw)
    ? (perRaw as PerPage)
    : DEFAULT_PER;

  const perNum = per === "all" ? Math.max(total, 1) : parseInt(per, 10);
  const totalPages = per === "all" ? 1 : Math.max(1, Math.ceil(total / perNum));

  const pageRaw = parseInt(readParam(sp.page) ?? "1", 10);
  const currentPage = Number.isFinite(pageRaw)
    ? Math.min(Math.max(1, pageRaw), totalPages)
    : 1;

  const start = (currentPage - 1) * perNum;
  return { per, perNum, totalPages, currentPage, start };
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const sp = await searchParams;
  const page = parseInt(readParam(sp.page) ?? "1", 10);
  const per = readParam(sp.per);

  const params = new URLSearchParams();
  if (per && per !== DEFAULT_PER) params.set("per", per);
  if (Number.isFinite(page) && page > 1) params.set("page", String(page));
  const qs = params.toString();
  const canonical = qs ? `https://azim.cc/?${qs}` : "https://azim.cc";

  return {
    title:
      Number.isFinite(page) && page > 1
        ? `Articles — Page ${page}`
        : "M Azim Abdul Majeed | Blog",
    alternates: { canonical },
  };
}

async function getFeaturedSlugs(): Promise<string[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL || "https://api.azim.cc"}/api/settings/featured`;
    const res = await fetch(url, { next: { revalidate: 300 } });
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

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const posts = getAllPosts();
  const [featuredSlugs, sp] = await Promise.all([
    getFeaturedSlugs(),
    searchParams,
  ]);

  const featured = resolveFeatured(posts, featuredSlugs, 3);
  const primary = featured[0];
  const secondary = featured.slice(1);
  const rest = posts.filter((p) => !featured.some((f) => f.slug === p.slug));

  const { per, perNum, totalPages, currentPage, start } = resolvePagination(
    sp,
    rest.length
  );
  const pageItems =
    per === "all" ? rest : rest.slice(start, start + perNum);

  return (
    <>

      <section className="relative max-w-300 min-h-[90vh] mx-auto px-5 md:px-10 py-14 pb-24">
        <AnimatedBackground />

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

        {pageItems.length > 0 && (
          <ArticleGrid cols={3}>
            {pageItems.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </ArticleGrid>
        )}

        {rest.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            per={per}
          />
        )}

        <NewsletterForm variant="soft" />
      </section>
    </>
  );
}
