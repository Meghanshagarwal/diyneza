import type { MetadataRoute } from "next";
import { createClient } from "@/utils/supabase/server";
import { siteConfig } from "@/lib/seo";

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
  ];

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

  return [...staticRoutes, ...blogRoutes];
}
