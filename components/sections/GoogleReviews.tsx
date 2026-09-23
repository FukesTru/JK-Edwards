import { ArrowUpRight, MessageSquareQuote, Star } from "lucide-react";
import { Placeholder } from "@/components/ui/Placeholder";
import { site } from "@/lib/site";

/**
 * Reviews slot. Embed the Google Business Profile reviews widget here once the
 * profile URL is confirmed — testimonials are never written or invented.
 */
export function GoogleReviews() {
  return (
    <Placeholder
      block
      note="Google Reviews embed placeholder — connect the Google Business Profile widget (no invented quotes)"
    >
      <div className="grid items-center gap-8 rounded-2xl border border-line bg-white p-8 sm:p-10 md:grid-cols-[auto_1fr_auto]">
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-accent/10 text-accent">
          <MessageSquareQuote aria-hidden className="h-8 w-8" strokeWidth={1.5} />
        </span>
        <div>
          <div aria-hidden className="flex gap-1 text-accent">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5" strokeWidth={1.5} />
            ))}
          </div>
          <p className="mt-3 font-serif text-2xl font-semibold text-ink">Hear it from our clients</p>
          <p className="mt-2 max-w-xl leading-relaxed text-charcoal">
            Our latest Google reviews will appear here, pulled live from our Google Business Profile. In the meantime,
            you can read them directly on Google.
          </p>
        </div>
        <a
          href={site.links.googleReviews}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-[6px] border border-charcoal/45 px-5 py-3 text-[15px] font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
        >
          Read reviews on Google
          <ArrowUpRight aria-hidden className="h-4 w-4" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </Placeholder>
  );
}
