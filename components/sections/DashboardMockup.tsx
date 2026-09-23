import { ArrowDownRight, ArrowUpRight } from "lucide-react";

/**
 * Illustrative advisory dashboard — clearly labeled SAMPLE DATA.
 * Emphasis form: the current month in the brand accent, prior months in a
 * de-emphasis gray. Context bars sit below 3:1 contrast, so every value is
 * also available on hover/focus and in the table view (relief rule).
 */

const months = [
  { label: "Apr", full: "April", value: 61200 },
  { label: "May", full: "May", value: 66400 },
  { label: "Jun", full: "June", value: 72100 },
  { label: "Jul", full: "July", value: 69800 },
  { label: "Aug", full: "August", value: 78900 },
  { label: "Sep", full: "September", value: 84200 },
];

const kpis = [
  { label: "Revenue this month", value: "$84.2K", delta: "+6.7% vs Aug", good: true, up: true },
  { label: "Gross margin", value: "41.8%", delta: "+1.2 pts vs Aug", good: true, up: true },
  { label: "Cash on hand", value: "$126K", delta: "+$9.4K vs Aug", good: true, up: true },
  { label: "Days to get paid", value: "27", delta: "−4 days vs Aug", good: true, up: false },
];

const TICKS = [0, 30000, 60000, 90000];
const MAX = 90000;
const PLOT_HEIGHT = 176;

const currency = (n: number) => `$${n.toLocaleString("en-US")}`;
const compact = (n: number) => (n === 0 ? "0" : `${Math.round(n / 1000)}K`);

export function DashboardMockup() {
  const last = months[months.length - 1];

  return (
    <figure className="relative rounded-2xl bg-white p-5 shadow-[0_40px_80px_-40px_rgba(22,24,27,0.55)] ring-1 ring-black/5 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <p className="font-semibold text-ink">Monthly CFO dashboard</p>
        <span className="rounded-full bg-paper px-3 py-1 text-xs font-semibold tracking-wide text-charcoal uppercase">
          Sample data
        </span>
      </div>

      {/* KPI row */}
      <dl className="mt-5 grid grid-cols-2 gap-3">
        {kpis.map((kpi) => {
          const Arrow = kpi.up ? ArrowUpRight : ArrowDownRight;
          return (
            <div key={kpi.label} className="rounded-xl border border-line p-3.5">
              <dt className="text-xs font-medium text-charcoal">{kpi.label}</dt>
              <dd className="mt-1.5 text-2xl font-semibold tracking-tight text-ink">{kpi.value}</dd>
              <dd className="mt-1 flex items-center gap-1 text-xs font-medium text-[#006300]">
                <Arrow aria-hidden className="h-3.5 w-3.5" strokeWidth={2} />
                {kpi.delta}
                <span className="sr-only">{kpi.good ? " (favorable)" : " (unfavorable)"}</span>
              </dd>
            </div>
          );
        })}
      </dl>

      {/* Revenue column chart */}
      <div className="mt-6">
        <p className="text-sm font-semibold text-ink">Monthly revenue</p>
        <p className="text-xs text-charcoal">April – September · current month highlighted</p>
        <div className="mt-4 flex gap-3">
          {/* Y axis */}
          <div
            aria-hidden
            className="relative w-8 shrink-0 text-right text-[11px] text-charcoal tabular-nums"
            style={{ height: PLOT_HEIGHT }}
          >
            {TICKS.map((tick) => (
              <span
                key={tick}
                className="absolute right-0 -translate-y-1/2"
                style={{ bottom: `${(tick / MAX) * 100}%` }}
              >
                {compact(tick)}
              </span>
            ))}
          </div>
          {/* Plot */}
          <div className="flex-1">
            <div className="relative" style={{ height: PLOT_HEIGHT }}>
              {TICKS.map((tick) => (
                <div
                  key={tick}
                  aria-hidden
                  className={tick === 0 ? "absolute inset-x-0 h-px bg-[#c9c4bc]" : "absolute inset-x-0 h-px bg-[#eeebe6]"}
                  style={{ bottom: `${(tick / MAX) * 100}%` }}
                />
              ))}
              <ul className="absolute inset-0 flex items-end justify-around" aria-label="Monthly revenue, sample data">
                {months.map((month) => {
                  const current = month === last;
                  const height = (month.value / MAX) * PLOT_HEIGHT;
                  return (
                    <li key={month.label} className="relative flex h-full w-full items-end justify-center">
                      <div
                        tabIndex={0}
                        role="img"
                        aria-label={`${month.full}: ${currency(month.value)}`}
                        className="group relative flex h-full w-full items-end justify-center rounded-md outline-none focus-visible:bg-paper"
                      >
                        {current && (
                          <span
                            aria-hidden
                            className="absolute text-xs font-semibold text-ink"
                            style={{ bottom: height + 6 }}
                          >
                            {compact(month.value)}
                          </span>
                        )}
                        <span
                          aria-hidden
                          className={
                            current
                              ? "w-[22px] rounded-t-[4px] bg-accent transition-opacity group-hover:opacity-90"
                              : "w-[22px] rounded-t-[4px] bg-[#a9a197] transition-colors group-hover:bg-[#958d82] group-focus-visible:bg-[#958d82]"
                          }
                          style={{ height }}
                        />
                        {/* Tooltip (hover + keyboard focus) */}
                        <span
                          aria-hidden
                          className="pointer-events-none absolute z-10 hidden -translate-y-2 rounded-lg bg-ink px-2.5 py-1.5 text-center whitespace-nowrap text-white shadow-lg group-hover:block group-focus-visible:block"
                          style={{ bottom: height }}
                        >
                          <span className="block text-sm font-semibold">{currency(month.value)}</span>
                          <span className="block text-[11px] text-mist">{month.full}</span>
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div aria-hidden className="mt-2 flex justify-around text-[11px] text-charcoal">
              {months.map((month) => (
                <span key={month.label} className="w-full text-center">
                  {month.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Budget meter */}
      <div className="mt-6 rounded-xl bg-paper p-4">
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-medium text-ink">Operating budget used (Q3)</span>
          <span className="font-semibold text-ink">72%</span>
        </div>
        <div
          role="meter"
          aria-label="Operating budget used"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={72}
          className="mt-2.5 h-2 overflow-hidden rounded-full bg-[#f6e2d5]"
        >
          <div className="h-full w-[72%] rounded-full bg-accent" />
        </div>
      </div>

      {/* Table view (accessible twin of the chart) */}
      <details className="mt-4 text-sm">
        <summary className="font-semibold text-accent-strong hover:text-accent">View chart data as a table</summary>
        <table className="mt-3 w-full text-left">
          <caption className="sr-only">Monthly revenue, sample data</caption>
          <thead>
            <tr className="border-b border-line text-charcoal">
              <th scope="col" className="py-1.5 font-medium">
                Month
              </th>
              <th scope="col" className="py-1.5 text-right font-medium">
                Revenue
              </th>
            </tr>
          </thead>
          <tbody>
            {months.map((month) => (
              <tr key={month.label} className="border-b border-line/70 last:border-0">
                <th scope="row" className="py-1.5 font-normal text-ink">
                  {month.full}
                </th>
                <td className="py-1.5 text-right text-ink tabular-nums">{currency(month.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>

      <figcaption className="mt-4 border-t border-line pt-3 text-xs leading-relaxed text-charcoal">
        Illustrative example with sample data — not a real client. Your dashboard is built around the numbers that
        matter in your business.
      </figcaption>
    </figure>
  );
}
