import { createClient } from "@/utils/supabase/server";
import { BlogCMSClient } from "./blog-cms-client";

export const revalidate = 0;

export default async function BlogCMSPage() {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, category, publish_date, published, author_name, og_image")
    .order("created_at", { ascending: false });

  return <BlogCMSClient initialPosts={posts || []} />;
}
