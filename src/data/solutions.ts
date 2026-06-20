export interface SolutionCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  metricLabel: string;
  hardware: string[];
  features: string[];
}

export const solutionsData: SolutionCard[] = [
  {
    id: "qsr",
    title: "QSR & QSR Chains",
    subtitle: "High volume. Faster throughput.",
    description: "Built for speed. Coordinate ordering terminals, self-ordering kiosks, and aggregator apps into a central kitchen dispatch screen.",
    metric: "45s Checkout",
    metricLabel: "Average counter transaction speed",
    hardware: ["Dual-screen POS terminals", "Thermal receipt printers", "Self-service kiosks"],
    features: ["Instant queue order-taking", "Aggregator menu injection", "Unified cash drawer reconciliation"],
  },
  {
    id: "cafe",
    title: "Cafes & Bakeries",
    subtitle: "Loyalty loops. Quick ticket printing.",
    description: "Keep caffeine running. Support quick checkout, tableside QR code scanning, dynamic loyalty loops, and custom modifier keys (e.g. oat milk).",
    metric: "+32% Retention",
    metricLabel: "Repeat customer rate via loyalty points",
    hardware: ["Compact billing terminals", "Customer-facing displays", "Sticky label printers"],
    features: ["Modifier menus (custom sizes/addons)", "Dynamic discount trigger", "Prepaid digital cards"],
  },
  {
    id: "fine-dining",
    title: "Fine Dining",
    subtitle: "Dine-in floor maps. Tableside checkout.",
    description: "Premium host control. Manage interactive floor layouts, kitchen prep timers, and tableside card terminal checkouts.",
    metric: "+24% Table Turn",
    metricLabel: "Increase in seating efficiency",
    hardware: ["Handheld ordering tablets", "KDS screens", "Integrated card readers"],
    features: ["Interactive table status grid", "Course timing routing", "Guest profile CRM logs"],
  },
  {
    id: "cloud-kitchen",
    title: "Cloud Kitchens",
    subtitle: "Multi-brand aggregators. Dispatch routing.",
    description: "Ingest orders from multiple aggregators (UberEats, Zomato) into a single KDS without multiple tablets clattering on the counter.",
    metric: "0% Order Loss",
    metricLabel: "Eliminate missed online orders",
    hardware: ["Central dispatcher screens", "Auto-delivery ticket printers"],
    features: ["Consolidated aggregator feeds", "Centralized multi-brand menu versioning", "Driver pickup alert screens"],
  },
];
