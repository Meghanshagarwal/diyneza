// Competitor "alternative" landing pages. Targets high-intent searches like
// "petpooja alternative", "posist alternative", etc. Content is framed around
// DIYNEZA's own strengths + neutral guidance (no unverified claims about rivals).

export interface Competitor {
  slug: string;
  name: string;
  /** Short neutral description of the competitor category. */
  blurb: string;
  /** Why restaurants consider switching to DIYNEZA. */
  switchReasons: { title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
}

// DIYNEZA's headline capabilities (shown as a checklist on every page).
export const diynezaHighlights = [
  "All-in-one: POS, billing, inventory, KDS & QR ordering in one platform",
  "0% commission on direct QR & online orders",
  "Offline-first billing — keeps working if the internet drops",
  "Real-time recipe costing & automated purchase orders",
  "Multi-outlet management from a single dashboard",
  "45-day free trial — no credit card, cancel anytime",
];

export const competitors: Competitor[] = [
  {
    slug: "petpooja",
    name: "Petpooja",
    blurb:
      "Petpooja is a popular restaurant billing and POS platform widely used across India. Many restaurants compare it with DIYNEZA when they want one connected system for billing, inventory, kitchen and online orders.",
    switchReasons: [
      { title: "Truly all-in-one", desc: "Run POS, live inventory, KDS, QR ordering and multi-outlet reporting from one dashboard — no bolt-on tools." },
      { title: "Commission-free direct orders", desc: "Keep 100% of revenue from QR tableside and your own online storefront." },
      { title: "Offline-first reliability", desc: "Billing keeps running during internet outages and auto-syncs when back online." },
      { title: "Risk-free 45-day trial", desc: "Evaluate the full platform for 45 days with no credit card and cancel anytime." },
    ],
    faqs: [
      { question: "Is DIYNEZA a good alternative to Petpooja?", answer: "Yes. DIYNEZA is an all-in-one restaurant management platform covering POS & billing, inventory, KDS, QR ordering and multi-outlet operations — with commission-free direct orders and a 45-day free trial, making it a strong alternative to Petpooja." },
      { question: "Can I migrate my menu and data to DIYNEZA?", answer: "Yes. Our team helps import your existing menu, inventory and recipe catalog, and standard setup takes under 24 hours with zero operational downtime." },
      { question: "Does DIYNEZA charge commission on orders?", answer: "No. Direct QR tableside orders and orders from your own DIYNEZA online storefront are 100% commission-free." },
    ],
  },
  {
    slug: "posist",
    name: "POSist",
    blurb:
      "POSist (Posist) is a cloud restaurant management platform used by many chains. Restaurants evaluating it often compare DIYNEZA for an all-in-one system with transparent pricing.",
    switchReasons: [
      { title: "One connected platform", desc: "Billing, inventory, kitchen display and online ordering work together natively." },
      { title: "Transparent SaaS pricing", desc: "Clear plans with no hidden transaction fees on direct orders." },
      { title: "Fast onboarding", desc: "Go live in under 24 hours with guided menu and inventory import." },
      { title: "45-day free trial", desc: "Try the complete platform before you commit — no credit card required." },
    ],
    faqs: [
      { question: "Is DIYNEZA an alternative to POSist?", answer: "Yes. DIYNEZA offers POS, inventory, KDS, QR ordering and multi-outlet management in one platform, with a 45-day free trial — a capable alternative to POSist for restaurants and chains." },
      { question: "Does DIYNEZA support multi-outlet chains?", answer: "Yes. You can manage menus, pricing, inventory pools and staff permissions across many locations from a single enterprise account." },
      { question: "How long does setup take?", answer: "A standard setup takes less than 24 hours, including importing your menu and inventory." },
    ],
  },
  {
    slug: "urbanpiper",
    name: "UrbanPiper",
    blurb:
      "UrbanPiper is known for aggregator and online-order management. Restaurants that also need full POS, billing and inventory in the same system often consider DIYNEZA.",
    switchReasons: [
      { title: "POS + online in one place", desc: "Manage in-store billing and direct online/QR orders together, not in separate tools." },
      { title: "Commission-free direct channel", desc: "Launch your own branded ordering storefront with 0% commission." },
      { title: "Live inventory & costing", desc: "Stock auto-deducts by recipe as bills settle, with food-cost visibility." },
      { title: "45-day free trial", desc: "Full access for 45 days, no credit card, cancel anytime." },
    ],
    faqs: [
      { question: "Is DIYNEZA an alternative to UrbanPiper?", answer: "Yes. Beyond online-order management, DIYNEZA adds full POS, billing, inventory and KDS in one platform with a 45-day free trial." },
      { question: "Can guests order via QR with DIYNEZA?", answer: "Yes. Guests scan a table QR to browse the menu, order and pay — commission-free and synced to your POS and kitchen." },
      { question: "Does it work for cloud kitchens?", answer: "Yes. DIYNEZA is built for cloud kitchens, cafes, QSR chains and fine dining alike." },
    ],
  },
  {
    slug: "rista",
    name: "Rista",
    blurb:
      "Rista is a cloud POS used by restaurants and retail. Teams that want commission-free direct ordering and a 45-day trial frequently compare DIYNEZA.",
    switchReasons: [
      { title: "All-in-one operations", desc: "POS, inventory, KDS, QR ordering and reporting in a single dashboard." },
      { title: "Offline billing", desc: "Keep selling during outages — transactions sync automatically." },
      { title: "Commission-free orders", desc: "0% commission on direct QR and storefront orders." },
      { title: "45-day free trial", desc: "Evaluate everything risk-free before deciding." },
    ],
    faqs: [
      { question: "Is DIYNEZA an alternative to Rista?", answer: "Yes. DIYNEZA delivers POS, billing, inventory, KDS and QR ordering in one platform with a 45-day free trial — a solid alternative to Rista." },
      { question: "Is there a free trial?", answer: "Yes — 45 days free, no credit card required, cancel anytime." },
      { question: "Can I run multiple outlets?", answer: "Yes, multi-outlet management is built in." },
    ],
  },
  {
    slug: "limetray",
    name: "LimeTray",
    blurb:
      "LimeTray offers ordering, marketing and POS tools. Restaurants seeking one unified, commission-free platform often evaluate DIYNEZA.",
    switchReasons: [
      { title: "Unified, not bolt-ons", desc: "Billing, inventory, kitchen and ordering are one connected system." },
      { title: "0% commission direct orders", desc: "Own your customer relationship and revenue." },
      { title: "Recipe costing & auto-POs", desc: "Control food cost with real-time stock and supplier orders." },
      { title: "45-day free trial", desc: "Try the full platform with no credit card." },
    ],
    faqs: [
      { question: "Is DIYNEZA an alternative to LimeTray?", answer: "Yes. DIYNEZA combines POS, billing, inventory, KDS and commission-free QR/online ordering in one platform, with a 45-day free trial." },
      { question: "Does DIYNEZA help reduce food cost?", answer: "Yes. Recipe-based stock deduction and wastage logs give you precise food-cost control." },
      { question: "How fast can we start?", answer: "Most restaurants are live within 24 hours." },
    ],
  },
  {
    slug: "dotpe",
    name: "DotPe",
    blurb:
      "DotPe is known for QR ordering and payments. Restaurants that also need full POS, billing and inventory in the same place commonly consider DIYNEZA.",
    switchReasons: [
      { title: "QR ordering + full POS", desc: "Tableside QR ordering plus complete in-store billing and kitchen flow." },
      { title: "Live inventory", desc: "Automatic recipe-based stock control and purchase orders." },
      { title: "Multi-outlet ready", desc: "Scale from one outlet to many with centralized control." },
      { title: "45-day free trial", desc: "Full access, no credit card, cancel anytime." },
    ],
    faqs: [
      { question: "Is DIYNEZA an alternative to DotPe?", answer: "Yes. DIYNEZA adds full POS, billing, inventory and KDS alongside commission-free QR ordering, in one platform with a 45-day free trial." },
      { question: "Are direct orders commission-free?", answer: "Yes, direct QR and storefront orders carry 0% commission." },
      { question: "Does it support offline billing?", answer: "Yes — billing continues offline and syncs when reconnected." },
    ],
  },
];

export function getCompetitor(slug: string) {
  return competitors.find((c) => c.slug === slug);
}
