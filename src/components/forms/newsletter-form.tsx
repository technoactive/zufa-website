"use client";

import Link from "next/link";
import { useActionState, useId } from "react";
import { ArrowRight, Check } from "lucide-react";
import { subscribeNewsletter, type NewsletterState } from "@/app/actions/newsletter";
import { cn } from "@/lib/utils";

const initial: NewsletterState = { status: "idle" };

export function NewsletterForm({ className }: { className?: string }) {
  const [state, action, pending] = useActionState(subscribeNewsletter, initial);
  const id = useId();

  if (state.status === "success") {
    return (
      <div className={cn("flex items-start gap-3 rounded-2xl border border-gold/30 bg-gold/[0.08] p-5", className)} role="status">
        <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-gold-deep text-ink">
          <Check className="size-3.5" aria-hidden />
        </span>
        <p className="text-sm leading-relaxed text-cream">{state.message}</p>
      </div>
    );
  }

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
        {/* Honeypot */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-gold-deep px-5 text-[0.75rem] font-bold uppercase tracking-[0.1em] text-ink transition-colors duration-300 hover:bg-cream disabled:opacity-60"
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
