"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { 
  Tag, 
  X, 
  Check, 
  Plus, 
  Trash2, 
  Loader2, 
  Eye, 
  EyeOff, 
  Award 
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface PricingPlan {
  id: string;
  name: string;
  price_monthly: number;
  price_annual: number;
  description: string;
  features: string[];
  popular: boolean;
  visible: boolean;
  cta_text: string;
}

interface PricingClientProps {
  initialPlans: PricingPlan[];
}

export function PricingClient({ initialPlans }: PricingClientProps) {
  const router = useRouter();
  const [plans, setPlans] = React.useState<PricingPlan[]>(initialPlans);
  const [editingPlan, setEditingPlan] = React.useState<PricingPlan | null>(null);
  
  // Edit form states
  const [editPriceMonthly, setEditPriceMonthly] = React.useState(0);
  const [editPriceAnnual, setEditPriceAnnual] = React.useState(0);
  const [editDescription, setEditDescription] = React.useState("");
  const [editFeatures, setEditFeatures] = React.useState<string[]>([]);
  const [newFeatureText, setNewFeatureText] = React.useState("");
  const [editPopular, setEditPopular] = React.useState(false);
  const [editVisible, setEditVisible] = React.useState(true);
  const [editCtaText, setEditCtaText] = React.useState("Start Free Trial");
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    setPlans(initialPlans);
  }, [initialPlans]);

  const handleOpenEdit = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setEditPriceMonthly(plan.price_monthly);
    setEditPriceAnnual(plan.price_annual);
    setEditDescription(plan.description);
    setEditFeatures([...plan.features]);
    setEditPopular(plan.popular);
    setEditVisible(plan.visible);
    setEditCtaText(plan.cta_text);
    setNewFeatureText("");
  };

  const handleAddFeature = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeatureText.trim()) return;
    setEditFeatures((prev) => [...prev, newFeatureText.trim()]);
    setNewFeatureText("");
  };

  const handleRemoveFeature = (idx: number) => {
    setEditFeatures((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    if (!editingPlan) return;

    setSaving(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("pricing_plans")
        .update({
          price_monthly: editPriceMonthly,
          price_annual: editPriceAnnual,
          description: editDescription,
          features: editFeatures,
          popular: editPopular,
          visible: editVisible,
          cta_text: editCtaText
        })
        .eq("id", editingPlan.id);

      if (error) throw error;

      // Update local state
      setPlans((prev) =>
        prev.map((p) =>
          p.id === editingPlan.id
            ? {
                ...p,
                price_monthly: editPriceMonthly,
                price_annual: editPriceAnnual,
                description: editDescription,
                features: editFeatures,
                popular: editPopular,
                visible: editVisible,
                cta_text: editCtaText
              }
            : p
        )
      );

      setEditingPlan(null);
      router.refresh();
    } catch (err) {
      console.error("Error updating plan:", err);
      alert("Failed to update pricing plan. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-zinc-900 pb-4">
        <h1 className="font-heading text-2xl font-bold text-zinc-100">
          Pricing Plans CMS
        </h1>
        <p className="mt-1 text-xs text-zinc-550 font-semibold">
          Update the subscription charges, features, popularity and visibility on your website.
        </p>
      </div>

      {/* Plans List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-xl border p-6 flex flex-col justify-between transition-all bg-zinc-900/10 ${
              plan.popular
                ? "border-primary"
                : "border-zinc-900"
            }`}
          >
            <div>
              {/* Header metrics */}
              <div className="flex justify-between items-start">
                <h3 className="font-heading text-base font-bold text-zinc-200">
                  {plan.name}
                </h3>
                <div className="flex items-center space-x-1">
                  {!plan.visible && (
                    <span className="rounded bg-zinc-800 border border-zinc-700 p-1 text-zinc-500" title="Hidden from public">
                      <EyeOff className="h-3.5 w-3.5" />
                    </span>
                  )}
                  {plan.popular && (
                    <span className="rounded bg-primary/10 border border-primary/20 p-1 text-primary" title="Featured Popular badge">
                      <Award className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>
              </div>

              <p className="mt-2 text-xs text-zinc-500 min-h-[40px] leading-relaxed">
                {plan.description}
              </p>

              {/* Price Details */}
              <div className="mt-4 pt-4 border-t border-zinc-900 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500">Monthly Billing:</span>
                  <span className="font-bold text-zinc-200">
                    {plan.name.toLowerCase() === "enterprise" ? "Custom" : `$${plan.price_monthly}/mo`}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500">Annual Billing:</span>
                  <span className="font-bold text-zinc-200">
                    {plan.name.toLowerCase() === "enterprise" ? "Custom" : `$${plan.price_annual}/mo`}
                  </span>
                </div>
              </div>

              {/* Features List preview */}
              <div className="mt-5 space-y-2">
                <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider block">Features ({plan.features.length})</span>
                <ul className="text-[10px] text-zinc-400 space-y-1 pl-1">
                  {plan.features.slice(0, 4).map((f, idx) => (
                    <li key={idx} className="flex items-center space-x-1.5 truncate">
                      <Check className="h-3 w-3 text-primary shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                  {plan.features.length > 4 && (
                    <li className="text-[9px] text-zinc-600 italic font-semibold">
                      + {plan.features.length - 4} more features
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => handleOpenEdit(plan)}
              className="mt-6 w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2 text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer text-center"
            >
              Configure Plan
            </button>
          </div>
        ))}
      </div>

      {/* Edit Drawer Modal */}
      {editingPlan && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            onClick={() => setEditingPlan(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          {/* Panel */}
          <div className="relative w-full max-w-md bg-zinc-950 border-l border-zinc-900 h-full flex flex-col justify-between p-8 z-10 shadow-2xl overflow-y-auto">
            <div>
              {/* Header */}
              <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
                <h3 className="font-heading text-base font-bold text-zinc-200">
                  Configure Plan: {editingPlan.name}
                </h3>
                <button
                  onClick={() => setEditingPlan(null)}
                  className="text-zinc-500 hover:text-white rounded p-1 hover:bg-zinc-900"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form fields */}
              <div className="mt-6 space-y-5">
                {editingPlan.name.toLowerCase() !== "enterprise" && (
                  <div className="grid grid-cols-2 gap-4">
                    {/* Monthly Price */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                        Monthly Price ($)
                      </label>
                      <input
                        type="number"
                        value={editPriceMonthly}
                        onChange={(e) => setEditPriceMonthly(Number(e.target.value))}
                        className="w-full rounded-lg border border-zinc-850 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:border-primary focus:outline-none"
                      />
                    </div>
                    {/* Annual Price */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                        Annual Price ($/mo)
                      </label>
                      <input
                        type="number"
                        value={editPriceAnnual}
                        onChange={(e) => setEditPriceAnnual(Number(e.target.value))}
                        className="w-full rounded-lg border border-zinc-850 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full rounded-lg border border-zinc-850 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:border-primary focus:outline-none resize-none font-sans"
                  />
                </div>

                {/* CTA Button Text */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={editCtaText}
                    onChange={(e) => setEditCtaText(e.target.value)}
                    className="w-full rounded-lg border border-zinc-850 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:border-primary focus:outline-none"
                  />
                </div>

                {/* Toggles */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={editPopular}
                      onChange={(e) => setEditPopular(e.target.checked)}
                      className="rounded border-zinc-800 bg-zinc-900 text-primary focus:ring-primary h-4 w-4"
                    />
                    <span className="text-xs text-zinc-300 font-semibold select-none group-hover:text-white transition-colors">
                      Mark as Popular
                    </span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={editVisible}
                      onChange={(e) => setEditVisible(e.target.checked)}
                      className="rounded border-zinc-800 bg-zinc-900 text-primary focus:ring-primary h-4 w-4"
                    />
                    <span className="text-xs text-zinc-300 font-semibold select-none group-hover:text-white transition-colors">
                      Show in Pricing
                    </span>
                  </label>
                </div>

                {/* Features List Creator */}
                <div className="space-y-3 pt-4 border-t border-zinc-900">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Features Included
                  </label>

                  {/* Add feature input */}
                  <form onSubmit={handleAddFeature} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a new feature..."
                      value={newFeatureText}
                      onChange={(e) => setNewFeatureText(e.target.value)}
                      className="flex-1 rounded-lg border border-zinc-850 bg-zinc-900 px-3 py-2 text-xs text-white focus:border-primary focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="rounded-lg bg-zinc-850 p-2 text-primary hover:bg-zinc-800 hover:text-white cursor-pointer"
                    >
                      <Plus className="h-4.5 w-4.5" />
                    </button>
                  </form>

                  {/* Features list */}
                  <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                    {editFeatures.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center p-2 border border-zinc-900 bg-zinc-950 rounded-lg text-xs"
                      >
                        <span className="text-zinc-350 pr-4 break-words flex-1 leading-relaxed">
                          {feat}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(idx)}
                          className="text-zinc-600 hover:text-red-400 p-1 rounded"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                    {editFeatures.length === 0 && (
                      <span className="text-[10px] text-zinc-600 italic block py-4 text-center">
                        No features added yet.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="border-t border-zinc-900 pt-6 mt-8 flex space-x-3">
              <button
                onClick={() => setEditingPlan(null)}
                disabled={saving}
                className="flex-1 rounded-lg border border-zinc-800 py-2.5 text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900 disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 flex items-center justify-center space-x-2 rounded-lg bg-primary py-2.5 text-xs font-bold text-black hover:bg-primary-light disabled:opacity-50 cursor-pointer"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-black" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save Plan</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
