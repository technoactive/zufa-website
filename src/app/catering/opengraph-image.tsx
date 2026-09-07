import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Lebanese Catering — Zufa, Hatch End";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: "Lebanese",
    accent: "Catering",
    subtitle: "Weddings, birthdays and corporate events across Northwood, Pinner, Ruislip, Harrow, Stanmore and Watford.",
    image: "/images/sharing-table.jpg",
  });
}
