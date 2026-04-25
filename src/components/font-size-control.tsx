"use client";

import { useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";

const SIZES = [
  { body: 12, heading: 20, h3: 17, label: "S" },
  { body: 14, heading: 24, h3: 20, label: "M" },
  { body: 16, heading: 26, h3: 22, label: "L" },
  { body: 18, heading: 28, h3: 24, label: "XL" },
];

const DEFAULT_INDEX = 1; // 14px
const STORAGE_KEY = "azim_font_size";

export function FontSizeControl() {
  const [sizeIndex, setSizeIndex] = useState(DEFAULT_INDEX);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        const idx = parseInt(saved, 10);
        if (idx >= 0 && idx < SIZES.length) {
          setSizeIndex(idx);
          applySize(idx);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  function applySize(idx: number) {
    const s = SIZES[idx];
    const root = document.documentElement;
    root.style.setProperty("--article-body-size", `${s.body}px`);
    root.style.setProperty("--article-heading-size", `${s.heading}px`);
    root.style.setProperty("--article-h3-size", `${s.h3}px`);
  }

  function change(delta: number) {
    const next = Math.max(0, Math.min(SIZES.length - 1, sizeIndex + delta));
    setSizeIndex(next);
    applySize(next);
    try {
      localStorage.setItem(STORAGE_KEY, String(next));
    } catch {
      // ignore
    }
  }

  const btnStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30px",
    height: "30px",
    borderRadius: "var(--radius-sm)",
    border: "1px solid var(--border)",
    background: "transparent",
    color: "var(--fg3)",
    cursor: "pointer",
    transition: "color 150ms, border-color 150ms",
  };

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
      <button
        onClick={() => change(-1)}
        disabled={sizeIndex === 0}
        aria-label="Decrease font size"
        style={{
          ...btnStyle,
          opacity: sizeIndex === 0 ? 0.4 : 1,
          cursor: sizeIndex === 0 ? "default" : "pointer",
        }}
        onMouseEnter={(e) => {
          if (sizeIndex > 0) {
            e.currentTarget.style.color = "var(--fg1)";
            e.currentTarget.style.borderColor = "var(--border-strong)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "var(--fg3)";
          e.currentTarget.style.borderColor = "var(--border)";
        }}
      >
        <Minus size={13} />
      </button>
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "11px",
          fontWeight: 600,
          color: "var(--fg3)",
          minWidth: "22px",
          textAlign: "center",
          letterSpacing: "0.05em",
        }}
      >
        {SIZES[sizeIndex].label}
      </span>
      <button
        onClick={() => change(1)}
        disabled={sizeIndex === SIZES.length - 1}
        aria-label="Increase font size"
        style={{
          ...btnStyle,
          opacity: sizeIndex === SIZES.length - 1 ? 0.4 : 1,
          cursor: sizeIndex === SIZES.length - 1 ? "default" : "pointer",
        }}
        onMouseEnter={(e) => {
          if (sizeIndex < SIZES.length - 1) {
            e.currentTarget.style.color = "var(--fg1)";
            e.currentTarget.style.borderColor = "var(--border-strong)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "var(--fg3)";
          e.currentTarget.style.borderColor = "var(--border)";
        }}
      >
        <Plus size={13} />
      </button>
    </div>
  );
}
