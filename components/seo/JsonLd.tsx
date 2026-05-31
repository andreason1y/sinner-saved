/**
 * Renders a JSON-LD <script> for structured data. Google uses this to
 * understand the page and may show rich results (article cards, sitelinks
 * search box, etc.). Server component — no client JS shipped.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from trusted server data, not user HTML.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
