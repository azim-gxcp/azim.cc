import { getAllPosts, type PostMeta } from "@/lib/posts";
import { Hero } from "@/components/hero";
import { FeatureCard } from "@/components/feature-card";
import { SecondaryFeatureCard } from "@/components/secondary-feature-card";
import { ArticleCard } from "@/components/article-card";
import { ArticleGrid } from "@/components/article-grid";
import { NewsletterForm } from "@/components/newsletter-form";
import AnimatedBackground from "@/components/AnimatedBg";

export const revalidate = 300;

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

export default async function HomePage() {
  const posts = getAllPosts();
  const featuredSlugs = await getFeaturedSlugs();

  const featured = resolveFeatured(posts, featuredSlugs, 3);
  const primary = featured[0];
  const secondary = featured.slice(1);
  const rest = posts.filter((p) => !featured.some((f) => f.slug === p.slug));

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

        {rest.length > 0 && (
          <ArticleGrid>
            {rest.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </ArticleGrid>
        )}

        <NewsletterForm variant="soft" />
      </section>
    </>
  );
}
