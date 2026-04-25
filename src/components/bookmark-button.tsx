"use client";

import { useState, useEffect } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";

interface BookmarkData {
  slug: string;
  title: string;
  kicker: string;
  lede: string;
  date: string;
}

const STORAGE_KEY = "azim_reading_list";

function getReadingList(): BookmarkData[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveReadingList(list: BookmarkData[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function BookmarkButton({ slug, title, kicker, lede, date }: BookmarkData) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const list = getReadingList();
    setSaved(list.some((item) => item.slug === slug));
  }, [slug]);

  function toggle() {
    const list = getReadingList();
    if (saved) {
      const updated = list.filter((item) => item.slug !== slug);
      saveReadingList(updated);
      setSaved(false);
    } else {
      list.push({ slug, title, kicker, lede, date });
      saveReadingList(list);
      setSaved(true);
    }
  }

  return (
    <button
      className="bookmark-btn"
      onClick={toggle}
      aria-label={saved ? "Remove from reading list" : "Save to reading list"}
      title={saved ? "Remove from reading list" : "Save to reading list"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--border)",
        background: "transparent",
        color: saved ? "var(--brand)" : "var(--fg3)",
        cursor: "pointer",
        transition: "color 150ms, border-color 150ms",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border-strong)";
        if (!saved) e.currentTarget.style.color = "var(--fg1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        if (!saved) e.currentTarget.style.color = "var(--fg3)";
      }}
    >
      {saved ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
    </button>
  );
}
