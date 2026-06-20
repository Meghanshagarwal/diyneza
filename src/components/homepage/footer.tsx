"use client";

import Link from "next/link";
import { Flame, ArrowRight } from "lucide-react";

export function Footer() {
  const footerLinks = [
    {
      title: "Products",
      links: [
        { name: "POS & Billing", href: "/products#pos" },
        { name: "Kitchen Display (KDS)", href: "/products#kds" },
        { name: "Inventory Control", href: "/products#inventory" },
        { name: "Tableside ordering", href: "/products#qr" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { name: "QSR Chains", href: "/solutions#qsr" },
        { name: "Fine Dining", href: "/solutions#fine-dining" },
        { name: "Cafes & Bakeries", href: "/solutions#cafe" },
        { name: "Cloud Kitchens", href: "/solutions#cloud-kitchen" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Support Center", href: "#" },
        { name: "Pricing Plans", href: "/pricing" },
        { name: "Developer APIs", href: "#" },
        { name: "System Status", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Journal Blog", href: "/blog" },
        { name: "Contact Demo", href: "/#cta" },
      ],
    },
  ];

  return (
    <footer className="border-t border-zinc-900 bg-zinc-950/40 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-6 gap-8">
        {/* Brand Column */}
        <div className="md:col-span-2 flex flex-col space-y-4">
          <Link href="/" className="flex items-center space-x-2">
            <Flame className="h-6 w-6 text-primary fill-primary" />
            <span className="font-heading text-lg font-bold tracking-tight text-white">
              DIYNEZA<span className="text-primary">.</span>
            </span>
          </Link>
          <p className="text-xs text-zinc-500 leading-relaxed max-w-[240px]">
            The complete operating stack for modern hospitality. Run billing, inventory, and multiple outlets from one central cloud terminal.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-4 pt-2">
            <Link href="#" className="text-zinc-500 hover:text-white transition-colors" aria-label="Twitter">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </Link>
            <Link href="#" className="text-zinc-500 hover:text-white transition-colors" aria-label="Github">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </Link>
            <Link href="#" className="text-zinc-500 hover:text-white transition-colors" aria-label="LinkedIn">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </Link>
          </div>
        </div>

        {/* Links Columns */}
        {footerLinks.map((col, idx) => (
          <div key={idx} className="flex flex-col space-y-3">
            <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-zinc-500">
              {col.title}
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              {col.links.map((link, lIdx) => (
                <li key={lIdx}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Copyright Bar */}
      <div className="mx-auto max-w-7xl px-6 mt-12 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-4">
        <span>© {new Date().getFullYear()} DIYNEZA Technologies Inc. All rights reserved.</span>
        <div className="flex space-x-6">
          <Link href="#" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            SLA Agreement
          </Link>
        </div>
      </div>
    </footer>
  );
}
