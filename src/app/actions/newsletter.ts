"use server";

import { redirect } from "next/navigation";
import type { Route } from "next";
import { z } from "zod";
import { sendNewsletterEmails, thankYouPath } from "@/lib/email";

const schema = z.object({
  email: z.email("Please enter a valid email address").max(200),
  company: z.string().max(0).optional(),
});

export interface NewsletterState {
  status: "idle" | "error";
  message?: string;
}

export async function subscribeNewsletter(_prev: NewsletterState, formData: FormData): Promise<NewsletterState> {
  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Please enter a valid email address." };
  }

  if (parsed.data.company) {
    redirect(thankYouPath("newsletter") as Route);
  }

  try {
    await sendNewsletterEmails(parsed.data.email);
  } catch (error) {
    console.error("[newsletter] delivery failed", error);
    return { status: "error", message: "Sorry, something went wrong. Please try again in a moment." };
  }

  redirect(thankYouPath("newsletter") as Route);
}
