"use client";

import * as React from "react";
import { BarChart3, CheckCircle2, Loader2, Save } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface Settings {
  ga4_id: string;
  meta_pixel_id: string;
  clarity_id: string;
}

const FIELDS: {
  key: keyof Settings;
  label: string;
  placeholder: string;
  hint: string;
}[] = [
  {
    key: "ga4_id",
    label: "Google Analytics 4 — Measurement ID",
    placeholder: "G-XXXXXXXXXX",
    hint: "GA4 → Admin → Data Streams → Web → Measurement ID.",
  },
  {
    key: "meta_pixel_id",
    label: "Meta (Facebook) Pixel ID",
    placeholder: "000000000000000",
    hint: "Meta Events Manager → Data Sources → your Pixel → Pixel ID.",
  },
  {
    key: "clarity_id",
    label: "Microsoft Clarity — Project ID",
    placeholder: "abcdefghij",
    hint: "Clarity → Settings → Overview → Project ID (from the tracking code).",
  },
];

export function SettingsClient({ initial }: { initial: Settings }) {
  const [values, setValues] = React.useState<Settings>(initial);
  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const update = (key: keyof Settings) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const supabase = createClient();
      const rows = (Object.keys(values) as (keyof Settings)[]).map((key) => ({
        key,
        value: values[key].trim(),
        updated_at: new Date().toISOString(),
      }));
      const { error: upErr } = await supabase
        .from("site_settings")
        .upsert(rows, { onConflict: "key" });
      if (upErr) throw upErr;
      setSaved(true);
      setTimeout(() => setSaved(false), 4000);
    } catch (err) {
      console.error("Failed to save settings:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Could not save. Make sure the site_settings table exists (run the migration)."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
          <BarChart3 className="h-5 w-5 text-primary" />
        </span>
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">Analytics &amp; Tracking</h1>
          <p className="text-sm text-zinc-500">
            Paste your tracking IDs. Changes apply across the live site automatically — no redeploy.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="mt-8 space-y-6">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <label htmlFor={f.key} className="block text-sm font-semibold text-zinc-300 mb-2">
              {f.label}
            </label>
            <input
              id={f.key}
              value={values[f.key]}
              onChange={update(f.key)}
              placeholder={f.placeholder}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-mono"
            />
            <p className="mt-1.5 text-xs text-zinc-500">{f.hint}</p>
          </div>
        ))}
      </div>

      {error && (
        <p className="mt-5 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3" role="alert">
          {error}
        </p>
      )}

      {/* Save */}
      <div className="mt-8 flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-heading font-semibold text-black transition-all hover:bg-primary-light disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? "Saving…" : "Save settings"}
        </button>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400">
            <CheckCircle2 className="h-4 w-4" /> Saved
          </span>
        )}
      </div>

      <p className="mt-8 text-xs text-zinc-600 leading-relaxed">
        Leave a field empty to disable that tool. The tracking tag loads only when an
        ID is present. After saving, refresh the public site to confirm the tag fires.
      </p>
    </div>
  );
}
