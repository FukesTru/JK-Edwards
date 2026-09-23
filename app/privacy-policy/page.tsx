import Link from "next/link";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { buildMetadata } from "@/lib/seo";
import { fullAddress, site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How JK Edwards & Company collects, uses and protects the information you share through our website, forms and client portals — and the choices you have.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How we collect, use and protect the information you share with us through this website."
      />
      <Breadcrumbs items={[{ name: "Privacy Policy", path: "/privacy-policy" }]} />

      <LegalDocument updated="2026-09-23">
        <p>
          {site.name} (“we,” “us” or “our”) respects your privacy. This policy explains what information we collect
          through {site.url.replace("https://", "")} (the “site”), how we use it and the choices you have. It applies to
          this website only. Work we perform for clients is also governed by our engagement letters and by the
          professional and legal rules that apply to tax and accounting firms.
        </p>

        <h2>Information we collect</h2>
        <h3>Information you give us</h3>
        <p>
          When you contact us, request a consultation, send an IRS notice or request a guide, we collect what you enter,
          which may include:
        </p>
        <ul>
          <li>Your name, email address and phone number</li>
          <li>The type of client you are and the services you’re interested in</li>
          <li>Your message and preferred contact method</li>
          <li>Files you choose to upload, such as a copy of an IRS notice</li>
        </ul>
        <p>
          Please don’t include Social Security numbers, bank account numbers or tax documents in website forms or
          regular email. Once you’re a client, we’ll provide secure portals for sharing sensitive information.
        </p>
        <h3>Information collected automatically</h3>
        <p>
          Like most websites, our site and hosting provider automatically record basic technical information such as
          your IP address, browser type, the pages you visit and the date and time of your visit. We may use Google
          Analytics to understand how visitors use the site. Google Analytics uses cookies and similar technologies to
          collect usage information; you can learn more in{" "}
          <a href="https://policies.google.com/technologies/partner-sites">Google’s explanation of how it uses data</a>{" "}
          and opt out with the{" "}
          <a href="https://tools.google.com/dlpage/gaoptout">Google Analytics opt-out browser add-on</a>.
        </p>

        <h2>How we use information</h2>
        <ul>
          <li>To respond to your questions and schedule consultations</li>
          <li>To provide, manage and bill for the services you engage us for</li>
          <li>To send information you’ve requested, such as a guide or checklist</li>
          <li>To understand how the site is used so we can improve it</li>
          <li>To protect the site against spam and misuse, and to comply with legal obligations</li>
        </ul>
        <p>
          <strong>We do not sell or rent your personal information.</strong>
        </p>

        <h2>How we share information</h2>
        <p>We share information only as needed to operate our business and serve you:</p>
        <ul>
          <li>
            <strong>Service providers</strong> that help us run the site and our practice — for example, website
            hosting, email delivery, form processing, scheduling and analytics providers — who may use the information
            only to provide services to us.
          </li>
          <li>
            <strong>Client portal and software providers</strong> you choose to use with us, such as secure document
            portals, payment processors and accounting software. Their own privacy policies apply when you use their
            services.
          </li>
          <li>
            <strong>Legal requirements.</strong> We may disclose information when required by law, regulation or legal
            process, or to protect our rights and the safety of others.
          </li>
        </ul>
        <p>
          Tax return information is subject to additional federal restrictions. We do not use or disclose it for
          purposes other than preparing your return except as the law allows, including with your written consent.
        </p>

        <h2>Links to other websites</h2>
        <p>
          Our site links to websites we don’t control, including client portals, payment pages, IRS.gov and the Georgia
          Department of Revenue. We aren’t responsible for their content or privacy practices, so please review their
          policies.
        </p>

        <h2>How we protect information</h2>
        <p>
          We use administrative, technical and physical safeguards designed to protect the information you share with
          us, including encrypted connections to this site and secure portals for client documents. No method of
          transmission or storage is completely secure, so we can’t guarantee absolute security.
        </p>

        <h2>How long we keep information</h2>
        <p>
          We keep inquiry information for as long as needed to respond and follow up, and client records for as long as
          professional standards and the law require. We then delete or securely dispose of it.
        </p>

        <h2>Your choices</h2>
        <ul>
          <li>You can ask us what personal information we hold about you and request corrections.</li>
          <li>You can ask us to delete information we no longer need to keep.</li>
          <li>You can opt out of marketing emails at any time using the link in the email or by contacting us.</li>
          <li>You can block or delete cookies in your browser settings.</li>
        </ul>

        <h2>Children’s privacy</h2>
        <p>
          This site is intended for adults and isn’t directed to children under 13. We don’t knowingly collect personal
          information from children through the site.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy from time to time. The “last updated” date above shows when it was last revised.
        </p>

        <h2>Contact us</h2>
        <p>
          Questions about this policy? Contact {site.name} at <a href={`mailto:${site.email}`}>{site.email}</a>, call{" "}
          <a href={site.phone.href}>{site.phone.display}</a> or write to us at {fullAddress}. You can also use our{" "}
          <Link href="/contact">contact form</Link>.
        </p>
      </LegalDocument>
    </>
  );
}
