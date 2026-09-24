import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cta } from "@/lib/cta";

/** Full-width call to action shown before the footer on every page. */
export function CtaBand() {
  return (
    <section
      aria-labelledby="cta-band-heading"
      data-print-hide
      className="bg-ledger relative isolate overflow-hidden border-t border-white/5 bg-navy text-white"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_120%_at_100%_100%,color-mix(in_oklab,var(--gold)_22%,transparent),transparent_70%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent"
      />
      <Container className="py-16 md:py-20">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2
              id="cta-band-heading"
              className="font-serif text-[2rem] leading-[1.1] font-bold tracking-tight text-balance sm:text-[2.5rem] lg:text-[2.75rem]"
            >
              One flat price. A CPA’s signature. No surprises.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-mist">
              Every return is prepared and signed by a licensed CPA and reviewed by an Enrolled Agent.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <ButtonLink href={cta.taxPrep.href} size="lg">
              {cta.taxPrep.label}
            </ButtonLink>
            <ButtonLink href={cta.taxResolution.href} variant="outline-light" size="lg" icon="arrow">
              {cta.taxResolution.label}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
