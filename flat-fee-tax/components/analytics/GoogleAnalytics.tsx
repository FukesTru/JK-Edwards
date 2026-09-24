import { site } from "@/lib/site";

const PLACEHOLDER_ID = "G-XXXXXXXXXX";

/**
 * GA4 snippet, rendered inside <head> by the root layout. The measurement ID
 * comes from NEXT_PUBLIC_GA4_ID (placeholder G-XXXXXXXXXX until the client
 * supplies one). gtag.js is only downloaded once a real ID is configured, so
 * the placeholder never costs page speed.
 */
export function GoogleAnalytics() {
  const id = site.ga4Id;
  const isPlaceholder = id === PLACEHOLDER_ID;

  return (
    <>
      {!isPlaceholder && <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />}
      <script
        id="ga4-init"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${id}');`,
        }}
      />
    </>
  );
}
