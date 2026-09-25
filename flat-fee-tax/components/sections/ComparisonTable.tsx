import { Check } from "lucide-react";
const rows = [
  { label: "Who signs your return", typical: "Often a seasonal preparer", us: "A licensed CPA" },
  { label: "Second professional review", typical: "Rarely", us: "An Enrolled Agent reviews every return" },
  {
    label: "Complex schedules (C, E, K-1, 1099-B)",
    typical: "Not every preparer handles them",
    us: "Handled on every return",
  },
  { label: "If the IRS sends a notice", typical: "Varies by preparer", us: "An Enrolled Agent can represent you" },
];

/** "Typical tax shop vs. us" — factual, names no competitors and quotes no prices for others. */
export function ComparisonTable({ brandName }: { brandName: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      <table className="w-full text-left">
        <caption className="sr-only">How our process compares with a typical tax shop</caption>
        <thead>
          <tr className="bg-paper text-sm">
            <th scope="col" className="w-[34%] px-4 py-4 font-semibold text-muted sm:px-6">
              <span className="sr-only">Feature</span>
            </th>
            <th scope="col" className="px-4 py-4 font-semibold text-muted sm:px-6">
              Typical tax shop
            </th>
            <th scope="col" className="bg-navy px-4 py-4 font-semibold text-white sm:px-6">
              <span className="text-gold">{brandName}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-t border-line align-top">
              <th scope="row" className="px-4 py-5 text-[15px] font-semibold text-navy sm:px-6">
                {row.label}
              </th>
              <td className="px-4 py-5 text-[15px] text-muted sm:px-6">
                <span className="flex items-start gap-2">{row.typical}</span>
              </td>
              <td className="bg-navy/[0.03] px-4 py-5 text-[15px] font-medium text-ink sm:px-6">
                <span className="flex items-start gap-2">
                  <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-success" strokeWidth={2.5} />
                  {row.us}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
