import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Clock, MapPin, Flame, Wheat, UtensilsCrossed } from "lucide-react";
import { InstagramIcon as Instagram } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { CtaBand } from "@/components/blocks/cta-band";
import { FaqList } from "@/components/blocks/faq-list";
import { OpenStatus } from "@/components/layout/open-status";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";
import { getPage } from "@/content/pages";
import { menus } from "@/content/menus";
import { offers } from "@/content/offers";
import { generalFaqs } from "@/content/faqs";
import { openingHours, site } from "@/content/site";

export const metadata: Metadata = pageMetadata("/");

const page = getPage("/")!;

const signatures = [
  {
    icon: Wheat,
    title: "Home-made saj bread",
    text: "Baked to order on a traditional domed griddle and served on hand-cut olive wood boards brought from Lebanon.",
    href: "/menu/a-la-carte#saj-bread",
  },
  {
    icon: Flame,
    title: "Sizzling hot mezze",
    text: "Hot mezze arrive in handmade clay pans so they stay warm and fragrant until the very last bite.",
    href: "/menu/a-la-carte#hot-mezze",
  },
  {
    icon: UtensilsCrossed,
    title: "Charcoal grill",
    text: "Shish taouk, kafta, lamb cutlets and free-range baby chicken, marinated overnight and chargrilled to order.",
    href: "/menu/a-la-carte#grill",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <Hero />
      <Story />
      <Signatures />
      <MenuShowcase />
      <WhatsOnTeaser />
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

function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink text-cream">
      <Image
        src="/images/mezze-spread.jpg"
        alt="A table covered in Lebanese mezze: hommos with lamb and pine nuts, tabbouleh, fattoush, sambousek and fried cauliflower"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={75}
        className="-z-20 object-cover object-center"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/30" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/60 to-transparent" />

      <div className="container-content relative pb-16 pt-[calc(var(--header-height)+5rem)] sm:pb-24">
        <div className="max-w-3xl">
          <p className="eyebrow mb-6 animate-fade-up">Hatch End · North West London</p>
          <h1 className="text-display-xl animate-fade-up [animation-delay:80ms]">
            Authentic Lebanese <em className="font-normal italic text-gold">Cuisine</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-sand animate-fade-up [animation-delay:160ms] sm:text-xl">
            A taste of Lebanon, where flavoursome dishes and warm hospitality create an unforgettable dining experience.
          </p>
          <div className="mt-10 flex flex-col gap-4 animate-fade-up [animation-delay:240ms] sm:flex-row">
            <Button href="/bookings" size="lg">
              Book your table
            </Button>
            <Button href="/menu" variant="secondary" size="lg">
              Explore the menu
            </Button>
          </div>
        </div>

        <dl className="mt-16 grid gap-6 border-t border-cream/15 pt-8 text-sm text-sand animate-fade-up [animation-delay:320ms] sm:grid-cols-3">
          <div className="flex gap-3">
            <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
            <div>
              <dt className="sr-only">Address</dt>
              <dd>
                <a href={site.maps.google} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                  {site.address.full}
                </a>
              </dd>
            </div>
          </div>
          <div className="flex gap-3">
            <Clock className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
            <div>
              <dt className="sr-only">Opening hours</dt>
              {openingHours.map((p) => (
                <dd key={p.label}>{p.label}</dd>
              ))}
            </div>
          </div>
          <div className="flex items-start gap-3 sm:justify-end">
            <dt className="sr-only">Status</dt>
            <dd>
              <OpenStatus />
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function Story() {
  return (
    <Section tone="ink" pattern>
      <div className="container-content grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <Reveal className="relative">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] sm:aspect-[4/5]">
            <Image
              src="/images/dinner-for-two.jpg"
              alt="Dinner for two at Zufa: grilled lamb, salmon and prawns with a glass of red and white wine"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden rounded-2xl border border-gold/25 bg-ink/90 px-6 py-5 backdrop-blur-md sm:block lg:-right-10">
            <p className="font-display text-5xl text-gold">1990</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-sand">Est. Tannourine, Lebanon</p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <SectionHeading
            eyebrow="Our story"
            title={
              <>
                Our story begins in Tannourine, a village in the mountains of <em className="italic text-gold">North Lebanon</em>
              </>
            }
            description={
              <>
                <p>
                  Our parents opened the family restaurant in 1990 and it remains one of the most loved restaurants in North Lebanon. The story
                  continued in London when my brother and I pursued our passion for Lebanese food.
                </p>
                <p className="mt-4">
                  For years we have offered our valued guests a mouth-watering selection of Lebanese dishes, all made from scratch using fresh,
                  top-quality ingredients.
                </p>
              </>
            }
          />
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

function Signatures() {
  return (
    <Section tone="charcoal">
      <div className="container-content">
        <Reveal>
          <SectionHeading
            eyebrow="Zufa specialities"
            title="Three things you must not miss"
            description="At Zufa we preserve tradition — the freshest Lebanese dishes, made from locally sourced ingredients and an essential blend of Lebanese herbs and spices."
            align="center"
          />
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {signatures.map((item, index) => (
            <Reveal key={item.title} delay={index * 100}>
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-3xl border border-cream/10 bg-ink/60 p-8 transition-[border-color,transform,box-shadow] duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-glow"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-full border border-gold/30 text-gold">
                  <item.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-6 font-display text-3xl">{item.title}</h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-sand">{item.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                  See the dishes <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

function MenuShowcase() {
  return (
    <Section tone="cream" pattern>
      <div className="container-content">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            light
            eyebrow="Our menus"
            title="From mezze to midnight cocktails"
            description="Every menu is online in full, with prices and allergen information — no PDFs to squint at."
          />
          <Button href="/menu" variant="light" className="shrink-0">
            All menus
          </Button>
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {menus.map((menu, index) => (
            <Reveal key={menu.slug} as="li" delay={index * 80}>
              <Link
                href={`/menu/${menu.slug}`}
                className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-3xl bg-ink text-cream shadow-card"
              >
                <Image
                  src={menu.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-105"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink from-20% via-ink/80 via-55% to-ink/20" />
                <div className="relative p-7">
                  <h3 className="font-display text-3xl">{menu.shortTitle}</h3>
                  <p className="mt-1 text-sm text-sand line-clamp-2">{menu.availability ?? menu.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                    View menu <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function WhatsOnTeaser() {
  const highlights = offers.slice(0, 3);
  return (
    <Section tone="ink">
      <div className="container-content">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="What’s on" title="Good reasons to come back" description="Corkage-free Mondays, two-for-one cocktails and a weekday lunch that keeps Hatch End well fed." />
          <Button href="/whats-on" variant="secondary" className="shrink-0">
            Everything on
          </Button>
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-cream/10 bg-cream/10 md:grid-cols-3">
          {highlights.map((offer, index) => (
            <Reveal key={offer.id} delay={index * 100} className="flex flex-col bg-ink p-8">
              <p className="eyebrow">{offer.when}</p>
              <h3 className="mt-4 font-display text-3xl">{offer.headline}</h3>
              <p className="mt-3 flex-1 text-base leading-relaxed text-sand">{offer.description}</p>
              <Button href={offer.cta.href} variant="ghost" className="mt-6 justify-start gap-3">
                {offer.cta.label} <ArrowRight className="size-4" aria-hidden />
              </Button>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

function PressQuote() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-24 text-cream sm:py-32">
      <Image
        src="/images/feast-table.jpg"
        alt=""
        fill
        sizes="100vw"
        quality={60}
        className="-z-20 object-cover opacity-30"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/70 to-ink" />
      <div className="container-content">
        <Reveal as="figure" className="mx-auto max-w-4xl text-center">
          <blockquote>
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

function EventsPanels() {
  const panels = [
    {
      eyebrow: "Catering",
      title: "We bring Zufa to the heart of your party",
      text: `Weddings, birthdays, board lunches and family gatherings across ${site.cateringAreas.slice(0, 3).join(", ")} and beyond. Our team brings the expertise and the equipment.`,
      href: "/catering",
      cta: "Catering enquiries",
      image: "/images/sharing-table.jpg",
      alt: "A generous sharing table of Lebanese dishes prepared by Zufa",
    },
    {
      eyebrow: "Private hire",
      title: "Looking for a place to celebrate?",
      text: `Book the whole restaurant for up to ${site.capacity.seated} seated or ${site.capacity.standing} standing guests — engagements, baby showers, hen and stag nights and company get-togethers.`,
      href: "/private-hire",
      cta: "Plan your event",
      image: "/images/restaurant-interior.jpg",
      alt: "The dining room at Zufa Hatch End with its glass-leaf chandelier and patio doors",
    },
  ] as const;

  return (
    <Section tone="charcoal" padded={false}>
      <div className="grid lg:grid-cols-2">
        {panels.map((panel, index) => (
          <Reveal key={panel.href} delay={index * 120} className="group relative isolate flex min-h-[32rem] flex-col justify-end overflow-hidden p-8 sm:p-12 lg:min-h-[40rem]">
            <Image
              src={panel.image}
              alt={panel.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="-z-20 object-cover transition-transform duration-1000 ease-(--ease-out-expo) group-hover:scale-105"
            />
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink from-25% via-ink/80 via-60% to-ink/30" />
            <p className="eyebrow">{panel.eyebrow}</p>
            <h3 className="mt-4 max-w-md text-display-md">{panel.title}</h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-sand">{panel.text}</p>
            <div className="mt-8">
              <Button href={panel.href}>{panel.cta}</Button>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Takeaway() {
  return (
    <Section tone="cream">
      <div className="container-content flex flex-col items-center gap-10 text-center">
        <Reveal>
          <SectionHeading
            light
            align="center"
            eyebrow="Takeaway & delivery"
            title="Zufa at home"
            description="Order for collection or have it delivered across Hatch End, Pinner and Harrow. Enjoy 20% off your first online order."
          />
        </Reveal>
        <Reveal delay={100} className="flex flex-wrap items-center justify-center gap-4">
          {site.delivery.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Order Zufa on ${partner.name} (opens in a new tab)`}
              className="inline-flex h-16 items-center gap-3 rounded-2xl border border-ink/10 bg-white pr-6 pl-3 text-ink transition-[border-color,transform] hover:-translate-y-0.5 hover:border-ink/30"
            >
              <Image src={partner.logo} alt="" width={96} height={128} className="h-11 w-auto object-contain" />
              <span className="text-sm font-semibold">{partner.name}</span>
            </a>
          ))}
        </Reveal>
        <Reveal delay={200}>
          <Button href="/takeaway" variant="light">
            Takeaway options
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}

function Faqs() {
  return (
    <Section tone="parchment">
      <div className="container-content grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <Reveal>
          <SectionHeading light eyebrow="Good to know" title="Questions, answered" description="Everything first-time guests tend to ask before they visit." />
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
