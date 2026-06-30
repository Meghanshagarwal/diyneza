"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

/**
 * Mobile-only sticky CTA bar pinned to the bottom of the viewport.
 * Hidden on /admin and /contact (where a form already exists).
 */
export function StickyDemoBar() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/contact")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-md p-3 md:hidden">
      <Link
        href="/contact?intent=trial"
        className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-heading font-semibold text-black"
      >
        Start 45-day free trial <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
