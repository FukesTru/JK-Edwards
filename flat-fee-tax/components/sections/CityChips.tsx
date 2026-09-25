import Link from "next/link";
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
              "inline-flex items-center rounded-full border px-4 py-2 text-[15px] font-semibold transition-colors",
              tone === "dark"
                ? "border-white/15 text-white hover:border-gold hover:text-gold"
                : "border-line bg-white text-navy hover:border-gold",
            )}
          >
            {city.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
