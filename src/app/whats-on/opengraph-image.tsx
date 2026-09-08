import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "What’s On — Zufa, Hatch End";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: "What’s",
    accent: "On",
    subtitle: "Corkage-free Mondays, 2-for-1 cocktails, weekday lunch deals and private parties.",
    image: "/images/feast-table.jpg",
  });
}
