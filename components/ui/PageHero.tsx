import Image from "next/image";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { getImage, type ImageKey } from "@/lib/images";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Cta = { label: string; href: string; external?: boolean };

/**
 * Dark hero used on every page: H1 with a 64px accent underline bar, subhead,
 * primary + secondary CTAs and an optional background photo.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageClassName,
  primaryCta = { label: "Book a Free Consultation", href: "/contact" },
  secondaryCta = { label: `Call ${site.phone.display}`, href: site.phone.href },
  children,
  aside,
  size = "default",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  image?: ImageKey;
  /** Extra classes for the background photo (e.g. object position). */
  imageClassName?: string;
  primaryCta?: Cta | false;
  secondaryCta?: Cta | false;
  children?: ReactNode;
  aside?: ReactNode;
  size?: "default" | "large";
}) {
  const photo = image ? getImage(image) : null;

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-ink text-white",
        size === "large" ? "min-h-[min(92vh,880px)]" : "",
      )}
    >
      {photo && (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className={cn("-z-20 object-cover opacity-45", imageClassName)}
        />
      )}
      {/* Legibility overlays + warm accent glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,var(--ink)_0%,color-mix(in_oklab,var(--ink)_88%,transparent)_45%,color-mix(in_oklab,var(--ink)_35%,transparent)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_85%_0%,color-mix(in_oklab,var(--accent)_28%,transparent),transparent_70%)]"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" />

      <Container
        className={cn(
          "relative pt-[calc(var(--header-height)+3.5rem)] pb-16 md:pt-[calc(var(--header-height)+5.5rem)] md:pb-24",
          size === "large" && "flex min-h-[inherit] items-center",
        )}
      >
        <div className={cn(aside && "grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]", "w-full")}>
          <div className={cn(size === "large" ? "max-w-[56rem]" : "max-w-3xl")}>
            {eyebrow && (
              <div className="animate-fade-up">
                <Eyebrow tone="dark" className="mb-5">
                  {eyebrow}
                </Eyebrow>
              </div>
            )}
            <h1
              className={cn(
                "animate-fade-up font-serif font-semibold tracking-tight text-balance [animation-delay:60ms]",
                size === "large"
                  ? "text-[2.45rem] leading-[1.06] sm:text-[3.2rem] lg:text-[4rem]"
                  : "text-[2.3rem] leading-[1.08] sm:text-[2.9rem] lg:text-[3.5rem]",
              )}
            >
              {title}
            </h1>
            <span
              aria-hidden
              className="mt-6 block h-1 w-16 animate-fade-up rounded-full bg-accent [animation-delay:120ms]"
            />
            {subtitle && (
              <div className="mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-white/85 [animation-delay:180ms] md:text-xl">
                {subtitle}
              </div>
            )}
            {(primaryCta || secondaryCta) && (
              <div className="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:240ms] sm:flex-row sm:flex-wrap">
                {primaryCta && (
                  <ButtonLink href={primaryCta.href} external={primaryCta.external} size="lg">
                    {primaryCta.label}
                  </ButtonLink>
                )}
                {secondaryCta && (
                  <ButtonLink
                    href={secondaryCta.href}
                    external={secondaryCta.external}
                    variant="outline-light"
                    size="lg"
                  >
                    {secondaryCta.label}
                  </ButtonLink>
                )}
              </div>
            )}
            {children && <div className="mt-8 animate-fade-up [animation-delay:300ms]">{children}</div>}
          </div>
          {aside && <div className="animate-fade-up [animation-delay:200ms]">{aside}</div>}
        </div>
      </Container>
    </section>
  );
}
