import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Zufa, delivered — Zufa, Hatch End";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: "Zufa,",
    accent: "delivered",
    subtitle: "Order for collection or delivery via Deliveroo, Uber Eats and Just Eat. 20% off your first online order.",
    image: "/images/dishes-detail.webp",
  });
}
