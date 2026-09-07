import type { NextConfig } from "next";

/**
 * Content Security Policy.
 *
 * The site is fully prerendered (static shell served from the CDN), so a nonce-based
 * policy is not possible without forcing every route dynamic. We therefore allow
 * inline scripts (required by React hydration payloads) but lock down every other
 * source to the explicit third parties we use: Google Analytics (consent-gated) and
 * the SevenRooms reservation widget.
 */
const isDev = process.env.NODE_ENV === "development";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "upgrade-insecure-requests",
  // React dev tooling (Fast Refresh, source-mapped stacks) needs eval; production never does.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://*.sevenrooms.com`,
  "style-src 'self' 'unsafe-inline' https://*.sevenrooms.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://*.sevenrooms.com",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.sevenrooms.com",
  "frame-src https://*.sevenrooms.com https://www.google.com",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Next.js 16: Cache Components (Partial Prerendering) — every route on this site is
  // prerendered into a static shell served from the edge.
  cacheComponents: true,

  // React Compiler: automatic memoisation, no manual useMemo/useCallback.
  reactCompiler: true,

  // Statically typed <Link href> across the app.
  typedRoutes: true,

  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 85],
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1440, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Long-lived immutable caching for static brand assets and photography.
        source: "/(images|brand|menus|press)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        // AI-agent discovery files: served as Markdown, always fresh at the edge.
        source: "/(llms|llms-full).txt",
        headers: [
          { key: "Content-Type", value: "text/markdown; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" },
          { key: "X-Robots-Tag", value: "noindex" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // Legacy WordPress slugs → new canonical URLs (preserve link equity).
      { source: "/contact-hatch-end", destination: "/contact", permanent: true },
      { source: "/contact-hatch-end/", destination: "/contact", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/review-test", destination: "/", permanent: true },
      { source: "/feed", destination: "/", permanent: true },
      { source: "/comments/feed", destination: "/", permanent: true },
      { source: "/wp-content/uploads/2024/03/Food-Menu-21_21-2024-.pdf", destination: "/menu/a-la-carte", permanent: true },
      { source: "/wp-content/uploads/2024/03/Set-Menus-2024.pdf", destination: "/menu/set-menus", permanent: true },
      { source: "/wp-content/uploads/2026/07/ZUFA-LunchMenu.pdf", destination: "/menu/lunch", permanent: true },
      { source: "/wp-content/uploads/2023/07/Zufa-Lunch-Menu.pdf", destination: "/menu/lunch", permanent: true },
      { source: "/wp-content/uploads/2023/07/Zufa-Kids-Menu-Menu.pdf", destination: "/menu/kids", permanent: true },
      { source: "/wp-content/uploads/2023/08/DRINKS-MENU-2023.pdf", destination: "/menu/drinks", permanent: true },
      { source: "/wp-content/uploads/2024/03/dessert-menu-zufa-sm_compressed.pdf", destination: "/menu/desserts", permanent: true },
      { source: "/wp-content/uploads/2023/08/Zufa-Evening-Standard.pdf", destination: "/press/evening-standard-review.pdf", permanent: true },

      // llms.txt compatibility variants → canonical filenames.
      { source: "/llm.txt", destination: "/llms.txt", permanent: true },
      { source: "/full-llms.txt", destination: "/llms-full.txt", permanent: true },
      { source: "/llms-full.md", destination: "/llms-full.txt", permanent: true },
      { source: "/llms.md", destination: "/llms.txt", permanent: true },
      { source: "/.well-known/llms.txt", destination: "/llms.txt", permanent: true },
      { source: "/.well-known/llms-full.txt", destination: "/llms-full.txt", permanent: true },
    ];
  },
};

export default nextConfig;
