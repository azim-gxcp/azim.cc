"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/admin-auth";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: "15px",
    padding: "12px 14px",
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
      className="min-h-[70vh] flex items-center justify-center px-5"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "380px",
          padding: "32px",
          borderRadius: "12px",
          border: "1px solid var(--border-subtle)",
          background: "var(--bg-elev)",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "24px",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "var(--fg1)",
            margin: "0 0 8px",
            fontVariationSettings: "'opsz' 72",
          }}
        >
          Admin
        </h1>
        <p
          style={{
            fontSize: "14px",
            color: "var(--fg3)",
            margin: "0 0 24px",
          }}
        >
          Sign in to manage your site.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          {error && (
            <p style={{ fontSize: "14px", color: "#dc2626", margin: 0 }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              fontWeight: 600,
              padding: "12px",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
              background: "var(--brand)",
              color: "var(--fg-inverse)",
              opacity: loading ? 0.7 : 1,
              transition: "background 160ms",
            }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
