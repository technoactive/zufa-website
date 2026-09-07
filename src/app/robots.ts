import type { MetadataRoute } from "next";
import { absoluteUrl, SITE_URL } from "@/content/site";

/**
 * Crawl policy.
 *
 * - Everything public is crawlable by search engines.
 * - AI assistants and answer engines are explicitly welcomed (they drive discovery
 *   and reservations) and pointed at llms.txt via the sitemap + <link rel="alternate">.
 * - Only Next.js internals and server-action endpoints are excluded.
 */
const disallow = ["/api/", "/_next/", "/actions/"];

const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "meta-externalagent",
  "DuckAssistBot",
  "YouBot",
  "cohere-ai",
  "MistralAI-User",
  "Bytespider",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: ["Googlebot", "Bingbot", "Applebot", "DuckDuckBot", "YandexBot"], allow: "/", disallow },
      { userAgent: aiCrawlers, allow: ["/", "/llms.txt", "/llms-full.txt"], disallow },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
