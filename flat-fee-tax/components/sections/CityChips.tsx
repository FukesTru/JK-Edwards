import Link from "next/link";
import { MapPin } from "lucide-react";
import { cities } from "@/content/cities";
import { cn } from "@/lib/utils";

/** The seven cities as chips; the five with pages link to them, the others to /areas-we-serve. */
export function CityChips({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2.5", className)}>
      {cities.map((city) => (
        <li key={city.name}>
          <Link
            href={city.slug ? `/areas-we-serve/${city.slug}` : "/areas-we-serve"}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[15px] font-semibold transition-colors",
              tone === "dark"
                ? "border-white/15 text-white hover:border-gold hover:text-gold"
                : "border-line bg-white text-navy hover:border-gold",
            )}
          >
            <MapPin
              aria-hidden
              className={cn("h-4 w-4", tone === "dark" ? "text-gold" : "text-gold-deep")}
              strokeWidth={1.75}
            />
            {city.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
