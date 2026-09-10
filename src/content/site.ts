/**
 * Single source of truth for business facts.
 * Every page, JSON-LD block, sitemap entry and llms.txt line derives from here,
 * so a change in one place propagates everywhere.
 */

const DEFAULT_SITE_URL = "https://zufa.co.uk";

/**
 * Canonical origin. Falls back to the production domain when NEXT_PUBLIC_SITE_URL
 * is unset, empty (as hosting dashboards often leave it) or not an absolute URL.
 */
function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return DEFAULT_SITE_URL;
  try {
    return new URL(raw).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const SITE_URL = resolveSiteUrl();

export const site = {
  name: "Zufa",
  legalName: "Zufa Lebanese Cuisine",
  tagline: "Authentic Lebanese Cuisine in Hatch End",
  description:
    "Zufa is a family-run Lebanese restaurant in Hatch End, North West London. Fresh mezze, chargrilled meats, home-made saj bread, Lebanese wines and cocktails — dine in, takeaway, catering and private hire.",
  foundingYear: 1990,
  foundingPlace: "Tannourine, North Lebanon",
  cuisine: ["Lebanese", "Middle Eastern", "Mediterranean"],
  priceRange: "££",
  currency: "GBP",
  locale: "en_GB",
  language: "en-GB",
  timeZone: "Europe/London",

  phone: {
    display: "0208 421 6821",
    e164: "+442084216821",
  },
  whatsapp: {
    display: "07719 328 552",
    e164: "+447719328552",
    url: "https://wa.me/447719328552",
  },
  email: "info@zufa.co.uk",

  address: {
    street: "308 Uxbridge Road",
    locality: "Hatch End",
    region: "Greater London",
    postalCode: "HA5 4HR",
    country: "GB",
    countryName: "United Kingdom",
    /** Human-readable single-line form. */
    full: "308 Uxbridge Road, Hatch End, London HA5 4HR",
  },

  geo: {
    latitude: 51.6079905,
    longitude: -0.3742598,
  },

  maps: {
    google: "https://www.google.com/maps/search/?api=1&query=Zufa+308+Uxbridge+Road+Hatch+End+HA5+4HR",
    apple: "https://maps.apple.com/?q=Zufa&address=308+Uxbridge+Road,+Hatch+End,+HA5+4HR",
    directions: "https://www.google.com/maps/dir/?api=1&destination=Zufa%2C+308+Uxbridge+Road%2C+Hatch+End+HA5+4HR",
  },

  social: {
    instagram: "https://www.instagram.com/zufa.restaurants/",
    instagramHandle: "@zufa.restaurants",
  },

  reservations: {
    provider: "SevenRooms",
    venueId: "zufahatchend",
    url: "https://www.sevenrooms.com/explore/zufahatchend/reservations/create/search/",
    /** Embedded widget — mirrors the venue list configured on the previous site. */
    embedUrl: "https://www.sevenrooms.com/explore/zufahatchend/reservations/create/search/?venues=zufahatchend,fireandice",
    /** Above this party size guests are asked to phone. */
    maxOnlinePartySize: 8,
    /** Above this party size an event booking is required. */
    eventPartySize: 12,
  },

  /** Direct online ordering (collection and delivery), embedded on /takeaway. Carried over from the previous site. */
  ordering: {
    provider: "Flipdish",
    /** Flipdish white-label restaurant identifier. */
    restaurantId: "fd20235",
    pluginVersion: "1.5.2",
    script: "https://web-order.flipdish.co/client/productionwlbuild/latest/static/js/main.js",
  },

  delivery: [
    {
      name: "Deliveroo",
      url: "https://deliveroo.co.uk/menu/london/hatch-end/zufa-restaurant-hatch-end",
      logo: "/brand/deliveroo-logo.png",
    },
    {
      name: "Uber Eats",
      url: "https://www.ubereats.com/gb/store/zufa-hatch-end/rBX2N6-DShu3UBpswttGkg",
      logo: "/brand/uber-eats-logo.png",
    },
    {
      name: "Just Eat",
      url: "https://www.just-eat.co.uk/restaurants-zufa-hatch-end-pinner/menu",
      logo: "/brand/just-eat-logo.png",
    },
  ],

  capacity: {
    seated: 60,
    standing: 80,
  },

  serviceCharge: "A 12.5% discretionary service charge is added to your bill.",

  cateringAreas: ["Northwood", "Pinner", "Ruislip", "Harrow", "Stanmore", "Watford"],

  analytics: {
    gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-KZKNT733Z9",
  },

  press: {
    quote:
      "Everything you'd expect to find at their restaurant in Lebanon you'll also find here: top-quality ingredients, a large choice of authentic, appetising dishes, and Lebanese hospitality at its finest.",
    source: "London Evening Standard",
    articlePdf: "/press/evening-standard-review.pdf",
  },
} as const;

export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface OpeningPeriod {
  days: readonly DayOfWeek[];
  /** 24h "HH:MM" */
  opens: string;
  /** 24h "HH:MM" — "00:00" means midnight (end of the same service day). */
  closes: string;
  label: string;
}

export const openingHours: readonly OpeningPeriod[] = [
  {
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
    opens: "11:00",
    closes: "23:00",
    label: "Sunday – Thursday: 11am – 11pm",
  },
  {
    days: ["Friday", "Saturday"],
    opens: "11:00",
    closes: "00:00",
    label: "Friday – Saturday: 11am – Midnight",
  },
] as const;

export const lunchService = {
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] satisfies DayOfWeek[],
  opens: "12:00",
  closes: "17:00",
  label: "Monday – Friday, 12pm – 5pm",
} as const;

export const navigation = {
  primary: [
    { href: "/menu", label: "Menu" },
    { href: "/bookings", label: "Bookings" },
    { href: "/takeaway", label: "Takeaway" },
    { href: "/whats-on", label: "What’s On" },
  ],
  secondary: [
    { href: "/our-story", label: "Our Story" },
    { href: "/catering", label: "Catering" },
    { href: "/private-hire", label: "Private Hire" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [{ href: "/privacy-policy", label: "Privacy & Cookie Policy" }],
} as const;

/** Absolute URL helper — keeps every canonical/OG/sitemap URL consistent. */
export function absoluteUrl(path: string = "/"): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
