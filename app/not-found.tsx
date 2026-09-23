import type { Metadata } from "next";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: { absolute: "Page Not Found | JK Edwards & Company" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="Error 404"
        title="We couldn’t find that page"
        subtitle="The page may have moved when we refreshed our website. Try one of the links below, or get in touch and we’ll point you in the right direction."
      />
      <Section tone="white">
        <RelatedLinks
          eyebrow="Popular pages"
          title="Where would you like to go?"
          links={[
            {
              label: "Our Services",
              href: "/services",
              description: "Tax, bookkeeping, payroll, IRS help and advisory.",
              icon: "Briefcase",
            },
            {
              label: "Client Center",
              href: "/client-center",
              description: "Pay your bill and reach your secure portals.",
              icon: "LockKeyhole",
            },
            {
              label: "Blog",
              href: "/blog",
              description: "Plain-English tax and business insights.",
              icon: "BookOpenCheck",
            },
            {
              label: "Contact Us",
              href: "/contact",
              description: "Book a free consultation with our team.",
              icon: "MessageSquareText",
            },
          ]}
        />
      </Section>
    </>
  );
}
