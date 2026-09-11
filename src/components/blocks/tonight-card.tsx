"use client";

import Link from "next/link";
import type { Route } from "next";
import { useEffect, useState } from "react";
import { ArrowUpRight, Clock } from "lucide-react";
import { formatTime, getLondonWeekday, getOpenStatus, periodForDay, type OpenStatus } from "@/lib/hours";
import type { DayOfWeek } from "@/content/site";
import { cn } from "@/lib/utils";

export interface TonightOffer {
  id: string;
  label: string;
  hours?: string;
  href: string;
  days: readonly DayOfWeek[];
}

interface TonightCardProps {
  offers: readonly TonightOffer[];
  className?: string;
}

/**
 * "Today at Zufa": the day, its hours, live open/closed status and whichever
 * offers run today. Renders a neutral shell on the server and fills in on the
 * client so the prerendered HTML never depends on Date.
 */
export function TonightCard({ offers, className }: TonightCardProps) {
  const [now, setNow] = useState<{ day: DayOfWeek; status: OpenStatus } | null>(null);

  useEffect(() => {
    const update = () => {
      const date = new Date();
      setNow({ day: getLondonWeekday(date), status: getOpenStatus(date) });
    };
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const period = now ? periodForDay(now.day) : undefined;
  const today = now ? offers.filter((offer) => offer.days.includes(now.day)) : [];

  return (
    <aside
      aria-label="Today at Zufa"
      className={cn(
        "relative overflow-hidden rounded-[1.75rem] border border-cream/12 bg-ink/55 p-6 text-cream shadow-card backdrop-blur-xl sm:p-7",
        className,
      )}
    >
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-gold/15 blur-3xl" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Today</p>
          <p className="mt-2 font-display text-3xl leading-none">{now ? now.day : <span className="inline-block h-7 w-28 rounded bg-cream/10" />}</p>
        </div>
        <p className={cn("inline-flex items-center gap-2 text-xs", now?.status.isOpen ? "text-cream" : "text-sand")} aria-live="polite">
          <span
            aria-hidden
            className={cn("size-2 rounded-full", now?.status.isOpen ? "bg-success shadow-[0_0_0_4px_rgb(61_191_122/0.2)]" : "bg-smoke")}
          />
          {now ? (now.status.isOpen ? "Open now" : "Closed") : ""}
        </p>
      </div>

      <p className="mt-4 flex items-center gap-2 text-sm text-sand">
        <Clock className="size-3.5 text-gold" aria-hidden />
        {period ? (
          <>
            {formatTime(period.opens)} – {formatTime(period.closes)}
            <span className="text-smoke">·</span>
            <span className="text-cream/80">{now?.status.message.replace(/^(Open now|Closed) · /, "")}</span>
          </>
        ) : (
          <span className="inline-block h-4 w-40 rounded bg-cream/10" />
        )}
      </p>

      <ul className="mt-5 space-y-2 border-t border-cream/10 pt-5">
        {now ? (
          today.length ? (
            today.map((offer) => (
              <li key={offer.id}>
                <Link
                  href={offer.href as Route}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-cream/10 px-3.5 py-2.5 text-sm transition-colors hover:border-gold/60"
                >
                  <span>
                    <span className="block font-semibold text-cream">{offer.label}</span>
                    {offer.hours ? <span className="mt-0.5 block text-xs text-sand">{offer.hours}</span> : null}
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-gold transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </li>
            ))
          ) : (
            <li className="text-sm text-sand">Full à la carte, mezze and the charcoal grill, all day.</li>
          )
        ) : (
          <>
            <li className="h-12 rounded-xl bg-cream/[0.06]" aria-hidden />
            <li className="h-12 rounded-xl bg-cream/[0.06]" aria-hidden />
          </>
        )}
      </ul>

      <Link
        href="/bookings"
        className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-full border border-gold bg-ink text-[0.8125rem] font-semibold text-cream transition-colors hover:bg-stone"
      >
        Book a table
      </Link>
    </aside>
  );
}
