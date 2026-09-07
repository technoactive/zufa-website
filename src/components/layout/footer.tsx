import Link from "next/link";
import { MapPin, Phone, Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { lunchService, navigation, openingHours, site } from "@/content/site";
import { Logo } from "./logo";
import { OpenStatus } from "./open-status";

// Deterministic at build time so the prerendered shell never depends on Date.now().
const COPYRIGHT_YEAR = 2026;

const footerLinkClass =
  "group inline-flex items-center gap-2 text-sm text-sand transition-colors duration-300 hover:text-cream before:h-px before:w-0 before:bg-gold before:transition-[width] before:duration-300 hover:before:w-3";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#090806] text-cream">
      {/* Decorative layers */}
      <div className="hairline absolute inset-x-0 top-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[url('/brand/arabesque-tile.png')] bg-[length:148px_148px] opacity-[0.04]"
        aria-hidden
      />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-gold/[0.06] blur-3xl" aria-hidden />

      <div className="container-content relative">
        {/* ---- Upper: brand statement + directory ---- */}
        <div className="grid gap-14 py-16 lg:grid-cols-12 lg:gap-10 lg:py-24">
          <div className="lg:col-span-5">
            <Logo className="[&_img]:h-14 sm:[&_img]:h-16" />
            <p className="mt-8 max-w-sm font-display text-3xl leading-tight text-cream sm:text-[2.25rem]">
              Lebanese hospitality <em className="italic text-gold">at its finest</em>, in the heart of Hatch End.
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-sand">
              Family-run since {site.foundingYear}. Fresh mezze, charcoal grills and home-made saj bread, served the way our parents taught us in Tannourine.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/bookings" size="sm">
                Book a table
              </Button>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-cream/12 px-4 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-cream/80 transition-colors hover:border-gold/60 hover:text-gold"
              >
                <InstagramIcon className="size-4" />
                Instagram
              </a>
            </div>
          </div>

          <div className="grid gap-12 sm:grid-cols-3 lg:col-span-7 lg:gap-8">
            <nav aria-label="Footer">
              <h2 className="eyebrow text-[0.6875rem]">Explore</h2>
              <ul className="mt-6 space-y-3">
                {[...navigation.primary, ...navigation.secondary].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={footerLinkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="eyebrow text-[0.6875rem]">Visit</h2>
              <address className="mt-6 space-y-4 text-sm not-italic text-sand">
                <a
                  href={site.maps.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-3 leading-relaxed transition-colors hover:text-cream"
                >
                  <MapPin className="mt-1 size-4 shrink-0 text-gold" aria-hidden />
                  <span>
                    {site.address.street}
                    <br />
                    {site.address.locality}, London
                    <br />
                    {site.address.postalCode}
                  </span>
                </a>
                <a href={`tel:${site.phone.e164}`} className="flex items-center gap-3 transition-colors hover:text-cream">
                  <Phone className="size-4 shrink-0 text-gold" aria-hidden />
                  {site.phone.display}
                </a>
                <a href={site.whatsapp.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-cream">
                  <MessageCircle className="size-4 shrink-0 text-gold" aria-hidden />
                  WhatsApp {site.whatsapp.display}
                </a>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 transition-colors hover:text-cream">
                  <Mail className="size-4 shrink-0 text-gold" aria-hidden />
                  {site.email}
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

            <div>
              <h2 className="eyebrow text-[0.6875rem]">Hours</h2>
              <dl className="mt-6 space-y-4 text-sm">
                {openingHours.map((period) => {
                  const [days, hours] = period.label.split(": ");
                  return (
                    <div key={period.label}>
                      <dt className="text-cream">{days}</dt>
                      <dd className="mt-0.5 text-sand">{hours}</dd>
                    </div>
                  );
                })}
                <div>
                  <dt className="text-cream">Lunch menu</dt>
                  <dd className="mt-0.5 text-sand">{lunchService.label}</dd>
                </div>
              </dl>
              <OpenStatus className="mt-6" />
            </div>
          </div>
        </div>

        {/* ---- Lower: legal strip ---- */}
        <div className="flex flex-col gap-4 border-t border-cream/10 py-7 text-xs text-smoke sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {COPYRIGHT_YEAR} {site.legalName}. All rights reserved.
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
              <a href="#top" className="inline-flex items-center gap-1.5 text-cream/70 transition-colors hover:text-gold">
                Back to top <ArrowUpRight className="size-3 -rotate-45" aria-hidden />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
