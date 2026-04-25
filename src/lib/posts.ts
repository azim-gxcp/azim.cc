import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  lede: string;
  kicker: string;
  author: string;
  date: string;
  readTime: number;
  published: boolean;
  keywords: string[];
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".mdx"));

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      const stats = readingTime(content);

      return {
        slug,
        title: data.title || slug,
        lede: data.lede || "",
        kicker: data.kicker || "Articles",
        author: data.author || "Azim",
        date: data.date || "",
        readTime: Math.ceil(stats.minutes),
        published: data.published !== false,
        keywords: data.keywords || [],
      } satisfies PostMeta;
    })
    .filter((post) => post.published)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title || slug,
    lede: data.lede || "",
    kicker: data.kicker || "Articles",
    author: data.author || "Azim",
    date: data.date || "",
    readTime: Math.ceil(stats.minutes),
    published: data.published !== false,
    keywords: data.keywords || [],
    content,
  };
}

export function getAllPostsMeta(): { slug: string; title: string; lede: string; kicker: string; keywords: string[] }[] {
  return getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    lede: p.lede,
    kicker: p.kicker,
    keywords: p.keywords,
  }));
}

export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const current = getPostBySlug(slug);
  if (!current) return [];

  const allPosts = getAllPosts().filter((p) => p.slug !== slug);
  const currentKeywords = new Set(current.keywords.map((k) => k.toLowerCase()));

  const scored = allPosts.map((post) => {
    let score = 0;
    if (post.kicker === current.kicker) score += 10;
    for (const kw of post.keywords) {
      if (currentKeywords.has(kw.toLowerCase())) score += 1;
    }
    return { post, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const results = scored.slice(0, limit).map((s) => s.post);

  // Fill with recent posts if we don't have enough
  if (results.length < limit) {
    for (const post of allPosts) {
      if (results.length >= limit) break;
      if (!results.find((r) => r.slug === post.slug)) {
        results.push(post);
      }
    }
  }

  return results;
}

export function getPostsByCategory(category: string): PostMeta[] {
  const categoryMap: Record<string, string> = {
    "islamic-finance": "Islamic Finance",
    economics: "Economics",
    finance: "Finance",
    crypto: "Crypto",
    education: "Education",
    unfiltered: "Unfiltered",
  };

  const kicker = categoryMap[category];
  if (!kicker) return [];

  return getAllPosts().filter((post) => post.kicker === kicker);
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const kickers = new Set(posts.map((p) => p.kicker));
  return Array.from(kickers);
}

export function getCategorySlug(kicker: string): string {
  const map: Record<string, string> = {
    "Islamic Finance": "islamic-finance",
    Economics: "economics",
    Finance: "finance",
    Crypto: "crypto",
    Education: "education",
    Unfiltered: "unfiltered",
    Articles: "articles",
  };
  return map[kicker] || kicker.toLowerCase().replace(/\s+/g, "-");
}
