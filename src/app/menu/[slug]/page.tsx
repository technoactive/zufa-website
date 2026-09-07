import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, Clock } from "lucide-react";
import { PageHero } from "@/components/blocks/page-hero";
import { CtaBand } from "@/components/blocks/cta-band";
import { MenuLegend, MenuSectionBlock, MenuSectionNav } from "@/components/blocks/menu-renderer";
import { Section } from "@/components/ui/section";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { menuSchema, webPageSchema } from "@/lib/schema";
import { getMenu, menus } from "@/content/menus";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return menus.map((menu) => ({ slug: menu.slug }));
}

export async function generateMetadata({ params }: PageProps<"/menu/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const menu = getMenu(slug);
  if (!menu) return {};
  return pageMetadata(`/menu/${menu.slug}`);
}

export default async function MenuPage({ params }: PageProps<"/menu/[slug]">) {
  const { slug } = await params;
  const menu = getMenu(slug);
  if (!menu) notFound();

  const path = `/menu/${menu.slug}`;

  return (
    <>
      <PageHero
        eyebrow={menu.availability ? `Served ${menu.availability}` : "Menu"}
        title={menu.title}
        description={menu.intro}
        image={{ src: menu.image, alt: menu.imageAlt }}
        crumbs={[
          { name: "Menu", path: "/menu" },
          { name: menu.shortTitle, path },
        ]}
      >
        {menu.pdf ? (
          <a
            href={menu.pdf}
            download
            className="inline-flex h-12 items-center gap-2 rounded-full border border-cream/25 px-6 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:border-gold hover:text-gold"
          >
            <Download className="size-4" aria-hidden /> Download PDF
          </a>
        ) : null}
        {menu.availability ? (
          <span className="inline-flex h-12 items-center gap-2 rounded-full bg-cream/10 px-6 text-sm text-cream">
            <Clock className="size-4 text-gold" aria-hidden /> {menu.availability}
          </span>
        ) : null}
      </PageHero>

      {/* Menu switcher */}
      <div className="border-b border-ink/10 bg-parchment">
        <nav aria-label="All menus" className="container-content">
          <ul className="scrollbar-none -mx-5 flex gap-1 overflow-x-auto px-5 py-3 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
            {menus.map((item) => {
              const active = item.slug === menu.slug;
              return (
                <li key={item.slug} className="shrink-0">
                  <Link
                    href={`/menu/${item.slug}`}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors",
                      active ? "bg-ink text-cream" : "text-ink/65 hover:bg-ink/5 hover:text-ink",
                    )}
                  >
                    {item.shortTitle}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <Section tone="cream" pattern className="pt-8 sm:pt-10 lg:pt-16">
        <div className="container-content lg:grid lg:grid-cols-[14rem_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:self-start">
            <MenuSectionNav menu={menu} />
            <div className="mt-8 hidden lg:block">
              <MenuLegend />
            </div>
          </aside>

          <div className="mt-10 space-y-16 lg:mt-0 lg:space-y-20">
            {menu.sections.map((section) => (
              <MenuSectionBlock key={section.id} section={section} />
            ))}
            <div className="lg:hidden">
              <MenuLegend />
            </div>
          </div>
        </div>
      </Section>

      <CtaBand />
      <JsonLd data={[menuSchema(menu), webPageSchema({ path, title: menu.title, description: menu.summary, image: menu.image })]} />
    </>
  );
}
