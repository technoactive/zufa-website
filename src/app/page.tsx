import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { Route } from "next";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { InstagramIcon as Instagram } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { CtaBand } from "@/components/blocks/cta-band";
import { FaqList } from "@/components/blocks/faq-list";
import { MenuIndex } from "@/components/blocks/menu-index";
import { PhotoMarquee, type MarqueePhoto } from "@/components/blocks/photo-marquee";
import { Ticker, type TickerItem } from "@/components/blocks/ticker";
import { TonightCard, type TonightOffer } from "@/components/blocks/tonight-card";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";
import { getPage } from "@/content/pages";
import { menus } from "@/content/menus";
import { getOffer, regularOffers } from "@/content/offers";
import { generalFaqs } from "@/content/faqs";
import { site } from "@/content/site";

export const metadata: Metadata = pageMetadata("/");

const page = getPage("/")!;

/* ------------------------------------------------------------------ */
/* Data derived from content                                            */
/* ------------------------------------------------------------------ */

const tonightOffers: TonightOffer[] = regularOffers
  .filter((offer) => offer.days?.length)
  .map((offer) => ({ id: offer.id, label: offer.short ?? offer.title, hours: offer.hours, href: offer.cta.href, days: offer.days! }));

const tickerItems: TickerItem[] = [
  ...regularOffers.filter((offer) => offer.days?.length).map((offer) => ({ label: `${offer.short ?? offer.title} · ${offer.when}`, href: "/whats-on" })),
  { label: "20% off your first order on this website", href: "/takeaway#order-online" },
  { label: `Private hire for up to ${site.capacity.standing}`, href: "/private-hire" },
  { label: "Lebanese catering across North West London", href: "/catering" },
  { label: `Family-run since ${site.foundingYear}, Tannourine to Hatch End`, href: "/our-story" },
  { label: "Lebanese wines, arak and house cocktails", href: "/menu/drinks" },
];

const marqueePhotos: MarqueePhoto[] = [
  { src: "/images/feast-table.jpg", alt: "A table of Lebanese dishes seen from above: lamb, salads, fatayer and a cocktail" },
  { src: "/images/sharing-table.jpg", alt: "A round table laden with sharing dishes and cocktails at Zufa", portrait: true },
  { src: "/images/restaurant-interior.jpg", alt: "The dining room at Zufa with its glass-leaf chandelier" },
  { src: "/images/warak-enab.jpg", alt: "Warak enab plated with pomegranate and yoghurt", portrait: true },
  { src: "/images/dinner-for-two.jpg", alt: "Grilled lamb and salmon with wine at Zufa" },
  { src: "/images/mezze-spread.jpg", alt: "A spread of Lebanese mezze dishes at Zufa", portrait: true },
];

const signatures = [
  {
    title: "Home-made saj bread",
    text: "Baked to order on a domed iron griddle the way it is in the mountains, filled with zaatar, cheese or kafta, then chargrilled and served on olive-wood boards cut in Lebanon.",
    href: "/menu/a-la-carte#saj-bread",
    cue: "Zaatar · Jibneh · Kafta-jibneh",
  },
  {
    title: "Hot mezze in clay pans",
    text: "Sambousek, kebbeh, jawaneh, arayes and sojok arrive sizzling in handmade clay pans, so the last bite is as warm as the first.",
    href: "/menu/a-la-carte#hot-mezze",
    cue: "Kebbeh · Sambousek · Jawaneh",
  },
  {
    title: "The charcoal grill",
    text: "Shish taouk, kafta meshwi, lamb cutlets and free-range baby chicken, marinated overnight and grilled over charcoal to order.",
    href: "/menu/a-la-carte#grill",
    cue: "Shish taouk · Castaletta · Mixed grill",
  },
] as const;

const corkageMonday = getOffer("byo-monday")!;

export default function HomePage() {
  return (
    <>
      <Hero />
      <Story />
      <Signatures />
      <PhotoMarquee photos={marqueePhotos} className="bg-ink" />
      <MenuShowcase />
      <WhatsOn />
      <PressQuote />
      <EventsPanels />
      <Takeaway />
      <Faqs />
      <CtaBand />
      <JsonLd data={webPageSchema({ path: "/", title: page.title, description: page.description, image: page.image })} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-cream">
      <div aria-hidden className="absolute inset-0 -z-20 animate-ken-burns motion-reduce:animate-none">
        <Image
          src="/images/mezze-spread.jpg"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={75}
          className="object-cover object-center"
        />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/75 via-ink/30 to-transparent" />

      <div className="container-content relative flex flex-1 flex-col justify-end pb-12 pt-[calc(var(--header-height)+5rem)] sm:pb-16 lg:pt-[calc(var(--header-height)+7rem)]">
        <div className="grid items-end gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div className="max-w-3xl">
            <p className="eyebrow mb-6 animate-fade-up">Family-run Lebanese restaurant · Hatch End</p>
            <h1 className="text-display-xl animate-fade-up [animation-delay:80ms]">
              The Lebanese table, <em className="font-normal italic text-gold">in Hatch End</em>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-sand animate-fade-up [animation-delay:160ms] sm:text-xl">
              Home-made saj bread, hot mezze in clay pans and a charcoal grill that runs until late. Two brothers from Tannourine, cooking the way our
              parents have since {site.foundingYear}, on Uxbridge Road between Pinner and Harrow.
            </p>
            <div className="mt-10 flex flex-col gap-4 animate-fade-up [animation-delay:240ms] sm:flex-row">
              <Button href="/bookings" size="lg">
                Book a table
              </Button>
              <Button href="/menu" variant="secondary" size="lg">
                See the menus
              </Button>
            </div>
            <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-sand animate-fade-up [animation-delay:320ms]">
              <li>
                <a href={site.maps.google} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-gold">
                  <MapPin className="size-3.5 text-gold" aria-hidden />
                  {site.address.full}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phone.e164}`} className="inline-flex items-center gap-2 hover:text-gold">
                  <Phone className="size-3.5 text-gold" aria-hidden />
                  {site.phone.display}
                </a>
              </li>
            </ul>
          </div>

          <div className="animate-fade-up [animation-delay:360ms] lg:justify-self-end lg:w-full lg:max-w-sm">
            <TonightCard offers={tonightOffers} />
          </div>
        </div>
      </div>

      <div className="relative animate-fade-up [animation-delay:480ms]">
        <Ticker items={tickerItems} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Story                                                                */
/* ------------------------------------------------------------------ */

function Story() {
  return (
    <Section tone="ink" pattern className="overflow-hidden">
      <p
        aria-hidden
        className="pointer-events-none absolute -top-10 left-1/2 -z-10 -translate-x-1/2 select-none font-display text-[clamp(10rem,30vw,26rem)] leading-none text-cream/[0.035]"
      >
        {site.foundingYear}
      </p>
      <div className="container-content grid items-center gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem]">
            <Image
              src="/images/dinner-for-two.jpg"
              alt="Dinner for two at Zufa: grilled lamb, salmon and prawns with a glass of red and white wine"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -right-4 w-[46%] animate-float motion-reduce:animate-none sm:-right-8">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border-[6px] border-ink shadow-card">
              <Image src="/images/warak-enab.jpg" alt="Warak enab, stuffed vine leaves, plated with pomegranate and yoghurt" fill sizes="(min-width: 1024px) 20vw, 45vw" className="object-cover" />
            </div>
          </div>
          <div className="absolute -left-3 top-8 rounded-full border border-gold/40 bg-ink/85 px-5 py-3 backdrop-blur-md sm:-left-8">
            <p className="font-display text-3xl leading-none text-gold">{site.foundingYear}</p>
            <p className="mt-1 text-[0.625rem] uppercase tracking-[0.18em] text-sand">Tannourine, Lebanon</p>
          </div>
        </Reveal>

        <Reveal delay={120} className="pt-8 lg:pt-0">
          <SectionHeading
            eyebrow="Our story"
            title={
              <>
                Two brothers, one village, <em className="italic text-gold">one way of cooking</em>
              </>
            }
            description={
              <>
                <p>
                  Our parents opened their restaurant in Tannourine, high in the mountains of North Lebanon, in {site.foundingYear}. It is still one of the
                  best-loved places to eat in the north of the country. Zufa is what happened when my brother and I brought that kitchen to London.
                </p>
                <p className="mt-4">
                  The rules have not changed. Everything is made from scratch, every day: the bread on the saj, the mezze, the marinades, the syrups for the
                  sweets. What has changed is the postcode.
                </p>
              </>
            }
          />
          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-cream/10 pt-8">
            {[
              { label: "Founded", value: String(site.foundingYear) },
              { label: "Made from scratch", value: "100%" },
              { label: "Seats for a party", value: String(site.capacity.seated) },
            ].map((fact) => (
              <div key={fact.label} className="flex flex-col">
                <dt className="order-2 mt-1 text-xs uppercase tracking-[0.16em] text-smoke">{fact.label}</dt>
                <dd className="order-1 font-display text-3xl text-cream sm:text-4xl">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8">
            <Button href="/our-story" variant="ghost" className="gap-3">
              Read our story <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" aria-hidden />
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Signatures                                                           */
/* ------------------------------------------------------------------ */

function Signatures() {
  return (
    <Section tone="charcoal" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 -z-10 size-[36rem] rounded-full bg-gold/[0.06] blur-3xl" />
      <div className="container-content grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <Reveal>
            <SectionHeading
              eyebrow="Order these first"
              title="Three things Zufa is known for"
              description="If it is your first visit, start here. Everything else on the menu follows on from these."
            />
          </Reveal>
          <ol className="mt-12 divide-y divide-cream/10">
            {signatures.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 90}>
                <Link href={item.href as Route} className="group grid grid-cols-[3.5rem_1fr_auto] items-start gap-4 py-7 sm:gap-6">
                  <span className="font-display text-4xl leading-none text-gold/50 transition-colors group-hover:text-gold">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-display text-[1.875rem] leading-tight text-cream transition-colors group-hover:text-gold sm:text-[2.25rem]">{item.title}</span>
                    <span className="mt-3 block text-[0.9375rem] leading-relaxed text-sand">{item.text}</span>
                    <span className="mt-3 block text-xs uppercase tracking-[0.16em] text-smoke">{item.cue}</span>
                  </span>
                  <ArrowUpRight className="mt-2 size-5 text-cream/30 transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" aria-hidden />
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={120} className="relative lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:self-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[5/6]">
            <Image
              src="/images/feast-table.jpg"
              alt="A Zufa table from above: chargrilled lamb, fattoush, hommos, fatayer, lamb shank on rice and a pomegranate cocktail"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
              <p className="max-w-xs text-sm leading-relaxed text-cream/90">Mezze first, then the grill. Lebanese meals are built to be shared, so bring people.</p>
              <Button href="/menu/set-menus" size="sm" variant="secondary" className="shrink-0 border-cream/40 text-cream hover:border-cream hover:text-cream">
                Set menus
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Menus                                                                */
/* ------------------------------------------------------------------ */

function MenuShowcase() {
  return (
    <Section tone="cream" pattern className="overflow-hidden">
      <div className="container-content">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            light
            eyebrow="The menus"
            title="From mezze to midnight cocktails"
            description="Every menu is online in full with prices and allergens. Hover a menu to see what it looks like on the table."
          />
          <Button href="/menu" variant="light" className="shrink-0">
            All menus
          </Button>
        </Reveal>
        <Reveal delay={100} className="mt-12">
          <MenuIndex
            items={menus.map((menu) => ({
              slug: menu.slug,
              title: menu.shortTitle,
              summary: menu.summary,
              availability: menu.availability,
              image: menu.image,
              imageAlt: menu.imageAlt,
            }))}
          />
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* What's on                                                            */
/* ------------------------------------------------------------------ */

function WhatsOn() {
  const weekly = regularOffers.filter((offer) => offer.days?.length);
  return (
    <Section tone="ink" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 -z-10 size-[36rem] rounded-full bg-gold/[0.07] blur-3xl" />
      <div className="container-content grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal className="relative isolate flex min-h-[28rem] flex-col justify-end overflow-hidden rounded-[2rem] p-8 sm:p-10 lg:min-h-full">
          <Image
            src={corkageMonday.image!.src}
            alt={corkageMonday.image!.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="-z-20 object-cover"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
          <p className="eyebrow">{corkageMonday.when}</p>
          <h3 className="mt-4 max-w-sm font-display text-display-md text-cream">{corkageMonday.headline}</h3>
          <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-sand">{corkageMonday.description}</p>
          <div className="mt-6">
            <Button href={corkageMonday.cta.href} variant="secondary" size="sm">
              {corkageMonday.cta.label}
            </Button>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionHeading eyebrow="What’s on" title="Good reasons to come back in the week" description="Regular offers that run every week, plus the nights that fill up first." />
          </Reveal>
          <ul className="mt-10 divide-y divide-cream/10">
            {weekly.map((offer, index) => (
              <Reveal as="li" key={offer.id} delay={index * 80}>
                <Link href={offer.cta.href as Route} className="group grid grid-cols-[5.5rem_1fr_auto] items-center gap-4 py-6 sm:grid-cols-[8rem_1fr_auto] sm:gap-6">
                  <span className="font-display text-3xl leading-none text-gold sm:text-[2.75rem]">{offer.stat?.value}</span>
                  <span>
                    <span className="block font-display text-2xl leading-tight text-cream transition-colors group-hover:text-gold">{offer.headline}</span>
                    <span className="mt-1.5 block text-sm text-sand">{offer.when}</span>
                  </span>
                  <ArrowRight className="size-5 text-cream/30 transition-[transform,color] group-hover:translate-x-1 group-hover:text-gold" aria-hidden />
                </Link>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={260} className="mt-8">
            <Button href="/whats-on" variant="secondary">
              Everything on this week
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Press                                                                */
/* ------------------------------------------------------------------ */

function PressQuote() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-24 text-cream sm:py-32">
      <Image src="/images/sharing-table.jpg" alt="" fill sizes="100vw" quality={60} className="-z-20 object-cover opacity-25" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/75 to-ink" />
      <div className="container-content">
        <Reveal as="figure" className="mx-auto max-w-4xl text-center">
          <p className="text-gold" aria-label="Five stars">
            {"★★★★★"}
          </p>
          <blockquote className="mt-6">
            <p className="font-display text-display-md italic leading-snug text-cream sm:text-display-lg">“{site.press.quote}”</p>
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
  );
}

/* ------------------------------------------------------------------ */
/* Catering & private hire                                              */
/* ------------------------------------------------------------------ */

function EventsPanels() {
  const panels: readonly [EventPanelData, EventPanelData] = [
    {
      eyebrow: "Lebanese catering",
      title: (
        <>
          Bring Zufa <em className="italic text-gold-dark">to you</em>
        </>
      ),
      text: "Weddings, birthdays, office lunches and family gatherings. The same kitchen, cooked from scratch on the day and brought to your door.",
      points: [
        "Mezze, charcoal grills and saj bread, made fresh that morning",
        `${site.cateringAreas.slice(0, 4).join(", ")} and the roads between`,
        "A menu and a per-head price before you commit to anything",
      ],
      href: "/catering",
      cta: "Get a catering quote",
      stat: { value: `${site.cateringAreas.length}+`, label: "towns we cook for" },
      image: "/images/sharing-table.jpg",
      alt: "A generous sharing table of Lebanese dishes prepared by Zufa",
    },
    {
      eyebrow: "Private hire",
      title: (
        <>
          Bring everyone <em className="italic text-gold-dark">to Zufa</em>
        </>
      ),
      text: "Close the doors, dim the lights and have the whole restaurant to yourselves for the evening. We look after the food, the bar and the music.",
      points: [
        `Up to ${site.capacity.seated} seated or ${site.capacity.standing} standing`,
        "Licensed bar, patio and the whole room to yourselves",
        "Engagements, birthdays, baby showers and work parties",
      ],
      href: "/private-hire",
      cta: "Check a date",
      stat: { value: String(site.capacity.standing), label: "guests, doors closed" },
      image: "/images/restaurant-interior.jpg",
      alt: "The dining room at Zufa Hatch End with its glass-leaf chandelier and patio doors",
    },
  ];

  return (
    <Section tone="cream" pattern className="overflow-hidden">
      <div className="container-content">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionHeading
            light
            align="center"
            eyebrow="Parties & events"
            title="Your party, two ways"
            description="Bring our kitchen to you, or take over the restaurant for the night. Either way it is the same food and the same family looking after you."
          />
        </Reveal>

        <div className="relative mt-16 grid gap-16 lg:grid-cols-[1fr_auto_1fr] lg:gap-12 xl:gap-16">
          <EventPanel panel={panels[0]} />
          <div className="relative flex items-center justify-center lg:flex-col" aria-hidden>
            <span className="h-px flex-1 bg-ink/15 lg:h-auto lg:w-px lg:flex-1" />
            <span className="mx-4 flex size-14 items-center justify-center rounded-full border border-gold/50 bg-cream font-display text-2xl italic text-gold-dark shadow-card lg:my-4 lg:mx-0">
              or
            </span>
            <span className="h-px flex-1 bg-ink/15 lg:h-auto lg:w-px lg:flex-1" />
          </div>
          <EventPanel panel={panels[1]} offset delay={120} />
        </div>
      </div>
    </Section>
  );
}

interface EventPanelData {
  eyebrow: string;
  title: ReactNode;
  text: string;
  points: readonly string[];
  href: Route;
  cta: string;
  stat: { value: string; label: string };
  image: string;
  alt: string;
}

function EventPanel({ panel, offset = false, delay = 0 }: { panel: EventPanelData; offset?: boolean; delay?: number }) {
  return (
    <Reveal delay={delay} className={cn("group flex flex-col", offset && "lg:mt-20")}>
      <Link href={panel.href} className="relative block" aria-label={panel.cta}>
        <span
          aria-hidden
          className="absolute -inset-3 -z-10 rounded-[2.25rem] border border-gold/40 transition-transform duration-700 ease-(--ease-out-expo) group-hover:translate-x-2 group-hover:translate-y-2 sm:-inset-4 sm:rounded-[2.5rem]"
        />
        <span className="relative block aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-ink shadow-card sm:rounded-[2rem]">
          <Image
            src={panel.image}
            alt={panel.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover transition-transform duration-1000 ease-(--ease-out-expo) group-hover:scale-[1.04]"
          />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          <span className="absolute bottom-5 left-5 flex items-baseline gap-2 rounded-full border border-cream/20 bg-ink/70 px-4 py-2 text-cream backdrop-blur-md">
            <span className="font-display text-2xl leading-none text-gold">{panel.stat.value}</span>
            <span className="text-[0.6875rem] uppercase tracking-[0.16em] text-sand">{panel.stat.label}</span>
          </span>
        </span>
      </Link>

      <div className="mt-10">
        <p className="eyebrow text-gold-dark">{panel.eyebrow}</p>
        <h3 className="mt-3 font-display text-display-md text-ink">{panel.title}</h3>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-ink/70">{panel.text}</p>
        <ul className="mt-6 flex flex-col gap-3">
          {panel.points.map((point) => (
            <li key={point} className="flex items-start gap-3 text-[0.9375rem] leading-snug text-ink/80">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rotate-45 bg-gold-dark" />
              {point}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button href={panel.href}>{panel.cta}</Button>
          <a href={`tel:${site.phone.e164}`} className="inline-flex items-center gap-2 text-sm font-semibold text-ink/70 transition-colors hover:text-gold-dark">
            <Phone className="size-3.5 text-gold-dark" aria-hidden /> or call {site.phone.display}
          </a>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Takeaway                                                             */
/* ------------------------------------------------------------------ */

function Takeaway() {
  return (
    <Section tone="charcoal">
      <div className="container-content flex flex-col items-center gap-10 text-center">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Takeaway & delivery"
            title="Zufa at home"
            description="Order for collection or have it delivered across Hatch End, Pinner and Harrow. 20% off when you order on this website — not on the apps."
          />
        </Reveal>
        <Reveal delay={100} className="flex flex-col items-center gap-6">
          <Button href="/takeaway#order-online" size="lg">
            Order on this website
          </Button>
          <p className="text-sm text-sand">The apps are still there if you prefer — the 20% does not apply on them</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {site.delivery.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Order Zufa on ${partner.name} (opens in a new tab)`}
                className="inline-flex h-16 items-center gap-3 rounded-2xl border border-cream/10 bg-white pr-6 pl-3 text-ink transition-[border-color,transform] hover:-translate-y-0.5 hover:border-gold"
              >
                <Image src={partner.logo} alt="" width={96} height={128} className="h-11 w-auto object-contain" />
                <span className="text-sm font-semibold">{partner.name}</span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQs                                                                 */
/* ------------------------------------------------------------------ */

function Faqs() {
  return (
    <Section tone="parchment">
      <div className="container-content grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <Reveal>
          <SectionHeading light eyebrow="Good to know" title="Questions, answered" description="What first-time guests tend to ask before they visit." />
          <div className="mt-8 flex flex-col gap-3 text-sm text-ink/70">
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-gold-dark">
              <Instagram className="size-4" aria-hidden /> Follow {site.social.instagramHandle}
            </a>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <FaqList faqs={generalFaqs.slice(0, 6)} light />
        </Reveal>
      </div>
    </Section>
  );
}
