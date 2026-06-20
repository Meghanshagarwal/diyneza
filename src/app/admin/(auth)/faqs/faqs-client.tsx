"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { 
  HelpCircle, 
  Plus, 
  Trash2, 
  Edit2, 
  ArrowUp, 
  ArrowDown, 
  Loader2, 
  X, 
  Save 
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  display_order: number;
}

interface FAQsClientProps {
  initialFaqs: FAQ[];
}

export function FAQsClient({ initialFaqs }: FAQsClientProps) {
  const router = useRouter();
  const [faqs, setFaqs] = React.useState<FAQ[]>(initialFaqs);
  const [editingFaq, setEditingFaq] = React.useState<FAQ | null>(null);
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  // Form states
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [displayOrder, setDisplayOrder] = React.useState(0);

  React.useEffect(() => {
    setFaqs(initialFaqs);
  }, [initialFaqs]);

  const handleOpenEdit = (faq: FAQ) => {
    setEditingFaq(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setDisplayOrder(faq.display_order);
  };

  const handleOpenCreate = () => {
    setEditingFaq(null);
    setQuestion("");
    setAnswer("");
    // Default order is last
    const lastOrder = faqs.length > 0 ? Math.max(...faqs.map((f) => f.display_order)) + 1 : 0;
    setDisplayOrder(lastOrder);
    setIsCreateOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !answer) {
      alert("Please fill in both question and answer.");
      return;
    }

    setSaving(true);
    try {
      const supabase = createClient();

      if (editingFaq) {
        // Update
        const { error } = await supabase
          .from("faqs")
          .update({
            question,
            answer,
            display_order: displayOrder
          })
          .eq("id", editingFaq.id);

        if (error) throw error;

        setFaqs((prev) =>
          prev
            .map((f) =>
              f.id === editingFaq.id
                ? { ...f, question, answer, display_order: displayOrder }
                : f
            )
            .sort((a, b) => a.display_order - b.display_order)
        );
        setEditingFaq(null);
      } else {
        // Create
        const { data, error } = await supabase
          .from("faqs")
          .insert([
            {
              question,
              answer,
              display_order: displayOrder
            }
          ])
          .select()
          .single();

        if (error) throw error;

        if (data) {
          setFaqs((prev) => [...prev, data].sort((a, b) => a.display_order - b.display_order));
        }
        setIsCreateOpen(false);
      }

      router.refresh();
    } catch (err) {
      console.error("Error saving FAQ:", err);
      alert("Failed to save FAQ. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;

    try {
      const supabase = createClient();
      const { error } = await supabase.from("faqs").delete().eq("id", id);

      if (error) throw error;

      setFaqs((prev) => prev.filter((f) => f.id !== id));
      router.refresh();
    } catch (err) {
      console.error("Error deleting FAQ:", err);
      alert("Failed to delete FAQ. Please try again.");
    }
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    const nextIndex = direction === "up" ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= faqs.length) return;

    const list = [...faqs];
    const currentItem = list[index];
    const nextItem = list[nextIndex];

    // Swap order values
    const tempOrder = currentItem.display_order;
    currentItem.display_order = nextItem.display_order;
    nextItem.display_order = tempOrder;

    setFaqs(list.sort((a, b) => a.display_order - b.display_order));

    try {
      const supabase = createClient();
      await Promise.all([
        supabase.from("faqs").update({ display_order: currentItem.display_order }).eq("id", currentItem.id),
        supabase.from("faqs").update({ display_order: nextItem.display_order }).eq("id", nextItem.id)
      ]);
      router.refresh();
    } catch (err) {
      console.error("Error swapping FAQ order:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-900 pb-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-zinc-100">
            FAQs Accordions CMS
          </h1>
          <p className="mt-1 text-xs text-zinc-550 font-semibold">
            Manage FAQs on the website and adjust display ordering.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-black hover:bg-primary-light transition-all flex items-center space-x-1.5 shrink-0 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add FAQ Item</span>
        </button>
      </div>

      {/* FAQ items list */}
      <div className="space-y-4">
        {faqs.length > 0 ? (
          faqs.map((faq, idx) => (
            <div
              key={faq.id}
              className="rounded-xl border border-zinc-900 bg-zinc-950/20 p-5 flex items-start justify-between gap-6 hover:border-zinc-800 transition-colors"
            >
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center space-x-2 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                  <HelpCircle className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>Order: {faq.display_order}</span>
                </div>
                <h3 className="font-heading text-sm font-bold text-zinc-200 leading-snug">
                  {faq.question}
                </h3>
                <p className="text-xs text-zinc-450 leading-relaxed font-sans">
                  {faq.answer}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-1.5 shrink-0">
                {/* Reordering */}
                <div className="flex sm:flex-col gap-1 border-r sm:border-r-0 sm:border-b border-zinc-900 pr-1.5 sm:pr-0 sm:pb-1.5 mr-1.5 sm:mr-0 sm:mb-1.5">
                  <button
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, "up")}
                    className="p-1 text-zinc-650 hover:text-white disabled:opacity-30 cursor-pointer"
                    title="Move Up"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    disabled={idx === faqs.length - 1}
                    onClick={() => handleMove(idx, "down")}
                    className="p-1 text-zinc-650 hover:text-white disabled:opacity-30 cursor-pointer"
                    title="Move Down"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => handleOpenEdit(faq)}
                  className="rounded border border-zinc-850 bg-zinc-900 p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer"
                  title="Edit FAQ"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(faq.id)}
                  className="rounded border border-zinc-850 bg-zinc-900 p-1.5 text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-all cursor-pointer"
                  title="Delete FAQ"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-zinc-500 text-xs font-semibold">
            No FAQ entries registered. Click the button to add one.
          </div>
        )}
      </div>

      {/* Create / Edit Drawer Modal */}
      {(isCreateOpen || editingFaq) && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            onClick={() => {
              setIsCreateOpen(false);
              setEditingFaq(null);
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
                  {editingFaq ? "Edit FAQ Item" : "Create FAQ Item"}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateOpen(false);
                    setEditingFaq(null);
                  }}
                  className="text-zinc-500 hover:text-white rounded p-1 hover:bg-zinc-900"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form details */}
              <div className="mt-6 space-y-4">
                {/* Question */}
                <div className="space-y-1.5">
                  <label htmlFor="faq-question" className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Question Text
                  </label>
                  <input
                    id="faq-question"
                    type="text"
                    required
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="e.g. Does DIYNEZA support offline mode?"
                    className="w-full rounded-lg border border-zinc-850 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:border-primary focus:outline-none"
                  />
                </div>

                {/* Answer */}
                <div className="space-y-1.5">
                  <label htmlFor="faq-answer" className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Detailed Answer Text
                  </label>
                  <textarea
                    id="faq-answer"
                    rows={6}
                    required
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type details that clarify billing, offline features, custom SLAs, or inventory..."
                    className="w-full rounded-lg border border-zinc-850 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:border-primary focus:outline-none resize-none font-sans"
                  />
                </div>

                {/* Display Order */}
                <div className="space-y-1.5">
                  <label htmlFor="faq-order" className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Display Sorting Order
                  </label>
                  <input
                    id="faq-order"
                    type="number"
                    required
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(Number(e.target.value))}
                    className="w-full rounded-lg border border-zinc-855 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:border-primary focus:outline-none"
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
                  setEditingFaq(null);
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
                    <span>Save FAQ</span>
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
