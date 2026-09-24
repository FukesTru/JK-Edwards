import { Info } from "lucide-react";
import { Confirm } from "@/components/ui/Placeholder";
import { site } from "@/lib/site";

const c = site.confirm;

/** Pricing fine print. Every line reads from site.confirm and shows [CLIENT TO CONFIRM] until answered. */
export function GoodToKnow() {
  const lines = [
    { label: "Georgia state return included?", value: c.stateReturn },
    { label: "Price per return (single or married filing jointly)", value: c.jointReturns },
    { label: "Schedule C businesses / Schedule E properties included", value: c.multipleSchedules },
    { label: "Prior-year returns", value: c.priorYearReturns },
    { label: "Amended returns", value: c.amendedReturns },
    { label: "When payment is due", value: c.paymentTiming },
  ];
  return (
    <aside aria-labelledby="good-to-know" className="rounded-2xl border border-gold/50 bg-white p-7 sm:p-9">
      <h2 id="good-to-know" className="flex items-center gap-3 font-serif text-2xl font-semibold text-navy">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy text-gold">
          <Info aria-hidden className="h-5 w-5" strokeWidth={1.75} />
        </span>
        Good to know
      </h2>
      <dl className="mt-6 divide-y divide-line">
        {lines.map((line) => (
          <div key={line.label} className="grid gap-1 py-4 sm:grid-cols-[1fr_1fr] sm:gap-6">
            <dt className="font-medium text-ink">{line.label}</dt>
            <dd className="text-muted">
              <Confirm value={line.value} note={`site.config.ts → confirm: ${line.label}`} />
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
