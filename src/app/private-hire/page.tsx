import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/blocks/page-hero";
import { FaqList } from "@/components/blocks/faq-list";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";
import { getPage } from "@/content/pages";
import { privateHireFaqs } from "@/content/faqs";
import { site } from "@/content/site";

export const metadata: Metadata = pageMetadata("/private-hire");
const page = getPage("/private-hire")!;

const highlights = [
  { value: String(site.capacity.seated), label: "seated" },
  { value: String(site.capacity.standing), label: "standing" },
  { value: "7", label: "days a week" },
];

export default function PrivateHirePage() {
  return (
    <>
      <PageHero
        eyebrow="Private hire"
        title={
          <>
            Looking for a place to <em className="italic text-gold">celebrate</em> your party?
          </>
        }
        description={`At Zufa Lebanese Cuisine we pride ourselves on providing you with a memorable experience for your special occasion. To book a table or event for more than ${site.reservations.eventPartySize} guests please call us on ${site.phone.display}.`}
        image={{ src: "/images/restaurant-interior.jpg", alt: "The dining room at Zufa Hatch End, available for private hire" }}
        crumbs={[{ name: "Private Hire", path: "/private-hire" }]}
      >
        <Button href={`tel:${site.phone.e164}`} variant="secondary" size="lg">
          Call {site.phone.display}
        </Button>
        <Button href="#enquire" variant="ghost" size="lg">
          Send an enquiry
        </Button>
      </PageHero>

      <Section tone="cream" pattern>
        <div className="container-content grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="space-y-12">
            <Reveal>
              <SectionHeading
                light
                eyebrow="The space"
                title="Your celebration, our restaurant"
                description="Birthdays, engagements, baby showers, hen and stag evenings, anniversaries and company get-togethers. Choose a set menu or sharing feast, add a belly dancing show, and let us take care of the rest."
              />
            </Reveal>
            <Reveal delay={80}>
              <dl className="grid grid-cols-3 gap-6 border-y border-ink/10 py-8">
                {highlights.map((item) => (
                  <div key={item.label}>
                    <dd className="font-display text-5xl text-ink">{item.value}</dd>
                    <dt className="mt-1 text-xs uppercase tracking-[0.16em] text-ink/55">{item.label}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={120} className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image src="/images/sharing-table.jpg" alt="A celebration table at Zufa laden with sharing dishes" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </Reveal>
          </div>

          <Reveal delay={100} id="enquire" className="scroll-mt-32 rounded-3xl border border-ink/10 bg-parchment p-8 shadow-card sm:p-10">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Fill in the form below</h2>
            <p className="mt-3 text-base leading-relaxed text-ink/70">A member of our team will be in touch to talk through dates, menus and any special touches.</p>
            <EnquiryForm topic="private-hire" className="mt-8" />
          </Reveal>
        </div>
      </Section>

      <Section tone="ink">
        <div className="container-content grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <SectionHeading eyebrow="Private hire FAQs" title="The details" />
          </Reveal>
          <Reveal delay={100}>
            <FaqList faqs={privateHireFaqs} />
          </Reveal>
        </div>
      </Section>

      <JsonLd data={webPageSchema({ path: "/private-hire", title: page.title, description: page.description, image: page.image })} />
    </>
  );
}
