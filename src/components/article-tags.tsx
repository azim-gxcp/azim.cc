import Link from "next/link";
import { tagSlug } from "@/lib/posts";

export function ArticleTags({ keywords }: { keywords: string[] }) {
  if (!keywords || keywords.length === 0) return null;

  // De-duplicate by slug while preserving the first human-readable label.
  const seen = new Set<string>();
  const tags = keywords
    .map((kw) => ({ label: kw, slug: tagSlug(kw) }))
    .filter(({ slug }) => {
      if (!slug || seen.has(slug)) return false;
      seen.add(slug);
      return true;
    });

  if (tags.length === 0) return null;

  return (
    <nav aria-label="Article tags" className="article-tags">
      <span className="article-tags__label">Tagged</span>
      <ul className="article-tags__list">
        {tags.map(({ label, slug }) => (
          <li key={slug}>
            <Link href={`/tags/${slug}`} className="article-tags__tag">
              #{label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
