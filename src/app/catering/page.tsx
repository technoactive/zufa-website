import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { PageHero } from "@/components/blocks/page-hero";
import { FaqList } from "@/components/blocks/faq-list";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";
import { getPage } from "@/content/pages";
import { cateringFaqs } from "@/content/faqs";
import { site } from "@/content/site";

export const metadata: Metadata = pageMetadata("/catering");
const page = getPage("/catering")!;

const occasions = ["Weddings", "Birthdays", "Family gatherings", "Board lunches", "Working meetings", "Corporate events", "Engagements", "Religious celebrations"];

export default function CateringPage() {
  return (
    <>
      <PageHero
        eyebrow="We cater"
        title={
          <>
            A memorable experience for your <em className="italic text-gold">special occasion</em>
          </>
        }
        description="At Zufa Lebanese Catering we bring our expertise and equipment to the heart of the party — be it a wedding, a birthday, a family gathering, a board lunch or a working meeting. We cater for all needs."
        image={{ src: "/images/sharing-table.jpg", alt: "A round table filled with Lebanese sharing dishes prepared by Zufa" }}
        crumbs={[{ name: "Catering", path: "/catering" }]}
      />

      <Section tone="cream" pattern>
        <div className="container-content grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="space-y-12">
            <Reveal>
              <SectionHeading
                light
                eyebrow="Where we cater"
                title={`Serving ${site.cateringAreas.slice(0, 3).join(", ")} and beyond`}
                description={`We serve ${site.cateringAreas.slice(0, -1).join(", ")} and ${site.cateringAreas.at(-1)}, plus the surrounding areas of North West London and Hertfordshire. Further afield? Ask — we love a road trip.`}
              />
            </Reveal>
            <Reveal delay={80}>
              <h3 className="eyebrow text-gold-dark">Occasions</h3>
              <ul className="mt-5 grid grid-cols-2 gap-3 text-sm text-ink/80">
                {occasions.map((occasion) => (
                  <li key={occasion} className="flex items-center gap-2">
                    <Check className="size-4 text-gold-dark" aria-hidden /> {occasion}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120} className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image src="/images/mezze-spread.jpg" alt="Mezze platters prepared by Zufa catering" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </Reveal>
          </div>

          <Reveal delay={100} id="enquire" className="rounded-3xl border border-ink/10 bg-parchment p-8 shadow-card sm:p-10">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Tell us about your event</h2>
            <p className="mt-3 text-base leading-relaxed text-ink/70">
              Fill in the form below and a member of our team will be in touch. Prefer to talk?{" "}
              <a href={`tel:${site.phone.e164}`} className="text-gold-dark underline underline-offset-4">
                Call {site.phone.display}
              </a>
              .
            </p>
            <EnquiryForm topic="catering" className="mt-8" />
          </Reveal>
        </div>
      </Section>

      <Section tone="ink">
        <div className="container-content grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <SectionHeading eyebrow="Catering FAQs" title="Planning made simple" />
          </Reveal>
          <Reveal delay={100}>
            <FaqList faqs={cateringFaqs} />
          </Reveal>
        </div>
      </Section>

      <JsonLd data={webPageSchema({ path: "/catering", title: page.title, description: page.description, image: page.image })} />
    </>
  );
}
