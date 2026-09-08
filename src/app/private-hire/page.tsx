import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, TrainFront } from "lucide-react";
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
import { privateHireSchema, webPageSchema } from "@/lib/schema";
import { getPage } from "@/content/pages";
import { privateHireFaqs } from "@/content/faqs";
import { privateHire } from "@/content/services";
import { site } from "@/content/site";

export const metadata: Metadata = pageMetadata("/private-hire");
const page = getPage("/private-hire")!;

const whatToTellUs = [
  "The date, or a couple you could do",
  "How many of you, roughly",
  "The occasion",
  "Sit-down dinner or standing with mezze",
  "Anyone vegetarian, vegan or with allergies",
  "Cake, speeches, playlist",
];

export default function PrivateHirePage() {
  const [lead, ...rest] = privateHire.gallery;

  return (
    <>
      <PageHero
        eyebrow={`Private hire · ${site.address.locality}`}
        title={
          <>
            Hire the whole restaurant for your <em className="italic text-gold">celebration</em>
          </>
        }
        description={privateHire.intro}
        image={{ src: "/images/restaurant-interior.jpg", alt: "The dining room at Zufa Hatch End, set for a private party" }}
        crumbs={[{ name: "Private Hire", path: "/private-hire" }]}
      >
        <Button href="#enquire" size="lg">
          Check a date
        </Button>
        <Button href={`tel:${site.phone.e164}`} variant="secondary" size="lg">
          Call {site.phone.display}
        </Button>
      </PageHero>

      <FactsStrip facts={privateHire.facts} />

      {/* ---- Occasions ---- */}
      <Section tone="cream" pattern className="overflow-hidden">
        <div className="container-content">
          <Reveal>
            <SectionHeading
              light
              eyebrow="What people book us for"
              title="A room that has seen a lot of birthdays"
              description={`Book a table for up to ${site.reservations.eventPartySize} online as normal. Beyond that, call us or use the form and we’ll talk about taking over part of the room, or all of it.`}
            />
          </Reveal>
          <OccasionGrid occasions={privateHire.occasions} light columns={3} className="mt-14" />
        </div>
      </Section>

      {/* ---- Gallery + features ---- */}
      <Section tone="ink" className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 -z-10 size-[36rem] rounded-full bg-gold/[0.07] blur-3xl" />
        <div className="container-content grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-20">
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <Reveal className="relative col-span-3 aspect-[16/9] overflow-hidden rounded-[1.5rem] sm:rounded-[2rem]">
              <Image src={lead.src} alt={lead.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
            </Reveal>
            {rest.map((photo, index) => (
              <Reveal key={photo.src} delay={80 + index * 60} className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem] sm:rounded-[1.75rem]">
                <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 18vw, 33vw" className="object-cover" />
              </Reveal>
            ))}
          </div>

          <div>
            <Reveal>
              <SectionHeading
                eyebrow="The room"
                title="What comes with the keys"
                description="Fully licensed, one dining room, a patio, and a kitchen that does not stop until you say so."
              />
            </Reveal>
            <Reveal delay={80}>
              <ul className="mt-10 space-y-3.5">
                {privateHire.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-[0.9375rem] leading-snug text-sand">
                    <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120} className="mt-10 flex items-start gap-3 rounded-2xl border border-cream/10 bg-cream/[0.03] p-5 text-sm leading-relaxed text-sand">
              <TrainFront className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
              <p>
                {site.address.street}, {site.address.locality} {site.address.postalCode}. A short walk from Hatch End Overground, buses stop nearby, and there is parking on the
                surrounding roads.{" "}
                <a href={site.maps.google} target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-4 hover:text-cream">
                  Directions
                </a>
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---- How the night works ---- */}
      <Section tone="parchment" pattern className="overflow-hidden">
        <div className="container-content">
          <Reveal>
            <SectionHeading
              light
              eyebrow="How the night works"
              title="Three decisions, then it’s your party"
              description={
                <p>
                  Prices below are our current{" "}
                  <Link href="/menu/set-menus" className="text-gold-dark underline underline-offset-4 hover:text-ink">
                    set menus
                  </Link>
                  ; the{" "}
                  <Link href="/menu/drinks" className="text-gold-dark underline underline-offset-4 hover:text-ink">
                    drinks list
                  </Link>{" "}
                  and{" "}
                  <Link href="/menu/kids" className="text-gold-dark underline underline-offset-4 hover:text-ink">
                    kids menu
                  </Link>{" "}
                  are online too. Hosting on a Monday? Corkage on wine is free.
                </p>
              }
            />
          </Reveal>
          <StepList steps={privateHire.steps} light className="mt-14" />
          <Reveal delay={120} className="mt-12 flex flex-wrap gap-3">
            <Button href="/menu/set-menus" variant="light" size="sm">
              Set menus
            </Button>
            <Button href="/menu/drinks" variant="light" size="sm">
              Drinks
            </Button>
            <Button href="/whats-on" variant="light" size="sm">
              What’s on this week
            </Button>
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
                eyebrow="Check a date"
                title="Tell us about the party"
                description="Send the basics and one of us will come back to you personally to talk through the date, the numbers and the menu."
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
              <ContactRail heading="Quicker on the phone">
                For parties of more than {site.reservations.eventPartySize}, calling is the fastest way to check a date. Between lunch and dinner service is best.
              </ContactRail>
            </Reveal>
          </div>

          <Reveal delay={80} className="rounded-3xl border border-ink/10 bg-parchment p-8 shadow-card sm:p-10">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Private hire enquiry</h2>
            <p className="mt-3 text-base leading-relaxed text-ink/70">Dates, numbers, the occasion. We’ll do the rest.</p>
            <EnquiryForm
              topic="private-hire"
              placeholder="Occasion, whether you’d like a set menu or à la carte, a cake, dietary requirements…"
              submitLabel="Check availability"
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
              eyebrow="Private hire FAQs"
              title="The practical bits"
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
            <FaqList faqs={privateHireFaqs} />
          </Reveal>
        </div>
      </Section>

      <CtaBand
        eyebrow="Party somewhere else?"
        title={
          <>
            We’ll bring Zufa <em className="italic text-gold">to you.</em>
          </>
        }
        description={`Our catering team cooks the same menu for weddings, birthdays and office lunches across ${site.cateringAreas.slice(0, 3).join(", ")} and the surrounding area.`}
        primary={{ label: "Lebanese catering", href: "/catering" }}
        secondary={{ label: "Book a table", href: "/bookings" }}
      />

      <JsonLd data={[webPageSchema({ path: "/private-hire", title: page.title, description: page.description, image: page.image }), privateHireSchema()]} />
    </>
  );
}
