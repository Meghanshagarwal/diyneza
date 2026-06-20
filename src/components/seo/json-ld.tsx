/**
 * Renders a JSON-LD <script> tag. Server-renderable (no client JS) so structured
 * data is present in the initial HTML for crawlers and AI systems.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
