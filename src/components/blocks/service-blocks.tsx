import { MessageCircle, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import type { ServiceFact, ServiceOccasion, ServiceStep } from "@/content/services";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Facts strip — four big numbers under the hero                        */
/* ------------------------------------------------------------------ */

export function FactsStrip({ facts, className }: { facts: readonly ServiceFact[]; className?: string }) {
  return (
    <div className={cn("relative isolate overflow-hidden border-y border-cream/[0.08] bg-[#0a0907]", className)}>
      <div className="container-content">
        <dl className="grid grid-cols-2 divide-cream/[0.08] lg:grid-cols-4 lg:divide-x">
          {facts.map((fact, index) => (
            <Reveal key={fact.label} delay={index * 60} className="flex flex-col py-8 lg:px-8 lg:py-10 lg:first:pl-0 lg:last:pr-0">
              <dt className="order-2 mt-3 max-w-[16rem] text-sm leading-snug text-sand">{fact.label}</dt>
              <dd className="order-1 font-display text-4xl leading-none text-gold sm:text-5xl">{fact.value}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Numbered steps                                                       */
/* ------------------------------------------------------------------ */

export function StepList({ steps, light = false, className }: { steps: readonly ServiceStep[]; light?: boolean; className?: string }) {
  return (
    <ol className={cn("grid gap-10 md:grid-cols-3 md:gap-8", className)}>
      {steps.map((step, index) => (
        <Reveal as="li" key={step.title} delay={index * 80} className="relative">
          <span
            aria-hidden
            className={cn(
              "font-display text-[4.5rem] leading-none",
              light ? "text-gold-dark/25" : "text-gold/25",
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className={cn("mt-2 font-display text-2xl leading-tight sm:text-[1.75rem]", light ? "text-ink" : "text-cream")}>{step.title}</h3>
          <p className={cn("mt-4 text-[0.9375rem] leading-relaxed", light ? "text-ink/70" : "text-sand")}>{step.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* Occasion cards                                                       */
/* ------------------------------------------------------------------ */

export function OccasionGrid({
  occasions,
  light = false,
  columns = 2,
  className,
}: {
  occasions: readonly ServiceOccasion[];
  light?: boolean;
  columns?: 2 | 3;
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-5", columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2", className)}>
      {occasions.map((occasion, index) => (
        <Reveal
          as="li"
          key={occasion.title}
          delay={index * 60}
          className={cn(
            "group relative flex flex-col overflow-hidden rounded-3xl border p-7 transition-[border-color,background-color] duration-500 sm:p-8",
            light ? "border-ink/10 bg-white/50 hover:border-gold-dark/50" : "border-cream/10 bg-cream/[0.03] hover:border-gold/50 hover:bg-cream/[0.05]",
          )}
        >
          <span aria-hidden className={cn("mb-6 block h-px w-10 transition-[width] duration-500 group-hover:w-16", light ? "bg-gold-dark" : "bg-gold")} />
          <h3 className={cn("font-display text-[1.75rem] leading-tight", light ? "text-ink" : "text-cream")}>{occasion.title}</h3>
          <p className={cn("mt-4 text-[0.9375rem] leading-relaxed", light ? "text-ink/70" : "text-sand")}>{occasion.text}</p>
        </Reveal>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Talk to us — phone + WhatsApp, used beside the enquiry form          */
/* ------------------------------------------------------------------ */

export function ContactRail({ heading = "Rather talk it through?", children }: { heading?: string; children?: ReactNode }) {
  return (
    <div className="rounded-3xl border border-ink/10 bg-ink p-7 text-cream sm:p-8">
      <p className="eyebrow">{heading}</p>
      <ul className="mt-5 space-y-3">
        <li>
          <a href={`tel:${site.phone.e164}`} className="group flex items-center gap-4 rounded-2xl border border-cream/10 px-4 py-3.5 transition-colors hover:border-gold/60">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
              <Phone className="size-4" aria-hidden />
            </span>
            <span>
              <span className="block text-xs uppercase tracking-[0.16em] text-sand">Call the restaurant</span>
              <span className="mt-0.5 block font-display text-xl text-cream group-hover:text-gold">{site.phone.display}</span>
            </span>
          </a>
        </li>
        <li>
          <a
            href={site.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-cream/10 px-4 py-3.5 transition-colors hover:border-gold/60"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
              <MessageCircle className="size-4" aria-hidden />
            </span>
            <span>
              <span className="block text-xs uppercase tracking-[0.16em] text-sand">WhatsApp</span>
              <span className="mt-0.5 block font-display text-xl text-cream group-hover:text-gold">{site.whatsapp.display}</span>
            </span>
          </a>
        </li>
      </ul>
      {children ? <div className="mt-6 text-sm leading-relaxed text-sand">{children}</div> : null}
    </div>
  );
}
