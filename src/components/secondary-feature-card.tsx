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
          position: "relative",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "12px",
            right: "14px",
            fontSize: "16px",
            color: "var(--brand)",
            opacity: 0.7,
          }}
          title="Featured"
        >
          &#9733;
        </span>
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
