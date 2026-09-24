import { Star } from "lucide-react";
import { Placeholder } from "@/components/ui/Placeholder";

/** Slot for the Google Business Profile reviews widget. No invented reviews or ratings. */
export function ReviewsPlaceholder() {
  return (
    <Placeholder
      block
      note="Connect the Google Business Profile reviews widget — never add invented reviews or ratings"
    >
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-navy/25 bg-white px-6 py-14 text-center">
        <span className="flex gap-1 text-line" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-6 w-6" strokeWidth={1.5} />
          ))}
        </span>
        <p className="mt-4 font-semibold tracking-wide text-navy">[CONNECT GOOGLE BUSINESS PROFILE]</p>
        <p className="mt-2 max-w-md text-muted">
          Client reviews will appear here once our Google Business Profile is connected.
        </p>
      </div>
    </Placeholder>
  );
}
