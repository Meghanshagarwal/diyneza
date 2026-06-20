import { createClient } from "@/utils/supabase/server";
import { LeadsClient } from "./leads-client";

export const revalidate = 0;

export default async function LeadsPage() {
  const supabase = await createClient();

  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  return <LeadsClient initialLeads={leads || []} />;
}
