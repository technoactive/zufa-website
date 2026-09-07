import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Zufa — Authentic Lebanese Cuisine in Hatch End";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: "Authentic Lebanese",
    accent: "Cuisine",
    subtitle: "Fresh mezze, charcoal grills and warm Lebanese hospitality in Hatch End, North West London.",
    image: "/images/mezze-spread.jpg",
  });
}
