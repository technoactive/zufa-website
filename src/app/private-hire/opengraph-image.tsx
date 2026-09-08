import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Private Hire — Zufa, Hatch End";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: "Private",
    accent: "Hire",
    subtitle: "The whole restaurant for your party: up to 60 seated or 80 standing, licensed bar, patio and belly dancing. Hatch End, minutes from Pinner and Harrow.",
    eyebrow: "Private hire · Party venue · Hatch End",
    image: "/images/restaurant-interior.jpg",
  });
}
