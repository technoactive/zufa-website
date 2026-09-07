import type { Metadata } from "next";
import { getPage } from "@/content/pages";
import { absoluteUrl, site } from "@/content/site";

interface Overrides {
  title?: string;
  description?: string;
}

/**
 * Build complete per-page metadata (canonical, Open Graph, Twitter) from the page registry
 * so titles/descriptions stay in lock-step with the sitemap and llms.txt.
 *
 * Social images are intentionally *not* set here: every route ships a branded
 * `opengraph-image.tsx`, which Next.js injects automatically (og:image + twitter:image).
 */
export function pageMetadata(path: string, overrides: Overrides = {}): Metadata {
  const page = getPage(path);
  if (!page) {
    throw new Error(`pageMetadata: "${path}" is not registered in src/content/pages.ts`);
  }

  const title = overrides.title ?? page.title;
  const description = overrides.description ?? page.description;
  const url = absoluteUrl(path);

  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      url,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
