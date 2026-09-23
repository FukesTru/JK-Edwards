import type { MDXContent } from "mdx/types";
import type { ImageKey } from "@/lib/images";

export const blogCategories = [
  "Tax Tips",
  "Small Business",
  "Payroll",
  "IRS & Compliance",
  "Expat Tax",
  "Trucking",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export type BlogPost = {
  slug: string;
  title: string;
  /** ≤ 37 characters so "<seoTitle> | JK Edwards & Company" stays within 60. */
  seoTitle: string;
  /** 150–160 character meta description. */
  description: string;
  excerpt: string;
  category: BlogCategory;
  date: string;
  updated?: string;
  readMinutes: number;
  image: ImageKey;
  load: () => Promise<{ default: MDXContent }>;
};

const allPosts: BlogPost[] = [
  {
    slug: "year-end-tax-checklist-georgia",
    title: "Year-End Tax Checklist for Georgia Small Business Owners",
    seoTitle: "Georgia Year-End Tax Checklist",
    description:
      "A practical year-end tax checklist for Georgia small business owners: clean books, time income and expenses, fund retirement and prep 1099s before January.",
    excerpt:
      "Twelve moves to make before December 31 — from reconciling your books to funding retirement and collecting W-9s — so tax season starts calm.",
    category: "Tax Tips",
    date: "2026-09-15",
    readMinutes: 6,
    image: "blog-year-end",
    load: () => import("./year-end-tax-checklist-georgia.mdx"),
  },
  {
    slug: "llc-or-s-corp-georgia",
    title: "LLC or S Corp? How to Choose the Right Entity in Georgia",
    seoTitle: "LLC or S Corp? Choosing in Georgia",
    description:
      "LLC or S corp in Georgia? Learn how each is taxed, when an S corp election can cut self-employment tax, and the costs and deadlines to weigh before you elect.",
    excerpt:
      "An LLC is a legal structure; an S corp is a tax election. Here’s how they differ, when the S corp math starts to work, and what it costs to run one in Georgia.",
    category: "Small Business",
    date: "2026-08-26",
    readMinutes: 7,
    image: "blog-llc-s-corp",
    load: () => import("./llc-or-s-corp-georgia.mdx"),
  },
  {
    slug: "what-to-do-when-you-get-an-irs-letter",
    title: "What to Do When You Get an IRS Letter",
    seoTitle: "What to Do When You Get an IRS Letter",
    description:
      "Got a letter from the IRS? Here's how to confirm it's real, understand what it's asking, meet the deadline and decide when to get professional representation.",
    excerpt:
      "Most IRS letters can be resolved calmly if you act before the deadline. Here’s how to read the notice, spot scams and respond the right way.",
    category: "IRS & Compliance",
    date: "2026-08-12",
    readMinutes: 6,
    image: "blog-irs-letter",
    load: () => import("./what-to-do-when-you-get-an-irs-letter.mdx"),
  },
  {
    slug: "owner-operator-tax-deductions",
    title: "Owner-Operator Tax Deductions Every Trucker Should Know",
    seoTitle: "Owner-Operator Tax Deductions",
    description:
      "Owner-operator tax deductions every trucker should know: per diem, fuel, truck depreciation, Form 2290, insurance, tolls and more, plus the records to keep.",
    excerpt:
      "Per diem, depreciation, the Heavy Highway Vehicle Use Tax and the everyday costs of life on the road — the deductions owner-operators most often miss.",
    category: "Trucking",
    date: "2026-07-29",
    readMinutes: 7,
    image: "blog-trucker",
    load: () => import("./owner-operator-tax-deductions.mdx"),
  },
  {
    slug: "us-expats-do-you-need-to-file",
    title: "U.S. Expats: Do You Still Need to File a Tax Return?",
    seoTitle: "Do U.S. Expats Still Have to File?",
    description:
      "U.S. expats usually still need to file a federal tax return. Learn the filing thresholds, the FEIE and foreign tax credit, FBAR and FATCA rules and deadlines.",
    excerpt:
      "Living abroad doesn’t end your U.S. filing obligation. Here’s who must file, how to avoid double taxation and which extra forms Americans overseas need.",
    category: "Expat Tax",
    date: "2026-07-15",
    readMinutes: 7,
    image: "blog-expat",
    load: () => import("./us-expats-do-you-need-to-file.mdx"),
  },
  {
    slug: "payroll-mistakes-irs-penalties",
    title: "Payroll Mistakes That Trigger IRS Penalties (and How to Avoid Them)",
    seoTitle: "Payroll Mistakes & IRS Penalties",
    description:
      "The payroll mistakes that most often trigger IRS penalties, from late deposits to misclassified workers, plus simple systems small businesses use to avoid them.",
    excerpt:
      "Late deposits, misclassified workers and missed year-end forms are expensive. Here are the payroll mistakes we see most — and how to prevent every one.",
    category: "Payroll",
    date: "2026-07-01",
    readMinutes: 6,
    image: "blog-payroll",
    load: () => import("./payroll-mistakes-irs-penalties.mdx"),
  },
];

export const posts = [...allPosts].sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

/** Serializable subset for client components (no loader function). */
export type BlogPostSummary = Omit<BlogPost, "load">;

export function toSummary({ load: _load, ...summary }: BlogPost): BlogPostSummary {
  void _load;
  return summary;
}
