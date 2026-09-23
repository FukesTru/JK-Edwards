import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/site";

/** Full-width call to action shown before the footer on every page. */
export function CtaBand() {
  return (
    <section aria-labelledby="cta-band-heading" className="bg-grain relative isolate overflow-hidden bg-ink text-white">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(55%_120%_at_100%_100%,color-mix(in_oklab,var(--accent)_35%,transparent),transparent_70%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
      />
      <Container className="py-16 md:py-20">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2
              id="cta-band-heading"
              className="font-serif text-[2rem] leading-[1.1] font-semibold tracking-tight text-balance sm:text-[2.5rem] lg:text-[2.75rem]"
            >
              Ready to stop worrying about your numbers?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-mist">
              Book a free consultation with our Hampton team — in person or online, wherever you are.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              Book a Free Consultation
            </ButtonLink>
            <ButtonLink href={site.phone.href} variant="outline-light" size="lg">
              Call {site.phone.display}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
