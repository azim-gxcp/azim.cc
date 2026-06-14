import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag, getTagLabel } from "@/lib/posts";
import { ArticleCard } from "@/components/article-card";
import { ArticleGrid } from "@/components/article-grid";
import { BackLink } from "@/components/back-link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  return getAllTags().map((t) => ({ tag: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const label = getTagLabel(tag);
  if (!label) return {};
  const url = `https://azim.cc/tags/${tag}`;
  const description = `Articles tagged "${label}" by M Azim Abdul Majeed: analysis of economics, finance, Islamic finance, monetary systems and first-principles thinking.`;
  return {
    title: `#${label}`,
    description,
    keywords: [label],
    openGraph: {
      title: `Articles tagged ${label}`,
      description,
      url,
      siteName: "azim.cc",
      type: "website",
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const label = getTagLabel(tag);
  if (!label) notFound();

  const posts = getPostsByTag(tag);
  const url = `https://azim.cc/tags/${tag}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Articles tagged ${label}`,
    url,
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", name: "azim.cc", url: "https://azim.cc" },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://azim.cc/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-14 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BackLink />
      <header className="mb-16 max-w-[760px]">
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--brand)",
            marginBottom: "14px",
          }}
        >
          Tag
        </div>
        <h1
          className="m-0 mb-4"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: "var(--fg1)",
            fontVariationSettings: "'opsz' 144",
          }}
        >
          #{label}
        </h1>
        <p
          className="m-0"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "19px",
            fontStyle: "italic",
            lineHeight: 1.6,
            color: "var(--fg2)",
            maxWidth: "56ch",
          }}
        >
          {posts.length} {posts.length === 1 ? "article" : "articles"} tagged{" "}
          {label}.
        </p>
      </header>

      {posts.length > 0 ? (
        <ArticleGrid>
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </ArticleGrid>
      ) : (
        <p style={{ color: "var(--fg3)" }}>No articles with this tag yet.</p>
      )}
    </div>
  );
}
