import Script from "next/script";
import { site } from "@/lib/site";

/**
 * The LeadConnector (GoHighLevel) request form, embedded inline. LeadConnector's
 * form_embed.js sizes the frame to the form, so it never shows an inner scrollbar.
 * The form is configured in site.config.ts (`leadForm`).
 */
export function LeadForm({ className }: { className?: string }) {
  const { id, name, height } = site.leadForm;
  if (!id) return null;
  return (
    <div className={className}>
      <iframe
        src={`https://api.leadconnectorhq.com/widget/form/${id}`}
        style={{ width: "100%", height, border: "none", borderRadius: 10 }}
        id={`inline-${id}`}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name={name}
        data-height={String(height)}
        data-layout-iframe-id={`inline-${id}`}
        data-form-id={id}
        data-cookie-consent="true"
        data-cookie-consent-provider="auto"
        title={name}
      />
      <Script
        id="leadconnector-form-embed"
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
