"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight, ShieldCheck, Cpu, Database, QrCode } from "lucide-react";
import { Logo } from "@/components/ui/logo";

interface NavItem {
  name: string;
  desc: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface NavLink {
  id: string;
  label: string;
  columns: {
    title: string;
    items: NavItem[];
  }[];
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);

  const navLinks: NavLink[] = [
    {
      id: "products",
      label: "Products",
      columns: [
        {
          title: "Core Operating Modules",
          items: [
            { name: "POS & Billing", desc: "Fast cloud billing & payments", href: "/products#pos", icon: ShieldCheck },
            { name: "Kitchen Display (KDS)", desc: "Ditch printers, coordinate kitchen", href: "/products#kds", icon: Cpu },
            { name: "Inventory Management", desc: "Live stock & automated POs", href: "/products#inventory", icon: Database },
            { name: "QR & Tableside Pay", desc: "Self-checkout for guests", href: "/products#qr", icon: QrCode },
          ],
        },
      ],
    },
    {
      id: "solutions",
      label: "Solutions",
      columns: [
        {
          title: "Restaurant Types",
          items: [
            { name: "QSR & Fast Food", desc: "Optimize high-volume queues", href: "/solutions#qsr" },
            { name: "Fine Dining", desc: "Tableside ordering & CRM", href: "/solutions#fine-dining" },
            { name: "Cafes & Bakeries", desc: "Quick ticket printing & loyalty", href: "/solutions#cafe" },
            { name: "Cloud Kitchens", desc: "Aggregate delivery channels", href: "/solutions#cloud-kitchen" },
          ],
        },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/50 bg-black/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Logo />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <div
              key={link.id}
              className="relative"
              onMouseEnter={() => setActiveDropdown(link.id)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 py-2 font-heading text-sm font-medium text-zinc-300 hover:text-white transition-colors focus:outline-none cursor-pointer">
                <span>{link.label}</span>
                <ChevronDown className="h-4 w-4 text-zinc-500" />
              </button>

              <AnimatePresence>
                {activeDropdown === link.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute left-1/2 top-full z-50 w-[420px] -translate-x-1/2 pt-3"
                  >
                    <div className="glass-panel rounded-xl p-6 shadow-2xl">
                      {link.columns.map((col, cIdx) => (
                        <div key={cIdx}>
                          <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-zinc-500">
                            {col.title}
                          </h4>
                          <div className="mt-4 grid gap-4">
                            {col.items.map((item, iIdx) => (
                              <Link
                                key={iIdx}
                                href={item.href}
                                className="group flex items-start space-x-4 rounded-lg p-2 hover:bg-zinc-800/40 transition-colors"
                              >
                                {item.icon && (
                                  <item.icon className="mt-1 h-5 w-5 text-primary group-hover:text-primary-light transition-colors" />
                                )}
                                <div>
                                  <div className="font-heading text-sm font-semibold text-zinc-200 group-hover:text-white">
                                    {item.name}
                                  </div>
                                  <p className="mt-1 text-xs text-zinc-400">
                                    {item.desc}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <Link href="/pricing" className="font-heading text-sm font-medium text-zinc-300 hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="/blog" className="font-heading text-sm font-medium text-zinc-300 hover:text-white transition-colors">
            Journal
          </Link>
          <Link href="/#integrations" className="font-heading text-sm font-medium text-zinc-300 hover:text-white transition-colors">
            Integrations
          </Link>
          <Link href="/#faq" className="font-heading text-sm font-medium text-zinc-300 hover:text-white transition-colors">
            FAQs
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/admin" className="font-heading text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            Login
          </Link>
          <Link
            href="/contact?intent=demo"
            className="inline-flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm font-heading font-medium text-black transition-all hover:bg-primary-light hover:scale-[1.02] glow-primary"
          >
            <span>Book a Demo</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex md:hidden text-zinc-400 hover:text-white focus:outline-none cursor-pointer"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-zinc-800 bg-zinc-950 px-6 py-6"
          >
            <div className="grid gap-6">
              {navLinks.map((link) => (
                <div key={link.id}>
                  <div className="font-heading text-sm font-semibold uppercase tracking-wider text-zinc-500">
                    {link.label}
                  </div>
                  <div className="mt-2 grid gap-2 pl-2">
                    {link.columns[0].items.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        className="font-heading text-base font-medium text-zinc-300 hover:text-white"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link
                href="/pricing"
                className="font-heading text-base font-medium text-zinc-300 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/blog"
                className="font-heading text-base font-medium text-zinc-300 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Journal
              </Link>
              <Link
                href="/#integrations"
                className="font-heading text-base font-medium text-zinc-300 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Integrations
              </Link>
              <Link
                href="/#faq"
                className="font-heading text-base font-medium text-zinc-300 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQs
              </Link>
              <Link
                href="/contact"
                className="font-heading text-base font-medium text-zinc-300 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <hr className="border-zinc-800" />
              <div className="flex flex-col gap-4">
                <Link
                  href="/admin"
                  className="text-center font-heading text-base font-medium text-zinc-400 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/contact?intent=demo"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-base font-heading font-medium text-black transition-all hover:bg-primary-light"
                >
                  Book a Demo
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
