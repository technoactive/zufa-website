"use server";

import { z } from "zod";
import { site } from "@/content/site";

export type EnquiryTopic = "catering" | "private-hire" | "general";

const topicLabels: Record<EnquiryTopic, string> = {
  catering: "Catering enquiry",
  "private-hire": "Private hire enquiry",
  general: "General enquiry",
};

const schema = z.object({
  topic: z.enum(["catering", "private-hire", "general"]),
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.email("Please enter a valid email address").max(200),
  phone: z
    .string()
    .trim()
    .max(30)
    .optional()
    .or(z.literal(""))
    .transform((v) => v || undefined),
  eventDate: z
    .string()
    .trim()
    .max(40)
    .optional()
    .or(z.literal(""))
    .transform((v) => v || undefined),
  guests: z
    .string()
    .trim()
    .max(10)
    .optional()
    .or(z.literal(""))
    .transform((v) => v || undefined),
  message: z.string().trim().min(10, "Tell us a little more about your event (at least 10 characters)").max(3000),
  consent: z.literal("on", { error: "Please confirm you are happy for us to contact you" }),
  // Honeypot: real users never see or fill this field.
  website: z.string().max(0).optional(),
  // Time-trap: the form records when it was rendered; bots submit instantly.
  startedAt: z.string().optional(),
});

export interface EnquiryState {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<keyof z.infer<typeof schema>, string>>;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c);
}

async function deliver(data: z.infer<typeof schema>): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL ?? site.email;
  const from = process.env.ENQUIRY_FROM_EMAIL ?? `Zufa Website <website@${new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://zufa.co.uk").hostname}>`;

  const subject = `${topicLabels[data.topic]} from ${data.name}`;
  const rows: Array<[string, string | undefined]> = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Event date", data.eventDate],
    ["Guests", data.guests],
  ];

  const text = [
    `${topicLabels[data.topic]}`,
    "",
    ...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    data.message,
  ].join("\n");

  const html = `
    <h2 style="font-family:Georgia,serif">${escapeHtml(topicLabels[data.topic])}</h2>
    <table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px">
      ${rows
        .filter(([, v]) => v)
        .map(([k, v]) => `<tr><td style="color:#666">${k}</td><td><strong>${escapeHtml(v ?? "")}</strong></td></tr>`)
        .join("")}
    </table>
    <p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(data.message)}</p>
  `;

  if (!apiKey) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Email delivery is not configured (RESEND_API_KEY missing).");
    }
    console.info("[enquiry] RESEND_API_KEY not set — logging enquiry instead of sending:\n" + text);
    return;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: data.email,
    subject,
    text,
    html,
  });
  if (error) throw new Error(error.message);
}

export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    const errors: EnquiryState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof z.infer<typeof schema>;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", errors };
  }

  const data = parsed.data;

  // Silently accept obvious bots so they learn nothing.
  const startedAt = Number(data.startedAt);
  const tooFast = Number.isFinite(startedAt) && Date.now() - startedAt < 3000;
  if (data.website || tooFast) {
    return { status: "success", message: "Thank you — we’ll be in touch shortly." };
  }

  try {
    await deliver(data);
    return {
      status: "success",
      message: `Thank you, ${data.name.split(" ")[0]} — your ${topicLabels[data.topic].toLowerCase()} has been received. A member of our team will be in touch shortly.`,
    };
  } catch (error) {
    console.error("[enquiry] delivery failed", error);
    return {
      status: "error",
      message: `Sorry, we couldn’t send your message just now. Please call us on ${site.phone.display} or email ${site.email}.`,
    };
  }
}
