import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { icons } from "@/components/ui/icon-map";
import type { Industry } from "@/content/industries";
import { getImage } from "@/lib/images";
import { cn } from "@/lib/utils";

/** Large photo card with gradient overlay; the whole card links to the industry page. */
export function IndustryCard({
  industry,
  className,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
}: {
  industry: Industry;
  className?: string;
  sizes?: string;
}) {
  const Icon = icons[industry.icon];
  const photo = getImage(industry.image);
  return (
    <article
      className={cn(
        "group relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-2xl bg-ink text-white shadow-[0_30px_60px_-35px_rgba(22,24,27,0.7)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent",
        className,
      )}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        className="-z-20 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/5" />
      <div className="p-6 sm:p-7">
        <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-accent-light backdrop-blur-sm transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
          <Icon aria-hidden className="h-5 w-5" strokeWidth={1.5} />
        </span>
        <h3 className="font-serif text-2xl leading-tight font-semibold">
          <Link href={industry.href} className="outline-none after:absolute after:inset-0">
            {industry.name}
          </Link>
        </h3>
        <p className="mt-2.5 text-[15px] leading-relaxed text-white/80">{industry.blurb}</p>
        <span aria-hidden className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-light">
          Explore
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
