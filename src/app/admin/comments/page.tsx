"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { RequireAdmin } from "@/lib/admin-auth";
import {
  getPendingComments,
  getApprovedComments,
  approveComment,
  deleteComment,
  type PendingComment,
} from "@/lib/api";

export default function AdminCommentsPage() {
  return (
    <RequireAdmin>
      <CommentsContent />
    </RequireAdmin>
  );
}

function CommentsContent() {
  const [pending, setPending] = useState<PendingComment[]>([]);
  const [approved, setApproved] = useState<PendingComment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComments();
  }, []);

  async function loadComments() {
    try {
      const [p, a] = await Promise.all([
        getPendingComments(),
        getApprovedComments(),
      ]);
      setPending(p);
      setApproved(a);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(id: string) {
    try {
      await approveComment(id);
      const comment = pending.find((c) => c.id === id);
      setPending((prev) => prev.filter((c) => c.id !== id));
      if (comment) setApproved((prev) => [comment, ...prev]);
    } catch {
      // ignore
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this comment permanently?")) return;
    try {
      await deleteComment(id);
      setPending((prev) => prev.filter((c) => c.id !== id));
      setApproved((prev) => prev.filter((c) => c.id !== id));
    } catch {
      // ignore
    }
  }

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
          margin: "0 0 24px",
          fontVariationSettings: "'opsz' 72",
        }}
      >
        Comment moderation
      </h1>

      {loading ? (
        <p style={{ fontSize: "14px", color: "var(--fg3)" }}>Loading...</p>
      ) : (
        <>
          <h2 style={{ fontSize: "16px", fontWeight: 600, color: "var(--fg1)", margin: "0 0 12px" }}>
            Pending ({pending.length})
          </h2>
          {pending.length === 0 ? (
            <p style={{ fontSize: "14px", color: "var(--fg3)", marginBottom: "32px" }}>
              No pending comments. All clear.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
              {pending.map((c) => (
                <CommentCard key={c.id} comment={c} onApprove={handleApprove} onDelete={handleDelete} showApprove />
              ))}
            </div>
          )}

          <h2 style={{ fontSize: "16px", fontWeight: 600, color: "var(--fg1)", margin: "0 0 12px" }}>
            Approved ({approved.length})
          </h2>
          {approved.length === 0 ? (
            <p style={{ fontSize: "14px", color: "var(--fg3)" }}>
              No approved comments yet.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {approved.map((c) => (
                <CommentCard key={c.id} comment={c} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function CommentCard({
  comment: c,
  onApprove,
  onDelete,
  showApprove,
}: {
  comment: PendingComment;
  onApprove?: (id: string) => void;
  onDelete: (id: string) => void;
  showApprove?: boolean;
}) {
  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "8px",
        border: "1px solid var(--border-subtle)",
        background: "var(--bg-elev)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "8px",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--fg1)" }}>
            {c.authorName}
          </span>
          <span style={{ fontSize: "12px", color: "var(--fg3)", marginLeft: "8px" }}>
            {c.authorEmail}
          </span>
        </div>
        <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
          <span
            style={{
              fontSize: "11px",
              padding: "3px 8px",
              borderRadius: "4px",
              background: "var(--bg-muted)",
              color: "var(--fg3)",
            }}
          >
            {c.postSlug}
          </span>
          <span style={{ fontSize: "11px", color: "var(--fg4)" }}>
            {new Date(c.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <p
        style={{
          fontSize: "15px",
          lineHeight: 1.7,
          color: "var(--fg2)",
          margin: "0 0 16px",
          whiteSpace: "pre-wrap",
        }}
      >
        {c.body}
      </p>

      <div style={{ display: "flex", gap: "8px" }}>
        {showApprove && onApprove && (
          <button
            onClick={() => onApprove(c.id)}
            style={{
              fontSize: "13px",
              fontWeight: 600,
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              background: "#22c55e",
              color: "#fff",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
            }}
          >
            Approve
          </button>
        )}
        <button
          onClick={() => onDelete(c.id)}
          style={{
            fontSize: "13px",
            fontWeight: 600,
            padding: "8px 16px",
            border: "1px solid var(--border)",
            borderRadius: "4px",
            background: "transparent",
            color: "#dc2626",
            cursor: "pointer",
            fontFamily: "var(--font-body)",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
