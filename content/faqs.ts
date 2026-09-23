/**
 * FAQ content. Answers support inline links written as [label](/path) — they
 * render as links on the page and as plain text in FAQPage JSON-LD.
 */
export type Faq = { q: string; a: string };

export const faqs = {
  tax: [
    {
      q: "When should I start my tax return?",
      a: "As soon as your W-2s and 1099s arrive — most show up by late January or early February. Starting early leaves time to spot planning opportunities and avoid the April rush. Business owners get the most value from planning conversations well before year-end.",
    },
    {
      q: "What documents do I need to bring?",
      a: "Typically last year’s return, W-2s and 1099s, mortgage interest and property tax statements, child care and education costs, health insurance forms, charitable receipts and any business income and expense records. After your first meeting we send a personalized checklist through [TaxCaddy](/client-center) so nothing is missed.",
    },
    {
      q: "Can you file prior-year returns?",
      a: "Yes. We regularly help clients catch up on one or several years of unfiled returns. If you have also received IRS notices, our [IRS resolution team](/services/irs-tax-resolution) can handle communication with the IRS while we get you current.",
    },
    {
      q: "Do you prepare returns for states other than Georgia?",
      a: "Yes. We prepare Georgia returns and returns for other states, including part-year and nonresident filings for people who moved during the year or earned income in more than one state.",
    },
    {
      q: "How do I track my refund?",
      a: "Once your return is accepted, you can check your federal refund with the IRS “Where’s My Refund?” tool and your Georgia refund with the Georgia Department of Revenue. Both trackers are linked in our [Client Center](/client-center).",
    },
    {
      q: "Can I work with you completely online?",
      a: "Absolutely. Many clients never visit the office: you upload documents through TaxCaddy, we meet by phone or Zoom, and you review and e-sign your return digitally. Clients across the country — and [Americans living abroad](/industries/expat-tax) — work with us this way.",
    },
  ],

  bookkeeping: [
    {
      q: "QuickBooks or Xero — which is better for my business?",
      a: "Both are excellent cloud platforms and we support both. QuickBooks Online is the most common choice for U.S. small businesses and connects with most payroll and banking tools; some owners prefer Xero’s clean interface. We’ll recommend the best fit, or work in the one you already use. See our [QuickBooks consulting](/services/quickbooks) services.",
    },
    {
      q: "How far behind can you catch up?",
      a: "As far as you need. We’ve helped businesses that were a few months behind and others that hadn’t reconciled in years. We start from bank and credit card statements, rebuild the records month by month and get you ready for tax filing.",
    },
    {
      q: "How do I send you receipts?",
      a: "Snap a photo with the Dext mobile app, forward receipts by email or upload them through your secure portal. Dext reads the details automatically, so nothing ends up lost in a shoebox.",
    },
    {
      q: "Do you do bookkeeping monthly or quarterly?",
      a: "Most clients choose monthly bookkeeping so their numbers are always current and useful for decisions. Quarterly service can work for smaller or seasonal businesses — we’ll recommend a schedule during your consultation.",
    },
    {
      q: "Is bookkeeping a fixed monthly fee?",
      a: "Yes. After reviewing your transaction volume and needs, we quote a fixed monthly fee — no surprise hourly bills. See our [outsourced accounting packages](/services#packages) for what each level includes.",
    },
    {
      q: "Will I get reports I can actually understand?",
      a: "That’s the point. You receive monthly financial statements and budget reports, and we walk you through them in plain English: what changed, why and what to do about it. For deeper analysis, add [business advisory](/services/business-advisory).",
    },
  ],

  payroll: [
    {
      q: "Can you take over our payroll in the middle of the year?",
      a: "Yes. We gather your year-to-date payroll records so W-2s and quarterly returns stay accurate, then take over starting with your next pay period.",
    },
    {
      q: "Which payroll platforms do you work with?",
      a: "We run payroll on professional payroll software and also work with ADP and Gusto. If you’re happy with your current platform, we can manage it for you.",
    },
    {
      q: "Do you handle Georgia payroll taxes?",
      a: "Yes. Georgia withholding deposits and returns, Georgia Department of Labor unemployment reports, federal tax deposits and quarterly Form 941 filings are all included.",
    },
    {
      q: "We already have payroll tax penalties. Can you help?",
      a: "Yes. We review the notices, request penalty relief where you qualify and set up a plan to resolve any balance. Learn more about [IRS problem resolution](/services/irs-tax-resolution).",
    },
    {
      q: "Do you prepare 1099s for contractors?",
      a: "Yes. We collect W-9s, track payments and file Forms 1099-NEC for the contractors you pay — a common need for [trucking companies](/industries/trucking) and service businesses.",
    },
    {
      q: "How do employees get their pay stubs and W-2s?",
      a: "Employees receive secure electronic pay stubs and W-2s they can access anytime, and you receive employer pay records after every payroll run.",
    },
  ],

  irs: [
    {
      q: "Will I have to talk to the IRS myself?",
      a: "Usually not. Once you sign IRS Form 2848 (power of attorney), we communicate with the IRS on your behalf. Most of our clients never speak with or meet an IRS employee.",
    },
    {
      q: "Who is allowed to represent me before the IRS?",
      a: "CPAs, attorneys and Enrolled Agents have unlimited rights to represent taxpayers before the IRS. Our team includes an [Enrolled Agent and a CPA](/about).",
    },
    {
      q: "I haven’t filed in years. What happens now?",
      a: "We pull your IRS transcripts to see what the IRS has on record, prepare the missing returns and build a plan for any balance due. Getting compliant voluntarily is almost always better than waiting for the IRS to act first.",
    },
    {
      q: "Can you stop a wage garnishment or bank levy?",
      a: "Often, yes. Levies can frequently be released once you are back in compliance and in an agreed resolution, such as an installment agreement or currently-not-collectible status. Timing matters, so contact us as soon as a levy notice arrives.",
    },
    {
      q: "What is audit protection?",
      a: "Audit protection means we handle the correspondence and represent you at the state and federal level — up through appeals — if a return is examined, so you are not facing the auditor alone or paying surprise hourly fees.",
    },
    {
      q: "Do you handle Georgia Department of Revenue notices too?",
      a: "Yes. We resolve Georgia DOR notices — income tax, withholding and sales tax issues — alongside any federal matters.",
    },
  ],

  advisory: [
    {
      q: "What does a fractional CFO actually do?",
      a: "A fractional CFO provides the financial leadership a full-time CFO would — budgets, forecasts, KPI tracking, cash-flow planning and strategic advice — on a part-time basis sized to your business.",
    },
    {
      q: "How often will we meet?",
      a: "Most advisory clients meet with us monthly or quarterly. Each meeting reviews your latest numbers against budget and sets priorities for the next period.",
    },
    {
      q: "Do my books need to be clean first?",
      a: "Reliable advice needs reliable numbers. If your books are behind, we start with [bookkeeping cleanup](/services/bookkeeping) and move into advisory as soon as the data is solid.",
    },
    {
      q: "What reports will I receive?",
      a: "Reports built around your business: budget vs. actual, cash-flow forecasts, profitability by service or location and the KPIs that matter in your industry — all explained in plain English.",
    },
    {
      q: "Is advisory only for larger businesses?",
      a: "Not at all. Many advisory clients are owner-operated businesses and professional practices, like [healthcare practices](/industries/healthcare), that want to grow more profitably.",
    },
  ],

  newBusiness: [
    {
      q: "Should I form an LLC or an S corporation?",
      a: "It depends on your profit, your goals and how you want to pay yourself. An LLC is a legal structure, while an S corporation is a tax election that an LLC or corporation can make. We model the numbers both ways — read [LLC or S Corp? How to Choose](/blog/llc-or-s-corp-georgia) for the basics.",
    },
    {
      q: "When does an S corp election make sense?",
      a: "Often when the business earns enough profit that the savings on self-employment tax outweigh the added cost of running payroll and filing a separate return. We run the numbers for your situation before you elect.",
    },
    {
      q: "How do I register a business in Georgia?",
      a: "Most businesses form with the Georgia Secretary of State, get an EIN from the IRS, register with the Georgia Department of Revenue for withholding or sales tax if needed and obtain a local business license. We walk you through each step.",
    },
    {
      q: "Which accounting software should I start with?",
      a: "For most new businesses, QuickBooks Online. We set it up with a clean chart of accounts, connect your bank and card accounts and show you the routine that keeps it accurate. See [QuickBooks setup](/services/quickbooks).",
    },
    {
      q: "Which retirement plan should I choose?",
      a: "Options range from SEP-IRAs and SIMPLE IRAs to Solo 401(k)s and traditional 401(k) plans. The best choice depends on your income, whether you have employees and how much you want to save — we compare them side by side.",
    },
    {
      q: "How can a credit card rewards strategy help my business?",
      a: "Running regular business expenses through the right rewards card — and paying it off every month — can return meaningful cash back or travel value. We look at your spending and suggest a strategy that fits.",
    },
  ],

  quickbooks: [
    {
      q: "Are you certified QuickBooks ProAdvisors?",
      a: "Yes. Our team includes certified QuickBooks ProAdvisors who set up, clean up and support QuickBooks files for businesses of every size.",
    },
    {
      q: "Can you migrate us from QuickBooks Desktop to QuickBooks Online?",
      a: "Yes. We plan the migration, convert your data, verify balances and lists afterward and train your team on the new workflow.",
    },
    {
      q: "We prefer QuickBooks Desktop. Can we still work remotely?",
      a: "Yes. With Rightworks hosting you can use QuickBooks Desktop in the cloud from anywhere, and our team can work in the same file.",
    },
    {
      q: "Do you offer QuickBooks training?",
      a: "We offer one-on-one and team training tailored to how your business actually uses QuickBooks — invoicing, bills, bank feeds, reports and more.",
    },
    {
      q: "Can I buy QuickBooks through you?",
      a: "Yes — you can [get QuickBooks through our partner](https://completebusinessgroup.com/jk-edwards-company/), and we’ll help you choose the right edition.",
    },
  ],

  trucking: [
    {
      q: "What is per diem for truck drivers?",
      a: "Per diem is a daily allowance for meals and incidental expenses when you’re away from home overnight. Self-employed drivers subject to DOT hours-of-service rules can generally deduct 80% of the IRS special transportation-industry rate for each qualifying day on the road.",
    },
    {
      q: "Do I need to file Form 2290?",
      a: "If you operate a highway motor vehicle with a taxable gross weight of 55,000 pounds or more, you generally must file Form 2290 and pay the Heavy Highway Vehicle Use Tax. The tax period runs July 1 through June 30, and you need the stamped Schedule 1 to register your truck.",
    },
    {
      q: "Can you help with IFTA reporting?",
      a: "Yes. We help carriers track miles and fuel by jurisdiction and prepare quarterly IFTA returns, which are due the last day of the month after each quarter ends.",
    },
    {
      q: "Is it better to buy or lease my truck for taxes?",
      a: "Buying can unlock large depreciation deductions (including bonus depreciation or Section 179 where eligible), while leasing spreads deductions over time. The right answer depends on your cash flow and income, so we model both.",
    },
    {
      q: "Should my trucking business be an LLC or an S corp?",
      a: "Many owner-operators start as sole proprietors or single-member LLCs and elect S corp status once profits grow. We’ll help you decide when the switch makes sense — see [new business setup](/services/new-business-setup).",
    },
    {
      q: "Do you run payroll for drivers?",
      a: "Yes. We run payroll for W-2 drivers, file 1099s for contractors and help you classify workers correctly. See our [payroll services](/services/payroll).",
    },
  ],

  healthcare: [
    {
      q: "What kinds of healthcare practices do you work with?",
      a: "Physician and specialist practices, dental offices, therapy and counseling practices, chiropractors and other independently owned healthcare businesses.",
    },
    {
      q: "How can you help us respond to falling reimbursements?",
      a: "Monthly financial statements and KPI tracking show exactly where revenue and costs are moving. We help you spot payer and service-line trends early and adjust staffing, scheduling and spending before margins shrink.",
    },
    {
      q: "Can you review our practice’s entity structure?",
      a: "Yes. We look at whether your structure — such as a professional corporation, PLLC or S corporation election — is still the most tax-efficient choice for the owners.",
    },
    {
      q: "Do you handle payroll for clinical staff?",
      a: "Yes — providers, nurses and front-office staff, including benefit deductions and retirement plan contributions. See [payroll services](/services/payroll).",
    },
    {
      q: "What does practice-specific tax planning include?",
      a: "Planning around owner compensation, retirement plans, equipment purchases, entity selection and multi-owner distributions — reviewed during the year, not just at tax time.",
    },
    {
      q: "Do you provide healthcare compliance advice?",
      a: "We focus on the financial side of your practice. For legal and regulatory compliance we coordinate with your attorney and consultants so the numbers and the rules line up.",
    },
  ],

  attorneys: [
    {
      q: "Can you help with IOLTA and trust account reconciliation?",
      a: "Yes. We support monthly three-way reconciliation — bank balance, trust ledger and individual client ledgers — so your records stay organized and review-ready. Your firm remains responsible for complying with the State Bar of Georgia’s trust accounting rules.",
    },
    {
      q: "How should partner compensation and distributions be handled?",
      a: "We help structure partner draws, guaranteed payments and distributions so they match your partnership agreement and are tax-efficient for each partner.",
    },
    {
      q: "Should my practice be a PLLC or elect S corp status?",
      a: "It depends on your profit and the number of owners. Many solo and small firms benefit from an S corp election once income grows — we model the options before you decide.",
    },
    {
      q: "How do you help contingency-fee practices with cash flow?",
      a: "We forecast cash flow around case timelines, track advanced case costs and build reserves so operating expenses are covered between settlements.",
    },
    {
      q: "Can you run payroll for our attorneys and staff?",
      a: "Yes — attorneys, paralegals and administrative staff, including federal and Georgia filings. See [payroll services](/services/payroll).",
    },
    {
      q: "Do you help high-earning partners with personal tax planning?",
      a: "Yes. We plan estimated taxes, retirement contributions and other strategies to manage the tax impact of a strong year. See [tax planning](/services/tax-preparation-planning).",
    },
  ],

  expat: [
    {
      q: "Do I still have to file a U.S. tax return if I live abroad?",
      a: "Generally, yes. U.S. citizens and green card holders are taxed on worldwide income and must file when their income meets the filing threshold — even if they owe nothing after exclusions and credits.",
    },
    {
      q: "What is the Foreign Earned Income Exclusion?",
      a: "The FEIE lets qualifying taxpayers exclude a set amount of foreign earned income each year (adjusted annually for inflation). You must meet the bona fide residence test or the physical presence test — 330 full days abroad in a 12-month period — and claim it on Form 2555.",
    },
    {
      q: "Should I use the FEIE or the Foreign Tax Credit?",
      a: "It depends on the tax rate where you live, the type of income you earn and your future plans. In high-tax countries the Foreign Tax Credit often works better; in low-tax countries the exclusion may. We compare both before filing.",
    },
    {
      q: "What is an FBAR and do I need to file one?",
      a: "If the combined value of your foreign financial accounts exceeded $10,000 at any time during the year, you generally must file FinCEN Form 114, known as the FBAR. It is filed separately from your tax return, and penalties for missing it can be significant.",
    },
    {
      q: "What is FATCA Form 8938?",
      a: "Form 8938 reports specified foreign financial assets with your tax return once they pass certain thresholds. For single filers living abroad, that generally means more than $200,000 on the last day of the year or more than $300,000 at any time during the year.",
    },
    {
      q: "I’m behind on my U.S. filings. What should I do?",
      a: "Don’t panic. The IRS offers programs such as the Streamlined Filing Compliance Procedures for taxpayers whose failure to file was non-willful. We review your situation and help you catch up — see [IRS problem resolution](/services/irs-tax-resolution).",
    },
  ],
} satisfies Record<string, Faq[]>;

export type FaqGroup = { title: string; items: Faq[] };

/** The /faq page, grouped by topic. */
export const faqPageGroups: FaqGroup[] = [
  {
    title: "Getting Started",
    items: [
      {
        q: "How do I get started with JK Edwards & Company?",
        a: "Book a [free consultation](/contact). We learn about your situation, recommend the right services and send a fixed quote. Onboarding happens through our secure online portals, so you can start from anywhere.",
      },
      {
        q: "Do you work with clients outside of Georgia?",
        a: "Yes. We serve Hampton, Henry County and metro-south Atlanta in person, and clients nationwide — including [Americans living abroad](/industries/expat-tax) — virtually.",
      },
      {
        q: "Do I need to come into the office?",
        a: "No. You’re welcome to meet us in [Hampton](/henry-county-accountant), but many clients work with us entirely by phone, Zoom and secure portals.",
      },
      {
        q: "What kinds of clients do you work with?",
        a: "Individuals and families, small and mid-sized businesses, and specialized [industries](/industries) including trucking, healthcare, law firms and U.S. expats.",
      },
      {
        q: "What credentials does your team hold?",
        a: "Our team includes an Enrolled Agent (EA), a Certified Public Accountant (CPA), certified QuickBooks ProAdvisors and a Certified Payroll Specialist. [Meet the team](/about).",
      },
    ],
  },
  {
    title: "Tax",
    items: [
      {
        q: "What’s the difference between tax preparation and tax planning?",
        a: "Preparation reports what already happened; planning shapes what happens next. We do both, all year — see [tax preparation & planning](/services/tax-preparation-planning).",
      },
      {
        q: "When are estimated tax payments due?",
        a: "Federal estimated payments are generally due April 15, June 15, September 15 and January 15 of the following year (moving to the next business day when a date falls on a weekend or holiday). We calculate yours as part of [tax planning](/services/tax-preparation-planning).",
      },
      {
        q: "How long should I keep my tax records?",
        a: "Generally at least three years from the date you file, though some situations call for six or seven years, and employment tax records should be kept for at least four. Storing records in your [secure portal](/client-center) makes this easy.",
      },
      {
        q: "Can you help if I haven’t filed in a few years?",
        a: "Yes. We prepare the missing returns and, if the IRS has already sent notices, handle them for you through [IRS problem resolution](/services/irs-tax-resolution).",
      },
      {
        q: "Do you prepare returns for both businesses and individuals?",
        a: "Yes — individual and family returns plus sole proprietorships, LLCs, partnerships, S corporations and C corporations. See [tax preparation](/services/tax-preparation-planning).",
      },
    ],
  },
  {
    title: "Bookkeeping & Payroll",
    items: [
      {
        q: "What’s included in outsourced accounting?",
        a: "Reconciliations, monthly financial statements, budget reports, tax preparation and planning, and — depending on your package — payroll, bill pay and 1099s. Compare our [accounting packages](/services#packages).",
      },
      {
        q: "Can you clean up books that are months or years behind?",
        a: "Yes. Catch-up and cleanup work is one of the most common ways clients start with us. Learn more about [bookkeeping](/services/bookkeeping).",
      },
      {
        q: "Can you run payroll for a small team?",
        a: "Yes, whether you have one employee or fifty. We handle payroll runs, tax deposits, quarterly returns and W-2s. See [payroll services](/services/payroll).",
      },
      {
        q: "Do you work in QuickBooks?",
        a: "Yes. Our team includes certified QuickBooks ProAdvisors, and we also support Xero. See [QuickBooks consulting](/services/quickbooks).",
      },
    ],
  },
  {
    title: "IRS Problems",
    items: [
      {
        q: "I got a letter from the IRS. What should I do?",
        a: "Don’t ignore it — and don’t panic. Note the response deadline, then [send us the notice](/services/irs-tax-resolution#upload-notice) or call. Our guide [What to Do When You Get an IRS Letter](/blog/what-to-do-when-you-get-an-irs-letter) explains the next steps.",
      },
      {
        q: "Can you represent me in an IRS audit?",
        a: "Yes. With a signed power of attorney we handle the audit for you at the state and federal level, up through appeals. See [audit protection](/services/irs-tax-resolution).",
      },
      {
        q: "Can I set up a payment plan with the IRS?",
        a: "Often, yes. The IRS offers short-term payment plans and longer installment agreements, and in some cases other options such as an offer in compromise. We find the option that fits your finances — see [IRS problem resolution](/services/irs-tax-resolution).",
      },
      {
        q: "How can I tell if an IRS call or email is a scam?",
        a: "The IRS usually makes first contact by mail. It won’t demand immediate payment by gift card, wire transfer or cryptocurrency, and it won’t threaten arrest. If something feels off, [call us](/contact) before you respond.",
      },
    ],
  },
  {
    title: "Pricing & Portals",
    items: [
      {
        q: "How much do your services cost?",
        a: "We quote fixed fees after a free consultation, based on the scope of your needs, and outsourced accounting is billed at a predictable monthly rate. See our [packages](/services#packages) or [request a quote](/contact).",
      },
      {
        q: "How do I pay my bill?",
        a: "Use our secure [online payment page](https://secure.cpacharge.com/pages/jkedwards/payments), also linked from the [Client Center](/client-center).",
      },
      {
        q: "Which portal should I use to send documents?",
        a: "Use TaxCaddy for tax documents, Liscio for secure messages and files, and Dext for receipts. Every portal is linked in the [Client Center](/client-center).",
      },
      {
        q: "Is my information secure?",
        a: "Yes. We use encrypted portals for documents and messages instead of regular email and only request what we need. Please never send Social Security numbers or tax documents by standard email — use the [Client Center](/client-center) portals instead.",
      },
    ],
  },
];
