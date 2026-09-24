import Image from "next/image";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CredentialBadge } from "@/components/ui/CredentialBadge";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { cta } from "@/lib/cta";
import { getImage, type ImageKey } from "@/lib/images";
import { phoneHref, site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Cta = { label: string; href: string };

/**
 * Navy hero used on every page: H1 with a 64px gold bar, subhead, the
 * credential badge row, a price CTA and "Call {phone}". Optional background
 * photo (under a navy gradient) and an aside column for price cards.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageClassName,
  primaryCta = cta.taxPrep,
  secondaryCta = { label: `Call ${site.phone}`, href: phoneHref },
  children,
  aside,
  size = "default",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  image?: ImageKey;
  imageClassName?: string;
  primaryCta?: Cta | false;
  secondaryCta?: Cta | false;
  children?: ReactNode;
  aside?: ReactNode;
  size?: "default" | "large";
}) {
  const photo = image ? getImage(image) : null;

  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      {photo && (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className={cn("-z-20 object-cover opacity-40", imageClassName)}
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,var(--navy)_0%,color-mix(in_oklab,var(--navy)_90%,transparent)_48%,color-mix(in_oklab,var(--navy)_45%,transparent)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(55%_60%_at_88%_0%,color-mix(in_oklab,var(--gold)_22%,transparent),transparent_70%)]"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-navy to-transparent" />

      <Container
        className={cn(
          "relative pt-[calc(var(--header-height)+3rem)] pb-16 md:pt-[calc(var(--header-height)+4.5rem)] md:pb-20",
          size === "large" && "lg:pb-24",
        )}
      >
        <div className={cn("w-full", aside && "grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14")}>
          <div className={cn(!aside && "max-w-3xl")}>
            {eyebrow && (
              <div className="animate-fade-up">
                <Eyebrow tone="dark" className="mb-5">
                  {eyebrow}
                </Eyebrow>
              </div>
            )}
            <h1
              className={cn(
                "animate-fade-up font-serif font-bold tracking-tight text-balance [animation-delay:60ms]",
                size === "large"
                  ? "text-[2.4rem] leading-[1.07] sm:text-[3.1rem] lg:text-[3.6rem]"
                  : "text-[2.2rem] leading-[1.1] sm:text-[2.8rem] lg:text-[3.2rem]",
              )}
            >
              {title}
            </h1>
            <span
              aria-hidden
              className="mt-6 block h-1 w-16 animate-fade-up rounded-full bg-gold [animation-delay:120ms]"
            />
            {subtitle && (
              <div className="mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-white/85 [animation-delay:160ms]">
                {subtitle}
              </div>
            )}
            <div className="mt-7 animate-fade-up [animation-delay:200ms]">
              <CredentialBadge />
            </div>
            {(primaryCta || secondaryCta) && (
              <div className="mt-8 flex animate-fade-up flex-col gap-3 [animation-delay:240ms] sm:flex-row sm:flex-wrap">
                {primaryCta && (
                  <ButtonLink href={primaryCta.href} size="lg">
                    {primaryCta.label}
                  </ButtonLink>
                )}
                {secondaryCta && (
                  <ButtonLink href={secondaryCta.href} variant="outline-light" size="lg" icon="phone">
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
