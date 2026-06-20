import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/homepage/navbar";
import { Footer } from "@/components/homepage/footer";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { type BlogPost } from "@/data/blog";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 0;

async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) {
    return null;
  }

  const words = data.content ? data.content.split(/\s+/).length : 0;
  const readingTimeVal = Math.max(1, Math.ceil(words / 200));

  return {
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    category: data.category,
    publishDate: data.publish_date,
    author: {
      name: data.author_name,
      role: data.author_role,
      avatar: data.author_avatar,
    },
    content: data.content,
    readingTime: `${readingTimeVal} min read`,
    ogImage: data.og_image,
  };
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | DIYNEZA Journal",
    };
  }

  return {
    title: `${post.title} | DIYNEZA Journal`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: RouteParams) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Inject BlogPosting JSON-LD Schema
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.ogImage,
    "datePublished": post.publishDate,
    "author": {
      "@type": "Person",
      "name": post.author.name,
    },
    "description": post.excerpt,
  };

  return (
    <>
      <Navbar />

      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <main className="flex-1 bg-dark-bg text-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-zinc-500 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Journal</span>
          </Link>

          {/* Category */}
          <span className="rounded bg-primary/10 border border-primary/20 px-3 py-1 text-[10px] font-bold text-primary uppercase tracking-wider">
            {post.category}
          </span>

          <h1 className="mt-6 font-heading text-3xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight">
            {post.title}
          </h1>

          {/* Publish Details */}
          <div className="mt-6 flex flex-wrap gap-4 items-center text-xs text-zinc-500 font-semibold uppercase tracking-wider border-y border-zinc-900 py-4">
            {/* Author */}
            <div className="flex items-center space-x-2">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="h-6 w-6 rounded-full object-cover border border-zinc-800"
              />
              <span className="text-zinc-300 font-bold">{post.author.name}</span>
              <span className="text-[10px] text-zinc-650">({post.author.role})</span>
            </div>
            <span className="text-zinc-800">•</span>
            {/* Date */}
            <span className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{post.publishDate}</span>
            </span>
            <span className="text-zinc-800">•</span>
            {/* Reading time */}
            <span className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime}</span>
            </span>
          </div>

          {/* Article Banner Image */}
          <div className="mt-8 rounded-2xl overflow-hidden h-[340px] bg-zinc-900 border border-zinc-900 shadow-lg">
            <img src={post.ogImage} alt={post.title} className="h-full w-full object-cover" />
          </div>

          {/* Post Content */}
          <div className="mt-12 text-sm text-zinc-300 leading-relaxed font-sans space-y-6">
            {post.content
              .split("\n\n")
              .filter((block) => block.trim() !== "")
              .map((block, bIdx) => {
                const trimmed = block.trim();
                if (trimmed.startsWith("# ")) {
                  return null; // Skip title as it is already rendered in h1
                }
                if (trimmed.startsWith("## ")) {
                  return (
                    <h2 key={bIdx} className="font-heading text-xl font-bold text-white pt-6">
                      {trimmed.replace("## ", "")}
                    </h2>
                  );
                }
                if (trimmed.startsWith("- ")) {
                  return (
                    <ul key={bIdx} className="list-disc pl-5 space-y-2 text-zinc-400">
                      {trimmed
                        .split("\n")
                        .map((li, lIdx) => (
                          <li key={lIdx}>{li.replace("- ", "").trim()}</li>
                        ))}
                    </ul>
                  );
                }
                return <p key={bIdx}>{trimmed}</p>;
              })}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
