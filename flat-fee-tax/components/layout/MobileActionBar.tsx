import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { cta } from "@/lib/cta";
import { phoneHref, site } from "@/lib/site";

/** Floating "Call" + "Start My Return" bar on screens narrower than 768px. */
export function MobileActionBar() {
  return (
    <nav
      aria-label="Quick actions"
      data-print-hide
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-10px_30px_-12px_rgba(0,0,0,0.55)] backdrop-blur-md md:hidden"
    >
      <div className="grid grid-cols-[0.8fr_1.2fr] gap-3">
        <a
          href={phoneHref}
          aria-label={`Call ${site.phone}`}
          className={buttonClasses("outline-light", "md", "px-3 py-3")}
        >
          <Phone aria-hidden className="h-4 w-4" strokeWidth={1.75} />
          Call
        </a>
        <Link href={cta.taxPrep.href} className={buttonClasses("primary", "md", "px-3 py-3 whitespace-nowrap")}>
          {cta.taxPrep.label}
          <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </nav>
  );
}
