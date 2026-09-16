"use server";

import { redirect } from "next/navigation";
import type { Route } from "next";
import { z } from "zod";
import { site } from "@/content/site";
import { sendEnquiryEmails, thankYouPath, type EnquiryTopic } from "@/lib/email";

export type { EnquiryTopic };

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
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters)").max(3000),
  consent: z.literal("on", { error: "Please confirm you are happy for us to contact you" }),
  website: z.string().max(0).optional(),
  startedAt: z.string().optional(),
});

export interface EnquiryState {
  status: "idle" | "error";
  message?: string;
  errors?: Partial<Record<keyof z.infer<typeof schema>, string>>;
}

export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    const errors: EnquiryState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof z.infer<typeof schema>;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", errors };
  }

  const data = parsed.data;
  const startedAt = Number(data.startedAt);
  const tooFast = Number.isFinite(startedAt) && Date.now() - startedAt < 3000;
  if (data.website || tooFast) {
    redirect(thankYouPath(data.topic) as Route);
  }

  try {
    await sendEnquiryEmails(data);
  } catch (error) {
    console.error("[enquiry] delivery failed", error);
    return {
      status: "error",
      message: `Sorry, we couldn’t send your message just now. Please call us on ${site.phone.display} or email ${site.email}.`,
    };
  }

  redirect(thankYouPath(data.topic) as Route);
}
