"use server";

import { z } from "zod";
import { site } from "@/content/site";

const schema = z.object({
  email: z.email("Please enter a valid email address").max(200),
  // Honeypot: real users never see or fill this field.
  company: z.string().max(0).optional(),
});

export interface NewsletterState {
  status: "idle" | "success" | "error";
  message?: string;
}

async function deliver(email: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL ?? site.email;
  const from = process.env.ENQUIRY_FROM_EMAIL ?? `Zufa Website <website@${new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://zufa.co.uk").hostname}>`;
  const text = `New newsletter subscriber via zufa.co.uk\n\nEmail: ${email}\nDate: ${new Date().toISOString()}`;

  if (!apiKey) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Email delivery is not configured (RESEND_API_KEY missing).");
    }
    console.info("[newsletter] RESEND_API_KEY not set — logging subscriber instead of sending:\n" + text);
    return;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `Newsletter sign-up: ${email}`,
    text,
  });
  if (error) throw new Error(error.message);
}

export async function subscribeNewsletter(_prev: NewsletterState, formData: FormData): Promise<NewsletterState> {
  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Please enter a valid email address." };
  }

  // Silently accept bots so they learn nothing.
  if (parsed.data.company) {
    return { status: "success", message: "Thank you — you’re on the list." };
  }

  try {
    await deliver(parsed.data.email);
    return { status: "success", message: "Thank you — you’re on the list. We’ll be in touch with news from the kitchen." };
  } catch (error) {
    console.error("[newsletter] delivery failed", error);
    return { status: "error", message: "Sorry, something went wrong. Please try again in a moment." };
  }
}
