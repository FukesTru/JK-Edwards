import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { tokens } from "@/lib/tokens";

/**
 * Shared renderers for generated brand images (Open Graph cards, schema logo,
 * app icons). Fonts are the OFL-licensed WOFF files in /assets/fonts.
 */

const fontDir = join(process.cwd(), "assets/fonts");

async function loadFonts() {
  const [playfair400, playfair600, inter400, inter600] = await Promise.all([
    readFile(join(fontDir, "playfair-display-latin-400-normal.woff")),
    readFile(join(fontDir, "playfair-display-latin-600-normal.woff")),
    readFile(join(fontDir, "inter-latin-400-normal.woff")),
    readFile(join(fontDir, "inter-latin-600-normal.woff")),
  ]);
  return [
    { name: "Playfair Display", data: playfair400, weight: 400 as const, style: "normal" as const },
    { name: "Playfair Display", data: playfair600, weight: 600 as const, style: "normal" as const },
    { name: "Inter", data: inter400, weight: 400 as const, style: "normal" as const },
    { name: "Inter", data: inter600, weight: 600 as const, style: "normal" as const },
  ];
}

export const ogSize = { width: 1200, height: 630 };

const glow = `radial-gradient(circle at 88% 0%, rgba(192, 77, 0, 0.38) 0%, rgba(192, 77, 0, 0) 55%)`;

function Wordmark({ size }: { size: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: size * 0.32 }}>
      <div style={{ width: size * 0.42, height: size * 0.42, background: tokens.accent, borderRadius: size * 0.06 }} />
      <div style={{ display: "flex", fontFamily: "Playfair Display", fontSize: size, letterSpacing: -0.5 }}>
        <span style={{ color: tokens.white, fontWeight: 600 }}>JK Edwards</span>
        <span style={{ color: tokens.mist, fontWeight: 400, marginLeft: size * 0.24 }}>& Company</span>
      </div>
    </div>
  );
}

/** Default share card: logo on ink with the firm’s services and location. */
export async function renderDefaultOgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "84px 96px",
        background: tokens.ink,
        backgroundImage: glow,
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Wordmark size={78} />
        <div style={{ width: 64, height: 5, borderRadius: 3, background: tokens.accent, marginTop: 44 }} />
        <div style={{ marginTop: 40, fontSize: 36, color: tokens.white, lineHeight: 1.35, maxWidth: 900 }}>
          Tax preparation & planning, bookkeeping, payroll and IRS problem resolution.
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: tokens.mist }}>
        <span>Hampton, Georgia · Serving clients nationwide</span>
        <span style={{ color: tokens.white, fontWeight: 600 }}>(770) 472-2005</span>
      </div>
    </div>,
    { ...ogSize, fonts: await loadFonts() },
  );
}

/** Blog share card: category, post title and the firm wordmark. */
export async function renderArticleOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  const titleSize = title.length > 60 ? 58 : 66;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px 96px",
        background: tokens.ink,
        backgroundImage: glow,
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: tokens.accentLight,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            marginTop: 28,
            fontFamily: "Playfair Display",
            fontWeight: 600,
            fontSize: titleSize,
            lineHeight: 1.12,
            color: tokens.white,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div style={{ width: 64, height: 5, borderRadius: 3, background: tokens.accent, marginTop: 36 }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Wordmark size={40} />
        <span style={{ fontSize: 24, color: tokens.mist }}>jkedwards.com/blog</span>
      </div>
    </div>,
    { ...ogSize, fonts: await loadFonts() },
  );
}

/** Square logo for schema.org (`/logo.png`) until official logo files are supplied. */
export async function renderLogo(size = 600) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: tokens.ink,
        fontFamily: "Playfair Display",
      }}
    >
      <div style={{ width: size * 0.09, height: size * 0.09, background: tokens.accent, borderRadius: size * 0.012 }} />
      <div style={{ marginTop: size * 0.07, fontSize: size * 0.15, fontWeight: 600, color: tokens.white }}>
        JK Edwards
      </div>
      <div style={{ marginTop: size * 0.01, fontSize: size * 0.085, fontWeight: 400, color: tokens.mist }}>
        & Company
      </div>
    </div>,
    { width: size, height: size, fonts: await loadFonts() },
  );
}

/** App icon / favicon: "JK" monogram on the accent color. */
export async function renderIcon(size: number, { rounded = true }: { rounded?: boolean } = {}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: tokens.ink,
        borderRadius: rounded ? size * 0.2 : 0,
      }}
    >
      <div
        style={{
          display: "flex",
          fontFamily: "Playfair Display",
          fontWeight: 600,
          fontSize: size * 0.5,
          color: tokens.white,
          letterSpacing: -size * 0.01,
          marginTop: -size * 0.04,
        }}
      >
        JK
      </div>
      <div
        style={{
          position: "absolute",
          right: size * 0.14,
          bottom: size * 0.16,
          width: size * 0.13,
          height: size * 0.13,
          background: tokens.accent,
          borderRadius: size * 0.02,
        }}
      />
    </div>,
    { width: size, height: size, fonts: await loadFonts() },
  );
}
