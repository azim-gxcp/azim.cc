"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function parseHeadings(content: string): TocItem[] {
  const lines = content.split("\n");
  const headings: TocItem[] = [];
  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length as 2 | 3;
      const text = match[2].trim();
      headings.push({ id: slugify(text), text, level });
    }
  }
  return headings;
}

export function TableOfContents({ content }: { content: string }) {
  const headings = parseHeadings(content);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <div
      className="toc-container"
      style={{
        marginBottom: "2rem",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        background: "var(--bg-elev)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "12px 16px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-body)",
          fontSize: "13px",
          fontWeight: 600,
          color: "var(--fg2)",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        Table of contents
        <ChevronDown
          size={14}
          style={{
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 150ms",
            color: "var(--fg3)",
          }}
        />
      </button>

      {open && (
        <nav
          style={{
            padding: "0 16px 14px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {headings.map((h) => (
            <a
              key={h.id}
              href={`#${h.id}`}
              onClick={() => setActiveId(h.id)}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                color: activeId === h.id ? "var(--brand)" : "var(--fg3)",
                textDecoration: "none",
                padding: "4px 0",
                paddingLeft: h.level === 3 ? "16px" : "0",
                fontWeight: activeId === h.id ? 500 : 400,
                transition: "color 150ms",
              }}
            >
              {h.text}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
