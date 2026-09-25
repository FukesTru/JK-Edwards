import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { City } from "@/content/cities";
import { cn } from "@/lib/utils";

/** City card for /areas-we-serve and "nearby" links. Cities without a page link to #anchor copy instead. */
export function CityCard({ city, href, className }: { city: City; href: string; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_28px_50px_-30px_rgba(15,30,51,0.45)]",
        className,
      )}
    >
      <span className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">{city.county}</span>
      <span className="mt-3 font-serif text-2xl font-semibold text-navy">{city.name}, GA</span>
      <span className="mt-2 flex-1 leading-relaxed text-muted">{city.blurb}</span>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-deep">
        {city.slug ? `Tax preparation in ${city.name}` : "Read more"}
        <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
