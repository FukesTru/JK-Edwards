import { CalendarDays, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/Placeholder";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Online scheduling slot for /contact. Embeds the Calendly / GoHighLevel page
 * from NEXT_PUBLIC_BOOKING_URL when it is set; otherwise shows a clearly marked
 * placeholder while placeholders are visible, and nothing at all in production.
 */
export function BookingEmbed({ className }: { className?: string }) {
  if (site.bookingUrl) {
    return (
      <div className={cn("overflow-hidden rounded-2xl border border-line bg-white shadow-sm", className)}>
        <iframe
          title={`Schedule a free consultation with ${site.name}`}
          src={site.bookingUrl}
          loading="lazy"
          className="block h-[720px] w-full border-0"
        />
      </div>
    );
  }

  if (!site.showPlaceholders) return null;

  return (
    <Placeholder block note="Booking tool (Calendly / GoHighLevel) — set NEXT_PUBLIC_BOOKING_URL" className={className}>
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-charcoal/30 bg-white px-6 py-14 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent/10 text-accent">
          <CalendarDays aria-hidden className="h-7 w-7" strokeWidth={1.5} />
        </span>
        <p className="mt-5 font-serif text-2xl font-semibold text-ink">Online scheduling is coming soon</p>
        <p className="mt-2 max-w-md leading-relaxed text-charcoal">
          [BOOKING CALENDAR EMBED] In the meantime, send the form above or call us and we’ll find a time that works for
          you.
        </p>
        <ButtonLink href={site.phone.href} variant="outline-dark" icon="none" className="mt-6">
          <Phone aria-hidden className="h-4 w-4" strokeWidth={1.75} />
          Call {site.phone.display}
        </ButtonLink>
      </div>
    </Placeholder>
  );
}
