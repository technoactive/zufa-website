import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Download } from "lucide-react";
import { PageHero } from "@/components/blocks/page-hero";
import { CtaBand } from "@/components/blocks/cta-band";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { menuHubSchema, webPageSchema } from "@/lib/schema";
import { getPage } from "@/content/pages";
import { menus } from "@/content/menus";
import { site } from "@/content/site";

export const metadata: Metadata = pageMetadata("/menu");

const page = getPage("/menu")!;

export default function MenuHubPage() {
  return (
    <>
      <PageHero
        eyebrow="Our menus"
        title={
          <>
            Authentic Lebanese dishes made from <em className="italic text-gold">locally sourced</em> ingredients
          </>
        }
        description="Lebanon’s rich cultural history has made its cuisine the most popular in the Middle East. Meals begin with a selection of small sharing dishes called mezze, followed by grilled meats, fish and vegetarian mains, with desserts flavoured with rose water, orange blossom and sugar syrup."
        image={{ src: "/images/feast-table.jpg", alt: "Lebanese feast at Zufa with grilled lamb, salads and mezze" }}
        crumbs={[{ name: "Menu", path: "/menu" }]}
      />

      <Section tone="cream" pattern>
        <div className="container-content">
          <ul className="grid gap-6 md:grid-cols-2">
            {menus.map((menu, index) => (
              <Reveal key={menu.slug} as="li" delay={index * 80}>
                <article className="group grid h-full overflow-hidden rounded-3xl border border-ink/10 bg-parchment shadow-card sm:grid-cols-[2fr_3fr]">
                  <Link href={`/menu/${menu.slug}`} className="relative block aspect-[4/3] sm:aspect-auto sm:h-full" aria-hidden tabIndex={-1}>
                    <Image
                      src={menu.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 20vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-105"
                    />
                  </Link>
                  <div className="flex flex-col p-7 sm:p-8">
                    {menu.availability ? <p className="eyebrow text-gold-dark">{menu.availability}</p> : null}
                    <h2 className="mt-2 font-display text-3xl text-ink">
                      <Link href={`/menu/${menu.slug}`} className="hover:text-gold-dark">
                        {menu.title}
                      </Link>
                    </h2>
                    <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink/70">{menu.summary}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                      <Link
                        href={`/menu/${menu.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:text-gold-dark"
                      >
                        View menu <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
                      </Link>
                      {menu.pdf ? (
                        <a
                          href={menu.pdf}
                          download
                          className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-ink/55 transition-colors hover:text-ink"
                        >
                          <Download className="size-3.5" aria-hidden /> PDF
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="ink">
        <div className="container-content grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Dietary needs"
              title="Naturally generous to vegetarians, vegans and allergies"
              description="Lebanese cooking is built on vegetables, pulses, herbs and olive oil. Every dish on our menus lists its allergens, and our team will happily guide you — just tell your server before you order."
            />
          </Reveal>
          <Reveal delay={100} className="rounded-3xl border border-cream/10 bg-charcoal p-8 text-sm leading-relaxed text-sand">
            <p>
              <strong className="text-cream">Allergen information:</strong> we flag gluten, dairy, celery, nuts, sesame, lupin, fish, eggs, crustaceans and peanuts against each dish. Our kitchen handles all fourteen major allergens, so we cannot guarantee any dish is completely free from traces.
            </p>
            <p className="mt-4">{site.serviceCharge}</p>
          </Reveal>
        </div>
      </Section>

      <CtaBand />
      <JsonLd data={[webPageSchema({ path: "/menu", title: page.title, description: page.description, image: page.image }), ...menuHubSchema()]} />
    </>
  );
}
