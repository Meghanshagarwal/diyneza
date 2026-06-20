"use client";

import * as React from "react";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { trackFormStart, trackFormSubmit, trackFormSuccess, trackFormError } from "@/lib/analytics";

export function CTA() {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const startedRef = React.useRef(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    trackFormSubmit("homepage_cta");
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("leads").insert([
        {
          name: email.split("@")[0] || "Prospect",
          email: email,
          source: "Homepage CTA",
          status: "NEW",
          notes: "Prospect requested a demo from the bottom CTA banner."
        }
      ]);

      if (error) throw error;

      trackFormSuccess("homepage_cta");
      setSuccess(true);
      setEmail("");
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error("Error submitting lead:", err);
      setError("Failed to submit request. Please try again.");
      trackFormError("homepage_cta", err instanceof Error ? err.message : "insert failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="cta" className="relative py-20 md:py-28 overflow-hidden bg-black">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl opacity-50" />

      <div className="mx-auto max-w-5xl px-6">
        <div className="relative rounded-3xl border border-zinc-800 bg-zinc-950/80 px-8 py-12 text-center shadow-2xl backdrop-blur-md md:py-20 md:px-16 overflow-hidden">
          {/* Decorative glows */}
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-primary/5 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-primary/5 blur-2xl pointer-events-none" />

          {/* Icon */}
          <div className="inline-flex items-center space-x-2 rounded-full bg-primary/10 border border-primary/20 px-4.5 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5 fill-primary" />
            <span>GROW YOUR OUTLET</span>
          </div>

          <h2 className="mt-6 font-heading text-3xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight">
            Ready to supercharge your operations?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400">
            Join over 12,000+ restaurants worldwide running their POS, billing, and inventory from a single, cloud-hosted terminal.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-md flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              name="email"
              autoComplete="email"
              aria-label="Work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => {
                if (!startedRef.current) {
                  startedRef.current = true;
                  trackFormStart("homepage_cta");
                }
              }}
              placeholder="Enter your work email"
              required
              disabled={loading || success}
              className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary backdrop-blur-sm disabled:opacity-50"
            />
            <Button 
              type="submit" 
              variant={success ? "success" as any : "primary"} 
              disabled={loading || success}
              className="flex items-center justify-center space-x-1.5 py-3 sm:py-2 min-w-[140px]"
            >
              {success ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Submitted!</span>
                </>
              ) : (
                <>
                  <span>{loading ? "Submitting..." : "Book a Demo"}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {error && (
            <p className="mt-3 text-xs text-red-400" role="alert">{error}</p>
          )}

          <p className="mt-4 text-xs text-zinc-500 font-medium">
            45-day free trial · No credit card required · Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
