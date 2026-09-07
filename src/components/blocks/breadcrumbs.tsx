import Link from "next/link";
import type { Route } from "next";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

export interface Crumb {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  crumbs: readonly Crumb[];
  className?: string;
  light?: boolean;
}

/** Visible breadcrumb trail + matching BreadcrumbList JSON-LD. The home crumb is added automatically. */
export function Breadcrumbs({ crumbs, className, light = false }: BreadcrumbsProps) {
  const trail: Crumb[] = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <>
      <nav aria-label="Breadcrumb" className={cn("text-xs uppercase tracking-[0.16em]", light ? "text-ink/60" : "text-sand/80", className)}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {trail.map((crumb, index) => {
            const isLast = index === trail.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-2">
                {isLast ? (
                  <span aria-current="page" className={light ? "text-ink" : "text-gold"}>
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.path as Route} className="transition-colors hover:text-gold">
                    {crumb.name}
                  </Link>
                )}
                {!isLast ? <ChevronRight className="size-3 opacity-60" aria-hidden /> : null}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
