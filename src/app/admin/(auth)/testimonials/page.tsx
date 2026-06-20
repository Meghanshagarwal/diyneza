import { createClient } from "@/utils/supabase/server";
import { TestimonialsClient } from "./testimonials-client";

export const revalidate = 0;

export default async function TestimonialsCMSPage() {
  const supabase = await createClient();

  const { data: testimonials, error } = await supabase
    .from("testimonials")
    .select("*");

  return <TestimonialsClient initialTestimonials={testimonials || []} />;
}
