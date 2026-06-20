import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { EditBlogPostClient } from "./edit-client";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export const revalidate = 0;

export default async function EditBlogPostPage({ params }: RouteParams) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !post) {
    notFound();
  }

  // Ensure fields match types
  const mappedPost = {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    publish_date: post.publish_date,
    published: post.published,
    author_name: post.author_name,
    author_role: post.author_role,
    author_avatar: post.author_avatar,
    og_image: post.og_image
  };

  return <EditBlogPostClient initialPost={mappedPost} />;
}
