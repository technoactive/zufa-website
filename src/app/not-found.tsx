import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink text-cream">
      <span aria-hidden className="arabesque-overlay opacity-[0.05]" />
      <div className="container-content py-32 text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-5 text-display-xl">
          This dish isn’t on the <em className="italic text-gold">menu</em>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-sand">The page you were looking for has moved or never existed. Let’s get you back to something delicious.</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/" size="lg">
            Back to home
          </Button>
          <Button href="/menu" variant="secondary" size="lg">
            Browse the menu
          </Button>
        </div>
        <p className="mt-10 text-sm text-smoke">
          Need help? Call{" "}
          <a href={`tel:${site.phone.e164}`} className="text-gold underline underline-offset-4">
            {site.phone.display}
          </a>
        </p>
      </div>
    </section>
  );
}
