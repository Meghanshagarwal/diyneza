-- ─────────────────────────────────────────────────────────────────────────
-- DIYNEZA: founders table (admin-editable founder bios, photos, social links)
-- Run this once in the Supabase SQL editor.
-- ─────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.founders (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name          TEXT NOT NULL,
    role          TEXT,
    bio           TEXT,
    image         TEXT,          -- public image URL
    linkedin      TEXT,
    twitter       TEXT,
    github        TEXT,
    display_order INT DEFAULT 0,
    created_at    TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.founders ENABLE ROW LEVEL SECURITY;

-- Public can read founders (used on the About page + schema).
DROP POLICY IF EXISTS "Public can read founders" ON public.founders;
CREATE POLICY "Public can read founders" ON public.founders
    FOR SELECT USING (true);

-- Only logged-in admins can manage founders.
DROP POLICY IF EXISTS "Authenticated can manage founders" ON public.founders;
CREATE POLICY "Authenticated can manage founders" ON public.founders
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Seed the two founders.
INSERT INTO public.founders (name, role, bio, image, linkedin, twitter, github, display_order)
SELECT * FROM (VALUES
  (
    'Meghansh Agarwal',
    'Founder & CEO',
    'Meghansh Agarwal is the founder of DIYNEZA, a unified restaurant management platform. He builds technology that helps restaurants run POS, inventory, kitchen operations, and multi-outlet management from a single system.',
    '/images/logo-mark.png',
    'https://www.linkedin.com/in/meghanshagarwal',
    'https://twitter.com/meghanshagarwal',
    'https://github.com/Meghanshagarwal',
    1
  ),
  (
    'Roop Jaiswal',
    'Co-Founder',
    'Roop Jaiswal is the co-founder of DIYNEZA. He leads product and operations, focused on building reliable, restaurant-grade software that scales from a single outlet to large multi-brand chains.',
    '/images/logo-mark.png',
    'https://www.linkedin.com/in/roopjaiswal',
    'https://twitter.com/roopjaiswal',
    '',
    2
  )
) AS seed(name, role, bio, image, linkedin, twitter, github, display_order)
WHERE NOT EXISTS (SELECT 1 FROM public.founders);
