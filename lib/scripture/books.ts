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
