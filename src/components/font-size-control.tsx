"use client";

import { useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";

// All sizes proportional to body. M (14px body) is default.
// 2px body increments: XS=10, S=12, M=14, L=16, XL=18
// Everything else scales proportionally from M ratios.
const SIZES = [
  { body: 10, lede: 13, h1Min: 13, h1Max: 26, h2: 17, h3: 15, kicker: 9, label: "XS" },
  { body: 12, lede: 15, h1Min: 15, h1Max: 31, h2: 21, h3: 18, kicker: 10, label: "S" },
  { body: 14, lede: 18, h1Min: 18, h1Max: 36, h2: 24, h3: 21, kicker: 12, label: "M" },
  { body: 16, lede: 21, h1Min: 21, h1Max: 41, h2: 27, h3: 24, kicker: 14, label: "L" },
  { body: 18, lede: 23, h1Min: 23, h1Max: 46, h2: 31, h3: 27, kicker: 15, label: "XL" },
];

const DEFAULT_INDEX = 2; // M
const STORAGE_KEY = "azim_font_size";

function applySize(idx: number) {
  const s = SIZES[idx];
  const root = document.documentElement;
  root.style.setProperty("--article-body-size", `${s.body}px`);
  root.style.setProperty("--article-lede-size", `${s.lede}px`);
  root.style.setProperty("--article-h1-min", `${s.h1Min}px`);
  root.style.setProperty("--article-h1-max", `${s.h1Max}px`);
  root.style.setProperty("--article-heading-size", `${s.h2}px`);
  root.style.setProperty("--article-h3-size", `${s.h3}px`);
  root.style.setProperty("--article-kicker-size", `${s.kicker}px`);
}

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
