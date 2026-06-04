// Indonesian (Terjemahan Baru) Bible book names + common abbreviations.
// `name` is the canonical display used in the popover and in the outbound
// SABDA reader URL. `aliases` are alternate spellings authors might type.

export type BibleBook = { name: string; aliases: string[] };

export const BIBLE_BOOKS: BibleBook[] = [
  // ── Perjanjian Lama ──
  { name: "Kejadian", aliases: ["Kej"] },
  { name: "Keluaran", aliases: ["Kel"] },
  { name: "Imamat", aliases: ["Im"] },
  { name: "Bilangan", aliases: ["Bil"] },
  { name: "Ulangan", aliases: ["Ul"] },
  { name: "Yosua", aliases: ["Yos"] },
  { name: "Hakim-hakim", aliases: ["Hakim", "Hak"] },
  { name: "Rut", aliases: [] },
  { name: "1 Samuel", aliases: ["1Sam", "1 Sam"] },
  { name: "2 Samuel", aliases: ["2Sam", "2 Sam"] },
  { name: "1 Raja-raja", aliases: ["1Raj", "1 Raj"] },
  { name: "2 Raja-raja", aliases: ["2Raj", "2 Raj"] },
  { name: "1 Tawarikh", aliases: ["1Taw", "1 Taw"] },
  { name: "2 Tawarikh", aliases: ["2Taw", "2 Taw"] },
  { name: "Ezra", aliases: ["Ezr"] },
  { name: "Nehemia", aliases: ["Neh"] },
  { name: "Ester", aliases: ["Est"] },
  { name: "Ayub", aliases: ["Ayb"] },
  { name: "Mazmur", aliases: ["Mzm", "Maz"] },
  { name: "Amsal", aliases: ["Ams"] },
  { name: "Pengkhotbah", aliases: ["Pkh"] },
  { name: "Kidung Agung", aliases: ["Kidung", "Kid"] },
  { name: "Yesaya", aliases: ["Yes"] },
  { name: "Yeremia", aliases: ["Yer"] },
  { name: "Ratapan", aliases: ["Rat"] },
  { name: "Yehezkiel", aliases: ["Yeh"] },
  { name: "Daniel", aliases: ["Dan"] },
  { name: "Hosea", aliases: ["Hos"] },
  { name: "Yoel", aliases: [] },
  { name: "Amos", aliases: [] },
  { name: "Obaja", aliases: ["Ob"] },
  { name: "Yunus", aliases: ["Yun"] },
  { name: "Mikha", aliases: [] },
  { name: "Nahum", aliases: ["Nah"] },
  { name: "Habakuk", aliases: ["Hab"] },
  { name: "Zefanya", aliases: ["Zef"] },
  { name: "Hagai", aliases: ["Hag"] },
  { name: "Zakharia", aliases: ["Zak"] },
  { name: "Maleakhi", aliases: ["Mal"] },
  // ── Perjanjian Baru ──
  { name: "Matius", aliases: ["Mat"] },
  { name: "Markus", aliases: ["Mrk", "Mark"] },
  { name: "Lukas", aliases: ["Luk"] },
  { name: "Yohanes", aliases: ["Yoh"] },
  { name: "Kisah Para Rasul", aliases: ["Kisah", "Kis"] },
  { name: "Roma", aliases: ["Rom"] },
  { name: "1 Korintus", aliases: ["1Kor", "1 Kor"] },
  { name: "2 Korintus", aliases: ["2Kor", "2 Kor"] },
  { name: "Galatia", aliases: ["Gal"] },
  { name: "Efesus", aliases: ["Ef"] },
  { name: "Filipi", aliases: ["Flp", "Fil"] },
  { name: "Kolose", aliases: ["Kol"] },
  { name: "1 Tesalonika", aliases: ["1Tes", "1 Tes"] },
  { name: "2 Tesalonika", aliases: ["2Tes", "2 Tes"] },
  { name: "1 Timotius", aliases: ["1Tim", "1 Tim"] },
  { name: "2 Timotius", aliases: ["2Tim", "2 Tim"] },
  { name: "Titus", aliases: ["Tit"] },
  { name: "Filemon", aliases: ["Flm"] },
  { name: "Ibrani", aliases: ["Ibr"] },
  { name: "Yakobus", aliases: ["Yak"] },
  { name: "1 Petrus", aliases: ["1Ptr", "1 Ptr", "1Pet", "1 Pet"] },
  { name: "2 Petrus", aliases: ["2Ptr", "2 Ptr", "2Pet", "2 Pet"] },
  { name: "1 Yohanes", aliases: ["1Yoh", "1 Yoh"] },
  { name: "2 Yohanes", aliases: ["2Yoh", "2 Yoh"] },
  { name: "3 Yohanes", aliases: ["3Yoh", "3 Yoh"] },
  { name: "Yudas", aliases: ["Yud"] },
  { name: "Wahyu", aliases: ["Why", "Wah"] },
];

/** alias / name (lowercased) → canonical display name */
export const BOOK_LOOKUP: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const book of BIBLE_BOOKS) {
    map[book.name.toLowerCase()] = book.name;
    for (const alias of book.aliases) map[alias.toLowerCase()] = book.name;
  }
  return map;
})();

/** Every token (name + aliases), sorted longest-first for greedy matching. */
export const BOOK_TOKENS: string[] = BIBLE_BOOKS.flatMap((b) => [
  b.name,
  ...b.aliases,
]).sort((a, b) => b.length - a.length);


/**
 * USFM book IDs in canonical 66-book order — index-aligned with BIBLE_BOOKS
 * above, so the mapping stays correct by construction. Used to query external
 * Bible APIs (e.g. helloao) which key chapters by USFM id (GEN, JHN, …).
 */
const USFM_ORDER: string[] = [
  // Perjanjian Lama (39)
  "GEN", "EXO", "LEV", "NUM", "DEU", "JOS", "JDG", "RUT", "1SA", "2SA",
  "1KI", "2KI", "1CH", "2CH", "EZR", "NEH", "EST", "JOB", "PSA", "PRO",
  "ECC", "SNG", "ISA", "JER", "LAM", "EZK", "DAN", "HOS", "JOL", "AMO",
  "OBA", "JON", "MIC", "NAM", "HAB", "ZEP", "HAG", "ZEC", "MAL",
  // Perjanjian Baru (27)
  "MAT", "MRK", "LUK", "JHN", "ACT", "ROM", "1CO", "2CO", "GAL", "EPH",
  "PHP", "COL", "1TH", "2TH", "1TI", "2TI", "TIT", "PHM", "HEB", "JAS",
  "1PE", "2PE", "1JN", "2JN", "3JN", "JUD", "REV",
];

/** canonical Indonesian book name → USFM id (e.g. "Yohanes" → "JHN"). */
export const USFM_BY_NAME: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  BIBLE_BOOKS.forEach((book, i) => {
    if (USFM_ORDER[i]) map[book.name] = USFM_ORDER[i];
  });
  return map;
})();


/**
 * English book names in the same canonical 66-book order, index-aligned with
 * BIBLE_BOOKS. Used to localize a reference label when the UI locale is "en"
 * (e.g. "Mikha 6:8" → "Micah 6:8"). Verse text itself comes from the API.
 */
const ENGLISH_NAMES: string[] = [
  // Old Testament
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua",
  "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings",
  "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job",
  "Psalms", "Proverbs", "Ecclesiastes", "Song of Songs", "Isaiah", "Jeremiah",
  "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah",
  "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah",
  "Malachi",
  // New Testament
  "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians",
  "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians",
  "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus",
  "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John",
  "3 John", "Jude", "Revelation",
];

/** canonical Indonesian book name → English book name. */
export const EN_BOOK_BY_NAME: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  BIBLE_BOOKS.forEach((book, i) => {
    if (ENGLISH_NAMES[i]) map[book.name] = ENGLISH_NAMES[i];
  });
  return map;
})();

/**
 * Localizes a canonical reference's book name for display. The chapter/verse
 * part is left untouched. Non-"en" locales return the reference unchanged.
 */
export function localizeReference(canonical: string, locale: string): string {
  if (locale !== "en") return canonical;
  const lastSpace = canonical.lastIndexOf(" ");
  if (lastSpace < 0) return canonical;
  const book = canonical.slice(0, lastSpace);
  const rest = canonical.slice(lastSpace + 1);
  const en = EN_BOOK_BY_NAME[book];
  return en ? `${en} ${rest}` : canonical;
}
