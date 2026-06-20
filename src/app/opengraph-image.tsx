import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

// Default Open Graph image for the whole site (applies to every route that does
// not declare its own image). Generated at request/build time so no static
// asset is required.
export const alt = `${siteConfig.name} — Unified Restaurant Management Platform`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0d0d0d 0%, #121212 60%, #1a1a1a 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 34,
            letterSpacing: 10,
            textTransform: "uppercase",
            color: "#FF6B00",
            fontWeight: 700,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.05,
            marginTop: 28,
            maxWidth: 980,
          }}
        >
          Unified Restaurant Management Platform
        </div>
        <div
          style={{
            fontSize: 34,
            color: "#a1a1aa",
            marginTop: 32,
            maxWidth: 940,
          }}
        >
          POS &amp; billing, live inventory, KDS, QR ordering, and multi-outlet
          operations — in one place.
        </div>
      </div>
    ),
    { ...size }
  );
}
