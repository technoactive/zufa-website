"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] as const;
const MAX_MONTHS_AHEAD = 24;

function londonCivilDate(from = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(from);
  const read = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((part) => part.type === type)?.value);
  return { year: read("year"), month: read("month"), day: read("day") };
}

function toISO({ year, month, day }: { year: number; month: number; day: number }) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function parseISO(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const probe = new Date(year, month - 1, day);
  if (probe.getFullYear() !== year || probe.getMonth() !== month - 1 || probe.getDate() !== day) return null;
  return { year, month, day };
}

function formatDisplay(iso: string) {
  const parsed = parseISO(iso);
  if (!parsed) return "";
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(parsed.year, parsed.month - 1, parsed.day),
  );
}

function monthLabel(year: number, month: number) {
  return new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(new Date(year, month - 1, 1));
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function mondayOffset(year: number, month: number) {
  return (new Date(year, month - 1, 1).getDay() + 6) % 7;
}

function shiftMonth(year: number, month: number, delta: number) {
  const date = new Date(year, month - 1 + delta, 1);
  return { year: date.getFullYear(), month: date.getMonth() + 1 };
}

interface DatePickerProps {
  id: string;
  name: string;
  describedBy?: string;
  invalid?: boolean;
  className?: string;
}

export function DatePicker({ id, name, describedBy, invalid = false, className }: DatePickerProps) {
  const [today, setToday] = useState<{ year: number; month: number; day: number } | null>(null);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState<{ year: number; month: number } | null>(null);

  useEffect(() => {
    const now = londonCivilDate();
    setToday(now);
    setCursor((current) => current ?? { year: now.year, month: now.month });
  }, []);

  const todayISO = today ? toISO(today) : null;
  const latest = today ? shiftMonth(today.year, today.month, MAX_MONTHS_AHEAD) : null;
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const blanks = cursor ? mondayOffset(cursor.year, cursor.month) : 0;
  const count = cursor ? daysInMonth(cursor.year, cursor.month) : 0;
  const canPrev = Boolean(
    today && cursor && (cursor.year > today.year || (cursor.year === today.year && cursor.month > today.month)),
  );
  const canNext = Boolean(
    latest && cursor && (cursor.year < latest.year || (cursor.year === latest.year && cursor.month < latest.month)),
  );

  const pick = (day: number) => {
    if (!cursor) return;
    const iso = toISO({ year: cursor.year, month: cursor.month, day });
    setValue(iso);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className={cn("relative [color-scheme:light]", className)}>
      <input type="hidden" name={name} value={value} />
      <button
        id={id}
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={panelId}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        onClick={() => {
          if (open) {
            setOpen(false);
            return;
          }
          const selected = parseISO(value);
          const fallback = today ?? londonCivilDate();
          setCursor(selected ? { year: selected.year, month: selected.month } : { year: fallback.year, month: fallback.month });
          setOpen(true);
        }}
        className={cn(
          "flex w-full items-center justify-between gap-3 rounded-xl border bg-white/70 px-4 py-3 text-left text-base transition-[border-color,box-shadow]",
          "focus:border-gold-deep focus:outline-none focus:ring-4 focus:ring-gold/25",
          invalid ? "border-danger" : "border-ink/15",
          value ? "text-ink" : "text-ink/40",
        )}
      >
        <span className="min-w-0 truncate">{value ? formatDisplay(value) : "Choose a date"}</span>
        <CalendarDays className="size-4 shrink-0 text-gold-dark" aria-hidden />
      </button>

      {open && cursor ? (
        <div
          id={panelId}
          role="dialog"
          aria-label="Choose event date"
          className="mt-2 rounded-2xl border border-ink/10 bg-white p-4 text-ink shadow-card"
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <button
              type="button"
              aria-label="Previous month"
              disabled={!canPrev}
              onClick={() => setCursor((current) => (current ? shiftMonth(current.year, current.month, -1) : current))}
              className="grid size-9 place-items-center rounded-full border border-ink/12 text-gold-dark transition-colors hover:border-gold-dark hover:bg-gold/15 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeft className="size-4" aria-hidden />
            </button>
            <p className="font-display text-xl leading-none text-ink">{monthLabel(cursor.year, cursor.month)}</p>
            <button
              type="button"
              aria-label="Next month"
              disabled={!canNext}
              onClick={() => setCursor((current) => (current ? shiftMonth(current.year, current.month, 1) : current))}
              className="grid size-9 place-items-center rounded-full border border-ink/12 text-gold-dark transition-colors hover:border-gold-dark hover:bg-gold/15 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronRight className="size-4" aria-hidden />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gold-dark">
            {WEEKDAYS.map((day) => (
              <span key={day} className="py-1">
                {day}
              </span>
            ))}
          </div>

          <div className="mt-1 grid grid-cols-7 gap-1">
            {Array.from({ length: blanks }, (_, index) => (
              <span key={`blank-${index}`} />
            ))}
            {Array.from({ length: count }, (_, index) => {
              const day = index + 1;
              const iso = toISO({ year: cursor.year, month: cursor.month, day });
              const disabled = Boolean(todayISO && iso < todayISO);
              const selected = iso === value;
              const isToday = iso === todayISO;
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={disabled}
                  aria-pressed={selected}
                  aria-current={isToday ? "date" : undefined}
                  onClick={() => pick(day)}
                  className={cn(
                    "grid aspect-square place-items-center rounded-full text-sm transition-colors",
                    disabled && "cursor-not-allowed text-ink/25",
                    !disabled && !selected && "text-ink hover:bg-gold/20",
                    selected && "bg-ink font-semibold text-cream hover:bg-ink",
                    isToday && !selected && "ring-1 ring-gold-dark",
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {value ? (
            <button
              type="button"
              onClick={() => {
                setValue("");
                setOpen(false);
              }}
              className="mt-3 text-sm text-gold-dark underline-offset-4 hover:underline"
            >
              Clear date
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
