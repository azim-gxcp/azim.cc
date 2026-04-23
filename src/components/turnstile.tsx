"use client";

import { useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

interface TurnstileProps {
  onToken: (token: string) => void;
  onExpire?: () => void;
}

export function Turnstile({ onToken, onExpire }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  const onExpireRef = useRef(onExpire);

  onTokenRef.current = onToken;
  onExpireRef.current = onExpire;

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.turnstile || widgetIdRef.current)
      return;

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: SITE_KEY,
      callback: (token: string) => onTokenRef.current(token),
      "expired-callback": () => onExpireRef.current?.(),
      theme: "auto",
    });
  }, []);

  useEffect(() => {
    // If turnstile script already loaded
    if (window.turnstile) {
      renderWidget();
      return;
    }

    // Load script
    const existing = document.querySelector(
      'script[src*="turnstile"]'
    );
    if (!existing) {
      const script = document.createElement("script");
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.onload = renderWidget;
      document.head.appendChild(script);
    } else {
      // Script exists but may not be loaded yet
      existing.addEventListener("load", renderWidget);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [renderWidget]);

  if (!SITE_KEY) return null;

  return <div ref={containerRef} />;
}
