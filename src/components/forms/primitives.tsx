"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const inputClass =
  "w-full rounded-xl border border-ink/15 bg-white/70 px-4 py-3 text-base text-ink placeholder:text-ink/40 transition-[border-color,box-shadow] focus:border-gold-deep focus:outline-none focus:ring-4 focus:ring-gold/25 aria-[invalid=true]:border-danger";

export function FieldError({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <p id={id} className="flex items-center gap-1.5 text-sm text-danger" role="alert">
      <AlertCircle className="size-4 shrink-0" aria-hidden />
      {children}
    </p>
  );
}

export function Field({
  label,
  hint,
  error,
  children,
  optional = false,
  className,
}: {
  label: string;
  name: string;
  hint?: string;
  error?: string;
  children: (props: { id: string; describedBy?: string; invalid: boolean }) => ReactNode;
  optional?: boolean;
  className?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") || undefined;
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-sm font-medium text-ink">
        <span>{label}</span>
        {optional ? <span className="text-xs font-normal text-ink/50">Optional</span> : null}
      </label>
      {children({ id, describedBy, invalid: Boolean(error) })}
      {hint ? (
        <p id={hintId} className="text-xs leading-relaxed text-ink/55">
          {hint}
        </p>
      ) : null}
      {error ? <FieldError id={errorId}>{error}</FieldError> : null}
    </div>
  );
}

/** A group of related controls (radios / checkboxes) with a shared legend. */
export function Fieldset({
  legend,
  hint,
  error,
  optional = false,
  children,
  className,
}: {
  legend: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
  className?: string;
}) {
  const id = useId();
  return (
    <fieldset className={cn("space-y-3", className)} aria-describedby={error ? `${id}-error` : undefined}>
      <legend className="flex w-full items-baseline justify-between gap-3 text-sm font-medium text-ink">
        <span>{legend}</span>
        {optional ? <span className="text-xs font-normal text-ink/50">Optional</span> : null}
      </legend>
      {hint ? <p className="-mt-1 text-xs leading-relaxed text-ink/55">{hint}</p> : null}
      {children}
      {error ? <FieldError id={`${id}-error`}>{error}</FieldError> : null}
    </fieldset>
  );
}

/** Pill-style toggle for checkbox groups. */
export function ChoiceChip({ name, value, label, defaultChecked }: { name: string; value: string; label: string; defaultChecked?: boolean }) {
  return (
    <label className="cursor-pointer">
      <input type="checkbox" name={name} value={value} defaultChecked={defaultChecked} className="peer sr-only" />
      <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-white/70 px-3.5 py-2 text-sm text-ink/80 transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-cream peer-focus-visible:ring-4 peer-focus-visible:ring-gold/25 hover:border-ink/40 peer-checked:[&_svg]:opacity-100">
        <Check className="size-3.5 opacity-0 transition-opacity" strokeWidth={3} aria-hidden />
        {label}
      </span>
    </label>
  );
}

/** Card-style radio option with a title and short hint. */
export function ChoiceCard({
  name,
  value,
  label,
  hint,
  required,
  defaultChecked,
}: {
  name: string;
  value: string;
  label: string;
  hint?: string;
  required?: boolean;
  defaultChecked?: boolean;
}) {
  return (
    <label className="group relative block cursor-pointer">
      <input type="radio" name={name} value={value} required={required} defaultChecked={defaultChecked} className="peer sr-only" />
      <span className="flex h-full items-start gap-3 rounded-2xl border border-ink/15 bg-white/70 p-3.5 transition-[border-color,background-color,box-shadow] peer-checked:border-ink peer-checked:bg-white peer-checked:shadow-[inset_0_0_0_1px_var(--color-ink)] peer-focus-visible:ring-4 peer-focus-visible:ring-gold/25 hover:border-ink/40">
        <span
          aria-hidden
          className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border border-ink/30 transition-colors group-has-[:checked]:border-ink group-has-[:checked]:bg-ink"
        >
          <span className="size-1.5 rounded-full bg-cream opacity-0 transition-opacity group-has-[:checked]:opacity-100" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-medium leading-snug text-ink">{label}</span>
          {hint ? <span className="mt-0.5 block text-xs leading-relaxed text-ink/55">{hint}</span> : null}
        </span>
      </span>
    </label>
  );
}

export function ConsentCheckbox({ error }: { error?: string }) {
  return (
    <div className="space-y-2">
      <label className="flex items-start gap-3 text-sm text-ink/80">
        <input type="checkbox" name="consent" required aria-invalid={Boolean(error)} className="peer sr-only" />
        <span
          aria-hidden
          className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border border-ink/20 bg-white/70 text-cream transition-colors peer-checked:border-ink peer-checked:bg-ink peer-focus-visible:ring-4 peer-focus-visible:ring-gold/25 peer-checked:[&_svg]:opacity-100"
        >
          <Check className="size-3 opacity-0" strokeWidth={3} />
        </span>
        <span>
          I’m happy for Zufa to contact me about this enquiry. We only use your details to reply — see our{" "}
          <a href="/privacy-policy" className="text-gold-dark underline underline-offset-4">
            privacy policy
          </a>
          .
        </span>
      </label>
      {error ? <FieldError>{error}</FieldError> : null}
    </div>
  );
}

/** Hidden anti-spam fields: honeypot plus a client-side render timestamp. */
export function SpamTraps({ topic }: { topic: string }) {
  const startedAtRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, []);
  return (
    <>
      <input type="hidden" name="topic" value={topic} />
      <input ref={startedAtRef} type="hidden" name="startedAt" defaultValue="" />
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor={`website-${topic}`}>Website</label>
        <input id={`website-${topic}`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
    </>
  );
}

export function FormErrorBanner({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-2 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-ink" role="alert">
      <AlertCircle className="size-4 shrink-0 text-danger" aria-hidden />
      {children}
    </p>
  );
}

export function SubmitButton({ pending, children, className }: { pending: boolean; children: ReactNode; className?: string }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-8 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-stone disabled:opacity-60",
        className,
      )}
    >
      {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
      {pending ? "Sending…" : children}
    </button>
  );
}
