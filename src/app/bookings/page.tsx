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
        eyebrow="Reservations"
        title={
          <>
            Book your <em className="italic text-gold">table</em>
          </>
        }
        description={`Reserve online in seconds for up to ${site.reservations.maxOnlinePartySize} guests. For larger tables, celebrations or events of more than ${site.reservations.eventPartySize}, call us and we’ll take care of everything.`}
        image={{ src: "/images/restaurant-interior.jpg", alt: "The dining room at Zufa Hatch End" }}
        crumbs={[{ name: "Bookings", path: "/bookings" }]}
      >
        <Button href={`tel:${site.phone.e164}`} variant="secondary" size="lg">
          <Phone className="size-4" aria-hidden /> {site.phone.display}
        </Button>
        <Button href={site.whatsapp.url} variant="ghost" size="lg">
          <MessageCircle className="size-4" aria-hidden /> WhatsApp us
        </Button>
      </PageHero>

      <Section tone="cream" className="pt-12 sm:pt-16">
        <div className="container-content grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <Reveal className="space-y-8">
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
              Celebrating something? Let us know in your booking notes and we’ll make the evening special.{" "}
              <Link href="/whats-on#belly-dancing" className="text-gold-dark underline underline-offset-4">
                Belly dancing shows
              </Link>{" "}
              run on selected evenings — ask when you book. Deciding what to eat? Have a look at the{" "}
              <Link href="/menu/a-la-carte" className="text-gold-dark underline underline-offset-4">
                à la carte
              </Link>{" "}
              or, for groups, the{" "}
              <Link href="/menu/set-menus" className="text-gold-dark underline underline-offset-4">
                set menus
              </Link>
              . Mondays are{" "}
              <Link href="/whats-on#byo-monday" className="text-gold-dark underline underline-offset-4">
                corkage-free
              </Link>
              , so bring a bottle.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ReservationWidget />
          </Reveal>
        </div>
      </Section>

      <JsonLd data={webPageSchema({ path: "/bookings", title: page.title, description: page.description, image: page.image })} />
    </>
  );
}
