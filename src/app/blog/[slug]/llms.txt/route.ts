import { getAllPosts, getPostBySlug } from "@/lib/posts";

// Clean-markdown version of each post for AI crawlers, served at
// /blog/<slug>/llms.txt. Prerendered at build time.
export const dynamic = "force-static";

const SITE_URL = "https://azim.cc";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// Strip the custom MDX component tags but keep their inner text, leaving
// plain Markdown (headings, paragraphs, links, lists) intact.
function toPlainMarkdown(content: string): string {
  return content
    .replace(/<PullQuote>([\s\S]*?)<\/PullQuote>/g, "> $1")
    .replace(/<GoldQuote[^>]*>([\s\S]*?)<\/GoldQuote>/g, "> $1")
    .replace(/<DropCap>([\s\S]*?)<\/DropCap>/g, "$1")
    .replace(/<Arabic>([\s\S]*?)<\/Arabic>/g, "$1")
    .replace(/<Footnote[^>]*>([\s\S]*?)<\/Footnote>/g, " ($1)")
    .replace(/<[A-Z][a-zA-Z]*[^>]*\/>/g, "")
    .replace(/<[A-Z][a-zA-Z]*[^>]*>([\s\S]*?)<\/[A-Z][a-zA-Z]*>/g, "$1")
    .trim();
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return new Response("Not found", { status: 404 });
  }

  const takeaways =
    post.summary.length > 0
      ? `## Key takeaways\n\n${post.summary.map((s) => `- ${s}`).join("\n")}\n\n`
      : "";

  const body = `# ${post.title}

> ${post.lede}

By ${post.author} · Published ${post.date} · Source: ${SITE_URL}/blog/${slug}

${takeaways}${toPlainMarkdown(post.content)}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
