"use client";

import { useState, useRef, useEffect } from "react";

interface FootnoteProps {
  id: string;
  children: React.ReactNode;
}

export function Footnote({ id, children }: FootnoteProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;
    function handleClick(e: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        setVisible(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [visible]);

  return (
    <span
      ref={ref}
      style={{ position: "relative", display: "inline" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <sup
        onClick={() => setVisible(!visible)}
        style={{
          color: "var(--brand)",
          cursor: "pointer",
          fontSize: "0.75em",
          fontWeight: 600,
          fontFamily: "var(--font-body)",
          marginLeft: "1px",
        }}
      >
        [{id}]
      </sup>
      {visible && (
        <div
          ref={tooltipRef}
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "var(--bg-elev)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "10px 14px",
            fontSize: "14px",
            lineHeight: 1.6,
            color: "var(--fg2)",
            fontFamily: "var(--font-body)",
            boxShadow: "var(--shadow-md)",
            width: "280px",
            maxWidth: "90vw",
            zIndex: 40,
            pointerEvents: "auto",
          }}
        >
          {children}
          <div
            style={{
              position: "absolute",
              bottom: "-5px",
              left: "50%",
              transform: "translateX(-50%) rotate(45deg)",
              width: "10px",
              height: "10px",
              background: "var(--bg-elev)",
              borderRight: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
            }}
          />
        </div>
      )}
    </span>
  );
}
