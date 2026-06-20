import type { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { Navbar } from "@/components/homepage/navbar";
import { Footer } from "@/components/homepage/footer";
import { BlogClient } from "./blog-client";
import { type BlogPost } from "@/data/blog";
import { siteConfig } from "@/lib/seo";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Journal — Restaurant Operations & Growth Insights",
  description:
    "Practical guides on restaurant operations, inventory control, food cost, QR ordering, and growth — from the DIYNEZA team.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "DIYNEZA Journal — Restaurant Operations & Growth Insights",
    description:
      "Practical guides on restaurant operations, inventory control, food cost, QR ordering, and growth.",
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DIYNEZA Journal",
    description:
      "Practical guides on restaurant operations, inventory, and growth.",
  },
};

export default async function BlogPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  let posts: BlogPost[] = [];

  if (data && !error) {
    posts = data.map((post: any) => {
      // Calculate dynamic reading time (200 words per minute average)
      const words = post.content ? post.content.split(/\s+/).length : 0;
      const readingTimeVal = Math.max(1, Math.ceil(words / 200));

      return {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        publishDate: post.publish_date,
        author: {
          name: post.author_name,
          role: post.author_role,
          avatar: post.author_avatar,
        },
        content: post.content,
        readingTime: `${readingTimeVal} min read`,
        ogImage: post.og_image,
      };
    });
  }

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "DIYNEZA Journal",
    description:
      "Practical guides on restaurant operations, inventory control, food cost, and growth.",
    url: `${siteConfig.url}/blog`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: `${siteConfig.url}/blog/${post.slug}`,
      datePublished: post.publishDate,
      author: { "@type": "Person", name: post.author.name },
      image: post.ogImage,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Journal",
        item: `${siteConfig.url}/blog`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <BlogClient posts={posts} />
      <Footer />
    </>
  );
}
