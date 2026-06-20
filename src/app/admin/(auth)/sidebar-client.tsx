"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Flame,
  LayoutDashboard,
  Inbox,
  Tag,
  FileText,
  HelpCircle,
  MessageSquare,
  Globe,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface SidebarClientProps {
  userEmail: string;
}

export function AdminSidebar({ userEmail }: SidebarClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  const navigationItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "CRM Leads", href: "/admin/leads", icon: Inbox },
    { name: "Pricing Plans", href: "/admin/pricing", icon: Tag },
    { name: "Journal CMS", href: "/admin/blog", icon: FileText },
    { name: "FAQs Manager", href: "/admin/faqs", icon: HelpCircle },
    { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  ];

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between border-b border-zinc-900 bg-zinc-950 px-6 py-4 z-40 relative">
        <Link href="/admin/dashboard" className="flex items-center space-x-2">
          <Flame className="h-5 w-5 text-primary fill-primary" />
          <span className="font-heading text-sm font-bold tracking-tight text-white">
            DIYNEZA ADMIN
          </span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-zinc-400 hover:text-white focus:outline-none"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-zinc-950/80 border-r border-zinc-900 flex flex-col justify-between p-6 z-40 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-8">
          {/* Logo */}
          <div className="hidden md:flex items-center space-x-2.5">
            <Flame className="h-6 w-6 text-primary fill-primary" />
            <span className="font-heading text-base font-bold tracking-tight text-white">
              DIYNEZA<span className="text-primary">.</span>
              <span className="text-[9px] uppercase tracking-widest text-zinc-500 bg-zinc-900 border border-zinc-850 px-2 py-0.5 rounded ml-2">
                OPS
              </span>
            </span>
          </div>

          {/* User Profile */}
          <div className="rounded-xl border border-zinc-900 bg-zinc-900/10 p-4">
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">
              Active Terminal
            </span>
            <span className="text-xs font-semibold text-zinc-300 truncate block mt-0.5" title={userEmail}>
              {userEmail}
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 rounded-lg px-4 py-2.5 text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? "bg-primary text-black"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="space-y-2 border-t border-zinc-900 pt-6">
          <Link
            href="/"
            className="flex items-center space-x-3 rounded-lg px-4 py-2.5 text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900/50 transition-all"
          >
            <Globe className="h-4 w-4" />
            <span>Visit Public Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 rounded-lg px-4 py-2.5 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all text-left cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
