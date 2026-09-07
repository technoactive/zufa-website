"use client";

import { useState } from "react";
import { ExternalLink, Loader2 } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * SevenRooms reservation widget. Rendered lazily in an iframe with a graceful
 * fallback link so guests can always reach the booking page even if the
 * third-party script is blocked.
 */
export function ReservationWidget({ className }: { className?: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("overflow-hidden rounded-3xl border border-ink/10 bg-parchment shadow-card", className)}>
      <div className="relative min-h-[720px]">
        {!loaded ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-ink/60" aria-hidden>
            <Loader2 className="size-6 animate-spin" />
            <p className="text-sm">Loading availability…</p>
          </div>
        ) : null}
        <iframe
          src={site.reservations.embedUrl}
          title="Book a table at Zufa Hatch End — reservation widget by SevenRooms"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={cn("h-[760px] w-full border-0 transition-opacity duration-500", loaded ? "opacity-100" : "opacity-0")}
          allow="payment"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <p className="border-t border-ink/10 px-6 py-4 text-center text-sm text-ink/60">
        Widget not loading?{" "}
        <a
          href={site.reservations.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-gold-dark underline underline-offset-4 hover:text-ink"
        >
          Open the booking page <ExternalLink className="size-3.5" aria-hidden />
        </a>{" "}
        or call{" "}
        <a href={`tel:${site.phone.e164}`} className="text-gold-dark underline underline-offset-4 hover:text-ink">
          {site.phone.display}
        </a>
        .
      </p>
    </div>
  );
}
