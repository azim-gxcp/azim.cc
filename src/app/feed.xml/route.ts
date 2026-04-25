import { getAllPosts } from "@/lib/posts";

const SITE_URL = "https://azim.cc";

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .map(
      (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <description><![CDATA[${post.lede}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.kicker}</category>
      <author>admin@azim.cc (M Azim Abdul Majeed)</author>
    </item>`
    )
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>M Azim Abdul Majeed</title>
    <link>${SITE_URL}</link>
    <description>Long-form essays on economics, finance, and Islamic finance.</description>
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
