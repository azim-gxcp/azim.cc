import { getAllPosts } from "@/lib/posts";
import { ArticleCard } from "@/components/article-card";
import { ArticleGrid } from "@/components/article-grid";
import { NewsletterForm } from "@/components/newsletter-form";
import { StatusBanner } from "./status-banner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter — M Azim Abdul Majeed",
  description:
    "One essay a week, sent on Friday evening. Economics, finance, and Islamic finance.",
};

export default async function NewsletterPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-14 pb-24">
      {status && <StatusBanner status={status} />}
      <NewsletterForm variant="hero" />

      <div className="mt-16">
        <h2
          className="m-0 mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "28px",
            fontWeight: 600,
            color: "var(--fg1)",
            fontVariationSettings: "'opsz' 72",
          }}
        >
          What you will get
        </h2>
        <ul
          className="p-0 flex flex-col gap-3.5 mb-12"
          style={{ listStyle: "none" }}
        >
          {[
            "One essay per week, delivered Friday evening.",
            "Occasional short notes on things I am reading.",
            "Nothing else. No product launches, no affiliate links, no tracking pixels.",
          ].map((item) => (
            <li
              key={item}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "18px",
                lineHeight: 1.8,
                color: "var(--fg1)",
              }}
            >
              <span style={{ color: "var(--brand)", fontFamily: "var(--font-display)" }}>
                &sect;{" "}
              </span>
              {item}
            </li>
          ))}
        </ul>

        <h2
          className="m-0 mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "28px",
            fontWeight: 600,
            color: "var(--fg1)",
            fontVariationSettings: "'opsz' 72",
          }}
        >
          Recent issues
        </h2>
        {posts.length > 0 && (
          <ArticleGrid>
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </ArticleGrid>
        )}
      </div>
    </div>
  );
}
