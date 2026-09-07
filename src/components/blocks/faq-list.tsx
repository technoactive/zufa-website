import { Plus } from "lucide-react";
import type { Faq } from "@/content/faqs";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

interface FaqListProps {
  faqs: readonly Faq[];
  light?: boolean;
  className?: string;
  /** Emit FAQPage JSON-LD (only once per page). */
  schema?: boolean;
}

/** Native <details> accordion: accessible, keyboard-friendly, works without JS. */
export function FaqList({ faqs, light = false, className, schema = true }: FaqListProps) {
  return (
    <>
      <div className={cn("divide-y", light ? "divide-ink/10" : "divide-cream/10", className)}>
        {faqs.map((faq) => (
          <details key={faq.question} className="group py-2">
            <summary
              className={cn(
                "flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-left font-display text-xl marker:content-none sm:text-2xl [&::-webkit-details-marker]:hidden",
                light ? "text-ink hover:text-gold-dark" : "text-cream hover:text-gold",
              )}
            >
              <span>{faq.question}</span>
              <Plus
                aria-hidden
                className={cn("size-5 shrink-0 transition-transform duration-300 group-open:rotate-45", light ? "text-gold-dark" : "text-gold")}
              />
            </summary>
            <p className={cn("pb-5 pr-10 text-base leading-relaxed", light ? "text-ink/70" : "text-sand")}>{faq.answer}</p>
          </details>
        ))}
      </div>
      {schema ? <JsonLd data={faqSchema(faqs)} /> : null}
    </>
  );
}
