"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { RequireAdmin } from "@/lib/admin-auth";
import {
  getAdminPosts,
  unpublishArticle,
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
    if (!confirm(`Unpublish "${slug}"? It will be hidden from the site but the file remains.`)) return;
    setActionLoading(slug);
    try {
      await unpublishArticle(slug);
      showFeedback("Article unpublished", "success");
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
    } catch (err) {
      showFeedback(
        err instanceof ApiError ? err.message : "Failed to unpublish",
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
      ) : posts.length === 0 ? (
        <p style={{ fontSize: "15px", color: "var(--fg3)" }}>
          No published articles.
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
                  Title
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
              {posts.map((post) => {
                const isLoading = actionLoading === post.slug;
                return (
                  <tr
                    key={post.slug}
                    style={{
                      borderTop: "1px solid var(--border-subtle)",
                      background: "var(--bg-elev)",
                      opacity: isLoading ? 0.5 : 1,
                    }}
                  >
                    <td style={{ padding: "10px 16px", color: "var(--fg1)" }}>
                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "var(--brand)", textDecoration: "none" }}
                      >
                        {post.title}
                      </a>
                    </td>
                    <td style={{ padding: "10px 16px", color: "var(--fg3)" }}>
                      {post.date}
                    </td>
                    <td style={{ padding: "10px 16px" }}>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button
                          onClick={() => handleUnpublish(post.slug)}
                          disabled={isLoading}
                          style={{
                            fontSize: "12px",
                            fontWeight: 500,
                            padding: "4px 10px",
                            borderRadius: "4px",
                            border: "1px solid var(--border)",
                            background: "transparent",
                            color: "var(--fg2)",
                            cursor: "pointer",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          Unpublish
                        </button>
                        <button
                          onClick={() => handleDelete(post.slug)}
                          disabled={isLoading}
                          style={{
                            fontSize: "12px",
                            fontWeight: 500,
                            padding: "4px 10px",
                            borderRadius: "4px",
                            border: "1px solid #dc2626",
                            background: "transparent",
                            color: "#dc2626",
                            cursor: "pointer",
                            fontFamily: "var(--font-body)",
                          }}
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
