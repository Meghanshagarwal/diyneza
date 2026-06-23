import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

// On-demand revalidation for the cached homepage. The admin content editors
// (testimonials / FAQs / integrations) call this after a mutation so changes
// appear immediately instead of waiting for the hourly ISR window.
// Auth-gated: only a logged-in admin session can trigger it.
export async function POST() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidatePath("/");
  return NextResponse.json({ revalidated: true });
}
