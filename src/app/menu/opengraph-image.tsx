import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Our Menus — Zufa, Hatch End";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: "Our",
    accent: "Menus",
    subtitle: "À la carte, set menus, lunch, kids, desserts and drinks — every dish with prices and allergens.",
    image: "/images/feast-table.jpg",
  });
}
