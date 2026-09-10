import type { DayOfWeek } from "./site";

export type OfferKind = "offer" | "experience";

export interface Offer {
  id: string;
  /** Regular deals vs. events and occasions — drives grouping on the What’s On page. */
  kind: OfferKind;
  title: string;
  /** Compact label for chips and planners, e.g. “2-for-1 cocktails”. Falls back to `title`. */
  short?: string;
  headline: string;
  description: string;
  when: string;
  /** Days the offer runs on — omit for “selected dates” or always-on offers. */
  days?: readonly DayOfWeek[];
  /** Short time window shown in the week planner, e.g. “12pm – 7pm”. */
  hours?: string;
  /** Headline figure for the offer card, e.g. { value: "2 for 1", label: "on every cocktail" }. */
  stat?: { value: string; label: string };
  image?: { src: string; alt: string };
  /** Internal path, external URL or tel: link — rendered through <Button>. */
  cta: { label: string; href: string };
  /** Additional detail sentences used in llms-full.txt and FAQ answers. */
  details?: string;
}

const weekdays: readonly DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export const offers: readonly Offer[] = [
  {
    id: "byo-monday",
    kind: "offer",
    title: "Monday Offer",
    short: "BYO wine, £0 corkage",
    headline: "Corkage-free Mondays — bring your own wine",
    description:
      "Every Monday we waive corkage entirely. Bring a bottle you love, we’ll bring the mezze and the glasses.",
    when: "Every Monday, all day",
    days: ["Monday"],
    hours: "All day",
    stat: { value: "£0", label: "corkage on your own wine" },
    image: { src: "/images/dinner-for-two.jpg", alt: "Dinner for two at Zufa with a glass of red and white wine" },
    cta: { label: "Book a Monday table", href: "/bookings" },
    details: "Bring-your-own applies to wine only and is available for dine-in guests on Mondays.",
  },
  {
    id: "cocktails-241",
    kind: "offer",
    title: "2-for-1 Cocktails",
    short: "2-for-1 cocktails",
    headline: "Two-for-one on all cocktails",
    description:
      "Zaatarita, PoMojito, Espresso Martini and the rest of the list — two for the price of one, Monday to Friday afternoons and early evenings.",
    when: "Monday – Friday, 12pm – 7pm",
    days: weekdays,
    hours: "12pm – 7pm",
    stat: { value: "2 for 1", label: "on every cocktail" },
    cta: { label: "See the cocktail list", href: "/menu/drinks" },
    details: "Applies to signature and classic cocktails ordered together, dine-in only.",
  },
  {
    id: "lunch",
    kind: "offer",
    title: "Lunch Offer",
    short: "Lunch deal £15.95",
    headline: "Two-course lunch for £15.95",
    description:
      "Choose a starter and a main from our weekday lunch menu, or grab a Lebanese wrap with fries or salad from £9.99.",
    when: "Monday – Friday, 12pm – 5pm",
    days: weekdays,
    hours: "12pm – 5pm",
    stat: { value: "£15.95", label: "for two courses" },
    cta: { label: "View the lunch menu", href: "/menu/lunch" },
    details: "Add baklawa and a hot drink to the two-course lunch for £4.50.",
  },
  {
    id: "first-order",
    kind: "offer",
    title: "20% Off Your First Order",
    short: "20% off, first website order",
    headline: "20% off your first order on this website",
    description:
      "Order collection or delivery through the form on our takeaway page and your first order is 20% off. The discount is only for orders placed here — it does not apply on Deliveroo, Uber Eats or Just Eat.",
    when: "First order placed on this website",
    stat: { value: "20%", label: "off your first order on this site" },
    cta: { label: "Order on this website", href: "/takeaway#order-online" },
  },
  {
    id: "private-hire",
    kind: "experience",
    title: "Private Hire",
    headline: "Celebrate your special occasion at Zufa",
    description:
      "Birthdays, engagements, baby showers, hen and stag nights and company get-togethers — our restaurant can be booked for up to 60 seated or 80 standing guests.",
    when: "Available seven days a week",
    image: { src: "/images/restaurant-interior.jpg", alt: "The dining room at Zufa set for an evening service" },
    cta: { label: "Enquire about private hire", href: "/private-hire" },
  },
];

export const regularOffers = offers.filter((offer) => offer.kind === "offer");
export const experiences = offers.filter((offer) => offer.kind === "experience");
export const getOffer = (id: string): Offer | undefined => offers.find((offer) => offer.id === id);
