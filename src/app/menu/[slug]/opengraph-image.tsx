import { getMenu, menus } from "@/content/menus";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Zufa menu";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const menu = getMenu(slug) ?? menus[0];
  return renderOgImage({
    title: menu.shortTitle,
    accent: "Menu",
    subtitle: menu.availability ? `${menu.availability}. ${menu.summary}` : menu.summary,
    image: menu.image,
    eyebrow: "Zufa · Lebanese Restaurant · Hatch End",
  });
}
