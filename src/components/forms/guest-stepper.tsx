"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

const MIN = 1;
const MAX = 500;

function parseGuests(value: string) {
  if (!value) return null;
  const next = Number.parseInt(value, 10);
  if (!Number.isFinite(next)) return null;
  return Math.min(MAX, Math.max(MIN, next));
}

interface GuestStepperProps {
  id: string;
  name: string;
  describedBy?: string;
  invalid?: boolean;
  className?: string;
}

export function GuestStepper({ id, name, describedBy, invalid = false, className }: GuestStepperProps) {
  const [value, setValue] = useState("");
  const count = parseGuests(value);

  const commit = (next: number | null) => {
    setValue(next == null ? "" : String(next));
  };

  const step = (delta: number) => {
    if (count == null) {
      commit(delta > 0 ? MIN : null);
      return;
    }
    const next = count + delta;
    if (next < MIN) {
      commit(null);
      return;
    }
    commit(Math.min(MAX, next));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      step(1);
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      step(-1);
    }
  };

  return (
    <div className={cn("relative [color-scheme:light]", className)}>
      <input
        id={id}
        name={name}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="off"
        placeholder="e.g. 40"
        aria-invalid={invalid}
        aria-describedby={describedBy}
        value={value}
        onKeyDown={onKeyDown}
        onChange={(event) => {
          const digits = event.target.value.replace(/\D/g, "");
          if (!digits) {
            setValue("");
            return;
          }
          commit(parseGuests(digits));
        }}
        className={cn(
          "w-full rounded-xl border bg-white/70 py-3 pr-14 pl-4 text-base text-ink placeholder:text-ink/40 transition-[border-color,box-shadow]",
          "focus:border-gold-deep focus:outline-none focus:ring-4 focus:ring-gold/25",
          invalid ? "border-danger" : "border-ink/15",
        )}
      />
      <div className="absolute inset-y-1.5 right-1.5 flex w-10 flex-col overflow-hidden rounded-lg border border-ink/12 bg-cream">
        <button
          type="button"
          aria-label="Increase guests"
          onClick={() => step(1)}
          disabled={count != null && count >= MAX}
          className="grid flex-1 place-items-center text-gold-dark transition-colors hover:bg-gold/20 disabled:opacity-30"
        >
          <ChevronUp className="size-3.5" strokeWidth={2.4} aria-hidden />
        </button>
        <span aria-hidden className="h-px bg-ink/10" />
        <button
          type="button"
          aria-label="Decrease guests"
          onClick={() => step(-1)}
          disabled={!count}
          className="grid flex-1 place-items-center text-gold-dark transition-colors hover:bg-gold/20 disabled:opacity-30"
        >
          <ChevronDown className="size-3.5" strokeWidth={2.4} aria-hidden />
        </button>
      </div>
    </div>
  );
}
