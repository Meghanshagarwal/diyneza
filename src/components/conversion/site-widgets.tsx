"use client";

import { usePathname } from "next/navigation";
import { WhatsAppButton } from "./whatsapp-button";
import { ExitIntentPopup } from "./exit-intent-popup";
import { StickyDemoBar } from "./sticky-demo-bar";
import { CookieConsent } from "./cookie-consent";

/** Conversion widgets shown on public pages only (hidden across /admin). */
export function SiteWidgets() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return <CookieConsent />;

  return (
    <>
      <WhatsAppButton />
      <ExitIntentPopup />
      <StickyDemoBar />
      <CookieConsent />
    </>
  );
}
