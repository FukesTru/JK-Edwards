import { ButtonLink } from "@/components/ui/Button";
import { InitialsAvatar } from "@/components/ui/InitialsAvatar";
import { Placeholder } from "@/components/ui/Placeholder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

/** "Meet Kai" preview — initials avatar until a headshot arrives. */
export function MeetKai({ headingId }: { headingId?: string }) {
  return (
    <div className="grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-14">
      <Placeholder
        block
        note="Headshot — client to provide (initials avatar until then)"
        className="justify-self-center"
      >
        <InitialsAvatar name={site.owner} className="w-40 text-5xl sm:w-48 sm:text-6xl" />
      </Placeholder>
      <div>
        <SectionHeading id={headingId} eyebrow="Meet Kai" title={`${site.owner}, founder`} />
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Kai is an Enrolled Agent — a tax professional federally licensed by the IRS to represent taxpayers — and
          founded {site.brandName} to make expert tax help simple: two licensed professionals on every return, one flat
          price you know upfront, and plain-English answers from someone local to Peachtree City.
        </p>
        <ButtonLink href="/about" variant="outline-dark" className="mt-7" icon="arrow">
          More about Kai and our signing CPA
        </ButtonLink>
      </div>
    </div>
  );
}
