import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  image?: { src: string; alt: string };
  crumbs?: readonly Crumb[];
  children?: ReactNode;
  /** Compact variant for utility pages. */
  compact?: boolean;
  /** Sits beside the title from `lg` up; stacks under the copy on smaller screens. */
  aside?: ReactNode;
  className?: string;
}

export function PageHero({ eyebrow, title, description, image, crumbs, children, compact = false, aside, className }: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-ink text-cream",
        compact
          ? "pt-[calc(var(--header-height)+1.25rem)] pb-8 sm:pt-[calc(var(--header-height)+3rem)] sm:pb-14"
          : "pt-[calc(var(--header-height)+4rem)] pb-20 sm:pb-24 lg:pt-[calc(var(--header-height)+6rem)] lg:pb-28",
        aside && "sm:pb-12 lg:pb-16",
        className,
      )}
    >
      {image ? (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={75}
            className="-z-20 object-cover"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/85 via-ink/70 to-ink" />
        </>
      ) : (
        <span aria-hidden className="arabesque-overlay opacity-[0.045]" />
      )}

      <div
        className={cn(
          "container-content",
          aside && "grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,32rem)] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(24rem,34rem)]",
        )}
      >
        <div>
          {crumbs ? <Breadcrumbs crumbs={crumbs} className={cn("mb-8", compact && "max-sm:mb-3")} /> : null}
          <div className={cn(aside ? "max-w-2xl" : "max-w-3xl")}>
            {eyebrow ? <p className={cn("eyebrow mb-5 animate-fade-up", compact && "max-sm:mb-2")}>{eyebrow}</p> : null}
            <h1
              className={cn(
                "text-display-xl animate-fade-up [animation-delay:80ms]",
                compact && "max-sm:text-[2.15rem] max-sm:leading-[1.08]",
                aside && "lg:text-[2.75rem] lg:leading-[1.12] xl:text-[3.25rem]",
              )}
            >
              {title}
            </h1>
            {description ? (
              <p className={cn("mt-6 max-w-2xl text-lg leading-relaxed text-sand animate-fade-up [animation-delay:160ms] sm:text-xl", compact && "max-sm:mt-3 max-sm:text-base")}>{description}</p>
            ) : null}
            {children ? <div className={cn("mt-10 flex flex-wrap gap-4 animate-fade-up [animation-delay:240ms]", compact && "max-sm:mt-5")}>{children}</div> : null}
          </div>
        </div>
        {aside ? <div className="min-w-0 lg:sticky lg:top-[calc(var(--header-height)+1.25rem)]">{aside}</div> : null}
      </div>
    </section>
  );
}
