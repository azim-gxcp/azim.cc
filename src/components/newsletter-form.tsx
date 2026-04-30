"use client";

import { useState } from "react";
import { subscribeNewsletter, ApiError } from "@/lib/api";
import { Turnstile } from "./turnstile";

export function NewsletterForm({
  variant = "soft",
}: {
  variant?: "soft" | "hero";
}) {
  const [email, setEmail] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  const isHero = variant === "hero";
  const kickerColor = isHero ? "var(--green-5)" : "var(--brand)";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setState("loading");
    setErrorMsg("");

    try {
      await subscribeNewsletter({ email, turnstileToken });
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

  return (
    <section
      className="mt-18"
      style={{
        padding: "clamp(36px, 5vw, 64px) clamp(24px, 4vw, 48px)",
        borderRadius: "12px",
        // background: isHero ? "var(--purple-1)" : "var(--bg-sunken)",
        color: isHero ? "var(--fg-inverse)" : "var(--fg1)",
        border: isHero ? "none" : "1px solid var(--border-subtle)",
      }}
    >
      <div className="max-w-140 mx-auto text-center">
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: kickerColor,
            marginBottom: "14px",
          }}
        >
          The weekly digest
        </div>
        <h2
          className="m-0 mb-3.5"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 4vw, 36px)",
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            fontVariationSettings: "'opsz' 96",
          }}
        >
          One article a week, sent on Friday evening.
        </h2>
        <p
          className="m-0 mb-7"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "16px",
            lineHeight: 1.6,
            color: isHero ? "inherit" : "var(--fg2)",
            opacity: isHero ? 0.8 : 1,
          }}
        >
          A single piece on economics, finance, or Islamic finance. No tracking,
          no list-sharing. Unsubscribe at any time.
        </p>

        {state === "done" ? (
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              padding: "12px",
            }}
          >
            Thanks, check <em>{email}</em> for a confirmation link.
          </div>
        ) : (
          <form
            className="flex flex-col items-center gap-3"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-2.5 justify-center flex-wrap w-full">
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-w-[280px]"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "16px",
                  padding: "12px 14px",
                  background: isHero
                    ? "rgba(255,255,255,0.1)"
                    : "var(--bg-elev)",
                  border: isHero
                    ? "1px solid rgba(255,255,255,0.2)"
                    : "1px solid var(--border)",
                  borderRadius: "4px",
                  color: "inherit",
                  outline: "none",
                }}
              />
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
                  cursor:
                    state === "loading" ? "not-allowed" : "pointer",
                  background: "var(--brand)",
                  color: "var(--fg-inverse)",
                  opacity: state === "loading" ? 0.7 : 1,
                  transition: "background 160ms, transform 80ms",
                }}
              >
                {state === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </div>

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
          </form>
        )}

        <div
          className="mt-5"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            color: isHero ? "inherit" : "var(--fg3)",
            opacity: isHero ? 0.6 : 1,
          }}
        >
          2,400+ readers &middot; weekly since 2023
        </div>
      </div>
    </section>
  );
}
