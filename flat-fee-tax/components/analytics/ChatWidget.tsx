import Script from "next/script";
import { site } from "@/lib/site";

/**
 * LeadConnector (GoHighLevel) chat widget, loaded on every page once the
 * browser is idle so it never slows the first paint. Set or clear
 * `chatWidgetId` in site.config.ts to change or remove it.
 */
export function ChatWidget() {
  if (!site.chatWidgetId) return null;
  return (
    <Script
      id="leadconnector-chat-widget"
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id={site.chatWidgetId}
      strategy="lazyOnload"
    />
  );
}
