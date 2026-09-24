import Link from "next/link";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { buildMetadata } from "@/lib/seo";
import { emailHref, phoneHref, site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Terms of Use & Disclaimer",
  description:
    "Terms for using our website. Content is general information, not tax or legal advice for your situation, and results of tax resolution matters vary. Read more.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use & Disclaimer"
        subtitle="The ground rules for using this website — and what its content can and can’t do for you."
      />
      <Breadcrumbs items={[{ name: "Terms", path: "/terms" }]} />

      <LegalDocument updated="2026-09-24">
        <p>
          By using this website you agree to these terms. If you don’t agree, please don’t use the site.{" "}
          {site.legalName} may update these terms at any time; changes take effect when posted.
        </p>

        <h2>General information, not advice</h2>
        <p>
          Information on this site is general in nature and is{" "}
          <strong>not tax or legal advice for your specific situation</strong>. Tax laws, limits and thresholds change,
          and the right answer depends on your facts. Please speak with us or another qualified professional before
          acting on anything you read here.
        </p>

        <h2>Tax resolution results</h2>
        <p>
          Results of tax resolution matters vary and are not guaranteed. Outcomes depend on each taxpayer’s facts,
          records and decisions made by the IRS or the Georgia Department of Revenue. We do not promise to reduce what
          you owe, to settle for a particular amount or to stop collection action by a particular date.
        </p>

        <h2>No client relationship</h2>
        <p>
          Using this site or submitting a form does not create a client relationship. We become your tax preparer or
          representative only after we both agree to an engagement. Until then, please don’t send confidential
          information such as Social Security numbers, bank details or tax documents through the site or by email.
        </p>

        <h2>Pricing</h2>
        <p>
          Prices shown on our <Link href="/pricing">pricing page</Link> describe the scope listed there. We’ll confirm
          your price before any work begins.
        </p>

        <h2>Credentials</h2>
        <p>
          {site.owner} is an Enrolled Agent licensed by the IRS. Returns are prepared and signed by {site.cpaName}, a
          Certified Public Accountant licensed in Georgia (License #{site.cpaLicense}). Credentials belong to the
          individuals named on our <Link href="/about">About page</Link>.
        </p>

        <h2>Images</h2>
        <p>
          Photographs on this site are AI-generated or stock illustrations. They don’t depict our actual clients or
          team.
        </p>

        <h2>Third-party websites</h2>
        <p>
          The site may link to services run by other companies, such as maps, scheduling tools, secure portals and
          government websites. We don’t control them and aren’t responsible for their content or security.
        </p>

        <h2>Intellectual property</h2>
        <p>
          Unless otherwise noted, content on this site belongs to {site.legalName}. You may view and print pages for
          personal, non-commercial use.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent the law allows, {site.legalName} is not liable for any loss or damage arising from your
          use of this site or reliance on its content.
        </p>

        <h2>Governing law</h2>
        <p>These terms are governed by the laws of the State of Georgia.</p>

        <h2>Contact us</h2>
        <p>
          Questions? Email <a href={emailHref}>{site.email}</a> or call <a href={phoneHref}>{site.phone}</a>. See also
          our <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>
      </LegalDocument>
    </>
  );
}
