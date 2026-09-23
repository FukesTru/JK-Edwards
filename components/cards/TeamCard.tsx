import { LinkedinIcon } from "@/components/icons/BrandIcons";
import { Placeholder } from "@/components/ui/Placeholder";
import type { TeamMember } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Initials avatar — used until real headshots are supplied (no stock faces). */
export function InitialsAvatar({ initials, size = "lg" }: { initials: string; size?: "md" | "lg" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative grid shrink-0 place-items-center rounded-full bg-[radial-gradient(circle_at_30%_25%,#2a2d32,var(--ink))] font-serif font-semibold tracking-wide text-white ring-2 ring-accent/70 ring-offset-4 ring-offset-white",
        size === "lg" ? "h-24 w-24 text-3xl" : "h-16 w-16 text-xl",
      )}
    >
      {initials}
    </span>
  );
}

export function TeamCard({ member, showBio = true }: { member: TeamMember; showBio?: boolean }) {
  return (
    <article className="flex h-full flex-col items-center rounded-2xl border border-line bg-white p-7 text-center transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_28px_50px_-30px_rgba(22,24,27,0.4)]">
      <InitialsAvatar initials={member.initials} />
      <h3 className="mt-6 font-serif text-xl leading-snug font-semibold text-ink">
        {member.name}
        {member.credential && <span className="text-accent-strong">, {member.credential}</span>}
      </h3>
      <p className="mt-1 text-sm font-semibold tracking-wide text-charcoal">{member.title}</p>
      {showBio && (
        <Placeholder block note="Bio placeholder — client to provide a full bio" className="mt-4">
          <p className="text-[15px] leading-relaxed text-charcoal">{member.bio}</p>
        </Placeholder>
      )}
      <div className="mt-auto pt-5">
        {member.linkedin ? (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-charcoal transition-colors hover:border-accent hover:bg-accent hover:text-white"
          >
            <LinkedinIcon aria-hidden className="h-4 w-4" />
          </a>
        ) : (
          <Placeholder note="LinkedIn URL — client to provide">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-dashed border-line text-steel">
              <LinkedinIcon aria-hidden className="h-4 w-4" />
              <span className="sr-only">LinkedIn profile coming soon</span>
            </span>
          </Placeholder>
        )}
      </div>
    </article>
  );
}
