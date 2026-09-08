import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Zufa, delivered — Zufa, Hatch End";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: "Zufa,",
    accent: "delivered",
    subtitle: "Order collection or delivery on this website — 20% off your first order here. Or use Deliveroo, Uber Eats and Just Eat.",
    image: "/images/dishes-detail.webp",
  });
}
