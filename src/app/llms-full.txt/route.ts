import { buildLlmsFullTxt } from "@/lib/llms";

// Pure function of static content → prerendered at build time.
export function GET() {
  return new Response(buildLlmsFullTxt(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      "X-Robots-Tag": "noindex",
    },
  });
}
