/**
 * Push rewritten article content (content/rewritten_articles/*.html) to Supabase.
 * Only touches content_html, content_json, content_html_en, excerpt, excerpt_en.
 *
 * Usage:
 *   SUPABASE_SERVICE_ROLE_KEY=eyJ... node scripts/push-reworked-content.mjs [--dry-run]
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { generateJSON } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Typography from "@tiptap/extension-typography";

const SUPABASE_URL =
  process.env.SUPABASE_URL || "https://wsvxtxnkanfirwoaevig.supabase.co";
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const DRY = process.argv.includes("--dry-run");

if (!KEY) {
  console.error("SUPABASE_SERVICE_ROLE_KEY belum diisi.");
  process.exit(1);
}

const extensions = [
  StarterKit.configure({ heading: { levels: [2, 3] } }),
  Link.configure({ openOnClick: false, autolink: true }),
  Image.configure({ loading: "lazy" }),
  Typography,
];

const SLUGS = [
  "manusia-dua-bagian-atau-tiga",
  "seks-bukan-sekadar-urusan-pribadi",
  "jauhilah-mereka-itu",
  "tinggallah-di-dalam-aku",
];

const here = dirname(fileURLToPath(import.meta.url));
const dir = join(here, "..", "content", "rewritten_articles");

function makeExcerpt(html) {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const cut = text.slice(0, 190);
  const lastStop = Math.max(cut.lastIndexOf("."), cut.lastIndexOf("?"));
  if (lastStop > 90) return cut.slice(0, lastStop + 1);
  return cut.slice(0, cut.lastIndexOf(" ")) + "...";
}

async function rest(path, opts = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...opts,
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
      ...opts.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`${res.status} ${await res.text()}`);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

for (const slug of SLUGS) {
  const html = readFileSync(join(dir, `${slug}.html`), "utf8");
  const htmlEn = readFileSync(join(dir, `${slug}.en.html`), "utf8");
  const json = generateJSON(html, extensions);
  const payload = {
    content_html: html,
    content_json: json,
    content_html_en: htmlEn,
    excerpt: makeExcerpt(html),
    excerpt_en: makeExcerpt(htmlEn),
  };

  if (DRY) {
    console.log(`[dry] ${slug} -> would PATCH (json nodes: ${json.content?.length})`);
    continue;
  }

  const rows = await rest(`posts?slug=eq.${encodeURIComponent(slug)}&select=slug`);
  if (!rows || rows.length !== 1) {
    console.error(`${slug}: ditemukan ${rows ? rows.length : 0} baris, lewati.`);
    continue;
  }
  await rest(`posts?slug=eq.${encodeURIComponent(slug)}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify(payload),
  });
  console.log(`OK ${slug}`);
}
console.log("Selesai.");
