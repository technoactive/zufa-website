import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, MapPin } from "lucide-react";
import { PageHero } from "@/components/blocks/page-hero";
import { FaqList } from "@/components/blocks/faq-list";
import { CtaBand } from "@/components/blocks/cta-band";
import { ContactRail, FactsStrip, OccasionGrid, StepList } from "@/components/blocks/service-blocks";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { cateringSchema, webPageSchema } from "@/lib/schema";
import { getPage } from "@/content/pages";
import { cateringFaqs } from "@/content/faqs";
import { catering } from "@/content/services";
import { site } from "@/content/site";

export const metadata: Metadata = pageMetadata("/catering");
const page = getPage("/catering")!;

const whatToTellUs = [
  "The date, or a couple of options",
  "Roughly how many people",
  "Where it is (a postcode is enough)",
  "Sit-down, buffet, grill station or boxed lunches",
  "Anyone vegetarian, vegan or with allergies",
  "A budget per head, if you have one in mind",
];

export default function CateringPage() {
  return (
    <>
      <PageHero
        eyebrow="Lebanese catering · North West London"
        title={
          <>
            Lebanese catering for weddings, parties and the office across <em className="italic text-gold">North West London</em>
          </>
        }
        description={catering.intro}
        image={{ src: "/images/sharing-table.jpg", alt: "A round table filled with Lebanese sharing dishes prepared by Zufa for a private party" }}
        crumbs={[{ name: "Catering", path: "/catering" }]}
      >
        <Button href="#enquire" size="lg">
          Get a quote
        </Button>
        <Button href={`tel:${site.phone.e164}`} variant="secondary" size="lg">
          Call {site.phone.display}
        </Button>
      </PageHero>

      <FactsStrip facts={catering.facts} />

      {/* ---- How it works ---- */}
      <Section tone="cream" pattern className="overflow-hidden">
        <div className="container-content">
          <Reveal>
            <SectionHeading
              light
              eyebrow="How it works"
              title="Three conversations, then we cook"
              description="Nobody needs a twelve-page brochure to feed sixty people well. This is how a Zufa catering booking actually goes."
            />
          </Reveal>
          <StepList steps={catering.steps} light className="mt-14" />
          <Reveal delay={120} className="relative mt-16 aspect-[21/9] overflow-hidden rounded-[2rem] sm:aspect-[3/1]">
            <Image
              src="/images/catering-event.jpg"
              alt="Guests talking at a catered reception beside a long buffet of dishes"
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </Section>

      {/* ---- Occasions ---- */}
      <Section tone="ink" className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -right-40 top-0 -z-10 size-[36rem] rounded-full bg-gold/[0.07] blur-3xl" />
        <div className="container-content">
          <Reveal>
            <SectionHeading
              eyebrow="What we cater"
              title="From a boardroom in Harrow to a wedding marquee in Watford"
              description="Lebanese food scales. The same hommos and shish taouk that feed a table of four at the restaurant feed a hundred at a wedding, and it still tastes like it came from our kitchen, because it did."
            />
          </Reveal>
          <OccasionGrid occasions={catering.occasions} className="mt-14" />
        </div>
      </Section>

      {/* ---- Menu ---- */}
      <Section tone="parchment" pattern className="overflow-hidden">
        <div className="container-content">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.7fr] lg:gap-20">
            <Reveal>
              <SectionHeading
                light
                eyebrow="What goes on the table"
                title="Built from our menu, not a catering catalogue"
                description={
                  <>
                    <p>
                      Everything we cater is a dish we serve in the restaurant, made the same way. Below are the groups most menus are built from; the{" "}
                      <Link href="/menu/a-la-carte" className="text-gold-dark underline underline-offset-4 hover:text-ink">
                        full à la carte
                      </Link>{" "}
                      has the rest.
                    </p>
                    <p className="mt-4">{catering.pricing}</p>
                  </>
                }
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/menu/set-menus" variant="light" size="sm">
                  Set menus &amp; platters
                </Button>
                <Button href="/menu/a-la-carte" variant="light" size="sm">
                  À la carte
                </Button>
              </div>
            </Reveal>

            <ul className="grid gap-5 sm:grid-cols-2">
              {catering.menuHighlights.map((group, index) => (
                <Reveal
                  as="li"
                  key={group.title}
                  delay={index * 60}
                  className={index === catering.menuHighlights.length - 1 ? "sm:col-span-2" : undefined}
                >
                  <div className="h-full rounded-3xl border border-ink/10 bg-cream/70 p-6 sm:p-7">
                    <h3 className="font-display text-2xl text-ink">{group.title}</h3>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {group.dishes.map((dish) => (
                        <li key={dish} className="rounded-full border border-ink/12 bg-white/60 px-3 py-1.5 text-[0.8125rem] text-ink/80">
                          {dish}
                        </li>
                      ))}
                    </ul>
                    {group.note ? <p className="mt-4 text-sm leading-relaxed text-ink/60">{group.note}</p> : null}
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ---- Areas ---- */}
      <Section tone="charcoal" className="relative overflow-hidden">
        <span aria-hidden className="arabesque-overlay opacity-[0.045]" />
        <div className="container-content grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Where we cater"
              title="Hatch End to Watford, and the roads between"
              description={`We’re based in ${site.address.locality}, so the towns below are a short drive with hot food still hot, ${catering.areaNote}`}
            />
            <a
              href={site.maps.google}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm text-sand underline-offset-4 hover:text-gold hover:underline"
            >
              <MapPin className="size-4 text-gold" aria-hidden />
              {site.address.full}
            </a>
          </Reveal>
          <Reveal delay={80}>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[site.address.locality, ...catering.areas].map((area, index) => (
                <li
                  key={area}
                  className={
                    index === 0
                      ? "rounded-2xl border border-gold/50 bg-gold/10 px-5 py-5 font-display text-2xl text-gold"
                      : "rounded-2xl border border-cream/10 bg-cream/[0.03] px-5 py-5 font-display text-2xl text-cream"
                  }
                >
                  {area}
                  {index === 0 ? <span className="mt-1 block font-sans text-[0.625rem] uppercase tracking-[0.18em] text-gold/80">Home</span> : null}
                </li>
              ))}
              <li className="flex items-center rounded-2xl border border-dashed border-cream/15 px-5 py-5 text-sm leading-snug text-sand">
                Plus the rest of North West London and the Herts border
              </li>
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* ---- Enquiry ---- */}
      <Section tone="cream" pattern id="enquire" className="scroll-mt-24 overflow-hidden">
        <div className="container-content grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div className="space-y-8">
            <Reveal>
              <SectionHeading
                light
                eyebrow="Get a quote"
                title="Tell us about the day"
                description="Send the basics and one of us will call or write back with a menu and a per-head price. No obligation, and no chasing."
              />
            </Reveal>
            <Reveal delay={60}>
              <h3 className="eyebrow text-gold-dark">Useful to include</h3>
              <ul className="mt-5 space-y-3 text-sm text-ink/80">
                {whatToTellUs.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-gold-dark" aria-hidden /> {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <ContactRail>
                Weekdays it’s usually quickest to call between lunch and dinner service. WhatsApp works any time; we reply when the kitchen lets us.
              </ContactRail>
            </Reveal>
          </div>

          <Reveal delay={80} className="rounded-3xl border border-ink/10 bg-parchment p-8 shadow-card sm:p-10">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Catering enquiry</h2>
            <p className="mt-3 text-base leading-relaxed text-ink/70">Two minutes to fill in. We come back to every enquiry personally.</p>
            <EnquiryForm
              topic="catering"
              placeholder="Occasion, venue postcode, how you’d like to eat (mezze table, grill, boxed lunches), dietary requirements, budget per head…"
              submitLabel="Request a quote"
              className="mt-8"
            />
          </Reveal>
        </div>
      </Section>

      {/* ---- FAQs ---- */}
      <Section tone="ink">
        <div className="container-content grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Catering FAQs"
              title="Things people ask before they book"
              description={
                <p>
                  Anything else,{" "}
                  <a href={`tel:${site.phone.e164}`} className="text-gold underline underline-offset-4 hover:text-cream">
                    call {site.phone.display}
                  </a>
                  .
                </p>
              }
            />
          </Reveal>
          <Reveal delay={100}>
            <FaqList faqs={cateringFaqs} />
          </Reveal>
        </div>
      </Section>

      <CtaBand
        eyebrow="Or bring the party to us"
        title={
          <>
            Rather not host? <em className="italic text-gold">Hire the restaurant.</em>
          </>
        }
        description={`Zufa can be yours for the night: up to ${site.capacity.seated} seated or ${site.capacity.standing} standing, a licensed bar, the patio and a belly dancer if you want one.`}
        primary={{ label: "Private hire", href: "/private-hire" }}
        secondary={{ label: "See what’s on", href: "/whats-on" }}
      />

      <JsonLd data={[webPageSchema({ path: "/catering", title: page.title, description: page.description, image: page.image }), cateringSchema()]} />
    </>
  );
}
