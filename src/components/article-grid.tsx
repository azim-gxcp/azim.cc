import type { ReactNode } from "react";

export function ArticleGrid({
  children,
  cols = "auto",
}: {
  children: ReactNode;
  /** "auto" fills as many 320px columns as fit; 3 forces a responsive 3-column grid. */
  cols?: "auto" | 3;
}) {
  if (cols === 3) {
    return <div className="article-grid-3">{children}</div>;
  }

  return (
    <div
      className="mb-[72px]"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: "48px 40px",
      }}
    >
      {children}
    </div>
  );
}
