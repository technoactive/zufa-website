import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ThankYouScreen } from "@/components/blocks/thank-you-screen";
import { thankYouCopy, thankYouKinds, isThankYouKind } from "@/content/thank-you";

export function generateStaticParams() {
  return thankYouKinds.map((kind) => ({ kind }));
}

export async function generateMetadata({ params }: { params: Promise<{ kind: string }> }): Promise<Metadata> {
  const { kind } = await params;
  if (!isThankYouKind(kind)) return { title: "Thank you", robots: { index: false, follow: true } };
  const copy = thankYouCopy[kind];
  return {
    title: `${copy.eyebrow} | Thank you`,
    description: copy.description,
    robots: { index: false, follow: false },
    alternates: { canonical: `/thank-you/${kind}` },
  };
}

export default async function ThankYouKindPage({ params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params;
  if (!isThankYouKind(kind)) notFound();
  return <ThankYouScreen kind={kind} />;
}
