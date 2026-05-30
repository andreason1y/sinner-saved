"use server";

import Groq from "groq-sdk";
import { CATEGORIES } from "@/lib/categories";

// Model: open-source 70B via Groq — update to your preferred model ID
const MODEL = "llama-3.3-70b-versatile";

function getClient() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY belum dikonfigurasi.");
  return new Groq({ apiKey });
}

// Strip HTML tags to get plain text for the AI prompt
function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

/* ── Generate Tags ──────────────────────────────────────────────────── */

export async function generateTagsAction(
  title: string,
  excerpt: string,
  mainCategory: string
): Promise<{ tags?: string[]; error?: string }> {
  try {
    const client = getClient();
    const categoryName =
      CATEGORIES.find((c) => c.slug === mainCategory)?.name ?? mainCategory;

    const prompt = `Kamu adalah asisten editor untuk blog Kristen bernama SinnerSaved.
Berdasarkan judul dan ringkasan artikel berikut, buatkan 5–8 tag relevan dalam Bahasa Indonesia.
Tag harus spesifik, singkat (1-3 kata), dan berguna untuk navigasi blog bertema iman Kristen.

Kategori: ${categoryName}
Judul: ${title}
Ringkasan: ${excerpt}

Balas HANYA dengan JSON array string, tanpa penjelasan lain.
Contoh: ["charis", "kasih karunia", "efesus", "soteriologi", "paulus"]`;

    const res = await client.chat.completions.create({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
      max_tokens: 200,
    });

    const raw = res.choices[0]?.message?.content?.trim() ?? "";
    // Parse JSON array from response (handle markdown code block wrapping)
    const match = raw.match(/\[[\s\S]*\]/);
    if (!match) return { error: "Format respons AI tidak valid." };
    const tags: string[] = JSON.parse(match[0]);
    return { tags: tags.map((t) => t.toLowerCase().trim()) };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Gagal generate tags.";
    return { error: msg };
  }
}

/* ── Suggest Sub-category ───────────────────────────────────────────── */

export async function suggestSubcategoryAction(
  title: string,
  excerpt: string,
  mainCategory: string
): Promise<{ slug?: string; error?: string }> {
  try {
    const client = getClient();
    const category = CATEGORIES.find((c) => c.slug === mainCategory);
    if (!category) return { error: "Kategori tidak ditemukan." };

    const subList = category.subcategories
      .map((s) => `- ${s.slug}: ${s.name}`)
      .join("\n");

    const prompt = `Kamu adalah asisten editor untuk blog Kristen bernama SinnerSaved.
Berdasarkan judul dan ringkasan artikel, pilih sub-kategori yang paling sesuai dari daftar berikut.

Kategori utama: ${category.name}
Sub-kategori yang tersedia:
${subList}

Judul: ${title}
Ringkasan: ${excerpt}

Balas HANYA dengan slug sub-kategori yang dipilih, tanpa penjelasan lain.
Contoh: ruang-alkitab`;

    const res = await client.chat.completions.create({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 30,
    });

    const raw = res.choices[0]?.message?.content?.trim().toLowerCase() ?? "";
    const match = category.subcategories.find((s) => raw.includes(s.slug));
    if (!match) return { error: "AI tidak dapat menentukan sub-kategori." };
    return { slug: match.slug };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Gagal suggest sub-kategori.";
    return { error: msg };
  }
}
