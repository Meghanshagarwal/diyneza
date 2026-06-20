import type { Metadata } from "next";
import { Navbar } from "@/components/homepage/navbar";
import { Footer } from "@/components/homepage/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How DIYNEZA collects, uses, and protects your personal and restaurant data.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    h: "1. Introduction",
    p: "This Privacy Policy explains how DIYNEZA collects, uses, and protects information when you use our website and platform. We are committed to handling your data responsibly and transparently.",
  },
  {
    h: "2. Information we collect",
    p: "We collect information you provide directly — such as your name, email, phone number, and restaurant details when you contact us, request a demo, or sign up. We also collect usage data (device, browser, pages visited) to improve the Service.",
  },
  {
    h: "3. How we use your information",
    p: "We use your information to provide and improve the Service, respond to inquiries, process your free trial or subscription, send relevant updates, and ensure security. We do not sell your personal data.",
  },
  {
    h: "4. Restaurant & operational data",
    p: "Data you enter into the platform (menus, inventory, sales, customer records) belongs to you. We process it only to operate the Service on your behalf and never share it with third parties for marketing.",
  },
  {
    h: "5. Cookies",
    p: "We use essential cookies to keep you signed in and analytics cookies to understand how the site is used. You can control cookies through your browser settings.",
  },
  {
    h: "6. Data sharing",
    p: "We share data only with trusted service providers (e.g. hosting, payment processors) who process it under strict confidentiality, and when required by law.",
  },
  {
    h: "7. Data security",
    p: "We use industry-standard safeguards including encryption in transit, access controls, and regular backups. No method of transmission is 100% secure, but we work continuously to protect your data.",
  },
  {
    h: "8. Your rights",
    p: "You may request access to, correction of, or deletion of your personal data. To exercise these rights, email hello@diyneza.com.",
  },
  {
    h: "9. Data retention",
    p: "We retain your information for as long as your account is active or as needed to provide the Service and comply with legal obligations.",
  },
  {
    h: "10. Contact",
    p: "For privacy questions or requests, contact us at hello@diyneza.com.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-dark-bg text-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="font-heading text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
          <p className="mt-3 text-sm text-zinc-500">Last updated: June 2026</p>
          <div className="mt-10 space-y-10">
            {sections.map((s) => (
              <section key={s.h}>
                <h2 className="font-heading text-xl font-bold text-white">{s.h}</h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{s.p}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
