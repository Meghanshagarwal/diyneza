export interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  description: string;
  features: string[];
  popular: boolean;
  ctaText: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    priceMonthly: 39,
    priceAnnual: 29,
    description: "Essential billing and inventory tools for small cafes, trucks, and single outlets.",
    features: [
      "Cloud POS & Fast Billing",
      "Menu Management (1 Store)",
      "Basic Inventory Sync",
      "Sales Reports & Analytics",
      "Email & Chat Support (24/7)",
      "Max 2 Billing Terminals",
    ],
    popular: false,
    ctaText: "Start Starter Trial",
  },
  {
    id: "growth",
    name: "Growth",
    priceMonthly: 99,
    priceAnnual: 79,
    description: "Robust operations management for scaling restaurants, QSR chains, and busy bars.",
    features: [
      "Everything in Starter",
      "Advanced Inventory & Recipes",
      "Kitchen Display System (KDS)",
      "Direct QR Tableside Ordering",
      "Loyalty & CRM campaigns",
      "Multi-outlet menu sync",
      "Unlimited Terminals",
    ],
    popular: true,
    ctaText: "Start Growth Trial",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceMonthly: 0, // 0 signifies custom
    priceAnnual: 0,
    description: "Custom features, dedicated servers, and SLA agreements for multi-location franchises.",
    features: [
      "Everything in Growth",
      "Multi-brand corporate portal",
      "Custom third-party integrations",
      "Dedicated account manager",
      "On-site hardware deployment",
      "99.9% SLA uptime guarantee",
    ],
    popular: false,
    ctaText: "Contact Enterprise Sales",
  },
];

export const featureComparison = [
  { category: "POS & Billing", feature: "Fast cloud checkout", starter: true, growth: true, enterprise: true },
  { category: "POS & Billing", feature: "Offline billing mode", starter: true, growth: true, enterprise: true },
  { category: "POS & Billing", feature: "Split bills calculator", starter: true, growth: true, enterprise: true },
  { category: "Inventory", feature: "Real-time stock tracking", starter: true, growth: true, enterprise: true },
  { category: "Inventory", feature: "Recipe depletion depletion", starter: false, growth: true, enterprise: true },
  { category: "Inventory", feature: "Automated purchase orders", starter: false, growth: true, enterprise: true },
  { category: "Kitchen Operations", feature: "Kitchen Display (KDS)", starter: false, growth: true, enterprise: true },
  { category: "Customer Loyalty", feature: "QR Ordering & split payments", starter: false, growth: true, enterprise: true },
  { category: "Customer Loyalty", feature: "CRM & loyalty loops", starter: false, growth: true, enterprise: true },
  { category: "Multi-Outlet", feature: "Consolidated reports", starter: true, growth: true, enterprise: true },
  { category: "Multi-Outlet", feature: "Centralized recipe config", starter: false, growth: false, enterprise: true },
];
