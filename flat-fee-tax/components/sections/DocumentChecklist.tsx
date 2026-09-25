import { Printer } from "lucide-react";
import { PrintButton } from "@/components/sections/PrintButton";

export const documentChecklist = [
  {
    group: "Income",
    items: [
      "W-2s from every employer",
      "1099-NEC, 1099-INT, 1099-DIV and 1099-B statements",
      "Schedule K-1s from partnerships, S corporations or trusts",
    ],
  },
  {
    group: "Deductions",
    items: ["Mortgage interest statement (Form 1098)", "Property tax records", "Charitable donation receipts"],
  },
  {
    group: "Rentals & business",
    items: ["Rental income and expense records", "Business income and expense records (including mileage)"],
  },
  { group: "Other", items: ["Last year’s tax return", "Photo ID"] },
];

/** Printable document checklist (id="checklist" for deep links). Upload through the secure portal — never email. */
export function DocumentChecklist({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <div id="checklist" className="rounded-2xl border border-line bg-white p-7 sm:p-9">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Heading className="font-serif text-[1.9rem] leading-tight font-semibold text-navy">Document checklist</Heading>
        <PrintButton>
          <Printer aria-hidden className="h-4 w-4" strokeWidth={1.75} />
          Print checklist
        </PrintButton>
      </div>
      <p className="mt-3 text-muted">
        Gather what applies to you. Not sure about something? Bring it and we’ll sort it out.
      </p>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {documentChecklist.map((section) => (
          <div key={section.group}>
            <p className="text-xs font-semibold tracking-[0.18em] text-gold-deep uppercase">{section.group}</p>
            <ul className="mt-3 space-y-2.5">
              {section.items.map((item) => (
                <li key={item}>
                  <label className="flex cursor-pointer items-start gap-3 text-ink">
                    <input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-[var(--navy)]" />
                    <span>{item}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
