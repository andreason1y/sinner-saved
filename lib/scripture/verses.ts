/**
 * Curated verse text (Terjemahan Baru) for the scripture popover and the
 * "Ayat Harian" card.
 *
 * Why curated (not an API): the sandbox has no outbound network to verify a
 * live Bible API, and for a theology site an *inaccurate* verse is worse than
 * no verse. So we ship a hand-verified set of the most commonly cited
 * passages. References NOT in this map keep their existing behaviour
 * (reference label + outbound link to the SABDA reader) — never a guess.
 *
 * Keys are canonical references exactly as produced by `findScriptureRefs`
 * (e.g. "Yohanes 3:16"). Lookups go through `normalizeRef` so en/em dashes
 * and stray whitespace still match.
 */

export type Verse = { ref: string; text: string };

/** Normalize a reference so dash variants + whitespace don't break matching. */
export function normalizeRef(ref: string): string {
  return ref
    .replace(/[\u2012\u2013\u2014\u2015]/g, "-") // figure/en/em dashes → hyphen
    .replace(/\s+/g, " ")
    .trim();
}

const ENTRIES: Verse[] = [
  {
    ref: "Kejadian 1:1",
    text: "Pada mulanya Allah menciptakan langit dan bumi.",
  },
  {
    ref: "Yosua 1:9",
    text: "Bukankah telah Kuperintahkan kepadamu: kuatkan dan teguhkanlah hatimu? Janganlah kecut dan tawar hati, sebab TUHAN, Allahmu, menyertai engkau, ke manapun engkau pergi.",
  },
  {
    ref: "Mazmur 23:1",
    text: "TUHAN adalah gembalaku, takkan kekurangan aku.",
  },
  {
    ref: "Mazmur 23:4",
    text: "Sekalipun aku berjalan dalam lembah kekelaman, aku tidak takut bahaya, sebab Engkau besertaku; gada-Mu dan tongkat-Mu, itulah yang menghibur aku.",
  },
  {
    ref: "Mazmur 27:1",
    text: "TUHAN adalah terangku dan keselamatanku, kepada siapakah aku harus takut? TUHAN adalah benteng hidupku, terhadap siapakah aku harus gentar?",
  },
  {
    ref: "Mazmur 119:105",
    text: "Firman-Mu itu pelita bagi kakiku dan terang bagi jalanku.",
  },
  {
    ref: "Amsal 3:5",
    text: "Percayalah kepada TUHAN dengan segenap hatimu, dan janganlah bersandar kepada pengertianmu sendiri.",
  },
  {
    ref: "Amsal 3:5-6",
    text: "Percayalah kepada TUHAN dengan segenap hatimu, dan janganlah bersandar kepada pengertianmu sendiri. Akuilah Dia dalam segala lakumu, maka Ia akan meluruskan jalanmu.",
  },
  {
    ref: "Yesaya 40:31",
    text: "tetapi orang-orang yang menanti-nantikan TUHAN mendapat kekuatan baru: mereka seumpama rajawali yang naik terbang dengan kekuatan sayapnya; mereka berlari dan tidak menjadi lesu, mereka berjalan dan tidak menjadi lelah.",
  },
  {
    ref: "Yesaya 41:10",
    text: "janganlah takut, sebab Aku menyertai engkau, janganlah bimbang, sebab Aku ini Allahmu; Aku akan meneguhkan, bahkan akan menolong engkau; Aku akan memegang engkau dengan tangan kanan-Ku yang membawa kemenangan.",
  },
  {
    ref: "Yeremia 29:11",
    text: "Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai sejahtera dan bukan rancangan kecelakaan, untuk memberikan kepadamu hari depan yang penuh harapan.",
  },
  {
    ref: "Ratapan 3:22-23",
    text: "Tak berkesudahan kasih setia TUHAN, tak habis-habisnya rahmat-Nya, selalu baru tiap pagi; besar kesetiaan-Mu!",
  },
  {
    ref: "Matius 6:33",
    text: "Tetapi carilah dahulu Kerajaan Allah dan kebenarannya, maka semuanya itu akan ditambahkan kepadamu.",
  },
  {
    ref: "Matius 11:28",
    text: "Marilah kepada-Ku, semua yang letih lesu dan berbeban berat, Aku akan memberi kelegaan kepadamu.",
  },
  {
    ref: "Matius 28:19",
    text: "Karena itu pergilah, jadikanlah semua bangsa murid-Ku dan baptislah mereka dalam nama Bapa dan Anak dan Roh Kudus,",
  },
  {
    ref: "Yohanes 1:1",
    text: "Pada mulanya adalah Firman; Firman itu bersama-sama dengan Allah dan Firman itu adalah Allah.",
  },
  {
    ref: "Yohanes 3:16",
    text: "Karena begitu besar kasih Allah akan dunia ini, sehingga Ia telah mengaruniakan Anak-Nya yang tunggal, supaya setiap orang yang percaya kepada-Nya tidak binasa, melainkan beroleh hidup yang kekal.",
  },
  {
    ref: "Yohanes 8:32",
    text: "dan kamu akan mengetahui kebenaran, dan kebenaran itu akan memerdekakan kamu.",
  },
  {
    ref: "Yohanes 14:6",
    text: "Kata Yesus kepadanya: \u201cAkulah jalan dan kebenaran dan hidup. Tidak ada seorangpun yang datang kepada Bapa, kalau tidak melalui Aku.\u201d",
  },
  {
    ref: "Roma 3:23",
    text: "Karena semua orang telah berbuat dosa dan telah kehilangan kemuliaan Allah,",
  },
  {
    ref: "Roma 5:8",
    text: "Akan tetapi Allah menunjukkan kasih-Nya kepada kita, oleh karena Kristus telah mati untuk kita, ketika kita masih berdosa.",
  },
  {
    ref: "Roma 6:23",
    text: "Sebab upah dosa ialah maut; tetapi karunia Allah ialah hidup yang kekal dalam Kristus Yesus, Tuhan kita.",
  },
  {
    ref: "Roma 8:1",
    text: "Demikianlah sekarang tidak ada penghukuman bagi mereka yang ada di dalam Kristus Yesus.",
  },
  {
    ref: "Roma 8:28",
    text: "Kita tahu sekarang, bahwa Allah turut bekerja dalam segala sesuatu untuk mendatangkan kebaikan bagi mereka yang mengasihi Dia, yaitu bagi mereka yang terpanggil sesuai dengan rencana Allah.",
  },
  {
    ref: "Roma 10:9",
    text: "Sebab jika kamu mengaku dengan mulutmu, bahwa Yesus adalah Tuhan, dan percaya dalam hatimu, bahwa Allah telah membangkitkan Dia dari antara orang mati, maka kamu akan diselamatkan.",
  },
  {
    ref: "Roma 12:2",
    text: "Janganlah kamu menjadi serupa dengan dunia ini, tetapi berubahlah oleh pembaharuan budimu, sehingga kamu dapat membedakan manakah kehendak Allah: apa yang baik, yang berkenan kepada Allah dan yang sempurna.",
  },
  {
    ref: "1 Korintus 13:4",
    text: "Kasih itu sabar; kasih itu murah hati; ia tidak cemburu. Ia tidak memegahkan diri dan tidak sombong.",
  },
  {
    ref: "2 Korintus 5:17",
    text: "Jadi siapa yang ada di dalam Kristus, ia adalah ciptaan baru: yang lama sudah berlalu, sesungguhnya yang baru sudah datang.",
  },
  {
    ref: "Galatia 2:20",
    text: "namun aku hidup, tetapi bukan lagi aku sendiri yang hidup, melainkan Kristus yang hidup di dalam aku. Dan hidupku yang kuhidupi sekarang di dalam daging, adalah hidup oleh iman dalam Anak Allah yang telah mengasihi aku dan menyerahkan diri-Nya untuk aku.",
  },
  {
    ref: "Galatia 5:22",
    text: "Tetapi buah Roh ialah: kasih, sukacita, damai sejahtera, kesabaran, kemurahan, kebaikan, kesetiaan,",
  },
  {
    ref: "Efesus 2:8",
    text: "Sebab karena kasih karunia kamu diselamatkan oleh iman; itu bukan hasil usahamu, tetapi pemberian Allah,",
  },
  {
    ref: "Efesus 2:8-9",
    text: "Sebab karena kasih karunia kamu diselamatkan oleh iman; itu bukan hasil usahamu, tetapi pemberian Allah, itu bukan hasil pekerjaanmu: jangan ada orang yang memegahkan diri.",
  },
  {
    ref: "Filipi 1:6",
    text: "Akan hal ini aku yakin sepenuhnya, yaitu Ia, yang memulai pekerjaan yang baik di antara kamu, akan meneruskannya sampai pada akhirnya pada hari Kristus Yesus.",
  },
  {
    ref: "Filipi 4:6",
    text: "Janganlah hendaknya kamu kuatir tentang apapun juga, tetapi nyatakanlah dalam segala hal keinginanmu kepada Allah dalam doa dan permohonan dengan ucapan syukur.",
  },
  {
    ref: "Filipi 4:13",
    text: "Segala perkara dapat kutanggung di dalam Dia yang memberi kekuatan kepadaku.",
  },
  {
    ref: "Kolose 3:23",
    text: "Apapun juga yang kamu perbuat, perbuatlah dengan segenap hatimu seperti untuk Tuhan dan bukan untuk manusia.",
  },
  {
    ref: "2 Timotius 3:16",
    text: "Segala tulisan yang diilhamkan Allah memang bermanfaat untuk mengajar, untuk menyatakan kesalahan, untuk memperbaiki kelakuan dan untuk mendidik orang dalam kebenaran.",
  },
  {
    ref: "Ibrani 11:1",
    text: "Iman adalah dasar dari segala sesuatu yang kita harapkan dan bukti dari segala sesuatu yang tidak kita lihat.",
  },
  {
    ref: "1 Petrus 5:7",
    text: "Serahkanlah segala kekuatiranmu kepada-Nya, sebab Ia yang memelihara kamu.",
  },
  {
    ref: "1 Yohanes 1:9",
    text: "Jika kita mengaku dosa kita, maka Ia adalah setia dan adil, sehingga Ia akan mengampuni segala dosa kita dan menyucikan kita dari segala kejahatan.",
  },
  {
    ref: "Wahyu 21:4",
    text: "dan Ia akan menghapus segala air mata dari mata mereka, dan maut tidak akan ada lagi; tidak akan ada lagi perkabungan, atau ratap tangis, atau dukacita, sebab segala sesuatu yang lama itu telah berlalu.",
  },

  // ── Ayat yang lebih jarang dikutip — dipakai untuk rotasi "Ayat Hari Ini" ──
  {
    ref: "Ulangan 31:8",
    text: "Sebab TUHAN, Dia sendiri akan berjalan di depanmu, Dia sendiri akan menyertai engkau, Dia tidak akan membiarkan engkau dan tidak akan meninggalkan engkau; janganlah takut dan janganlah patah hati.",
  },
  {
    ref: "Mazmur 37:4",
    text: "dan bergembiralah karena TUHAN; maka Ia akan memberikan kepadamu apa yang diinginkan hatimu.",
  },
  {
    ref: "Mazmur 73:26",
    text: "Sekalipun dagingku dan hatiku habis lenyap, gunung batuku dan bagianku tetaplah Allah selama-lamanya.",
  },
  {
    ref: "Mazmur 90:12",
    text: "Ajarlah kami menghitung hari-hari kami sedemikian, hingga kami beroleh hati yang bijaksana.",
  },
  {
    ref: "Mazmur 139:23-24",
    text: "Selidikilah aku, ya Allah, dan kenallah hatiku, ujilah aku dan kenallah pikiran-pikiranku; lihatlah, apakah jalanku serong, dan tuntunlah aku di jalan yang kekal!",
  },
  {
    ref: "Amsal 16:9",
    text: "Hati manusia memikir-mikirkan jalannya, tetapi Tuhanlah yang menentukan arah langkahnya.",
  },
  {
    ref: "Amsal 18:10",
    text: "Nama TUHAN adalah menara yang kuat, ke sanalah orang benar berlari dan ia menjadi selamat.",
  },
  {
    ref: "Pengkhotbah 3:11",
    text: "Ia membuat segala sesuatu indah pada waktunya, bahkan Ia memberikan kekekalan dalam hati mereka. Tetapi manusia tidak dapat menyelami pekerjaan yang dilakukan Allah dari awal sampai akhir.",
  },
  {
    ref: "Yesaya 26:3",
    text: "Yang hatinya teguh Kaujagai dengan damai sejahtera, sebab kepada-Mulah ia percaya.",
  },
  {
    ref: "Yesaya 43:2",
    text: "Apabila engkau menyeberang melalui air, Aku akan menyertai engkau, atau melalui sungai-sungai, engkau tidak akan dihanyutkan; apabila engkau berjalan melalui api, engkau tidak akan dihanguskan, dan nyala api tidak akan membakar engkau.",
  },
  {
    ref: "Ratapan 3:25-26",
    text: "TUHAN adalah baik bagi orang yang berharap kepada-Nya, bagi jiwa yang mencari Dia. Adalah baik menanti dengan diam pertolongan TUHAN.",
  },
  {
    ref: "Mikha 6:8",
    text: "Hai manusia, telah diberitahukan kepadamu apa yang baik. Dan apakah yang dituntut TUHAN dari padamu: selain berlaku adil, mencintai kesetiaan, dan hidup dengan rendah hati di hadapan Allahmu?",
  },
  {
    ref: "Nahum 1:7",
    text: "TUHAN itu baik; Ia adalah tempat pengungsian pada waktu kesusahan; Ia mengenal orang-orang yang berlindung kepada-Nya.",
  },
  {
    ref: "Habakuk 3:17-18",
    text: "Sekalipun pohon ara tidak berbunga, pohon anggur tidak berbuah, hasil pohon zaitun mengecewakan, sekalipun ladang tidak menghasilkan bahan makanan, kambing domba terhalau dari kurungan, dan tidak ada lembu dalam kandang, namun aku akan bersorak-sorak di dalam TUHAN, beria-ria di dalam Allah yang menyelamatkan aku.",
  },
  {
    ref: "Zefanya 3:17",
    text: "TUHAN Allahmu ada di antaramu sebagai pahlawan yang memberi kemenangan. Ia bergirang karena engkau dengan sukacita, Ia membaharui engkau dalam kasih-Nya, Ia bersorak-sorak karena engkau dengan sukacita.",
  },
  {
    ref: "Roma 12:12",
    text: "Bersukacitalah dalam pengharapan, sabarlah dalam kesesakan, dan bertekunlah dalam doa!",
  },
  {
    ref: "2 Korintus 12:9",
    text: "Tetapi jawab Tuhan kepadaku: \u201cCukuplah kasih karunia-Ku bagimu, sebab justru dalam kelemahanlah kuasa-Ku menjadi sempurna.\u201d Sebab itu terlebih suka aku bermegah atas kelemahanku, supaya kuasa Kristus turun menaungi aku.",
  },
  {
    ref: "Galatia 6:9",
    text: "Janganlah kita jemu-jemu berbuat baik, karena apabila sudah datang waktunya, kita akan menuai, jika kita tidak menjadi lemah.",
  },
  {
    ref: "Kolose 3:2",
    text: "Pikirkanlah perkara yang di atas, bukan yang di bumi.",
  },
  {
    ref: "1 Tesalonika 5:16-18",
    text: "Bersukacitalah senantiasa. Tetaplah berdoa. Mengucap syukurlah dalam segala hal, sebab itulah yang dikehendaki Allah di dalam Kristus Yesus bagi kamu.",
  },
  {
    ref: "Yakobus 1:2-3",
    text: "Anggaplah sebagai suatu kebahagiaan, saudara-saudaraku, apabila kamu jatuh ke dalam berbagai-bagai pencobaan, sebab kamu tahu, bahwa ujian terhadap imanmu itu menghasilkan ketekunan.",
  },
  {
    ref: "Yakobus 1:17",
    text: "Setiap pemberian yang baik dan setiap anugerah yang sempurna, datangnya dari atas, diturunkan dari Bapa segala terang; pada-Nya tidak ada perubahan atau bayangan karena pertukaran.",
  },
  {
    ref: "1 Petrus 2:9",
    text: "Tetapi kamulah bangsa yang terpilih, imamat yang rajani, bangsa yang kudus, umat kepunyaan Allah sendiri, supaya kamu memberitakan perbuatan-perbuatan yang besar dari Dia, yang telah memanggil kamu keluar dari kegelapan kepada terang-Nya yang ajaib.",
  },
];

/** canonical (normalized) → verse */
export const VERSES: Record<string, Verse> = ENTRIES.reduce((acc, v) => {
  acc[normalizeRef(v.ref)] = v;
  return acc;
}, {} as Record<string, Verse>);

/** Returns curated verse text for a reference, or null if not in the set. */
export function getVerse(ref: string): Verse | null {
  return VERSES[normalizeRef(ref)] ?? null;
}

/**
 * Ordered list of references used by the "Ayat Harian" card. Intentionally
 * skips the most over-quoted verses (Yoh 3:16, Maz 23, Flp 4:13, Rm 8:28, …)
 * in favour of deeper cuts. Every entry here MUST exist in VERSES above so the
 * card always has verified local text. A deterministic day-of-year index keeps
 * the verse stable for everyone for the whole day.
 */
export const DAILY_VERSES: string[] = [
  "Mikha 6:8",
  "Zefanya 3:17",
  "Amsal 16:9",
  "Ratapan 3:25-26",
  "Pengkhotbah 3:11",
  "Yesaya 26:3",
  "Mazmur 90:12",
  "Habakuk 3:17-18",
  "2 Korintus 12:9",
  "Mazmur 139:23-24",
  "Yakobus 1:2-3",
  "Amsal 18:10",
  "Nahum 1:7",
  "Roma 12:12",
  "Yesaya 43:2",
  "1 Tesalonika 5:16-18",
  "Ulangan 31:8",
  "Mazmur 37:4",
  "Galatia 6:9",
  "Yakobus 1:17",
  "Mazmur 73:26",
  "Kolose 3:2",
  "1 Petrus 2:9",
];

/** Day-of-year (1–366) in the given date's local time. */
function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 86_400_000);
}

/** Deterministic verse-of-the-day. */
export function getDailyVerse(date = new Date()): Verse {
  const idx = dayOfYear(date) % DAILY_VERSES.length;
  return VERSES[normalizeRef(DAILY_VERSES[idx])] ?? ENTRIES[0];
}
