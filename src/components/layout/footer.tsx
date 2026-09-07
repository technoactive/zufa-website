import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, MessageCircle, ArrowUpRight, ArrowUp } from "lucide-react";
import { InstagramIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { lunchService, navigation, openingHours, site } from "@/content/site";
import { Logo } from "./logo";
import { OpenStatus } from "./open-status";

// Deterministic at build time so the prerendered shell never depends on Date.now().
const COPYRIGHT_YEAR = 2026;

const marqueeItems = [
  "Home-made saj bread",
  "Sizzling hot mezze",
  "Charcoal grill",
  "Lebanese wines",
  "Signature cocktails",
  `Family-run since ${site.foundingYear}`,
  "Hatch End, London",
];

const gallery = [
  { src: "/images/mezze-spread.jpg", alt: "" },
  { src: "/images/warak-enab.jpg", alt: "" },
  { src: "/images/dinner-for-two.jpg", alt: "" },
  { src: "/images/feast-table.jpg", alt: "" },
  { src: "/images/sharing-table.jpg", alt: "" },
  { src: "/images/dishes-detail.webp", alt: "" },
];

const allLinks = [...navigation.primary, ...navigation.secondary];

const contactRow = "group flex items-start gap-3 text-sm leading-relaxed text-sand transition-colors duration-300 hover:text-cream";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#090806] text-cream">
      {/* ---- Decorative layers ---- */}
      <div className="hairline absolute inset-x-0 top-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[url('/brand/arabesque-tile.png')] bg-[length:148px_148px] opacity-[0.04]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 hidden size-[34rem] opacity-[0.035] lg:block"
        aria-hidden
      >
        <Image src="/brand/zufa-mark-white.png" alt="" width={535} height={500} className="size-full object-contain" />
      </div>
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[70rem] -translate-x-1/2 rounded-full bg-gold/[0.07] blur-3xl" aria-hidden />

      {/* ---- Marquee ---- */}
      <div className="relative border-b border-cream/[0.08] py-5">
        <p className="sr-only">{marqueeItems.join(". ")}.</p>
        <div className="flex w-max animate-marquee gap-10 pr-10" aria-hidden>
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={`${item}-${index}`} className="flex shrink-0 items-center gap-10">
              <span className="font-display text-2xl italic text-cream/85 sm:text-[1.75rem]">{item}</span>
              <span className="size-1.5 rotate-45 bg-gold" />
            </span>
          ))}
        </div>
      </div>

      <div className="container-content relative">
        {/* ---- Brand statement + gallery ---- */}
        <div className="grid gap-12 border-b border-cream/[0.08] py-16 lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-24">
          <div className="lg:col-span-6">
            <Logo className="[&_img]:h-14 sm:[&_img]:h-16" />
            <p className="mt-8 max-w-md font-display text-[2rem] leading-[1.1] text-cream sm:text-[2.5rem]">
              A taste of Tannourine, <em className="italic text-gold">served with love</em> in Hatch End.
            </p>
            <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-sand">
              Our parents opened the family restaurant in the mountains of North Lebanon in {site.foundingYear}. Today two brothers carry the same
              recipes, the same saj griddle and the same welcome to North West London.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="/bookings">Book a table</Button>
              <Button href="/our-story" variant="secondary">
                Our story
              </Button>
            </div>
          </div>

          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow Zufa on Instagram, ${site.social.instagramHandle} (opens in a new tab)`}
            className="group relative block lg:col-span-6"
          >
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {gallery.map((photo) => (
                <div key={photo.src} className="relative aspect-square overflow-hidden rounded-lg sm:rounded-xl">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 190px, 33vw"
                    className="object-cover transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-ink/20 transition-colors duration-500 group-hover:bg-ink/5" aria-hidden />
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
              <span className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-ink/70 px-5 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-cream backdrop-blur-md transition-all duration-500 group-hover:border-gold/60 group-hover:text-gold">
                <InstagramIcon className="size-4" />
                {site.social.instagramHandle}
                <ArrowUpRight className="size-3.5" />
              </span>
            </div>
          </a>
        </div>

        {/* ---- Directory ---- */}
        <div className="grid gap-12 border-b border-cream/[0.08] py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-16">
          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="eyebrow text-[0.6875rem]">Explore</h2>
            <ol className="mt-6 space-y-3">
              {allLinks.map((item, index) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-baseline gap-3 text-[0.9375rem] text-sand transition-colors duration-300 hover:text-cream"
                  >
                    <span className="w-5 text-[0.625rem] font-semibold tracking-[0.2em] text-gold/50 transition-colors group-hover:text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="eyebrow text-[0.6875rem]">Visit</h2>
            <address className="mt-6 space-y-4 not-italic">
              <a href={site.maps.google} target="_blank" rel="noopener noreferrer" className={contactRow}>
                <MapPin className="mt-1 size-4 shrink-0 text-gold" aria-hidden />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.locality}, London
                  <br />
                  {site.address.postalCode}
                </span>
              </a>
              <a href={`tel:${site.phone.e164}`} className={contactRow}>
                <Phone className="mt-1 size-4 shrink-0 text-gold" aria-hidden />
                <span>{site.phone.display}</span>
              </a>
              <a href={site.whatsapp.url} target="_blank" rel="noopener noreferrer" className={contactRow}>
                <MessageCircle className="mt-1 size-4 shrink-0 text-gold" aria-hidden />
                <span>WhatsApp {site.whatsapp.display}</span>
              </a>
              <a href={`mailto:${site.email}`} className={contactRow}>
                <Mail className="mt-1 size-4 shrink-0 text-gold" aria-hidden />
                <span>{site.email}</span>
              </a>
            </address>
            <a
              href={site.maps.google}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:text-cream"
            >
              Get directions <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          </div>

          <div className="lg:col-span-3">
            <h2 className="eyebrow text-[0.6875rem]">Hours</h2>
            <dl className="mt-6 space-y-4">
              {openingHours.map((period) => {
                const [days, hours] = period.label.split(": ");
                return (
                  <div key={period.label}>
                    <dt className="text-[0.9375rem] text-cream">{days}</dt>
                    <dd className="mt-0.5 text-sm text-sand">{hours}</dd>
                  </div>
                );
              })}
              <div>
                <dt className="text-[0.9375rem] text-cream">Lunch menu</dt>
                <dd className="mt-0.5 text-sm text-sand">{lunchService.label}</dd>
              </div>
            </dl>
            <OpenStatus className="mt-6" />
          </div>

          <div className="lg:col-span-3">
            <h2 className="eyebrow text-[0.6875rem]">Zufa at home</h2>
            <p className="mt-6 text-sm leading-relaxed text-sand">
              Collection and delivery across Hatch End, Pinner and Harrow. 20% off your first online order.
            </p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {site.delivery.map((partner) => (
                <li key={partner.name}>
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Order Zufa on ${partner.name} (opens in a new tab)`}
                    className="group flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-cream/10 bg-cream/[0.04] transition-colors duration-300 hover:border-gold/50 hover:bg-cream/[0.08]"
                  >
                    <Image
                      src={partner.logo}
                      alt=""
                      width={56}
                      height={75}
                      className="h-10 w-auto opacity-90 transition-opacity group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
            <Link
              href="/takeaway"
              className="mt-6 inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:text-cream"
            >
              All takeaway options <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
          </div>
        </div>

        {/* ---- Press ---- */}
        <div className="flex flex-col gap-5 border-b border-cream/[0.08] py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <span className="mt-1 flex shrink-0 gap-0.5 text-gold" aria-label="Five stars">
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index} aria-hidden className="text-[0.625rem]">
                  ★
                </span>
              ))}
            </span>
            <p className="max-w-2xl font-display text-lg leading-snug text-cream/90 sm:text-xl">
              “…top-quality ingredients, a large choice of authentic, appetising dishes, and Lebanese hospitality at its finest.”
              <span className="mt-1 block font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-sand">{site.press.source}</span>
            </p>
          </div>
          <a
            href={site.press.articlePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:text-cream"
          >
            Read the review <ArrowUpRight className="size-3.5" aria-hidden />
          </a>
        </div>

        {/* ---- Legal ---- */}
        <div className="flex flex-col gap-4 py-7 text-xs text-smoke sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {COPYRIGHT_YEAR} {site.legalName}. Est. {site.foundingYear}, Tannourine — Hatch End.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {navigation.legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="/llms.txt" className="transition-colors hover:text-cream">
                llms.txt
              </a>
            </li>
            <li>
              <a
                href="#top"
                className="inline-flex size-9 items-center justify-center rounded-full border border-cream/12 text-cream/70 transition-colors hover:border-gold/60 hover:text-gold"
                aria-label="Back to top"
              >
                <ArrowUp className="size-3.5" aria-hidden />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
