import { getAllPosts, getPostBySlug } from "@/lib/posts";

const SITE_URL = "https://azim.cc";

function stripMdxTags(content: string): string {
  return content
    .replace(/<PullQuote>([\s\S]*?)<\/PullQuote>/g, "> $1")
    .replace(/<DropCap>([\s\S]*?)<\/DropCap>/g, "$1")
    .replace(/<Arabic>([\s\S]*?)<\/Arabic>/g, "$1")
    .replace(/<Footnote[^>]*>([\s\S]*?)<\/Footnote>/g, "")
    .replace(/<[A-Z][a-zA-Z]*[^>]*\/>/g, "")
    .replace(/<[A-Z][a-zA-Z]*[^>]*>([\s\S]*?)<\/[A-Z][a-zA-Z]*>/g, "$1")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .map((post) => {
      const full = getPostBySlug(post.slug);
      const contentEncoded = full
        ? `<content:encoded><![CDATA[${stripMdxTags(full.content)}]]></content:encoded>`
        : "";

      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <description><![CDATA[${post.lede}]]></description>
      ${contentEncoded}
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.kicker}</category>
      <author>admin@azim.cc (M Azim Abdul Majeed)</author>
    </item>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>M Azim Abdul Majeed</title>
    <link>${SITE_URL}</link>
    <description>Economics, Islamic finance, monetary architecture, and first-principles thinking about how money should work.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
