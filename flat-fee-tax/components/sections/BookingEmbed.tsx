import { CalendarDays } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { ConfigValue, Placeholder } from "@/components/ui/Placeholder";
import { bookingHref, phoneHref, site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Online scheduling slot for /get-started. Embeds the Calendly / GoHighLevel
 * page from `bookingUrl` in site.config.ts once it's set; until then shows a
 * clearly marked placeholder.
 */
export function BookingEmbed({ className }: { className?: string }) {
  if (bookingHref) {
    return (
      <div className={cn("overflow-hidden rounded-2xl border border-line bg-white shadow-sm", className)}>
        <iframe
          title={`Book an appointment with ${site.brandName}`}
          src={bookingHref}
          loading="lazy"
          className="block h-[720px] w-full border-0"
        />
      </div>
    );
  }

  return (
    <Placeholder block note="Booking calendar — set bookingUrl in site.config.ts" className={className}>
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-navy/25 bg-white px-6 py-14 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy text-gold">
          <CalendarDays aria-hidden className="h-7 w-7" strokeWidth={1.5} />
        </span>
        <p className="mt-5 font-serif text-2xl font-semibold text-navy">Online booking calendar</p>
        <p className="mt-2 max-w-md leading-relaxed text-muted">
          <ConfigValue value={site.bookingUrl} /> — the scheduling calendar will appear here. Until then, send the form
          or call and we’ll find a time together.
        </p>
        <ButtonLink href={phoneHref} variant="outline-dark" icon="phone" className="mt-6">
          Call <ConfigValue value={site.phone} />
        </ButtonLink>
      </div>
    </Placeholder>
  );
}
