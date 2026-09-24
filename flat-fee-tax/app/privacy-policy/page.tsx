import Link from "next/link";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { buildMetadata } from "@/lib/seo";
import { emailHref, phoneHref, prices, site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How we collect, use and protect the information you share through our website and forms. Forms never ask for SSNs or bank details. ${prices.taxPrep} CPA-signed returns.`,
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

      <LegalDocument updated="2026-09-24">
        <p>
          {site.legalName} (“we,” “us” or “our”) respects your privacy. This policy explains what information we collect
          through this website, how we use it and the choices you have. Work we perform for clients is also governed by
          our engagement letters and by the professional and legal rules that apply to tax preparers.
        </p>

        <h2>Information we collect</h2>
        <h3>Information you give us</h3>
        <p>
          When you request an appointment, send us an IRS notice or use a form on this site, we collect what you enter:
        </p>
        <ul>
          <li>Your name, email address and phone number</li>
          <li>Your city, the service you’re interested in and which tax situations apply to you</li>
          <li>Your message and preferred contact method</li>
          <li>Files you choose to upload, such as a copy of an IRS notice</li>
        </ul>
        <p>
          <strong>Our forms never ask for Social Security numbers or bank details.</strong> Please don’t include them in
          website forms or email. When we need documents, we’ll send you a link to a secure upload portal.
        </p>
        <h3>Information collected automatically</h3>
        <p>
          Our site and hosting provider automatically record basic technical information such as your IP address,
          browser type, the pages you visit and the date and time of your visit. We may use Google Analytics to
          understand how visitors use the site; it uses cookies and similar technologies. You can learn more in{" "}
          <a href="https://policies.google.com/technologies/partner-sites">Google’s explanation of how it uses data</a>{" "}
          and opt out with the{" "}
          <a href="https://tools.google.com/dlpage/gaoptout">Google Analytics opt-out browser add-on</a>.
        </p>

        <h2>How we use information</h2>
        <ul>
          <li>To respond to your request and schedule appointments</li>
          <li>To provide and bill for the services you engage us for</li>
          <li>To understand how the site is used so we can improve it</li>
          <li>To protect the site against spam and misuse, and to meet legal obligations</li>
        </ul>
        <p>
          <strong>We do not sell or rent your personal information.</strong>
        </p>

        <h2>How we share information</h2>
        <ul>
          <li>
            <strong>Service providers</strong> that help us run the site and our practice — such as hosting, email
            delivery, form processing, scheduling and analytics — who may use it only to provide services to us.
          </li>
          <li>
            <strong>Secure portal and software providers</strong> you use with us. Their own privacy policies apply.
          </li>
          <li>
            <strong>Legal requirements.</strong> We may disclose information when required by law or legal process.
          </li>
        </ul>
        <p>
          Tax return information is subject to additional federal restrictions. We don’t use or disclose it for purposes
          other than preparing your return except as the law allows, including with your written consent.
        </p>

        <h2>How we protect information</h2>
        <p>
          We use administrative, technical and physical safeguards designed to protect your information, including
          encrypted connections to this site and a secure portal for documents. No method of transmission or storage is
          completely secure, so we can’t guarantee absolute security.
        </p>

        <h2>How long we keep information</h2>
        <p>
          We keep inquiry information for as long as needed to respond and follow up, and client records for as long as
          professional standards and the law require. We then delete or securely dispose of it.
        </p>

        <h2>Your choices</h2>
        <ul>
          <li>Ask what personal information we hold about you and request corrections.</li>
          <li>Ask us to delete information we’re not required to keep.</li>
          <li>Opt out of marketing emails at any time.</li>
          <li>Block or delete cookies in your browser settings.</li>
        </ul>

        <h2>Children’s privacy</h2>
        <p>This site is intended for adults and isn’t directed to children under 13.</p>

        <h2>Changes to this policy</h2>
        <p>We may update this policy from time to time. The date above shows when it was last revised.</p>

        <h2>Contact us</h2>
        <p>
          Questions about this policy? Email <a href={emailHref}>{site.email}</a>, call{" "}
          <a href={phoneHref}>{site.phone}</a>, write to us at {site.address}, or use our{" "}
          <Link href="/get-started">Get Started form</Link>.
        </p>
      </LegalDocument>
    </>
  );
}
