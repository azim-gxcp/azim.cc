"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { RequireAdmin } from "@/lib/admin-auth";
import {
  getSubscribers,
  sendNewsletter,
  type Subscriber,
  ApiError,
} from "@/lib/api";

export default function AdminNewsletterPage() {
  return (
    <RequireAdmin>
      <NewsletterContent />
    </RequireAdmin>
  );
}

function NewsletterContent() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  // Newsletter send form
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [lede, setLede] = useState("");
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState("");

  useEffect(() => {
    getSubscribers()
      .then(setSubscribers)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const active = subscribers.filter(
    (s) => s.confirmed && !s.unsubscribedAt
  );
  const pending = subscribers.filter((s) => !s.confirmed);
  const unsubscribed = subscribers.filter((s) => s.unsubscribedAt);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!slug || !title || !lede) return;

    setSending(true);
    setSendResult("");

    try {
      const res = await sendNewsletter(slug, title, lede);
      setSendResult(res.message);
      setSlug("");
      setTitle("");
      setLede("");
    } catch (err) {
      if (err instanceof ApiError) {
        setSendResult(`Error: ${err.message}`);
      } else {
        setSendResult("Failed to send newsletter");
      }
    } finally {
      setSending(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: "15px",
    padding: "10px 14px",
    background: "var(--bg-elev)",
    border: "1px solid var(--border)",
    borderRadius: "4px",
    color: "var(--fg1)",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <div
      className="max-w-[900px] mx-auto px-5 md:px-10 py-14"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <div style={{ marginBottom: "24px" }}>
        <Link
          href="/admin"
          className="no-underline"
          style={{
            fontSize: "13px",
            color: "var(--fg3)",
            textDecoration: "none",
          }}
        >
          &larr; Dashboard
        </Link>
      </div>

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "28px",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: "var(--fg1)",
          margin: "0 0 32px",
          fontVariationSettings: "'opsz' 72",
        }}
      >
        Newsletter
      </h1>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
          marginBottom: "32px",
        }}
      >
        <StatCard label="Active" value={active.length} color="#22c55e" />
        <StatCard label="Pending" value={pending.length} color="var(--brand)" />
        <StatCard
          label="Unsubscribed"
          value={unsubscribed.length}
          color="var(--fg3)"
        />
      </div>

      {/* Send newsletter */}
      <div
        style={{
          padding: "24px",
          borderRadius: "8px",
          border: "1px solid var(--border-subtle)",
          background: "var(--bg-elev)",
          marginBottom: "32px",
        }}
      >
        <h2
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--fg1)",
            margin: "0 0 16px",
          }}
        >
          Send newsletter
        </h2>
        <form
          onSubmit={handleSend}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <input
            type="text"
            required
            placeholder="Post slug (e.g. my-article)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            required
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            required
            placeholder="Post lede / subtitle"
            value={lede}
            onChange={(e) => setLede(e.target.value)}
            style={inputStyle}
          />

          {sendResult && (
            <p
              style={{
                fontSize: "14px",
                color: sendResult.startsWith("Error") ? "#dc2626" : "#22c55e",
                margin: 0,
              }}
            >
              {sendResult}
            </p>
          )}

          <button
            type="submit"
            disabled={sending}
            style={{
              fontSize: "14px",
              fontWeight: 600,
              padding: "12px",
              border: "none",
              borderRadius: "4px",
              background: "var(--brand)",
              color: "var(--fg-inverse)",
              cursor: sending ? "not-allowed" : "pointer",
              opacity: sending ? 0.7 : 1,
              fontFamily: "var(--font-body)",
              alignSelf: "flex-start",
            }}
          >
            {sending
              ? "Sending..."
              : `Send to ${active.length} subscribers`}
          </button>
        </form>
      </div>

      {/* Subscriber list */}
      <h2
        style={{
          fontSize: "16px",
          fontWeight: 600,
          color: "var(--fg1)",
          margin: "0 0 16px",
        }}
      >
        Subscribers ({subscribers.length})
      </h2>

      {loading ? (
        <p style={{ fontSize: "14px", color: "var(--fg3)" }}>Loading...</p>
      ) : subscribers.length === 0 ? (
        <p style={{ fontSize: "15px", color: "var(--fg3)" }}>
          No subscribers yet.
        </p>
      ) : (
        <div
          style={{
            borderRadius: "8px",
            border: "1px solid var(--border-subtle)",
            overflow: "hidden",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "var(--bg-muted)",
                  textAlign: "left",
                }}
              >
                <th style={{ padding: "10px 16px", fontWeight: 600, color: "var(--fg2)" }}>
                  Email
                </th>
                <th style={{ padding: "10px 16px", fontWeight: 600, color: "var(--fg2)" }}>
                  Status
                </th>
                <th style={{ padding: "10px 16px", fontWeight: 600, color: "var(--fg2)" }}>
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s) => (
                <tr
                  key={s.id}
                  style={{
                    borderTop: "1px solid var(--border-subtle)",
                    background: "var(--bg-elev)",
                  }}
                >
                  <td style={{ padding: "10px 16px", color: "var(--fg1)" }}>
                    {s.email}
                    {s.name && (
                      <span style={{ color: "var(--fg3)", marginLeft: "6px" }}>
                        ({s.name})
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "10px 16px" }}>
                    <SubscriberStatus subscriber={s} />
                  </td>
                  <td style={{ padding: "10px 16px", color: "var(--fg3)" }}>
                    {new Date(s.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div
      style={{
        padding: "16px 20px",
        borderRadius: "8px",
        border: "1px solid var(--border-subtle)",
        background: "var(--bg-elev)",
      }}
    >
      <div
        style={{
          fontSize: "12px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--fg3)",
          marginBottom: "4px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "28px",
          fontWeight: 600,
          color,
          fontVariationSettings: "'opsz' 72",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function SubscriberStatus({ subscriber }: { subscriber: Subscriber }) {
  if (subscriber.unsubscribedAt) {
    return (
      <span
        style={{
          fontSize: "12px",
          padding: "2px 8px",
          borderRadius: "100px",
          background: "var(--bg-muted)",
          color: "var(--fg3)",
        }}
      >
        Unsubscribed
      </span>
    );
  }
  if (subscriber.confirmed) {
    return (
      <span
        style={{
          fontSize: "12px",
          padding: "2px 8px",
          borderRadius: "100px",
          background: "#dcfce7",
          color: "#166534",
        }}
      >
        Active
      </span>
    );
  }
  return (
    <span
      style={{
        fontSize: "12px",
        padding: "2px 8px",
        borderRadius: "100px",
        background: "#fef9c3",
        color: "#854d0e",
      }}
    >
      Pending
    </span>
  );
}
