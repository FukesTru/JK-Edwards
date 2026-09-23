import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Lazy-loaded Google Maps embed of the Hampton office (no API key required). */
export function MapEmbed({ className, height = 380 }: { className?: string; height?: number }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-line bg-paper shadow-sm", className)}>
      <iframe
        title={`Map showing ${site.name} at ${site.address.street}, ${site.address.suite}, ${site.address.city}, ${site.address.region}`}
        src={site.links.mapEmbed}
        width="100%"
        height={height}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block w-full border-0 contrast-[1.05] grayscale-[35%]"
        style={{ height }}
      />
    </div>
  );
}
