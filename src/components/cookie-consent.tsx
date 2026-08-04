"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Button } from "@/components/ui/button";

const GA_ID = "G-H6MQPPGVF2";
const STORAGE_KEY = "azim_cookie_consent";
const REGION_KEY = "azim_consent_region";
const SETTINGS_EVENT = "azim:cookie-settings";

/** "none" = not answered yet. The server renders "unknown" and shows nothing. */
type Stored = "granted" | "denied" | "none";
/** Whether this visitor's country requires asking before setting a cookie. */
type Region = "pending" | "required" | "not-required";

/* ---------------------------------------------------------------- choice store */

const choiceListeners = new Set<() => void>();

function subscribeChoice(onChange: () => void) {
  choiceListeners.add(onChange);
  // `storage` fires in *other* tabs, so a choice made elsewhere lands here too.
  window.addEventListener("storage", onChange);
  return () => {
    choiceListeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getChoice(): Stored {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "granted" || stored === "denied" ? stored : "none";
  } catch {
    // Storage blocked (private mode, hardened browser): treat as unanswered.
    return "none";
  }
}

function getServerChoice(): "unknown" {
  return "unknown";
}

/* ---------------------------------------------------------------- region store */

let region: Region = "pending";
let regionInFlight = false;
const regionListeners = new Set<() => void>();

function subscribeRegion(onChange: () => void) {
  regionListeners.add(onChange);
  return () => regionListeners.delete(onChange);
}

function getRegion(): Region {
  return region;
}

function getServerRegion(): "pending" {
  return "pending";
}

function setRegion(next: Region) {
  region = next;
  regionListeners.forEach((notify) => notify());
}

/**
 * Resolves once per tab: reads the cached verdict, otherwise asks the server
 * which country the visitor is in. Any failure falls back to asking for
 * consent, so a broken lookup can never silently start tracking someone.
 */
function loadRegion() {
  if (region !== "pending" || regionInFlight) return;

  try {
    const cached = window.sessionStorage.getItem(REGION_KEY);
    if (cached === "required" || cached === "not-required") {
      setRegion(cached);
      return;
    }
  } catch {
    // Session storage blocked: fall through and ask the server.
  }

  regionInFlight = true;
  fetch("/api/geo")
    .then((response) => response.json())
    .then((data: { consentRequired: boolean }) => {
      const verdict: Region = data.consentRequired ? "required" : "not-required";
      try {
        window.sessionStorage.setItem(REGION_KEY, verdict);
      } catch {
        // Not cacheable here; we will just ask again next page load.
      }
      regionInFlight = false;
      setRegion(verdict);
    })
    .catch(() => {
      regionInFlight = false;
      setRegion("required");
    });
}

/* ---------------------------------------------------------------- persistence */

/**
 * Google's documented opt-out flag. Unmounting the component removes the React
 * element but not the already-injected script, so gtag stays alive in memory
 * for the rest of the page view and will rewrite its cookies on engagement
 * events. This stops it at the source.
 */
function setAnalyticsBlocked(blocked: boolean) {
  (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = blocked;
}

function clearGoogleAnalyticsCookies() {
  const host = window.location.hostname;
  const domains = ["", `; domain=${host}`, `; domain=.${host}`];
  const parts = host.split(".");
  if (parts.length > 2) domains.push(`; domain=.${parts.slice(-2).join(".")}`);

  for (const pair of document.cookie.split(";")) {
    const name = pair.split("=")[0]?.trim();
    if (!name || !name.startsWith("_ga")) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
    }
  }
}

function storeChoice(choice: "granted" | "denied") {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Storage blocked: nothing persists, so the banner returns next visit.
  }
  choiceListeners.forEach((notify) => notify());
}

/* ---------------------------------------------------------------- component */

/**
 * Consent gate for Google Analytics.
 *
 * Readers in the UK, EU, EEA and Switzerland are asked before anything is
 * loaded, so no analytics cookie is set until they accept. Everywhere else
 * Analytics starts normally, which keeps the numbers complete without putting
 * a dialog in front of readers whose law does not call for one. Anyone can
 * still change their answer later through the footer link.
 *
 * Vercel Analytics is deliberately not gated: it is cookieless and does not
 * identify readers, so it needs no consent anywhere.
 */
export function CookieConsent() {
  const choice = useSyncExternalStore(
    subscribeChoice,
    getChoice,
    getServerChoice
  );
  const visitorRegion = useSyncExternalStore(
    subscribeRegion,
    getRegion,
    getServerRegion
  );
  const [reopened, setReopened] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const undecided = choice === "none";

  useEffect(() => {
    if (undecided) loadRegion();
  }, [undecided]);

  const showBanner = (undecided && visitorRegion === "required") || reopened;
  const showAnalytics =
    choice === "granted" || (undecided && visitorRegion === "not-required");

  // Until both the stored choice and the region are known we do nothing at all.
  // Acting early would wipe a returning reader's identifier on every page load
  // during the few hundred ms before the region lookup resolves.
  const settled =
    choice !== "unknown" && (choice !== "none" || visitorRegion !== "pending");

  useEffect(() => {
    if (!settled) return;

    if (showAnalytics) {
      // Clears a flag left by an earlier denial, so re-accepting really works.
      setAnalyticsBlocked(false);
      return;
    }

    // Analytics must not be running. Stop any instance still live in the page
    // and leave no identifier behind, whether the reader declined outright or
    // simply has not answered yet. Runs on later loads too, catching a cookie
    // that gtag rewrote after unmounting on the page where consent was
    // withdrawn.
    setAnalyticsBlocked(true);
    clearGoogleAnalyticsCookies();
  }, [settled, showAnalytics]);

  useEffect(() => {
    // Reopening is reader-initiated (footer link), so move focus to the panel.
    function reopen() {
      setReopened(true);
      requestAnimationFrame(() => panelRef.current?.focus());
    }

    window.addEventListener(SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(SETTINGS_EVENT, reopen);
  }, []);

  function decide(next: "granted" | "denied") {
    setReopened(false);
    storeChoice(next);
  }

  return (
    <>
      {showAnalytics && <GoogleAnalytics gaId={GA_ID} />}

      {showBanner && (
        <div
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-body"
          className="fixed bottom-4 left-4 right-4 z-50 rounded-lg border p-5 outline-none animate-in fade-in slide-in-from-bottom-4 duration-300 sm:right-auto sm:max-w-100"
          style={{
            borderColor: "var(--border)",
            // Denser than --bg-glass-card: this panel floats over article text,
            // so it needs more cover than an in-flow card does.
            background: "color-mix(in oklab, var(--bg-elev) 94%, transparent)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <div
            id="cookie-consent-title"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "17px",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "var(--fg1)",
              marginBottom: "6px",
            }}
          >
            Cookies on this site
          </div>

          <p
            id="cookie-consent-body"
            className="m-0"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              lineHeight: 1.6,
              color: "var(--fg2)",
            }}
          >
            I use Google Analytics to see which articles get read. It stores a
            cookie on your device, so it only runs if you accept. Declining
            changes nothing about what you can read here.
          </p>

          <div className="mt-4 flex items-center gap-2">
            <Button onClick={() => decide("granted")}>Accept</Button>
            <Button variant="outline" onClick={() => decide("denied")}>
              Decline
            </Button>
            <Link
              href="/terms"
              className="ml-auto no-underline hover:underline"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                color: "var(--fg3)",
              }}
            >
              Terms
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

/** Footer link that reopens the notice so a reader can change their answer. */
export function CookieSettingsLink({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={() => window.dispatchEvent(new Event(SETTINGS_EVENT))}
    >
      Cookies
    </button>
  );
}
