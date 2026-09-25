import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { cta } from "@/lib/cta";
import { cn } from "@/lib/utils";

const issues = [
  "IRS notices & letters",
  "Unfiled past-year returns",
  "Balances due & payment plans",
  "Penalty abatement requests",
];

/** Navy split section: "Got a letter from the IRS? We’ll take it off your plate." */
export function ResolutionTeaser({
  className,
  headingLevel = "h2",
}: {
  className?: string;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <section
      aria-labelledby="resolution-teaser"
      className={cn("bg-ledger bg-navy py-16 text-white md:py-24", className)}
    >
      <Container>
        <Reveal className="grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">Tax Resolution</p>
            <Heading
              id="resolution-teaser"
              className="mt-4 font-serif text-[2rem] leading-[1.12] font-bold text-balance sm:text-[2.5rem]"
            >
              Got a letter from the IRS? We’ll take it off your plate.
            </Heading>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist">
              An Enrolled Agent reads your notice, explains it in plain English and, with your power of attorney, deals
              with the IRS for you. Results depend on your situation and IRS decisions.
            </p>
            <ul className="mt-7 flex flex-wrap gap-2" aria-label="Issues we help with">
              {issues.map((issue) => (
                <li
                  key={issue}
                  className="rounded-full border border-gold/40 bg-white/[0.04] px-4 py-2 text-sm font-medium"
                >
                  {issue}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={cta.taxResolution.href} size="lg">
                {cta.taxResolution.label}
              </ButtonLink>
              <ButtonLink href="/tax-resolution" variant="outline-light" size="lg">
                How tax resolution works
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-navy-2 p-8 text-center">
            <span aria-hidden className="mx-auto block h-0.5 w-10 rounded-full bg-gold" />
            <p className="mt-5 font-serif text-2xl font-semibold text-white">Represented by an Enrolled Agent</p>
            <p className="mt-2 text-mist">
              Federally licensed by the IRS, with unlimited rights to represent taxpayers before it.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
