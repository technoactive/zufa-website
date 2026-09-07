import { openingHours, type DayOfWeek, type OpeningPeriod } from "@/content/site";

export const dayOrder: readonly DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function periodForDay(day: DayOfWeek): OpeningPeriod | undefined {
  return openingHours.find((p) => p.days.includes(day));
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** Format "HH:MM" as a compact British time: 11:00 → 11am, 23:30 → 11:30pm, 00:00 → Midnight. */
export function formatTime(hhmm: string): string {
  if (hhmm === "00:00") return "Midnight";
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour}${suffix}` : `${hour}:${String(m).padStart(2, "0")}${suffix}`;
}

export interface OpenStatus {
  isOpen: boolean;
  /** Human-readable next transition, e.g. "Closes at 11pm" or "Opens at 11am". */
  message: string;
}

/**
 * Compute open/closed status for a given local date/time in Europe/London.
 * Pure function so it can be unit-tested and run on the client.
 */
export function getOpenStatus(now: Date, timeZone = "Europe/London"): OpenStatus {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const weekday = parts.find((p) => p.type === "weekday")?.value as DayOfWeek;
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  const current = hour * 60 + minute;

  const todayIndex = dayOrder.indexOf(weekday);
  const today = periodForDay(weekday);

  // Latest close is midnight (00:00 = end of the same service day), so a service
  // never runs past 24:00 and we only need to look at today's period.
  if (today) {
    const opens = toMinutes(today.opens);
    const closes = today.closes === "00:00" ? 24 * 60 : toMinutes(today.closes);
    if (current >= opens && current < closes) {
      return { isOpen: true, message: `Open now · closes at ${formatTime(today.closes)}` };
    }
    if (current < opens) {
      return { isOpen: false, message: `Closed · opens today at ${formatTime(today.opens)}` };
    }
  }

  const tomorrow = dayOrder[(todayIndex + 1) % 7];
  const next = periodForDay(tomorrow);
  return {
    isOpen: false,
    message: next ? `Closed · opens tomorrow at ${formatTime(next.opens)}` : "Closed",
  };
}
