import { mapEmbedUrl, site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Lazy-loaded Google Maps embed of the office (centered on Peachtree City until the address is set). */
export function MapEmbed({ className, height = 380 }: { className?: string; height?: number }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-line bg-paper shadow-sm", className)}>
      <iframe
        title={`Map showing ${site.brandName} in ${site.primaryCity}`}
        src={mapEmbedUrl}
        width="100%"
        height={height}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block w-full border-0"
        style={{ height }}
      />
    </div>
  );
}
