import { Check, Phone, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/blocks/page-hero";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { webPageSchema } from "@/lib/schema";
import { thankYouCopy, type ThankYouKind } from "@/content/thank-you";
import { site } from "@/content/site";

export function ThankYouScreen({ kind }: { kind: ThankYouKind }) {
  const copy = thankYouCopy[kind];
  const path = `/thank-you/${kind}`;

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={
          <>
            {copy.title} <em className="italic text-gold">{copy.accent}</em>
          </>
        }
        description={copy.description}
        image={copy.image}
        crumbs={[{ name: "Thank you", path }]}
      >
        <Button href={copy.primary.href} size="lg">
          {copy.primary.label}
        </Button>
        <Button href={copy.secondary.href} variant="secondary" size="lg">
          {copy.secondary.label}
        </Button>
      </PageHero>

      <Section tone="cream" pattern className="pt-12 sm:pt-16">
        <div className="container-content grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="rounded-3xl border border-ink/10 bg-parchment p-8 shadow-card sm:p-10">
            <p className="inline-flex size-12 items-center justify-center rounded-full bg-gold/20 text-gold-dark">
              <Check className="size-6" aria-hidden />
            </p>
            <h2 className="mt-6 font-display text-3xl text-ink sm:text-4xl">What happens next</h2>
            <ol className="mt-8 space-y-5">
              {copy.steps.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="font-display text-2xl leading-none text-gold-dark">{String(index + 1).padStart(2, "0")}</span>
                  <p className="text-base leading-relaxed text-ink/80">{step}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={80} className="rounded-3xl border border-ink/10 bg-ink p-8 text-cream shadow-card sm:p-10">
            <p className="eyebrow text-gold">Need us sooner?</p>
            <h2 className="mt-4 font-display text-3xl">Call or WhatsApp during service</h2>
            <p className="mt-4 text-sm leading-relaxed text-sand">
              If your date is close or you’d rather talk it through, the team is on {site.phone.display} and WhatsApp {site.whatsapp.display}.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <Button href={`tel:${site.phone.e164}`} size="lg">
                <Phone className="size-4" aria-hidden /> {site.phone.display}
              </Button>
              <Button href={site.whatsapp.url} variant="secondary" size="lg">
                <MessageCircle className="size-4" aria-hidden /> WhatsApp us
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      <JsonLd data={webPageSchema({ path, title: `${copy.eyebrow} | Thank you`, description: copy.description, image: copy.image.src })} />
    </>
  );
}
