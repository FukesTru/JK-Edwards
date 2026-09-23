import { BlogFilterGrid } from "@/components/sections/BlogFilterGrid";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogCategories, posts, toSummary } from "@/content/blog/posts";
import { getImage } from "@/lib/images";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Small Business Tax Tips for Georgia",
  description:
    "Small business tax tips for Georgia owners, plus plain-English guides to payroll, IRS letters, choosing an entity, trucking deductions and expat tax filing.",
  path: "/blog",
});

export default function BlogPage() {
  const items = posts.map((post) => ({ post: toSummary(post), photo: getImage(post.image) }));

  return (
    <>
      <PageHero
        eyebrow="Resources · Blog"
        title="Tax & Business Insights"
        subtitle="Practical, plain-English guidance on taxes, bookkeeping, payroll and running a business — from our team in Hampton, Georgia."
        image="blog-hub"
        imageClassName="object-[70%_center]"
      />
      <Breadcrumbs items={[{ name: "Blog", path: "/blog" }]} />

      <Section tone="white" labelledBy="articles" reveal={false}>
        <SectionHeading
          id="articles"
          eyebrow="Latest articles"
          title="Browse by topic"
          intro="General information to help you plan ahead. For advice on your own situation, book a free consultation."
        />
        <div className="mt-10">
          <BlogFilterGrid items={items} categories={blogCategories} />
        </div>
      </Section>

      <Section tone="paper">
        <RelatedLinks
          title="Ready for help that fits your situation?"
          links={[
            {
              label: "Tax Preparation & Planning",
              href: "/services/tax-preparation-planning",
              description: "Accurate returns and year-round strategy.",
              icon: "ReceiptText",
            },
            {
              label: "Bookkeeping",
              href: "/services/bookkeeping",
              description: "Clean, current books every month.",
              icon: "BookOpenCheck",
            },
            {
              label: "Payroll",
              href: "/services/payroll",
              description: "Accurate pay, deposits and filings.",
              icon: "HandCoins",
            },
            {
              label: "IRS Problem Resolution",
              href: "/services/irs-tax-resolution",
              description: "Notices, audits and payment plans handled.",
              icon: "ShieldCheck",
            },
          ]}
        />
      </Section>
    </>
  );
}
