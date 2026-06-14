import Link from "next/link";
import { getAllTags } from "@/lib/posts";
import { BackLink } from "@/components/back-link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Tags",
  description:
    "Browse every topic covered at azim.cc: riba, Islamic finance, monetary systems, Bitcoin, tokenomics, Shariah compliance and more.",
  alternates: {
    canonical: "https://azim.cc/tags",
  },
  openGraph: {
    title: "All Tags | azim.cc",
    description:
      "Browse every topic covered at azim.cc across economics, finance, Islamic finance and monetary architecture.",
    url: "https://azim.cc/tags",
    siteName: "azim.cc",
    type: "website",
  },
};

export default function TagsIndexPage() {
  const tags = getAllTags();

  return (
    <div className="max-w-[1000px] mx-auto px-5 md:px-10 py-14 pb-24">
      <BackLink />
      <header className="mb-12 max-w-[760px]">
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
          Index
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
          All Tags
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
          Every topic covered, sorted by how often it appears.
        </p>
      </header>

      <ul className="tag-cloud">
        {tags.map((t) => (
          <li key={t.slug}>
            <Link href={`/tags/${t.slug}`} className="tag-cloud__tag">
              #{t.tag}
              <span className="tag-cloud__count">{t.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
