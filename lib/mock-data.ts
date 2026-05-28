import type { BiblicalFact, ContentBlock, Post } from "./types";

const SAMPLE_AUTHOR = {
  name: "Andre Asoni",
  bio: "Penulis SinnerSaved. Sedang belajar membaca Alkitab dengan jujur dan menulis dengan tertib. Bukan teolog, hanya seorang pendosa yang diselamatkan.",
};

// A reusable rich content body (Phase 3 WYSIWYG will serialize to this shape).
function sampleContent(opening: string): ContentBlock[] {
  return [
    { type: "paragraph", text: opening },
    {
      type: "heading",
      level: 2,
      text: "Membaca dengan tenang",
      id: "membaca-dengan-tenang",
    },
    {
      type: "paragraph",
      text: "Salah satu hal yang saya pelajari pelan-pelan adalah bahwa Alkitab tidak selalu memberi jawaban yang rapi. Ia justru sering memunculkan pertanyaan yang lebih besar dari yang kita bawa di awal. Dan itu bukan kelemahan; itu adalah caranya menarik kita masuk lebih dalam.",
    },
    {
      type: "scripture",
      text: "Sebab firman Allah hidup dan kuat dan lebih tajam daripada pedang bermata dua manapun; ia menusuk amat dalam sampai memisahkan jiwa dan roh, sendi-sendi dan sumsum.",
      reference: "Ibrani 4:12",
    },
    {
      type: "paragraph",
      text: "Saya pikir di sinilah kerendahan hati menjadi alat eksegesis yang penting — sama pentingnya dengan kamus Yunani atau peta sejarah. Kalau kita masuk ke dalam teks dengan asumsi bahwa kita sudah tahu jawabannya, kita akan keluar dengan persis apa yang kita bawa masuk. Tidak lebih.",
    },
    {
      type: "heading",
      level: 2,
      text: "Tiga prinsip kecil",
      id: "tiga-prinsip-kecil",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Baca konteks sebelum baca ayat. Pasal sebelum kalimat. Kitab sebelum pasal.",
        "Tanya: kepada siapa awalnya teks ini ditulis? Apa yang sudah mereka tahu?",
        "Biarkan teks yang sulit tetap sulit dulu — jangan terburu-buru menjinakkannya.",
      ],
    },
    {
      type: "blockquote",
      text: "We need to learn to read the Bible as the Bible, not as a quarry from which to dig out our favorite stones.",
      cite: "Eugene Peterson",
    },
    {
      type: "heading",
      level: 3,
      text: "Catatan sebuah kata",
      id: "catatan-sebuah-kata",
    },
    {
      type: "paragraph",
      text: "Kata Yunani untuk 'kasih karunia' adalah charis (χάρις). Tapi yang menarik bukan etimologinya — yang menarik adalah bagaimana Paulus terus-menerus mengulanginya di hampir setiap pembukaan suratnya, seolah-olah ia takut kita akan lupa.",
    },
    {
      type: "code",
      lang: "Greek",
      caption: "Roma 1:7 dalam Yunani Koine",
      code: "χάρις ὑμῖν καὶ εἰρήνη ἀπὸ θεοῦ πατρὸς ἡμῶν\nκαὶ κυρίου Ἰησοῦ Χριστοῦ.",
    },
    {
      type: "paragraph",
      text: "Charis hymin kai eirēnē — kasih karunia bagimu, dan damai sejahtera. Urutannya selalu sama: kasih karunia dulu. Damai datang sesudahnya, sebagai buah, bukan sebagai prasyarat.",
    },
    { type: "divider" },
    {
      type: "heading",
      level: 2,
      text: "Penutup yang tidak menutup",
      id: "penutup-yang-tidak-menutup",
    },
    {
      type: "paragraph",
      text: "Tulisan ini bukan kesimpulan. Ia lebih seperti kursi kayu di pojok perpustakaan — tempat saya duduk sebentar, mencatat apa yang saya baca, lalu kembali ke rak untuk mencari kitab berikutnya. Saya berharap Anda yang membaca ini juga sedang melakukan hal yang sama, di pojok ruangan Anda sendiri.",
    },
  ];
}

// Phase 1 mock content. Will be replaced by Supabase queries in Phase 3.
export const MOCK_POSTS: Post[] = [
  {
    id: "p1",
    title: "Ketika 'Agape' Tidak Sehalus Kedengarannya",
    slug: "ketika-agape-tidak-sehalus-kedengarannya",
    excerpt:
      "Kita sering menerjemahkan agape sebagai cinta tanpa syarat. Tapi di Yohanes 21, Yesus dan Petrus justru menukar-nukar kata kerja cinta. Apa yang sedang terjadi di sana?",
    cover:
      "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?w=1600&auto=format&fit=crop&q=80",
    mainCategory: "ruang-alkitab",
    subCategory: "makna-kata-asli",
    tags: ["yunani", "yohanes", "kasih"],
    status: "published",
    createdAt: "2026-05-22T09:00:00Z",
    updatedAt: "2026-05-22T09:00:00Z",
    readingMinutes: 7,
    author: SAMPLE_AUTHOR,
    content: sampleContent(
      "Pertama kali saya mendengar khotbah tentang 'agape vs phileo' di Yohanes 21, saya langsung terpesona. Penjelasannya rapi: Yesus tiga kali bertanya 'apakah engkau mengasihi (agape) Aku?', dan Petrus tiga kali menjawab 'aku mengasihi-Mu (phileo).' Lalu di pertanyaan ketiga, Yesus turun ke level Petrus dan memakai phileo juga. Manis sekali. Tapi waktu saya buka teks Yunaninya, ceritanya tidak sesederhana itu."
    ),
  },
  {
    id: "p2",
    title: "Mengapa Penebusan Substitusi Masih Penting",
    slug: "mengapa-penebusan-substitusi-masih-penting",
    excerpt:
      "Setiap generasi mencoba menggeser salib dari pusat. Tapi tanpa substitusi, Injil hanyalah motivasi moral yang sopan.",
    cover:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600&auto=format&fit=crop&q=80",
    mainCategory: "ruang-teologi",
    subCategory: "bedah-doktrin",
    tags: ["soteriologi", "salib"],
    status: "published",
    createdAt: "2026-05-19T09:00:00Z",
    updatedAt: "2026-05-19T09:00:00Z",
    readingMinutes: 11,
    author: SAMPLE_AUTHOR,
    content: sampleContent(
      "Setiap dekade, ada satu generasi teolog yang mencoba menggeser salib dari pusat. Kadang dengan alasan pastoral — 'gambar Allah yang menghukum Anak-Nya itu kejam' — kadang dengan alasan filosofis. Saya mengerti niatnya. Tapi saya tetap belum yakin kita bisa kehilangan substitusi tanpa juga kehilangan Injil itu sendiri."
    ),
  },
  {
    id: "p3",
    title: "Bonhoeffer dan Harga Sebuah Kasih Karunia",
    slug: "bonhoeffer-dan-harga-sebuah-kasih-karunia",
    excerpt:
      "Sebuah biografi singkat tentang teolog Jerman yang menulis 'Cost of Discipleship' — dan kemudian membayarnya dengan nyawa.",
    cover:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&auto=format&fit=crop&q=80",
    mainCategory: "ruang-lensa",
    subCategory: "biografi-singkat",
    tags: ["bonhoeffer", "discipleship"],
    status: "published",
    createdAt: "2026-05-15T09:00:00Z",
    updatedAt: "2026-05-15T09:00:00Z",
    readingMinutes: 9,
    author: SAMPLE_AUTHOR,
    content: sampleContent(
      "Dietrich Bonhoeffer menulis Nachfolge — yang kita kenal sebagai The Cost of Discipleship — di tahun 1937. Ia berusia 31. Tujuh tahun kemudian, ia digantung di kamp Flossenbürg, dua minggu sebelum kamp itu dibebaskan oleh tentara Sekutu. Saya tidak bisa membaca bukunya tanpa mengingat ujung kalimat hidupnya."
    ),
  },
  {
    id: "p4",
    title: "Saya Berdoa, Tapi Langit Diam",
    slug: "saya-berdoa-tapi-langit-diam",
    excerpt:
      "Catatan kecil dari sebuah malam yang panjang — ketika doa terasa seperti berbicara ke langit-langit kamar.",
    mainCategory: "sinners-note",
    subCategory: "refleksi",
    tags: ["doa", "kekeringan rohani"],
    status: "published",
    createdAt: "2026-05-12T09:00:00Z",
    updatedAt: "2026-05-12T09:00:00Z",
    readingMinutes: 4,
    author: SAMPLE_AUTHOR,
    content: sampleContent(
      "Pukul dua pagi. Saya berdoa, tapi rasanya seperti berbicara ke langit-langit kamar. Tidak ada gema, tidak ada hangat, tidak ada apa-apa. Saya bertanya pada diri sendiri: apakah Allah sedang diam, atau saya yang sudah lupa bagaimana cara mendengar?"
    ),
  },
  {
    id: "p5",
    title: "Yerusalem di Abad Pertama: Kota yang Dilihat Yesus",
    slug: "yerusalem-abad-pertama",
    excerpt:
      "Sebelum membaca Injil seperti dongeng modern, kita perlu mencium debu jalanan Yerusalem yang sesak — pajak, Romawi, dan harapan mesianis.",
    cover:
      "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=1600&auto=format&fit=crop&q=80",
    mainCategory: "ruang-alkitab",
    subCategory: "sejarah-budaya",
    tags: ["yerusalem", "konteks"],
    status: "published",
    createdAt: "2026-05-08T09:00:00Z",
    updatedAt: "2026-05-08T09:00:00Z",
    readingMinutes: 8,
    author: SAMPLE_AUTHOR,
    content: sampleContent(
      "Kita sering membayangkan Yerusalem di zaman Yesus seperti latar drama Natal anak Sekolah Minggu — bersih, sunyi, dan agak sepia. Tapi Yerusalem abad pertama adalah kota yang sesak, sengit, dan secara politik genting. Sebuah kota yang sedang diduduki, dan rakyatnya tahu itu setiap kali mereka berjumpa tentara Romawi di tikungan jalan."
    ),
  },
  {
    id: "p6",
    title: "Apologetika yang Tidak Berteriak",
    slug: "apologetika-yang-tidak-berteriak",
    excerpt:
      "Membela iman bukan tentang menang argumen di kolom komentar. Ini tentang menjawab dengan lemah lembut dan hormat — 1 Petrus 3:15.",
    cover:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&auto=format&fit=crop&q=80",
    mainCategory: "ruang-teologi",
    subCategory: "apologetics",
    tags: ["apologetika", "komunikasi"],
    status: "published",
    createdAt: "2026-05-05T09:00:00Z",
    updatedAt: "2026-05-05T09:00:00Z",
    readingMinutes: 6,
    author: SAMPLE_AUTHOR,
    content: sampleContent(
      "Petrus menulis 'siap sedia memberi pertanggungan jawab kepada tiap-tiap orang yang meminta pertanggungan jawab dari kamu tentang pengharapan yang ada padamu' — lalu, hampir tidak ada yang mengutip lanjutannya — 'tetapi haruslah dengan lemah lembut dan hormat.' Apologetika yang baik bukan hanya tentang argumen yang benar; ia juga tentang cara menyampaikan yang manusiawi."
    ),
  },
  {
    id: "p7",
    title: "Filter, Performance, dan Citra Allah",
    slug: "filter-performance-dan-citra-allah",
    excerpt:
      "Era media sosial menjual versi terbaik dari diri kita. Tapi Injil justru memulai dari versi terburuk — dan tetap menyebut kita berharga.",
    cover:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1600&auto=format&fit=crop&q=80",
    mainCategory: "ruang-lensa",
    subCategory: "lensa-injil-budaya",
    tags: ["budaya digital", "imago dei"],
    status: "published",
    createdAt: "2026-05-02T09:00:00Z",
    updatedAt: "2026-05-02T09:00:00Z",
    readingMinutes: 7,
    author: SAMPLE_AUTHOR,
    content: sampleContent(
      "Setiap aplikasi yang kita buka pagi ini meminta hal yang sama dari kita: tampilkan versi yang lebih bersih dari dirimu. Lebih cerah, lebih percaya diri, lebih sukses. Filter bukan hanya menutupi pori-pori — ia juga, secara halus, menutupi anugerah."
    ),
  },
  {
    id: "p8",
    title: "Catatan: Hari Ketika Saya Berhenti Berpura-pura",
    slug: "hari-ketika-saya-berhenti-berpura-pura",
    excerpt:
      "Iman saya dulu rapi. Lalu rapuh. Lalu jujur. Sebuah catatan tentang bagaimana saya akhirnya berhenti memakai topeng di hadapan Allah.",
    mainCategory: "sinners-note",
    subCategory: "catatan",
    tags: ["kejujuran", "pertobatan"],
    status: "published",
    createdAt: "2026-04-29T09:00:00Z",
    updatedAt: "2026-04-29T09:00:00Z",
    readingMinutes: 5,
    author: SAMPLE_AUTHOR,
    content: sampleContent(
      "Iman saya dulu sangat rapi. Saya tahu jawaban yang benar untuk hampir setiap pertanyaan; saya bisa mengutip ayat di tempat yang tepat; doa saya tersusun seperti sketsa pidato. Lalu hidup terjadi, dan semua kerapian itu rontok satu per satu. Yang tersisa, akhirnya, adalah doa yang sangat pendek: 'Tuhan, kasihanilah aku.'"
    ),
  },
  {
    id: "p9",
    title: "Roma 9: Ayat yang Membuat Banyak Orang Pulang",
    slug: "roma-9-ayat-yang-membuat-banyak-orang-pulang",
    excerpt:
      "Predestinasi, bejana kemurkaan, dan kedaulatan Allah. Pasal yang tidak ramah untuk dipajang — tapi kita tetap harus membacanya.",
    cover:
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1600&auto=format&fit=crop&q=80",
    mainCategory: "ruang-alkitab",
    subCategory: "ayat-ayat-sulit",
    tags: ["roma", "kedaulatan"],
    status: "published",
    createdAt: "2026-04-25T09:00:00Z",
    updatedAt: "2026-04-25T09:00:00Z",
    readingMinutes: 12,
    author: SAMPLE_AUTHOR,
    content: sampleContent(
      "Kalau Anda membaca Roma satu kali dalam satu duduk — yang sebenarnya cara Paulus mengharapkan suratnya dibaca — Anda akan sampai di pasal 9 dengan kepala sedikit pusing. Argumennya berat, kalimatnya panjang, dan implikasinya tidak ramah untuk PR Sekolah Minggu."
    ),
  },
];

export function getFeaturedPosts(limit = 5): Post[] {
  return [...MOCK_POSTS]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, limit);
}

export function getPostsByCategory(slug: string, limit?: number): Post[] {
  const filtered = MOCK_POSTS.filter((p) => p.mainCategory === slug).sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
}

export function getPostsByCategoryAndSub(
  main: string,
  sub: string | null
): Post[] {
  const all = getPostsByCategory(main);
  if (!sub) return all;
  return all.filter((p) => p.subCategory === sub);
}

export function getPostBySlug(slug: string): Post | undefined {
  return MOCK_POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  return MOCK_POSTS.filter(
    (p) => p.id !== post.id && p.mainCategory === post.mainCategory
  )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, limit);
}

export const BIBLICAL_FACTS: BiblicalFact[] = [
  {
    id: "bf1",
    question: "Berapa lama Nuh membangun bahtera?",
    answer:
      "Tradisi rabinik dan beberapa penafsir Kristen menghitung sekitar 75–120 tahun, walau Alkitab tidak menyebut angka pasti — yang pasti, sangat lama, dan ditertawakan tetangganya.",
    reference: "Kejadian 6:3, 6:14",
  },
  {
    id: "bf2",
    question: "Apa kata Yunani untuk 'kasih karunia'?",
    answer:
      "Charis (χάρις) — bukan sekadar 'pemberian gratis', tapi kemurahan yang sengaja diberikan kepada yang tidak layak menerimanya.",
    reference: "Efesus 2:8",
  },
  {
    id: "bf3",
    question: "Berapa kitab dalam Perjanjian Lama Ibrani?",
    answer:
      "24 kitab dalam pembagian Tanakh (TaNaKh: Torah, Nevi'im, Ketuvim) — meski isinya identik dengan 39 kitab PL Kristen, hanya pembagiannya yang berbeda.",
    reference: "Lukas 24:44",
  },
  {
    id: "bf4",
    question: "Siapa orang yang paling lama hidup dalam Alkitab?",
    answer:
      "Metusalah, kakek Nuh — 969 tahun. Namanya berarti kira-kira 'ketika ia mati, ia akan dikirim' — dan tahun kematiannya bertepatan dengan air bah.",
    reference: "Kejadian 5:27",
  },
  {
    id: "bf5",
    question: "Apa arti 'Imanuel'?",
    answer:
      "Dari Ibrani: Immanu (bersama kita) + El (Allah) = 'Allah beserta kita'. Bukan janji jarak jauh, tapi kehadiran yang dekat dan menjelma.",
    reference: "Yesaya 7:14, Matius 1:23",
  },
  {
    id: "bf6",
    question: "Berapa kali kata 'jangan takut' muncul di Alkitab?",
    answer:
      "Sekitar 365 kali dalam berbagai variasi — sering dikutip sebagai 'satu untuk setiap hari', meski perhitungannya tergantung versi terjemahan.",
    reference: "Yesaya 41:10",
  },
];
