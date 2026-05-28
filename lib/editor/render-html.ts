import "server-only";
import { generateHTML } from "@tiptap/html";
import { buildExtensions } from "./extensions";
import { slugify } from "@/lib/toc";

/**
 * Tiptap JSON → HTML, then post-process to inject heading ids so the
 * sticky table of contents can target each section.
 */
export function renderTiptapToHtml(json: unknown): string {
  if (!json || typeof json !== "object") return "";
  let html: string;
  try {
    // generateHTML accepts a JSONContent-shaped object.
    html = generateHTML(json as never, buildExtensions());
  } catch (e) {
    console.warn("[editor] generateHTML failed:", (e as Error).message);
    return "";
  }
  return injectHeadingIds(html);
}

function injectHeadingIds(html: string): string {
  return html.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (_match, level, attrs, inner) => {
      // If id already present, leave it alone.
      if (/\bid="/i.test(attrs)) {
        return `<h${level}${attrs}>${inner}</h${level}>`;
      }
      const text = inner.replace(/<[^>]*>/g, "").trim();
      const id = slugify(text);
      const sep = attrs && !attrs.startsWith(" ") ? " " : "";
      return `<h${level} id="${id}"${sep}${attrs}>${inner}</h${level}>`;
    }
  );
}

/**
 * Estimate reading time from the rendered HTML (≈220 words/min).
 */
export function estimateReadingMinutes(html: string): number {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const words = text ? text.split(" ").length : 0;
  return Math.max(1, Math.round(words / 220));
}
