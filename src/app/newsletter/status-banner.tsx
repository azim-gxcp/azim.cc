"use client";

import { useState } from "react";

const messages: Record<string, { text: string; color: string; bg: string }> = {
  confirmed: {
    text: "Your subscription is confirmed! You'll receive the next newsletter.",
    color: "#166534",
    bg: "#dcfce7",
  },
  already: {
    text: "You're already subscribed.",
    color: "#854d0e",
    bg: "#fef9c3",
  },
  unsubscribed: {
    text: "You've been unsubscribed. You won't receive further emails.",
    color: "#1e3a5f",
    bg: "#dbeafe",
  },
  invalid: {
    text: "This confirmation link is invalid or has expired.",
    color: "#991b1b",
    bg: "#fee2e2",
  },
  "not-found": {
    text: "Subscription not found.",
    color: "#991b1b",
    bg: "#fee2e2",
  },
};

export function StatusBanner({ status }: { status: string }) {
  const [dismissed, setDismissed] = useState(false);
  const info = messages[status];

  if (!info || dismissed) return null;

  return (
    <div
      style={{
        padding: "14px 20px",
        borderRadius: "8px",
        background: info.bg,
        color: info.color,
        fontFamily: "var(--font-body)",
        fontSize: "15px",
        lineHeight: 1.6,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        marginBottom: "24px",
      }}
    >
      <span>{info.text}</span>
      <button
        onClick={() => setDismissed(true)}
        style={{
          background: "none",
          border: "none",
          color: info.color,
          cursor: "pointer",
          fontSize: "18px",
          lineHeight: 1,
          padding: "0 4px",
          opacity: 0.6,
          flexShrink: 0,
        }}
        aria-label="Dismiss"
      >
        &times;
      </button>
    </div>
  );
}
