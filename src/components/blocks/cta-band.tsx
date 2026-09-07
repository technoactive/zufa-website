import { Phone } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import type { ReactNode } from "react";

interface CtaBandProps {
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}

export function CtaBand({
  eyebrow = "Reserve",
  title = "Your table is waiting",
  description = `Book online in seconds, or call us on ${site.phone.display} for parties of more than ${site.reservations.maxOnlinePartySize}.`,
  primary = { label: "Book a table", href: "/bookings" },
  secondary = { label: `Call ${site.phone.display}`, href: `tel:${site.phone.e164}` },
}: CtaBandProps) {
  return (
    <section className="relative isolate overflow-hidden bg-charcoal py-20 text-cream sm:py-24">
      <span aria-hidden className="arabesque-overlay opacity-[0.05]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/2 -z-10 size-[32rem] -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
      <div className="container-content">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h2 className="text-display-lg">{title}</h2>
          <p className="mt-5 max-w-xl text-base text-sand sm:text-lg">{description}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href={primary.href} size="lg">
              {primary.label}
            </Button>
            <Button href={secondary.href} variant="secondary" size="lg">
              {secondary.href.startsWith("tel:") ? <Phone className="size-4" aria-hidden /> : null}
              {secondary.label}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
