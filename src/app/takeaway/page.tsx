import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { ArrowUpRight, Phone, Percent, ShoppingBag } from "lucide-react";
import { PageHero } from "@/components/blocks/page-hero";
import { CtaBand } from "@/components/blocks/cta-band";
import { OrderingWidget } from "@/components/blocks/ordering-widget";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";
import { getPage } from "@/content/pages";
import { site } from "@/content/site";

export const metadata: Metadata = pageMetadata("/takeaway");
const page = getPage("/takeaway")!;

export default function TakeawayPage() {
  return (
    <>
      <PageHero
        eyebrow="Takeaway & delivery"
        title={
          <>
            Zufa, <em className="italic text-gold">delivered</em>
          </>
        }
        description="Order straight from our kitchen for collection or delivery across Hatch End, Pinner, Harrow and the surrounding area. Ordering direct means your whole order goes to the restaurant, not to an app."
        image={{ src: "/images/dishes-detail.webp", alt: "Close-up of Lebanese dishes ready to be packed for takeaway" }}
        crumbs={[{ name: "Takeaway", path: "/takeaway" }]}
      >
        <Button href="#order-online" size="lg">
          <ShoppingBag className="size-4" aria-hidden /> Order online
        </Button>
        <Button href={`tel:${site.phone.e164}`} variant="secondary" size="lg">
          <Phone className="size-4" aria-hidden /> Call to collect
        </Button>
      </PageHero>

      <Section tone="cream" pattern id="order-online" className="scroll-mt-20">
        <div className="container-content">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-deep/40 bg-gold/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-dark">
              <Percent className="size-3.5" aria-hidden /> 20% off your first online order
            </span>
            <SectionHeading
              light
              align="center"
              className="mt-6"
              eyebrow="Order direct"
              title="Order from the kitchen, not the app"
              description="Choose collection or delivery, pick your mezze and grills, and pay securely. Your order goes straight to our kitchen in Hatch End."
            />
          </Reveal>
          <div className="mt-12">
            <OrderingWidget />
          </div>
          <Script src={site.ordering.script} strategy="afterInteractive" />
        </div>
      </Section>

      <Section tone="parchment">
        <div className="container-content">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionHeading light align="center" eyebrow="Prefer an app?" title="We’re on the delivery apps too" description="Same kitchen, same chefs, same fresh ingredients, if you already have an account and would rather order there." />
          </Reveal>

          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {site.delivery.map((partner, index) => (
              <Reveal key={partner.name} as="li" delay={index * 100}>
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col items-center gap-6 rounded-3xl border border-ink/10 bg-white p-10 text-center shadow-card transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-gold-deep"
                >
                  <Image src={partner.logo} alt="" width={144} height={192} className="h-24 w-auto object-contain" />
                  <div>
                    <h3 className="font-display text-3xl text-ink">{partner.name}</h3>
                    <p className="mt-2 text-sm text-ink/60">Delivery to Hatch End and surrounding areas</p>
                  </div>
                  <span className="mt-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink group-hover:text-gold-dark">
                    Order on {partner.name} <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="ink">
        <div className="container-content grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Collection"
              title="Prefer to collect?"
              description={
                <>
                  Call us on{" "}
                  <a href={`tel:${site.phone.e164}`} className="text-gold underline underline-offset-4">
                    {site.phone.display}
                  </a>{" "}
                  with your order and we’ll have it ready when you arrive. Browse the full{" "}
                  <Link href="/menu/a-la-carte" className="text-gold underline underline-offset-4">
                    à la carte menu
                  </Link>{" "}
                  to choose your mezze and grills.
                </>
              }
            />
          </Reveal>
          <Reveal delay={100} className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image src="/images/mezze-spread.jpg" alt="Mezze dishes at Zufa" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </Reveal>
        </div>
      </Section>

      <CtaBand eyebrow="Or dine in" title="Nothing beats mezze fresh from the kitchen" description="Book a table and enjoy the sizzling clay pans, the saj bread and the hospitality in person." />
      <JsonLd data={webPageSchema({ path: "/takeaway", title: page.title, description: page.description, image: page.image })} />
    </>
  );
}
