import { Check } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

const steps = [
  {
    title: "Get an EIN",
    description: "Apply for your Employer Identification Number with the IRS — it’s free and takes minutes online.",
  },
  {
    title: "Register in Georgia",
    description: "Form your LLC or corporation with the Georgia Secretary of State and get your local business license.",
  },
  {
    title: "Open a business bank account",
    description: "Keep business and personal money separate from day one — it protects you and simplifies your books.",
  },
  {
    title: "Set up your books",
    description: "Start QuickBooks Online with a clean chart of accounts and connected bank feeds.",
  },
  {
    title: "Set up payroll",
    description: "Register for Georgia withholding and unemployment accounts before your first paycheck.",
  },
  {
    title: "Register for sales tax",
    description: "Selling taxable goods or services? Register with the Georgia Department of Revenue to collect and file.",
  },
];

/** Six-step startup checklist graphic for new Georgia businesses. */
export function StartupChecklist() {
  return (
    <Stagger as="ol" className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, index) => (
        <StaggerItem
          as="li"
          key={step.title}
          className="relative flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6"
        >
          <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-white">
            <Check aria-hidden className="h-5 w-5" strokeWidth={2.5} />
            <span className="absolute -top-1.5 -right-1.5 grid h-5 w-5 place-items-center rounded-full bg-white text-[11px] font-bold text-ink">
              {index + 1}
            </span>
          </span>
          <div>
            <h3 className="font-serif text-xl font-semibold text-white">{step.title}</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-mist">{step.description}</p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
