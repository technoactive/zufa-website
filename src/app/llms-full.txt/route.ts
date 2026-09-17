import { buildLlmsFullTxt } from "@/lib/llms";

// Pure function of static content → prerendered at build time.
export function GET() {
  return new Response(buildLlmsFullTxt(), {
    headers: {
      // text/plain (not text/markdown): the llms.txt convention serves .txt files as plain
      // text and some AI fetchers refuse unknown text subtypes.
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      "X-Robots-Tag": "noindex",
    },
  });
}
