-- 1. Create Types and Enums
CREATE TYPE user_role AS ENUM ('SUPER_ADMIN', 'ADMIN', 'EDITOR');
CREATE TYPE lead_status AS ENUM ('NEW', 'CONTACTED', 'IN_PROGRESS', 'CLOSED');

-- 2. Create Tables
CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'EDITOR',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    status lead_status DEFAULT 'NEW',
    source VARCHAR(100) DEFAULT 'Contact Form',
    notes TEXT,
    assigned_to VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.pricing_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) UNIQUE NOT NULL,
    price_monthly FLOAT NOT NULL,
    price_annual FLOAT NOT NULL,
    description TEXT NOT NULL,
    features TEXT[] NOT NULL,
    popular BOOLEAN DEFAULT false,
    visible BOOLEAN DEFAULT true,
    cta_text VARCHAR(100) DEFAULT 'Start Free Trial'
);

CREATE TABLE public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'Operations',
    publish_date VARCHAR(100) NOT NULL,
    published BOOLEAN DEFAULT false,
    author_name VARCHAR(255) NOT NULL,
    author_role VARCHAR(255) NOT NULL,
    author_avatar TEXT NOT NULL,
    og_image TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INT DEFAULT 0
);

CREATE TABLE public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    restaurant VARCHAR(255) NOT NULL,
    quote TEXT NOT NULL,
    avatar TEXT NOT NULL,
    metric VARCHAR(100) NOT NULL
);

CREATE TABLE public.integrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    logo_type VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL
);

-- 3. Enable Row Level Security (RLS) on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;

-- 4. Create Policies
-- Users policy: only authenticated users can read users list
CREATE POLICY "Allow authenticated users to read users" ON public.users 
    FOR SELECT TO authenticated USING (true);

-- Leads policy: anon insert (public contact form submissions), auth select/update
CREATE POLICY "Allow public insert to leads" ON public.leads 
    FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow authenticated users to manage leads" ON public.leads 
    FOR ALL TO authenticated USING (true);

-- Public tables policy: allow anyone (anon and authenticated) to read content
CREATE POLICY "Allow public select pricing_plans" ON public.pricing_plans FOR SELECT USING (true);
CREATE POLICY "Allow public select blog_posts" ON public.blog_posts FOR SELECT USING (true);
CREATE POLICY "Allow public select faqs" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Allow public select testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public select integrations" ON public.integrations FOR SELECT USING (true);

-- Admin control policy: authenticated users can edit public content
CREATE POLICY "Allow auth all pricing_plans" ON public.pricing_plans FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow auth all blog_posts" ON public.blog_posts FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow auth all faqs" ON public.faqs FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow auth all testimonials" ON public.testimonials FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow auth all integrations" ON public.integrations FOR ALL TO authenticated USING (true);

-- 5. Seed Initial Data
INSERT INTO public.pricing_plans (name, price_monthly, price_annual, description, features, popular, visible, cta_text) VALUES
('Starter', 39, 29, 'Essential billing and inventory tools for small cafes, trucks, and single outlets.', ARRAY['Cloud POS & Fast Billing', 'Menu Management (1 Store)', 'Basic Inventory Sync', 'Sales Reports & Analytics', 'Email & Chat Support (24/7)', 'Max 2 Billing Terminals'], false, true, 'Start Starter Trial'),
('Growth', 99, 79, 'Robust operations management for scaling restaurants, QSR chains, and busy bars.', ARRAY['Everything in Starter', 'Advanced Inventory & Recipes', 'Kitchen Display System (KDS)', 'Direct QR Tableside Ordering', 'Loyalty & CRM campaigns', 'Multi-outlet menu sync', 'Unlimited Terminals'], true, true, 'Start Growth Trial'),
('Enterprise', 0, 0, 'Custom features, dedicated servers, and SLA agreements for multi-location franchises.', ARRAY['Everything in Growth', 'Multi-brand corporate portal', 'Custom third-party integrations', 'Dedicated account manager', 'On-site hardware deployment', '99.9% SLA uptime guarantee'], false, true, 'Contact Enterprise Sales');

INSERT INTO public.faqs (question, answer, display_order) VALUES
('How long does it take to set up DIYNEZA at a restaurant?', 'A standard setup takes less than 24 hours. Our support team helps import your existing menu, inventory list, and recipe catalog into our system, meaning zero operational downtime.', 0),
('Does DIYNEZA work offline if the internet goes down?', 'Yes. Our cloud hybrid architecture guarantees that POS and billing continue working offline. As soon as connectivity is restored, all transactions are securely synced back to the cloud database.', 1),
('Are there any hidden transaction fees or aggregator commissions?', 'None. DIYNEZA operates on a transparent SaaS subscription model. Direct QR tableside orders and direct website deliveries are 100% commission-free.', 2),
('Can I manage permissions for managers and cashiers separately?', 'Absolutely. Our multi-role access control (RBAC) allows you to define custom permissions for cashiers, store managers, kitchen staff, and franchise owners.', 3);

INSERT INTO public.testimonials (name, role, restaurant, quote, avatar, metric) VALUES
('Chef Marco Pierre', 'Founder & Owner', 'L''Etoile Bistro', 'DIYNEZA saved us over 8% in ingredient waste in our first month. The POS is fast, and the recipe costing tool is incredibly precise.', 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=150&h=150', '+8% Food Margin'),
('Siddharth Sen', 'Operations Director', 'Spice Junction Chains', 'Managing 14 outlets was a nightmare of spreadsheet consolidation. Now, changing a menu price across all cities takes exactly 15 seconds.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150', '15s Price Sync'),
('Clara Vance', 'General Manager', 'Glow Juice Cafe', 'Our servers love the table QR ordering. It reduces human error and allows them to focus on hospitality rather than punching bills.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150', '+24% Table Turn');

INSERT INTO public.integrations (name, logo_type, category) VALUES
('Stripe', 'stripe', 'payment'),
('Razorpay', 'razorpay', 'payment'),
('UberEats', 'ubereats', 'delivery'),
('DoorDash', 'doordash', 'delivery'),
('QuickBooks', 'quickbooks', 'accounting'),
('Twilio', 'twilio', 'messaging');

INSERT INTO public.blog_posts (slug, title, excerpt, content, category, publish_date, published, author_name, author_role, author_avatar, og_image) VALUES
('reduce-food-wastage-restaurants', '5 Strategies to Drastically Reduce Food Wastage in QSR Chains', 'Food waste accounts for up to 12% of total operational cost. Learn how recipe costing and stock alerts can fix your margins.', 'Food waste is one of the silent killers... [Markdown Content]', 'Inventory', 'June 12, 2026', true, 'Chef Marco Pierre', 'Culinary Director', 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=150&h=150', 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200&h=630'),
('boost-table-turnover-qr', 'How QR Tableside Ordering Boosts Table Turnover by 24%', 'Discover how self-checkout and digital menus remove friction, allowing servers to serve more guests per hour.', 'In busy cafes and dine-in restaurants... [Markdown Content]', 'Growth', 'June 15, 2026', true, 'Clara Vance', 'Operations Expert', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150', 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1200&h=630');
