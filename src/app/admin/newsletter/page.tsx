"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { RequireAdmin } from "@/lib/admin-auth";
import {
  getSubscribers,
  sendNewsletter,
  activateSubscriber,
  deactivateSubscriber,
  deleteSubscriber,
  type Subscriber,
  ApiError,
} from "@/lib/api";

type LoadError = string | null;

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
  const [loadError, setLoadError] = useState<LoadError>(null);

  // Newsletter send form
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [lede, setLede] = useState("");
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState("");

  // Action loading states
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Action feedback
  const [actionFeedback, setActionFeedback] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function showFeedback(message: string, type: "success" | "error") {
    setActionFeedback({ message, type });
    if (type === "success") {
      setTimeout(() => setActionFeedback(null), 3000);
    }
  }

  function loadSubscribers() {
    setLoadError(null);
    getSubscribers()
      .then(setSubscribers)
      .catch((err) => {
        const msg = err instanceof ApiError ? err.message : "Failed to load subscribers";
        setLoadError(msg);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadSubscribers();
  }, []);

  const active = subscribers.filter(
    (s) => s.confirmed && !s.unsubscribedAt
  );
  const pending = subscribers.filter((s) => !s.confirmed && !s.unsubscribedAt);
  const deactivated = subscribers.filter((s) => s.unsubscribedAt);

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

  async function handleActivate(id: string) {
    setActionLoading(id);
    try {
      await activateSubscriber(id);
      showFeedback("Subscriber activated", "success");
      loadSubscribers();
    } catch (err) {
      showFeedback(
        err instanceof ApiError ? err.message : "Failed to activate subscriber",
        "error"
      );
    } finally {
      setActionLoading(null);
    }
  }

  async function handleUnsuspend(id: string) {
    setActionLoading(id);
    try {
      await activateSubscriber(id);
      showFeedback("Subscriber unsuspended", "success");
      loadSubscribers();
    } catch (err) {
      showFeedback(
        err instanceof ApiError ? err.message : "Failed to unsuspend subscriber",
        "error"
      );
    } finally {
      setActionLoading(null);
    }
  }

  async function handleSuspend(id: string) {
    setActionLoading(id);
    try {
      await deactivateSubscriber(id);
      showFeedback("Subscriber suspended", "success");
      loadSubscribers();
    } catch (err) {
      showFeedback(
        err instanceof ApiError ? err.message : "Failed to suspend subscriber",
        "error"
      );
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Permanently delete this subscriber?")) return;
    setActionLoading(id);
    try {
      await deleteSubscriber(id);
      showFeedback("Subscriber deleted", "success");
      loadSubscribers();
    } catch (err) {
      showFeedback(
        err instanceof ApiError ? err.message : "Failed to delete subscriber",
        "error"
      );
    } finally {
      setActionLoading(null);
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

  const actionBtnStyle: React.CSSProperties = {
    fontSize: "12px",
    fontWeight: 500,
    padding: "4px 10px",
    borderRadius: "4px",
    border: "1px solid var(--border)",
    background: "transparent",
    cursor: "pointer",
    fontFamily: "var(--font-body)",
    transition: "opacity 150ms",
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
          label="Suspended"
          value={deactivated.length}
          color="var(--fg3)"
        />
      </div>

      {/* Action feedback */}
      {actionFeedback && (
        <div
          style={{
            padding: "12px 16px",
            borderRadius: "6px",
            marginBottom: "16px",
            fontSize: "14px",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: actionFeedback.type === "success" ? "#dcfce7" : "#fee2e2",
            color: actionFeedback.type === "success" ? "#166534" : "#991b1b",
          }}
        >
          <span>{actionFeedback.message}</span>
          <button
            onClick={() => setActionFeedback(null)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              color: "inherit",
              opacity: 0.6,
              padding: "0 4px",
            }}
          >
            &times;
          </button>
        </div>
      )}

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
      ) : loadError ? (
        <div
          style={{
            padding: "16px 20px",
            borderRadius: "8px",
            border: "1px solid #fecaca",
            background: "#fee2e2",
            color: "#991b1b",
            fontSize: "14px",
          }}
        >
          <p style={{ margin: "0 0 8px", fontWeight: 500 }}>{loadError}</p>
          <button
            onClick={() => { setLoading(true); loadSubscribers(); }}
            style={{
              fontSize: "13px",
              fontWeight: 500,
              padding: "6px 12px",
              borderRadius: "4px",
              border: "1px solid #991b1b",
              background: "transparent",
              color: "#991b1b",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
            }}
          >
            Retry
          </button>
        </div>
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
                <th style={{ padding: "10px 16px", fontWeight: 600, color: "var(--fg2)" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s) => {
                const isLoading = actionLoading === s.id;
                return (
                  <tr
                    key={s.id}
                    style={{
                      borderTop: "1px solid var(--border-subtle)",
                      background: "var(--bg-elev)",
                      opacity: isLoading ? 0.5 : 1,
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
                    <td style={{ padding: "10px 16px" }}>
                      <div style={{ display: "flex", gap: "6px" }}>
                        {/* Pending: show Activate */}
                        {!s.confirmed && !s.unsubscribedAt && (
                          <button
                            onClick={() => handleActivate(s.id)}
                            disabled={isLoading}
                            style={{ ...actionBtnStyle, color: "#22c55e", borderColor: "#22c55e" }}
                          >
                            Activate
                          </button>
                        )}
                        {/* Active: show Suspend */}
                        {s.confirmed && !s.unsubscribedAt && (
                          <button
                            onClick={() => handleSuspend(s.id)}
                            disabled={isLoading}
                            style={{ ...actionBtnStyle, color: "var(--fg3)" }}
                          >
                            Suspend
                          </button>
                        )}
                        {/* Suspended: show Unsuspend */}
                        {s.unsubscribedAt && (
                          <button
                            onClick={() => handleUnsuspend(s.id)}
                            disabled={isLoading}
                            style={{ ...actionBtnStyle, color: "var(--brand)", borderColor: "var(--brand)" }}
                          >
                            Unsuspend
                          </button>
                        )}
                        {/* Always show Delete */}
                        <button
                          onClick={() => handleDelete(s.id)}
                          disabled={isLoading}
                          style={{ ...actionBtnStyle, color: "#dc2626", borderColor: "#dc2626" }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
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
        Suspended
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
