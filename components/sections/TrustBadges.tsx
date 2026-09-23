import { BadgeCheck, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Placeholder } from "@/components/ui/Placeholder";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Affiliation badges + Google rating slot (pulled live from the Business Profile — never hard-coded). */
export function TrustBar() {
  return (
    <section aria-label="Affiliations and reviews" className="border-b border-line bg-white">
      <Container className="flex flex-col items-center gap-6 py-8 lg:flex-row lg:justify-between">
        <ul className="grid w-full grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 lg:w-auto lg:gap-x-10">
          {site.affiliations.map((badge) => (
            <li key={badge.name} className="flex items-center gap-2.5">
              <BadgeCheck aria-hidden className="h-6 w-6 shrink-0 text-accent" strokeWidth={1.5} />
              <span className="leading-tight">
                <span className="block text-sm font-semibold text-ink lg:whitespace-nowrap">{badge.name}</span>
                <span className="block text-xs text-charcoal">{badge.detail}</span>
              </span>
            </li>
          ))}
        </ul>
        <GoogleRatingSlot />
      </Container>
    </section>
  );
}

export function GoogleRatingSlot({ className }: { className?: string }) {
  return (
    <Placeholder note="Google rating widget — connect the Google Business Profile (do not hard-code a rating)">
      <a
        href={site.links.googleReviews}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center gap-3 rounded-full border border-line bg-paper px-4 py-2.5 text-sm transition-colors hover:border-accent/40",
          className,
        )}
      >
        <span aria-hidden className="flex gap-0.5 text-accent">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4" strokeWidth={1.5} />
          ))}
        </span>
        <span className="font-semibold whitespace-nowrap text-ink">Our Google reviews</span>
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </Placeholder>
  );
}
