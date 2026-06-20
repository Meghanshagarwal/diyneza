import { createClient } from "@/utils/supabase/server";
import { SettingsClient } from "./settings-client";

export const revalidate = 0;

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("key, value");
  const map = Object.fromEntries((data || []).map((r: any) => [r.key, r.value]));

  return (
    <SettingsClient
      initial={{
        ga4_id: map.ga4_id || "",
        meta_pixel_id: map.meta_pixel_id || "",
        clarity_id: map.clarity_id || "",
      }}
    />
  );
}
