import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export type ProcessStep = { title: string; description: string };

/** Numbered 3–5 step timeline: horizontal with a connecting line on desktop, vertical on mobile. */
export function ProcessTimeline({
  steps,
  tone = "light",
}: {
  steps: ProcessStep[];
  /** Section background the timeline sits on (sets the ring around each number). */
  tone?: "light" | "paper" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <Stagger
      as="ol"
      className={cn(
        "relative grid gap-10 md:gap-6",
        steps.length === 3 && "md:grid-cols-3",
        steps.length === 4 && "md:grid-cols-2 lg:grid-cols-4",
        steps.length >= 5 && "md:grid-cols-3 lg:grid-cols-5",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute top-6 right-[12%] left-[12%] hidden h-px lg:block",
          dark ? "bg-white/15" : "bg-line",
          steps.length === 3 && "md:block",
        )}
      />
      {steps.map((step, index) => (
        <StaggerItem
          as="li"
          key={step.title}
          className="relative flex gap-5 md:flex-col md:items-center md:text-center"
        >
          <span
            className={cn(
              "relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold font-serif text-lg font-bold text-navy tabular-nums ring-8",
              dark ? "ring-navy" : tone === "paper" ? "ring-paper" : "ring-white",
            )}
          >
            {index + 1}
          </span>
          <div>
            <h3 className={cn("font-serif text-xl font-semibold md:mt-5", dark ? "text-white" : "text-navy")}>
              {step.title}
            </h3>
            <p className={cn("mt-2 leading-relaxed md:mx-auto md:max-w-[17rem]", dark ? "text-mist" : "text-muted")}>
              {step.description}
            </p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
