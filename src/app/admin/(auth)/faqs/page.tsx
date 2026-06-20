import { createClient } from "@/utils/supabase/server";
import { FAQsClient } from "./faqs-client";

export const revalidate = 0;

export default async function FAQsCMSPage() {
  const supabase = await createClient();

  const { data: faqs, error } = await supabase
    .from("faqs")
    .select("*")
    .order("display_order", { ascending: true });

  return <FAQsClient initialFaqs={faqs || []} />;
}
