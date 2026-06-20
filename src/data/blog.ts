export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: "Operations" | "Growth" | "Inventory";
  publishDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string; // Markdown / HTML text
  readingTime: string;
  ogImage: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "reduce-food-wastage-restaurants",
    title: "5 Strategies to Drastically Reduce Food Wastage in QSR Chains",
    excerpt: "Food waste accounts for up to 12% of total operational cost. Learn how recipe costing and stock alerts can fix your margins.",
    category: "Inventory",
    publishDate: "June 12, 2026",
    author: {
      name: "Chef Marco Pierre",
      role: "Culinary Director",
      avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=150&h=150",
    },
    readingTime: "5 min read",
    ogImage: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200&h=630",
    content: `
# 5 Strategies to Drastically Reduce Food Wastage in QSR Chains

Food waste is one of the silent killers of restaurant profitability. For Quick Service Restaurants (QSR) operating on thin margins, ingredient wastage can represent a loss of up to 12% of total food revenue every single month.

Here are five proven, data-backed strategies to optimize your food cost and clean up your inventory wastage.

## 1. Implement Strict Recipe-Based Stock Depletion
Many restaurants track stock by taking manual inventory at the end of the week. This is too late. The moment a transaction is completed on your POS, your inventory system should automatically deplete raw ingredients down to the gram based on pre-set recipe cards.

For instance, selling one Margherita Pizza should automatically deduct:
- 150g of Pizza Dough
- 80g of Mozzarella Cheese
- 60g of Tomato Sauce

## 2. Setup Real-time Min/Max Threshold Alerts
Never run out of ingredients, and never over-order. Set strict minimum thresholds for perishable goods. If your fresh milk stock drops below 10 liters, your system should trigger a low-stock visual warning on the dashboard or auto-generate a Purchase Order (PO) to your designated supplier.

## 3. Standardize Preparation Checklists (KDS integration)
Use Kitchen Display Systems (KDS) instead of paper tickets. Paper tickets get lost, orders are prepared twice by mistake, or customized instructions (e.g., "no onions") are misread. Direct digital KDS routing ensures prep staff prepare the exact portions, keeping recipe costing accurate.

## 4. Track Wastage Logs Dynamically
If a staff member drops a tray of eggs, it must be logged immediately. Standardize a one-tap wastage button on your billing terminal: select the item, the weight, and the reason (spoilage, drop, customer return). Consolidating these logs will reveal if wastage is a training problem or a supplier quality issue.

## 5. Leverage Predictive Traffic Data
Why prepare 100 burgers on a rainy Tuesday afternoon? Use historical sales analytics to predict daily guest traffic. DIYNEZA analyzes your past 6 weeks of sales records to recommend prep levels, matching kitchen work with actual demand.
    `,
  },
  {
    slug: "boost-table-turnover-qr",
    title: "How QR Tableside Ordering Boosts Table Turnover by 24%",
    excerpt: "Discover how self-checkout and digital menus remove friction, allowing servers to serve more guests per hour.",
    category: "Growth",
    publishDate: "June 15, 2026",
    author: {
      name: "Clara Vance",
      role: "Operations Expert",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    },
    readingTime: "4 min read",
    ogImage: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1200&h=630",
    content: `
# How QR Tableside Ordering Boosts Table Turnover by 24%

In busy cafes and dine-in restaurants, wait times cost money. When guests are forced to wait 10 minutes to grab a menu, another 10 minutes to order, and 15 minutes to pay the bill, your table turnover rate drops.

Here is how scan-to-order tableside QR code checkout solves guest friction and expands restaurant traffic.

## The Ordering Bottleneck
A typical restaurant service contains four primary friction points:
1. Waiting for the server to bring the menu.
2. Waiting to place the food order.
3. Waiting for the kitchen to plate and serve.
4. Waiting to ask for, split, and settle the bill.

By delegating menu browsing, ordering, and payment checkout to the guest's own smartphone, we eliminate three of these four bottlenecks.

## 1. Guests Order Instantly
When tables are busy, servers are occupied. With tableside QR codes, guests sit down, scan, and browse a high-resolution photo menu. They select customized items (e.g. extra cheese) and submit orders straight to the kitchen within 90 seconds of sitting down.

## 2. Fast Bill Splitting & Settle
Settling the check is often the slowest part of dine-in service. Guests want to split bills or use different payment methods (UPI, Cards, Apple Pay). QR ordering allows guests to split the check directly on their screen and checkout instantly without waiting for a cashier to bring a swipe machine.

## 3. High Server Efficiency
By offloading ordering and billing, servers focus entirely on food quality and customer hospitality. A single server can manage up to 8 tables instead of 4, keeping labor costs low and staff efficiency high.
    `,
  },
];
