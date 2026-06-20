-- ─────────────────────────────────────────────────────────────────────────
-- DIYNEZA: seed 3 SEO blog posts. Run once in the Supabase SQL editor.
-- Safe to re-run (skips slugs that already exist).
-- ─────────────────────────────────────────────────────────────────────────

INSERT INTO public.blog_posts
  (slug, title, excerpt, content, category, publish_date, published, author_name, author_role, author_avatar, og_image)
SELECT * FROM (VALUES
(
  'best-restaurant-pos-software-india-2026',
  'Best Restaurant POS Software in India (2026 Guide)',
  'A practical 2026 guide to choosing the best restaurant POS software in India — features, pricing, offline support and what actually matters.',
  E'# Best Restaurant POS Software in India (2026 Guide)\n\nChoosing the right POS is one of the highest-leverage decisions a restaurant owner makes. The right system speeds up billing, controls food cost, and keeps every outlet in sync. The wrong one creates daily friction.\n\n## What to look for in a restaurant POS\n- Fast, reliable billing that works even when the internet drops\n- Real-time inventory and recipe costing\n- Kitchen Display System (KDS) to cut ticket errors\n- QR and tableside ordering with low or zero commission\n- Multi-outlet management from one dashboard\n- Transparent pricing with no hidden transaction fees\n\n## Why offline-first matters in India\nPower cuts and patchy internet are real. A POS that keeps billing offline and syncs automatically when reconnected prevents lost sales and long queues.\n\n## Commission-free direct orders\nAggregators charge heavy commissions. Running your own QR and online storefront lets you keep 100% of direct-order revenue and own the customer relationship.\n\n## How DIYNEZA fits\nDIYNEZA brings POS & billing, inventory, KDS, QR ordering and multi-outlet reporting into a single platform — with offline-first billing and a 45-day free trial, no credit card required.\n\n## Final checklist\n- Does it work offline?\n- Is inventory recipe-based and real-time?\n- Are direct orders commission-free?\n- Can it scale to multiple outlets?\n- Is onboarding fast (under 24 hours)?',
  'Operations',
  'January 5, 2026',
  true,
  'Meghansh Agarwal',
  'Founder & CEO',
  '/images/logo-mark.png',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200&h=630'
),
(
  'reduce-food-cost-restaurant',
  'How to Reduce Food Cost in Your Restaurant (Without Cutting Quality)',
  'Food cost eats into margins fast. Here are practical, data-backed ways to reduce food cost using recipe costing, stock alerts and smarter prep.',
  E'# How to Reduce Food Cost in Your Restaurant\n\nFood cost is one of the biggest controllable expenses in any restaurant. Small leaks — over-portioning, wastage, theft, over-ordering — add up to thousands every month.\n\n## 1. Use recipe-based inventory\nWhen every dish has a recipe card, your system can deduct exact ingredient quantities the moment a bill is settled. You always know true stock and true food cost.\n\n## 2. Set min/max stock alerts\nNever run out, never over-order. Automatic low-stock alerts and purchase orders keep perishables tight.\n\n## 3. Log wastage at the source\nA one-tap wastage button on the POS reveals whether losses come from training, prep or supplier quality.\n\n## 4. Standardize prep with KDS\nDigital kitchen tickets remove duplicate prep and misread modifiers that quietly waste ingredients.\n\n## 5. Use sales data to plan prep\nHistorical sales tell you how much to prep on a slow Tuesday vs a busy Friday — matching kitchen work to real demand.\n\n## The bottom line\nVisibility is everything. With real-time recipe costing and wastage logs (built into DIYNEZA), most restaurants recover a meaningful share of lost margin within the first month.',
  'Inventory',
  'January 18, 2026',
  true,
  'Meghansh Agarwal',
  'Founder & CEO',
  '/images/logo-mark.png',
  'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&q=80&w=1200&h=630'
),
(
  'how-qr-ordering-increases-restaurant-sales',
  'How QR & Tableside Ordering Increases Restaurant Sales',
  'QR ordering speeds up service, raises average order value and frees up staff. Here is how tableside QR ordering grows restaurant revenue.',
  E'# How QR & Tableside Ordering Increases Restaurant Sales\n\nGuests hate waiting — for a menu, to order, and to pay. QR tableside ordering removes that friction and lifts both turnover and average order value.\n\n## Faster table turnover\nGuests scan, browse, order and pay from their phone. Tables clear faster, so you serve more covers in the same hours.\n\n## Higher average order value\nA visual digital menu with upsells and modifiers nudges guests to add that extra side or dessert — consistently.\n\n## Fewer order errors\nOrders flow straight to the kitchen (KDS), so nothing is misread or lost between table and line.\n\n## Commission-free revenue\nUnlike aggregators, direct QR orders carry 0% commission — you keep the full ticket.\n\n## More time for hospitality\nWith ordering and payment offloaded, servers focus on service, not running back and forth with bills.\n\n## Getting started\nDIYNEZA includes QR & tableside ordering that syncs directly to your POS and kitchen — set it up in under a day and start a 45-day free trial.',
  'Growth',
  'February 2, 2026',
  true,
  'Meghansh Agarwal',
  'Founder & CEO',
  '/images/logo-mark.png',
  'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1200&h=630'
)
) AS seed(slug, title, excerpt, content, category, publish_date, published, author_name, author_role, author_avatar, og_image)
WHERE NOT EXISTS (SELECT 1 FROM public.blog_posts bp WHERE bp.slug = seed.slug);
