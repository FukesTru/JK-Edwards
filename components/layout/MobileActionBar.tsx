import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { site } from "@/lib/site";

/** Always-visible Call / Book bar on screens narrower than 768px. */
export function MobileActionBar() {
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-10px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur-md md:hidden"
    >
      <div className="grid grid-cols-2 gap-3">
        <a href={site.phone.href} className={buttonClasses("outline-light", "md", "px-3 py-3")}>
          <Phone aria-hidden className="h-4 w-4" strokeWidth={1.75} />
          Call
        </a>
        <Link href="/contact" className={buttonClasses("primary", "md", "px-3 py-3")}>
          Book
          <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </nav>
  );
}
