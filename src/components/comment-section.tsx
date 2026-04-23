"use client";

import { useState, useEffect } from "react";
import {
  fetchComments,
  submitComment,
  ApiError,
  type Comment,
} from "@/lib/api";
import { Turnstile } from "./turnstile";

interface CommentSectionProps {
  slug: string;
}

export function CommentSection({ slug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments(slug)
      .then(setComments)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <section className="mt-16">
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "24px",
          fontWeight: 600,
          letterSpacing: "-0.015em",
          color: "var(--fg1)",
          marginBottom: "24px",
          fontVariationSettings: "'opsz' 72",
        }}
      >
        Comments
      </h3>

      {loading ? (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            color: "var(--fg3)",
          }}
        >
          Loading comments...
        </p>
      ) : comments.length === 0 ? (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "15px",
            color: "var(--fg3)",
            marginBottom: "32px",
          }}
        >
          No comments yet. Be the first to share your thoughts.
        </p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          {comments.map((c) => (
            <CommentCard key={c.id} comment={c} />
          ))}
        </div>
      )}

      <CommentForm
        slug={slug}
        onSubmitted={(c) => setComments((prev) => [c, ...prev])}
      />
    </section>
  );
}

function CommentCard({ comment }: { comment: Comment }) {
  const date = new Date(comment.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            fontWeight: 600,
            color: "var(--fg1)",
          }}
        >
          {comment.authorName}
        </span>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            color: "var(--fg3)",
          }}
        >
          {date}
        </span>
      </div>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "15px",
          lineHeight: 1.7,
          color: "var(--fg2)",
          margin: 0,
          whiteSpace: "pre-wrap",
        }}
      >
        {comment.body}
      </p>
    </div>
  );
}

function CommentForm({
  slug,
  onSubmitted,
}: {
  slug: string;
  onSubmitted: (c: Comment) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !body) return;

    setState("loading");
    setErrorMsg("");

    try {
      await submitComment({
        postSlug: slug,
        authorName: name,
        authorEmail: email,
        body,
        turnstileToken,
      });
      setState("done");
    } catch (err) {
      setState("error");
      if (err instanceof ApiError) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
    }
  }

  if (state === "done") {
    return (
      <div
        style={{
          padding: "20px",
          borderRadius: "8px",
          background: "var(--bg-sunken)",
          border: "1px solid var(--border-subtle)",
          fontFamily: "var(--font-body)",
          fontSize: "15px",
          color: "var(--fg2)",
          textAlign: "center",
        }}
      >
        Your comment has been submitted for moderation. It will appear once
        approved.
      </div>
    );
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
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: "20px",
        borderRadius: "8px",
        border: "1px solid var(--border-subtle)",
        background: "var(--bg-sunken)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "14px",
          fontWeight: 600,
          color: "var(--fg2)",
          marginBottom: "4px",
        }}
      >
        Leave a comment
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
        }}
      >
        <input
          type="text"
          required
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          style={inputStyle}
        />
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={200}
          style={inputStyle}
        />
      </div>

      <textarea
        required
        placeholder="Share your thoughts..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        maxLength={5000}
        rows={4}
        style={{
          ...inputStyle,
          resize: "vertical",
          minHeight: "100px",
          lineHeight: 1.6,
        }}
      />

      <Turnstile
        onToken={setTurnstileToken}
        onExpire={() => setTurnstileToken("")}
      />

      {state === "error" && errorMsg && (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            color: "#dc2626",
            margin: 0,
          }}
        >
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "14px",
          fontWeight: 600,
          padding: "12px 22px",
          border: "none",
          borderRadius: "4px",
          cursor: state === "loading" ? "not-allowed" : "pointer",
          background: "var(--brand)",
          color: "var(--fg-inverse)",
          opacity: state === "loading" ? 0.7 : 1,
          transition: "background 160ms",
          alignSelf: "flex-start",
        }}
      >
        {state === "loading" ? "Submitting..." : "Submit comment"}
      </button>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "12px",
          color: "var(--fg3)",
          margin: 0,
        }}
      >
        Your email will not be published. Comments are moderated before
        appearing.
      </p>
    </form>
  );
}
