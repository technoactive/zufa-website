/**
 * Generates llms.txt and llms-full.txt following the llmstxt.org convention:
 *   H1 site name → blockquote summary → free-text facts → H2 sections of "- [title](url): description"
 * llms-full.txt embeds the complete page content so agents can ingest the whole site in one fetch.
 *
 * Everything is derived from the same content modules that render the HTML pages,
 * so the two can never drift apart.
 */
import { absoluteUrl, lunchService, openingHours, site } from "@/content/site";
import { pages, type PageEntry } from "@/content/pages";
import { formatPrice, menus, allergenLabels, dietLabels, type Menu, type MenuItem } from "@/content/menus";
import { offers } from "@/content/offers";
import { cateringFaqs, generalFaqs, privateHireFaqs, type Faq } from "@/content/faqs";
import { catering, privateHire } from "@/content/services";

const LAST_UPDATED = pages.reduce((latest, p) => (p.lastModified > latest ? p.lastModified : latest), "");

function line(items: readonly string[]): string {
  return items.join("\n");
}

function keyFacts(): string {
  return line([
    `- **Type:** Family-run Lebanese restaurant (${site.cuisine.join(", ")}), established in ${site.foundingPlace} in ${site.foundingYear}; London restaurant in Hatch End.`,
    `- **Address:** ${site.address.full}, ${site.address.countryName}.`,
    `- **Coordinates:** ${site.geo.latitude}, ${site.geo.longitude}.`,
    `- **Phone:** ${site.phone.display} (${site.phone.e164}). **WhatsApp:** ${site.whatsapp.display}. **Email:** ${site.email}.`,
    `- **Opening hours:** ${openingHours.map((p) => p.label).join("; ")}. Lunch menu ${lunchService.label}.`,
    `- **Reservations:** online via SevenRooms (${site.reservations.url}) for up to ${site.reservations.maxOnlinePartySize} guests; phone for larger groups; events of more than ${site.reservations.eventPartySize} via private hire.`,
    `- **Takeaway & delivery:** ${site.delivery.map((d) => `${d.name} (${d.url})`).join(", ")}. 20% off first online order.`,
    `- **Private hire capacity:** ${site.capacity.seated} seated / ${site.capacity.standing} standing.`,
    `- **Catering areas:** ${site.cateringAreas.join(", ")} and surrounding areas.`,
    `- **Price range:** ${site.priceRange}. Currency GBP. ${site.serviceCharge}`,
    `- **Features:** fully licensed (Lebanese wines, arak, cocktails), al fresco patio, free Wi-Fi, vegetarian & vegan friendly, allergen information on every dish, belly dancing on selected evenings, corkage-free Mondays.`,
    `- **Instagram:** ${site.social.instagram}`,
    `- **Press:** "${site.press.quote}" — ${site.press.source}.`,
  ]);
}

function pageLink(page: PageEntry): string {
  return `- [${page.title}](${absoluteUrl(page.path)}): ${page.description}`;
}

function groupedPageLinks(): string {
  const sections: PageEntry["section"][] = ["Core", "Menus", "Events & Services", "Company"];
  return sections
    .map((section) => {
      const entries = pages.filter((p) => p.section === section && p.path !== "/privacy-policy");
      return `## ${section}\n\n${entries.map(pageLink).join("\n")}`;
    })
    .join("\n\n");
}

export function buildLlmsTxt(): string {
  return line([
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `Last updated: ${LAST_UPDATED}. Canonical site: ${absoluteUrl("/")}. Full content in one file: ${absoluteUrl("/llms-full.txt")}. Sitemap: ${absoluteUrl("/sitemap.xml")}.`,
    "",
    "## Key facts",
    "",
    keyFacts(),
    "",
    groupedPageLinks(),
    "",
    "## Optional",
    "",
    pageLink(pages.find((p) => p.path === "/privacy-policy")!),
    `- [Menu PDFs](${absoluteUrl("/menu")}): printable PDF versions of the à la carte, set, lunch and kids menus are linked from each menu page.`,
    "",
  ]);
}

/* ------------------------------------------------------------------ */
/* Full content                                                        */
/* ------------------------------------------------------------------ */

function priceOf(item: MenuItem): string {
  if (typeof item.price === "number") return ` — ${formatPrice(item.price)}${item.priceNote ? ` ${item.priceNote}` : ""}`;
  if (Array.isArray(item.price)) return ` — ${item.price.map((v) => `${v.label} ${formatPrice(v.price)}`).join(", ")}`;
  return "";
}

function tagsOf(item: MenuItem): string {
  const parts: string[] = [];
  if (item.diets?.length) parts.push(item.diets.map((d) => dietLabels[d]).join(", "));
  if (item.allergens?.length) parts.push(`Allergens: ${item.allergens.map((a) => allergenLabels[a]).join(", ")}`);
  return parts.length ? ` [${parts.join(" · ")}]` : "";
}

function menuMarkdown(menu: Menu): string {
  const out: string[] = [`### ${menu.title}`, "", `URL: ${absoluteUrl(`/menu/${menu.slug}`)}`, ""];
  if (menu.availability) out.push(`Availability: ${menu.availability}`, "");
  out.push(menu.intro, "");
  for (const section of menu.sections) {
    out.push(`#### ${section.title}`, "");
    if (section.description) out.push(section.description, "");
    for (const item of section.items) {
      const desc = item.description ? `: ${item.description}` : "";
      out.push(`- **${item.name}**${priceOf(item)}${desc}${tagsOf(item)}`);
    }
    out.push("");
  }
  return line(out);
}

function faqMarkdown(title: string, faqs: readonly Faq[]): string {
  return line([`### ${title}`, "", ...faqs.flatMap((f) => [`**Q: ${f.question}**`, "", `A: ${f.answer}`, ""])]);
}

export function buildLlmsFullTxt(): string {
  const p = (path: string) => pages.find((x) => x.path === path)!;

  return line([
    `# ${site.name} — full site content`,
    "",
    `> ${site.description}`,
    "",
    `This file contains the complete public content of ${absoluteUrl("/")} in Markdown for AI assistants and agents. Last updated: ${LAST_UPDATED}. Prices are in GBP and were correct at the time of publication; ${site.serviceCharge}`,
    "",
    "## Key facts",
    "",
    keyFacts(),
    "",
    "## Opening hours",
    "",
    ...openingHours.map((period) => `- ${period.days.join(", ")}: ${period.opens} – ${period.closes === "00:00" ? "00:00 (midnight)" : period.closes}`),
    `- Lunch menu: ${lunchService.days.join(", ")}, ${lunchService.opens} – ${lunchService.closes}`,
    "",
    `## Our story (${absoluteUrl("/our-story")})`,
    "",
    "Zufa’s journey started in Lebanon, in our home town Tannourine, a beautiful village in the mountains of North Lebanon. Our parents opened the family restaurant in 1990 and since then it has been one of the most loved restaurants in North Lebanon. The story continued in London when two brothers pursued their passion for Lebanese food. For years Zufa has offered a mouth-watering selection of Lebanese dishes, all made from scratch using fresh, top-quality ingredients.",
    "",
    `Zufa offers a cosy and charming atmosphere for Lebanese food lovers of all ages. The restaurant is fully licensed and has an al fresco patio for outside dining. Guests can dine in, take away or order online. For special events — birthdays, company get-togethers, engagements, baby showers, hen and stag evenings — the restaurant can be booked for up to ${site.capacity.seated} people seated or ${site.capacity.standing} standing. It is easily accessible by bus and the London Overground (Hatch End station), there is plenty of local parking and free Wi-Fi.`,
    "",
    "Signature experiences: home-made saj bread baked on a traditional domed griddle and served on olive-wood boards from Lebanon; hot mezze served sizzling in handmade clay pans; charcoal-grilled meats marinated overnight.",
    "",
    `## Menus (${absoluteUrl("/menu")})`,
    "",
    p("/menu").description,
    "",
    ...menus.map(menuMarkdown),
    `## What’s on (${absoluteUrl("/whats-on")})`,
    "",
    ...offers.flatMap((offer) => [`### ${offer.title} — ${offer.headline}`, "", `When: ${offer.when}`, "", offer.description, ...(offer.details ? ["", offer.details] : []), ""]),
    `## Bookings (${absoluteUrl("/bookings")})`,
    "",
    p("/bookings").description,
    `Book online: ${site.reservations.url}. Phone: ${site.phone.display}. WhatsApp: ${site.whatsapp.url}.`,
    "",
    `## Takeaway & delivery (${absoluteUrl("/takeaway")})`,
    "",
    p("/takeaway").description,
    ...site.delivery.map((d) => `- ${d.name}: ${d.url}`),
    `- Collection: call ${site.phone.display} with your order.`,
    "",
    `## Catering (${absoluteUrl("/catering")})`,
    "",
    catering.summary,
    "",
    catering.intro,
    "",
    `Areas served: ${catering.areas.join(", ")}, ${catering.areaNote}`,
    "",
    "### Occasions",
    "",
    ...catering.occasions.map((o) => `- **${o.title}:** ${o.text}`),
    "",
    "### How it works",
    "",
    ...catering.steps.map((s, i) => `${i + 1}. **${s.title}.** ${s.text}`),
    "",
    "### Typical catering menu groups",
    "",
    ...catering.menuHighlights.map((g) => `- **${g.title}:** ${g.dishes.join(", ")}.${g.note ? ` ${g.note}` : ""}`),
    "",
    `Pricing: ${catering.pricing}`,
    "",
    `Enquiries: ${absoluteUrl(`${catering.path}#enquire`)}, ${site.phone.display} or WhatsApp ${site.whatsapp.display}.`,
    "",
    faqMarkdown("Catering FAQs", cateringFaqs),
    `## Private hire (${absoluteUrl("/private-hire")})`,
    "",
    privateHire.summary,
    "",
    privateHire.intro,
    "",
    "### What comes with the room",
    "",
    ...privateHire.features.map((f) => `- ${f}`),
    "",
    "### Occasions",
    "",
    ...privateHire.occasions.map((o) => `- **${o.title}:** ${o.text}`),
    "",
    "### How a private event works",
    "",
    ...privateHire.steps.map((s, i) => `${i + 1}. **${s.title}.** ${s.text}`),
    "",
    `Enquiries: ${absoluteUrl(`${privateHire.path}#enquire`)}, ${site.phone.display} or WhatsApp ${site.whatsapp.display}.`,
    "",
    faqMarkdown("Private hire FAQs", privateHireFaqs),
    `## Contact (${absoluteUrl("/contact")})`,
    "",
    `${site.legalName}, ${site.address.full}. Phone ${site.phone.display}. WhatsApp ${site.whatsapp.display}. Email ${site.email}. Google Maps: ${site.maps.google}`,
    "",
    faqMarkdown("General FAQs", generalFaqs),
    `## Privacy (${absoluteUrl("/privacy-policy")})`,
    "",
    p("/privacy-policy").description,
    "",
  ]);
}
