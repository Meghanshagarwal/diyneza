import { createClient } from "@/utils/supabase/server";
import { FoundersClient } from "./founders-client";

export const revalidate = 0;

export default async function FoundersAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("founders")
    .select("*")
    .order("display_order", { ascending: true });

  return <FoundersClient initial={data || []} />;
}
