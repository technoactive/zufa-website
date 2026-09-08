"use client";

import { useActionState, useEffect, useId, useRef, type ReactNode } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { submitEnquiry, type EnquiryState, type EnquiryTopic } from "@/app/actions/enquiry";
import { cn } from "@/lib/utils";

interface EnquiryFormProps {
  topic: EnquiryTopic;
  /** Show event-specific fields (date, guests). */
  event?: boolean;
  /** Placeholder for the message field; defaults depend on `event`. */
  placeholder?: string;
  /** Submit button label. */
  submitLabel?: string;
  className?: string;
}

const initialState: EnquiryState = { status: "idle" };

const inputClass =
  "w-full rounded-xl border border-ink/15 bg-white/70 px-4 py-3 text-base text-ink placeholder:text-ink/40 transition-[border-color,box-shadow] focus:border-gold-deep focus:outline-none focus:ring-4 focus:ring-gold/25 aria-[invalid=true]:border-danger";

function Field({
  label,
  error,
  children,
  optional = false,
}: {
  label: string;
  name: string;
  error?: string;
  children: (props: { id: string; describedBy?: string; invalid: boolean }) => ReactNode;
  optional?: boolean;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-medium text-ink">
        <span>{label}</span>
        {optional ? <span className="text-xs font-normal text-ink/50">Optional</span> : null}
      </label>
      {children({ id, describedBy: error ? errorId : undefined, invalid: Boolean(error) })}
      {error ? (
        <p id={errorId} className="flex items-center gap-1.5 text-sm text-danger" role="alert">
          <AlertCircle className="size-4" aria-hidden />
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function EnquiryForm({ topic, event = true, placeholder, submitLabel = "Send enquiry", className }: EnquiryFormProps) {
  const [state, action, pending] = useActionState(submitEnquiry, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const startedAtRef = useRef<HTMLInputElement>(null);

  // Time-trap for bots: stamp when the form was actually rendered on the client.
  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, []);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      statusRef.current?.focus();
    }
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className={cn("rounded-2xl border border-success/30 bg-success/10 p-8 text-ink", className)}
      >
        <CheckCircle2 className="size-8 text-success" aria-hidden />
        <h3 className="mt-4 font-display text-2xl">Message received</h3>
        <p className="mt-2 leading-relaxed text-ink/75">{state.message}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={action} noValidate className={cn("space-y-6", className)}>
      <input type="hidden" name="topic" value={topic} />
      <input ref={startedAtRef} type="hidden" name="startedAt" defaultValue="" />
      {/* Honeypot — hidden from humans and assistive tech. */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name" name="name" error={state.errors?.name}>
          {({ id, describedBy, invalid }) => (
            <input id={id} name="name" type="text" autoComplete="name" required aria-invalid={invalid} aria-describedby={describedBy} className={inputClass} />
          )}
        </Field>
        <Field label="Email address" name="email" error={state.errors?.email}>
          {({ id, describedBy, invalid }) => (
            <input id={id} name="email" type="email" autoComplete="email" inputMode="email" required aria-invalid={invalid} aria-describedby={describedBy} className={inputClass} />
          )}
        </Field>
        <Field label="Phone number" name="phone" error={state.errors?.phone} optional>
          {({ id, describedBy, invalid }) => (
            <input id={id} name="phone" type="tel" autoComplete="tel" inputMode="tel" aria-invalid={invalid} aria-describedby={describedBy} className={inputClass} />
          )}
        </Field>
        {event ? (
          <>
            <Field label="Event date" name="eventDate" error={state.errors?.eventDate} optional>
              {({ id, describedBy, invalid }) => (
                <input id={id} name="eventDate" type="date" aria-invalid={invalid} aria-describedby={describedBy} className={inputClass} />
              )}
            </Field>
            <Field label="Number of guests" name="guests" error={state.errors?.guests} optional>
              {({ id, describedBy, invalid }) => (
                <input id={id} name="guests" type="number" min={1} max={500} inputMode="numeric" aria-invalid={invalid} aria-describedby={describedBy} className={inputClass} />
              )}
            </Field>
          </>
        ) : null}
      </div>

      <Field label={event ? "Tell us about your event" : "Your message"} name="message" error={state.errors?.message}>
        {({ id, describedBy, invalid }) => (
          <textarea
            id={id}
            name="message"
            rows={5}
            required
            aria-invalid={invalid}
            aria-describedby={describedBy}
            placeholder={placeholder ?? (event ? "Occasion, preferred menu style, dietary requirements, budget…" : "How can we help?")}
            className={cn(inputClass, "resize-y")}
          />
        )}
      </Field>

      <div className="space-y-2">
        <label className="flex items-start gap-3 text-sm text-ink/80">
          <input
            type="checkbox"
            name="consent"
            required
            aria-invalid={Boolean(state.errors?.consent)}
            className="mt-0.5 size-4 shrink-0 accent-gold-dark"
          />
          <span>
            I’m happy for Zufa to contact me about this enquiry. We only use your details to reply — see our{" "}
            <a href="/privacy-policy" className="text-gold-dark underline underline-offset-4">
              privacy policy
            </a>
            .
          </span>
        </label>
        {state.errors?.consent ? (
          <p className="flex items-center gap-1.5 text-sm text-danger" role="alert">
            <AlertCircle className="size-4" aria-hidden />
            {state.errors.consent}
          </p>
        ) : null}
      </div>

      {state.status === "error" && state.message ? (
        <p className="flex items-center gap-2 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-ink" role="alert">
          <AlertCircle className="size-4 text-danger" aria-hidden />
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-8 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-stone disabled:opacity-60"
      >
        {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
        {pending ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
