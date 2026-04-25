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

export function getPostsByCategory(category: string): PostMeta[] {
  const categoryMap: Record<string, string> = {
    "islamic-finance": "Islamic Finance",
    economics: "Economics",
    finance: "Finance",
    crypto: "Crypto",
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
    Unfiltered: "unfiltered",
    Articles: "articles",
  };
  return map[kicker] || kicker.toLowerCase().replace(/\s+/g, "-");
}
