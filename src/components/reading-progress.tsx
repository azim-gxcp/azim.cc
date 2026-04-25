"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const el = document.querySelector("main");
        if (!el) return;
        const { top, height } = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const scrollable = height - viewportHeight;
        if (scrollable <= 0) {
          setProgress(100);
        } else {
          const scrolled = Math.max(0, -top);
          setProgress(Math.min(100, (scrolled / scrollable) * 100));
        }
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="reading-progress"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: "3px",
        background: "var(--brand)",
        zIndex: 50,
        transition: "width 100ms linear",
      }}
    />
  );
}
