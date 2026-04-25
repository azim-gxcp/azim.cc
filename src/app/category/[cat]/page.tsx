import { notFound } from "next/navigation";
import { getPostsByCategory, getAllCategories, getCategorySlug } from "@/lib/posts";
import { ArticleCard } from "@/components/article-card";
import { ArticleGrid } from "@/components/article-grid";
import type { Metadata } from "next";

const CATEGORY_INFO: Record<
  string,
  { label: string; lede: string; keywords: string[] }
> = {
  "islamic-finance": {
    label: "Islamic Finance",
    lede: "Articles on riba, Shariah compliance, Islamic economics, halal finance, and the moral architecture of money in the Islamic tradition.",
    keywords: [
      "Islamic finance",
      "riba",
      "Shariah compliance",
      "halal finance",
      "Islamic economics",
      "sukuk",
      "Islamic banking",
    ],
  },
  economics: {
    label: "Economics",
    lede: "Analysis of monetary systems, monetary policy, debt architecture, inflation, and the political economy beneath them.",
    keywords: [
      "economics",
      "monetary systems",
      "monetary policy",
      "inflation",
      "debt crisis",
      "fiat currency",
      "economic analysis",
    ],
  },
  finance: {
    label: "Finance",
    lede: "On banks, interest rates, and the instruments that move the modern world.",
    keywords: [
      "finance",
      "banking",
      "financial systems",
      "monetary policy",
      "interest rates",
    ],
  },
  crypto: {
    label: "Crypto",
    lede: "On Bitcoin, blockchain, cryptocurrency, tokenomics, digital currency design, and the future of decentralised money.",
    keywords: [
      "cryptocurrency",
      "blockchain",
      "Bitcoin",
      "tokenomics",
      "digital currency",
      "decentralised finance",
      "crypto",
      "Web3",
    ],
  },
  education: {
    label: "Education",
    lede: "On Islamic theology, Arabic language, Tawhid, Quranic education, and reclaiming precision in how Muslims understand and articulate their faith.",
    keywords: [
      "Islamic education",
      "Tawhid",
      "Quranic Arabic",
      "Islamic theology",
      "Arabic language",
      "Muslim education",
    ],
  },
  unfiltered: {
    label: "Unfiltered",
    lede: "Things I cannot stop thinking about that do not quite fit the other categories.",
    keywords: [],
  },
};

interface Props {
  params: Promise<{ cat: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((kicker) => ({ cat: getCategorySlug(kicker) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cat } = await params;
  const info = CATEGORY_INFO[cat];
  if (!info) return {};
  const url = `https://azim.cc/category/${cat}`;
  return {
    title: info.label,
    description: info.lede,
    keywords: info.keywords,
    openGraph: {
      title: `${info.label} Articles`,
      description: info.lede,
      url,
      siteName: "azim.cc",
      type: "website",
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { cat } = await params;
  const info = CATEGORY_INFO[cat];
  if (!info) notFound();

  const posts = getPostsByCategory(cat);

  return (
    <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-14 pb-24">
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
          Category
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
          {info.label}
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
          {info.lede}
        </p>
      </header>

      {posts.length > 0 ? (
        <ArticleGrid>
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </ArticleGrid>
      ) : (
        <p style={{ color: "var(--fg3)" }}>No essays in this category yet.</p>
      )}
    </div>
  );
}
