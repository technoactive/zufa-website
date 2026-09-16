"use client";

import Link from "next/link";
import { useActionState, useId } from "react";
import { ArrowRight } from "lucide-react";
import { subscribeNewsletter, type NewsletterState } from "@/app/actions/newsletter";
import { cn } from "@/lib/utils";

const initial: NewsletterState = { status: "idle" };

export function NewsletterForm({ className }: { className?: string }) {
  const [state, action, pending] = useActionState(subscribeNewsletter, initial);
  const id = useId();

  return (
    <form action={action} className={className} noValidate>
      <label htmlFor={`${id}-email`} className="sr-only">
        Email address
      </label>
      <div
        className={cn(
          "flex items-center rounded-full border bg-cream/[0.04] p-1.5 pl-5 transition-colors duration-300 focus-within:border-gold/70 focus-within:bg-cream/[0.06]",
          state.status === "error" ? "border-danger/60" : "border-cream/15",
        )}
      >
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="Your email address"
          aria-invalid={state.status === "error" || undefined}
          aria-describedby={`${id}-help`}
          className="min-w-0 flex-1 bg-transparent text-sm text-cream placeholder:text-smoke focus:outline-none"
        />
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-gold bg-ink px-5 text-sm font-semibold text-cream transition-colors duration-300 hover:bg-stone disabled:opacity-60"
        >
          {pending ? "Joining…" : "Join"}
          <ArrowRight className="size-3.5" aria-hidden />
        </button>
      </div>
      <p id={`${id}-help`} className={cn("mt-3 text-xs leading-relaxed", state.status === "error" ? "text-danger" : "text-smoke")}>
        {state.status === "error" ? (
          state.message
        ) : (
          <>
            Once or twice a month. Unsubscribe any time. See our{" "}
            <Link href="/privacy-policy" className="text-sand underline-offset-4 hover:text-cream hover:underline">
              privacy policy
            </Link>
            .
          </>
        )}
      </p>
    </form>
  );
}
