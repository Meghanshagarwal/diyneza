export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface BentoItem {
  id: string;
  title: string;
  description: string;
  badge?: string;
  colSpan: string;
  visualType: "billing" | "inventory" | "qr" | "kds" | "loyalty" | "analytics";
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  restaurant: string;
  quote: string;
  avatar: string;
  metric: string;
}

export interface IntegrationItem {
  id: string;
  name: string;
  logoType: string;
  category: "payment" | "delivery" | "accounting" | "messaging";
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const homepageContent = {
  hero: {
    eyebrow: "DIYNEZA RESTAURANT OPERATING SYSTEM",
    headline: "Everything your restaurant needs in one platform.",
    subhead: "Power your point of sale, optimize inventory in real-time, scale QR ordering, and manage multiple outlets from a single dashboard built for modern hospitality.",
    primaryCTA: "Start Free Trial",
    secondaryCTA: "Watch Demo",
  },
  trustedBrands: [
    { name: "Urban Cafe", logo: "/logos/urban-cafe.svg" },
    { name: "Tandoori Nights", logo: "/logos/tandoori.svg" },
    { name: "Slice & Dice", logo: "/logos/slice.svg" },
    { name: "The Burger Hub", logo: "/logos/burger.svg" },
    { name: "Green Salad Co.", logo: "/logos/salad.svg" },
    { name: "Sweet Tooth", logo: "/logos/sweet.svg" },
  ],
  problem: {
    eyebrow: "THE COST OF SILOED SYSTEMS",
    headline: "Stop stitching together broken software.",
    cards: [
      {
        id: "p1",
        title: "Leakages in Inventory",
        description: "Without real-time sync, ingredient theft and wastage drain up to 12% of total food revenue every month.",
        stat: "12% Lost",
      },
      {
        id: "p2",
        title: "Delayed Billing & Queues",
        description: "Legacy desktop POS machines crash under high traffic, leading to order delays and frustrated guests.",
        stat: "3.5m Delay",
      },
      {
        id: "p3",
        title: "Disjointed Reports",
        description: "Manually consolidating Excel sheets from aggregator apps and offline sales takes hours every night.",
        stat: "4h Waste",
      },
    ],
  },
  ecosystem: {
    eyebrow: "UNIFIED ECOSYSTEM",
    headline: "The full stack for modern restaurants.",
    description: "DIYNEZA replaces up to 7 disconnected software subscriptions with a single, lightning-fast cloud dashboard.",
    modules: [
      { id: "pos", name: "POS & Billing", status: "Active" },
      { id: "menu", name: "Menu Management", status: "Syncing" },
      { id: "inventory", name: "Inventory", status: "94% Alert" },
      { id: "kds", name: "Kitchen Display (KDS)", status: "Active" },
      { id: "qr", name: "QR Ordering", status: "Active" },
      { id: "crm", name: "CRM & Loyalty", status: "Active" },
      { id: "analytics", name: "Real-time Reports", status: "Updated" },
    ],
  },
  bento: [
    {
      id: "b1",
      title: "Smart Kitchen KDS",
      description: "Direct kitchen routing, ticket timers, and color-coded status alerts to keep chefs in perfect sync.",
      badge: "No printer delay",
      colSpan: "md:col-span-2",
      visualType: "kds",
    },
    {
      id: "b2",
      title: "Scan-to-Pay QR",
      description: "Allow guests to browse menu, order, split bills, and pay at the table instantly.",
      badge: "Self-checkout",
      colSpan: "md:col-span-1",
      visualType: "qr",
    },
    {
      id: "b3",
      title: "Automated Reordering",
      description: "Auto-trigger purchase orders to vendors when ingredient stocks drop below minimum thresholds.",
      badge: "Zero stockouts",
      colSpan: "md:col-span-1",
      visualType: "inventory",
    },
    {
      id: "b4",
      title: "Enterprise Multi-Outlet",
      description: "Centralized franchises, recipe versioning, and consolidated reporting across all your locations.",
      badge: "Scalable config",
      colSpan: "md:col-span-2",
      visualType: "analytics",
    },
  ] as BentoItem[],
  productDeepDive: {
    tabs: [
      {
        id: "pos",
        label: "POS & Billing",
        title: "Lightning-fast checkout, even offline.",
        description: "A billing terminal designed for speed. Process cards, UPI, cash, and split bills in 3 taps. If your internet drops, DIYNEZA continues processing transactions locally and syncs automatically when online.",
        features: ["Offline billing support", "Custom quick-keys layout", "Aggregator app integrations", "Split-bill calculators"],
      },
      {
        id: "inventory",
        label: "Inventory & Recipe",
        title: "Real-time recipe costing and stock alerts.",
        description: "Know your food cost to the cent. Track stock levels from raw ingredients to sub-recipes. DIYNEZA automatically deducts inventory weights in real-time as bills are settled in your POS.",
        features: ["Recipe-based stock deduction", "Purchase order generation", "Supplier directory", "Wastage logs & tracking"],
      },
      {
        id: "kds",
        label: "Kitchen Display (KDS)",
        title: "Ditch printers. Modernize your kitchen line.",
        description: "Route orders from POS or table QR directly to kitchen screens. Group tickets by preparation station, set prep-time warnings, and notify servers the moment dishes are plated.",
        features: ["Auto-routing by food prep station", "Color-coded ticket alerts", "Consolidated recipe view", "One-click order completion"],
      },
      {
        id: "delivery",
        label: "QR & Online Ordering",
        title: "Unify direct orders and table reservations.",
        description: "Zero aggregator fees. Launch your own branded delivery website and allow in-house guests to scan table QRs to place orders instantly. All orders land directly in your central POS system.",
        features: ["Scan-to-order tableside", "Branded online storefront", "Split payments & digital wallets", "Interactive seating maps"],
      },
    ],
  },
  multiOutlet: {
    eyebrow: "FRANCHISES & CHAINS",
    headline: "Scale from 1 location to 1,000.",
    description: "Manage menu items, pricing, inventory pools, and staff access rights for multiple locations globally or locally from a single enterprise account.",
    locations: [
      { city: "New York", sales: "$45,210", traffic: "High", status: "Busy" },
      { city: "London", sales: "$32,840", traffic: "Moderate", status: "Active" },
      { city: "New Delhi", sales: "$28,910", traffic: "Peak", status: "Busy" },
      { city: "Singapore", sales: "$39,520", traffic: "Moderate", status: "Active" },
    ],
  },
  integrations: [
    { id: "int1", name: "Stripe", logoType: "stripe", category: "payment" },
    { id: "int2", name: "Razorpay", logoType: "razorpay", category: "payment" },
    { id: "int3", name: "UberEats", logoType: "ubereats", category: "delivery" },
    { id: "int4", name: "DoorDash", logoType: "doordash", category: "delivery" },
    { id: "int5", name: "QuickBooks", logoType: "quickbooks", category: "accounting" },
    { id: "int6", name: "Twilio", logoType: "twilio", category: "messaging" },
  ] as IntegrationItem[],
  testimonials: [
    {
      id: "t1",
      name: "",
      role: "",
      restaurant: "",
      quote: "Real-time recipe costing and wastage logs help restaurants cut ingredient waste and tighten food margins from the first month.",
      avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=150&h=150",
      metric: "+8% Food Margin",
    },
    {
      id: "t2",
      name: "",
      role: "",
      restaurant: "",
      quote: "Centralized multi-outlet control means a menu or price change can propagate across every location in seconds — no spreadsheet consolidation.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
      metric: "15s Price Sync",
    },
    {
      id: "t3",
      name: "",
      role: "",
      restaurant: "",
      quote: "Table QR ordering reduces manual entry errors and frees servers to focus on hospitality instead of punching in bills.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
      metric: "+24% Table Turn",
    },
  ] as TestimonialItem[],
  faqs: [
    {
      question: "How long does it take to set up DIYNEZA at a restaurant?",
      answer: "A standard setup takes less than 24 hours. Our support team helps import your existing menu, inventory list, and recipe catalog into our system, meaning zero operational downtime.",
    },
    {
      question: "Does DIYNEZA work offline if the internet goes down?",
      answer: "Yes. Our cloud hybrid architecture guarantees that POS and billing continue working offline. As soon as connectivity is restored, all transactions are securely synced back to the cloud database.",
    },
    {
      question: "Are there any hidden transaction fees or aggregator commissions?",
      answer: "None. DIYNEZA operates on a transparent SaaS subscription model. Direct QR tableside orders and direct website deliveries are 100% commission-free.",
    },
    {
      question: "Can I manage permissions for managers and cashiers separately?",
      answer: "Absolutely. Our multi-role access control (RBAC) allows you to define custom permissions for cashiers, store managers, kitchen staff, and franchise owners.",
    },
  ] as FAQItem[],
};
