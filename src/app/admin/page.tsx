"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { RequireAdmin, useAuth } from "@/lib/admin-auth";
import {
  getAdminStats,
  type AdminStats,
  getFeaturedSlugs,
  setFeaturedSlugs,
  getAdminPosts,
  type AdminPost,
  ApiError,
} from "@/lib/api";

export default function AdminDashboard() {
  return (
    <RequireAdmin>
      <DashboardContent />
    </RequireAdmin>
  );
}

function DashboardContent() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [slots, setSlots] = useState<[string, string, string]>(["", "", ""]);
  const [featuredSaving, setFeaturedSaving] = useState(false);
  const [featuredFeedback, setFeaturedFeedback] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    getAdminStats().then(setStats).catch(() => {});
    getAdminPosts().then(setPosts).catch(() => {});
    getFeaturedSlugs()
      .then((data) => {
        const s = data.slugs || [];
        setSlots([s[0] || "", s[1] || "", s[2] || ""]);
      })
      .catch(() => {});
  }, []);

  async function handleSaveFeatured() {
    setFeaturedSaving(true);
    setFeaturedFeedback(null);
    try {
      const slugs = slots.filter((s) => s !== "");
      await setFeaturedSlugs(slugs);
      setFeaturedFeedback({ message: "Featured articles updated", type: "success" });
      setTimeout(() => setFeaturedFeedback(null), 3000);
    } catch (err) {
      setFeaturedFeedback({
        message: err instanceof ApiError ? err.message : "Failed to save",
        type: "error",
      });
    } finally {
      setFeaturedSaving(false);
    }
  }

  function updateSlot(index: number, value: string) {
    setSlots((prev) => {
      const next = [...prev] as [string, string, string];
      next[index] = value;
      return next;
    });
  }

  const cardStyle: React.CSSProperties = {
    padding: "24px",
    borderRadius: "8px",
    border: "1px solid var(--border-subtle)",
    background: "var(--bg-elev)",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: "var(--fg3)",
    marginBottom: "8px",
  };

  const valueStyle: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: "36px",
    fontWeight: 600,
    color: "var(--fg1)",
    fontVariationSettings: "'opsz' 72",
  };

  return (
    <div
      className="max-w-[900px] mx-auto px-5 md:px-10 py-14"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "28px",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "var(--fg1)",
              margin: 0,
              fontVariationSettings: "'opsz' 72",
            }}
          >
            Dashboard
          </h1>
          <p style={{ fontSize: "14px", color: "var(--fg3)", margin: "4px 0 0" }}>
            Welcome back, {user?.name}
          </p>
        </div>
        <button
          onClick={logout}
          style={{
            fontSize: "13px",
            padding: "8px 16px",
            border: "1px solid var(--border)",
            borderRadius: "4px",
            background: "transparent",
            color: "var(--fg2)",
            cursor: "pointer",
            fontFamily: "var(--font-body)",
          }}
        >
          Sign out
        </button>
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        <div style={cardStyle}>
          <div style={labelStyle}>Active subscribers</div>
          <div style={valueStyle}>{stats?.subscribers.active ?? "-"}</div>
        </div>
        <div style={cardStyle}>
          <div style={labelStyle}>Pending comments</div>
          <div style={valueStyle}>{stats?.comments.pending ?? "-"}</div>
        </div>
        <div style={cardStyle}>
          <div style={labelStyle}>Total comments</div>
          <div style={valueStyle}>{stats?.comments.total ?? "-"}</div>
        </div>
        <div style={cardStyle}>
          <div style={labelStyle}>Newsletters sent</div>
          <div style={valueStyle}>{stats?.newslettersSent ?? "-"}</div>
        </div>
      </div>

      {/* Featured articles */}
      <div style={{ ...cardStyle, marginBottom: "32px" }}>
        <h2
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--fg1)",
            margin: "0 0 16px",
          }}
        >
          Featured Articles
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {(["Primary", "Secondary 1", "Secondary 2"] as const).map(
            (label, i) => {
              const selectedElsewhere = slots.filter(
                (s, j) => j !== i && s !== ""
              );
              return (
                <div key={label}>
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "var(--fg3)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    {label}
                  </label>
                  <select
                    value={slots[i]}
                    onChange={(e) => updateSlot(i, e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      fontSize: "14px",
                      fontFamily: "var(--font-body)",
                      background: "var(--bg-elev)",
                      border: "1px solid var(--border)",
                      borderRadius: "4px",
                      color: "var(--fg1)",
                    }}
                  >
                    <option value="">Auto (latest)</option>
                    {posts.map((p) => (
                      <option
                        key={p.slug}
                        value={p.slug}
                        disabled={selectedElsewhere.includes(p.slug)}
                      >
                        {p.title} ({p.date})
                      </option>
                    ))}
                  </select>
                </div>
              );
            }
          )}
          {featuredFeedback && (
            <p
              style={{
                fontSize: "13px",
                margin: 0,
                color:
                  featuredFeedback.type === "success" ? "#22c55e" : "#dc2626",
              }}
            >
              {featuredFeedback.message}
            </p>
          )}
          <button
            onClick={handleSaveFeatured}
            disabled={featuredSaving}
            style={{
              fontSize: "14px",
              fontWeight: 600,
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              background: "var(--brand)",
              color: "var(--fg-inverse)",
              cursor: featuredSaving ? "not-allowed" : "pointer",
              opacity: featuredSaving ? 0.7 : 1,
              fontFamily: "var(--font-body)",
              alignSelf: "flex-start",
            }}
          >
            {featuredSaving ? "Saving..." : "Save featured"}
          </button>
        </div>
      </div>

      {/* Quick links */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <AdminLink href="/admin/publish">Publish article</AdminLink>
        <AdminLink href="/admin/comments">
          Moderate comments
          {stats?.comments.pending
            ? ` (${stats.comments.pending})`
            : ""}
        </AdminLink>
        <AdminLink href="/admin/newsletter">Manage newsletter</AdminLink>
      </div>
    </div>
  );
}

function AdminLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="no-underline"
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "14px",
        fontWeight: 600,
        padding: "12px 20px",
        borderRadius: "6px",
        background: "var(--brand)",
        color: "var(--fg-inverse)",
        textDecoration: "none",
        transition: "opacity 160ms",
      }}
    >
      {children}
    </Link>
  );
}
