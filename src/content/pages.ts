import type { MetadataRoute } from "next";
import { menus } from "./menus";

export interface PageEntry {
  path: string;
  title: string;
  description: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
  /** ISO date of last substantive content change (kept static so prerendering stays deterministic). */
  lastModified: string;
  image?: string;
  section: "Core" | "Menus" | "Events & Services" | "Company";
}

const CONTENT_UPDATED = "2026-09-07";

export const pages: readonly PageEntry[] = [
  {
    path: "/",
    title: "Zufa — Authentic Lebanese Restaurant in Hatch End",
    description:
      "Family-run Lebanese restaurant in Hatch End, London. Fresh mezze, chargrilled meats, saj bread, Lebanese wines and cocktails. Book a table, order takeaway or enquire about catering and private hire.",
    changeFrequency: "weekly",
    priority: 1,
    lastModified: CONTENT_UPDATED,
    image: "/images/mezze-spread.jpg",
    section: "Core",
  },
  {
    path: "/menu",
    title: "Menus",
    description:
      "Explore every Zufa menu: à la carte, set menus and sharing platters, weekday lunch, kids, desserts and drinks — all with prices and allergen information.",
    changeFrequency: "monthly",
    priority: 0.9,
    lastModified: CONTENT_UPDATED,
    image: "/images/feast-table.jpg",
    section: "Menus",
  },
  ...menus.map<PageEntry>((menu) => ({
    path: `/menu/${menu.slug}`,
    title: menu.title,
    description: menu.summary,
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: CONTENT_UPDATED,
    image: menu.image,
    section: "Menus",
  })),
  {
    path: "/bookings",
    title: "Book a Table",
    description:
      "Reserve a table at Zufa Hatch End online in seconds, or call 0208 421 6821 for groups of more than eight.",
    changeFrequency: "monthly",
    priority: 0.9,
    lastModified: CONTENT_UPDATED,
    image: "/images/restaurant-interior.jpg",
    section: "Core",
  },
  {
    path: "/takeaway",
    title: "Takeaway & Delivery",
    description:
      "Order Zufa Lebanese food for collection or delivery in Hatch End, Pinner and Harrow via Deliveroo, Uber Eats and Just Eat. 20% off your first online order.",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: CONTENT_UPDATED,
    image: "/images/dishes-detail.webp",
    section: "Core",
  },
  {
    path: "/whats-on",
    title: "What’s On",
    description:
      "Offers and events at Zufa: corkage-free Mondays, 2-for-1 cocktails Monday to Friday, weekday lunch deals, belly dancing nights and private parties.",
    changeFrequency: "weekly",
    priority: 0.8,
    lastModified: CONTENT_UPDATED,
    image: "/images/belly-dancer.jpg",
    section: "Events & Services",
  },
  {
    path: "/catering",
    title: "Lebanese Catering",
    description:
      "Zufa brings authentic Lebanese catering to weddings, birthdays, family gatherings and corporate events across Northwood, Pinner, Ruislip, Harrow, Stanmore and Watford.",
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: CONTENT_UPDATED,
    image: "/images/sharing-table.jpg",
    section: "Events & Services",
  },
  {
    path: "/private-hire",
    title: "Private Hire",
    description:
      "Hire Zufa for birthdays, engagements, baby showers and company events — up to 60 seated or 80 standing in the heart of Hatch End.",
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: CONTENT_UPDATED,
    image: "/images/restaurant-interior.jpg",
    section: "Events & Services",
  },
  {
    path: "/our-story",
    title: "Our Story",
    description:
      "From a family restaurant opened in Tannourine, North Lebanon in 1990 to Hatch End today — the story of Zufa and the brothers behind it.",
    changeFrequency: "yearly",
    priority: 0.6,
    lastModified: CONTENT_UPDATED,
    image: "/images/dinner-for-two.jpg",
    section: "Company",
  },
  {
    path: "/contact",
    title: "Contact & Find Us",
    description:
      "Zufa, 308 Uxbridge Road, Hatch End HA5 4HR. Opening hours, phone, WhatsApp, email and directions.",
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: CONTENT_UPDATED,
    section: "Company",
  },
  {
    path: "/privacy-policy",
    title: "Privacy & Cookie Policy",
    description: "How Zufa collects, uses and protects your personal data, and how we use cookies.",
    changeFrequency: "yearly",
    priority: 0.2,
    lastModified: CONTENT_UPDATED,
    section: "Company",
  },
];

export function getPage(path: string): PageEntry | undefined {
  return pages.find((p) => p.path === path);
}
