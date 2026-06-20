import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/homepage/navbar";
import { Footer } from "@/components/homepage/footer";
import { createClient } from "@/utils/supabase/server";
import { competitors } from "@/data/competitors";
import { cities } from "@/data/cities";
import { solutionsData } from "@/data/solutions";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Sitemap",
  description: "Browse all DIYNEZA pages — products, solutions, pricing, comparisons, locations and articles.",
  alternates: { canonical: "/sitemap-page" },
};

export default async function HtmlSitemap() {
  let posts: { slug: string; title: string }[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("blog_posts").select("slug, title").eq("published", true);
    posts = data || [];
  } catch {
    /* ignore */
  }

  const groups: { heading: string; links: { name: string; href: string }[] }[] = [
    {
      heading: "Main",
      links: [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "Solutions", href: "/solutions" },
        { name: "Pricing", href: "/pricing" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Journal", href: "/blog" },
      ],
    },
    {
      heading: "Solutions by restaurant type",
      links: solutionsData.map((s) => ({ name: s.title, href: `/solutions/${s.id}` })),
    },
    {
      heading: "Compare alternatives",
      links: [
        { name: "All alternatives", href: "/alternatives" },
        ...competitors.map((c) => ({ name: `${c.name} alternative`, href: `/alternatives/${c.slug}` })),
      ],
    },
    {
      heading: "Restaurant POS by city",
      links: [
        { name: "All cities", href: "/restaurant-pos" },
        ...cities.map((c) => ({ name: c.name, href: `/restaurant-pos/${c.slug}` })),
      ],
    },
    {
      heading: "Articles",
      links: posts.map((p) => ({ name: p.title, href: `/blog/${p.slug}` })),
    },
    {
      heading: "Legal",
      links: [
        { name: "Terms of Service", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-dark-bg text-white py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h1 className="font-heading text-4xl font-extrabold tracking-tight">Sitemap</h1>
          <p className="mt-3 text-sm text-zinc-500">Every page on DIYNEZA, in one place.</p>
          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2">
            {groups.filter((g) => g.links.length > 0).map((g) => (
              <div key={g.heading}>
                <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-primary">{g.heading}</h2>
                <ul className="mt-4 space-y-2">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                        {l.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
