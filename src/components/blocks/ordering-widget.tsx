"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Loader2, Phone } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type State = "loading" | "ready" | "unavailable";

/** Pixel offset the widget uses for its sticky category bar so it clears our fixed header. */
const HEADER_OFFSET_PX = 72;
/** If the widget hasn't rendered anything by then, show the fallback (ad blockers, script failures). */
const TIMEOUT_MS = 16_000;

function isLocalHost() {
  if (typeof window === "undefined") return false;
  return window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
}

/**
 * Flipdish direct-ordering widget — same embed as the previous WordPress site
 * (`#flipdish-menu` + `data-restaurant=fd20235`). The vendor loader injects the
 * ordering app into this node (including hash routes like
 * `#/restaurant/26877/collection/41468`). We never render children into the
 * mount point so React and Flipdish don't fight over the same DOM.
 *
 * Flipdish's loader intentionally no-ops on localhost, so the fallback is shown
 * in development. On the live domain the script is loaded by `next/script`.
 */
export function OrderingWidget({ className }: { className?: string }) {
  const container = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    if (isLocalHost()) {
      const id = window.setTimeout(() => setState("unavailable"), 0);
      return () => window.clearTimeout(id);
    }

    const target = container.current;
    if (!target) return;

    if (target.childElementCount > 0) {
      setState("ready");
      return;
    }

    const observer = new MutationObserver(() => {
      if (target.childElementCount > 0) {
        setState("ready");
        observer.disconnect();
      }
    });
    observer.observe(target, { childList: true, subtree: true });

    const timeout = window.setTimeout(() => {
      setState((current) => (current === "loading" ? "unavailable" : current));
    }, TIMEOUT_MS);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.75rem] border border-gold/25 bg-[#0a0907] shadow-glow sm:rounded-[2rem]",
        className,
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-cream/10" />
      <div
        ref={container}
        id="flipdish-menu"
        data-restaurant={site.ordering.restaurantId}
        data-plugin-version={site.ordering.pluginVersion}
        data-theme="dark"
        data-offset={HEADER_OFFSET_PX}
        className={cn(
          "relative min-h-[40rem] px-3 py-6 transition-opacity duration-500 sm:px-6 sm:py-8 lg:px-8",
          state === "ready" ? "opacity-100" : "opacity-0",
        )}
        aria-busy={state === "loading"}
      />

      {state !== "ready" ? (
        <div className="absolute inset-0 flex items-start justify-center pt-10">
          {state === "loading" ? (
            <div className="flex flex-col items-center gap-3 text-sand" role="status">
              <Loader2 className="size-6 animate-spin text-gold" aria-hidden />
              <p className="text-sm">Loading the menu…</p>
            </div>
          ) : (
            <div className="w-full max-w-xl rounded-3xl border border-cream/10 bg-charcoal p-8 text-center">
              <h3 className="font-display text-3xl text-cream">
                {isLocalHost() ? "Ordering form loads on the live site" : "Online ordering isn’t loading"}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-sand">
                {isLocalHost()
                  ? "Flipdish, the same system as the previous website, only initialises on the public domain — not on localhost. You can still order by phone or through a delivery partner."
                  : "It may be blocked by a browser extension. You can still order with us by phone, or through one of our delivery partners."}
              </p>
              <div className="mt-6 flex flex-col items-center gap-4">
                <a
                  href={`tel:${site.phone.e164}`}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-gold-deep px-7 text-[0.8125rem] font-bold uppercase tracking-[0.1em] text-ink transition-colors hover:bg-ink hover:text-cream"
                >
                  <Phone className="size-4" aria-hidden /> Call {site.phone.display}
                </a>
                <ul className="flex flex-wrap items-center justify-center gap-3">
                  {site.delivery.map((partner) => (
                    <li key={partner.name}>
                      <a
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 items-center gap-2 rounded-full border border-cream/15 bg-cream pr-4 pl-2 text-sm font-semibold text-ink transition-colors hover:border-gold hover:text-gold-dark"
                      >
                        <Image src={partner.logo} alt="" width={64} height={86} className="h-7 w-auto object-contain" />
                        {partner.name} <ArrowUpRight className="size-3.5" aria-hidden />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
