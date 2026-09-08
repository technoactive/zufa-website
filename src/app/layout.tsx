import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CookieConsent } from "@/components/consent/cookie-consent";
import { JsonLd } from "@/components/seo/json-ld";
import { restaurantSchema, websiteSchema } from "@/lib/schema";
import { site, SITE_URL } from "@/content/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} | Authentic Lebanese Restaurant in Hatch End`,
    template: `%s | ${site.name} Lebanese Restaurant, Hatch End`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Lebanese restaurant Hatch End",
    "Lebanese restaurant Pinner",
    "Lebanese restaurant Harrow",
    "Lebanese food North West London",
    "mezze Hatch End",
    "Lebanese catering London",
    "private hire Hatch End",
    "Zufa",
  ],
  authors: [{ name: site.legalName, url: SITE_URL }],
  creator: site.legalName,
  publisher: site.legalName,
  category: "restaurant",
  formatDetection: { telephone: true, email: true, address: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: SITE_URL,
    siteName: site.name,
    title: `${site.name} | Authentic Lebanese Restaurant in Hatch End`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Authentic Lebanese Restaurant in Hatch End`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  other: {
    "geo.region": "GB-HRW",
    "geo.placename": "Hatch End, London",
    "geo.position": `${site.geo.latitude};${site.geo.longitude}`,
    ICBM: `${site.geo.latitude}, ${site.geo.longitude}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0b09",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={site.language} className={`${cormorant.variable} ${montserrat.variable} no-js`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Remove the no-js class as early as possible so reveal animations work. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.remove('no-js')" }} />
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="llms.txt — AI-readable summary" />
        <link rel="alternate" type="text/markdown" href="/llms-full.txt" title="llms-full.txt — full AI-readable content" />
      </head>
      <body id="top" className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieConsent />
        <JsonLd data={[restaurantSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
