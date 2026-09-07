import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Lebanese Restaurant, Hatch End`,
    short_name: site.name,
    description: site.description,
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0c0b09",
    theme_color: "#0c0b09",
    lang: site.language,
    categories: ["food", "restaurant", "lifestyle"],
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
    shortcuts: [
      { name: "Book a table", url: "/bookings" },
      { name: "Menu", url: "/menu" },
      { name: "Takeaway", url: "/takeaway" },
    ],
  };
}
