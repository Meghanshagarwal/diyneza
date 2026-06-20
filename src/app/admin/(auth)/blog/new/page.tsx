"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [saving, setSaving] = React.useState(false);

  // Form states
  const [title, setTitle] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [excerpt, setExcerpt] = React.useState("");
  const [content, setContent] = React.useState("");
  const [category, setCategory] = React.useState("Operations");
  const [authorName, setAuthorName] = React.useState("Chef Marco Pierre");
  const [authorRole, setAuthorRole] = React.useState("Culinary Director");
  const [authorAvatar, setAuthorAvatar] = React.useState("https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=150&h=150");
  const [ogImage, setOgImage] = React.useState("https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200&h=630");
  const [published, setPublished] = React.useState(false);

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    // Replace spaces, non-alphanumeric, and multiple dashes
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    setSlug(generatedSlug);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !content) {
      alert("Please fill in the title, slug, and markdown content.");
      return;
    }

    setSaving(true);
    try {
      const supabase = createClient();
      
      const formattedDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      });

      const { error } = await supabase
        .from("blog_posts")
        .insert([
          {
            title,
            slug,
            excerpt,
            content,
            category,
            publish_date: formattedDate,
            author_name: authorName,
            author_role: authorRole,
            author_avatar: authorAvatar,
            og_image: ogImage,
            published
          }
        ]);

      if (error) throw error;

      router.push("/admin/blog");
      router.refresh();
    } catch (err: any) {
      console.error("Error creating blog post:", err);
      alert(err?.message || "Failed to save post. Verify slug is unique and try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back & Title */}
      <div className="flex flex-col gap-4 border-b border-zinc-900 pb-4">
        <Link
          href="/admin/blog"
          className="inline-flex items-center space-x-1.5 text-xs text-zinc-550 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Articles</span>
        </Link>
        <div>
          <h1 className="font-heading text-2xl font-bold text-zinc-100">
            Write New Journal Entry
          </h1>
          <p className="mt-1 text-xs text-zinc-550 font-semibold">
            Draft operations guides, restaurant workflows, or inventory checklists.
          </p>
        </div>
      </div>

      {/* Editor Form */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-5">
          {/* Title */}
          <div className="space-y-1.5">
            <label htmlFor="title" className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
              Article Title
            </label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={handleTitleChange}
              placeholder="e.g. 5 Strategies to Drastically Reduce Food Wastage"
              className="w-full rounded-lg border border-zinc-850 bg-zinc-900/20 px-4 py-3 text-sm text-white placeholder-zinc-650 focus:border-primary focus:outline-none"
            />
          </div>

          {/* Slug */}
          <div className="space-y-1.5">
            <label htmlFor="slug" className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
              URL Route Slug
            </label>
            <input
              id="slug"
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. reduce-food-wastage-restaurants"
              className="w-full rounded-lg border border-zinc-850 bg-zinc-900/20 px-4 py-3 text-xs text-zinc-400 font-mono focus:border-primary focus:outline-none"
            />
          </div>

          {/* Excerpt */}
          <div className="space-y-1.5">
            <label htmlFor="excerpt" className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
              Excerpt Summary
            </label>
            <textarea
              id="excerpt"
              rows={3}
              required
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Provide a brief 2-sentence summary of the post to show in previews..."
              className="w-full rounded-lg border border-zinc-850 bg-zinc-900/20 px-4 py-3 text-xs text-white placeholder-zinc-650 focus:border-primary focus:outline-none resize-none font-sans"
            />
          </div>

          {/* Markdown Content */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label htmlFor="content" className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                Markdown Article Body
              </label>
              <span className="text-[9px] text-zinc-550 font-bold flex items-center space-x-1">
                <Sparkles className="h-3 w-3 text-primary fill-primary" />
                <span>Simulates full Markdown structure</span>
              </span>
            </div>
            <textarea
              id="content"
              rows={16}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your article body here in Markdown format... Use ## for headers and - for bullet items."
              className="w-full rounded-lg border border-zinc-850 bg-zinc-900/20 px-4.5 py-4 text-xs text-zinc-300 placeholder-zinc-650 focus:border-primary focus:outline-none font-mono resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Sidebar settings */}
        <div className="space-y-6">
          {/* Metadata Block */}
          <div className="rounded-xl border border-zinc-900 bg-zinc-900/10 p-6 space-y-4">
            <h3 className="font-heading text-xs font-bold text-zinc-350 border-b border-zinc-900 pb-2">
              Metadata Settings
            </h3>

            {/* Category */}
            <div className="space-y-1.5">
              <label htmlFor="category" className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">
                Journal Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-zinc-850 bg-zinc-900/20 px-3 py-2 text-xs text-white focus:border-primary focus:outline-none"
              >
                <option value="Operations">Operations</option>
                <option value="Growth">Growth</option>
                <option value="Inventory">Inventory</option>
              </select>
            </div>

            {/* Author details */}
            <div className="space-y-3 pt-2">
              <div className="space-y-1.5">
                <label htmlFor="authorName" className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">
                  Author Name
                </label>
                <input
                  id="authorName"
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full rounded-lg border border-zinc-850 bg-zinc-900/20 px-3 py-2 text-xs text-white focus:border-primary focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="authorRole" className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">
                  Author Title
                </label>
                <input
                  id="authorRole"
                  type="text"
                  required
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  className="w-full rounded-lg border border-zinc-850 bg-zinc-900/20 px-3 py-2 text-xs text-white focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Published checkbox */}
            <div className="pt-2">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="rounded border-zinc-800 bg-zinc-900 text-primary focus:ring-primary h-4 w-4"
                />
                <span className="text-xs text-zinc-300 font-semibold group-hover:text-white transition-colors select-none">
                  Publish Immediately
                </span>
              </label>
            </div>
          </div>

          {/* Images Block */}
          <div className="rounded-xl border border-zinc-900 bg-zinc-900/10 p-6 space-y-4">
            <h3 className="font-heading text-xs font-bold text-zinc-350 border-b border-zinc-900 pb-2">
              Images Configuration
            </h3>

            {/* Banner/OG Image */}
            <div className="space-y-1.5">
              <label htmlFor="ogImage" className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">
                Article Cover Image URL
              </label>
              <input
                id="ogImage"
                type="text"
                required
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                className="w-full rounded-lg border border-zinc-850 bg-zinc-900/20 px-3 py-2 text-xs text-white focus:border-primary focus:outline-none font-mono"
              />
            </div>

            {/* Author Avatar */}
            <div className="space-y-1.5">
              <label htmlFor="authorAvatar" className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">
                Author Avatar URL
              </label>
              <input
                id="authorAvatar"
                type="text"
                required
                value={authorAvatar}
                onChange={(e) => setAuthorAvatar(e.target.value)}
                className="w-full rounded-lg border border-zinc-850 bg-zinc-900/20 px-3 py-2 text-xs text-white focus:border-primary focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex gap-3">
            <Link
              href="/admin/blog"
              className="flex-1 rounded-lg border border-zinc-800 py-3 text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900 text-center transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center space-x-2 rounded-lg bg-primary py-3 text-xs font-bold text-black hover:bg-primary-light disabled:opacity-50 cursor-pointer"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-black" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 text-black" />
                  <span>Save Article</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
