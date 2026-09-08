import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Lebanese Catering — Zufa, Hatch End";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: "Lebanese",
    accent: "Catering",
    subtitle: "Mezze, charcoal grills and saj bread brought to weddings, birthdays and office lunches across Harrow, Pinner, Northwood, Ruislip, Stanmore and Watford.",
    eyebrow: "Lebanese catering · North West London",
    image: "/images/sharing-table.jpg",
  });
}
