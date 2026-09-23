import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { FacebookIcon, InstagramIcon, XIcon } from "@/components/icons/BrandIcons";
import { FooterContactForm } from "@/components/forms/FooterContactForm";
import { Container } from "@/components/ui/Container";
import { industries } from "@/content/industries";
import { services } from "@/content/services";
import { fullAddress, site } from "@/lib/site";
import { formatHour } from "@/lib/utils";

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Client Center", href: "/client-center" },
];

const socials = [
  { label: "Facebook", href: site.social.facebook, Icon: FacebookIcon },
  { label: "X (Twitter)", href: site.social.x, Icon: XIcon },
  { label: "Instagram", href: site.social.instagram, Icon: InstagramIcon },
];

const headingClass = "text-xs font-semibold tracking-[0.18em] text-white uppercase";
const linkClass = "text-[15px] text-mist transition-colors hover:text-white";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer aria-labelledby="footer-heading" className="border-t border-white/10 bg-ink text-white">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.35fr_0.9fr_0.9fr_1.4fr] lg:gap-10">
          {/* Column 1 — firm, NAP, hours, social */}
          <div>
            <Logo tone="dark" />
            <p className="mt-5 max-w-sm leading-relaxed text-mist">
              Accounting, tax, payroll and IRS resolution for Hampton, Henry County and clients nationwide.
            </p>
            <address className="mt-6 space-y-3 text-[15px] not-italic">
              <a
                href={site.links.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 text-white/90 hover:text-white"
              >
                <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" strokeWidth={1.75} />
                <span>
                  <span className="block">{site.name}</span>
                  {site.address.street}, {site.address.suite}
                  <br />
                  {site.address.city}, {site.address.region} {site.address.postalCode}
                  <span className="sr-only"> (opens directions in Google Maps)</span>
                </span>
              </a>
              <a
                href={site.phone.href}
                className="flex items-center gap-3 font-semibold text-white hover:text-accent-light"
              >
                <Phone aria-hidden className="h-4 w-4 shrink-0 text-accent-light" strokeWidth={1.75} />
                <span className="tabular-nums">{site.phone.display}</span>
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-white/90 hover:text-white">
                <Mail aria-hidden className="h-4 w-4 shrink-0 text-accent-light" strokeWidth={1.75} />
                {site.email}
              </a>
            </address>

            <div className="mt-6 flex gap-3">
              <Clock aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" strokeWidth={1.75} />
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                {site.hours.map((h) => (
                  <div key={h.day} className="contents">
                    <dt className="text-mist">{h.short}</dt>
                    <dd className="text-white/90 tabular-nums">
                      {h.opens && h.closes ? `${formatHour(h.opens)} – ${formatHour(h.closes)}` : "Closed"}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <ul className="mt-7 flex gap-2" aria-label="Social media">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.name} on ${label}`}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/85 transition-colors hover:border-accent hover:bg-accent hover:text-white"
                  >
                    <Icon aria-hidden className="h-[18px] w-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 — services */}
          <nav aria-labelledby="footer-services">
            <h3 id="footer-services" className={headingClass}>
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={service.href} className={linkClass}>
                    {service.shortName}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-[15px] font-semibold text-accent-light hover:text-white">
                  All services
                </Link>
              </li>
            </ul>
          </nav>

          {/* Column 3 — industries + company */}
          <div className="space-y-10">
            <nav aria-labelledby="footer-industries">
              <h3 id="footer-industries" className={headingClass}>
                Industries
              </h3>
              <ul className="mt-5 space-y-3">
                {industries.map((industry) => (
                  <li key={industry.slug}>
                    <Link href={industry.href} className={linkClass}>
                      {industry.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-labelledby="footer-company">
              <h3 id="footer-company" className={headingClass}>
                Company
              </h3>
              <ul className="mt-5 space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href={site.links.payBill}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkClass} inline-flex items-center gap-1`}
                  >
                    Pay Bill
                    <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Column 4 — mini contact form */}
          <div>
            <h3 className={headingClass}>Send us a message</h3>
            <p className="mt-3 mb-5 text-sm text-mist">Questions about taxes, books or payroll? Ask away.</p>
            <FooterContactForm />
          </div>
        </div>

        {/* Affiliations */}
        <ul
          aria-label="Affiliations and certifications"
          className="mt-14 grid grid-cols-2 gap-3 border-t border-white/10 pt-10 sm:grid-cols-4"
        >
          {site.affiliations.map((badge) => (
            <li
              key={badge.name}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
            >
              <BadgeCheck aria-hidden className="h-6 w-6 shrink-0 text-accent-light" strokeWidth={1.5} />
              <span>
                <span className="block text-sm font-semibold text-white">{badge.name}</span>
                <span className="block text-xs text-mist">{badge.detail}</span>
              </span>
            </li>
          ))}
        </ul>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 pt-6 pb-28 text-sm text-mist md:pb-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <p>
              © {year} {site.name}. All rights reserved.
            </p>
            <p className="max-w-2xl text-xs leading-relaxed">
              Information on this site is general in nature and is not tax, legal, or investment advice for your
              specific situation.
            </p>
            <p className="sr-only">{fullAddress}</p>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-disclaimer" className="hover:text-white">
                Terms &amp; Disclaimer
              </Link>
            </li>
            <li>
              <Link href="/sitemap" className="hover:text-white">
                Sitemap
              </Link>
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
