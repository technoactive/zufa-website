import { Leaf, Flame, Sprout } from "lucide-react";
import { allergenLabels, dietLabels, formatPrice, type Menu, type MenuItem, type MenuSection } from "@/content/menus";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const dietIcon = {
  vegetarian: Leaf,
  vegan: Sprout,
  spicy: Flame,
} as const;

function Price({ item }: { item: MenuItem }) {
  if (typeof item.price === "number") {
    return (
      <span className="shrink-0 font-display text-xl tabular-nums text-ink">
        {formatPrice(item.price)}
        {item.priceNote ? <span className="ml-1 font-sans text-xs text-ink/55">{item.priceNote}</span> : null}
      </span>
    );
  }
  return null;
}

function Variants({ item }: { item: MenuItem }) {
  if (!Array.isArray(item.price)) return null;
  return (
    <dl className="mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
      {item.price.map((variant) => (
        <div key={variant.label} className="flex items-baseline text-sm">
          <dt className="text-ink/75">{variant.label}</dt>
          <span className="leader" aria-hidden />
          <dd className="font-display text-lg tabular-nums text-ink">{formatPrice(variant.price)}</dd>
        </div>
      ))}
    </dl>
  );
}

function ItemBadges({ item }: { item: MenuItem }) {
  if (!item.diets?.length && !item.allergens?.length) return null;
  return (
    <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[0.6875rem] uppercase tracking-[0.12em]">
      {item.diets?.map((diet) => {
        const Icon = dietIcon[diet];
        return (
          <span
            key={diet}
            className={cn(
              "inline-flex items-center gap-1 font-semibold",
              diet === "spicy" ? "text-terracotta" : "text-olive",
            )}
          >
            <Icon className="size-3.5" aria-hidden />
            {dietLabels[diet]}
          </span>
        );
      })}
      {item.allergens?.length ? (
        <span className="text-ink/50">
          <span className="sr-only">Contains: </span>
          {item.allergens.map((a) => allergenLabels[a]).join(" · ")}
        </span>
      ) : null}
    </div>
  );
}

function MenuItemRow({ item }: { item: MenuItem }) {
  return (
    <li className="py-5 first:pt-0 last:pb-0">
      <div className="flex items-baseline gap-3">
        <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">{item.name}</h3>
        {typeof item.price === "number" ? <span className="leader" aria-hidden /> : null}
        <Price item={item} />
      </div>
      {item.description ? <p className="mt-1.5 max-w-prose text-[0.9375rem] leading-relaxed text-ink/70">{item.description}</p> : null}
      {item.note ? <p className="mt-1 text-sm italic text-ink/60">{item.note}</p> : null}
      <Variants item={item} />
      <ItemBadges item={item} />
    </li>
  );
}

export function MenuSectionBlock({ section }: { section: MenuSection }) {
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-32">
      <header className="mb-8">
        <h2 id={`${section.id}-title`} className="text-display-md text-ink">
          {section.title}
        </h2>
        {section.description ? <p className="mt-3 max-w-prose text-base leading-relaxed text-ink/70">{section.description}</p> : null}
        <div className="mt-6 h-px w-16 bg-gold-deep" aria-hidden />
      </header>
      <ul className="divide-y divide-ink/10">
        {section.items.map((item) => (
          <MenuItemRow key={item.name} item={item} />
        ))}
      </ul>
    </section>
  );
}

export function MenuSectionNav({ menu }: { menu: Menu }) {
  return (
    <nav aria-label={`${menu.shortTitle} sections`} className="sticky top-(--header-height) z-30 -mx-5 border-b border-ink/10 bg-cream/90 backdrop-blur-md sm:-mx-8 lg:mx-0 lg:border-none lg:bg-transparent lg:backdrop-blur-none">
      <ul className="scrollbar-none flex gap-1 overflow-x-auto px-5 py-3 sm:px-8 lg:flex-col lg:gap-0 lg:px-0 lg:py-0">
        {menu.sections.map((section) => (
          <li key={section.id} className="shrink-0">
            <a
              href={`#${section.id}`}
              className="block rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink lg:rounded-none lg:border-l lg:border-ink/10 lg:px-4 lg:py-2.5 lg:hover:border-gold-deep"
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function MenuLegend() {
  return (
    <aside aria-label="Menu key" className="rounded-2xl border border-ink/10 bg-parchment p-6 text-sm text-ink/70">
      <h2 className="eyebrow mb-4 text-gold-dark">Key</h2>
      <ul className="space-y-2">
        <li className="flex items-center gap-2">
          <Sprout className="size-4 text-olive" aria-hidden /> Plant-based
        </li>
        <li className="flex items-center gap-2">
          <Leaf className="size-4 text-olive" aria-hidden /> Vegetarian
        </li>
        <li className="flex items-center gap-2">
          <Flame className="size-4 text-terracotta" aria-hidden /> Spicy
        </li>
      </ul>
      <p className="mt-4 leading-relaxed">
        Allergens are listed under each dish. Please tell your server about any allergy or intolerance before ordering — our kitchen handles all fourteen major allergens.
      </p>
      <p className="mt-3 leading-relaxed">{site.serviceCharge}</p>
    </aside>
  );
}
