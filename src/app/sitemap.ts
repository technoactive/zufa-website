import type { MetadataRoute } from "next";
import { pages } from "@/content/pages";
import { absoluteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: page.lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    ...(page.image ? { images: [absoluteUrl(page.image)] } : {}),
  }));
}
