import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/blocks/page-hero";
import { ManageCookiesButton } from "@/components/consent/cookie-consent";
import { Section } from "@/components/ui/section";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";
import { getPage } from "@/content/pages";
import { site } from "@/content/site";

export const metadata: Metadata = {
  ...pageMetadata("/privacy-policy"),
  robots: { index: true, follow: true, "max-snippet": 160 },
};
const page = getPage("/privacy-policy")!;

const LAST_UPDATED = "7 September 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero compact eyebrow="Legal" title="Privacy & Cookie Policy" description={`Last updated ${LAST_UPDATED}`} crumbs={[{ name: "Privacy & Cookie Policy", path: "/privacy-policy" }]} />

      <Section tone="cream" className="py-14 sm:py-20">
        <div className="container-content">
          <article className="prose-zufa mx-auto max-w-(--container-prose) space-y-10 text-base leading-relaxed text-ink/80 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:text-ink [&_h3]:font-display [&_h3]:text-2xl [&_h3]:text-ink [&_a]:text-gold-dark [&_a]:underline [&_a]:underline-offset-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
            <section className="space-y-4">
              <p>
                This policy explains how {site.legalName} (“Zufa”, “we”, “us”) collects, uses and protects personal data when you use{" "}
                <Link href="/">zufa.co.uk</Link> (the “Site”), contact us or book with us. We are the data controller. Our address is {site.address.full} and you can reach us at{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a> or {site.phone.display}.
              </p>
              <p>We process personal data in accordance with the UK General Data Protection Regulation (UK GDPR), the Data Protection Act 2018 and the Privacy and Electronic Communications Regulations (PECR).</p>
            </section>

            <section className="space-y-4">
              <h2>Information we collect</h2>
              <ul>
                <li>
                  <strong>Enquiry forms.</strong> When you use our catering, private hire or contact forms we collect your name, email address, phone number (optional), event details and your message so that we can respond.
                </li>
                <li>
                  <strong>Table bookings.</strong> Reservations are handled by SevenRooms, our booking provider. When you book, SevenRooms collects the details needed to hold your table (name, contact details, party size, date and any notes) and shares them with us. SevenRooms’ own{" "}
                  <a href="https://sevenrooms.com/privacy-policy/" target="_blank" rel="noopener noreferrer">
                    privacy policy
                  </a>{" "}
                  also applies.
                </li>
                <li>
                  <strong>Technical data.</strong> Our hosting provider records standard server logs (IP address, browser type, pages requested, timestamps) for security and to keep the Site running. These logs are retained for a short period only.
                </li>
                <li>
                  <strong>Analytics (only with your consent).</strong> If you accept analytics cookies we use Google Analytics to understand how the Site is used — pages visited, device type, approximate location. IP addresses are not stored by Google Analytics 4 and we do not use this data for advertising.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2>How we use your information and our lawful bases</h2>
              <ul>
                <li>To answer your enquiry and arrange catering, events or bookings — <em>performance of a contract / steps prior to a contract</em>.</li>
                <li>To keep the Site secure and reliable — <em>legitimate interests</em>.</li>
                <li>To measure and improve the Site with analytics — <em>consent</em>, which you can withdraw at any time.</li>
                <li>To meet legal and accounting obligations — <em>legal obligation</em>.</li>
              </ul>
              <p>We do not sell your personal data and we do not send marketing emails unless you have explicitly opted in.</p>
            </section>

            <section className="space-y-4">
              <h2>Who we share data with</h2>
              <p>We use a small number of trusted processors who act on our instructions: our website hosting provider, our transactional email provider (to deliver enquiry forms to our inbox), SevenRooms (reservations) and, if you consent, Google (analytics). Takeaway orders placed through Deliveroo, Uber Eats or Just Eat are governed by those companies’ privacy policies.</p>
              <p>Some providers may process data outside the United Kingdom. Where they do, transfers are protected by UK-approved safeguards such as the International Data Transfer Agreement or adequacy regulations.</p>
            </section>

            <section className="space-y-4">
              <h2>How long we keep it</h2>
              <p>Enquiry emails are kept for up to 24 months so we can follow up on repeat events, then deleted. Booking records are retained by SevenRooms according to their policy and by us for as long as needed for our accounting obligations. Analytics data is retained for 14 months.</p>
            </section>

            <section className="space-y-4">
              <h2>Cookies</h2>
              <p>The Site uses as few cookies as possible:</p>
              <ul>
                <li>
                  <strong>Strictly necessary.</strong> A single browser storage entry remembers your cookie choice so we don’t ask again. No consent is required for this.
                </li>
                <li>
                  <strong>Analytics (optional).</strong> Google Analytics cookies (<code>_ga</code>, <code>_ga_*</code>) are set only after you click “Accept analytics”. They expire after 13 months.
                </li>
                <li>
                  <strong>Third-party.</strong> The SevenRooms booking widget on our bookings page may set its own functional cookies when you interact with it.
                </li>
              </ul>
              <p>
                You can change your mind at any time: <ManageCookiesButton />. You can also block cookies in your browser settings; the Site will keep working.
              </p>
              <p>We honour the Global Privacy Control signal — if your browser sends it, analytics is switched off automatically.</p>
            </section>

            <section className="space-y-4">
              <h2>Your rights</h2>
              <p>Under UK GDPR you have the right to access, correct, erase or restrict the processing of your personal data, to object to processing based on legitimate interests, to data portability and to withdraw consent. To exercise any right, email <a href={`mailto:${site.email}`}>{site.email}</a>. We will respond within one month.</p>
              <p>
                If you are unhappy with how we handle your data you can complain to the Information Commissioner’s Office at{" "}
                <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
                  ico.org.uk
                </a>
                .
              </p>
            </section>

            <section className="space-y-4">
              <h2>Changes to this policy</h2>
              <p>We may update this policy from time to time. The date at the top shows when it was last revised.</p>
            </section>
          </article>
        </div>
      </Section>

      <JsonLd data={webPageSchema({ path: "/privacy-policy", title: page.title, description: page.description })} />
    </>
  );
}
