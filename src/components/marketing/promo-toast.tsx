"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { ArrowRight, Sunrise, X } from "lucide-react";
import { useConsentSnapshot } from "@/components/consent/cookie-consent";
import { promo } from "@/content/promo";
import { cn } from "@/lib/utils";

const STORAGE_KEY = `zufa-promo-${promo.id}`;
const DAY_MS = 24 * 60 * 60 * 1000;

function isSnoozed(): boolean {
  try {
    const until = Number(window.localStorage.getItem(STORAGE_KEY));
    return Number.isFinite(until) && until > Date.now();
  } catch {
    return false;
  }
}

function snooze(days: number) {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now() + days * DAY_MS));
  } catch {
    /* storage unavailable — the card simply won't be remembered */
  }
}

function track(action: "view" | "click" | "dismiss") {
  window.gtag?.("event", `promo_${action}`, { promo_id: promo.id });
}

/**
 * Small, dismissible promotional card. Deliberately not a modal: it never blocks
 * the page, appears only after the visitor has settled (time or scroll), waits
 * for the cookie banner to be answered, and remembers dismissals.
 */
export function PromoToast() {
  const pathname = usePathname();
  const consent = useConsentSnapshot();
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  const excluded = promo.excludePaths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
  // Don't compete with the cookie banner; wait until it has been answered.
  const consentSettled = consent === "granted" || consent === "denied";
  const eligible = promo.enabled && !excluded && consentSettled;

  useEffect(() => {
    if (!eligible || isSnoozed()) return;

    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      setVisible(true);
      track("view");
      cleanup();
    };
    const onScroll = () => {
      const scrolled = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (scrolled > 0.33) show();
    };
    const timer = window.setTimeout(show, promo.delaySeconds * 1000);
    window.addEventListener("scroll", onScroll, { passive: true });
    const cleanup = () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
    return cleanup;
  }, [eligible]);

  const hide = (days: number) => {
    snooze(days);
    setClosing(true);
    window.setTimeout(() => {
      setVisible(false);
      setClosing(false);
    }, 250);
  };
  const dismiss = () => {
    track("dismiss");
    hide(promo.dismissDays);
  };
  const convert = () => {
    track("click");
    snooze(promo.convertedDays);
  };

  useEffect(() => {
    if (!visible) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // `dismiss` is a stable closure over props/constants; re-subscribing on visibility is enough.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible) return null;

  return (
    <aside
      role="dialog"
      aria-modal="false"
      aria-labelledby="promo-title"
      aria-describedby="promo-body"
      className={cn(
        "fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[55] mx-auto max-w-sm overflow-hidden rounded-2xl border border-gold/25 bg-charcoal/95 text-cream shadow-card backdrop-blur-md",
        "sm:inset-x-auto sm:bottom-6 sm:left-6 sm:mx-0",
        closing ? "animate-promo-out" : "animate-promo-in",
      )}
    >
      <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 size-36 rounded-full bg-gold/15 blur-2xl" />
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute right-3 top-3 grid size-8 place-items-center rounded-full text-cream/60 transition-colors hover:bg-cream/10 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        <X className="size-4" aria-hidden />
      </button>

      <div className="p-4 pr-12 sm:p-6 sm:pr-12">
        <p className="flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold">
          <Sunrise className="size-3.5" aria-hidden />
          {promo.eyebrow}
        </p>
        <h2 id="promo-title" className="mt-1.5 font-display text-2xl leading-tight sm:mt-2 sm:text-[1.75rem]">
          {promo.title}
        </h2>
        <p id="promo-body" className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-sand sm:mt-2 sm:line-clamp-none">
          {promo.body}
        </p>
        <p className="mt-2.5 inline-flex rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-gold sm:mt-3">{promo.badge}</p>

        <div className="mt-4 flex flex-wrap items-center gap-3 sm:mt-5">
          <Link
            href={promo.cta.href as Route}
            onClick={convert}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-gold px-5 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-gold-deep"
          >
            {promo.cta.label}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href={promo.secondary.href as Route}
            onClick={convert}
            className="hidden text-sm font-medium text-cream/80 underline-offset-4 transition-colors hover:text-cream hover:underline sm:inline"
          >
            {promo.secondary.label}
          </Link>
        </div>
      </div>
    </aside>
  );
}
