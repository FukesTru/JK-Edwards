import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { FacebookIcon, GoogleIcon, InstagramIcon } from "@/components/icons/BrandIcons";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CredentialBadge } from "@/components/ui/CredentialBadge";
import { ConfigValue } from "@/components/ui/Placeholder";
import { cities } from "@/content/cities";
import { cta } from "@/lib/cta";
import { emailHref, phoneHref, site, socialLinks } from "@/lib/site";

const socialIcons = { facebook: FacebookIcon, instagram: InstagramIcon, google: GoogleIcon };

const headingClass = "text-xs font-semibold tracking-[0.18em] text-gold uppercase";
const linkClass = "inline-block py-1 text-[15px] text-white/85 transition-colors hover:text-gold";

/** The same navy footer on every page. */
export function Footer() {
  const year = 2026;

  return (
    <footer className="bg-navy text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>
      <Container className="pt-16 pb-12 md:pt-20 md:pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.35fr_0.9fr_0.9fr_1.35fr] lg:gap-10">
          {/* Column 1 — business details */}
          <div>
            <Logo tone="dark" />
            <p className="mt-5 max-w-xs leading-relaxed text-mist">
              CPA-signed tax returns and IRS help for Fayette &amp; Coweta County.
            </p>
            <address className="mt-6 space-y-3 text-[15px] not-italic">
              <p className="flex gap-3">
                <MapPin aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                <ConfigValue value={site.address} />
              </p>
              <p className="flex items-center gap-3">
                <Phone aria-hidden className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                <a href={phoneHref} className="font-semibold tabular-nums hover:text-gold">
                  <ConfigValue value={site.phone} />
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Mail aria-hidden className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                <a href={emailHref} className="hover:text-gold">
                  <ConfigValue value={site.email} />
                </a>
              </p>
              <p className="flex gap-3">
                <Clock aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                <ConfigValue value={site.hours} />
              </p>
            </address>
            {socialLinks.length > 0 && (
              <ul className="mt-6 flex gap-3">
                {socialLinks.map((link) => {
                  const Icon = socialIcons[link.key];
                  return (
                    <li key={link.key}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${site.brandName} on ${link.label} (opens in a new tab)`}
                        className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/85 transition-colors hover:border-gold hover:text-gold"
                      >
                        <Icon aria-hidden className="h-[18px] w-[18px]" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Column 2 — services */}
          <nav aria-labelledby="footer-services">
            <h3 id="footer-services" className={headingClass}>
              Services
            </h3>
            <ul className="mt-4 space-y-1.5">
              <li>
                <Link href="/tax-preparation" className={linkClass}>
                  Tax Preparation
                </Link>
              </li>
              <li>
                <Link href="/tax-resolution" className={linkClass}>
                  Tax Resolution
                </Link>
              </li>
              <li>
                <Link href="/pricing" className={linkClass}>
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className={linkClass}>
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/about" className={linkClass}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/faq" className={linkClass}>
                  FAQ
                </Link>
              </li>
            </ul>
          </nav>

          {/* Column 3 — areas */}
          <nav aria-labelledby="footer-areas">
            <h3 id="footer-areas" className={headingClass}>
              Areas
            </h3>
            <ul className="mt-4 space-y-1.5">
              {cities.map((city) => (
                <li key={city.name}>
                  <Link href={city.slug ? `/areas-we-serve/${city.slug}` : "/areas-we-serve"} className={linkClass}>
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4: get started */}
          <div>
            <h3 className={headingClass}>Get Started</h3>
            <p className="mt-3 mb-6 text-sm leading-relaxed text-mist">
              Call or email us and we’ll send next steps. Please don’t email tax documents.
            </p>
            <div className="flex flex-col gap-3">
              <ButtonLink href={cta.taxPrep.href}>{cta.taxPrep.label}</ButtonLink>
              <ButtonLink href={phoneHref} variant="outline-light" icon="phone">
                Call <ConfigValue value={site.phone} />
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* Credentials */}
        <div className="mt-14 border-t border-white/10 pt-8">
          <CredentialBadge size="sm" />
          <ul className="mt-5 grid gap-3 text-sm text-white/85 md:grid-cols-2">
            <li className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <span>Enrolled Agent, licensed by the IRS</span>
            </li>
            <li className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <span>
                Returns signed by <ConfigValue value={site.cpaName} /> (GA License #
                <ConfigValue value={site.cpaLicense} />)
              </span>
            </li>
          </ul>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-6 pb-28 text-sm text-mist md:pb-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <p>
              © {year} <ConfigValue value={site.legalName} />
            </p>
            <p className="max-w-3xl text-xs leading-relaxed">
              Information on this site is general in nature and is not tax or legal advice for your specific situation.
              Results of tax resolution matters vary and are not guaranteed.
            </p>
          </div>
          <ul className="flex shrink-0 flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href="/privacy-policy" className="inline-block py-1 hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="inline-block py-1 hover:text-white">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/sitemap" className="inline-block py-1 hover:text-white">
                Sitemap
              </Link>
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
