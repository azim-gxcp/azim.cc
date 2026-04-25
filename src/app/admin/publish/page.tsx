"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { RequireAdmin } from "@/lib/admin-auth";
import { publishArticle, ApiError } from "@/lib/api";

const CATEGORIES = [
  "Islamic Finance",
  "Economics",
  "Finance",
  "Crypto",
  "Education",
  "Unfiltered",
];

export default function AdminPublishPage() {
  return (
    <RequireAdmin>
      <PublishContent />
    </RequireAdmin>
  );
}

function PublishContent() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [lede, setLede] = useState("");
  const [kicker, setKicker] = useState(CATEGORIES[0]);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [keywords, setKeywords] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [result, setResult] = useState<{
    type: "success" | "error";
    message: string;
    url?: string;
  } | null>(null);
  const [dragOver, setDragOver] = useState(false);

  function handleFileSelect(f: File) {
    setFile(f);
    // Auto-populate title from filename (without extension)
    if (!title) {
      const name = f.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
      setTitle(name);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFileSelect(f);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !title || !lede || !kicker || !date) return;

    setPublishing(true);
    setResult(null);

    try {
      const res = await publishArticle({
        file,
        title,
        lede,
        kicker,
        date,
        keywords: keywords || undefined,
      });
      setResult({ type: "success", message: res.message, url: res.url });
      // Reset form
      setFile(null);
      setTitle("");
      setLede("");
      setKeywords("");
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      if (err instanceof ApiError) {
        setResult({ type: "error", message: err.message });
      } else {
        setResult({ type: "error", message: "Failed to publish article" });
      }
    } finally {
      setPublishing(false);
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

  const labelStyle: React.CSSProperties = {
    fontSize: "13px",
    fontWeight: 600,
    color: "var(--fg2)",
    marginBottom: "6px",
    display: "block",
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
        Publish article
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          padding: "24px",
          borderRadius: "8px",
          border: "1px solid var(--border-subtle)",
          background: "var(--bg-elev)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* File upload */}
        <div>
          <label style={labelStyle}>File</label>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            style={{
              padding: "32px 24px",
              borderRadius: "6px",
              border: `2px dashed ${dragOver ? "var(--brand)" : "var(--border)"}`,
              background: dragOver
                ? "color-mix(in srgb, var(--brand) 5%, transparent)"
                : "transparent",
              textAlign: "center",
              cursor: "pointer",
              transition: "border-color 150ms, background 150ms",
            }}
          >
            {file ? (
              <span style={{ fontSize: "14px", color: "var(--fg1)" }}>
                {file.name}{" "}
                <span style={{ color: "var(--fg3)" }}>
                  ({(file.size / 1024).toFixed(0)} KB)
                </span>
              </span>
            ) : (
              <span style={{ fontSize: "14px", color: "var(--fg3)" }}>
                Drop a file here or click to browse (.pdf, .md, .txt)
              </span>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.md,.mdx,.txt"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFileSelect(f);
            }}
            style={{ display: "none" }}
          />
        </div>

        {/* Title */}
        <div>
          <label style={labelStyle}>Title</label>
          <input
            type="text"
            required
            placeholder="Article title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Lede */}
        <div>
          <label style={labelStyle}>Lede</label>
          <textarea
            required
            placeholder="Subtitle or standfirst"
            value={lede}
            onChange={(e) => setLede(e.target.value)}
            rows={3}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </div>

        {/* Category and Date row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Category</label>
            <select
              value={kicker}
              onChange={(e) => setKicker(e.target.value)}
              style={inputStyle}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Date</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Keywords */}
        <div>
          <label style={labelStyle}>Keywords</label>
          <input
            type="text"
            placeholder="Comma-separated (e.g. riba, Islamic finance, fiat)"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Result message */}
        {result && (
          <div
            style={{
              fontSize: "14px",
              color: result.type === "error" ? "#dc2626" : "#22c55e",
            }}
          >
            <p style={{ margin: 0 }}>{result.message}</p>
            {result.url && (
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--brand)",
                  fontSize: "13px",
                  marginTop: "4px",
                  display: "inline-block",
                }}
              >
                {result.url}
              </a>
            )}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={publishing || !file}
          style={{
            fontSize: "14px",
            fontWeight: 600,
            padding: "12px",
            border: "none",
            borderRadius: "4px",
            background: "var(--brand)",
            color: "var(--fg-inverse)",
            cursor: publishing || !file ? "not-allowed" : "pointer",
            opacity: publishing || !file ? 0.7 : 1,
            fontFamily: "var(--font-body)",
            alignSelf: "flex-start",
          }}
        >
          {publishing ? "Publishing..." : "Publish"}
        </button>
      </form>
    </div>
  );
}
