"use client";

import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { useState } from "react";

export function ArticleCard({ post }: { post: PostMeta }) {
  const [hovered, setHovered] = useState(false);
  const kickerColor =
    post.kicker === "Economics" || post.kicker === "Finance"
      ? "var(--green-5)"
      : "var(--brand)";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block no-underline"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <article
        className="cursor-pointer transition-transform duration-200"
        style={{
          transform: hovered ? "translateY(-2px)" : "none",
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
            marginBottom: "14px",
          }}
        >
          {post.kicker} &middot; {post.readTime} min
        </div>
        <h3
          className="m-0 mb-3"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "26px",
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: "-0.015em",
            fontVariationSettings: "'opsz' 72",
            color: hovered ? "var(--brand)" : "var(--fg1)",
            transition: "color 160ms",
          }}
        >
          {post.title}
        </h3>
        <p
          className="m-0 mb-4"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "16px",
            lineHeight: 1.6,
            color: "var(--fg2)",
          }}
        >
          {post.lede}
        </p>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            color: "var(--fg3)",
            fontStyle: "italic",
          }}
        >
          {post.author} &middot; {post.date}
        </div>
      </article>
    </Link>
  );
}
