"use client";

import { useActionState } from "react";
import { submitEnquiry, type EnquiryState, type EnquiryTopic } from "@/app/actions/enquiry";
import { DatePicker } from "@/components/forms/date-picker";
import { GuestStepper } from "@/components/forms/guest-stepper";
import { ConsentCheckbox, Field, FormErrorBanner, SpamTraps, SubmitButton, inputClass } from "@/components/forms/primitives";
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

export function EnquiryForm({ topic, event = true, placeholder, submitLabel = "Send enquiry", className }: EnquiryFormProps) {
  const [state, action, pending] = useActionState(submitEnquiry, initialState);
  const requirePhone = topic === "private-hire";

  return (
    <form action={action} noValidate className={cn("space-y-6 [color-scheme:light]", className)}>
      <SpamTraps topic={topic} />

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
        <Field
          label="Phone number"
          name="phone"
          error={state.errors?.phone}
          optional={!requirePhone}
          hint={requirePhone ? "We’ll call to talk through the booking." : undefined}
        >
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              required={requirePhone}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              className={inputClass}
            />
          )}
        </Field>
        {event ? (
          <>
            <Field label="Event date" name="eventDate" error={state.errors?.eventDate} optional>
              {({ id, describedBy, invalid }) => <DatePicker id={id} name="eventDate" describedBy={describedBy} invalid={invalid} />}
            </Field>
            <Field label="Number of guests" name="guests" error={state.errors?.guests} optional>
              {({ id, describedBy, invalid }) => <GuestStepper id={id} name="guests" describedBy={describedBy} invalid={invalid} />}
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

      <ConsentCheckbox error={state.errors?.consent} />

      {state.status === "error" && state.message ? <FormErrorBanner>{state.message}</FormErrorBanner> : null}

      <SubmitButton pending={pending}>{submitLabel}</SubmitButton>
    </form>
  );
}
