import { createClient } from "@/utils/supabase/server";
import { Navbar } from "@/components/homepage/navbar";
import { Footer } from "@/components/homepage/footer";
import { BlogClient } from "./blog-client";
import { type BlogPost } from "@/data/blog";

export const revalidate = 0;

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

  return (
    <>
      <Navbar />
      <BlogClient posts={posts} />
      <Footer />
    </>
  );
}
