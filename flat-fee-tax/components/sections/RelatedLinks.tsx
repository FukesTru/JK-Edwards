import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export type RelatedLink = { label: string; href: string; description: string };

/** "Keep exploring" cross-links (2–4) to related services, industries or pages. */
export function RelatedLinks({
  links,
  title = "Related services",
  eyebrow = "Keep exploring",
}: {
  links: RelatedLink[];
  title?: string;
  eyebrow?: string;
}) {
  return (
    <div>
      <SectionHeading eyebrow={eyebrow} title={title} />
      <Stagger
        className={cn("mt-10 grid gap-5 sm:grid-cols-2", links.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")}
      >
        {links.map((link) => (
          <StaggerItem key={link.href}>
            <Link
              href={link.href}
              className="group block h-full rounded-2xl border border-line bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_24px_45px_-28px_rgba(15,30,51,0.35)]"
            >
              <span className="block">
                <span className="flex items-center justify-between gap-2 font-serif text-lg font-semibold text-navy">
                  {link.label}
                  <ArrowRight
                    aria-hidden
                    className="h-4 w-4 shrink-0 text-gold-deep transition-transform group-hover:translate-x-1"
                  />
                </span>
                <span className="mt-1.5 block text-[15px] leading-relaxed text-muted">{link.description}</span>
              </span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
