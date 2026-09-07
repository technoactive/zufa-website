# zufa.co.uk — Next.js rebuild

Marketing site for **Zufa**, a family-run Lebanese restaurant in Hatch End, London. Built on Next.js 16.3 (App Router, Cache Components, React Compiler, typed routes), Tailwind CSS v4 and TypeScript strict.

## Quick start

```bash
pnpm install
cp .env.example .env.local   # fill in RESEND_API_KEY for form delivery
pnpm dev                     # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `pnpm dev` | Dev server (Turbopack) |
| `pnpm build` | Production build — all pages prerender statically |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint (Next core-web-vitals + TypeScript rules) |
| `pnpm exec tsc --noEmit` | Typecheck (run `pnpm exec next typegen` first on a fresh clone) |

## Where things live

```
src/content/        Single source of truth for ALL copy and data
  site.ts           Name, address, geo, phone/WhatsApp, hours, socials, delivery partners, nav
  menus.ts          Every menu, section, dish, price, allergen and diet tag
  offers.ts         What's-on offers and events
  faqs.ts           FAQs (general / catering / private hire) → FAQPage schema
  pages.ts          Page registry: titles, descriptions, sitemap priority, lastModified
src/app/            Routes (one folder per page) + metadata routes
  robots.ts, sitemap.ts, manifest.ts, opengraph-image.tsx, icon.tsx, apple-icon.tsx
  llms.txt/         /llms.txt   (concise, spec-compliant index for AI agents)
  llms-full.txt/    /llms-full.txt (complete site content as Markdown)
  actions/          Server actions (enquiry form: Zod validation, honeypot, time-trap, Resend)
src/lib/            schema.ts (JSON-LD builders), llms.ts, metadata.ts, og.tsx, hours.ts
src/components/     layout/ (header, footer), blocks/ (hero, FAQ, menu renderer…), ui/, forms/, consent/
public/             images/, brand/, menus/ (PDF downloads), press/
```

Editing content = editing a file in `src/content/`. Menus, JSON-LD, `sitemap.xml`, `llms.txt` and `llms-full.txt` all regenerate from the same data at build time, so they can never drift apart.

## SEO & discoverability checklist

- Per-page `<title>`, description, canonical, Open Graph and Twitter cards; branded OG images generated per route (JPEG, ~100 KB).
- JSON-LD: `Restaurant` (hours, geo, menu, reservations action), `WebSite`, `WebPage`, `BreadcrumbList`, `Menu`/`MenuItem` with prices & diets, `FAQPage`.
- `robots.txt` explicitly allows major search and AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…) and points to the sitemap.
- `sitemap.xml` with `<lastmod>`, priorities and image entries; `manifest.webmanifest`; `<link rel="alternate" type="text/markdown">` to both llms files.
- Legacy WordPress URLs and PDF links 308-redirect to their new homes (see `next.config.ts`).
- Security headers (CSP, HSTS, Permissions-Policy, etc.) are set in `next.config.ts`; the CSP allow-list covers SevenRooms, Google Analytics and Google Maps only.

## Privacy

GA4 loads only after the visitor accepts the cookie banner (Google Consent Mode v2, default denied; honours Global Privacy Control). The decision is stored in `localStorage` and can be changed from the privacy policy page.

## Deployment

Any Node 20+ host works (Vercel is zero-config). Set the variables from `.env.example`; `NEXT_PUBLIC_SITE_URL` must be the final public origin because it feeds canonicals, the sitemap and `llms.txt`.
