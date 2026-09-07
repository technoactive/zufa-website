import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Book your table — Zufa, Hatch End";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: "Book your",
    accent: "table",
    subtitle: "Reserve online in seconds, or call 0208 421 6821 for larger parties and celebrations.",
    image: "/images/restaurant-interior.jpg",
  });
}
