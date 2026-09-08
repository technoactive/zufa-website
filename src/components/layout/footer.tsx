import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, MessageCircle, ArrowUpRight, ArrowUp } from "lucide-react";
import { InstagramIcon } from "@/components/ui/icons";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { menus } from "@/content/menus";
import { lunchService, navigation, openingHours, site } from "@/content/site";
import { Logo } from "./logo";
import { OpenStatus } from "./open-status";

// Deterministic at build time so the prerendered shell never depends on Date.now().
const COPYRIGHT_YEAR = 2026;

const allLinks = [...navigation.primary, ...navigation.secondary];

const columnHeading = "text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-gold";
const columnLink = "block text-[0.9375rem] leading-snug text-sand transition-colors duration-300 hover:text-cream";

const socials = [
  { label: "Instagram", href: site.social.instagram, Icon: InstagramIcon, external: true },
  { label: "WhatsApp", href: site.whatsapp.url, Icon: MessageCircle, external: true },
  { label: "Email", href: `mailto:${site.email}`, Icon: Mail, external: false },
  { label: "Call", href: `tel:${site.phone.e164}`, Icon: Phone, external: false },
  { label: "Directions", href: site.maps.google, Icon: MapPin, external: true },
];

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#090806] text-cream">
      <div className="hairline absolute inset-x-0 top-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[url('/brand/arabesque-tile.png')] bg-[length:148px_148px] opacity-[0.035]"
        aria-hidden
      />
      <div className="pointer-events-none absolute -top-48 right-[10%] -z-10 size-[36rem] rounded-full bg-gold/[0.07] blur-3xl" aria-hidden />

      <div className="container-content">
        {/* ---- 1. Stay in touch ---- */}
        <div className="grid gap-10 py-16 lg:grid-cols-12 lg:items-end lg:gap-16 lg:py-24">
          <div className="lg:col-span-7">
            <p className={columnHeading}>Stay at the table</p>
            <h2 className="mt-5 font-display text-[2.5rem] leading-[1.02] font-medium text-cream sm:text-[3.25rem] lg:text-[3.375rem]">
              Good food is better <em className="italic text-gold">shared.</em>
              <br />
              So is good news.
            </h2>
            <p className="mt-6 max-w-lg text-[0.9375rem] leading-relaxed text-sand">
              Seasonal set menus, belly dancing nights, corkage-free Mondays and the occasional recipe from Tannourine — once or twice a
              month, never more.
            </p>
          </div>
          <div className="lg:col-span-5">
            <NewsletterForm />
          </div>
        </div>

        <div className="h-px bg-cream/[0.08]" aria-hidden />

        {/* ---- 2. Directory ---- */}
        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
          <div className="lg:col-span-4">
            <Logo className="[&_img]:h-14 sm:[&_img]:h-16" />
            <p className="mt-7 max-w-xs text-[0.9375rem] leading-relaxed text-sand">
              Family-run Lebanese restaurant in Hatch End, North West London. Mezze, charcoal grills and home-made saj bread since{" "}
              {site.foundingYear}.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {socials.map(({ label, href, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={external ? `${label} (opens in a new tab)` : label}
                    title={label}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-cream/15 text-cream/80 transition-[border-color,color,background-color] duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold"
                  >
                    <Icon className="size-[1.05rem]" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-4">
              <span className="text-gold" aria-label="Five stars">
                {"★★★★★"}
              </span>
              <a
                href={site.press.articlePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-sand transition-colors hover:text-cream"
              >
                Reviewed by the <span className="text-cream">{site.press.source}</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8 lg:gap-8">
            <nav aria-label="Footer">
              <h2 className={columnHeading}>Explore</h2>
              <ul className="mt-6 space-y-3">
                {allLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={columnLink}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Menus">
              <h2 className={columnHeading}>Menus</h2>
              <ul className="mt-6 space-y-3">
                {menus.map((menu) => (
                  <li key={menu.slug}>
                    <Link href={`/menu/${menu.slug}`} className={columnLink}>
                      {menu.shortTitle}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/takeaway" className={columnLink}>
                    Takeaway &amp; delivery
                  </Link>
                </li>
              </ul>
            </nav>

            <div>
              <h2 className={columnHeading}>Visit</h2>
              <address className="mt-6 space-y-5 text-[0.9375rem] leading-snug not-italic">
                <a href={site.maps.google} target="_blank" rel="noopener noreferrer" className="block text-sand transition-colors hover:text-cream">
                  {site.address.street}
                  <br />
                  {site.address.locality}, London
                  <br />
                  {site.address.postalCode}
                </a>
                <div className="space-y-2">
                  <a href={`tel:${site.phone.e164}`} className={columnLink}>
                    {site.phone.display}
                  </a>
                  <a href={`mailto:${site.email}`} className={columnLink}>
                    {site.email}
                  </a>
                </div>
              </address>
              <a
                href={site.maps.google}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:text-cream"
              >
                Directions <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            </div>

            <div>
              <h2 className={columnHeading}>Hours</h2>
              <dl className="mt-6 space-y-4 text-[0.9375rem] leading-snug">
                {openingHours.map((period) => {
                  const [days, hours] = period.label.split(": ");
                  return (
                    <div key={period.label}>
                      <dt className="text-cream">{days}</dt>
                      <dd className="mt-1 text-sand">{hours}</dd>
                    </div>
                  );
                })}
                <div>
                  <dt className="text-cream">Lunch menu</dt>
                  <dd className="mt-1 text-sand">{lunchService.label}</dd>
                </div>
              </dl>
              <OpenStatus className="mt-6" />
            </div>
          </div>
        </div>

        <div className="h-px bg-cream/[0.08]" aria-hidden />

        {/* ---- 3. Partners ---- */}
        <div className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-sand">
            Order Zufa at home —{" "}
            <Link href="/takeaway" className="text-cream underline-offset-4 transition-colors hover:text-gold hover:underline">
              20% off your first online order
            </Link>
          </p>
          <ul className="flex items-center gap-3">
            {site.delivery.map((partner) => (
              <li key={partner.name}>
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Order Zufa on ${partner.name} (opens in a new tab)`}
                  className="group flex h-12 items-center gap-2.5 rounded-full border border-cream/12 bg-cream/[0.03] pl-1.5 pr-4 transition-colors duration-300 hover:border-gold/50 hover:bg-cream/[0.07]"
                >
                  <span className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-cream/[0.06]">
                    <Image src={partner.logo} alt="" width={36} height={48} className="h-7 w-auto" />
                  </span>
                  <span className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-cream/80 transition-colors group-hover:text-cream">
                    {partner.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ---- 4. Wordmark ---- */}
      <div className="pointer-events-none relative select-none overflow-hidden" aria-hidden>
        <p className="container-content -mb-[0.16em] translate-y-[0.06em] text-center font-display text-[clamp(7rem,21vw,19rem)] leading-none font-semibold uppercase tracking-[0.06em] text-transparent bg-gradient-to-b from-cream/[0.14] via-cream/[0.05] via-70% to-transparent bg-clip-text">
          Zufa
        </p>
      </div>

      {/* ---- 5. Legal ---- */}
      <div className="relative border-t border-cream/[0.08] bg-[#090806]">
        <div className="container-content flex flex-col gap-4 py-6 text-xs text-smoke sm:flex-row sm:items-center sm:justify-between">
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
              <a
                href="#top"
                aria-label="Back to top"
                className="inline-flex size-9 items-center justify-center rounded-full border border-cream/12 text-cream/70 transition-colors hover:border-gold/60 hover:text-gold"
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
