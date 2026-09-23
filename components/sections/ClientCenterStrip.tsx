import Link from "next/link";
import { ArrowRight, ArrowUpRight, CreditCard, FolderOpen, LogIn, MessagesSquare } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { portals, site } from "@/lib/site";

const quickLinks = [
  { label: "Pay Bill", href: site.links.payBill, Icon: CreditCard },
  { label: "Client Login", href: portals.find((p) => p.key === "netclient")!.href, Icon: LogIn },
  { label: "TaxCaddy", href: portals.find((p) => p.key === "taxcaddy")!.href, Icon: FolderOpen },
  { label: "Liscio", href: portals.find((p) => p.key === "liscio")!.href, Icon: MessagesSquare },
];

/** "Existing client?" quick-access strip on the home page. */
export function ClientCenterStrip() {
  return (
    <section aria-labelledby="client-strip-heading" className="bg-paper py-12 md:py-14">
      <Container>
        <Reveal className="flex flex-col gap-6 rounded-2xl border border-line bg-white p-7 shadow-sm lg:flex-row lg:items-center lg:justify-between lg:p-8">
          <div>
            <h2 id="client-strip-heading" className="font-serif text-2xl font-semibold text-ink">
              Existing client?
            </h2>
            <p className="mt-1.5 text-charcoal">
              Jump straight to your portal, or visit the{" "}
              <Link
                href="/client-center"
                className="font-semibold text-accent-strong underline-offset-4 hover:underline"
              >
                Client Center
              </Link>{" "}
              for every tool.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            {quickLinks.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-[6px] border border-charcoal/30 px-4 py-3 text-[15px] font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                >
                  <Icon aria-hidden className="h-4 w-4 text-accent group-hover:text-accent-light" strokeWidth={1.75} />
                  {label}
                  <ArrowUpRight aria-hidden className="h-3.5 w-3.5 opacity-60" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
            <li className="col-span-2 sm:col-span-1">
              <Link
                href="/client-center"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-[6px] bg-accent px-4 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                All client tools
                <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
