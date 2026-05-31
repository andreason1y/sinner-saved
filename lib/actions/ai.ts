"use server";

import Groq from "groq-sdk";
import { createClient } from "@supabase/supabase-js";
import { CATEGORIES } from "@/lib/categories";

// Model: open-source 70B via Groq — update to your preferred model ID
const MODEL = "llama-3.3-70b-versatile";

// Tags allowed in editor content — keep the polish output in sync with the
// Tiptap extension set so nothing gets stripped on render.
const ALLOWED_TAGS =
  "<h2> <h3> <p> <ul> <ol> <li> <blockquote> <strong> <em> <u> <a> <code> <br>";

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

/* ── Suggest Main Category ──────────────────────────────────────────── */

export async function suggestMainCategoryAction(
  title: string,
  excerpt: string
): Promise<{ slug?: string; error?: string }> {
  try {
    const client = getClient();
    const catList = CATEGORIES.map((c) => `- ${c.slug}: ${c.name}`).join("\n");

    const prompt = `Kamu adalah asisten editor untuk blog Kristen bernama SinnerSaved.
Berdasarkan judul dan ringkasan artikel berikut, pilih kategori utama yang paling sesuai.

Kategori yang tersedia:
${catList}

Judul: ${title}
Ringkasan: ${excerpt}

Balas HANYA dengan slug kategori yang dipilih, tanpa penjelasan lain.
Contoh: ruang-alkitab`;

    const res = await client.chat.completions.create({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 20,
    });

    const raw = res.choices[0]?.message?.content?.trim().toLowerCase() ?? "";
    const match = CATEGORIES.find((c) => raw.includes(c.slug));
    if (!match) return { error: "AI tidak dapat menentukan kategori." };
    return { slug: match.slug };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Gagal suggest kategori.";
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

/* ── Polish content (rapikan tulisan) ───────────────────────────────── */

/**
 * Cleans up article HTML without changing its meaning: fixes spelling &
 * punctuation, applies headings / bold / italic / lists / blockquotes using
 * only the tags the editor supports. Returns raw HTML; the client applies it
 * to Tiptap in an undoable way.
 */
export async function polishContentAction(
  contentHtml: string
): Promise<{ html?: string; error?: string }> {
  try {
    const plain = stripHtml(contentHtml);
    if (!plain) return { error: "Konten kosong — tidak ada yang dirapikan." };

    const client = getClient();
    const prompt = `Kamu adalah editor untuk blog Kristen bernama SinnerSaved.
Rapikan HTML artikel berikut TANPA mengubah makna atau menambah informasi baru.
Tugasmu:
- Perbaiki ejaan dan tanda baca (Bahasa Indonesia yang baik dan benar).
- Gunakan heading <h2>/<h3> bila ada bagian/sub-bagian.
- Tebalkan istilah penting dengan <strong>, miringkan istilah asing dengan <em>, garis bawahi seperlunya dengan <u>.
- Susun daftar dengan <ul>/<ol>/<li>, kutipan dengan <blockquote>.
- Pertahankan urutan & isi gagasan asli.

HANYA gunakan tag berikut: ${ALLOWED_TAGS}. Jangan pakai <h1>, atribut style, atau gambar.
Balas HANYA dengan HTML hasil rapikan, tanpa penjelasan, tanpa pembungkus markdown.

HTML ASLI:
"""
${contentHtml.slice(0, 24000)}
"""`;

    const res = await client.chat.completions.create({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 4000,
    });

    let html = res.choices[0]?.message?.content?.trim() ?? "";
    // Strip an accidental ```html fence if the model adds one.
    html = html.replace(/^```[a-z]*\s*/i, "").replace(/```\s*$/i, "").trim();
    if (!html) return { error: "AI tidak mengembalikan hasil." };
    return { html };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Gagal merapikan tulisan.";
    if (/rate_limit|too large|tokens per minute|TPM|413/i.test(msg)) {
      return { error: "Kuota AI sedang penuh. Tunggu ±1 menit lalu coba lagi." };
    }
    return { error: msg };
  }
}

/* ── Generate reader-facing summary (ringkasan), cached in DB ────────── */

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * Returns a short (3–5 sentence) summary of a post in the requested locale,
 * generating it via Groq on first request and caching it on the post row
 * (`summary` / `summary_en`) so subsequent reads are instant. Uses the
 * service-role client so the reader-triggered write bypasses RLS safely.
 */
export async function generateSummaryAction(
  postId: string,
  locale: "id" | "en"
): Promise<{ summary?: string; error?: string }> {
  try {
    const supabase = getServiceClient();
    if (!supabase) return { error: "Database belum dikonfigurasi." };

    const col = locale === "en" ? "summary_en" : "summary";
    const { data: post, error } = await supabase
      .from("posts")
      .select("content_html, content_html_en, summary, summary_en")
      .eq("id", postId)
      .maybeSingle();
    if (error || !post) return { error: "Artikel tidak ditemukan." };

    // Cache hit.
    const cached = (post as Record<string, string | null>)[col];
    if (cached) return { summary: cached };

    const sourceHtml =
      locale === "en" && post.content_html_en
        ? post.content_html_en
        : post.content_html;
    const text = stripHtml(sourceHtml ?? "");
    if (!text) return { error: "Artikel tidak memiliki konten." };

    const client = getClient();
    const prompt =
      locale === "en"
        ? `Summarize the following Christian-blog article in 3-5 clear sentences in English. Capture the main point and key takeaways. Reply with the summary only.\n\nARTICLE:\n"""\n${text.slice(0, 16000)}\n"""`
        : `Ringkas artikel blog Kristen berikut dalam 3-5 kalimat yang jelas (Bahasa Indonesia). Tangkap inti dan poin-poin pentingnya. Balas HANYA dengan ringkasannya.\n\nARTIKEL:\n"""\n${text.slice(0, 16000)}\n"""`;

    const res = await client.chat.completions.create({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
      max_tokens: 500,
    });

    const summary = res.choices[0]?.message?.content?.trim() ?? "";
    if (!summary) return { error: "AI tidak mengembalikan ringkasan." };

    await supabase.from("posts").update({ [col]: summary }).eq("id", postId);
    return { summary };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Gagal membuat ringkasan.";
    if (/rate_limit|too large|tokens per minute|TPM|413/i.test(msg)) {
      return { error: "Kuota AI sedang penuh. Coba lagi sebentar." };
    }
    return { error: msg };
  }
}
