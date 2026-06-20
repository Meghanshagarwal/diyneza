"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { 
  MessageSquare, 
  Plus, 
  Trash2, 
  Edit2, 
  Loader2, 
  X, 
  Save, 
  Star,
  Quote
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  restaurant: string;
  quote: string;
  avatar: string;
  metric: string;
}

interface TestimonialsClientProps {
  initialTestimonials: Testimonial[];
}

export function TestimonialsClient({ initialTestimonials }: TestimonialsClientProps) {
  const router = useRouter();
  const [testimonials, setTestimonials] = React.useState<Testimonial[]>(initialTestimonials);
  const [editingTestimonial, setEditingTestimonial] = React.useState<Testimonial | null>(null);
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  // Form states
  const [name, setName] = React.useState("");
  const [role, setRole] = React.useState("");
  const [restaurant, setRestaurant] = React.useState("");
  const [quote, setQuote] = React.useState("");
  const [avatar, setAvatar] = React.useState("https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=150&h=150");
  const [metric, setMetric] = React.useState("");

  React.useEffect(() => {
    setTestimonials(initialTestimonials);
  }, [initialTestimonials]);

  const handleOpenEdit = (t: Testimonial) => {
    setEditingTestimonial(t);
    setName(t.name);
    setRole(t.role);
    setRestaurant(t.restaurant);
    setQuote(t.quote);
    setAvatar(t.avatar);
    setMetric(t.metric);
  };

  const handleOpenCreate = () => {
    setEditingTestimonial(null);
    setName("");
    setRole("");
    setRestaurant("");
    setQuote("");
    setAvatar("https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=150&h=150");
    setMetric("");
    setIsCreateOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role || !restaurant || !quote || !metric) {
      alert("Please fill in all required fields.");
      return;
    }

    setSaving(true);
    try {
      const supabase = createClient();

      if (editingTestimonial) {
        // Update
        const { error } = await supabase
          .from("testimonials")
          .update({
            name,
            role,
            restaurant,
            quote,
            avatar,
            metric
          })
          .eq("id", editingTestimonial.id);

        if (error) throw error;

        setTestimonials((prev) =>
          prev.map((t) =>
            t.id === editingTestimonial.id
              ? { ...t, name, role, restaurant, quote, avatar, metric }
              : t
          )
        );
        setEditingTestimonial(null);
      } else {
        // Create
        const { data, error } = await supabase
          .from("testimonials")
          .insert([
            {
              name,
              role,
              restaurant,
              quote,
              avatar,
              metric
            }
          ])
          .select()
          .single();

        if (error) throw error;

        if (data) {
          setTestimonials((prev) => [...prev, data]);
        }
        setIsCreateOpen(false);
      }

      router.refresh();
    } catch (err) {
      console.error("Error saving testimonial:", err);
      alert("Failed to save testimonial. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const supabase = createClient();
      const { error } = await supabase.from("testimonials").delete().eq("id", id);

      if (error) throw error;

      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      router.refresh();
    } catch (err) {
      console.error("Error deleting testimonial:", err);
      alert("Failed to delete testimonial. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-900 pb-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-zinc-100">
            Testimonials CMS
          </h1>
          <p className="mt-1 text-xs text-zinc-550 font-semibold">
            Manage owner quotes, client reviews, and success metrics shown on the homepage.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-black hover:bg-primary-light transition-all flex items-center space-x-1.5 shrink-0 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.length > 0 ? (
          testimonials.map((t) => (
            <div
              key={t.id}
              className="rounded-xl border border-zinc-900 bg-zinc-950/20 p-6 flex flex-col justify-between hover:border-zinc-800 transition-colors"
            >
              <div>
                {/* Rating & Metric badge */}
                <div className="flex justify-between items-center border-b border-zinc-900 pb-3 mb-4">
                  <div className="flex space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="rounded bg-success-custom/10 border border-success-custom/20 px-2 py-0.5 text-[9px] text-success-custom font-bold">
                    {t.metric}
                  </span>
                </div>

                {/* Quote */}
                <blockquote className="text-xs text-zinc-400 leading-relaxed font-sans italic relative">
                  <Quote className="h-6 w-6 text-zinc-850 absolute -top-3.5 -left-3 -z-10 opacity-40 rotate-180" />
                  "{t.quote}"
                </blockquote>
              </div>

              {/* Profile card details */}
              <div className="mt-6 pt-4 border-t border-zinc-900 flex justify-between items-center">
                <div className="flex items-center space-x-3 pr-3 min-w-0">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-8 w-8 rounded-full object-cover border border-zinc-800"
                  />
                  <div className="min-w-0">
                    <cite className="font-heading text-xs font-bold text-zinc-350 not-italic block truncate">
                      {t.name}
                    </cite>
                    <span className="text-[9px] text-zinc-550 block mt-0.5 truncate">
                      {t.role}, <span className="font-semibold text-zinc-400">{t.restaurant}</span>
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex space-x-1 shrink-0">
                  <button
                    onClick={() => handleOpenEdit(t)}
                    className="rounded border border-zinc-850 bg-zinc-900 p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer"
                    title="Edit Review"
                  >
                    <Edit2 className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="rounded border border-zinc-855 bg-zinc-900 p-1.5 text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-all cursor-pointer"
                    title="Delete Review"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="md:col-span-3 text-center py-20 text-zinc-500 text-xs font-semibold">
            No testimonials added yet. Click the button to add one.
          </div>
        )}
      </div>

      {/* Create / Edit Drawer Modal */}
      {(isCreateOpen || editingTestimonial) && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            onClick={() => {
              setIsCreateOpen(false);
              setEditingTestimonial(null);
            }}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          {/* Panel */}
          <form
            onSubmit={handleSave}
            className="relative w-full max-w-md bg-zinc-950 border-l border-zinc-900 h-full flex flex-col justify-between p-8 z-10 shadow-2xl overflow-y-auto"
          >
            <div>
              {/* Header */}
              <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
                <h3 className="font-heading text-base font-bold text-zinc-200">
                  {editingTestimonial ? "Edit Testimonial" : "Create Testimonial"}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateOpen(false);
                    setEditingTestimonial(null);
                  }}
                  className="text-zinc-500 hover:text-white rounded p-1 hover:bg-zinc-900"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form details */}
              <div className="mt-6 space-y-4">
                {/* Author Name */}
                <div className="space-y-1.5">
                  <label htmlFor="test-name" className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Author Name
                  </label>
                  <input
                    id="test-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Chef Marco Pierre"
                    className="w-full rounded-lg border border-zinc-850 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:border-primary focus:outline-none"
                  />
                </div>

                {/* Role / Job Title */}
                <div className="space-y-1.5">
                  <label htmlFor="test-role" className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Role / Job Title
                  </label>
                  <input
                    id="test-role"
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Owner & Founder"
                    className="w-full rounded-lg border border-zinc-850 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:border-primary focus:outline-none"
                  />
                </div>

                {/* Restaurant Name */}
                <div className="space-y-1.5">
                  <label htmlFor="test-rest" className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Restaurant Name
                  </label>
                  <input
                    id="test-rest"
                    type="text"
                    required
                    value={restaurant}
                    onChange={(e) => setRestaurant(e.target.value)}
                    placeholder="e.g. Bistro Central"
                    className="w-full rounded-lg border border-zinc-850 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:border-primary focus:outline-none"
                  />
                </div>

                {/* Growth Metric Badge */}
                <div className="space-y-1.5">
                  <label htmlFor="test-metric" className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Impact Metric
                  </label>
                  <input
                    id="test-metric"
                    type="text"
                    required
                    value={metric}
                    onChange={(e) => setMetric(e.target.value)}
                    placeholder="e.g. +8% Food Margin or -12% Waste"
                    className="w-full rounded-lg border border-zinc-850 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:border-primary focus:outline-none"
                  />
                </div>

                {/* Quote Text */}
                <div className="space-y-1.5">
                  <label htmlFor="test-quote" className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Client Review Quote
                  </label>
                  <textarea
                    id="test-quote"
                    rows={4}
                    required
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    placeholder="Type the customer quote here..."
                    className="w-full rounded-lg border border-zinc-850 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:border-primary focus:outline-none resize-none font-sans"
                  />
                </div>

                {/* Avatar Image URL */}
                <div className="space-y-1.5">
                  <label htmlFor="test-avatar" className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Avatar Image URL
                  </label>
                  <input
                    id="test-avatar"
                    type="text"
                    required
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    className="w-full rounded-lg border border-zinc-850 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:border-primary focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="border-t border-zinc-900 pt-6 mt-8 flex space-x-3">
              <button
                type="button"
                onClick={() => {
                  setIsCreateOpen(false);
                  setEditingTestimonial(null);
                }}
                disabled={saving}
                className="flex-1 rounded-lg border border-zinc-800 py-2.5 text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900 disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 flex items-center justify-center space-x-2 rounded-lg bg-primary py-2.5 text-xs font-bold text-black hover:bg-primary-light disabled:opacity-50 cursor-pointer"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-black" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 text-black" />
                    <span>Save Testimonial</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
