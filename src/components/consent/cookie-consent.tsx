"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type Consent = "granted" | "denied";
const STORAGE_KEY = "zufa-consent-v1";
export const OPEN_CONSENT_EVENT = "zufa:open-consent";

declare global {
  interface Navigator {
    globalPrivacyControl?: boolean;
  }
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** "unknown" is the server snapshot so the banner never flashes for returning visitors. */
type Snapshot = Consent | null | "unknown";

// --- Tiny external store around localStorage + GPC (keeps state out of effects) ---
const CHANGE_EVENT = "zufa:consent-change";

function readConsent(): Snapshot {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (value === "granted" || value === "denied") return value;
  } catch {
    /* storage unavailable */
  }
  return navigator.globalPrivacyControl ? "denied" : null;
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function writeConsent(value: Consent) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* storage unavailable — decision applies to this page view only */
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/**
 * UK PECR / GDPR-compliant analytics consent using Google Consent Mode v2 ("basic" mode):
 * no analytics script is loaded until the visitor opts in. Honours Global Privacy Control.
 */
export function CookieConsent() {
  const consent = useSyncExternalStore<Snapshot>(subscribe, readConsent, () => "unknown");
  const [manuallyOpened, setManuallyOpened] = useState(false);

  useEffect(() => {
    const open = () => setManuallyOpened(true);
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, []);

  // First-time visitors see the banner (after a CSS delay so it never competes with LCP);
  // it can also be re-opened from the privacy policy page.
  const visible = consent === null || manuallyOpened;

  const decide = (value: Consent) => {
    writeConsent(value);
    setManuallyOpened(false);
    window.gtag?.("consent", "update", {
      analytics_storage: value,
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  };

  const gaId = site.analytics.gaMeasurementId;

  return (
    <>
      {consent === "granted" && gaId ? (
        <GoogleAnalytics
          gaId={gaId}
          dataLayerName="dataLayer"
        />
      ) : null}

      <div
        role="dialog"
        aria-modal="false"
        aria-labelledby="cookie-title"
        aria-describedby="cookie-desc"
        aria-hidden={!visible}
        className={cn(
          "fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-xl rounded-2xl border border-gold/20 bg-charcoal/95 p-5 text-cream shadow-card backdrop-blur-md sm:inset-x-auto sm:right-6 sm:bottom-6 sm:p-6",
          visible ? "animate-consent-in" : "pointer-events-none invisible opacity-0",
        )}
      >
        <h2 id="cookie-title" className="font-display text-2xl">
          A little something on the side?
        </h2>
        <p id="cookie-desc" className="mt-2 text-sm leading-relaxed text-sand">
          We use one optional analytics cookie (Google Analytics) to understand how the website is used so we can improve it. No advertising or tracking across other sites. Read our{" "}
          <Link href="/privacy-policy" className="text-gold underline underline-offset-4">
            privacy & cookie policy
          </Link>
          .
        </p>
        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => decide("denied")}
            className="h-11 rounded-full border border-cream/20 px-5 text-xs font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:border-cream/50"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => decide("granted")}
            className="h-11 rounded-full bg-gold-deep px-5 text-xs font-bold uppercase tracking-[0.1em] text-ink transition-colors hover:bg-cream"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </>
  );
}

/** Small link that re-opens the consent dialog (used on the privacy policy page). */
export function ManageCookiesButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className={cn("text-gold-dark underline underline-offset-4 hover:text-ink", className)}
    >
      Manage cookie preferences
    </button>
  );
}
