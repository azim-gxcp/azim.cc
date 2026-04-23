import type { ReactNode } from "react";

export function ArticleGrid({ children }: { children: ReactNode }) {
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
