"use client";

/**
 * Unified analytics layer. A single track() call fans an event out to
 * Google Analytics 4, Meta Pixel, and Microsoft Clarity so nothing is missed.
 *
 * IDs are read from public env vars (set in .env / hosting dashboard):
 *   NEXT_PUBLIC_GA4_ID         e.g. G-XXXXXXXXXX
 *   NEXT_PUBLIC_META_PIXEL_ID  e.g. 1234567890
 *   NEXT_PUBLIC_CLARITY_ID     e.g. abcdefghij
 */

export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
export const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// Meta Pixel standard events get fbq('track', ...); everything else is custom.
const META_STANDARD = new Set([
  "PageView", "ViewContent", "Search", "Lead", "Contact", "AddToCart",
  "InitiateCheckout", "Purchase", "Subscribe", "CompleteRegistration",
]);

/** GA4 page_view (used on client-side route changes). */
export function pageview(url: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "page_view", { page_path: url, page_location: window.location.href });
  window.fbq?.("track", "PageView");
}

/**
 * Fire one analytics event to GA4 + Meta Pixel + Clarity.
 * @param ga4Event   snake_case GA4 event name (e.g. "form_submit")
 * @param params     GA4 event parameters
 * @param metaEvent  optional Meta Pixel event name (standard or custom)
 */
export function track(
  ga4Event: string,
  params: Record<string, unknown> = {},
  metaEvent?: string
) {
  if (typeof window === "undefined") return;

  // Google Analytics 4
  window.gtag?.("event", ga4Event, params);

  // Meta Pixel — standard events use track(), custom use trackCustom()
  const meta = metaEvent || ga4Event;
  if (META_STANDARD.has(meta)) {
    window.fbq?.("track", meta, params);
  } else {
    window.fbq?.("trackCustom", meta, params);
  }

  // Microsoft Clarity — tag the session + emit a custom event for filtering
  window.clarity?.("event", ga4Event);
  if (params && Object.keys(params).length) {
    const label = String(params.label ?? params.id ?? "");
    if (label) window.clarity?.("set", ga4Event, label);
  }
}

// ---- Convenience helpers for common conversions ----

export const trackCTA = (label: string, location?: string) =>
  track("cta_click", { label, location }, "CTAClick");

export const trackButton = (label: string, location?: string) =>
  track("button_click", { label, location });

export const trackEmailClick = (email: string) =>
  track("email_click", { label: email }, "Contact");

export const trackPhoneClick = (phone: string) =>
  track("phone_click", { label: phone }, "Contact");

export const trackFormStart = (formName: string) =>
  track("form_start", { form_name: formName });

export const trackFieldFocus = (formName: string, field: string) =>
  track("field_focus", { form_name: formName, field });

export const trackFormSubmit = (formName: string) =>
  track("form_submit", { form_name: formName });

export const trackFormSuccess = (formName: string, value?: number) =>
  track("form_success", { form_name: formName, value }, "Lead");

export const trackFormError = (formName: string, message: string) =>
  track("form_error", { form_name: formName, message });

export const trackLead = (source: string) =>
  track("generate_lead", { source }, "Lead");
