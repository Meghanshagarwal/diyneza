"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import {
  trackFormStart,
  trackFieldFocus,
  trackFormSubmit,
  trackFormSuccess,
  trackFormError,
} from "@/lib/analytics";

const OUTLET_OPTIONS = ["1 outlet", "2–5 outlets", "6–20 outlets", "20+ outlets"];

export function ContactForm() {
  const searchParams = useSearchParams();
  const intent = searchParams.get("intent"); // "trial" | "demo" | null

  const isTrial = intent === "trial";
  const source = isTrial ? "Free Trial" : "Book a Demo";

  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    restaurant: "",
    outlets: OUTLET_OPTIONS[0],
    message: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const startedRef = React.useRef(false);

  const formName = `contact_${source.toLowerCase().replace(/\s+/g, "_")}`;

  const update = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  // Fire form_start once, on the first field interaction.
  const handleFocus = (field: string) => () => {
    if (!startedRef.current) {
      startedRef.current = true;
      trackFormStart(formName);
    }
    trackFieldFocus(formName, field);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.email.trim()) {
      setError("Please enter your name and email.");
      trackFormError(formName, "missing required fields");
      return;
    }

    trackFormSubmit(formName);
    setLoading(true);
    try {
      const supabase = createClient();
      const notes = [
        `Intent: ${source}`,
        form.restaurant && `Restaurant: ${form.restaurant}`,
        `Outlets: ${form.outlets}`,
        form.message && `Message: ${form.message}`,
      ]
        .filter(Boolean)
        .join("\n");

      const { error: insertError } = await supabase.from("leads").insert([
        {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || null,
          source,
          status: "NEW",
          notes,
        },
      ]);

      if (insertError) throw insertError;

      trackFormSuccess(formName);
      startedRef.current = false;
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", restaurant: "", outlets: OUTLET_OPTIONS[0], message: "" });
    } catch (err) {
      console.error("Lead submission failed:", err);
      setError("Something went wrong. Please try again or email hello@diyneza.com.");
      trackFormError(formName, err instanceof Error ? err.message : "insert failed");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-primary/30 bg-zinc-900/40 p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 border border-primary/30">
          <CheckCircle2 className="h-7 w-7 text-primary" />
        </div>
        <h3 className="mt-5 font-heading text-2xl font-bold text-white">Thank you! 🎉</h3>
        <p className="mt-3 text-sm text-zinc-400 max-w-sm mx-auto">
          We&apos;ve received your request. Our team will reach out within 24 hours to{" "}
          {isTrial ? "set up your 45-day free trial" : "schedule your personalized demo"}.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-6 text-xs font-semibold text-primary hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-2" htmlFor="cf-name">Full name *</label>
          <input id="cf-name" name="name" autoComplete="name" className={inputClass} value={form.name} onChange={update("name")} onFocus={handleFocus("name")} placeholder="Jane Doe" required />
        </div>
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-2" htmlFor="cf-email">Work email *</label>
          <input id="cf-email" name="email" type="email" autoComplete="email" className={inputClass} value={form.email} onChange={update("email")} onFocus={handleFocus("email")} placeholder="jane@restaurant.com" required />
        </div>
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-2" htmlFor="cf-phone">Phone</label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" className={inputClass} value={form.phone} onChange={update("phone")} onFocus={handleFocus("phone")} placeholder="+1 555 000 0000" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-2" htmlFor="cf-restaurant">Restaurant / brand</label>
          <input id="cf-restaurant" name="organization" autoComplete="organization" className={inputClass} value={form.restaurant} onChange={update("restaurant")} onFocus={handleFocus("restaurant")} placeholder="The Burger Hub" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-zinc-400 mb-2" htmlFor="cf-outlets">Number of outlets</label>
        <select id="cf-outlets" name="outlets" className={inputClass} value={form.outlets} onChange={update("outlets")} onFocus={handleFocus("outlets")}>
          {OUTLET_OPTIONS.map((o) => (
            <option key={o} value={o} className="bg-zinc-900">{o}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-zinc-400 mb-2" htmlFor="cf-message">How can we help?</label>
        <textarea
          id="cf-message"
          name="message"
          className={`${inputClass} min-h-[120px] resize-y`}
          value={form.message}
          onChange={update("message")}
          onFocus={handleFocus("message")}
          placeholder={isTrial ? "Tell us about your restaurant and what you'd like to try…" : "Tell us what you'd like to see in the demo…"}
        />
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3 text-base font-heading font-semibold text-black transition-all hover:bg-primary-light hover:scale-[1.01] glow-primary disabled:opacity-50 disabled:pointer-events-none"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
          </>
        ) : (
          <>
            <span>{isTrial ? "Start my 45-day free trial" : "Request my demo"}</span>
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <p className="text-xs text-zinc-500">
        45-day free trial · No credit card required · Cancel anytime
      </p>
    </form>
  );
}
