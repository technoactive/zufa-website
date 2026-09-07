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
  className?: string;
}

export function PageHero({ eyebrow, title, description, image, crumbs, children, compact = false, className }: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-ink text-cream",
        compact ? "pt-[calc(var(--header-height)+3rem)] pb-14" : "pt-[calc(var(--header-height)+4rem)] pb-20 sm:pb-24 lg:pt-[calc(var(--header-height)+6rem)] lg:pb-28",
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

      <div className="container-content">
        {crumbs ? <Breadcrumbs crumbs={crumbs} className="mb-8" /> : null}
        <div className="max-w-3xl">
          {eyebrow ? <p className="eyebrow mb-5 animate-fade-up">{eyebrow}</p> : null}
          <h1 className="text-display-xl animate-fade-up [animation-delay:80ms]">{title}</h1>
          {description ? (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sand animate-fade-up [animation-delay:160ms] sm:text-xl">{description}</p>
          ) : null}
          {children ? <div className="mt-10 flex flex-wrap gap-4 animate-fade-up [animation-delay:240ms]">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
