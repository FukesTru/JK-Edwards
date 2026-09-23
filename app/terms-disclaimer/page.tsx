import Link from "next/link";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Terms of Use & Disclaimer",
  description:
    "Terms for using the JK Edwards & Company website. Site content is general information, not tax, legal or investment advice, and doesn't create a client relationship.",
  path: "/terms-disclaimer",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use & Disclaimer"
        subtitle="The ground rules for using this website — and what our articles and tools can and can’t do for you."
      />
      <Breadcrumbs items={[{ name: "Terms & Disclaimer", path: "/terms-disclaimer" }]} />

      <LegalDocument updated="2026-09-23">
        <p>
          By using this website, you agree to these terms. If you don’t agree, please don’t use the site. {site.name}{" "}
          may update these terms at any time, and changes take effect when posted.
        </p>

        <h2>General information, not advice</h2>
        <p>
          The articles, checklists, FAQs and other content on this site are general information. They are{" "}
          <strong>not tax, legal or investment advice for your specific situation</strong>. Tax laws and IRS guidance
          change often, and the right answer depends on your facts. Please consult a qualified professional before
          acting on anything you read here.
        </p>

        <h2>No client relationship</h2>
        <p>
          Using this site, sending us a message or submitting a form does not create a client relationship. We become
          your accountant or tax preparer only after we both sign an engagement letter. Until then, please don’t send
          confidential information such as Social Security numbers or tax documents through the site or by regular
          email.
        </p>

        <h2>Accuracy of information</h2>
        <p>
          We work to keep the site accurate and current, but we don’t guarantee that it is complete, error-free or up to
          date. Information is provided “as is,” without warranties of any kind, express or implied.
        </p>

        <h2>Credentials</h2>
        <p>
          {site.name} is an accounting and tax firm. Professional credentials such as Enrolled Agent (EA) and Certified
          Public Accountant (CPA) are held by the individual team members named on our{" "}
          <Link href="/about">About page</Link>.
        </p>

        <h2>Third-party websites and portals</h2>
        <p>
          The site links to services operated by other companies, including client portals, payment processors,
          accounting software and government websites. We don’t control those services and aren’t responsible for their
          content, availability or security. Your use of them is governed by their own terms and privacy policies.
        </p>

        <h2>Trademarks and affiliations</h2>
        <p>
          QuickBooks, Xero, Bill.com, ADP, Gusto, Dext, TaxCaddy, Liscio, Thomson Reuters, Zoom, Rightworks, CPACharge
          and other product names are trademarks of their respective owners. Listing a software partner or professional
          affiliation doesn’t mean that company endorses {site.name}.
        </p>

        <h2>Images</h2>
        <p>
          Some photographs on this site are AI-generated or stock illustrations. They don’t depict our actual clients,
          and they don’t depict our team unless a caption says so.
        </p>

        <h2>Intellectual property</h2>
        <p>
          Unless otherwise noted, the content on this site belongs to {site.name}. You may view and print pages for your
          personal, non-commercial use. Please don’t republish our content without permission.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent the law allows, {site.name} is not liable for any loss or damage arising from your use
          of this site or reliance on its content, including indirect or consequential damages.
        </p>

        <h2>Governing law</h2>
        <p>These terms are governed by the laws of the State of Georgia, without regard to conflict-of-law rules.</p>

        <h2>Contact us</h2>
        <p>
          Questions about these terms? Email <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
          <a href={site.phone.href}>{site.phone.display}</a>. See also our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>
      </LegalDocument>
    </>
  );
}
