import { ArrowUpRight } from "lucide-react";
import { ServiceAreaMapCanvas, type MapPoint } from "@/components/sections/ServiceAreaMapCanvas";
import { cities, cityAnchor } from "@/content/cities";
import { directionsUrl, site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Labels that would collide with a neighbour's sit on the left of their pin. */
const leftLabels = new Set(["Sharpsburg", "Senoia"]);

const points: MapPoint[] = cities.map((city) => ({
  name: city.name,
  href: city.slug ? `/areas-we-serve/${city.slug}` : `/areas-we-serve#${cityAnchor(city.name)}`,
  coordinates: city.coordinates,
  office: site.primaryCity.startsWith(city.name),
  labelSide: leftLabels.has(city.name) ? "left" : "right",
}));

/**
 * Real, interactive map of Fayette & Coweta County with a pin for every city
 * we serve, plus a legend and a directions link.
 */
export function ServiceAreaMap({ className, mapClassName }: { className?: string; mapClassName?: string }) {
  return (
    <figure className={cn("m-0", className)}>
      <ServiceAreaMapCanvas
        points={points}
        label={`Map of Fayette and Coweta County, Georgia, with the cities we serve: ${cities.map((city) => city.name).join(", ")}`}
        className={cn("aspect-[4/3]", mapClassName)}
      />
      <figcaption className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
        <span className="flex items-center gap-2">
          <span aria-hidden className="h-3.5 w-3.5 rounded-full border-2 border-navy bg-gold" />
          Our office
        </span>
        <span className="flex items-center gap-2">
          <span
            aria-hidden
            className="h-3 w-3 rounded-full border-2 border-white bg-navy shadow-[0_0_0_1px_var(--line)]"
          />
          Cities we serve
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden className="h-3 w-4 rounded-[3px] border-2 border-gold-deep bg-gold/15" />
          Fayette &amp; Coweta County
        </span>
        <a
          href={directionsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 py-1 font-semibold text-navy underline-offset-4 hover:underline sm:ml-auto"
        >
          Get directions
          <ArrowUpRight aria-hidden className="h-4 w-4" />
          <span className="sr-only"> (opens Google Maps in a new tab)</span>
        </a>
      </figcaption>
    </figure>
  );
}
