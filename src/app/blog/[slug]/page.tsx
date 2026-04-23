import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { BackLink } from "@/components/back-link";
import { NewsletterForm } from "@/components/newsletter-form";
import { CommentSection } from "@/components/comment-section";
import { mdxComponents } from "@/components/mdx-components";
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
  return {
    title: `${post.title} — M Azim Abdul Majeed`,
    description: post.lede,
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

  return (
    <div className="max-w-[720px] mx-auto px-5 md:px-10 py-14 pb-24">
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
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            color: "var(--fg3)",
            fontStyle: "italic",
            paddingBottom: "32px",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          By <strong>{post.author}</strong> &middot; {post.date}
        </div>
      </header>

      <div className="article-body">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>

      <div
        className="mt-16 mb-10 pt-6"
        style={{ borderTop: "1px solid var(--border-subtle)" }}
      >
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--fg3)",
          }}
        >
          Written in Kuala Lumpur &middot; shared freely &middot; CC BY
        </div>
      </div>

      <CommentSection slug={slug} />

      <NewsletterForm variant="soft" />
    </div>
  );
}
