import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Users, Clock, MapPin, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/blocks/page-hero";
import { ReservationWidget } from "@/components/blocks/reservation-widget";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";
import { getPage } from "@/content/pages";
import { openingHours, site } from "@/content/site";

export const metadata: Metadata = pageMetadata("/bookings");
const page = getPage("/bookings")!;

export default function BookingsPage() {
  return (
    <>
      <PageHero
        compact
        className="max-sm:pb-5 [&_[aria-label='Breadcrumb']]:max-sm:hidden [&_.eyebrow]:max-sm:hidden"
        eyebrow="Reservations"
        title={
          <>
            Book your <em className="italic text-gold">table</em>
          </>
        }
        description={
          <>
            <span className="sm:hidden">Pick a date below — up to {site.reservations.maxOnlinePartySize} guests online.</span>
            <span className="hidden sm:inline">
              Reserve online in seconds for up to {site.reservations.maxOnlinePartySize} guests. For larger tables, celebrations or
              events of more than {site.reservations.eventPartySize}, call us and we’ll take care of everything.
            </span>
          </>
        }
        image={{ src: "/images/restaurant-interior.jpg", alt: "The dining room at Zufa Hatch End" }}
        crumbs={[{ name: "Bookings", path: "/bookings" }]}
      >
        <Button href={`tel:${site.phone.e164}`} variant="secondary" size="lg">
          <Phone className="size-4" aria-hidden /> {site.phone.display}
        </Button>
        <Button href={site.whatsapp.url} variant="ghost" size="lg" className="max-sm:hidden">
          <MessageCircle className="size-4" aria-hidden /> WhatsApp us
        </Button>
      </PageHero>

      <Section tone="cream" className="pt-8 pb-16 sm:pt-10 sm:pb-24 lg:pt-16 lg:pb-32">
        <div className="container-content grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <Reveal className="order-2 space-y-8 lg:order-1">
            <SectionHeading light eyebrow="Zufa Hatch End" title="Good to know before you book" />
            <ul className="space-y-6 text-sm text-ink/75">
              <li className="flex gap-4">
                <Users className="mt-0.5 size-5 shrink-0 text-gold-dark" aria-hidden />
                <div>
                  <p className="font-semibold text-ink">Groups</p>
                  <p className="mt-1 leading-relaxed">
                    Online bookings are for up to {site.reservations.maxOnlinePartySize} guests. For larger parties please call{" "}
                    <a href={`tel:${site.phone.e164}`} className="text-gold-dark underline underline-offset-4">
                      {site.phone.display}
                    </a>
                    . Events for more than {site.reservations.eventPartySize} can be arranged through{" "}
                    <Link href="/private-hire" className="text-gold-dark underline underline-offset-4">
                      private hire
                    </Link>
                    .
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <Clock className="mt-0.5 size-5 shrink-0 text-gold-dark" aria-hidden />
                <div>
                  <p className="font-semibold text-ink">Opening times</p>
                  <ul className="mt-1 leading-relaxed">
                    {openingHours.map((p) => (
                      <li key={p.label}>{p.label}</li>
                    ))}
                  </ul>
                </div>
              </li>
              <li className="flex gap-4">
                <MapPin className="mt-0.5 size-5 shrink-0 text-gold-dark" aria-hidden />
                <div>
                  <p className="font-semibold text-ink">Address</p>
                  <p className="mt-1 leading-relaxed">
                    {site.address.full}.{" "}
                    <a href={site.maps.directions} target="_blank" rel="noopener noreferrer" className="text-gold-dark underline underline-offset-4">
                      Get directions
                    </a>
                  </p>
                </div>
              </li>
            </ul>
            <p className="rounded-2xl border border-ink/10 bg-parchment p-5 text-sm leading-relaxed text-ink/70">
              Celebrating something? Let us know in your booking notes and we’ll make the evening special. Deciding what to eat? Have a look at the{" "}
              <Link href="/menu/a-la-carte" className="text-gold-dark underline underline-offset-4">
                à la carte
              </Link>{" "}
              or, for groups, the{" "}
              <Link href="/menu/set-menus" className="text-gold-dark underline underline-offset-4">
                sharing platters
              </Link>
              . Mondays are{" "}
              <Link href="/whats-on#byo-monday" className="text-gold-dark underline underline-offset-4">
                corkage-free
              </Link>
              , so bring a bottle.
            </p>
          </Reveal>

          <div className="order-1 lg:order-2">
            <ReservationWidget eager />
          </div>
        </div>
      </Section>

      <JsonLd data={webPageSchema({ path: "/bookings", title: page.title, description: page.description, image: page.image })} />
    </>
  );
}
