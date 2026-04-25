import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { BackLink } from "@/components/back-link";
import { NewsletterForm } from "@/components/newsletter-form";
import { CommentSection } from "@/components/comment-section";
import { mdxComponents } from "@/components/mdx-components";
import { ReadingProgress } from "@/components/reading-progress";
import { TableOfContents } from "@/components/table-of-contents";
import { ShareButtons } from "@/components/share-buttons";
import { RelatedArticles } from "@/components/related-articles";
import { BookmarkButton } from "@/components/bookmark-button";
import { FontSizeControl } from "@/components/font-size-control";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const url = `https://azim.cc/blog/${slug}`;
  return {
    title: post.title,
    description: post.lede,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.lede,
      type: "article",
      url,
      siteName: "azim.cc",
      locale: "en_GB",
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author],
      section: post.kicker,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.lede,
      creator: "@EduTechOne",
    },
    alternates: {
      canonical: url,
    },
    keywords: post.keywords,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const kickerColor =
    post.kicker === "Economics" || post.kicker === "Finance"
      ? "var(--green-5)"
      : "var(--brand)";

  const url = `https://azim.cc/blog/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.lede,
    author: {
      "@type": "Person",
      name: post.author,
      url: "https://azim.cc/about",
    },
    publisher: {
      "@type": "Person",
      name: "M Azim Abdul Majeed",
      url: "https://azim.cc",
    },
    datePublished: new Date(post.date).toISOString(),
    url,
    mainEntityOfPage: url,
    articleSection: post.kicker,
    wordCount: post.readTime * 250,
    inLanguage: "en",
    keywords: post.keywords.join(", "),
  };

  return (
    <div className="max-w-[720px] mx-auto px-5 md:px-10 py-14 pb-24">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BackLink />

      <header className="mb-12">
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
          {post.kicker} &middot; {post.readTime} min read
        </div>
        <h1
          className="m-0 mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--fg1)",
            fontVariationSettings: "'opsz' 144",
          }}
        >
          {post.title}
        </h1>
        <p
          className="m-0 mb-8"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "21px",
            fontStyle: "italic",
            lineHeight: 1.6,
            color: "var(--fg2)",
            fontVariationSettings: "'opsz' 24",
          }}
        >
          {post.lede}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "32px",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              color: "var(--fg3)",
              fontStyle: "italic",
            }}
          >
            By <strong>{post.author}</strong> &middot; {post.date}
          </div>
          <FontSizeControl />
        </div>
      </header>

      <TableOfContents content={post.content} />

      <div className="article-body">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "3rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <ShareButtons title={post.title} url={url} />
        <BookmarkButton
          slug={slug}
          title={post.title}
          kicker={post.kicker}
          lede={post.lede}
          date={post.date}
        />
      </div>

      <RelatedArticles currentSlug={slug} />

      <CommentSection slug={slug} />

      <NewsletterForm variant="soft" />
    </div>
  );
}
