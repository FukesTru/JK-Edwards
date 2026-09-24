import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { brandColors, markSvg } from "@/lib/brand";
import { site } from "@/lib/site";

/**
 * Generated brand images: the Open Graph card, favicons/app icons and the
 * downloadable horizontal logos. The wordmark is always set from
 * `site.brandName` in Playfair Display 700, so renaming the brand needs no redraw.
 * Fonts are the OFL-licensed files in /assets/fonts.
 */

const fontDir = join(process.cwd(), "assets/fonts");
const font = (file: string) => readFile(join(fontDir, file));

async function loadFonts() {
  const [playfair700, inter400, inter600, inter700] = await Promise.all([
    font("playfair-display-latin-700-normal.woff"),
    font("inter-latin-400-normal.woff"),
    font("inter-latin-600-normal.woff"),
    font("inter-latin-700-normal.woff"),
  ]);
  return [
    { name: "Playfair Display", data: playfair700, weight: 700 as const, style: "normal" as const },
    { name: "Inter", data: inter400, weight: 400 as const, style: "normal" as const },
    { name: "Inter", data: inter600, weight: 600 as const, style: "normal" as const },
    { name: "Inter", data: inter700, weight: 700 as const, style: "normal" as const },
  ];
}

const dataUri = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
const markUri = (options: Parameters<typeof markSvg>[0]) => dataUri(markSvg(options));

export const ogSize = { width: 1200, height: 630 };

/** 1200×630 share card: logo and "CPA-Signed Tax Returns" on navy (no price — it's shared from every page). */
export async function renderOgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 88px",
        background: brandColors.navy,
        backgroundImage:
          "radial-gradient(circle at 90% 0%, rgba(201,162,75,0.28) 0%, rgba(201,162,75,0) 55%), repeating-linear-gradient(180deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0) 47px, rgba(255,255,255,0.03) 47px, rgba(255,255,255,0.03) 48px)",
        fontFamily: "Inter",
        color: brandColors.white,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markUri({ tile: false })} width={62} height={76} alt="" />
        <div style={{ display: "flex", fontFamily: "Playfair Display", fontWeight: 700, fontSize: 52 }}>
          {site.brandName}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Playfair Display",
            fontWeight: 700,
            fontSize: 100,
            lineHeight: 1.04,
            letterSpacing: -1,
          }}
        >
          <span>CPA-Signed</span>
          <span style={{ color: brandColors.gold }}>Tax Returns</span>
        </div>
        <div style={{ width: 64, height: 5, borderRadius: 3, background: brandColors.gold, marginTop: 34 }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#B7C1D1" }}>
        <span>Prepared & signed by a CPA · Reviewed by an Enrolled Agent</span>
        <span style={{ color: brandColors.white, fontWeight: 600 }}>{site.primaryCity}</span>
      </div>
    </div>,
    { ...ogSize, fonts: await loadFonts() },
  );
}

/** Square app icon / favicon: the mark on a navy tile. Sizes ≤ 32px use the bolder small mark. */
export function renderIcon(size: number, { rounded = true }: { rounded?: boolean } = {}) {
  const small = size <= 32;
  const svg = markSvg({ tile: true, small }).replace(/rx="\d+"/, `rx="${rounded ? (small ? 12 : 14) : 0}"`);
  return new ImageResponse(
    // eslint-disable-next-line @next/next/no-img-element
    <img src={dataUri(svg)} width={size} height={size} alt="" />,
    { width: size, height: size },
  );
}

/* ---- Horizontal logos ---------------------------------------------------- */

type Tone = "dark" | "light";

const toneColors = (tone: Tone) =>
  tone === "dark"
    ? { background: brandColors.navy, text: brandColors.white }
    : { background: brandColors.white, text: brandColors.navy };

/** PNG horizontal logo, trimmed to its content with even padding. */
export async function renderLogoPng(tone: Tone) {
  const { background, text } = toneColors(tone);
  const fontSize = 120;
  const response = new ImageResponse(
    <div style={{ display: "flex", alignItems: "center", gap: 44, height: "100%", paddingLeft: 10 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={markUri({ tile: tone === "light", small: false })}
        width={tone === "light" ? 170 : 139}
        height={170}
        alt=""
      />
      <div style={{ display: "flex", fontFamily: "Playfair Display", fontWeight: 700, fontSize, color: text }}>
        {site.brandName}
      </div>
    </div>,
    { width: 3000, height: 240, fonts: await loadFonts() },
  );
  const pad = 48;
  const png = await sharp(Buffer.from(await response.arrayBuffer()))
    .trim()
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .flatten({ background })
    .png()
    .toBuffer();
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
}

/** Width of the wordmark at a given font size (measured by rendering it). */
async function measureWordmark(fontSize: number) {
  const response = new ImageResponse(
    <div style={{ display: "flex", fontFamily: "Playfair Display", fontWeight: 700, fontSize, color: "#000" }}>
      {site.brandName}
    </div>,
    { width: 4000, height: Math.ceil(fontSize * 1.6), fonts: await loadFonts() },
  );
  const { info } = await sharp(Buffer.from(await response.arrayBuffer()))
    .trim()
    .toBuffer({ resolveWithObject: true });
  return info.width;
}

const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * SVG horizontal logo with the wordmark as live <text> and Playfair Display
 * embedded, so it renders correctly anywhere and stays editable.
 */
export async function renderLogoSvg(tone: Tone) {
  const { background, text } = toneColors(tone);
  const fontSize = 44;
  const textWidth = Math.ceil((await measureWordmark(fontSize * 4)) / 4) + 4;
  const fontData = (await font("playfair-display-latin-700-normal.woff2")).toString("base64");

  const pad = 20;
  const markHeight = 64;
  const markWidth = tone === "light" ? 64 : Math.round((40 / 49) * markHeight);
  const gap = 18;
  const width = pad * 2 + markWidth + gap + textWidth;
  const height = pad * 2 + markHeight;
  const mark = markSvg({ tile: tone === "light" })
    .replace("<svg ", `<svg x="${pad}" y="${pad}" width="${markWidth}" height="${markHeight}" `)
    .replace(' xmlns="http://www.w3.org/2000/svg"', "");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${escapeXml(site.brandName)}">
  <style>@font-face{font-family:"Playfair Display";font-weight:700;src:url(data:font/woff2;base64,${fontData}) format("woff2");}</style>
  <rect width="100%" height="100%" fill="${background}"/>
  ${mark}
  <text x="${pad + markWidth + gap}" y="${pad + markHeight / 2}" dominant-baseline="central" font-family="'Playfair Display', Georgia, serif" font-weight="700" font-size="${fontSize}" fill="${text}">${escapeXml(site.brandName)}</text>
</svg>`;
  return new Response(svg, { headers: { "Content-Type": "image/svg+xml" } });
}
