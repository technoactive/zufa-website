import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/blocks/page-hero";
import { CtaBand } from "@/components/blocks/cta-band";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";
import { getPage } from "@/content/pages";
import { site } from "@/content/site";

export const metadata: Metadata = pageMetadata("/our-story");
const page = getPage("/our-story")!;

const facts = [
  { value: String(site.foundingYear), label: "Family restaurant opened in Tannourine" },
  { value: String(site.capacity.seated), label: "Guests seated for private events" },
  { value: String(site.capacity.standing), label: "Guests standing for receptions" },
  { value: "100%", label: "Made from scratch, every day" },
];

export default function OurStoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title={
          <>
            From the mountains of <em className="italic text-gold">North Lebanon</em> to Hatch End
          </>
        }
        description="Zufa’s journey started in our home town of Tannourine, a beautiful village in the mountains of North Lebanon. It continued in London when two brothers decided to share the food they grew up with."
        image={{ src: "/images/dinner-for-two.jpg", alt: "A table for two at Zufa with wine and grilled dishes" }}
        crumbs={[{ name: "Our Story", path: "/our-story" }]}
      />

      <Section tone="cream" pattern>
        <div className="container-content grid items-start gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem]">
              <Image src="/images/warak-enab.jpg" alt="Warak enab — stuffed vine leaves — plated with pomegranate and yoghurt at Zufa" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
          </Reveal>

          <div className="space-y-16">
            <Reveal>
              <SectionHeading
                light
                eyebrow="About us"
                title="Our story begins in Tannourine"
                description={
                  <>
                    <p>
                      Our parents opened the family restaurant in 1990 and since then it has been one of the most loved restaurants in North Lebanon. Our story continued in London, when my brother and I pursued our passion for Lebanese food.
                    </p>
                    <p className="mt-4">
                      We have been successful for years, offering our valued clientele a mouth-watering selection of Lebanese dishes, all made from scratch using fresh, top-quality ingredients.
                    </p>
                  </>
                }
              />
            </Reveal>

            <Reveal delay={80}>
              <SectionHeading
                light
                eyebrow="Our restaurant"
                title="An unforgettable dining experience"
                description={
                  <>
                    <p>
                      Zufa offers a cosy and charming atmosphere for Lebanese food lovers of all ages. We are fully licensed and have an al fresco patio for outside dining. Whether you wish to dine in, take away or order online, we can cater to your needs.
                    </p>
                    <p className="mt-4">
                      For your special event — birthday, company get-together, engagement, baby shower, hen or stag evening — the restaurant can be booked for up to {site.capacity.seated} people seated or {site.capacity.standing} standing.
                    </p>
                    <p className="mt-4">We are easily accessible by bus and the London Overground, there is plenty of local parking, and we offer free Wi-Fi for our guests.</p>
                  </>
                }
              />
            </Reveal>

            <Reveal delay={120}>
              <dl className="grid grid-cols-2 gap-6 border-t border-ink/10 pt-10">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dd className="font-display text-5xl text-ink">{fact.value}</dd>
                    <dt className="mt-2 text-sm text-ink/60">{fact.label}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="ink">
        <div className="container-content grid gap-12 lg:grid-cols-3">
          <Reveal className="lg:col-span-1">
            <SectionHeading eyebrow="Lebanese cuisine" title="Why Lebanese food is made for sharing" />
          </Reveal>
          <Reveal delay={100} className="space-y-6 text-base leading-relaxed text-sand lg:col-span-2 lg:text-lg">
            <p>
              Lebanon’s rich cultural history has had a unique impact on making Lebanese cuisine the most popular in the Middle East. Meals are renowned for beginning with a selection of small sharing dishes called mezze, followed by a wide variety of main courses including grilled meats, fish and vegetarian dishes. Desserts are traditionally flavoured with rose water, orange blossom and sugar syrup.
            </p>
            <p>
              Do not miss our saj menu. Saj is a traditional domed iron griddle used to bake bread, plain or filled — served on a hand-cut olive-wood board specially imported from Lebanon. And your Zufa experience is not complete without our hot mezze, served sizzling in handmade clay pans so you can enjoy them warm until the end of your meal.
            </p>
          </Reveal>
        </div>
      </Section>

      <section className="relative isolate overflow-hidden bg-charcoal py-24 text-cream sm:py-32">
        <span aria-hidden className="arabesque-overlay opacity-[0.05]" />
        <div className="container-content">
          <Reveal as="figure" className="mx-auto max-w-4xl text-center">
            <blockquote>
              <p className="font-display text-display-md italic leading-snug sm:text-display-lg">“{site.press.quote}”</p>
            </blockquote>
            <figcaption className="mt-8 flex flex-col items-center gap-3">
              <span className="hairline w-24" aria-hidden />
              <cite className="text-xs font-semibold uppercase tracking-[0.2em] not-italic text-gold">{site.press.source}</cite>
              <a href={site.press.articlePdf} className="text-sm text-sand underline underline-offset-4 hover:text-gold" target="_blank" rel="noopener noreferrer">
                Read the full review
              </a>
            </figcaption>
          </Reveal>
        </div>
      </section>

      <CtaBand />
      <JsonLd data={webPageSchema({ path: "/our-story", title: page.title, description: page.description, image: page.image })} />
    </>
  );
}
