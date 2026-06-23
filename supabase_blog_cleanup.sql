-- ─────────────────────────────────────────────────────────────────────────
-- DIYNEZA: fix blog topical dilution (SEO audit — High severity, Issue 1).
-- Run once in the Supabase SQL editor.
--
-- These developer/engineering posts are off-topic for a restaurant POS domain
-- and dilute topical authority. We UNPUBLISH them (reversible) so they drop out
-- of the sitemap (which filters published = true) and the public blog, without
-- destroying the content. Flip published back to true if ever needed, or DELETE.
-- ─────────────────────────────────────────────────────────────────────────

UPDATE public.blog_posts
SET published = false
WHERE slug IN (
  'model-context-protocol-ai-infrastructure',
  'generative-engine-optimization-ai-search',
  'headless-shopify-nextjs-commerce'
);

-- Catch any other clearly off-topic engineering posts by keyword, just in case
-- more were added with different slugs. Comment out if you want to be strict.
UPDATE public.blog_posts
SET published = false
WHERE published = true
  AND (
    slug ILIKE '%shopify%'
    OR slug ILIKE '%nextjs%'
    OR slug ILIKE '%model-context%'
    OR slug ILIKE '%generative-engine%'
    OR slug ILIKE '%headless%'
  );

-- ── Ensure the 3 restaurant-focused posts exist (idempotent) ───────────────
-- If you haven't already, also run supabase_blog_seed.sql to publish:
--   • best-restaurant-pos-software-india-2026
--   • reduce-food-cost-restaurant
--   • how-qr-ordering-increases-restaurant-sales

-- Verify what remains published:
-- SELECT slug, title, category, published FROM public.blog_posts ORDER BY publish_date DESC;
