import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Providers } from "./providers";
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
  title: "DIYNEZA | Unified Restaurant Management Platform",
  description: "Everything your restaurant needs in one platform. Streamline POS & billing, live inventory, KDS, QR ordering, and multi-outlet operations.",
  metadataBase: new URL("https://diyneza.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DIYNEZA | Unified Restaurant Management Platform",
    description: "Manage POS, billing, menu, inventory, table ordering, KDS, and multi-outlet locations with DIYNEZA, the all-in-one restaurant management platform.",
    url: "https://diyneza.com",
    siteName: "DIYNEZA",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DIYNEZA Restaurant Operating System",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DIYNEZA | Unified Restaurant Management Platform",
    description: "Everything your restaurant needs in one platform. Streamline POS & billing, live inventory, KDS, QR ordering, and multi-outlet operations.",
    images: ["/images/og-image.jpg"],
  },
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
        <Providers>
          <div className="w-full overflow-x-hidden flex flex-col min-h-screen relative">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
