import { Download } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { LogoMark } from "@/components/brand/LogoMark";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/seo";
import { withBasePath } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Brand Kit",
  description:
    "Logo system for review: horizontal logos for light and dark backgrounds, the icon mark, favicon sizes, brand colors and typography. Internal page, not indexed.",
  path: "/brand",
  noindex: true,
});

const downloads = [
  { label: "Horizontal logo for dark backgrounds (SVG)", href: "/brand/logo-horizontal-dark.svg" },
  { label: "Horizontal logo for dark backgrounds (PNG)", href: "/brand/logo-horizontal-dark.png" },
  { label: "Horizontal logo for light backgrounds (SVG)", href: "/brand/logo-horizontal-light.svg" },
  { label: "Horizontal logo for light backgrounds (PNG)", href: "/brand/logo-horizontal-light.png" },
  { label: "Square icon mark (SVG)", href: "/brand/icon-mark.svg" },
  { label: "App icon 512 × 512 (PNG)", href: "/brand/icon-512.png" },
  { label: "App icon 192 × 192 (PNG)", href: "/brand/icon-192.png" },
  { label: "Apple touch icon 180 × 180 (PNG)", href: "/brand/apple-touch-icon.png" },
  { label: "Favicon 32 × 32 (PNG)", href: "/brand/favicon-32.png" },
  { label: "Favicon 16 × 16 (PNG)", href: "/brand/favicon-16.png" },
];

const colors = [
  { name: "Navy", token: "--navy", hex: "#0F1E33", text: "text-white" },
  { name: "Navy 2", token: "--navy-2", hex: "#1B2F4D", text: "text-white" },
  { name: "Gold", token: "--gold", hex: "#C9A24B", text: "text-navy" },
  { name: "Gold hover", token: "--gold-hover", hex: "#B08A36", text: "text-navy" },
  { name: "Ink", token: "--ink", hex: "#1A1D21", text: "text-white" },
  { name: "Muted", token: "--muted", hex: "#5B6472", text: "text-white" },
  { name: "Paper", token: "--paper", hex: "#F6F4EF", text: "text-navy" },
  { name: "Success", token: "--success", hex: "#2E7D5B", text: "text-white" },
];

export default function BrandPage() {
  return (
    <>
      <PageHero
        eyebrow="Internal · for approval"
        title="Brand Kit"
        subtitle="The logo system, colors and type. The wordmark is live text from site.config.ts, so renaming the business updates every logo automatically."
      />
      <Breadcrumbs items={[{ name: "Brand Kit", path: "/brand" }]} />

      <Section tone="white" labelledBy="logos-heading">
        <SectionHeading id="logos-heading" eyebrow="Logo" title="Horizontal logos" />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="grid min-h-48 place-items-center rounded-2xl bg-navy p-10">
            <Logo tone="dark" />
          </div>
          <div className="grid min-h-48 place-items-center rounded-2xl border border-line bg-white p-10">
            <Logo tone="light" />
          </div>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div className="grid place-items-center rounded-2xl border border-line bg-paper p-8">
            <LogoMark tile className="h-28 w-28" />
            <p className="mt-4 text-sm text-muted">Icon mark</p>
          </div>
          <div className="grid place-items-center rounded-2xl bg-navy p-8">
            <LogoMark className="h-28 w-auto" />
            <p className="mt-4 text-sm text-mist">Mark on navy</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-line bg-paper p-8">
            <div className="flex items-end gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={withBasePath("/brand/favicon-32.png")} width={32} height={32} alt="32 pixel favicon" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={withBasePath("/brand/favicon-16.png")} width={16} height={16} alt="16 pixel favicon" />
            </div>
            <p className="text-sm text-muted">Favicons (32 · 16)</p>
          </div>
        </div>
      </Section>

      <Section tone="paper" labelledBy="downloads-heading">
        <SectionHeading id="downloads-heading" eyebrow="Files" title="Downloads" />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {downloads.map((file) => (
            <li key={file.href}>
              <a
                href={withBasePath(file.href)}
                download
                className="flex items-center justify-between gap-4 rounded-xl border border-line bg-white px-5 py-4 font-medium text-navy hover:border-gold"
              >
                {file.label}
                <Download aria-hidden className="h-4 w-4 shrink-0 text-gold-deep" strokeWidth={1.75} />
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white" labelledBy="colors-heading">
        <SectionHeading id="colors-heading" eyebrow="Color" title="Palette" />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {colors.map((color) => (
            <li
              key={color.token}
              className={`rounded-2xl border border-line p-5 ${color.text}`}
              style={{ backgroundColor: color.hex }}
            >
              <p className="font-semibold">{color.name}</p>
              <p className="mt-6 font-mono text-sm">{color.hex}</p>
              <p className="font-mono text-xs opacity-80">{color.token}</p>
            </li>
          ))}
        </ul>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-line p-7">
            <p className="font-serif text-4xl font-bold text-navy">Playfair Display</p>
            <p className="mt-2 text-muted">Headlines · 600 / 700</p>
          </div>
          <div className="rounded-2xl border border-line p-7">
            <p className="text-4xl font-semibold text-navy">Inter</p>
            <p className="mt-2 text-muted">Body and UI · 400 / 500 / 600 · prices in 700 with tabular figures</p>
          </div>
        </div>
      </Section>
    </>
  );
}
