"use client";

import { useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, Pencil } from "lucide-react";
import { submitEnquiry, type EnquiryFieldName, type EnquiryState } from "@/app/actions/enquiry";
import { DatePicker } from "@/components/forms/date-picker";
import { GuestStepper } from "@/components/forms/guest-stepper";
import { SelectField } from "@/components/forms/select-field";
import { ChoiceCard, ChoiceChip, ConsentCheckbox, Field, Fieldset, FormErrorBanner, SpamTraps, SubmitButton, inputClass } from "@/components/forms/primitives";
import {
  budgetOptions,
  dietaryOptions,
  eventTimeOptions,
  extrasOptions,
  menuStyleOptions,
  occasionOptions,
  optionLabel,
  optionLabels,
  serviceStyleOptions,
  sourceOptions,
  venueTypeOptions,
} from "@/content/catering-form";
import { cn } from "@/lib/utils";

const initialState: EnquiryState = { status: "idle" };

const STEPS = [
  { id: "event", title: "Your event", blurb: "When, where and how many." },
  { id: "food", title: "The food", blurb: "How you’d like people to eat." },
  { id: "you", title: "About you", blurb: "So we can send the quote." },
] as const;

type StepIndex = 0 | 1 | 2;

/** Which step each field lives on, so server-side errors can send the guest back to the right place. */
const FIELD_STEP: Partial<Record<EnquiryFieldName, StepIndex>> = {
  occasion: 0,
  occasionOther: 0,
  eventDate: 0,
  dateFlexible: 0,
  eventTime: 0,
  guests: 0,
  postcode: 0,
  venueType: 0,
  serviceStyle: 1,
  menuStyle: 1,
  dietary: 1,
  dietaryNotes: 1,
  budget: 1,
  extras: 1,
  name: 2,
  email: 2,
  phone: 2,
  company: 2,
  message: 2,
  source: 2,
  consent: 2,
};

type Errors = Partial<Record<EnquiryFieldName, string>>;

const POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;
const OUTWARD = /^[A-Z]{1,2}\d[A-Z\d]?$/i;

/** Client-side checks for the fields on a given step. Mirrors the server rules for a faster round-trip. */
function validateStep(step: StepIndex, form: HTMLFormElement): Errors {
  const data = new FormData(form);
  const get = (name: string) => String(data.get(name) ?? "").trim();
  const errors: Errors = {};

  if (step === 0) {
    if (!get("occasion")) errors.occasion = "Please choose the occasion";
    if (!get("guests")) errors.guests = "Roughly how many guests?";
    const postcode = get("postcode");
    if (!postcode) errors.postcode = "Please add the venue postcode so we can quote for travel";
    else if (!POSTCODE.test(postcode) && !OUTWARD.test(postcode)) errors.postcode = "That doesn’t look like a UK postcode";
  }
  if (step === 1) {
    if (!get("serviceStyle")) errors.serviceStyle = "Please choose how you’d like to eat";
  }
  if (step === 2) {
    if (get("name").length < 2) errors.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email"))) errors.email = "Please enter a valid email address";
    if (get("phone").replace(/\D/g, "").length < 10) errors.phone = "Please add a phone number so we can call you about the quote";
    if (get("consent") !== "on") errors.consent = "Please confirm you are happy for us to contact you";
  }
  return errors;
}

interface Summary {
  occasion?: string;
  date?: string;
  time?: string;
  guests?: string;
  venue?: string;
  service?: string;
  menu?: string;
  dietary?: string;
  budget?: string;
  extras?: string;
}

function readSummary(form: HTMLFormElement): Summary {
  const data = new FormData(form);
  const get = (name: string) => String(data.get(name) ?? "").trim() || undefined;
  const all = (name: string) => data.getAll(name).map(String);
  const date = get("eventDate");
  return {
    occasion: [optionLabel("occasion", get("occasion")), get("occasionOther")].filter(Boolean).join(" — ") || undefined,
    date: date ? `${date}${get("dateFlexible") ? " (flexible)" : ""}` : get("dateFlexible") ? "Flexible" : undefined,
    time: optionLabel("eventTime", get("eventTime")),
    guests: get("guests") ? `${get("guests")} guests` : undefined,
    venue: [optionLabel("venueType", get("venueType")), get("postcode")?.toUpperCase()].filter(Boolean).join(" · ") || undefined,
    service: optionLabel("serviceStyle", get("serviceStyle")),
    menu: optionLabel("menuStyle", get("menuStyle")),
    dietary: [optionLabels("dietary", all("dietary")), get("dietaryNotes")].filter(Boolean).join(" — ") || undefined,
    budget: optionLabel("budget", get("budget")),
    extras: optionLabels("extras", all("extras")),
  };
}

export function CateringEnquiryForm({ className }: { className?: string }) {
  const [state, action, pending] = useActionState(submitEnquiry, initialState);
  const [step, setStep] = useState<StepIndex>(0);
  const [clientErrors, setClientErrors] = useState<Errors>({});
  const [summary, setSummary] = useState<Summary>({});
  const [occasion, setOccasion] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lastServerState = useRef<EnquiryState>(state);

  const errors: Errors = { ...state.errors, ...clientErrors };

  // When the server rejects the submission, jump to the first step that has a problem.
  useEffect(() => {
    if (state === lastServerState.current) return;
    lastServerState.current = state;
    if (state.status !== "error" || !state.errors) return;
    const first = (Object.keys(state.errors) as EnquiryFieldName[]).map((k) => FIELD_STEP[k]).find((s) => s !== undefined);
    if (first !== undefined) goTo(first);
  }, [state]);

  function goTo(next: StepIndex) {
    setStep(next);
    setClientErrors({});
    requestAnimationFrame(() => {
      const form = formRef.current;
      if (form) {
        // Scroll the enclosing card (it carries scroll-margin for the fixed header), falling back to the form.
        const target = form.closest<HTMLElement>("[data-form-card]") ?? form;
        if (target.getBoundingClientRect().top < 96) target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      headingRef.current?.focus({ preventScroll: true });
    });
  }

  function next() {
    const form = formRef.current;
    if (!form) return;
    const found = validateStep(step, form);
    if (Object.keys(found).length) {
      setClientErrors(found);
      const firstName = Object.keys(found)[0];
      // Custom controls carry their name on a hidden input; focus their visible trigger instead.
      const el = form.querySelector<HTMLElement>(`[data-name="${firstName}"], [name="${firstName}"]:not([type="hidden"])`);
      el?.focus();
      return;
    }
    const upcoming = Math.min(2, step + 1) as StepIndex;
    if (upcoming === 2) setSummary(readSummary(form));
    goTo(upcoming);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    // Only the last step submits; guard against Enter on earlier steps.
    if (step !== 2) {
      event.preventDefault();
      next();
      return;
    }
    const found = validateStep(2, event.currentTarget);
    if (Object.keys(found).length) {
      event.preventDefault();
      setClientErrors(found);
    }
  }

  const current = STEPS[step];

  return (
    <form ref={formRef} action={action} onSubmit={onSubmit} noValidate className={cn("[color-scheme:light]", className)}>
      <SpamTraps topic="catering" />

      {/* ---- Progress ---- */}
      <ol className="grid grid-cols-3 gap-2" aria-label="Enquiry progress">
        {STEPS.map((s, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <li key={s.id} aria-current={active ? "step" : undefined} className="min-w-0">
              <button
                type="button"
                onClick={() => (done ? goTo(i as StepIndex) : undefined)}
                disabled={!done}
                className={cn("group block w-full text-left", done ? "cursor-pointer" : "cursor-default")}
              >
                <span
                  className={cn(
                    "block h-1 rounded-full transition-colors",
                    active ? "bg-gold-deep" : done ? "bg-ink group-hover:bg-gold-deep" : "bg-ink/10",
                  )}
                />
                <span className="mt-2 flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em]">
                  <span
                    className={cn(
                      "grid size-4 place-items-center rounded-full text-[0.625rem]",
                      done ? "bg-ink text-cream" : active ? "border border-gold-deep text-gold-dark" : "border border-ink/20 text-ink/40",
                    )}
                  >
                    {done ? <Check className="size-2.5" strokeWidth={3} aria-hidden /> : i + 1}
                  </span>
                  <span className={cn("truncate", active ? "text-ink" : done ? "text-ink/70" : "text-ink/40")}>{s.title}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-6">
        <h3 ref={headingRef} tabIndex={-1} className="font-display text-xl text-ink outline-none sm:text-2xl">
          <span className="sr-only">Step {step + 1} of 3: </span>
          {current.title}
        </h3>
        <p className="mt-1 text-sm text-ink/60">{current.blurb}</p>
        <p className="sr-only" aria-live="polite">
          Step {step + 1} of 3: {current.title}
        </p>
      </div>

      {/* ---- Step 1: Your event ---- */}
      <div hidden={step !== 0} className="mt-6 space-y-6">
        <Field label="What’s the occasion?" name="occasion" error={errors.occasion}>
          {({ id, describedBy, invalid }) => (
            <SelectField
              id={id}
              name="occasion"
              options={occasionOptions}
              required
              value={occasion}
              onChange={setOccasion}
              describedBy={describedBy}
              invalid={invalid}
            />
          )}
        </Field>
        {occasion === "other" ? (
          <Field label="Tell us the occasion" name="occasionOther" error={errors.occasionOther}>
            {({ id, describedBy, invalid }) => (
              <input id={id} name="occasionOther" type="text" maxLength={120} aria-invalid={invalid} aria-describedby={describedBy} className={inputClass} />
            )}
          </Field>
        ) : null}

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-3">
            <Field label="Event date" name="eventDate" error={errors.eventDate} optional>
              {({ id, describedBy, invalid }) => <DatePicker id={id} name="eventDate" describedBy={describedBy} invalid={invalid} />}
            </Field>
            <label className="flex items-center gap-2.5 text-sm text-ink/75">
              <input type="checkbox" name="dateFlexible" className="peer sr-only" />
              <span
                aria-hidden
                className="grid size-4 shrink-0 place-items-center rounded border border-ink/25 bg-white/70 text-cream transition-colors peer-checked:border-ink peer-checked:bg-ink peer-focus-visible:ring-4 peer-focus-visible:ring-gold/25 peer-checked:[&_svg]:opacity-100"
              >
                <Check className="size-2.5 opacity-0" strokeWidth={3} />
              </span>
              My date is flexible
            </label>
          </div>
          <Field label="Number of guests" name="guests" error={errors.guests} hint="A rough figure is fine.">
            {({ id, describedBy, invalid }) => <GuestStepper id={id} name="guests" describedBy={describedBy} invalid={invalid} />}
          </Field>
        </div>

        <Field label="Time of day" name="eventTime" error={errors.eventTime} optional>
          {({ id, describedBy, invalid }) => <SelectField id={id} name="eventTime" options={eventTimeOptions} describedBy={describedBy} invalid={invalid} />}
        </Field>

        <div className="grid gap-6 sm:grid-cols-[1fr_1.4fr]">
          <Field label="Venue postcode" name="postcode" error={errors.postcode} hint="So we can quote for travel.">
            {({ id, describedBy, invalid }) => (
              <input
                id={id}
                name="postcode"
                type="text"
                autoComplete="postal-code"
                autoCapitalize="characters"
                maxLength={9}
                placeholder="HA5 4HR"
                required
                aria-invalid={invalid}
                aria-describedby={describedBy}
                className={cn(inputClass, "uppercase placeholder:normal-case")}
              />
            )}
          </Field>
          <Field label="Type of venue" name="venueType" error={errors.venueType} optional>
            {({ id, describedBy, invalid }) => <SelectField id={id} name="venueType" options={venueTypeOptions} describedBy={describedBy} invalid={invalid} />}
          </Field>
        </div>
      </div>

      {/* ---- Step 2: The food ---- */}
      <div hidden={step !== 1} className="mt-6 space-y-7">
        <Fieldset legend="How would you like people to eat?" error={errors.serviceStyle}>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {serviceStyleOptions.map((o) => (
              <ChoiceCard key={o.value} name="serviceStyle" value={o.value} label={o.label} hint={o.hint} />
            ))}
          </div>
        </Fieldset>

        <Field label="Menu style" name="menuStyle" error={errors.menuStyle} optional hint="Our sharing platters are a good starting point; every menu can be changed.">
          {({ id, describedBy, invalid }) => <SelectField id={id} name="menuStyle" options={menuStyleOptions} describedBy={describedBy} invalid={invalid} />}
        </Field>

        <Fieldset legend="Dietary requirements" hint="Tick anything that applies. All cold mezze are vegetarian and most are vegan." error={errors.dietary} optional>
          <div className="flex flex-wrap gap-2">
            {dietaryOptions.map((o) => (
              <ChoiceChip key={o.value} name="dietary" value={o.value} label={o.label} />
            ))}
          </div>
          <Field label="Allergy details" name="dietaryNotes" error={errors.dietaryNotes} optional className="pt-1">
            {({ id, describedBy, invalid }) => (
              <input
                id={id}
                name="dietaryNotes"
                type="text"
                maxLength={500}
                placeholder="e.g. two guests with a severe nut allergy"
                aria-invalid={invalid}
                aria-describedby={describedBy}
                className={inputClass}
              />
            )}
          </Field>
        </Fieldset>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Budget per head" name="budget" error={errors.budget} optional>
            {({ id, describedBy, invalid }) => <SelectField id={id} name="budget" options={budgetOptions} describedBy={describedBy} invalid={invalid} />}
          </Field>
          <Fieldset legend="Would you like us to bring…" error={errors.extras} optional>
            <div className="flex flex-wrap gap-2">
              {extrasOptions.map((o) => (
                <ChoiceChip key={o.value} name="extras" value={o.value} label={o.label} />
              ))}
            </div>
          </Fieldset>
        </div>
      </div>

      {/* ---- Step 3: About you ---- */}
      <div hidden={step !== 2} className="mt-6 space-y-6">
        <SummaryCard summary={summary} onEdit={goTo} />

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Your name" name="name" error={errors.name}>
            {({ id, describedBy, invalid }) => (
              <input id={id} name="name" type="text" autoComplete="name" required aria-invalid={invalid} aria-describedby={describedBy} className={inputClass} />
            )}
          </Field>
          <Field label="Company or organisation" name="company" error={errors.company} optional>
            {({ id, describedBy, invalid }) => (
              <input id={id} name="company" type="text" autoComplete="organization" maxLength={120} aria-invalid={invalid} aria-describedby={describedBy} className={inputClass} />
            )}
          </Field>
          <Field label="Email address" name="email" error={errors.email}>
            {({ id, describedBy, invalid }) => (
              <input id={id} name="email" type="email" autoComplete="email" inputMode="email" required aria-invalid={invalid} aria-describedby={describedBy} className={inputClass} />
            )}
          </Field>
          <Field label="Phone number" name="phone" error={errors.phone} hint="We’ll call to talk through the quote.">
            {({ id, describedBy, invalid }) => (
              <input id={id} name="phone" type="tel" autoComplete="tel" inputMode="tel" required aria-invalid={invalid} aria-describedby={describedBy} className={inputClass} />
            )}
          </Field>
        </div>

        <Field label="Anything else we should know?" name="message" error={errors.message} optional>
          {({ id, describedBy, invalid }) => (
            <textarea
              id={id}
              name="message"
              rows={3}
              maxLength={3000}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              placeholder="Timings on the day, access to the venue, dishes you already have in mind…"
              className={cn(inputClass, "resize-y")}
            />
          )}
        </Field>

        <Field label="How did you hear about us?" name="source" error={errors.source} optional>
          {({ id, describedBy, invalid }) => <SelectField id={id} name="source" options={sourceOptions} describedBy={describedBy} invalid={invalid} />}
        </Field>

        <ConsentCheckbox error={errors.consent} />
      </div>

      {state.status === "error" && state.message && step === 2 ? <div className="mt-6"><FormErrorBanner>{state.message}</FormErrorBanner></div> : null}

      {/* ---- Navigation ---- */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => goTo((step - 1) as StepIndex)}
            className="inline-flex h-12 items-center gap-2 rounded-full px-4 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-ink/70 transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-4" aria-hidden /> Back
          </button>
        ) : (
          <span className="text-xs text-ink/50">Takes about two minutes.</span>
        )}
        {step < 2 ? (
          <button
            type="button"
            onClick={next}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-8 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-stone"
          >
            Continue <ArrowRight className="size-4" aria-hidden />
          </button>
        ) : (
          <SubmitButton pending={pending}>Request a quote</SubmitButton>
        )}
      </div>
    </form>
  );
}

function SummaryCard({ summary, onEdit }: { summary: Summary; onEdit: (step: StepIndex) => void }) {
  const all: Array<{ label: string; value?: string; step: StepIndex }> = [
    { label: "Occasion", value: summary.occasion, step: 0 },
    { label: "When", value: [summary.date, summary.time].filter(Boolean).join(", ") || undefined, step: 0 },
    { label: "Guests", value: summary.guests, step: 0 },
    { label: "Venue", value: summary.venue, step: 0 },
    { label: "Service", value: summary.service, step: 1 },
    { label: "Menu", value: summary.menu, step: 1 },
    { label: "Dietary", value: summary.dietary, step: 1 },
    { label: "Budget", value: summary.budget, step: 1 },
    { label: "Extras", value: summary.extras, step: 1 },
  ];
  const rows = all.filter((r) => r.value);
  if (!rows.length) return null;
  return (
    <div className="rounded-2xl border border-ink/10 bg-white/60 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gold-dark">Your enquiry</p>
        <button type="button" onClick={() => onEdit(0)} className="inline-flex items-center gap-1 text-xs font-medium text-ink/60 underline-offset-4 hover:text-ink hover:underline">
          <Pencil className="size-3" aria-hidden /> Edit
        </button>
      </div>
      <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
        {rows.map((r) => (
          <div key={r.label} className="contents">
            <dt className="text-ink/55">{r.label}</dt>
            <dd className="text-ink">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
