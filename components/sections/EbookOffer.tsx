import { BookOpen } from "lucide-react";
import { EbookForm } from "@/components/forms/EbookForm";
import { Placeholder } from "@/components/ui/Placeholder";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Email-gated eBook lead magnet (dark section content). The cover is drawn in
 * CSS until the client supplies the PDF + artwork — see README checklist.
 */
export function EbookOffer({
  id,
  title,
  ebookName,
  intro,
  bullets,
  downloadUrl,
}: {
  id: string;
  title: string;
  ebookName: string;
  intro: string;
  bullets: string[];
  downloadUrl?: string;
}) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <Placeholder
        block
        note="eBook PDF + cover art — client to provide (old Cloudinary files)"
        className="mx-auto w-full max-w-xs"
      >
        <div className="relative mx-auto aspect-[3/4] w-full max-w-xs -rotate-3 rounded-l-sm rounded-r-xl bg-gradient-to-br from-[#2a2d32] to-ink p-7 shadow-[30px_40px_60px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
          <div aria-hidden className="absolute inset-y-0 left-0 w-3 rounded-l-sm bg-black/30" />
          <div className="flex h-full flex-col justify-between pl-3">
            <div>
              <span aria-hidden className="block h-3 w-3 rounded-[2px] bg-accent" />
              <p className="mt-5 text-[11px] font-semibold tracking-[0.2em] text-accent-light uppercase">Free eBook</p>
              <p className="mt-3 font-serif text-2xl leading-tight font-semibold text-white">{ebookName}</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-mist">
              <BookOpen aria-hidden className="h-4 w-4 text-accent-light" strokeWidth={1.5} />
              JK Edwards &amp; Company
            </div>
          </div>
        </div>
      </Placeholder>
      <div>
        <SectionHeading id={id} tone="dark" eyebrow="Free download" title={title} intro={intro} />
        <ul className="mt-6 space-y-2.5 text-white/90">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3">
              <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-light" />
              {bullet}
            </li>
          ))}
        </ul>
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <EbookForm ebook={ebookName} downloadUrl={downloadUrl} />
        </div>
      </div>
    </div>
  );
}
