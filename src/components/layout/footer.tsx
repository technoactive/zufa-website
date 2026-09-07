import Link from "next/link";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { InstagramIcon as Instagram } from "@/components/ui/icons";
import { navigation, openingHours, site } from "@/content/site";
import { Logo } from "./logo";
import { OpenStatus } from "./open-status";

// Deterministic at build time so the prerendered shell never depends on Date.now().
const COPYRIGHT_YEAR = 2026;

export function Footer() {
  return (
    <footer className="relative border-t border-gold/15 bg-ink text-cream">
      <div className="hairline absolute inset-x-0 top-0" aria-hidden />
      <div className="container-content grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10 lg:py-20">
        <div className="space-y-6">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-sand">
            Family-run Lebanese restaurant in Hatch End, serving mezze, charcoal grills and warm Lebanese hospitality since 1990.
          </p>
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-cream/80 transition-colors hover:text-gold"
          >
            <Instagram className="size-4" aria-hidden />
            {site.social.instagramHandle}
          </a>
        </div>

        <nav aria-label="Footer" className="space-y-4">
          <h2 className="eyebrow">Explore</h2>
          <ul className="space-y-2.5 text-sm">
            {[...navigation.primary, ...navigation.secondary].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-cream/80 transition-colors hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-4">
          <h2 className="eyebrow">Opening hours</h2>
          <ul className="space-y-2.5 text-sm text-cream/80">
            {openingHours.map((period) => (
              <li key={period.label}>{period.label}</li>
            ))}
          </ul>
          <OpenStatus />
        </div>

        <address className="space-y-4 text-sm not-italic">
          <h2 className="eyebrow">Find us</h2>
          <ul className="space-y-3 text-cream/80">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
              <a href={site.maps.google} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">
                {site.address.street}
                <br />
                {site.address.locality}, {site.address.postalCode}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
              <a href={`tel:${site.phone.e164}`} className="transition-colors hover:text-gold">
                {site.phone.display}
              </a>
            </li>
            <li className="flex gap-3">
              <MessageCircle className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
              <a href={site.whatsapp.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">
                WhatsApp {site.whatsapp.display}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-gold">
                {site.email}
              </a>
            </li>
          </ul>
        </address>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-content flex flex-col gap-3 py-6 text-xs text-smoke sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {COPYRIGHT_YEAR} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {navigation.legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="/llms.txt" className="transition-colors hover:text-gold">
                llms.txt
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
