/**
 * The towns around Hatch End that Zufa serves — used for the catering "where we
 * cater" section, the "getting here from…" directions on the contact page and
 * the location FAQ.
 *
 * Keep every claim checkable: distances and times are approximate road/rail
 * figures from 308 Uxbridge Road, HA5 4HR. Don't invent venues or past events.
 */

import type { site } from "./site";

export type AreaName = (typeof site.cateringAreas)[number];

export interface Area {
  name: AreaName;
  /** Approximate drive time from the restaurant, in minutes. */
  driveMinutes: number;
  /** Approximate road distance, in miles. */
  miles: number;
  /** What catering in this area typically looks like — one or two sentences. */
  catering: string;
  /** How to get to the restaurant from here. */
  gettingHere: string;
}

export const areas: readonly Area[] = [
  {
    name: "Pinner",
    driveMinutes: 5,
    miles: 1,
    catering:
      "Our nearest neighbour. Garden parties, milestone birthdays at home and gatherings in the village halls — the food leaves our kitchen and is on your table within minutes.",
    gettingHere:
      "Five minutes by car up the Uxbridge Road. From Pinner station (Metropolitan line) the H12 bus stops outside, or it is a pleasant twenty-minute walk.",
  },
  {
    name: "Harrow",
    driveMinutes: 10,
    miles: 3,
    catering:
      "Board lunches and team days for offices around Harrow town centre, family celebrations in Harrow on the Hill, North Harrow and Harrow Weald, and school and community events.",
    gettingHere:
      "Ten minutes by car. From Harrow & Wealdstone, the London Overground reaches Hatch End in two stops; the H12 bus also runs from Harrow Weald.",
  },
  {
    name: "Northwood",
    driveMinutes: 10,
    miles: 3,
    catering:
      "Home celebrations, anniversaries and Sunday family lunches in Northwood and Northwood Hills, with the mezze set out as you would see it in the restaurant.",
    gettingHere: "About ten minutes by car via Pinner. A taxi from Northwood or Northwood Hills station is quick and inexpensive.",
  },
  {
    name: "Ruislip",
    driveMinutes: 15,
    miles: 4,
    catering: "Weddings, engagement parties and big family occasions across Ruislip, Ruislip Manor and Eastcote, cooked that morning and driven over hot.",
    gettingHere: "Around fifteen minutes by car through Eastcote and Pinner. By train, change at Harrow & Wealdstone for the Overground to Hatch End.",
  },
  {
    name: "Stanmore",
    driveMinutes: 12,
    miles: 4,
    catering: "Private parties, community and religious celebrations, and office lunches for businesses along the Uxbridge Road towards Stanmore.",
    gettingHere: "Twelve minutes by car along the Uxbridge Road. The H12 bus runs directly from Stanmore station to Hatch End.",
  },
  {
    name: "Watford",
    driveMinutes: 15,
    miles: 5,
    catering:
      "Corporate events and Christmas parties for Watford offices, wedding receptions in marquees and halls, and family gatherings across the Hertfordshire border.",
    gettingHere:
      "Fifteen minutes by car. The London Overground runs directly from Watford Junction and Watford High Street to Hatch End in about ten minutes — no changes.",
  },
  {
    name: "Bushey",
    driveMinutes: 10,
    miles: 3,
    catering: "Birthdays, christenings and anniversaries at home or in local halls in Bushey and Bushey Heath, close enough that everything arrives as it left the kitchen.",
    gettingHere: "Ten minutes by car. Bushey station is two Overground stops from Hatch End, around five minutes on the train.",
  },
  {
    name: "Uxbridge",
    driveMinutes: 25,
    miles: 7,
    catering: "Office catering for Uxbridge business parks, and weddings and celebrations across Hillingdon, Ickenham and Hayes — a longer drive, but a regular one.",
    gettingHere: "Around twenty-five minutes by car. By Underground, take the Metropolitan line to Pinner and the H12 bus, or a taxi, from there.",
  },
];

export function getArea(name: AreaName): Area {
  const area = areas.find((a) => a.name === name);
  if (!area) throw new Error(`Unknown area: ${name}`);
  return area;
}

/** "5 minutes from Pinner, 10 from Harrow and Watford" style summary for prose. */
export const nearbySummary = "five minutes from Pinner, ten from Harrow and Northwood, and a quarter of an hour from Watford and Ruislip";
