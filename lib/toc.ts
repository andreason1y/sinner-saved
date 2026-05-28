import type { TocItem } from "@/components/post/TableOfContents";

/**
 * Walks rendered post HTML and extracts an in-order list of {id, text, level}
 * for headings. Also injects ids on the source HTML if missing — but since
 * we add ids at editor save time (see lib/editor/render-html.ts), we just
 * read them here.
 */
export function extractTocFromHtml(html: string): TocItem[] {
  const items: TocItem[] = [];
  // Regex over the HTML; cheap and fine for the volumes we expect.
  const headingRe = /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi;
  let match: RegExpExecArray | null;
  while ((match = headingRe.exec(html)) !== null) {
    const level = Number(match[1]) as 2 | 3;
    const attrs = match[2] ?? "";
    const inner = match[3] ?? "";
    const idMatch = /\bid="([^"]+)"/i.exec(attrs);
    const text = stripTags(inner).trim();
    if (!text) continue;
    const id = idMatch?.[1] ?? slugify(text);
    items.push({ id, text, level });
  }
  return items;
}

function stripTags(s: string): string {
  return s.replace(/<[^>]*>/g, "");
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}
