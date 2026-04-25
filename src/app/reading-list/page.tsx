"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

interface BookmarkData {
  slug: string;
  title: string;
  kicker: string;
  lede: string;
  date: string;
}

const STORAGE_KEY = "azim_reading_list";

export default function ReadingListPage() {
  const [items, setItems] = useState<BookmarkData[]>([]);

  useEffect(() => {
    try {
      setItems(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
    } catch {
      setItems([]);
    }
  }, []);

  function remove(slug: string) {
    const updated = items.filter((item) => item.slug !== slug);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setItems(updated);
  }

  return (
    <div className="max-w-[720px] mx-auto px-5 md:px-10 py-14 pb-24">
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 4vw, 2.75rem)",
          fontWeight: 600,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "var(--fg1)",
          marginBottom: "2rem",
          fontVariationSettings: "'opsz' 72",
        }}
      >
        Reading List
      </h1>

      {items.length === 0 ? (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "16px",
            color: "var(--fg3)",
            lineHeight: 1.7,
          }}
        >
          No saved articles yet. Click the bookmark icon on any article to save it here.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {items.map((item) => (
            <div
              key={item.slug}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                padding: "16px",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border)",
                background: "var(--bg-elev)",
              }}
            >
              <Link
                href={`/blog/${item.slug}`}
                style={{ flex: 1, textDecoration: "none" }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "11px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--brand)",
                    marginBottom: "4px",
                  }}
                >
                  {item.kicker}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "17px",
                    fontWeight: 600,
                    color: "var(--fg1)",
                    lineHeight: 1.3,
                    marginBottom: "4px",
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "var(--fg3)",
                    lineHeight: 1.5,
                  }}
                >
                  {item.lede.length > 120
                    ? item.lede.slice(0, 120) + "..."
                    : item.lede}
                </div>
              </Link>
              <button
                onClick={() => remove(item.slug)}
                aria-label="Remove from reading list"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "28px",
                  height: "28px",
                  borderRadius: "var(--radius-sm)",
                  border: "none",
                  background: "transparent",
                  color: "var(--fg4)",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
