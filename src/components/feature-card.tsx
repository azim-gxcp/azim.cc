import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export function FeatureCard({ post }: { post: PostMeta }) {
  const kickerColor = "var(--purple-4)";

  return (
    <Link href={`/blog/${post.slug}`} className="block no-underline mb-[72px]">
      <article
        className="relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: "color-mix(in oklab, #fff 91%, #000)",
          color: "#18181b",
          borderRadius: "12px",
          padding: "clamp(36px, 5vw, 56px) clamp(24px, 4vw, 48px)",
          boxShadow: "var(--shadow-md)",
          border: "1px solid var(--border)",
        }}
      >

        <span
          style={{
            position: "absolute",
            top: "16px",
            right: "18px",
            fontSize: "20px",
            color: kickerColor,
            opacity: 0.6,
            zIndex: 2,
          }}
          title="Featured"
        >
          &#9733;
        </span>
        <div className="relative z-[1]">
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: kickerColor,
              marginBottom: "20px",
            }}
          >
            {post.kicker} &middot; {post.readTime} min &middot; Featured
          </div>
          <h2
            className="m-0 mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              fontVariationSettings: "'opsz' 96",
            }}
          >
            {post.title}
          </h2>
          <p
            className="m-0 mb-5"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              lineHeight: 1.65,
              fontStyle: "italic",
              maxWidth: "56ch",
              opacity: 0.8,
            }}
          >
            {post.lede}
          </p>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              fontStyle: "italic",
              opacity: 0.65,
            }}
          >
            {post.author} &middot; {post.date}
          </div>
        </div>
      </article>
    </Link>
  );
}
