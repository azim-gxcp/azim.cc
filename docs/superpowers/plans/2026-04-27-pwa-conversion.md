# PWA Conversion Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make azim.cc installable as a phone/desktop app with offline article reading.

**Architecture:** Add a web app manifest via Next.js convention, generate PWA icon sizes from the existing Az favicon, register a service worker that caches visited pages and articles for offline access.

**Tech Stack:** Next.js 16 (manifest.ts convention), Workbox (service worker), existing icon.tsx as base

---

### Task 1: Create web app manifest

**Files:**
- Create: `src/app/manifest.ts`

- [ ] **Step 1: Create the manifest file**

```ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "azim.cc",
    short_name: "azim.cc",
    description:
      "Economics, monetary architecture, Islamic Finance and first-principles thinking about how money should work.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#18181b",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/manifest.ts
git commit -m "feat: add web app manifest for PWA"
```

---

### Task 2: Generate PWA icon sizes

**Files:**
- Create: `public/icon-192.png`
- Create: `public/icon-512.png`

- [ ] **Step 1: Create icon generation script**

Create `scripts/generate-pwa-icons.ts`:

```ts
import { ImageResponse } from "next/og";
import fs from "fs";

async function generate(size: number, filename: string) {
  const response = new ImageResponse(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#18181b",
          borderRadius: `${Math.round(size * 0.15)}px`,
        },
        children: {
          type: "span",
          props: {
            style: {
              fontSize: `${Math.round(size * 0.55)}px`,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            },
            children: "Az",
          },
        },
      },
    },
    { width: size, height: size }
  );

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(`public/${filename}`, buffer);
  console.log(`Created public/${filename}`);
}

await generate(192, "icon-192.png");
await generate(512, "icon-512.png");
```

- [ ] **Step 2: Run the script**

```bash
npx tsx scripts/generate-pwa-icons.ts
```

Alternatively, generate the PNGs using any image tool. The icons should be a dark (#18181b) rounded square with white bold "Az" text centered, matching the existing favicon style.

- [ ] **Step 3: Commit**

```bash
git add public/icon-192.png public/icon-512.png
git commit -m "feat: add PWA icon assets (192, 512)"
```

---

### Task 3: Add theme-color meta tag

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Add theme-color to metadata**

In the existing `metadata` export in `src/app/layout.tsx`, add:

```ts
other: {
  "mobile-web-app-capable": "yes",
  "apple-mobile-web-app-capable": "yes",
  "apple-mobile-web-app-status-bar-style": "black-translucent",
},
```

And add `themeColor` to the metadata object:

```ts
themeColor: [
  { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  { media: "(prefers-color-scheme: dark)", color: "#18181b" },
],
```

- [ ] **Step 2: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: add PWA meta tags for theme color and mobile app capable"
```

---

### Task 4: Create service worker

**Files:**
- Create: `public/sw.js`

- [ ] **Step 1: Create the service worker**

```js
const CACHE_NAME = "azim-cc-v1";
const OFFLINE_URL = "/offline";

const PRECACHE = ["/", "/offline"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  // Skip API requests and external resources
  const url = new URL(request.url);
  if (url.pathname.startsWith("/api/") || url.origin !== self.location.origin) {
    return;
  }

  // Network-first for HTML pages (articles), cache on success
  if (request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request).then((r) => r || caches.match(OFFLINE_URL)))
    );
    return;
  }

  // Cache-first for static assets (JS, CSS, fonts, images)
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        return response;
      });
    })
  );
});
```

- [ ] **Step 2: Commit**

```bash
git add public/sw.js
git commit -m "feat: add service worker with network-first article caching"
```

---

### Task 5: Create offline fallback page

**Files:**
- Create: `src/app/offline/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
export default function OfflinePage() {
  return (
    <div
      className="max-w-[600px] mx-auto px-5 py-24 text-center"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "28px",
          fontWeight: 600,
          color: "var(--fg1)",
          marginBottom: "16px",
          fontVariationSettings: "'opsz' 72",
        }}
      >
        You are offline
      </h1>
      <p style={{ fontSize: "16px", color: "var(--fg2)", lineHeight: 1.6 }}>
        Articles you have previously visited are still available. Go back and
        check your reading history.
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/offline/page.tsx
git commit -m "feat: add offline fallback page"
```

---

### Task 6: Register service worker

**Files:**
- Create: `src/components/sw-register.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create the registration component**

```tsx
"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  return null;
}
```

- [ ] **Step 2: Add to layout**

In `src/app/layout.tsx`, import and render inside `<body>`:

```tsx
import { ServiceWorkerRegister } from "@/components/sw-register";
```

Add `<ServiceWorkerRegister />` inside the body, after the other components.

- [ ] **Step 3: Commit**

```bash
git add src/components/sw-register.tsx src/app/layout.tsx
git commit -m "feat: register service worker from layout"
```

---

### Task 7: Test and deploy

- [ ] **Step 1: Local test**

Run `npm run build && npm start`, open Chrome DevTools > Application tab:
- Manifest should show with icons
- Service worker should be registered
- "Install app" option should appear in browser

- [ ] **Step 2: Push and deploy**

```bash
git push origin main
```

Vercel auto-deploys. After deploy, visit azim.cc on mobile Chrome/Safari and verify the "Add to Home Screen" / "Install App" prompt appears.

- [ ] **Step 3: Deploy server (if needed)**

No server changes required for PWA. Frontend only.
