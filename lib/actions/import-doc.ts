"use server";

import Groq from "groq-sdk";
import { generateJSON } from "@tiptap/html";
import { CATEGORIES } from "@/lib/categories";
import { buildExtensions } from "@/lib/editor/extensions";
import { renderTiptapToHtml } from "@/lib/editor/render-html";
import { requireAdmin } from "@/lib/actions/posts";

// User-selected model: Llama 4 Scout via Groq — larger token-per-minute
// limit (30k TPM on free tier) than gpt-oss-120b, so we can handle longer
// documents.
const MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";
const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_TEXT = 48_000; // cap characters sent to the model (~12k tokens)
const MAX_OUTPUT = 8000; // reserved output tokens

const DOCX_TYPE =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export type ImportDocResult = {
  title?: string;
  excerpt?: string;
  contentJson?: unknown;
  contentHtml?: string;
  mainCategory?: string;
  subCategory?: string;
  tags?: string[];
  error?: string;
};

function getClient() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY belum dikonfigurasi.");
  return new Groq({ apiKey });
}

/** Extract plain text from the uploaded document by file type. */
async function extractText(file: File): Promise<string> {
  const name = file.name.toLowerCase();
  const buffer = Buffer.from(await file.arrayBuffer());

  if (file.type === DOCX_TYPE || name.endsWith(".docx")) {
    // Dynamic import so a load failure surfaces as a caught error rather than
    // breaking the whole server action module at import time.
    const mammoth = (await import("mammoth")).default;
    const { value } = await mammoth.extractRawText({ buffer });
    return value;
  }
  if (file.type === "application/pdf" || name.endsWith(".pdf")) {
    // Import pdf-parse's internal entry to skip the debug harness in its index.
    const pdf = (await import("pdf-parse/lib/pdf-parse.js")).default;
    const { text } = await pdf(buffer);
    return text;
  }
  if (name.endsWith(".txt") || name.endsWith(".md") || file.type.startsWith("text/")) {
    return buffer.toString("utf-8");
  }
  throw new Error("Tipe file tidak didukung. Gunakan .docx, .pdf, .txt, atau .md.");
}

/** Build a readable taxonomy list so the model returns valid slugs. */
function categoryGuide(): string {
  return CATEGORIES.map((c) => {
    const subs = c.subcategories.map((s) => `${s.slug} (${s.name})`).join(", ");
    return `- ${c.slug} (${c.name}) → sub-kategori: ${subs}`;
  }).join("\n");
}

export async function importDocumentAction(
  formData: FormData
): Promise<ImportDocResult> {
  try {
    await requireAdmin();
  } catch (e) {
    return { error: (e as Error).message };
  }

  const file = formData.get("file");
  if (!(file instanceof File)) return { error: "Tidak ada file yang dikirim." };
  if (file.size > MAX_SIZE) return { error: "Ukuran file terlalu besar (maks 10MB)." };

  let rawText: string;
  try {
    rawText = (await extractText(file)).trim();
  } catch (e) {
    return { error: (e as Error).message || "Gagal membaca isi dokumen." };
  }
  if (!rawText) {
    return { error: "Dokumen kosong atau teksnya tidak bisa diekstrak." };
  }

  try {
    const client = getClient();

    const prompt = `Kamu adalah asisten editor untuk blog Kristen bernama SinnerSaved.
Ubah isi dokumen berikut menjadi sebuah artikel yang siap dipublikasikan.

Pilih kategori & sub-kategori HANYA dari daftar slug berikut (sub-kategori harus milik kategori yang dipilih):
${categoryGuide()}

Kembalikan HANYA JSON valid dengan struktur:
{
  "title": "judul ringkas & menarik (Bahasa Indonesia)",
  "excerpt": "ringkasan 1-2 kalimat",
  "content_html": "isi artikel sebagai HTML",
  "main_category": "slug kategori utama",
  "sub_category": "slug sub-kategori",
  "tags": ["tag1", "tag2", "..."]
}

Aturan content_html: HANYA gunakan tag <h2>, <h3>, <p>, <ul>, <ol>, <li>, <blockquote>, <strong>, <em>, <a>, <code>, <br>. Jangan pakai <h1>, atribut style, atau gambar. Rapikan menjadi paragraf & heading yang baik. Jangan menambah informasi yang tidak ada di dokumen. Gunakan Bahasa Indonesia.
tags: 5-8 tag relevan, huruf kecil, singkat.

ISI DOKUMEN:
"""
${rawText.slice(0, MAX_TEXT)}
"""`;

    const res = await client.chat.completions.create({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: MAX_OUTPUT,
      response_format: { type: "json_object" },
    });

    const raw = res.choices[0]?.message?.content?.trim() ?? "";
    if (!raw) return { error: "AI tidak mengembalikan hasil." };

    let parsed: {
      title?: string;
      excerpt?: string;
      content_html?: string;
      main_category?: string;
      sub_category?: string;
      tags?: unknown;
    };
    try {
      parsed = JSON.parse(raw);
    } catch {
      return { error: "Format respons AI tidak valid." };
    }

    // Validate category / sub-category against the taxonomy (fallback safely).
    const mainCat =
      CATEGORIES.find((c) => c.slug === parsed.main_category) ?? CATEGORIES[0];
    const subCat =
      mainCat.subcategories.find((s) => s.slug === parsed.sub_category) ??
      mainCat.subcategories[0];

    const tags = Array.isArray(parsed.tags)
      ? parsed.tags
          .map((t) => String(t).toLowerCase().trim())
          .filter(Boolean)
          .slice(0, 8)
      : [];

    // HTML → Tiptap JSON (same extensions as the editor), then re-render
    // canonical HTML for the EN translation step.
    const html = parsed.content_html ?? "";
    let contentJson: unknown = {};
    try {
      contentJson = generateJSON(html, buildExtensions());
    } catch (e) {
      console.warn("[import-doc] generateJSON failed:", (e as Error).message);
      contentJson = {};
    }
    const contentHtml = renderTiptapToHtml(contentJson);

    return {
      title: parsed.title?.trim() ?? "",
      excerpt: parsed.excerpt?.trim() ?? "",
      contentJson,
      contentHtml,
      mainCategory: mainCat.slug,
      subCategory: subCat?.slug ?? "",
      tags,
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Gagal memproses dokumen dengan AI.";
    // Groq free-tier token-per-minute limit.
    if (/rate_limit|too large|tokens per minute|TPM|413/i.test(msg)) {
      return {
        error:
          "Dokumen terlalu panjang untuk kuota AI saat ini. Coba dokumen yang lebih pendek, atau tunggu ±1 menit lalu coba lagi.",
      };
    }
    return { error: msg };
  }
}
