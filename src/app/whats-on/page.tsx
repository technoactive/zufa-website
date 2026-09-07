import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/blocks/page-hero";
import { CtaBand } from "@/components/blocks/cta-band";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";
import { getPage } from "@/content/pages";
import { offers } from "@/content/offers";
import { site } from "@/content/site";

export const metadata: Metadata = pageMetadata("/whats-on");
const page = getPage("/whats-on")!;

export default function WhatsOnPage() {
  return (
    <>
      <PageHero
        eyebrow="What’s on"
        title={
          <>
            Offers, nights out and <em className="italic text-gold">celebrations</em>
          </>
        }
        description="Corkage-free Mondays, two-for-one cocktails, weekday lunch deals, belly dancing nights and private parties — there is always a reason to visit Zufa."
        image={{ src: "/images/belly-dancer.jpg", alt: "A belly dancer performing at Zufa" }}
        crumbs={[{ name: "What’s On", path: "/whats-on" }]}
      />

      <Section tone="cream" pattern>
        <div className="container-content">
          <ul className="grid gap-6 md:grid-cols-2">
            {offers.map((offer, index) => (
              <Reveal key={offer.id} as="li" delay={index * 80}>
                <article className="flex h-full flex-col rounded-3xl border border-ink/10 bg-parchment p-8 shadow-card sm:p-10">
                  <p className="eyebrow text-gold-dark">{offer.when}</p>
                  <h2 className="mt-4 font-display text-3xl text-ink sm:text-4xl">{offer.headline}</h2>
                  <p className="mt-4 flex-1 text-base leading-relaxed text-ink/70">{offer.description}</p>
                  {offer.details ? <p className="mt-3 text-sm text-ink/55">{offer.details}</p> : null}
                  <div className="mt-8">
                    <Button href={offer.cta.href} variant="light">
                      {offer.cta.label} <ArrowRight className="size-4" aria-hidden />
                    </Button>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <section className="relative isolate overflow-hidden bg-ink py-24 text-cream sm:py-32">
        <Image src="/images/feast-table.jpg" alt="" fill sizes="100vw" quality={60} className="-z-20 object-cover opacity-25" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/75 to-ink" />
        <div className="container-content">
          <Reveal as="figure" className="mx-auto max-w-4xl text-center">
            <blockquote>
              <p className="font-display text-display-md italic leading-snug sm:text-display-lg">“{site.press.quote}”</p>
            </blockquote>
            <figcaption className="mt-8 flex flex-col items-center gap-3">
              <span className="hairline w-24" aria-hidden />
              <cite className="text-xs font-semibold uppercase tracking-[0.2em] not-italic text-gold">{site.press.source}</cite>
            </figcaption>
          </Reveal>
        </div>
      </section>

      <Section tone="parchment">
        <div className="container-content grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              light
              eyebrow="Private hire"
              title="Looking for a place to celebrate your party?"
              description={`At Zufa we pride ourselves on providing a memorable experience for your special occasion. To book a table or event for more than ${site.reservations.eventPartySize} guests please call us on ${site.phone.display}.`}
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/private-hire" variant="dark">
                Private hire
              </Button>
              <Button href={`tel:${site.phone.e164}`} variant="light">
                Call {site.phone.display}
              </Button>
            </div>
          </Reveal>
          <Reveal delay={100} className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image src="/images/restaurant-interior.jpg" alt="The dining room at Zufa set for an evening service" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </Reveal>
        </div>
      </Section>

      <CtaBand />
      <JsonLd data={webPageSchema({ path: "/whats-on", title: page.title, description: page.description, image: page.image })} />
    </>
  );
}
