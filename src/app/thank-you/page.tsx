import type { Metadata } from "next";
import { ThankYouScreen } from "@/components/blocks/thank-you-screen";

export const metadata: Metadata = {
  title: "Thank you",
  description: "We’ve received your message and a confirmation is on its way to your inbox.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you" },
};

export default function ThankYouPage() {
  return <ThankYouScreen kind="general" />;
}
