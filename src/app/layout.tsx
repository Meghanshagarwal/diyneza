import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Providers } from "./providers";
import { siteConfig } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { globalGraph } from "@/lib/schema";
import { Analytics } from "@/components/analytics/analytics";
import { EngagementTracker } from "@/components/analytics/engagement-tracker";
import { Suspense } from "react";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    // Child pages set only their page name; this appends the brand automatically.
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  openGraph: {
    title: siteConfig.title,
    description:
      "Manage POS, billing, menu, inventory, table ordering, KDS, and multi-outlet locations with DIYNEZA, the all-in-one restaurant management platform.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    // OG/Twitter images are served by the dynamic opengraph-image.tsx /
    // twitter-image.tsx route conventions, so no static file is required.
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#121212",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-dark-bg text-white selection:bg-primary selection:text-black overflow-x-hidden">
        {/* Global entity graph: Organization ↔ Founder (Meghansh Agarwal) ↔ WebSite */}
        <JsonLd data={globalGraph()} />
        <Analytics />
        <Suspense fallback={null}>
          <EngagementTracker />
        </Suspense>
        <Providers>
          <div className="w-full overflow-x-hidden flex flex-col min-h-screen relative">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
