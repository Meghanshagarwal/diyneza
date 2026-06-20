import type { MetadataRoute } from "next";
import { createClient } from "@/utils/supabase/server";
import { siteConfig } from "@/lib/seo";
import { competitors } from "@/data/competitors";
import { cities } from "@/data/cities";
import { solutionsData } from "@/data/solutions";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Static, publicly indexable routes.
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/alternatives`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/restaurant-pos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sitemap-page`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.3,
    },
  ];

  // Solution detail + city pages (SEO landing pages).
  const solutionRoutes: MetadataRoute.Sitemap = solutionsData.map((s) => ({
    url: `${baseUrl}/solutions/${s.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  const cityRoutes: MetadataRoute.Sitemap = cities.map((c) => ({
    url: `${baseUrl}/restaurant-pos/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Competitor "alternative" comparison pages (high-intent SEO).
  const alternativeRoutes: MetadataRoute.Sitemap = competitors.map((c) => ({
    url: `${baseUrl}/alternatives/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic blog posts pulled from Supabase. Fail soft so the sitemap still
  // builds with the static routes if the database is unreachable.
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("slug, updated_at, created_at, publish_date")
      .eq("published", true)
      .order("created_at", { ascending: false });

    blogRoutes = (data || []).map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(
        post.updated_at || post.publish_date || post.created_at || Date.now()
      ),
      changeFrequency: "weekly",
      priority: 0.6,
    }));
  } catch {
    // Ignore — static routes are still emitted.
  }

  return [
    ...staticRoutes,
    ...alternativeRoutes,
    ...solutionRoutes,
    ...cityRoutes,
    ...blogRoutes,
  ];
}
