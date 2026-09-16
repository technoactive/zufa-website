import type { Route } from "next";

export const thankYouKinds = ["general", "catering", "private-hire", "newsletter"] as const;
export type ThankYouKind = (typeof thankYouKinds)[number];

export function isThankYouKind(value: string): value is ThankYouKind {
  return (thankYouKinds as readonly string[]).includes(value);
}

export interface ThankYouCopy {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  steps: readonly string[];
  primary: { label: string; href: string };
  secondary: { label: string; href: Route };
  image: { src: string; alt: string };
}

export const thankYouCopy: Record<ThankYouKind, ThankYouCopy> = {
  general: {
    eyebrow: "Message received",
    title: "Thank you — we’ll be",
    accent: "in touch",
    description:
      "A member of the family has your message. We usually reply the same day, or first thing after service if you’ve written in the evening. A confirmation is on its way to your inbox.",
    steps: [
      "Check your inbox for a confirmation from Zufa (and the spam folder, just in case).",
      "We’ll reply to the email you left, or call if you gave us a number.",
      "If it’s urgent, ring or WhatsApp us — the kitchen can take a message during service.",
    ],
    primary: { label: "Book a table", href: "/bookings" },
    secondary: { label: "Back to the menus", href: "/menu" },
    image: { src: "/images/restaurant-interior.jpg", alt: "The dining room at Zufa Hatch End" },
  },
  catering: {
    eyebrow: "Catering enquiry received",
    title: "We’ll come back with a",
    accent: "quote",
    description:
      "Thank you for thinking of Zufa for your event. We’ll be in touch with a few questions and a per-head figure. A confirmation is on its way to your inbox.",
    steps: [
      "Check your inbox for a confirmation from Zufa.",
      "We’ll reply with availability, a suggested spread and a clear price.",
      "The more you can tell us about numbers, the venue and how you’d like to eat, the faster we can quote.",
    ],
    primary: { label: "See typical dishes", href: "/catering" },
    secondary: { label: "Browse the menus", href: "/menu" },
    image: { src: "/images/sharing-table.jpg", alt: "A table of Lebanese sharing dishes at Zufa" },
  },
  "private-hire": {
    eyebrow: "Private hire enquiry received",
    title: "Let’s look at",
    accent: "dates",
    description:
      "Thank you — we’ll check the diary and come back to you personally. A confirmation is on its way to your inbox.",
    steps: [
      "Check your inbox for a confirmation from Zufa.",
      "We’ll confirm whether the date works and talk through how the room eats.",
      "Evenings and weekends go first, especially in December, so the earlier the better.",
    ],
    primary: { label: "See the room", href: "/private-hire" },
    secondary: { label: "What’s on this week", href: "/whats-on" },
    image: { src: "/images/restaurant-interior.jpg", alt: "The dining room at Zufa set for an evening" },
  },
  newsletter: {
    eyebrow: "You’re on the list",
    title: "Welcome to the",
    accent: "table",
    description:
      "Once or twice a month: corkage-free Mondays, what’s on the grill, and the occasional recipe from Tannourine. Never more. A welcome note is in your inbox.",
    steps: [
      "Look for a welcome email from Zufa — add us to your contacts so we don’t land in spam.",
      "You can unsubscribe from any email in one click.",
      "In the meantime, see what’s on this week or book a table.",
    ],
    primary: { label: "See what’s on", href: "/whats-on" },
    secondary: { label: "Book a table", href: "/bookings" },
    image: { src: "/images/dinner-for-two.jpg", alt: "Dinner for two at Zufa with wine" },
  },
};
