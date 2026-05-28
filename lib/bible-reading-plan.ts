type BookEntry = { name: string; chapters: number };

const OT_ID: BookEntry[] = [
  { name: "Kejadian", chapters: 50 },
  { name: "Keluaran", chapters: 40 },
  { name: "Imamat", chapters: 27 },
  { name: "Bilangan", chapters: 36 },
  { name: "Ulangan", chapters: 34 },
  { name: "Yosua", chapters: 24 },
  { name: "Hakim-hakim", chapters: 21 },
  { name: "Rut", chapters: 4 },
  { name: "1 Samuel", chapters: 31 },
  { name: "2 Samuel", chapters: 24 },
  { name: "1 Raja-raja", chapters: 22 },
  { name: "2 Raja-raja", chapters: 25 },
  { name: "1 Tawarikh", chapters: 29 },
  { name: "2 Tawarikh", chapters: 36 },
  { name: "Ezra", chapters: 10 },
  { name: "Nehemia", chapters: 13 },
  { name: "Ester", chapters: 10 },
  { name: "Ayub", chapters: 42 },
  { name: "Mazmur", chapters: 150 },
  { name: "Amsal", chapters: 31 },
  { name: "Pengkhotbah", chapters: 12 },
  { name: "Kidung Agung", chapters: 8 },
  { name: "Yesaya", chapters: 66 },
  { name: "Yeremia", chapters: 52 },
  { name: "Ratapan", chapters: 5 },
  { name: "Yehezkiel", chapters: 48 },
  { name: "Daniel", chapters: 12 },
  { name: "Hosea", chapters: 14 },
  { name: "Yoel", chapters: 3 },
  { name: "Amos", chapters: 9 },
  { name: "Obaja", chapters: 1 },
  { name: "Yunus", chapters: 4 },
  { name: "Mikha", chapters: 7 },
  { name: "Nahum", chapters: 3 },
  { name: "Habakuk", chapters: 3 },
  { name: "Zefanya", chapters: 3 },
  { name: "Hagai", chapters: 2 },
  { name: "Zakharia", chapters: 14 },
  { name: "Maleakhi", chapters: 4 },
];

const NT_ID: BookEntry[] = [
  { name: "Matius", chapters: 28 },
  { name: "Markus", chapters: 16 },
  { name: "Lukas", chapters: 24 },
  { name: "Yohanes", chapters: 21 },
  { name: "Kisah Para Rasul", chapters: 28 },
  { name: "Roma", chapters: 16 },
  { name: "1 Korintus", chapters: 16 },
  { name: "2 Korintus", chapters: 13 },
  { name: "Galatia", chapters: 6 },
  { name: "Efesus", chapters: 6 },
  { name: "Filipi", chapters: 4 },
  { name: "Kolose", chapters: 4 },
  { name: "1 Tesalonika", chapters: 5 },
  { name: "2 Tesalonika", chapters: 3 },
  { name: "1 Timotius", chapters: 6 },
  { name: "2 Timotius", chapters: 4 },
  { name: "Titus", chapters: 3 },
  { name: "Filemon", chapters: 1 },
  { name: "Ibrani", chapters: 13 },
  { name: "Yakobus", chapters: 5 },
  { name: "1 Petrus", chapters: 5 },
  { name: "2 Petrus", chapters: 3 },
  { name: "1 Yohanes", chapters: 5 },
  { name: "2 Yohanes", chapters: 1 },
  { name: "3 Yohanes", chapters: 1 },
  { name: "Yudas", chapters: 1 },
  { name: "Wahyu", chapters: 22 },
];

const OT_EN: BookEntry[] = [
  { name: "Genesis", chapters: 50 },
  { name: "Exodus", chapters: 40 },
  { name: "Leviticus", chapters: 27 },
  { name: "Numbers", chapters: 36 },
  { name: "Deuteronomy", chapters: 34 },
  { name: "Joshua", chapters: 24 },
  { name: "Judges", chapters: 21 },
  { name: "Ruth", chapters: 4 },
  { name: "1 Samuel", chapters: 31 },
  { name: "2 Samuel", chapters: 24 },
  { name: "1 Kings", chapters: 22 },
  { name: "2 Kings", chapters: 25 },
  { name: "1 Chronicles", chapters: 29 },
  { name: "2 Chronicles", chapters: 36 },
  { name: "Ezra", chapters: 10 },
  { name: "Nehemiah", chapters: 13 },
  { name: "Esther", chapters: 10 },
  { name: "Job", chapters: 42 },
  { name: "Psalms", chapters: 150 },
  { name: "Proverbs", chapters: 31 },
  { name: "Ecclesiastes", chapters: 12 },
  { name: "Song of Solomon", chapters: 8 },
  { name: "Isaiah", chapters: 66 },
  { name: "Jeremiah", chapters: 52 },
  { name: "Lamentations", chapters: 5 },
  { name: "Ezekiel", chapters: 48 },
  { name: "Daniel", chapters: 12 },
  { name: "Hosea", chapters: 14 },
  { name: "Joel", chapters: 3 },
  { name: "Amos", chapters: 9 },
  { name: "Obadiah", chapters: 1 },
  { name: "Jonah", chapters: 4 },
  { name: "Micah", chapters: 7 },
  { name: "Nahum", chapters: 3 },
  { name: "Habakkuk", chapters: 3 },
  { name: "Zephaniah", chapters: 3 },
  { name: "Haggai", chapters: 2 },
  { name: "Zechariah", chapters: 14 },
  { name: "Malachi", chapters: 4 },
];

const NT_EN: BookEntry[] = [
  { name: "Matthew", chapters: 28 },
  { name: "Mark", chapters: 16 },
  { name: "Luke", chapters: 24 },
  { name: "John", chapters: 21 },
  { name: "Acts", chapters: 28 },
  { name: "Romans", chapters: 16 },
  { name: "1 Corinthians", chapters: 16 },
  { name: "2 Corinthians", chapters: 13 },
  { name: "Galatians", chapters: 6 },
  { name: "Ephesians", chapters: 6 },
  { name: "Philippians", chapters: 4 },
  { name: "Colossians", chapters: 4 },
  { name: "1 Thessalonians", chapters: 5 },
  { name: "2 Thessalonians", chapters: 3 },
  { name: "1 Timothy", chapters: 6 },
  { name: "2 Timothy", chapters: 4 },
  { name: "Titus", chapters: 3 },
  { name: "Philemon", chapters: 1 },
  { name: "Hebrews", chapters: 13 },
  { name: "James", chapters: 5 },
  { name: "1 Peter", chapters: 5 },
  { name: "2 Peter", chapters: 3 },
  { name: "1 John", chapters: 5 },
  { name: "2 John", chapters: 1 },
  { name: "3 John", chapters: 1 },
  { name: "Jude", chapters: 1 },
  { name: "Revelation", chapters: 22 },
];

// OT = 929 chapters, NT = 260 chapters
const OT_TOTAL = 929;
const NT_TOTAL = 260;
const YEAR_DAYS = 365;

function buildChapterList(books: BookEntry[]): string[] {
  const list: string[] = [];
  for (const b of books) {
    for (let c = 1; c <= b.chapters; c++) {
      list.push(`${b.name} ${c}`);
    }
  }
  return list;
}

function formatRange(chapters: string[]): string {
  if (chapters.length === 0) return "";
  const groups: { book: string; nums: number[] }[] = [];
  for (const ch of chapters) {
    const i = ch.lastIndexOf(" ");
    const book = ch.slice(0, i);
    const num = parseInt(ch.slice(i + 1));
    const last = groups[groups.length - 1];
    if (last && last.book === book) {
      last.nums.push(num);
    } else {
      groups.push({ book, nums: [num] });
    }
  }
  return groups
    .map((g) =>
      g.nums.length === 1
        ? `${g.book} ${g.nums[0]}`
        : `${g.book} ${g.nums[0]}–${g.nums[g.nums.length - 1]}`
    )
    .join("; ");
}

export type DayReading = {
  ot: string;
  nt: string;
  day: number;
};

export function getDayOfYear(date: Date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.min(Math.floor(diff / 86_400_000), YEAR_DAYS);
}

export function getDayReading(dayOfYear: number, locale = "id"): DayReading {
  const day = Math.max(1, Math.min(dayOfYear, YEAR_DAYS));
  const otBooks = locale === "en" ? OT_EN : OT_ID;
  const ntBooks = locale === "en" ? NT_EN : NT_ID;

  const otChapters = buildChapterList(otBooks);
  const ntChapters = buildChapterList(ntBooks);

  const otStart = Math.floor(((day - 1) * OT_TOTAL) / YEAR_DAYS);
  const otEnd = Math.floor((day * OT_TOTAL) / YEAR_DAYS);
  const otRef = formatRange(otChapters.slice(otStart, otEnd));

  const ntIndex = (day - 1) % NT_TOTAL;
  const ntRef = ntChapters[ntIndex];

  return { ot: otRef, nt: ntRef, day };
}
