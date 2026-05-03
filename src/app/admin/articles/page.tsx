"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { RequireAdmin } from "@/lib/admin-auth";
import {
  getAdminPosts,
  unpublishArticle,
  republishArticle,
  deleteArticle,
  type AdminPost,
  ApiError,
} from "@/lib/api";

export default function AdminArticlesPage() {
  return (
    <RequireAdmin>
      <ArticlesContent />
    </RequireAdmin>
  );
}

function ArticlesContent() {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      const data = await getAdminPosts();
      setPosts(data);
    } catch {
      setFeedback({ message: "Failed to load articles", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  function showFeedback(message: string, type: "success" | "error") {
    setFeedback({ message, type });
    if (type === "success") {
      setTimeout(() => setFeedback(null), 3000);
    }
  }

  async function handleUnpublish(slug: string) {
    if (!confirm(`Unpublish "${slug}"? It will be hidden from the site.`)) return;
    setActionLoading(slug);
    try {
      await unpublishArticle(slug);
      showFeedback("Article unpublished", "success");
      setPosts((prev) =>
        prev.map((p) => (p.slug === slug ? { ...p, published: false } : p))
      );
    } catch (err) {
      showFeedback(
        err instanceof ApiError ? err.message : "Failed to unpublish",
        "error"
      );
    } finally {
      setActionLoading(null);
    }
  }

  async function handleRepublish(slug: string) {
    setActionLoading(slug);
    try {
      await republishArticle(slug);
      showFeedback("Article republished", "success");
      setPosts((prev) =>
        prev.map((p) => (p.slug === slug ? { ...p, published: true } : p))
      );
    } catch (err) {
      showFeedback(
        err instanceof ApiError ? err.message : "Failed to republish",
        "error"
      );
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm(`Permanently delete "${slug}"? This cannot be undone.`)) return;
    setActionLoading(slug);
    try {
      await deleteArticle(slug);
      showFeedback("Article deleted", "success");
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
    } catch (err) {
      showFeedback(
        err instanceof ApiError ? err.message : "Failed to delete",
        "error"
      );
    } finally {
      setActionLoading(null);
    }
  }

  const published = posts.filter((p) => p.published);
  const unpublished = posts.filter((p) => !p.published);

  return (
    <div
      className="max-w-[900px] mx-auto px-5 md:px-10 py-14"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <div style={{ marginBottom: "24px" }}>
        <Link
          href="/admin"
          className="no-underline"
          style={{ fontSize: "13px", color: "var(--fg3)", textDecoration: "none" }}
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
        Manage Articles
      </h1>

      {feedback && (
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
            background: feedback.type === "success" ? "#dcfce7" : "#fee2e2",
            color: feedback.type === "success" ? "#166534" : "#991b1b",
          }}
        >
          <span>{feedback.message}</span>
          <button
            onClick={() => setFeedback(null)}
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

      {loading ? (
        <p style={{ fontSize: "14px", color: "var(--fg3)" }}>Loading...</p>
      ) : (
        <>
          <h2 style={{ fontSize: "16px", fontWeight: 600, color: "var(--fg1)", margin: "0 0 12px" }}>
            Published ({published.length})
          </h2>
          {published.length === 0 ? (
            <p style={{ fontSize: "14px", color: "var(--fg3)", marginBottom: "32px" }}>
              No published articles.
            </p>
          ) : (
            <ArticleTable
              posts={published}
              actionLoading={actionLoading}
              actions={(post) => (
                <>
                  <ActionBtn
                    label="Unpublish"
                    color="var(--fg2)"
                    border="var(--border)"
                    disabled={actionLoading === post.slug}
                    onClick={() => handleUnpublish(post.slug)}
                  />
                  <ActionBtn
                    label="Delete"
                    color="#dc2626"
                    border="#dc2626"
                    disabled={actionLoading === post.slug}
                    onClick={() => handleDelete(post.slug)}
                  />
                </>
              )}
            />
          )}

          {unpublished.length > 0 && (
            <>
              <h2 style={{ fontSize: "16px", fontWeight: 600, color: "var(--fg1)", margin: "32px 0 12px" }}>
                Unpublished ({unpublished.length})
              </h2>
              <ArticleTable
                posts={unpublished}
                actionLoading={actionLoading}
                actions={(post) => (
                  <>
                    <ActionBtn
                      label="Republish"
                      color="#22c55e"
                      border="#22c55e"
                      disabled={actionLoading === post.slug}
                      onClick={() => handleRepublish(post.slug)}
                    />
                    <ActionBtn
                      label="Delete"
                      color="#dc2626"
                      border="#dc2626"
                      disabled={actionLoading === post.slug}
                      onClick={() => handleDelete(post.slug)}
                    />
                  </>
                )}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

function ArticleTable({
  posts,
  actionLoading,
  actions,
}: {
  posts: AdminPost[];
  actionLoading: string | null;
  actions: (post: AdminPost) => React.ReactNode;
}) {
  return (
    <div
      style={{
        borderRadius: "8px",
        border: "1px solid var(--border-subtle)",
        overflow: "hidden",
        marginBottom: "16px",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
        <thead>
          <tr style={{ background: "var(--bg-muted)", textAlign: "left" }}>
            <th style={{ padding: "10px 16px", fontWeight: 600, color: "var(--fg2)" }}>Title</th>
            <th style={{ padding: "10px 16px", fontWeight: 600, color: "var(--fg2)" }}>Date</th>
            <th style={{ padding: "10px 16px", fontWeight: 600, color: "var(--fg2)" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr
              key={post.slug}
              style={{
                borderTop: "1px solid var(--border-subtle)",
                background: "var(--bg-elev)",
                opacity: actionLoading === post.slug ? 0.5 : 1,
              }}
            >
              <td style={{ padding: "10px 16px", color: "var(--fg1)" }}>
                {post.published ? (
                  <a
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--brand)", textDecoration: "none" }}
                  >
                    {post.title}
                  </a>
                ) : (
                  <span style={{ color: "var(--fg3)" }}>{post.title}</span>
                )}
              </td>
              <td style={{ padding: "10px 16px", color: "var(--fg3)" }}>{post.date}</td>
              <td style={{ padding: "10px 16px" }}>
                <div style={{ display: "flex", gap: "6px" }}>{actions(post)}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ActionBtn({
  label,
  color,
  border,
  disabled,
  onClick,
}: {
  label: string;
  color: string;
  border: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        fontSize: "12px",
        fontWeight: 500,
        padding: "4px 10px",
        borderRadius: "4px",
        border: `1px solid ${border}`,
        background: "transparent",
        color,
        cursor: "pointer",
        fontFamily: "var(--font-body)",
      }}
    >
      {label}
    </button>
  );
}
