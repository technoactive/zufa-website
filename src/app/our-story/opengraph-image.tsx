import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Our Story — Zufa, Hatch End";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: "Our",
    accent: "Story",
    subtitle: "From a family restaurant in Tannourine, North Lebanon (1990) to Hatch End today.",
    image: "/images/dinner-for-two.jpg",
  });
}
