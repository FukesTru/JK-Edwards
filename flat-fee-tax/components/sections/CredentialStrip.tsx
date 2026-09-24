import { BadgeCheck, FileSignature, MessageSquareText } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const blocks = [
  {
    Icon: FileSignature,
    title: "Prepared & Signed by a CPA",
    text: "A licensed Certified Public Accountant prepares your return and signs it as the preparer.",
  },
  {
    Icon: BadgeCheck,
    title: "Reviewed by an Enrolled Agent",
    text: "A federally licensed Enrolled Agent reviews every return before it’s filed — a true second check.",
  },
  {
    Icon: MessageSquareText,
    title: "Plain-English Answers",
    text: "We explain your return — and any letter from the IRS — in plain English, so you always know what happens next.",
  },
];

/** Three large icon blocks restating the core promise. */
export function CredentialStrip({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <Stagger as="ul" className="grid gap-5 md:grid-cols-3">
      {blocks.map(({ Icon, title, text }) => (
        <StaggerItem
          as="li"
          key={title}
          className={cn(
            "rounded-2xl border p-7",
            dark ? "border-white/10 bg-navy-2" : "border-line bg-white shadow-[0_20px_40px_-32px_rgba(15,30,51,0.4)]",
          )}
        >
          <span
            className={cn(
              "grid h-14 w-14 place-items-center rounded-2xl",
              dark ? "bg-gold/15 text-gold" : "bg-navy text-gold",
            )}
          >
            <Icon aria-hidden className="h-7 w-7" strokeWidth={1.5} />
          </span>
          <h3 className={cn("mt-5 font-serif text-2xl font-semibold", dark ? "text-white" : "text-navy")}>{title}</h3>
          <p className={cn("mt-2 leading-relaxed", dark ? "text-mist" : "text-muted")}>{text}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
