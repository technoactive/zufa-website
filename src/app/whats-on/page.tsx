import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";
import { ArrowRight, Clock, Martini, MessageCircle, Music, PartyPopper, Phone, ShoppingBag, Sparkles, UtensilsCrossed, Wine } from "lucide-react";
import { InstagramIcon as Instagram } from "@/components/ui/icons";
import { PageHero } from "@/components/blocks/page-hero";
import { CtaBand } from "@/components/blocks/cta-band";
import { WeekPlanner, type PlannerDay } from "@/components/blocks/week-planner";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { offersSchema, webPageSchema } from "@/lib/schema";
import { dayOrder, formatTime, periodForDay } from "@/lib/hours";
import { getPage } from "@/content/pages";
import { getOffer, offers, regularOffers, type Offer } from "@/content/offers";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata("/whats-on");
const page = getPage("/whats-on")!;

const icons: Record<string, ReactNode> = {
  "byo-monday": <Wine className="size-5" aria-hidden />,
  "cocktails-241": <Martini className="size-5" aria-hidden />,
  lunch: <UtensilsCrossed className="size-5" aria-hidden />,
  "first-order": <ShoppingBag className="size-5" aria-hidden />,
  "belly-dancing": <Music className="size-5" aria-hidden />,
  "private-hire": <PartyPopper className="size-5" aria-hidden />,
};

const iconFor = (offer: Offer): ReactNode => icons[offer.id] ?? <Sparkles className="size-5" aria-hidden />;

/* Week planner data — derived on the server from opening hours and offer days. */
const plannerDays: PlannerDay[] = dayOrder.map((day) => {
  const period = periodForDay(day)!;
  return {
    day,
    open: `${formatTime(period.opens)} – ${formatTime(period.closes)}`,
    lateNight: period.closes === "00:00",
    items: regularOffers
      .filter((offer) => offer.days?.includes(day))
      .map((offer) => ({ id: offer.id, label: offer.short ?? offer.title, hours: offer.hours, href: `#${offer.id}` })),
  };
});

const bellyDancing = getOffer("belly-dancing")!;
const privateHire = getOffer("private-hire")!;

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
      >
        <Button href="/bookings" size="lg">
          Book a table
        </Button>
        <Button href="#offers" variant="secondary" size="lg">
          See the offers
        </Button>
      </PageHero>

      <WeekAtZufa />
      <Offers />
      <BellyDancing />
      <PressQuote />
      <PrivateHire />
      <CtaBand />

      <JsonLd data={webPageSchema({ path: "/whats-on", title: page.title, description: page.description, image: page.image })} />
      <JsonLd data={offersSchema(offers)} />
    </>
  );
}

/* ------------------------------------------------------------------ */

function WeekAtZufa() {
  return (
    <Section tone="ink" pattern className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 -z-10 size-[36rem] rounded-full bg-gold/[0.07] blur-3xl" />
      <div className="container-content">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Plan your week"
            title="Seven days, something on every one of them"
            description="Weekday lunch and cocktail hours, corkage-free Mondays and late nights on Fridays and Saturdays. Today is highlighted — tap an offer to jump to the details."
          />
          <p className="inline-flex shrink-0 items-center gap-2 text-sm text-sand">
            <Clock className="size-4 text-gold" aria-hidden /> Kitchen open from 11am daily
          </p>
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <WeekPlanner days={plannerDays} />
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function OfferWhen({ offer, light = false }: { offer: Offer; light?: boolean }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em]",
        light ? "border-gold-deep/40 bg-gold/15 text-gold-dark" : "border-gold/30 bg-gold/10 text-gold",
      )}
    >
      <Clock className="size-3.5" aria-hidden />
      {offer.when}
    </p>
  );
}

function Offers() {
  const [featured, ...rest] = regularOffers;

  return (
    <Section tone="cream" pattern id="offers" className="scroll-mt-20">
      <div className="container-content">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            light
            eyebrow="Offers"
            title="Good reasons to come back"
            description="Four ways to make a night at Zufa even better — no vouchers, no codes, just ask when you book or order."
          />
          <Button href="/bookings" variant="light" className="shrink-0">
            Book a table
          </Button>
        </Reveal>

        <div className="mt-14 space-y-5">
          <Reveal>
            <FeaturedOffer offer={featured} />
          </Reveal>
          <ul className="grid gap-5 md:grid-cols-3">
            {rest.map((offer, index) => (
              <Reveal key={offer.id} as="li" delay={(index + 1) * 90}>
                <OfferCard offer={offer} index={index + 2} />
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function FeaturedOffer({ offer }: { offer: Offer }) {
  return (
    <article
      id={offer.id}
      className="group relative isolate flex h-full flex-col overflow-hidden rounded-[2rem] bg-ink text-cream shadow-card scroll-mt-32 sm:flex-row"
    >
      {offer.image ? (
        <div className="relative aspect-[16/10] sm:order-last sm:aspect-auto sm:w-[38%] sm:shrink-0 lg:w-[42%]">
          <Image
            src={offer.image.src}
            alt={offer.image.alt}
            fill
            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 38vw, 100vw"
            className="object-cover transition-transform duration-1000 ease-(--ease-out-expo) group-hover:scale-105"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent sm:bg-gradient-to-r sm:from-ink sm:via-ink/20 sm:to-transparent" />
        </div>
      ) : null}

      <div className="relative flex flex-1 flex-col p-8 sm:p-10 lg:p-12">
        <div className="flex items-start justify-between gap-4">
          <OfferWhen offer={offer} />
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold">{iconFor(offer)}</span>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,13rem)_1fr] lg:gap-12">
          {offer.stat ? (
            <div>
              <p className="font-display text-[clamp(4.5rem,4rem+2vw,6.5rem)] leading-[0.9] tracking-tight text-gold">{offer.stat.value}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-sand">{offer.stat.label}</p>
            </div>
          ) : null}

          <div className="flex flex-col">
            <h3 className="font-display text-3xl text-balance sm:text-4xl">{offer.headline}</h3>
            <p className="mt-4 text-base leading-relaxed text-sand">{offer.description}</p>
            {offer.details ? <p className="mt-3 text-sm text-smoke">{offer.details}</p> : null}
            <div className="mt-8">
              <Button href={offer.cta.href}>
                {offer.cta.label} <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" aria-hidden />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function OfferCard({ offer, index }: { offer: Offer; index: number }) {
  return (
    <article
      id={offer.id}
      className="group relative flex h-full flex-col rounded-[2rem] border border-ink/10 bg-parchment p-8 shadow-card transition-[border-color,transform,box-shadow] duration-500 scroll-mt-32 hover:-translate-y-1 hover:border-gold-deep/60 sm:p-10"
    >
      <div className="flex items-start justify-between gap-4">
        <OfferWhen offer={offer} light />
        <span className="font-display text-2xl leading-none text-ink/25 tabular-nums">{String(index).padStart(2, "0")}</span>
      </div>

      {offer.stat ? (
        <div className="mt-10 flex items-end justify-between gap-6">
          <div>
            <p className="font-display text-6xl leading-[0.9] tracking-tight text-ink sm:text-7xl">{offer.stat.value}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">{offer.stat.label}</p>
          </div>
          <span className="mb-1 inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-gold-deep/40 text-gold-dark transition-colors duration-500 group-hover:bg-gold-dark group-hover:text-cream">
            {iconFor(offer)}
          </span>
        </div>
      ) : null}

      <h3 className="mt-8 font-display text-3xl text-balance text-ink">{offer.headline}</h3>
      <p className="mt-3 flex-1 text-base leading-relaxed text-ink/70">{offer.description}</p>
      {offer.details ? <p className="mt-3 text-sm text-ink/55">{offer.details}</p> : null}

      <Link
        href={offer.cta.href as Route}
        className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-colors group-hover:text-gold-dark"
      >
        {offer.cta.label} <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
      </Link>
    </article>
  );
}

/* ------------------------------------------------------------------ */

function BellyDancing() {
  const offer = bellyDancing;
  const points = [
    "A live show between courses on selected evenings",
    "Tables go fast — book ahead and ask for the next date",
    "Shows can be arranged for private parties and celebrations",
  ];

  return (
    <Section tone="charcoal" id={offer.id} className="relative overflow-hidden scroll-mt-20">
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 -z-10 size-[34rem] rounded-full bg-terracotta/10 blur-3xl" />
      <div className="container-content grid items-stretch gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <Reveal className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-card lg:aspect-auto lg:h-full lg:min-h-[32rem]">
            {offer.image ? (
              <Image src={offer.image.src} alt={offer.image.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" quality={85} className="object-cover" />
            ) : null}
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            <p className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-cream/20 bg-ink/60 px-3.5 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-cream backdrop-blur-md sm:left-8 sm:top-8">
              <span aria-hidden className="size-1.5 rounded-full bg-gold" /> Live at Zufa
            </p>
          </div>
          <div className="absolute -bottom-6 left-6 flex items-center gap-4 rounded-2xl border border-gold/25 bg-ink/90 px-5 py-4 shadow-glow backdrop-blur-md sm:-bottom-8 sm:left-10">
            <span className="inline-flex size-11 items-center justify-center rounded-full bg-gold text-ink">
              <Music className="size-5" aria-hidden />
            </span>
            <div>
              <p className="font-display text-2xl leading-none text-cream">Selected evenings</p>
              <p className="mt-1.5 text-xs uppercase tracking-[0.16em] text-sand">Call for the next show</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="flex flex-col justify-center lg:pl-4">
          <SectionHeading eyebrow="Live entertainment" title="Belly dancing nights" description={offer.description} />

          <ul className="mt-8 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-base text-cream/90">
                <Sparkles className="mt-1 size-4 shrink-0 text-gold" aria-hidden />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={offer.cta.href}>
              <Phone className="size-4" aria-hidden /> {offer.cta.label}
            </Button>
            <Button href="/private-hire" variant="secondary">
              Plan a private party
            </Button>
          </div>

          <div className="mt-10 border-t border-cream/10 pt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Hear about the next show first</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-4 py-2.5 text-sm text-cream transition-colors hover:border-gold hover:text-gold"
              >
                <Instagram className="size-4" aria-hidden /> {site.social.instagramHandle}
              </a>
              <a
                href={site.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-4 py-2.5 text-sm text-cream transition-colors hover:border-gold hover:text-gold"
              >
                <MessageCircle className="size-4" aria-hidden /> WhatsApp {site.whatsapp.display}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function PressQuote() {
  return (
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

function PrivateHire() {
  const offer = privateHire;
  const highlights = [
    { value: String(site.capacity.seated), label: "seated" },
    { value: String(site.capacity.standing), label: "standing" },
    { value: "7", label: "days a week" },
  ];

  return (
    <Section tone="parchment" id={offer.id} className="scroll-mt-20">
      <div className="container-content grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <Reveal>
          <SectionHeading
            light
            eyebrow="Private hire"
            title={
              <>
                Celebrate your special occasion <em className="italic text-gold-dark">at Zufa</em>
              </>
            }
            description={`${offer.description} To book a table or event for more than ${site.reservations.eventPartySize} guests please call us on ${site.phone.display}.`}
          />
          <dl className="mt-10 grid grid-cols-3 gap-6 border-y border-ink/10 py-8">
            {highlights.map((item) => (
              <div key={item.label}>
                <dd className="font-display text-5xl leading-none text-ink">{item.value}</dd>
                <dt className="mt-2 text-xs uppercase tracking-[0.16em] text-ink/55">{item.label}</dt>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={offer.cta.href} variant="dark">
              Plan your event
            </Button>
            <Button href={`tel:${site.phone.e164}`} variant="light">
              <Phone className="size-4" aria-hidden /> Call {site.phone.display}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={120} className="relative isolate">
          <span aria-hidden className="absolute -inset-3 -z-10 rounded-[2.5rem] border border-gold-deep/40 sm:-inset-4" />
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-card lg:aspect-[5/4]">
            {offer.image ? <Image src={offer.image.src} alt={offer.image.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /> : null}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
