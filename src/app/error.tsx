"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[100svh] items-center bg-ink text-cream">
      <div className="container-content py-32 text-center">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="mt-5 text-display-lg">We’ve dropped a plate</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-sand">An unexpected error occurred. Please try again, or call us on {site.phone.display}.</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button onClick={reset} size="lg">
            Try again
          </Button>
          <Button href="/" variant="secondary" size="lg">
            Back to home
          </Button>
        </div>
      </div>
    </section>
  );
}
