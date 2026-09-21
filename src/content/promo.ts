/**
 * Site-wide promotional card (the small slide-in at the bottom of the page).
 *
 * To run a different campaign, change `id` (so visitors who dismissed the old
 * one see the new one) and the copy below. Set `enabled: false` to switch it
 * off without deleting it.
 */

import { breakfastService } from "./site";
import { offers } from "./offers";

const breakfast = offers.find((offer) => offer.id === "breakfast");

export const promo = {
  enabled: true,
  /** Bump when the campaign changes so earlier dismissals no longer apply. */
  id: "breakfast-wed-sun-2026-09",
  eyebrow: "Now five days a week",
  title: "Breakfast, the Lebanese way",
  body: "Manakish from the oven, foul, labneh and Lebanese eggs — or eggs Benedict, pain perdu and pancakes, with fresh juices and Lebanese coffee.",
  badge: breakfastService.label,
  cta: { label: "See the breakfast menu", href: breakfast?.cta.href ?? "/menu/breakfast" },
  secondary: { label: "Book a table", href: "/bookings" },
  /** Seconds on the page before the card appears (scrolling a third of the way shows it sooner). */
  delaySeconds: 6,
  /** How long a dismissal is remembered. */
  dismissDays: 14,
  /** Longer memory when the visitor actually clicks through. */
  convertedDays: 30,
  /** Never show on these paths (prefix match): the destination itself and pages where people are mid-transaction. */
  excludePaths: ["/menu/breakfast", "/bookings", "/takeaway", "/thank-you", "/privacy-policy"],
} as const;
