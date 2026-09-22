import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Car, Check, MapPin } from "lucide-react";
import { PageHero } from "@/components/blocks/page-hero";
import { FaqList } from "@/components/blocks/faq-list";
import { CtaBand } from "@/components/blocks/cta-band";
import { ContactRail, FactsStrip, OccasionGrid, StepList } from "@/components/blocks/service-blocks";
import { CateringEnquiryForm } from "@/components/forms/catering-enquiry-form";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { cateringSchema, webPageSchema } from "@/lib/schema";
import { getPage } from "@/content/pages";
import { cateringFaqs } from "@/content/faqs";
import { catering } from "@/content/services";
import { areas } from "@/content/areas";
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
        compact
        className="max-sm:pb-8 [&_[aria-label='Breadcrumb']]:max-sm:hidden [&_.eyebrow]:max-sm:hidden"
        eyebrow="Lebanese catering · North West London"
        title={
          <>
            <span className="lg:hidden">
              Catering for your <em className="italic text-gold">event</em>
            </span>
            <span className="hidden lg:inline">
              Lebanese catering for weddings, parties and the office across <em className="italic text-gold">North West London</em>
            </span>
          </>
        }
        description={
          <>
            <span className="lg:hidden">The same Hatch End kitchen, brought to your wedding, party or office lunch.</span>
            <span className="hidden lg:inline">{catering.intro}</span>
          </>
        }
        image={{ src: "/images/sharing-table.jpg", alt: "A round table filled with Lebanese sharing dishes prepared by Zufa for a private party" }}
        crumbs={[{ name: "Catering", path: "/catering" }]}
        aside={
          <div id="enquire" data-form-card className="scroll-mt-24 rounded-3xl border border-ink/10 bg-parchment p-6 text-ink shadow-card sm:p-8">
            <h2 className="font-display text-2xl text-ink sm:text-3xl">Get a catering quote</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/70 sm:text-base">
              Three short steps. We reply personally, usually within one working day, with a menu and a per-head price.
            </p>
            <CateringEnquiryForm className="mt-6" />
          </div>
        }
      >
        <Button href={`tel:${site.phone.e164}`} variant="secondary" size="lg">
          Call {site.phone.display}
        </Button>
      </PageHero>

      {/* ---- What to include ---- */}
      <Section tone="cream" pattern className="overflow-hidden">
        <div className="container-content grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              light
              eyebrow="Get a quote"
              title="Tell us about the day"
              description="Send the basics and one of us will call or write back with a menu and a per-head price. No obligation, and no chasing."
            />
            <h3 className="eyebrow mt-10 text-gold-dark">Useful to include</h3>
            <ul className="mt-5 space-y-3 text-sm text-ink/80">
              {whatToTellUs.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-gold-dark" aria-hidden /> {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80}>
            <ContactRail>
              Weekdays it’s usually quickest to call between lunch and dinner service. WhatsApp works any time; we reply when the kitchen lets us.
            </ContactRail>
          </Reveal>
        </div>
      </Section>

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
                  Sharing platters
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
        <div className="container-content">
          <Reveal className="max-w-3xl">
            <SectionHeading
              eyebrow="Where we cater"
              title="Lebanese catering in Pinner, Harrow, Watford and the roads between"
              description={`Everything is cooked at ${site.address.full}, so every town below is close enough for hot food to arrive hot. Times are from the restaurant door, ${catering.areaNote}`}
            />
            <a
              href={site.maps.google}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-sand underline-offset-4 hover:text-gold hover:underline"
            >
              <MapPin className="size-4 text-gold" aria-hidden />
              {site.address.locality} · HA5 4HR · home
            </a>
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((area, index) => (
              <Reveal as="li" key={area.name} delay={index * 40} className="h-full">
                <article className="flex h-full flex-col rounded-3xl border border-cream/10 bg-cream/[0.03] p-6 transition-colors hover:border-gold/40">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-2xl text-cream">Lebanese catering in {area.name}</h3>
                  </div>
                  <p className="mt-1 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-gold">
                    <Car className="size-3.5" aria-hidden />
                    About {area.driveMinutes} min · {area.miles} {area.miles === 1 ? "mile" : "miles"}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-sand">{area.catering}</p>
                </article>
              </Reveal>
            ))}
            <Reveal as="li" delay={areas.length * 40} className="h-full">
              <div className="flex h-full flex-col justify-between rounded-3xl border border-dashed border-cream/15 p-6">
                <p className="text-sm leading-relaxed text-sand">
                  Rickmansworth, Edgware, Wembley, Hillingdon and the rest of North West London and south Hertfordshire — if you’re not on the list, ask. We’ve driven further for less.
                </p>
                <Button href="#enquire" variant="light" size="sm" className="mt-5 self-start">
                  Ask about your area
                </Button>
              </div>
            </Reveal>
          </ul>
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
        description={`Zufa can be yours for the night: up to ${site.capacity.seated} seated or ${site.capacity.standing} standing, a licensed bar and the patio.`}
        primary={{ label: "Private hire", href: "/private-hire" }}
        secondary={{ label: "See what’s on", href: "/whats-on" }}
      />

      <JsonLd data={[webPageSchema({ path: "/catering", title: page.title, description: page.description, image: page.image }), cateringSchema()]} />
    </>
  );
}
