"use client";

import * as React from "react";
import { X, ArrowRight, CheckCircle2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { track, trackFormSubmit, trackFormSuccess, trackFormError } from "@/lib/analytics";

const SEEN_KEY = "diyneza_exit_seen";

/**
 * Exit-intent email capture. Shows once per visitor when the mouse leaves the
 * top of the viewport (desktop) — captures the lead into Supabase.
 */
export function ExitIntentPopup() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(SEEN_KEY)) return;

    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setOpen(true);
        localStorage.setItem(SEEN_KEY, "1");
        track("exit_intent_shown", {});
        document.removeEventListener("mouseout", onLeave);
      }
    };
    const t = setTimeout(() => document.addEventListener("mouseout", onLeave), 5000);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  const close = () => setOpen(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    trackFormSubmit("exit_intent");
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error: insErr } = await supabase.from("leads").insert([
        { name: email.split("@")[0] || "Prospect", email, source: "Exit Intent Popup", status: "NEW", notes: "Captured via exit-intent popup (45-day trial offer)." },
      ]);
      if (insErr) throw insErr;
      trackFormSuccess("exit_intent");
      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      trackFormError("exit_intent", err instanceof Error ? err.message : "insert failed");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4" role="dialog" aria-modal="true" aria-label="Special offer">
      <div className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl">
        <button onClick={close} aria-label="Close" className="absolute right-4 top-4 text-zinc-500 hover:text-white">
          <X className="h-5 w-5" />
        </button>

        {success ? (
          <div className="text-center py-4">
            <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
            <h3 className="mt-4 font-heading text-2xl font-bold text-white">You&apos;re in! 🎉</h3>
            <p className="mt-2 text-sm text-zinc-400">We&apos;ll be in touch about your 45-day free trial.</p>
            <button onClick={close} className="mt-6 text-sm font-semibold text-primary hover:underline">Close</button>
          </div>
        ) : (
          <>
            <span className="inline-block rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-[10px] font-bold text-primary uppercase tracking-wider">
              Wait — before you go
            </span>
            <h3 className="mt-4 font-heading text-2xl font-extrabold text-white leading-tight">
              Start your <span className="text-primary">45-day free trial</span>
            </h3>
            <p className="mt-2 text-sm text-zinc-400">
              No credit card. Cancel anytime. We&apos;ll even migrate your menu &amp; data for you.
            </p>
            <form onSubmit={submit} className="mt-6 flex flex-col gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                aria-label="Work email"
                className="rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-heading font-semibold text-black hover:bg-primary-light disabled:opacity-50">
                {loading ? "Submitting…" : <>Claim my free trial <ArrowRight className="h-4 w-4" /></>}
              </button>
              {error && <p className="text-xs text-red-400" role="alert">{error}</p>}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
