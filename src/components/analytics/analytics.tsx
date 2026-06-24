"use client";

import Script from "next/script";
import { Suspense, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { GA4_ID, META_PIXEL_ID, CLARITY_ID, pageview } from "@/lib/analytics";
import { hasAnalyticsConsent, CONSENT_EVENT } from "@/components/conversion/cookie-consent";

interface Ids {
  ga4: string;
  metaPixel: string;
  clarity: string;
}

/** Tracks client-side route changes as GA4 page_view + Meta PageView. */
function RouteChangeTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : "");
    pageview(url);
  }, [pathname, searchParams]);

  return null;
}

/**
 * Loads GA4, Meta Pixel, and Microsoft Clarity. IDs are resolved at runtime from
 * the admin-editable `site_settings` table (Supabase), falling back to env vars.
 * This lets the analytics IDs be changed from the admin dashboard without a redeploy.
 */
export function Analytics() {
  const [ids, setIds] = useState<Ids>({
    ga4: GA4_ID || "",
    metaPixel: META_PIXEL_ID || "",
    clarity: CLARITY_ID || "",
  });
  const [consent, setConsent] = useState(false);

  // Load analytics only after the visitor accepts cookies (GDPR-friendly).
  useEffect(() => {
    setConsent(hasAnalyticsConsent());
    const onChange = (e: Event) => setConsent((e as CustomEvent).detail === "accepted");
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("site_settings")
          .select("key, value")
          .in("key", ["ga4_id", "meta_pixel_id", "clarity_id"]);
        if (!active || !data) return;
        const map = Object.fromEntries(data.map((r: any) => [r.key, r.value]));
        setIds({
          ga4: map.ga4_id || GA4_ID || "",
          metaPixel: map.meta_pixel_id || META_PIXEL_ID || "",
          clarity: map.clarity_id || CLARITY_ID || "",
        });
      } catch {
        // keep env fallbacks
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      {/* Google Analytics 4 */}
      {consent && ids.ga4 && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ids.ga4}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${ids.ga4}',{send_page_view:true});`}
          </Script>
        </>
      )}

      {/* Meta Pixel */}
      {consent && ids.metaPixel && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${ids.metaPixel}');fbq('track','PageView');`}
        </Script>
      )}

      {/* Microsoft Clarity */}
      {consent && ids.clarity && (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${ids.clarity}");`}
        </Script>
      )}

      <Suspense fallback={null}>
        <RouteChangeTracker />
      </Suspense>
    </>
  );
}
