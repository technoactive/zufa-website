import { Resend } from "resend";
import { openingHours, site, SITE_URL, absoluteUrl } from "@/content/site";
import type { ThankYouKind } from "@/content/thank-you";

export type EnquiryTopic = "catering" | "private-hire" | "general";

export const topicLabels: Record<EnquiryTopic, string> = {
  catering: "Catering enquiry",
  "private-hire": "Private hire enquiry",
  general: "General enquiry",
};

export interface EnquiryPayload {
  topic: EnquiryTopic;
  name: string;
  email: string;
  phone?: string;
  /** Topic-specific detail rows (label, value), already human-readable. */
  details?: ReadonlyArray<readonly [string, string]>;
  message: string;
  /** Short line appended to the staff subject, e.g. "60 guests · 14 Nov 2026 · HA5". */
  summary?: string;
}

function contactRows(data: EnquiryPayload): Array<[string, string | undefined]> {
  return [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ...(data.details ?? []).map(([label, value]) => [label, value] as [string, string]),
  ];
}

const GOLD = "#c9a24f";
const INK = "#0c0b09";
const CREAM = "#f5eee1";
const SAND = "#cdbfa6";
const STONE = "#26221c";

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c);
}

function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] || name;
}

function londonNow(): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: site.timeZone,
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date());
}

function fromAddress(): string {
  return process.env.ENQUIRY_FROM_EMAIL?.trim() || "Zufa <website@zufa.co.uk>";
}

function staffInbox(): string {
  return process.env.ENQUIRY_TO_EMAIL?.trim() || site.email;
}

function hoursBlock(): string {
  return openingHours.map((period) => period.label).join(" · ");
}

function ctaButton(label: string, href: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 8px">
      <tr>
        <td style="background:${GOLD};border-radius:999px">
          <a href="${escapeHtml(href)}" style="display:inline-block;padding:14px 28px;font-family:Georgia,serif;font-size:15px;font-weight:600;color:${INK};text-decoration:none">${escapeHtml(label)}</a>
        </td>
      </tr>
    </table>`;
}

function detailsTable(rows: Array<[string, string | undefined]>): string {
  const filled = rows.filter(([, value]) => value);
  if (!filled.length) return "";
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:24px 0;border-collapse:collapse">
      ${filled
        .map(
          ([label, value], index) => `
        <tr>
          <td style="padding:12px 0;border-top:${index === 0 ? "0" : "1px solid #eadfca"};width:38%;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#8a6a26">${escapeHtml(label)}</td>
          <td style="padding:12px 0;border-top:${index === 0 ? "0" : "1px solid #eadfca"};font-family:Georgia,serif;font-size:16px;color:${INK}">${escapeHtml(value ?? "")}</td>
        </tr>`,
        )
        .join("")}
    </table>`;
}

function brandedEmail(options: {
  preheader: string;
  eyebrow: string;
  heading: string;
  bodyHtml: string;
}): string {
  const logo = absoluteUrl("/brand/zufa-logo-white.png");
  const maps = site.maps.google;
  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Zufa</title>
</head>
<body style="margin:0;padding:0;background:${INK}">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(options.preheader)}</div>
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${INK}">
    <tr>
      <td align="center" style="padding:32px 16px">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px">
          <tr>
            <td style="padding:28px 36px 24px;text-align:center">
              <img src="${logo}" width="140" alt="Zufa" style="display:inline-block;width:140px;height:auto;border:0" />
            </td>
          </tr>
          <tr>
            <td style="height:2px;background:${GOLD};font-size:0;line-height:0">&nbsp;</td>
          </tr>
          <tr>
            <td style="background:${CREAM};padding:40px 36px 36px;color:${INK}">
              <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#8a6a26">${escapeHtml(options.eyebrow)}</p>
              <h1 style="margin:0 0 20px;font-family:Georgia,serif;font-size:32px;line-height:1.15;font-weight:500;color:${INK}">${escapeHtml(options.heading)}</h1>
              ${options.bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="background:${STONE};padding:28px 36px;text-align:center">
              <p style="margin:0 0 8px;font-family:Georgia,serif;font-size:16px;color:${CREAM}">${escapeHtml(site.legalName)}</p>
              <p style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:${SAND}">
                <a href="${escapeHtml(maps)}" style="color:${SAND};text-decoration:none">${escapeHtml(site.address.full)}</a><br />
                <a href="tel:${site.phone.e164}" style="color:${GOLD};text-decoration:none">${escapeHtml(site.phone.display)}</a>
                &nbsp;·&nbsp;
                <a href="${escapeHtml(site.whatsapp.url)}" style="color:${GOLD};text-decoration:none">WhatsApp</a>
                &nbsp;·&nbsp;
                <a href="${escapeHtml(site.social.instagram)}" style="color:${GOLD};text-decoration:none">${escapeHtml(site.social.instagramHandle)}</a>
              </p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#8a8378">${escapeHtml(hoursBlock())}</p>
            </td>
          </tr>
        </table>
        <p style="margin:20px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#8a8378">
          Sent from <a href="${escapeHtml(SITE_URL)}" style="color:${SAND};text-decoration:none">zufa.co.uk</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function guestCopy(topic: EnquiryTopic, name: string): { heading: string; intro: string; ctaLabel: string; ctaHref: string } {
  const first = firstName(name);
  switch (topic) {
    case "catering":
      return {
        heading: `Thank you, ${first}`,
        intro:
          "We’ve received your catering enquiry. A member of the family will come back with a few questions and a per-head figure — usually the same day, or first thing after service if you’ve written in the evening.",
        ctaLabel: "See typical dishes",
        ctaHref: absoluteUrl("/catering"),
      };
    case "private-hire":
      return {
        heading: `Thank you, ${first}`,
        intro:
          "We’ve received your private hire enquiry and we’ll check the diary. Evenings and weekends go first, especially in December — we’ll be in touch shortly.",
        ctaLabel: "See the room",
        ctaHref: absoluteUrl("/private-hire"),
      };
    default:
      return {
        heading: `Thank you, ${first}`,
        intro:
          "We’ve received your message and a member of the team will be in touch shortly. If it’s something we can help with more quickly, call or WhatsApp us.",
        ctaLabel: "Book a table",
        ctaHref: absoluteUrl("/bookings"),
      };
  }
}

function guestEnquiryHtml(data: EnquiryPayload): string {
  const copy = guestCopy(data.topic, data.name);
  const messageHtml = data.message
    ? `<p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#8a6a26">Your message</p>
       <p style="margin:0;font-family:Georgia,serif;font-size:16px;line-height:1.6;color:${INK};white-space:pre-wrap">${escapeHtml(data.message)}</p>`
    : "";
  return brandedEmail({
    preheader: `We’ve received your ${topicLabels[data.topic].toLowerCase()} at Zufa Hatch End.`,
    eyebrow: topicLabels[data.topic],
    heading: copy.heading,
    bodyHtml: `
      <p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.7;color:${INK}">${escapeHtml(copy.intro)}</p>
      ${detailsTable(contactRows(data))}
      ${messageHtml}
      ${ctaButton(copy.ctaLabel, copy.ctaHref)}
      <p style="margin:24px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:#5c564c">
        Need us sooner? Call <a href="tel:${site.phone.e164}" style="color:${INK};font-weight:600;text-decoration:none">${escapeHtml(site.phone.display)}</a>
        or WhatsApp <a href="${escapeHtml(site.whatsapp.url)}" style="color:${INK};font-weight:600;text-decoration:none">${escapeHtml(site.whatsapp.display)}</a>.
      </p>`,
  });
}

function staffEnquiryHtml(data: EnquiryPayload): string {
  return brandedEmail({
    preheader: `${topicLabels[data.topic]} from ${data.name}`,
    eyebrow: "New website enquiry",
    heading: topicLabels[data.topic],
    bodyHtml: `
      <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#5c564c">Received ${escapeHtml(londonNow())} from zufa.co.uk</p>
      ${detailsTable(contactRows(data))}
      ${
        data.message
          ? `<p style="margin:8px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#8a6a26">Message</p>
      <p style="margin:0;font-family:Georgia,serif;font-size:16px;line-height:1.6;color:${INK};white-space:pre-wrap">${escapeHtml(data.message)}</p>`
          : ""
      }
      ${ctaButton("Reply to guest", `mailto:${data.email}`)}
      ${data.phone ? ctaButton(`Call ${data.phone}`, `tel:${data.phone.replace(/[^\d+]/g, "")}`) : ""}`,
  });
}

function guestNewsletterHtml(email: string): string {
  return brandedEmail({
    preheader: "You’re on the Zufa list — corkage-free Mondays, the grill, and the occasional recipe from Tannourine.",
    eyebrow: "Welcome to the table",
    heading: "You’re on the list",
    bodyHtml: `
      <p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.7;color:${INK}">
        Thank you for joining us. Once or twice a month we’ll send what’s on at Hatch End — corkage-free Mondays, the grill, and the occasional recipe from Tannourine. Never more.
      </p>
      <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:#5c564c">We’ll write to ${escapeHtml(email)}.</p>
      ${ctaButton("See what’s on this week", absoluteUrl("/whats-on"))}
      <p style="margin:24px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.7;color:#5c564c">You can unsubscribe from any email in one click.</p>`,
  });
}

function staffNewsletterHtml(email: string): string {
  return brandedEmail({
    preheader: `Newsletter sign-up: ${email}`,
    eyebrow: "New subscriber",
    heading: "Someone joined the list",
    bodyHtml: `
      <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#5c564c">Received ${escapeHtml(londonNow())} from the website footer.</p>
      ${detailsTable([["Email", email]])}
      ${ctaButton("Reply", `mailto:${email}`)}`,
  });
}

function toText(title: string, rows: Array<[string, string | undefined]>, message?: string): string {
  return [
    title,
    "",
    ...rows.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`),
    ...(message ? ["", "Message:", message] : []),
    "",
    site.address.full,
    site.phone.display,
    SITE_URL,
  ].join("\n");
}

async function deliver(input: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Email delivery is not configured (RESEND_API_KEY missing).");
    }
    console.info(`[email] RESEND_API_KEY not set — logging instead of sending “${input.subject}” to ${input.to}\n${input.text}`);
    return;
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: fromAddress(),
    to: [input.to],
    replyTo: input.replyTo,
    subject: input.subject,
    html: input.html,
    text: input.text,
  });
  if (error) throw new Error(error.message);
}

export async function sendEnquiryEmails(data: EnquiryPayload): Promise<void> {
  const label = topicLabels[data.topic];
  const copy = guestCopy(data.topic, data.name);
  const rows = contactRows(data);

  await deliver({
    to: staffInbox(),
    subject: `${label} from ${data.name}${data.summary ? ` — ${data.summary}` : ""}`,
    html: staffEnquiryHtml(data),
    text: toText(label, rows, data.message),
    replyTo: data.email,
  });

  try {
    await deliver({
      to: data.email,
      subject: `We’ve received your ${label.toLowerCase()} — Zufa Hatch End`,
      html: guestEnquiryHtml(data),
      text: toText(`Zufa — ${copy.heading}`, rows, data.message),
      replyTo: site.email,
    });
  } catch (error) {
    console.error("[email] guest confirmation failed", error);
  }
}

export async function sendNewsletterEmails(email: string): Promise<void> {
  await deliver({
    to: staffInbox(),
    subject: `Newsletter sign-up: ${email}`,
    html: staffNewsletterHtml(email),
    text: toText("Newsletter sign-up", [["Email", email]]),
    replyTo: email,
  });

  try {
    await deliver({
      to: email,
      subject: "You’re on the list — Zufa Hatch End",
      html: guestNewsletterHtml(email),
      text: toText("You’re on the Zufa list", [["Email", email]]),
      replyTo: site.email,
    });
  } catch (error) {
    console.error("[email] newsletter welcome failed", error);
  }
}

export function thankYouPath(kind: ThankYouKind): `/thank-you/${ThankYouKind}` {
  return `/thank-you/${kind}`;
}
