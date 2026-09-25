import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const blocks = [
  {
    title: "Prepared & Signed by a CPA",
    text: "A licensed Certified Public Accountant prepares your return and signs it as the preparer.",
  },
  {
    title: "Reviewed by an Enrolled Agent",
    text: "A federally licensed Enrolled Agent reviews every return before it’s filed, giving you a true second check.",
  },
  {
    title: "Plain-English Answers",
    text: "We explain your return (and any letter from the IRS) in plain English, so you always know what happens next.",
  },
];

/** Three numbered blocks restating the core promise. */
export function CredentialStrip({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <Stagger as="ul" className="grid gap-5 md:grid-cols-3">
      {blocks.map(({ title, text }, index) => (
        <StaggerItem
          as="li"
          key={title}
          className={cn(
            "rounded-2xl border p-7",
            dark ? "border-white/10 bg-navy-2" : "border-line bg-white shadow-[0_20px_40px_-32px_rgba(15,30,51,0.4)]",
          )}
        >
          <span
            aria-hidden
            className={cn(
              "flex items-center gap-3 text-sm font-semibold tracking-[0.2em]",
              dark ? "text-gold" : "text-gold-deep",
            )}
          >
            {String(index + 1).padStart(2, "0")}
            <span className="h-px w-10 bg-gold/60" />
          </span>
          <h3 className={cn("mt-4 font-serif text-2xl font-semibold", dark ? "text-white" : "text-navy")}>{title}</h3>
          <p className={cn("mt-2 leading-relaxed", dark ? "text-mist" : "text-muted")}>{text}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
