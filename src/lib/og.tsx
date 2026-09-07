import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { site } from "@/content/site";

export const OG_SIZE = { width: 1200, height: 630 } as const;
/** Satori emits PNG; we re-encode to JPEG so photo-heavy cards stay well under 300 KB (WhatsApp/LinkedIn limits). */
export const OG_CONTENT_TYPE = "image/jpeg";

const PHOTO = { width: 720, height: 630 } as const;
const root = process.cwd();

// Loaded once per server/worker — fonts and the logo never change at runtime.
const assets = Promise.all([
  readFile(path.join(root, "src/assets/fonts/CormorantGaramond-Medium.woff")),
  readFile(path.join(root, "src/assets/fonts/CormorantGaramond-MediumItalic.woff")),
  readFile(path.join(root, "src/assets/fonts/Montserrat-Medium.woff")),
  readFile(path.join(root, "public/brand/zufa-logo-white.png")),
]).then(([display, displayItalic, sans, logo]) => ({
  display,
  displayItalic,
  sans,
  logo: `data:image/png;base64,${logo.toString("base64")}`,
}));

/** Pre-size the photograph to its final footprint so Satori only rasterises what it needs. */
async function photoDataUri(publicPath: string): Promise<string> {
  const file = await readFile(path.join(root, "public", publicPath));
  const resized = await sharp(file).resize(PHOTO.width, PHOTO.height, { fit: "cover", position: "attention" }).jpeg({ quality: 85 }).toBuffer();
  return `data:image/jpeg;base64,${resized.toString("base64")}`;
}

/** Absolute-fill helper — Satori does not understand the `inset` shorthand. */
const fill = { position: "absolute", top: 0, left: 0, width: OG_SIZE.width, height: OG_SIZE.height } as const;

export interface OgOptions {
  title: string;
  /** Optional emphasised (italic gold) word(s) appended to the title. */
  accent?: string;
  subtitle?: string;
  /** Public path of the photograph to feature, e.g. "/images/mezze-spread.jpg". */
  image?: string;
  eyebrow?: string;
}

/** Branded Open Graph card: photo on the right, type on the left, business strip along the bottom. */
export async function renderOgImage({ title, accent, subtitle, image = "/images/mezze-spread.jpg", eyebrow = "Authentic Lebanese Cuisine · Hatch End" }: OgOptions) {
  const [{ display, displayItalic, sans, logo }, photo] = await Promise.all([assets, photoDataUri(image)]);

  const png = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0c0b09",
          color: "#f5eee1",
          fontFamily: "Montserrat",
          position: "relative",
        }}
      >
        {/* Photo */}
        <img
          src={photo}
          alt=""
          width={PHOTO.width}
          height={PHOTO.height}
          style={{ position: "absolute", left: OG_SIZE.width - PHOTO.width, top: 0, width: PHOTO.width, height: PHOTO.height, objectFit: "cover" }}
        />
        {/* Left-to-right fade so type always sits on solid ink */}
        <div
          style={{
            ...fill,
            background: "linear-gradient(90deg, #0c0b09 0%, #0c0b09 40%, rgba(12,11,9,0.92) 52%, rgba(12,11,9,0.55) 66%, rgba(12,11,9,0.15) 100%)",
          }}
        />
        {/* Bottom vignette for the business strip */}
        <div style={{ ...fill, background: "linear-gradient(180deg, rgba(12,11,9,0) 60%, rgba(12,11,9,0.85) 100%)" }} />

        {/* Content */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 64px", width: "100%", height: "100%" }}>
          <img src={logo} alt="Zufa" width={186} height={90} style={{ width: 186, height: 90, objectFit: "contain", objectPosition: "left" }} />

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 680 }}>
            <div style={{ fontSize: 18, letterSpacing: 5, textTransform: "uppercase", color: "#ffcd75", marginBottom: 22 }}>{eyebrow}</div>
            <div style={{ display: "flex", flexWrap: "wrap", fontFamily: "Cormorant Garamond", fontSize: 84, lineHeight: 0.98, letterSpacing: -1 }}>
              <span>{title}</span>
              {accent ? (
                <span style={{ fontFamily: "Cormorant Garamond Italic", fontStyle: "italic", color: "#ffcd75", marginLeft: 18 }}>{accent}</span>
              ) : null}
            </div>
            {subtitle ? <div style={{ marginTop: 26, fontSize: 24, lineHeight: 1.4, color: "#cdbfa6", maxWidth: 640 }}>{subtitle}</div> : null}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 28, fontSize: 18, color: "#cdbfa6", paddingTop: 24, borderTop: "1px solid rgba(255,205,117,0.25)" }}>
            <span>{site.address.full}</span>
            <span style={{ color: "#ffcd75" }}>·</span>
            <span>{site.phone.display}</span>
            <span style={{ color: "#ffcd75" }}>·</span>
            <span>zufa.co.uk</span>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Cormorant Garamond", data: display, weight: 500, style: "normal" },
        { name: "Cormorant Garamond Italic", data: displayItalic, weight: 500, style: "italic" },
        { name: "Montserrat", data: sans, weight: 500, style: "normal" },
      ],
    },
  );

  const jpeg = await sharp(Buffer.from(await png.arrayBuffer())).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  return new Response(new Uint8Array(jpeg), {
    headers: {
      "Content-Type": OG_CONTENT_TYPE,
      "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
    },
  });
}
