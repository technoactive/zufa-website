import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

const mark = readFile(path.join(process.cwd(), "public/brand/zufa-mark-white.png")).then(
  (buffer) => `data:image/png;base64,${buffer.toString("base64")}`,
);

/** Square app icon: the white Zufa mark on the brand ink background. */
export async function renderIcon(size: number, radius = 0) {
  const src = await mark;
  const inset = Math.round(size * 0.16);
  return new ImageResponse(
    (
      <div
        style={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c0b09",
          borderRadius: radius,
        }}
      >
        <img src={src} alt="" width={size - inset * 2} height={size - inset * 2} style={{ objectFit: "contain" }} />
      </div>
    ),
    { width: size, height: size },
  );
}
