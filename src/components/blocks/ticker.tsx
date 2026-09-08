import Link from "next/link";
import type { Route } from "next";
import { cn } from "@/lib/utils";

export interface TickerItem {
  label: string;
  href?: string;
}

interface TickerProps {
  items: readonly TickerItem[];
  className?: string;
}

const itemClass = "px-6 py-3.5 font-display text-lg text-cream/85 sm:text-xl";

function TickerRow({ items, decorative = false }: { items: readonly TickerItem[]; decorative?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={decorative || undefined}>
      {items.map((item, index) => (
        <li key={`${item.label}-${index}`} className="flex items-center whitespace-nowrap">
          {item.href && !decorative ? (
            <Link href={item.href as Route} className={cn(itemClass, "transition-colors hover:text-gold")}>
              {item.label}
            </Link>
          ) : (
            <span className={itemClass}>{item.label}</span>
          )}
          <span aria-hidden className="size-1.5 rotate-45 bg-gold/70" />
        </li>
      ))}
    </ul>
  );
}

/** Slow-scrolling strip of short facts. The second copy is decorative (aria-hidden, no links) so screen readers and agents see each item once. */
export function Ticker({ items, className }: TickerProps) {
  return (
    <div className={cn("relative overflow-hidden border-y border-cream/10 bg-[#0a0907]/80 backdrop-blur-sm", className)}>
      <div className="marquee-track animate-marquee">
        <TickerRow items={items} />
        <TickerRow items={items} decorative />
      </div>
    </div>
  );
}
