import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Find us in Hatch End — Zufa, Hatch End";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: "Find us in",
    accent: "Hatch End",
    subtitle: "308 Uxbridge Road, Hatch End HA5 4HR · Sun–Thu 11am–11pm · Fri–Sat 11am–Midnight.",
    image: "/images/feast-table.jpg",
  });
}
