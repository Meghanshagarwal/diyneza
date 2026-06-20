import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

// Trusted search + AI crawlers we explicitly welcome. Listing them by name makes
// our intent unambiguous and prevents accidental blocking of AI systems.
const ALLOWED_BOTS = [
  "*",
  // Search engines
  "Googlebot",
  "Googlebot-Image",
  "Bingbot",
  "DuckDuckBot",
  "Applebot",
  // AI / LLM crawlers (training + retrieval)
  "Google-Extended", // Gemini / Vertex AI
  "GPTBot", // OpenAI ChatGPT
  "OAI-SearchBot", // ChatGPT Search
  "ChatGPT-User", // ChatGPT browsing
  "ClaudeBot", // Anthropic Claude
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot", // Perplexity
  "Perplexity-User",
  "CCBot", // Common Crawl (feeds many LLMs)
  "Applebot-Extended", // Apple Intelligence
  "Bytespider",
  "Amazonbot",
  "Meta-ExternalAgent", // Meta AI
  "FacebookExternalHit", // Link previews / Meta AI
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: ALLOWED_BOTS.map((userAgent) => ({
      userAgent,
      allow: "/",
      // Keep private/admin and internal API surfaces out of indexes for every bot.
      disallow: ["/admin", "/admin/"],
    })),
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
