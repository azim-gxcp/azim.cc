import { NextResponse } from "next/server";

/**
 * EU 27 + UK + the rest of the EEA (Iceland, Liechtenstein, Norway) +
 * Switzerland. These are the places whose cookie rules expect consent to be
 * collected before a non-essential cookie is set.
 */
const CONSENT_REQUIRED = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
  "SI", "ES", "SE",
  "GB",
  "IS", "LI", "NO",
  "CH",
]);

/**
 * Tells the browser whether this visitor needs to be asked about cookies.
 *
 * Reading a request header keeps this handler dynamic, so the verdict is never
 * cached and shared between visitors in different countries. `no-store` stops
 * any intermediary caching it either.
 *
 * Vercel populates `x-vercel-ip-country`. Anywhere else (local `next start`,
 * or an IP it cannot place) the header is absent, and we fail closed by asking
 * for consent rather than assuming it is unnecessary.
 */
export function GET(request: Request) {
  const country = request.headers.get("x-vercel-ip-country");
  const consentRequired = country === null || CONSENT_REQUIRED.has(country);

  return NextResponse.json(
    { country, consentRequired },
    { headers: { "Cache-Control": "no-store" } }
  );
}
