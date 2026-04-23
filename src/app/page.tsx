import { getAllPosts } from "@/lib/posts";
import { Hero } from "@/components/hero";
import { FeatureCard } from "@/components/feature-card";
import { ArticleCard } from "@/components/article-card";
import { ArticleGrid } from "@/components/article-grid";
import { NewsletterForm } from "@/components/newsletter-form";
export default function HomePage() {
  const posts = getAllPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-14 pb-24">
        <Hero />

        {featured && <FeatureCard post={featured} />}

        {rest.length > 0 && (
          <ArticleGrid>
            {rest.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </ArticleGrid>
        )}

        <NewsletterForm variant="soft" />
      </div>
    </>
  );
}
