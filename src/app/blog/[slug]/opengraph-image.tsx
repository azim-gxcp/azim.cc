import { ImageResponse } from "next/og";
import { getPostBySlug, getAllPosts } from "@/lib/posts";

export const runtime = "nodejs";
export const alt = "Article preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? "azim.cc";
  const kicker = post?.kicker ?? "";
  const author = post?.author ?? "M Azim Abdul Majeed";
  const date = post?.date ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          background: "linear-gradient(135deg, #2e1065 0%, #4c1d95 40%, #7c3aed 100%)",
          color: "white",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {kicker && (
            <div
              style={{
                fontSize: "18px",
                fontFamily: "system-ui, sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontWeight: 600,
                opacity: 0.85,
                marginBottom: "24px",
              }}
            >
              {kicker}
            </div>
          )}
          <div
            style={{
              fontSize: title.length > 60 ? "42px" : "52px",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              maxWidth: "900px",
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={{ fontSize: "18px", fontWeight: 500 }}>{author}</div>
            {date && (
              <div style={{ fontSize: "15px", opacity: 0.7 }}>{date}</div>
            )}
          </div>
          <div style={{ fontSize: "20px", fontWeight: 600, opacity: 0.8 }}>
            azim.cc
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
