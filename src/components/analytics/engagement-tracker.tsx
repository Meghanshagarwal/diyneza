"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track, trackEmailClick, trackPhoneClick } from "@/lib/analytics";

/**
 * Site-wide passive engagement tracking — fires to GA4 + Pixel + Clarity:
 *  - scroll depth 25/50/75/90%
 *  - time on page (on unload)
 *  - automatic email (mailto:), phone (tel:) and outbound link clicks
 * Resets per route change.
 */
export function EngagementTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const reached = new Set<number>();
    const thresholds = [25, 50, 75, 90];
    const start = Date.now();

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      if (scrollable <= 0) return;
      const pct = (window.scrollY / scrollable) * 100;
      for (const t of thresholds) {
        if (pct >= t && !reached.has(t)) {
          reached.add(t);
          track("scroll_depth", { percent: t, page: pathname });
        }
      }
    };

    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest("a");
      if (!el) return;
      const href = el.getAttribute("href") || "";
      if (href.startsWith("mailto:")) {
        trackEmailClick(href.replace("mailto:", ""));
      } else if (href.startsWith("tel:")) {
        trackPhoneClick(href.replace("tel:", ""));
      } else if (href.startsWith("http") && !href.includes(window.location.host)) {
        track("outbound_click", { url: href, label: el.textContent?.trim() || href });
      }
    };

    const onHide = () => {
      const seconds = Math.round((Date.now() - start) / 1000);
      if (seconds > 0) track("time_on_page", { seconds, page: pathname });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") onHide();
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
    };
  }, [pathname]);

  return null;
}
