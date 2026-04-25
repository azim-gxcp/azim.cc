"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

interface SearchItem {
  slug: string;
  title: string;
  lede: string;
  kicker: string;
  keywords: string[];
}

let cachedIndex: SearchItem[] | null = null;

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchItem[]>([]);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const loadIndex = useCallback(async () => {
    if (cachedIndex) {
      setIndex(cachedIndex);
      return;
    }
    try {
      const res = await fetch("/api/search");
      const data = await res.json();
      cachedIndex = data;
      setIndex(data);
    } catch {
      // silently fail
    }
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    }
    function onOpenSearch() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-search", onOpenSearch);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-search", onOpenSearch);
    };
  }, []);

  useEffect(() => {
    if (open) {
      loadIndex();
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open, loadIndex]);

  const results = query.length > 0
    ? index.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.lede.toLowerCase().includes(q) ||
          item.kicker.toLowerCase().includes(q) ||
          item.keywords.some((k) => k.toLowerCase().includes(q))
        );
      })
    : index;

  function navigate(slug: string) {
    setOpen(false);
    router.push(`/blog/${slug}`);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && results[selected]) {
      navigate(results[selected].slug);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "min(20vh, 120px)",
        background: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "560px",
          margin: "0 16px",
          background: "var(--bg-elev)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 16px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <Search size={16} style={{ color: "var(--fg3)", flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Search articles..."
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              color: "var(--fg1)",
            }}
          />
          <button
            onClick={() => setOpen(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "24px",
              height: "24px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "var(--fg3)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <X size={14} />
          </button>
        </div>

        <div style={{ maxHeight: "360px", overflowY: "auto", padding: "4px 0" }}>
          {results.length === 0 ? (
            <div
              style={{
                padding: "24px 16px",
                textAlign: "center",
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                color: "var(--fg3)",
              }}
            >
              No articles found
            </div>
          ) : (
            results.map((item, i) => (
              <button
                key={item.slug}
                onClick={() => navigate(item.slug)}
                onMouseEnter={() => setSelected(i)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "10px 16px",
                  background: i === selected ? "var(--bg-muted)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  color: "var(--fg1)",
                  transition: "background 100ms",
                }}
              >
                <div style={{ fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--brand)", marginBottom: "2px" }}>
                  {item.kicker}
                </div>
                <div style={{ fontSize: "14px", fontWeight: 500, lineHeight: 1.3 }}>
                  {item.title}
                </div>
              </button>
            ))
          )}
        </div>

        <div
          style={{
            padding: "8px 16px",
            borderTop: "1px solid var(--border)",
            fontFamily: "var(--font-body)",
            fontSize: "11px",
            color: "var(--fg4)",
            display: "flex",
            gap: "12px",
          }}
        >
          <span><kbd style={{ padding: "1px 4px", border: "1px solid var(--border)", borderRadius: "3px", fontSize: "10px" }}>Esc</kbd> close</span>
          <span><kbd style={{ padding: "1px 4px", border: "1px solid var(--border)", borderRadius: "3px", fontSize: "10px" }}>Enter</kbd> open</span>
        </div>
      </div>
    </div>
  );
}
