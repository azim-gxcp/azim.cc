import Link from "next/link";
import { getRelatedPosts } from "@/lib/posts";

export function RelatedArticles({ currentSlug }: { currentSlug: string }) {
  const related = getRelatedPosts(currentSlug, 3);

  if (related.length === 0) return null;

  return (
    <div
      className="related-articles"
      style={{
        marginTop: "3rem",
        paddingTop: "2rem",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "12px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "var(--fg3)",
          marginBottom: "16px",
        }}
      >
        Related articles
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="no-underline block border border-border-default hover:border-border-strong transition-colors duration-150"
            style={{
              padding: "16px",
              borderRadius: "var(--radius-lg)",
              background: "var(--bg-elev)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--brand)",
                marginBottom: "6px",
              }}
            >
              {post.kicker}
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                fontWeight: 600,
                color: "var(--fg1)",
                lineHeight: 1.3,
                marginBottom: "6px",
              }}
            >
              {post.title}
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                color: "var(--fg3)",
                lineHeight: 1.5,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {post.lede}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
