import type { Metadata } from "next";
import { MapPin, Phone, Mail, MessageCircle, Clock, Train, Car, CalendarCheck, UtensilsCrossed, Leaf, Building2 } from "lucide-react";
import Link from "next/link";
import { InstagramIcon as Instagram } from "@/components/ui/icons";
import { PageHero } from "@/components/blocks/page-hero";
import { FaqList } from "@/components/blocks/faq-list";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { OpenStatus } from "@/components/layout/open-status";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";
import { getPage } from "@/content/pages";
import { generalFaqs } from "@/content/faqs";
import { breakfastService, lunchService, openingHours, site } from "@/content/site";

export const metadata: Metadata = pageMetadata("/contact");
const page = getPage("/contact")!;

export default function ContactPage() {
  return (
    <>
      <PageHero
        compact
        className="max-sm:pb-8 [&_[aria-label='Breadcrumb']]:max-sm:hidden [&_.eyebrow]:max-sm:hidden"
        eyebrow="Contact"
        title={
          <>
            Find us in <em className="italic text-gold">Hatch End</em>
          </>
        }
        description={
          <>
            <span className="lg:hidden">Call, WhatsApp, or send us a message below.</span>
            <span className="hidden lg:inline">
              We’re on the Uxbridge Road, a short walk from Hatch End station. Call, WhatsApp or email — or simply come and say hello. For table
              bookings, our online booking page is fastest.
            </span>
          </>
        }
        image={{ src: "/images/restaurant-interior.jpg", alt: "The dining room at Zufa Hatch End" }}
        crumbs={[{ name: "Contact", path: "/contact" }]}
        aside={
          <div id="enquire" className="scroll-mt-24 rounded-3xl border border-ink/10 bg-parchment p-6 text-ink shadow-card sm:p-8">
            <h2 className="font-display text-2xl text-ink sm:text-3xl">Send us a message</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/70 sm:text-base">
              Questions, feedback or something special? For table bookings, please{" "}
              <Link href="/bookings" className="text-gold-dark underline underline-offset-4">
                book online
              </Link>{" "}
              or call — it’s faster.
            </p>
            <EnquiryForm topic="general" event={false} className="mt-6" />
          </div>
        }
      >
        <Button href="/bookings" size="lg">
          Book a table
        </Button>
        <Button href={`tel:${site.phone.e164}`} variant="secondary" size="lg">
          <Phone className="size-4" aria-hidden /> {site.phone.display}
        </Button>
      </PageHero>

      <Section tone="cream" pattern className="pt-12 sm:pt-16">
        <div className="container-content grid gap-8 lg:grid-cols-3">
          <Reveal className="rounded-3xl border border-ink/10 bg-parchment p-8 shadow-card">
            <h2 className="eyebrow text-gold-dark">Zufa Hatch End</h2>
            <address className="mt-6 space-y-5 text-base not-italic text-ink/80">
              <p className="flex gap-3">
                <MapPin className="mt-1 size-5 shrink-0 text-gold-dark" aria-hidden />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.locality}, {site.address.region}
                  <br />
                  {site.address.postalCode}
                </span>
              </p>
              <p className="flex gap-3">
                <Phone className="mt-1 size-5 shrink-0 text-gold-dark" aria-hidden />
                <a href={`tel:${site.phone.e164}`} className="hover:text-gold-dark">
                  {site.phone.display}
                </a>
              </p>
              <p className="flex gap-3">
                <MessageCircle className="mt-1 size-5 shrink-0 text-gold-dark" aria-hidden />
                <a href={site.whatsapp.url} target="_blank" rel="noopener noreferrer" className="hover:text-gold-dark">
                  WhatsApp {site.whatsapp.display}
                </a>
              </p>
              <p className="flex gap-3">
                <Mail className="mt-1 size-5 shrink-0 text-gold-dark" aria-hidden />
                <a href={`mailto:${site.email}`} className="hover:text-gold-dark">
                  {site.email}
                </a>
              </p>
              <p className="flex gap-3">
                <Instagram className="mt-1 size-5 shrink-0 text-gold-dark" aria-hidden />
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold-dark">
                  {site.social.instagramHandle}
                </a>
              </p>
            </address>
          </Reveal>

          <Reveal delay={80} className="rounded-3xl border border-ink/10 bg-parchment p-8 shadow-card">
            <h2 className="eyebrow text-gold-dark">Opening times</h2>
            <ul className="mt-6 space-y-3 text-base text-ink/80">
              {openingHours.map((period) => (
                <li key={period.label} className="flex gap-3">
                  <Clock className="mt-1 size-5 shrink-0 text-gold-dark" aria-hidden />
                  <span>{period.label}</span>
                </li>
              ))}
              <li className="flex gap-3 border-t border-ink/10 pt-3 text-sm text-ink/65">
                <span className="w-5 shrink-0" aria-hidden />
                <span>Breakfast: {breakfastService.label}</span>
              </li>
              <li className="flex gap-3 text-sm text-ink/65">
                <span className="w-5 shrink-0" aria-hidden />
                <span>Lunch menu: {lunchService.label}</span>
              </li>
            </ul>
            <div className="mt-6 [&_span]:text-ink [&_.text-sand]:text-ink/60">
              <OpenStatus />
            </div>
          </Reveal>

          <Reveal delay={120} className="rounded-3xl border border-ink/10 bg-parchment p-8 shadow-card">
            <h2 className="eyebrow text-gold-dark">Getting here</h2>
            <ul className="mt-6 space-y-5 text-base text-ink/80">
              <li className="flex gap-3">
                <Train className="mt-1 size-5 shrink-0 text-gold-dark" aria-hidden />
                <span>Hatch End station (London Overground) is a few minutes’ walk. Local buses stop on the Uxbridge Road.</span>
              </li>
              <li className="flex gap-3">
                <Car className="mt-1 size-5 shrink-0 text-gold-dark" aria-hidden />
                <span>Plenty of local parking on and around the Uxbridge Road.</span>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={site.maps.google} target="_blank" rel="noopener noreferrer" className="text-sm text-gold-dark underline underline-offset-4 hover:text-ink">
                Google Maps
              </a>
              <a href={site.maps.apple} target="_blank" rel="noopener noreferrer" className="text-sm text-gold-dark underline underline-offset-4 hover:text-ink">
                Apple Maps
              </a>
            </div>
          </Reveal>
        </div>

        <div className="container-content mt-8">
          <Reveal>
            <a
              href={site.maps.google}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Zufa on Google Maps"
              className="group relative block overflow-hidden rounded-3xl border border-ink/10 bg-parchment shadow-card"
            >
              <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center sm:py-20">
                <span className="inline-flex size-14 items-center justify-center rounded-full bg-ink text-gold transition-transform group-hover:scale-110">
                  <MapPin className="size-6" aria-hidden />
                </span>
                <p className="font-display text-3xl text-ink">{site.address.full}</p>
                <p className="text-sm text-ink/60">Tap to open in Google Maps — no tracking scripts loaded on this page.</p>
              </div>
            </a>
          </Reveal>
        </div>

        <div className="container-content mt-16">
          <Reveal>
            <SectionHeading light eyebrow="Who to ask" title="The quickest way to reach the right person" />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal className="rounded-3xl border border-ink/10 bg-parchment p-7 shadow-card">
              <CalendarCheck className="size-6 text-gold-dark" aria-hidden />
              <h3 className="mt-4 font-display text-2xl text-ink">Table bookings</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                Up to {site.reservations.maxOnlinePartySize} guests:{" "}
                <Link href="/bookings" className="text-gold-dark underline underline-offset-4">
                  book online
                </Link>
                . {site.reservations.maxOnlinePartySize + 1} – {site.reservations.eventPartySize} guests: call{" "}
                <a href={`tel:${site.phone.e164}`} className="text-gold-dark underline underline-offset-4">
                  {site.phone.display}
                </a>{" "}
                or WhatsApp. More than {site.reservations.eventPartySize} is an event — see private hire.
              </p>
            </Reveal>
            <Reveal delay={60} className="rounded-3xl border border-ink/10 bg-parchment p-7 shadow-card">
              <Building2 className="size-6 text-gold-dark" aria-hidden />
              <h3 className="mt-4 font-display text-2xl text-ink">Private hire &amp; catering</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                The restaurant seats {site.capacity.seated} or hosts {site.capacity.standing} standing; we also cater across North West London. Use the{" "}
                <Link href="/private-hire#enquire" className="text-gold-dark underline underline-offset-4">
                  private hire
                </Link>{" "}
                or{" "}
                <Link href="/catering#enquire" className="text-gold-dark underline underline-offset-4">
                  catering
                </Link>{" "}
                enquiry forms and we’ll come back with a quote — usually the same day, or first thing after service.
              </p>
            </Reveal>
            <Reveal delay={120} className="rounded-3xl border border-ink/10 bg-parchment p-7 shadow-card">
              <Leaf className="size-6 text-gold-dark" aria-hidden />
              <h3 className="mt-4 font-display text-2xl text-ink">Allergies &amp; dietary needs</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                Every dish on our{" "}
                <Link href="/menu" className="text-gold-dark underline underline-offset-4">
                  online menus
                </Link>{" "}
                lists its allergens and whether it’s vegetarian or plant-based. For anything serious, call ahead and tell your server when you
                arrive — the kitchen handles all fourteen major allergens.
              </p>
            </Reveal>
            <Reveal delay={180} className="rounded-3xl border border-ink/10 bg-parchment p-7 shadow-card">
              <UtensilsCrossed className="size-6 text-gold-dark" aria-hidden />
              <h3 className="mt-4 font-display text-2xl text-ink">Takeaway &amp; everything else</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                Order collection or delivery on our{" "}
                <Link href="/takeaway" className="text-gold-dark underline underline-offset-4">
                  takeaway page
                </Link>{" "}
                or call to collect. For feedback, press or lost property, email{" "}
                <a href={`mailto:${site.email}`} className="text-gold-dark underline underline-offset-4">
                  {site.email}
                </a>{" "}
                and we’ll reply within a day.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="ink">
        <div className="container-content grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <SectionHeading eyebrow="FAQs" title="Before you visit" />
          </Reveal>
          <Reveal delay={100}>
            <FaqList faqs={generalFaqs} />
          </Reveal>
        </div>
      </Section>

      <JsonLd data={webPageSchema({ path: "/contact", title: page.title, description: page.description })} />
    </>
  );
}
