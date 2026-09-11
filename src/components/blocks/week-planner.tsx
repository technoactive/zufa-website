"use client";

import Link from "next/link";
import type { Route } from "next";
import { useEffect, useState } from "react";
import { Moon } from "lucide-react";
import type { DayOfWeek } from "@/content/site";
import { getLondonWeekday } from "@/lib/hours";
import { cn } from "@/lib/utils";

export interface PlannerItem {
  id: string;
  label: string;
  hours?: string;
  href: string;
}

export interface PlannerDay {
  day: DayOfWeek;
  /** Opening hours label, e.g. “11am – 11pm”. */
  open: string;
  /** True on days the restaurant is open past 11pm. */
  lateNight?: boolean;
  items: readonly PlannerItem[];
}

/**
 * Seven-day view of recurring offers. Rendered fully on the server; the only
 * client-side behaviour is highlighting today's column after hydration so the
 * prerendered HTML stays deterministic.
 */
export function WeekPlanner({ days, className }: { days: readonly PlannerDay[]; className?: string }) {
  const [today, setToday] = useState<DayOfWeek | null>(null);

  useEffect(() => {
    const update = () => setToday(getLondonWeekday(new Date()));
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <ol
      className={cn(
        "grid overflow-hidden rounded-[2rem] border border-cream/10 bg-ink/60 shadow-card backdrop-blur-sm",
        "divide-y divide-cream/10 md:grid-cols-7 md:divide-x md:divide-y-0",
        className,
      )}
    >
      {days.map(({ day, open, lateNight, items }) => {
        const isToday = today === day;
        return (
          <li
            key={day}
            aria-current={isToday ? "date" : undefined}
            className={cn(
              "relative flex gap-5 p-5 transition-colors duration-500 md:flex-col md:gap-4 md:px-4 md:py-6",
              isToday && "bg-gold/[0.07]",
            )}
          >
            {isToday ? <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-gold" /> : null}

            <header className="w-[5.5rem] shrink-0 md:w-auto">
              <p className="font-display text-3xl leading-none text-cream">
                <abbr title={day} className="no-underline">
                  {day.slice(0, 3)}
                </abbr>
              </p>
              {isToday ? <p className="mt-2 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-gold">Today</p> : null}
              <p className={cn("mt-1.5 text-xs text-smoke", isToday && "text-sand")}>{open}</p>
              {lateNight ? (
                <p className="mt-1.5 inline-flex items-center gap-1 text-[0.6875rem] text-sand">
                  <Moon className="size-3 text-gold" aria-hidden /> Late night
                </p>
              ) : null}
            </header>

            {items.length ? (
              <ul className="flex flex-1 flex-col gap-2">
                {items.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href as Route}
                      className="group/chip block rounded-xl border border-gold/20 bg-gold/[0.06] px-3 py-2.5 text-left transition-colors duration-300 hover:border-gold hover:bg-gold/15"
                    >
                      <span className="block text-xs font-semibold leading-snug text-cream">{item.label}</span>
                      {item.hours ? <span className="mt-1 block text-[0.6875rem] leading-none text-sand">{item.hours}</span> : null}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="flex-1 self-center text-xs leading-relaxed text-sand/80 md:self-auto">Full à la carte, mezze and grill — all day.</p>
            )}
          </li>
        );
      })}
    </ol>
  );
}
