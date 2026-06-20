"use client";

import { useEffect } from "react";

/**
 * Win-back tab title. When the visitor switches away, the browser-tab title
 * rotates through attention-grabbing messages (incl. the 45-day free trial);
 * the original title is restored the moment they come back.
 */
const AWAY_MESSAGES = [
  "👋 Come back! 45-day free trial",
  "🍽️ Run your whole restaurant in 1 app",
  "⚡ Start free — no credit card needed",
  "🎁 45 days free · Cancel anytime",
];

export function DynamicTitle() {
  useEffect(() => {
    let original = document.title;
    let timer: ReturnType<typeof setInterval> | null = null;
    let i = 0;

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        original = document.title; // capture current (route-specific) title
        i = 0;
        document.title = AWAY_MESSAGES[0];
        timer = setInterval(() => {
          i = (i + 1) % AWAY_MESSAGES.length;
          document.title = AWAY_MESSAGES[i];
        }, 2000);
      } else {
        if (timer) clearInterval(timer);
        timer = null;
        document.title = original;
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      if (timer) clearInterval(timer);
    };
  }, []);

  return null;
}
