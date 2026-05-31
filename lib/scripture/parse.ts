import { BOOK_TOKENS, BOOK_LOOKUP } from "./books";

export type ScriptureMatch = {
  /** The exact text as written by the author (kept as the link label). */
  raw: string;
  /** Canonical, normalized reference, e.g. "1 Korintus 13:4-7". */
  canonical: string;
  /** Outbound URL to an Indonesian Bible reader. */
  url: string;
  index: number;
  length: number;
};

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Book token, optional abbreviation dot, whitespace, chapter, then an optional
// verse part: ":12", ":12-14", or comma-separated lists "12,14-16". References
// are conventionally capitalized in Indonesian, so we match case-sensitively
// to avoid linking ordinary lowercase words that collide with a book name.
const REFERENCE_RE = new RegExp(
  `(?<![A-Za-z0-9])(${BOOK_TOKENS.map(escapeRegExp).join("|")})\\.?` +
    `\\s+(\\d{1,3})(:\\d{1,3}(?:[-–—]\\d{1,3})?(?:,\\s?\\d{1,3}(?:[-–—]\\d{1,3})?)*)?`,
  "g"
);

const READER_BASE = "https://alkitab.sabda.org/passage.php?passage=";

export function buildReaderUrl(canonical: string): string {
  return READER_BASE + encodeURIComponent(canonical);
}

/**
 * Finds every Bible reference in a plain string. Returns matches in order,
 * each carrying its position so callers can splice the original text.
 */
export function findScriptureRefs(text: string): ScriptureMatch[] {
  const out: ScriptureMatch[] = [];
  REFERENCE_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = REFERENCE_RE.exec(text)) !== null) {
    const [raw, bookToken, chapter, versePart] = m;
    const canonicalBook = BOOK_LOOKUP[bookToken.toLowerCase()];
    if (!canonicalBook) continue;
    const detail = versePart ? `${chapter}${versePart.replace(/\s/g, "")}` : chapter;
    const canonical = `${canonicalBook} ${detail}`;
    out.push({
      raw,
      canonical,
      url: buildReaderUrl(canonical),
      index: m.index,
      length: raw.length,
    });
  }
  return out;
}
