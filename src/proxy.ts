import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Edge gate for the /admin area (Next 16 Proxy, formerly Middleware).
//
// This is defense-in-depth ON TOP OF the app's own login. The real
// authorization is still enforced by the backend API, which runs `requireAdmin`
// (JWT verify + role check) on every /api/admin/* call. This gate only stops
// the public from loading the admin shell at all.
//
// The app's auth tokens live in localStorage and travel as `Bearer` headers on
// API calls, so the server cannot read them on a page navigation and this proxy
// cannot verify the app JWT. Instead it uses a separate HTTP Basic Auth
// credential (env vars), independent of the app login.
//
// Fail-open when unconfigured, so a missing env var can never lock the owner
// out of their own admin. Set both vars in the Vercel project to activate.

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export function proxy(request: NextRequest) {
  const expectedUser = process.env.ADMIN_GATE_USER;
  const expectedPass = process.env.ADMIN_GATE_PASSWORD;

  // Gate not configured: let everything through (backend auth still applies).
  if (!expectedUser || !expectedPass) {
    return NextResponse.next();
  }

  const header = request.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    let decoded = "";
    try {
      decoded = atob(header.slice(6));
    } catch {
      decoded = "";
    }
    const sep = decoded.indexOf(":");
    if (sep !== -1) {
      const user = decoded.slice(0, sep);
      const pass = decoded.slice(sep + 1);
      if (
        timingSafeEqual(user, expectedUser) &&
        timingSafeEqual(pass, expectedPass)
      ) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="azim.cc admin", charset="UTF-8"',
    },
  });
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
