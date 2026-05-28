import type { BiblicalFact, Post } from "./types";

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

export function getPostsByCategory(slug: string, limit = 6): Post[] {
  return MOCK_POSTS.filter((p) => p.mainCategory === slug).slice(0, limit);
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
