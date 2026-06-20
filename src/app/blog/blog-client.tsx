"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Calendar, Clock, ArrowRight } from "lucide-react";
import { type BlogPost } from "@/data/blog";

interface BlogClientProps {
  posts: BlogPost[];
}

export function BlogClient({ posts }: BlogClientProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<"All" | "Operations" | "Growth" | "Inventory">("All");

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="flex-1 bg-dark-bg text-white">
      {/* Banner/Header */}
      <section className="relative overflow-hidden pt-20 pb-16 text-center border-b border-zinc-900">
        <div className="absolute top-0 left-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 bg-primary/5 blur-3xl" />
        <div className="mx-auto max-w-7xl px-6">
          <span className="font-heading text-xs font-semibold tracking-widest text-primary uppercase">
            DIYNEZA JOURNAL
          </span>
          <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            Insights for smart restaurateurs.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">
            Operations guides, growth strategies, and recipe costing spreadsheets compiled by industry professionals.
          </p>

          {/* Filter & Search Bar */}
          <div className="mt-10 max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Category tabs */}
            <div className="flex space-x-1 bg-zinc-950 p-1 rounded-lg border border-zinc-900 text-xs w-full sm:w-auto overflow-x-auto">
              {["All", "Operations", "Growth", "Inventory"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat as any)}
                  className={`px-4 py-1.5 rounded-md font-semibold cursor-pointer whitespace-nowrap transition-colors ${
                    selectedCategory === cat ? "bg-primary text-black" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900/40 pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Post Cards Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => {
                return (
                  <article
                    key={post.slug}
                    className="group relative rounded-2xl border border-zinc-800/80 bg-zinc-900/10 hover:border-primary/20 hover:bg-zinc-900/20 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg"
                  >
                    {/* Image header */}
                    <div className="relative h-48 w-full overflow-hidden bg-zinc-900 border-b border-zinc-900">
                      <img
                        src={post.ogImage}
                        alt={post.title}
                        className="h-full w-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                      />
                      <span className="absolute top-4 left-4 rounded-md bg-zinc-950/80 border border-zinc-800 px-3 py-1 text-[10px] font-bold text-primary uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>

                    {/* Content block */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Publish details */}
                        <div className="flex items-center space-x-4 text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{post.publishDate}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{post.readingTime}</span>
                          </span>
                        </div>

                        <h3 className="mt-4 font-heading text-lg font-bold text-white leading-snug group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>

                        <p className="mt-2 text-xs text-zinc-400 leading-relaxed min-h-[48px]">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Link to Slug */}
                      <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between">
                        {/* Author profile */}
                        <div className="flex items-center space-x-2">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="h-6 w-6 rounded-full object-cover border border-zinc-800 grayscale group-hover:grayscale-0 transition-all duration-500"
                          />
                          <span className="text-[10px] text-zinc-400 font-bold">{post.author.name}</span>
                        </div>

                        <Link
                          href={`/blog/${post.slug}`}
                          className="flex items-center space-x-1.5 text-xs font-heading font-semibold text-zinc-500 group-hover:text-primary transition-colors focus:outline-none"
                        >
                          <span>Read Article</span>
                          <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-sm text-zinc-500 font-medium">No articles match your search criteria. Try a different category or search term.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
