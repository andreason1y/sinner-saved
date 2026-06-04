import { NextResponse } from "next/server";
import { USFM_BY_NAME } from "@/lib/scripture/books";
import { getVerse, normalizeRef } from "@/lib/scripture/verses";

/**
 * Verse-text proxy.
 *
 * Why a server route (not a direct client fetch)?
 *  - Fetching happens server-side (on Vercel), so there are no CORS issues
 *    with the upstream Bible API.
 *  - The client just calls same-origin `/api/scripture?ref=...`.
 *  - We can auto-discover the Indonesian translation code at runtime, so no
 *    brittle hardcoded id is needed.
 *
 * Locale-aware via ?lang=id|en (default id):
 *  - id: curated local dataset first (instant, hand-verified), then the
 *    upstream Indonesian translation (auto-discovered; override
 *    BIBLE_TRANSLATION).
 *  - en: upstream English translation (default BSB; override
 *    BIBLE_TRANSLATION_EN). The curated dataset is Indonesian-only, so it is
 *    skipped for en.
 *  On any failure → 404, and the client falls back to the SABDA link.
 *
 * This route NEVER throws: every upstream interaction is guarded so a bad
 * response can only degrade to the link fallback, never a 500.
 */

export const revalidate = 604800; // 7 days

const API_BASE = "https://bible.helloao.org/api";

type ParsedRef = {
  usfm: string;
  chapter: number;
  verseStart: number | null;
  verseEnd: number | null;
};

function parseRef(ref: string): ParsedRef | null {
  const norm = normalizeRef(ref);
  const lastSpace = norm.lastIndexOf(" ");
  if (lastSpace < 0) return null;
  const book = norm.slice(0, lastSpace).trim();
  const cv = norm.slice(lastSpace + 1).trim();
  const usfm = USFM_BY_NAME[book];
  if (!usfm) return null;

  const m = cv.match(/^(\d{1,3})(?::(\d{1,3})(?:-(\d{1,3}))?)?/);
  if (!m) return null;
  const chapter = parseInt(m[1], 10);
  const verseStart = m[2] ? parseInt(m[2], 10) : null;
  const verseEnd = m[3] ? parseInt(m[3], 10) : verseStart;
  return { usfm, chapter, verseStart, verseEnd };
}

// Warm-lambda cache for the resolved Indonesian translation id.
// undefined = not yet resolved, null = none available.
let cachedIndonesian: string | null | undefined;

async function resolveTranslation(lang: string): Promise<string | null> {
  if (lang === "en") {
    // BSB (Berean Standard Bible) is helloao's documented default English
    // translation and is always present.
    return process.env.BIBLE_TRANSLATION_EN || "BSB";
  }

  // Indonesian.
  if (process.env.BIBLE_TRANSLATION) return process.env.BIBLE_TRANSLATION;
  if (cachedIndonesian !== undefined) return cachedIndonesian;

  try {
    const res = await fetch(`${API_BASE}/available_translations.json`, {
      next: { revalidate },
    });
    if (!res.ok) return (cachedIndonesian = null);
    const data: unknown = await res.json();
    const list: any[] = Array.isArray(data)
      ? data
      : (data as any)?.translations ?? [];

    const isIndonesian = (t: any) => {
      const lng = String(t?.language ?? t?.languageCode ?? "").toLowerCase();
      const en = String(
        t?.languageEnglishName ?? t?.languageName ?? ""
      ).toLowerCase();
      return (
        lng === "ind" ||
        lng === "id" ||
        lng.startsWith("id-") ||
        lng.startsWith("ind") ||
        en.includes("indonesia")
      );
    };

    const candidates = list.filter(isIndonesian);
    // Prefer Terjemahan Baru if multiple Indonesian translations exist.
    const tb = candidates.find((t) =>
      /terjemahan baru|(^|[^a-z])tb([^a-z]|$)/i.test(
        `${t?.name ?? ""} ${t?.shortName ?? ""} ${t?.id ?? ""}`
      )
    );
    const chosen = tb ?? candidates[0];
    cachedIndonesian = chosen ? String(chosen.id ?? chosen.shortName) : null;
    return cachedIndonesian;
  } catch {
    return (cachedIndonesian = null);
  }
}

/** Defensively pull plain text out of helloao's verse "content" shape. */
function extractText(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) return content.map(extractText).join(" ");
  if (content && typeof content === "object") {
    const o = content as any;
    if (typeof o.text === "string") return o.text;
    if (o.content != null) return extractText(o.content);
  }
  return "";
}

async function fetchVerseText(p: ParsedRef, lang: string): Promise<string | null> {
  if (p.verseStart == null) return null; // chapter-only is too long for a popover
  const translation = await resolveTranslation(lang);
  if (!translation) return null;

  try {
    const res = await fetch(
      `${API_BASE}/${translation}/${p.usfm}/${p.chapter}.json`,
      { next: { revalidate } }
    );
    if (!res.ok) return null;
    const data: any = await res.json();
    const content = data?.chapter?.content;
    if (!Array.isArray(content)) return null;

    const end = p.verseEnd ?? p.verseStart;
    const parts: string[] = [];
    for (const item of content) {
      if (item?.type !== "verse") continue;
      const num = Number(item.number);
      if (!Number.isFinite(num) || num < p.verseStart || num > end) continue;
      const text = extractText(item.content).trim();
      if (text) parts.push(text);
    }
    const joined = parts.join(" ").replace(/\s+/g, " ").trim();
    return joined || null;
  } catch {
    return null;
  }
}

function withCache(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control":
        "public, s-maxage=604800, stale-while-revalidate=2592000",
    },
  });
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const ref = params.get("ref")?.trim();
  const lang = params.get("lang") === "en" ? "en" : "id";
  if (!ref) {
    return NextResponse.json({ error: "missing ref" }, { status: 400 });
  }

  // 1) Curated local first — instant + hand-verified (Indonesian only).
  if (lang === "id") {
    const local = getVerse(ref);
    if (local) {
      return withCache({ ref: local.ref, text: local.text, source: "local" });
    }
  }

  // 2) Upstream API.
  const parsed = parseRef(ref);
  if (!parsed) {
    return NextResponse.json({ error: "unrecognized ref" }, { status: 404 });
  }
  const text = await fetchVerseText(parsed, lang);
  if (!text) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  return withCache({ ref, text, source: "api", lang });
}
