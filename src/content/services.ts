/**
 * Catering and private hire — the two services we most want the site to sell.
 *
 * Everything here is rendered on the pages, emitted as JSON-LD (FoodService /
 * EventVenue) and serialised into llms-full.txt, so keep it factual: numbers,
 * areas and dishes all come from site.ts and menus.ts.
 */

import { site } from "./site";

export interface ServiceStep {
  title: string;
  text: string;
}

export interface ServiceOccasion {
  title: string;
  text: string;
}

export interface MenuHighlight {
  title: string;
  dishes: readonly string[];
  note?: string;
}

export interface ServiceFact {
  value: string;
  label: string;
}

/* ------------------------------------------------------------------ */
/* Catering                                                            */
/* ------------------------------------------------------------------ */

export const catering = {
  path: "/catering",
  name: "Zufa Lebanese Catering",
  serviceType: "Lebanese catering",
  /** One line used in schema and llms.txt. */
  summary:
    "Lebanese catering from Zufa in Hatch End: mezze, charcoal grills, saj wraps and desserts cooked from scratch and brought to weddings, birthdays, family gatherings and office lunches across Northwood, Pinner, Ruislip, Harrow, Stanmore, Watford and the surrounding areas.",
  intro:
    "The same kitchen that feeds the restaurant every night can feed your wedding, your parents’ anniversary or Tuesday’s board lunch. We bring the food, the equipment and thirty-odd years of doing this, and set it out wherever you are.",
  facts: [
    { value: String(site.foundingYear), label: "Family recipes from Tannourine, cooked in Hatch End" },
    { value: String(site.cateringAreas.length) + "+", label: "Towns we cater across North West London and Herts" },
    { value: "100%", label: "Made from scratch on the day of your event" },
    { value: "★★★★★", label: `Reviewed by the ${site.press.source}` },
  ] as const satisfies readonly ServiceFact[],
  steps: [
    {
      title: "Tell us about the day",
      text: "The date, a rough head count, where it’s happening and how you’d like people to eat: a long mezze table, plated courses, a grill station, or boxes for a working lunch. If you don’t know yet, say so. Most people don’t at this stage.",
    },
    {
      title: "We put a menu together",
      text: "You get back a menu and a per-head price built around your guests, with vegetarian, vegan and allergy-aware dishes included as a matter of course rather than as an afterthought. Change as much of it as you like.",
    },
    {
      title: "We cook it, bring it and set it out",
      text: "Everything is made in our Hatch End kitchen that day and driven to you with the equipment it needs to arrive looking and tasting as it should. You look after your guests; we look after the table.",
    },
  ] as const satisfies readonly ServiceStep[],
  occasions: [
    {
      title: "Weddings and engagements",
      text: "Lebanese food was made for a wedding. It feeds a room generously and nobody has to choose one dish. Rows of cold mezze to start, hot pastries from the oven, then platters of shish taouk, kafta and lamb cutlets from the charcoal grill, and baklawa with the coffee.",
    },
    {
      title: "Birthdays and family gatherings",
      text: "Milestone birthdays, christenings, Eid and Christmas lunches, anniversaries, or simply the whole family under one roof for a Sunday. We size the menu to your numbers and cook it fresh on the day.",
    },
    {
      title: "Office lunches and corporate events",
      text: "Board lunches, team days, client meetings, product launches and Christmas parties for offices in Harrow, Watford and along the Metropolitan line. Individual wraps and salad boxes when people are eating at their desks; a full mezze spread when there’s time to sit down.",
    },
    {
      title: "Community and religious celebrations",
      text: "Iftar and Eid, christenings and communions, church and temple events, school fundraisers. Tell us what the occasion calls for, from what goes in the food to when it needs to be on the table, and we’ll build around it.",
    },
  ] as const satisfies readonly ServiceOccasion[],
  menuHighlights: [
    {
      title: "Cold mezze",
      dishes: ["Hommos", "Moutabbal", "Tabbouleh", "Fattoush", "Warak enab", "Muhammara", "Mixed olives and pickles"],
      note: "Every cold mezze on our menu is vegetarian and most are vegan.",
    },
    {
      title: "Hot mezze and pastries",
      dishes: ["Falafel", "Cheese rikakat", "Spinach fatayer", "Lamb sambousek", "Kebbeh", "Jawaneh", "Arayes", "Sojok"],
    },
    {
      title: "From the charcoal grill",
      dishes: ["Shish taouk", "Kafta meshwi", "Lahm meshwi", "Farrouj meshwi", "Lamb cutlets", "Vegetarian mixed grill", "Lamb shank with lamb rice"],
    },
    {
      title: "Wraps and saj for working lunches",
      dishes: ["Chicken, lamb or mixed shawarma wrap", "Shish taouk wrap", "Falafel wrap", "Halloumi wrap", "Zaatar and cheese saj"],
      note: "Boxed individually with a salad when people are eating at their desks.",
    },
    {
      title: "Desserts and coffee",
      dishes: ["Baklawa", "Knefeh", "Osmaliyeh", "Atayef", "Gluten-free honey cake", "Lebanese coffee with cardamom"],
    },
  ] satisfies readonly MenuHighlight[] as readonly MenuHighlight[],
  pricing:
    "Catering is quoted per head. As a guide, in the restaurant our Group Menu is £36.75 per person and the Tasting Menu £46.75; a catering price depends on your numbers, the dishes you pick and how far we’re travelling, so ask and we’ll come back with a figure rather than a range.",
  areas: site.cateringAreas,
  areaNote: "plus the surrounding parts of North West London and Hertfordshire. Further afield? Ask. We’ve driven further for less.",
} as const;

/* ------------------------------------------------------------------ */
/* Private hire                                                        */
/* ------------------------------------------------------------------ */

export const privateHire = {
  path: "/private-hire",
  name: "Zufa private hire",
  serviceType: "Private venue hire",
  summary: `Hire Zufa in Hatch End for birthdays, engagements, baby showers, hen and stag nights and company parties: up to ${site.capacity.seated} guests seated or ${site.capacity.standing} standing, a licensed bar with Lebanese wines and cocktails, an al fresco patio and belly dancing on request.`,
  intro: `On the nights you take over the restaurant, it’s yours: the dining room, the patio, the bar and the kitchen behind it. Up to ${site.capacity.seated} people sit down to a proper Lebanese spread, or ${site.capacity.standing} stand with a glass of Ksara and a plate of mezze. Hatch End Overground is a short walk and there’s parking on the street.`,
  facts: [
    { value: String(site.capacity.seated), label: "Guests seated around shared tables" },
    { value: String(site.capacity.standing), label: "Guests standing for a reception" },
    { value: "7", label: "Days a week, lunch or evening" },
    { value: String(site.foundingYear), label: "The year our parents opened in Tannourine" },
  ] as const satisfies readonly ServiceFact[],
  features: [
    "Fully licensed bar: Lebanese wines, arak, Almaza and house cocktails",
    "Al fresco patio for summer parties and a breath of air between courses",
    "Live belly dancing arranged for your night",
    "Set menus from £36.75 per person, or à la carte for smaller parties",
    "Vegetarian, vegan and allergen information on every dish",
    "Kids menu for family celebrations",
    "Free Wi-Fi and space for a speech, a cake and a playlist",
    "Hatch End Overground and buses on the doorstep; plenty of local parking",
  ] as const,
  occasions: [
    {
      title: "Birthdays",
      text: "Eighteenths to eightieths. One long table for thirty, or the whole room for sixty with the grill working all night. Bring the cake; we’ll bring it out with the coffee.",
    },
    {
      title: "Engagements and anniversaries",
      text: "Two families meeting over a shared table is the most Lebanese thing there is. Mezze does the introductions while the grill gets going.",
    },
    {
      title: "Hen and stag nights",
      text: "Cocktails from the bar, sharing platters that keep coming, and a belly dancer who will absolutely pull the bride-to-be up to dance.",
    },
    {
      title: "Baby showers and christenings",
      text: "Daytime hire with the patio doors open, mocktails alongside the wine, and a menu that suits grandparents and toddlers alike.",
    },
    {
      title: "Company get-togethers",
      text: "Team dinners, client evenings and the Christmas party for offices around Harrow, Pinner and Watford. Set menus keep the bill predictable; the room keeps everyone talking.",
    },
    {
      title: "Eid, Christmas and family feasts",
      text: "Big family celebrations where the table needs to be long, the food needs to keep coming and nobody wants to do the washing up.",
    },
  ] as const satisfies readonly ServiceOccasion[],
  steps: [
    {
      title: "Pick a date and tell us your numbers",
      text: "Evenings and weekends go first, especially in December, so the earlier you call the more choice you have. We’ll tell you straight away whether the date works.",
    },
    {
      title: "Choose how the table eats",
      text: "For most parties one of our set menus is the easiest: the Group Menu (£36.75 a head) brings hommos, moutabbal, tabbouleh, rikakat, jawaneh and samke harra, then shish taouk, kafta and mixed shawarma. The Tasting Menu (£46.75) adds warak enab, sojok, kebbeh and falafel and lets each guest choose their main. Smaller parties can order à la carte.",
    },
    {
      title: "Sort the drinks and the extras",
      text: "Wines from Château Ksara, Musar and Belle-Vue, arak, Almaza, our own cocktails and mocktails for anyone driving. Ask about a belly dancing show, a playlist of your own or a cake we can plate for you.",
    },
  ] as const satisfies readonly ServiceStep[],
  gallery: [
    { src: "/images/restaurant-interior.jpg", alt: "The dining room at Zufa set for an evening, with the bar lit behind" },
    { src: "/images/feast-table.jpg", alt: "A long table of Lebanese sharing dishes at a private party at Zufa" },
    { src: "/images/belly-dancer.jpg", alt: "A belly dancer performing between the tables at a private event at Zufa" },
    { src: "/images/dinner-for-two.jpg", alt: "Wine and chargrilled dishes on a table at Zufa" },
  ] as const,
} as const;

export const services = [catering, privateHire] as const;
