import type { Metadata } from "next";
import { Navbar } from "@/components/homepage/navbar";
import { Footer } from "@/components/homepage/footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms and conditions governing your use of DIYNEZA's restaurant management platform.",
  alternates: { canonical: "/terms" },
};

const sections = [
  {
    h: "1. Agreement to terms",
    p: "By accessing or using DIYNEZA (the “Service”), you agree to be bound by these Terms of Service. If you do not agree, you may not use the Service. These terms apply to all visitors, users, and customers of the platform.",
  },
  {
    h: "2. Free trial",
    p: "We offer a 45-day free trial with no credit card required. You may cancel at any time during or after the trial. At the end of the trial, continued use of paid features requires an active subscription. We reserve the right to modify trial terms for future sign-ups.",
  },
  {
    h: "3. Accounts & security",
    p: "You are responsible for safeguarding your account credentials and for all activity that occurs under your account. Notify us immediately of any unauthorized use. You must provide accurate, complete information and keep it up to date.",
  },
  {
    h: "4. Subscriptions & billing",
    p: "Paid plans are billed in advance on a recurring basis. Fees are non-refundable except where required by law. We may change pricing with prior notice; changes take effect at your next billing cycle. You can cancel anytime, and your plan remains active until the end of the paid period.",
  },
  {
    h: "5. Acceptable use",
    p: "You agree not to misuse the Service, including attempting to gain unauthorized access, disrupting the platform, reverse engineering, or using it for unlawful purposes. We may suspend accounts that violate these terms.",
  },
  {
    h: "6. Data ownership",
    p: "You retain ownership of the data you submit to the Service. You grant us a limited license to process that data solely to operate and improve the Service, as described in our Privacy Policy.",
  },
  {
    h: "7. Service availability",
    p: "We strive for high availability but do not guarantee uninterrupted service. Scheduled maintenance and factors beyond our control may affect availability. Enterprise plans may include a separate SLA.",
  },
  {
    h: "8. Limitation of liability",
    p: "To the maximum extent permitted by law, DIYNEZA shall not be liable for indirect, incidental, or consequential damages arising from your use of the Service.",
  },
  {
    h: "9. Changes to these terms",
    p: "We may update these terms from time to time. Material changes will be communicated through the Service or by email. Continued use after changes constitutes acceptance.",
  },
  {
    h: "10. Contact",
    p: "Questions about these terms? Email us at hello@diyneza.com.",
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-dark-bg text-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="font-heading text-4xl font-extrabold tracking-tight">Terms of Service</h1>
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
