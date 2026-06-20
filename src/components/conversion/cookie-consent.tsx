"use client";

import * as React from "react";
import Link from "next/link";

export const CONSENT_KEY = "diyneza_cookie_consent";
export const CONSENT_EVENT = "diyneza-consent-changed";

/** Returns true if analytics is allowed (accepted, or not yet decided we treat as pending=false). */
export function hasAnalyticsConsent() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(CONSENT_KEY) === "accepted";
}

/**
 * GDPR-style cookie consent banner. Analytics tags load only after "Accept".
 * Emits a window event so the analytics loader can react without a reload.
 */
export function CookieConsent() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) setVisible(true);
  }, []);

  const decide = (value: "accepted" | "declined") => {
    localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[55] border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-md p-4">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-zinc-400 leading-relaxed">
          We use cookies for analytics to improve your experience. See our{" "}
          <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
        </p>
        <div className="flex shrink-0 gap-2">
          <button onClick={() => decide("declined")} className="rounded-lg border border-zinc-700 px-4 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-800">
            Decline
          </button>
          <button onClick={() => decide("accepted")} className="rounded-lg bg-primary px-4 py-2 text-xs font-heading font-semibold text-black hover:bg-primary-light">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
