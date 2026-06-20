import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { AdminSidebar } from "./sidebar-client";

export const revalidate = 0;

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  
  // Verify user is authenticated
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col md:flex-row font-sans">
      {/* Client-rendered Sidebar navigation */}
      <AdminSidebar userEmail={user.email || "admin@diyneza.com"} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 md:h-screen md:overflow-y-auto">
        <div className="p-6 md:p-10 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
