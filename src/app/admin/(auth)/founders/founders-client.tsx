"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Users, Plus, Trash2, Save, Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface Founder {
  id?: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
  twitter: string;
  github: string;
  display_order: number;
}

const empty = (order: number): Founder => ({
  name: "",
  role: "",
  bio: "",
  image: "/images/logo-mark.png",
  linkedin: "",
  twitter: "",
  github: "",
  display_order: order,
});

export function FoundersClient({ initial }: { initial: any[] }) {
  const router = useRouter();
  const [founders, setFounders] = React.useState<Founder[]>(
    initial.map((f) => ({
      id: f.id,
      name: f.name || "",
      role: f.role || "",
      bio: f.bio || "",
      image: f.image || "",
      linkedin: f.linkedin || "",
      twitter: f.twitter || "",
      github: f.github || "",
      display_order: f.display_order ?? 0,
    }))
  );
  const [savingId, setSavingId] = React.useState<string | number | null>(null);
  const [savedId, setSavedId] = React.useState<string | number | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const setField = (idx: number, key: keyof Founder, value: string | number) =>
    setFounders((list) => list.map((f, i) => (i === idx ? { ...f, [key]: value } : f)));

  const handleSave = async (idx: number) => {
    const f = founders[idx];
    setError(null);
    if (!f.name.trim()) {
      setError("Name is required.");
      return;
    }
    setSavingId(f.id ?? idx);
    try {
      const supabase = createClient();
      const payload = {
        name: f.name.trim(),
        role: f.role.trim(),
        bio: f.bio.trim(),
        image: f.image.trim(),
        linkedin: f.linkedin.trim(),
        twitter: f.twitter.trim(),
        github: f.github.trim(),
        display_order: Number(f.display_order) || idx + 1,
      };
      if (f.id) {
        const { error: e } = await supabase.from("founders").update(payload).eq("id", f.id);
        if (e) throw e;
      } else {
        const { data, error: e } = await supabase.from("founders").insert(payload).select().single();
        if (e) throw e;
        setFounders((list) => list.map((x, i) => (i === idx ? { ...x, id: data.id } : x)));
      }
      setSavedId(f.id ?? idx);
      setTimeout(() => setSavedId(null), 3000);
      router.refresh();
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Save failed. Make sure the founders table exists (run the migration)."
      );
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (idx: number) => {
    const f = founders[idx];
    if (!confirm(`Remove ${f.name || "this founder"}?`)) return;
    try {
      if (f.id) {
        const supabase = createClient();
        const { error: e } = await supabase.from("founders").delete().eq("id", f.id);
        if (e) throw e;
      }
      setFounders((list) => list.filter((_, i) => i !== idx));
      router.refresh();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Delete failed.");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-zinc-800 bg-zinc-900/40 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div className="p-6 md:p-10 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
            <Users className="h-5 w-5 text-primary" />
          </span>
          <div>
            <h1 className="font-heading text-2xl font-bold text-white">Founders</h1>
            <p className="text-sm text-zinc-500">
              Edit founder names, roles, bios, photos and social links. Shown on the About page.
            </p>
          </div>
        </div>
        <button
          onClick={() => setFounders((l) => [...l, empty(l.length + 1)])}
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900/60 px-4 py-2 text-sm font-semibold text-white hover:border-zinc-500"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>

      {error && (
        <p className="mt-5 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3" role="alert">
          {error}
        </p>
      )}

      {/* Cards */}
      <div className="mt-8 space-y-6">
        {founders.map((f, idx) => (
          <div key={f.id || idx} className="rounded-2xl border border-zinc-800/80 bg-zinc-900/20 p-6">
            <div className="flex items-start gap-4">
              <img
                src={f.image || "/images/logo-mark.png"}
                alt={f.name || "Founder"}
                className="h-16 w-16 shrink-0 rounded-xl border border-zinc-800 bg-zinc-900/40 object-cover"
              />
              <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">Name *</label>
                  <input className={inputClass} value={f.name} onChange={(e) => setField(idx, "name", e.target.value)} placeholder="Full name" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">Role</label>
                  <input className={inputClass} value={f.role} onChange={(e) => setField(idx, "role", e.target.value)} placeholder="Founder & CEO" />
                </div>
              </div>
            </div>

            <div className="mt-3">
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Bio</label>
              <textarea className={`${inputClass} min-h-[80px] resize-y`} value={f.bio} onChange={(e) => setField(idx, "bio", e.target.value)} placeholder="Short bio…" />
            </div>

            <div className="mt-3">
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Image URL</label>
              <input className={inputClass} value={f.image} onChange={(e) => setField(idx, "image", e.target.value)} placeholder="https://… or /images/founder.jpg" />
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">LinkedIn</label>
                <input className={inputClass} value={f.linkedin} onChange={(e) => setField(idx, "linkedin", e.target.value)} placeholder="https://linkedin.com/in/…" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Twitter / X</label>
                <input className={inputClass} value={f.twitter} onChange={(e) => setField(idx, "twitter", e.target.value)} placeholder="https://twitter.com/…" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">GitHub</label>
                <input className={inputClass} value={f.github} onChange={(e) => setField(idx, "github", e.target.value)} placeholder="https://github.com/…" />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => handleSave(idx)}
                disabled={savingId === (f.id ?? idx)}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-heading font-semibold text-black hover:bg-primary-light disabled:opacity-50"
              >
                {savingId === (f.id ?? idx) ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save
              </button>
              {savedId === (f.id ?? idx) && (
                <span className="inline-flex items-center gap-1.5 text-sm text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" /> Saved
                </span>
              )}
              <button
                onClick={() => handleDelete(idx)}
                className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="h-4 w-4" /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
