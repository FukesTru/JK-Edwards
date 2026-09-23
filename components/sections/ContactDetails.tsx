import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/Placeholder";
import { site } from "@/lib/site";
import { cn, formatHour } from "@/lib/utils";

/** Name / address / phone / email / hours card with directions + call buttons. */
export function ContactDetails({ className, showButtons = true }: { className?: string; showButtons?: boolean }) {
  return (
    <div className={cn("rounded-2xl border border-line bg-white p-7 sm:p-8", className)}>
      <p className="font-serif text-2xl font-semibold text-ink">{site.name}</p>
      <address className="mt-5 space-y-4 not-italic">
        <p className="flex gap-3 text-ink">
          <MapPin aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} />
          <span>
            {site.address.street}, {site.address.suite}
            <br />
            {site.address.city}, {site.address.region} {site.address.postalCode}
          </span>
        </p>
        <p className="flex items-center gap-3">
          <Phone aria-hidden className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} />
          <a href={site.phone.href} className="font-semibold text-ink tabular-nums hover:text-accent-strong">
            {site.phone.display}
          </a>
        </p>
        <p className="flex items-center gap-3">
          <Mail aria-hidden className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} />
          <a href={`mailto:${site.email}`} className="text-ink hover:text-accent-strong">
            {site.email}
          </a>
        </p>
      </address>

      <div className="mt-6 border-t border-line pt-6">
        <p className="flex items-center gap-3 font-semibold text-ink">
          <Clock aria-hidden className="h-5 w-5 text-accent" strokeWidth={1.5} />
          Office hours
        </p>
        <Placeholder block note="Hours from Yelp — may be tax-season only (client to confirm)" className="mt-3">
          <dl className="grid grid-cols-[6.5rem_1fr] gap-y-1.5 text-[15px]">
            {site.hours.map((h) => (
              <div key={h.day} className="contents">
                <dt className="text-charcoal">{h.day}</dt>
                <dd className="text-ink tabular-nums">
                  {h.opens && h.closes ? `${formatHour(h.opens)} – ${formatHour(h.closes)}` : "Closed"}
                </dd>
              </div>
            ))}
          </dl>
        </Placeholder>
      </div>

      {showButtons && (
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={site.links.directions} external variant="outline-dark" icon="none">
            <Navigation aria-hidden className="h-4 w-4" strokeWidth={1.75} />
            Get Directions
          </ButtonLink>
          <ButtonLink href={site.phone.href} variant="primary">
            Call {site.phone.display}
          </ButtonLink>
        </div>
      )}
    </div>
  );
}
