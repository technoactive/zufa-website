"use server";

import { redirect } from "next/navigation";
import type { Route } from "next";
import { z } from "zod";
import { site } from "@/content/site";
import { optionLabel, optionLabels, optionValues } from "@/content/catering-form";
import { sendEnquiryEmails, thankYouPath, type EnquiryTopic } from "@/lib/email";

export type { EnquiryTopic };

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .or(z.literal(""))
    .transform((v) => v || undefined);

const optionalChoice = (values: readonly string[], message: string) =>
  z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .transform((v) => v || undefined)
    .refine((v) => v === undefined || values.includes(v), message);

const multiChoice = (values: readonly string[]) =>
  z
    .array(z.string().trim())
    .max(values.length)
    .default([])
    .transform((list) => list.filter((v) => values.includes(v)));

const schema = z
  .object({
    topic: z.enum(["catering", "private-hire", "general"]),
    name: z.string().trim().min(2, "Please enter your name").max(100),
    email: z.email("Please enter a valid email address").max(200),
    phone: optionalText(30),
    eventDate: optionalText(40),
    dateFlexible: z.literal("on").optional(),
    guests: optionalText(10),
    message: optionalText(3000),
    consent: z.literal("on", { error: "Please confirm you are happy for us to contact you" }),
    website: z.string().max(0).optional(),
    startedAt: z.string().optional(),

    // Catering-only fields. All optional at the schema level; required-ness is enforced per topic below.
    occasion: optionalChoice(optionValues("occasion"), "Please choose an occasion"),
    occasionOther: optionalText(120),
    eventTime: optionalChoice(optionValues("eventTime"), "Please choose a time of day"),
    postcode: optionalText(12).transform((v) => v?.toUpperCase()),
    venueType: optionalChoice(optionValues("venueType"), "Please choose a venue type"),
    serviceStyle: optionalChoice(optionValues("serviceStyle"), "Please choose how you’d like to eat"),
    menuStyle: optionalChoice(optionValues("menuStyle"), "Please choose a menu style"),
    dietary: multiChoice(optionValues("dietary")),
    dietaryNotes: optionalText(500),
    budget: optionalChoice(optionValues("budget"), "Please choose a budget range"),
    extras: multiChoice(optionValues("extras")),
    company: optionalText(120),
    source: optionalChoice(optionValues("source"), "Please choose an option"),
  })
  .superRefine((data, ctx) => {
    if (!data.phone || data.phone.replace(/\D/g, "").length < 10) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message:
          data.topic === "catering"
            ? "Please add a phone number so we can call you about the quote"
            : data.topic === "private-hire"
              ? "Please add a phone number so we can call you about the booking"
              : "Please add a phone number so we can call you back",
      });
    }
    if (data.topic === "catering") {
      if (!data.occasion) ctx.addIssue({ code: "custom", path: ["occasion"], message: "Please choose the occasion" });
      if (!data.guests) ctx.addIssue({ code: "custom", path: ["guests"], message: "Roughly how many guests?" });
      if (!data.postcode) ctx.addIssue({ code: "custom", path: ["postcode"], message: "Please add the venue postcode so we can quote for travel" });
      else if (!/^[A-Z]{1,2}\d[A-Z\d]?(\s*\d[A-Z]{2})?$/.test(data.postcode)) {
        ctx.addIssue({ code: "custom", path: ["postcode"], message: "That doesn’t look like a UK postcode" });
      }
      if (!data.serviceStyle) ctx.addIssue({ code: "custom", path: ["serviceStyle"], message: "Please choose how you’d like to eat" });
    } else if (!data.message || data.message.length < 10) {
      ctx.addIssue({ code: "custom", path: ["message"], message: "Tell us a little more (at least 10 characters)" });
    }
  });

export type EnquiryFieldName = keyof z.infer<typeof schema>;

export interface EnquiryState {
  status: "idle" | "error";
  message?: string;
  errors?: Partial<Record<EnquiryFieldName, string>>;
}

function readForm(formData: FormData): Record<string, unknown> {
  const raw: Record<string, unknown> = Object.fromEntries(formData.entries());
  // Multi-value checkbox groups: Object.fromEntries keeps only the last value.
  raw.dietary = formData.getAll("dietary").map(String);
  raw.extras = formData.getAll("extras").map(String);
  return raw;
}

export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const parsed = schema.safeParse(readForm(formData));

  if (!parsed.success) {
    const errors: EnquiryState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as EnquiryFieldName;
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

  const details: Array<[string, string | undefined]> =
    data.topic === "catering"
      ? [
          ["Occasion", [optionLabel("occasion", data.occasion), data.occasionOther].filter(Boolean).join(" — ")],
          ["Event date", data.eventDate ? `${data.eventDate}${data.dateFlexible ? " (flexible)" : ""}` : data.dateFlexible ? "Flexible" : undefined],
          ["Time of day", optionLabel("eventTime", data.eventTime)],
          ["Guests", data.guests],
          ["Venue", [optionLabel("venueType", data.venueType), data.postcode].filter(Boolean).join(" · ")],
          ["Service style", optionLabel("serviceStyle", data.serviceStyle)],
          ["Menu style", optionLabel("menuStyle", data.menuStyle)],
          ["Dietary", [optionLabels("dietary", data.dietary), data.dietaryNotes].filter(Boolean).join(" — ")],
          ["Budget", optionLabel("budget", data.budget)],
          ["Extras", optionLabels("extras", data.extras)],
          ["Company", data.company],
          ["Heard about us", optionLabel("source", data.source)],
        ]
      : [
          ["Event date", data.eventDate],
          ["Guests", data.guests],
        ];

  try {
    await sendEnquiryEmails({
      topic: data.topic,
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message ?? "",
      details: details.filter((row): row is [string, string] => Boolean(row[1])),
      summary:
        data.topic === "catering"
          ? [data.guests ? `${data.guests} guests` : null, data.eventDate, data.postcode ? data.postcode.split(/\s+/)[0] : null].filter(Boolean).join(" · ")
          : undefined,
    });
  } catch (error) {
    console.error("[enquiry] delivery failed", error);
    return {
      status: "error",
      message: `Sorry, we couldn’t send your message just now. Please call us on ${site.phone.display} or email ${site.email}.`,
    };
  }

  redirect(thankYouPath(data.topic) as Route);
}
