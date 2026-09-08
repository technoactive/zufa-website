"use client";

import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MenuIndexItem {
  slug: string;
  title: string;
  summary: string;
  availability?: string;
  image: string;
  imageAlt: string;
}

interface MenuIndexProps {
  items: readonly MenuIndexItem[];
  className?: string;
}

/**
 * Editorial menu index: big serif rows on the left, and on desktop the matching
 * photograph fades in on the right as you move down the list. Mobile shows a
 * thumbnail in each row instead.
 */
export function MenuIndex({ items, className }: MenuIndexProps) {
  const [active, setActive] = useState(0);

  return (
    <div className={cn("grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16", className)}>
      <ol className="divide-y divide-ink/10" onMouseLeave={() => setActive(0)}>
        {items.map((item, index) => {
          const isActive = index === active;
          return (
            <li key={item.slug}>
              <Link
                href={`/menu/${item.slug}` as Route}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-5 sm:gap-7 sm:py-6"
              >
                <span className={cn("font-display text-lg tabular-nums transition-colors", isActive ? "text-gold-dark" : "text-ink/40")}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span
                    className={cn(
                      "block font-display text-[2rem] leading-none transition-[color,transform] duration-500 ease-(--ease-out-expo) sm:text-[2.75rem]",
                      isActive ? "translate-x-2 text-ink" : "text-ink/75",
                    )}
                  >
                    {item.title}
                  </span>
                  <span className="mt-2 line-clamp-1 text-sm leading-snug text-ink/60">{item.availability ?? item.summary}</span>
                </span>
                <span className="relative flex items-center gap-4">
                  <span className="relative block size-16 overflow-hidden rounded-2xl sm:size-20 lg:hidden">
                    <Image src={item.image} alt="" fill sizes="80px" className="object-cover" />
                  </span>
                  <ArrowRight
                    className={cn(
                      "hidden size-5 transition-[transform,color] duration-500 lg:block",
                      isActive ? "translate-x-0 text-gold-dark" : "-translate-x-2 text-ink/30",
                    )}
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="relative hidden aspect-[4/5] overflow-hidden rounded-[2rem] shadow-card lg:block lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:self-start">
        {items.map((item, index) => (
          <Image
            key={item.slug}
            src={item.image}
            alt={item.imageAlt}
            fill
            sizes="(min-width: 1024px) 40vw, 0px"
            className={cn(
              "object-cover transition-[opacity,transform] duration-700 ease-(--ease-out-expo)",
              index === active ? "scale-100 opacity-100" : "scale-105 opacity-0",
            )}
          />
        ))}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        <p className="absolute bottom-6 left-6 right-6 text-sm leading-relaxed text-cream/90">{items[active]?.summary}</p>
      </div>
    </div>
  );
}
