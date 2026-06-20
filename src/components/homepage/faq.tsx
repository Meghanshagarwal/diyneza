"use client";

import { Accordion } from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQItem[];
}

export function FAQ({ faqs }: FAQProps) {
  // Generate FAQ Schema (JSON-LD) dynamically
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="relative py-20 md:py-28 bg-zinc-950/40 border-t border-zinc-900">
      {/* Schema Injection */}
      <script
        type="application/ld-json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-heading text-xs font-semibold tracking-widest text-primary uppercase">
            COMMON INQUIRIES
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base text-zinc-400">
            Answers to common questions about onboarding, offline support, billing structure, and hardware requirements.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="mt-16">
          <Accordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
