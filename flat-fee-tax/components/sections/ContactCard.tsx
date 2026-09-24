import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { ConfigValue } from "@/components/ui/Placeholder";
import { directionsUrl, emailHref, phoneHref, site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Phone / email / address / hours card with directions + call buttons. */
export function ContactCard({ className, directionsFrom }: { className?: string; directionsFrom?: string }) {
  return (
    <div className={cn("@container rounded-2xl border border-line bg-white p-7 sm:p-8", className)}>
      <p className="font-serif text-2xl font-semibold text-navy">
        <ConfigValue value={site.brandName} />
      </p>
      <p className="mt-1 text-sm text-muted">{site.owner}</p>
      <address className="mt-6 space-y-4 not-italic">
        <p className="flex gap-3 text-ink">
          <MapPin aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-navy" strokeWidth={1.5} />
          <ConfigValue value={site.address} />
        </p>
        <p className="flex items-center gap-3">
          <Phone aria-hidden className="h-5 w-5 shrink-0 text-navy" strokeWidth={1.5} />
          <a href={phoneHref} className="font-semibold text-navy tabular-nums hover:text-gold-deep">
            <ConfigValue value={site.phone} />
          </a>
        </p>
        <p className="flex items-center gap-3">
          <Mail aria-hidden className="h-5 w-5 shrink-0 text-navy" strokeWidth={1.5} />
          <a href={emailHref} className="text-ink hover:text-gold-deep">
            <ConfigValue value={site.email} />
          </a>
        </p>
        <p className="flex gap-3 text-ink">
          <Clock aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-navy" strokeWidth={1.5} />
          <ConfigValue value={site.hours} />
        </p>
      </address>
      <div className="mt-7 flex flex-col gap-3 @min-[26rem]:flex-row @min-[26rem]:flex-wrap">
        <ButtonLink
          href={directionsUrl(directionsFrom)}
          external
          variant="outline-dark"
          icon="none"
          className="whitespace-nowrap"
        >
          <Navigation aria-hidden className="h-4 w-4" strokeWidth={1.75} />
          {directionsFrom ? `Directions from ${directionsFrom.split(",")[0]}` : "Get Directions"}
        </ButtonLink>
        <ButtonLink href={phoneHref} variant="primary" icon="phone" className="whitespace-nowrap">
          Call <ConfigValue value={site.phone} />
        </ButtonLink>
      </div>
    </div>
  );
}
