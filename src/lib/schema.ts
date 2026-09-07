import type {
  BreadcrumbList,
  FAQPage,
  ItemList,
  Menu as SchemaMenu,
  MenuItem as SchemaMenuItem,
  MenuSection as SchemaMenuSection,
  Offer,
  OpeningHoursSpecification,
  Restaurant,
  RestrictedDiet,
  WebPage,
  WebSite,
  WithContext,
  Thing,
} from "schema-dts";
import { absoluteUrl, openingHours, site, SITE_URL, type DayOfWeek } from "@/content/site";
import { menus, type Menu, type MenuItem } from "@/content/menus";
import type { Faq } from "@/content/faqs";
import type { Offer as SiteOffer } from "@/content/offers";

export const RESTAURANT_ID = `${SITE_URL}/#restaurant`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const dayUrl = (day: DayOfWeek) => `https://schema.org/${day}` as const;

function openingHoursSpecification(): OpeningHoursSpecification[] {
  return openingHours.map((period) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: period.days.map(dayUrl),
    opens: period.opens,
    closes: period.closes === "00:00" ? "23:59" : period.closes,
  }));
}

export function restaurantSchema(): WithContext<Restaurant> {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": RESTAURANT_ID,
    name: site.name,
    alternateName: site.legalName,
    description: site.description,
    url: SITE_URL,
    image: [absoluteUrl("/images/mezze-spread.jpg"), absoluteUrl("/images/dinner-for-two.jpg"), absoluteUrl("/images/restaurant-interior.jpg")],
    logo: absoluteUrl("/brand/zufa-logo-white.png"),
    telephone: site.phone.e164,
    email: site.email,
    priceRange: site.priceRange,
    currenciesAccepted: site.currency,
    paymentAccepted: "Cash, Credit Card, Debit Card",
    servesCuisine: [...site.cuisine],
    acceptsReservations: site.reservations.url,
    hasMenu: absoluteUrl("/menu"),
    foundingDate: String(site.foundingYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    hasMap: site.maps.google,
    openingHoursSpecification: openingHoursSpecification(),
    sameAs: [site.social.instagram],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Outdoor seating", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free Wi-Fi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Fully licensed bar", value: true },
      { "@type": "LocationFeatureSpecification", name: "Private hire", value: true },
      { "@type": "LocationFeatureSpecification", name: "Takeaway", value: true },
      { "@type": "LocationFeatureSpecification", name: "Delivery", value: true },
    ],
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: site.reservations.url,
        actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"],
      },
      result: { "@type": "FoodEstablishmentReservation", name: "Table reservation at Zufa" },
    },
  };
}

export function websiteSchema(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: site.name,
    description: site.description,
    inLanguage: "en-GB",
    publisher: { "@id": RESTAURANT_ID },
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: readonly Crumb[]): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function webPageSchema(input: { path: string; title: string; description: string; image?: string }): WithContext<WebPage> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(input.path)}#webpage`,
    url: absoluteUrl(input.path),
    name: input.title,
    description: input.description,
    inLanguage: "en-GB",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": RESTAURANT_ID },
    ...(input.image ? { primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(input.image) } } : {}),
  };
}

export function faqSchema(faqs: readonly Faq[]): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** What's On: every recurring offer and event as an ItemList of schema.org Offers. */
export function offersSchema(items: readonly SiteOffer[], path = "/whats-on"): WithContext<ItemList> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${absoluteUrl(path)}#offers`,
    name: `What’s on at ${site.name}`,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: items.length,
    itemListElement: items.map((offer, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Offer",
        "@id": `${absoluteUrl(path)}#${offer.id}`,
        name: offer.headline,
        description: [offer.description, offer.details].filter(Boolean).join(" "),
        url: absoluteUrl(`${path}#${offer.id}`),
        availability: "https://schema.org/InStock",
        availableAtOrFrom: { "@id": RESTAURANT_ID },
        offeredBy: { "@id": RESTAURANT_ID },
        ...(offer.image ? { image: absoluteUrl(offer.image.src) } : {}),
      },
    })),
  };
}

function dietsFor(item: MenuItem): RestrictedDiet[] | undefined {
  const diets: RestrictedDiet[] = [];
  if (item.diets?.includes("vegan")) diets.push("https://schema.org/VeganDiet", "https://schema.org/VegetarianDiet");
  else if (item.diets?.includes("vegetarian")) diets.push("https://schema.org/VegetarianDiet");
  return diets.length ? diets : undefined;
}

function offersFor(item: MenuItem): Offer | Offer[] | undefined {
  if (typeof item.price === "number") {
    return { "@type": "Offer", price: item.price.toFixed(2), priceCurrency: site.currency, availability: "https://schema.org/InStock" };
  }
  if (Array.isArray(item.price)) {
    return item.price.map((variant) => ({
      "@type": "Offer",
      name: variant.label,
      price: variant.price.toFixed(2),
      priceCurrency: site.currency,
      availability: "https://schema.org/InStock",
    }));
  }
  return undefined;
}

function menuItemSchema(item: MenuItem): SchemaMenuItem {
  const offers = offersFor(item);
  const suitableForDiet = dietsFor(item);
  return {
    "@type": "MenuItem",
    name: item.name,
    ...(item.description ? { description: item.description } : {}),
    ...(offers ? { offers } : {}),
    ...(suitableForDiet ? { suitableForDiet } : {}),
  };
}

export function menuSchema(menu: Menu): WithContext<SchemaMenu> {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${absoluteUrl(`/menu/${menu.slug}`)}#menu`,
    url: absoluteUrl(`/menu/${menu.slug}`),
    name: `${site.name} ${menu.title}`,
    description: menu.summary,
    inLanguage: "en-GB",
    ...(menu.availability ? { offers: { "@type": "Offer", availability: "https://schema.org/InStock", description: menu.availability } } : {}),
    hasMenuSection: menu.sections.map<SchemaMenuSection>((section) => ({
      "@type": "MenuSection",
      name: section.title,
      ...(section.description ? { description: section.description } : {}),
      hasMenuItem: section.items.map(menuItemSchema),
    })),
    provider: { "@id": RESTAURANT_ID },
  };
}

/** All menus as a compact list, referenced from the /menu hub. */
export function menuHubSchema(): WithContext<Thing>[] {
  return menus.map((menu) => ({
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${absoluteUrl(`/menu/${menu.slug}`)}#menu`,
    url: absoluteUrl(`/menu/${menu.slug}`),
    name: `${site.name} ${menu.title}`,
    description: menu.summary,
    provider: { "@id": RESTAURANT_ID },
  }));
}
