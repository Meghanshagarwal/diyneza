import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Navbar } from "@/components/homepage/navbar";
import { Footer } from "@/components/homepage/footer";
import { ContactForm } from "./contact-form";
import { siteConfig } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact Us — Book a Demo or Start Free Trial",
  description:
    "Talk to the DIYNEZA team. Book a personalized demo or start your 45-day free trial — no credit card required, cancel anytime.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact DIYNEZA — Book a Demo or Start Free Trial",
    description:
      "Book a personalized demo or start your 45-day free trial. No credit card required.",
    url: "/contact",
    type: "website",
  },
};

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@diyneza.com", href: "mailto:hello@diyneza.com" },
  { icon: Phone, label: "Sales", value: "+1 (555) 012-3456", href: "tel:+15550123456" },
  { icon: Clock, label: "Hours", value: "Mon–Sat, 9am – 7pm", href: undefined },
  { icon: MapPin, label: "Support", value: "24/7 in-app live chat", href: undefined },
];

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact DIYNEZA",
    url: `${siteConfig.url}/contact`,
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <Navbar />

      <main className="flex-1 bg-dark-bg text-white">
        <section className="relative overflow-hidden border-b border-zinc-900 pt-20 pb-14 text-center">
          <div className="absolute top-0 left-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
          <div className="mx-auto max-w-3xl px-6">
            <span className="font-heading text-xs font-semibold tracking-widest text-primary uppercase">
              Let&apos;s talk
            </span>
            <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Book a demo or start free
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400">
              Tell us about your restaurant and we&apos;ll show you how DIYNEZA can streamline your
              operations. Get a personalized walkthrough or jump straight into your 45-day free trial.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-3">
            {/* Contact info */}
            <div className="space-y-8 lg:col-span-1">
              <div>
                <h2 className="font-heading text-lg font-bold text-white">Get in touch</h2>
                <p className="mt-2 text-sm text-zinc-400">
                  Prefer to reach us directly? Use any of the channels below.
                </p>
              </div>
              <ul className="space-y-5">
                {contactInfo.map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                      <item.icon className="h-4 w-4 text-primary" />
                    </span>
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                        {item.label}
                      </div>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-zinc-200 hover:text-primary transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-sm text-zinc-200">{item.value}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/20 p-6 sm:p-8">
                <Suspense fallback={<div className="text-sm text-zinc-500">Loading form…</div>}>
                  <ContactForm />
                </Suspense>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
