-- ─────────────────────────────────────────────────────────────────────────
-- DIYNEZA: site_settings table for admin-editable analytics IDs
-- Run this once in the Supabase SQL editor.
-- ─────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.site_settings (
    key        TEXT PRIMARY KEY,
    value      TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can READ settings (the public site needs the analytics IDs to load tags).
DROP POLICY IF EXISTS "Public can read settings" ON public.site_settings;
CREATE POLICY "Public can read settings" ON public.site_settings
    FOR SELECT USING (true);

-- Only logged-in admins can INSERT / UPDATE settings.
DROP POLICY IF EXISTS "Authenticated can manage settings" ON public.site_settings;
CREATE POLICY "Authenticated can manage settings" ON public.site_settings
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Seed the analytics keys (empty by default).
INSERT INTO public.site_settings (key, value) VALUES
    ('ga4_id', ''),
    ('meta_pixel_id', ''),
    ('clarity_id', '')
ON CONFLICT (key) DO NOTHING;
