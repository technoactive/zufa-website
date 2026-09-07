import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "ink" | "charcoal" | "cream" | "parchment";

const tones: Record<Tone, string> = {
  ink: "bg-ink text-cream",
  charcoal: "bg-charcoal text-cream",
  cream: "bg-cream text-ink",
  parchment: "bg-parchment text-ink",
};

interface SectionProps extends ComponentProps<"section"> {
  tone?: Tone;
  /** Adds the arabesque background motif. */
  pattern?: boolean;
  padded?: boolean;
}

export function Section({ tone = "ink", pattern = false, padded = true, className, children, ...rest }: SectionProps) {
  const isLight = tone === "cream" || tone === "parchment";
  return (
    <section
      className={cn(tones[tone], padded && "py-20 sm:py-24 lg:py-32", pattern && "arabesque", className)}
      {...rest}
    >
      {pattern ? (
        <span aria-hidden className={cn("arabesque-overlay", isLight ? "opacity-[0.08]" : "opacity-[0.045]")} />
      ) : null}
      {children}
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Use on light backgrounds. */
  light?: boolean;
}

export function SectionHeading({ eyebrow, title, description, align = "left", as: Tag = "h2", className, light = false }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-prose", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <p className={cn("eyebrow mb-4", light && "text-gold-dark")}>{eyebrow}</p> : null}
      <Tag className={cn("text-display-lg", light ? "text-ink" : "text-cream")}>{title}</Tag>
      {description ? (
        <div className={cn("mt-5 text-base leading-relaxed sm:text-lg", light ? "text-ink/70" : "text-sand")}>{description}</div>
      ) : null}
    </div>
  );
}
