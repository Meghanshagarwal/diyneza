"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  FileText, 
  Plus, 
  Search, 
  Calendar, 
  Eye, 
  EyeOff, 
  Edit2, 
  Trash2, 
  CheckCircle, 
  Loader2 
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publish_date: string;
  published: boolean;
  author_name: string;
  og_image: string;
}

interface BlogCMSClientProps {
  initialPosts: BlogPost[];
}

export function BlogCMSClient({ initialPosts }: BlogCMSClientProps) {
  const router = useRouter();
  const [posts, setPosts] = React.useState<BlogPost[]>(initialPosts);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [loadingId, setLoadingId] = React.useState<string | null>(null);

  React.useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTogglePublish = async (post: BlogPost) => {
    setLoadingId(post.id);
    try {
      const supabase = createClient();
      const nextStatus = !post.published;
      const { error } = await supabase
        .from("blog_posts")
        .update({ published: nextStatus })
        .eq("id", post.id);

      if (error) throw error;

      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? { ...p, published: nextStatus } : p))
      );
      router.refresh();
    } catch (err) {
      console.error("Error toggling publish status:", err);
      alert("Failed to update status. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) return;

    try {
      const supabase = createClient();
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);

      if (error) throw error;

      setPosts((prev) => prev.filter((p) => p.id !== id));
      router.refresh();
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-900 pb-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-zinc-100">
            Journal Articles CMS
          </h1>
          <p className="mt-1 text-xs text-zinc-550 font-semibold">
            Draft, publish, edit, or remove resources and articles on the DIYNEZA blog.
          </p>
        </div>

        <Link
          href="/admin/blog/new"
          className="rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-black hover:bg-primary-light transition-all flex items-center space-x-1.5 shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Write Article</span>
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="flex justify-end gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-550" />
          <input
            type="text"
            placeholder="Search articles by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-zinc-850 bg-zinc-900/40 pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Articles Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <article
              key={post.id}
              className="rounded-xl border border-zinc-900 bg-zinc-950/20 overflow-hidden flex flex-col justify-between"
            >
              {/* Cover Image & Category */}
              <div className="relative h-40 bg-zinc-900 border-b border-zinc-900">
                <img
                  src={post.og_image}
                  alt={post.title}
                  className="h-full w-full object-cover opacity-75"
                />
                <span className="absolute top-3 left-3 rounded bg-zinc-950/80 border border-zinc-850 px-2.5 py-0.5 text-[9px] font-bold text-primary uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Publish details */}
                  <div className="flex items-center space-x-2 text-[9px] text-zinc-550 font-bold uppercase tracking-wider">
                    <Calendar className="h-3 w-3" />
                    <span>{post.publish_date}</span>
                    <span>•</span>
                    <span>By {post.author_name}</span>
                  </div>

                  <h3 className="mt-3 font-heading text-sm font-bold text-zinc-200 leading-snug line-clamp-2 min-h-[40px]">
                    {post.title}
                  </h3>

                  <p className="mt-2 text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Actions & Status */}
                <div className="mt-5 pt-4 border-t border-zinc-900 flex justify-between items-center">
                  {/* Status Toggle */}
                  <button
                    onClick={() => handleTogglePublish(post)}
                    disabled={loadingId === post.id}
                    className={`flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-wider border rounded px-2.5 py-1 transition-colors cursor-pointer ${
                      post.published
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
                        : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:bg-zinc-850 hover:text-zinc-300"
                    }`}
                  >
                    {loadingId === post.id ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : post.published ? (
                      <Eye className="h-3 w-3" />
                    ) : (
                      <EyeOff className="h-3 w-3" />
                    )}
                    <span>{post.published ? "Published" : "Draft"}</span>
                  </button>

                  {/* Actions buttons */}
                  <div className="flex space-x-1">
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="rounded border border-zinc-850 bg-zinc-900 p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                      title="Edit article"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </Link>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="rounded border border-zinc-850 bg-zinc-900 p-1.5 text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-colors cursor-pointer"
                      title="Delete article"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="md:col-span-3 text-center py-20 text-zinc-500 font-medium">
            No articles found. Write your first article today!
          </div>
        )}
      </div>
    </div>
  );
}
