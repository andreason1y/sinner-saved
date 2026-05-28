import type { MainCategory } from "./types";

export const CATEGORIES: MainCategory[] = [
  {
    slug: "ruang-alkitab",
    name: "Ruang Alkitab",
    tagline: "Teks. Konteks. Bahasa asli.",
    blurb:
      "Membaca Kitab Suci dari latar sejarah, budaya, dan bahasa aslinya — tanpa kehilangan kehangatan iman.",
    nameEn: "Scripture Room",
    taglineEn: "Text. Context. Original tongue.",
    blurbEn:
      "Reading Scripture through its historical, cultural, and original-language context — without losing the warmth of faith.",
    subcategories: [
      { slug: "biblical-facts", name: "Biblical Facts", nameEn: "Biblical Facts" },
      { slug: "sejarah-budaya", name: "Sejarah & Budaya", nameEn: "History & Culture" },
      { slug: "makna-kata-asli", name: "Makna Kata Asli", nameEn: "Original Word Meaning" },
      { slug: "di-balik-ayat", name: "Di Balik Ayat", nameEn: "Behind the Verse" },
      { slug: "ayat-ayat-sulit", name: "Ayat-ayat Sulit", nameEn: "Difficult Passages" },
    ],
  },
  {
    slug: "ruang-teologi",
    name: "Ruang Teologi",
    tagline: "Berpikir dengan tertib di hadapan Allah.",
    blurb:
      "Bedah doktrin, apologetika, dan kritik yang sehat — supaya iman bukan sekadar perasaan, tapi keyakinan yang teruji.",
    nameEn: "Theology Room",
    taglineEn: "Thinking carefully before God.",
    blurbEn:
      "Careful doctrine, apologetics, and healthy critique — so faith is not just feeling, but tested conviction.",
    subcategories: [
      { slug: "teologi", name: "Teologi", nameEn: "Theology" },
      { slug: "bedah-doktrin", name: "Bedah Doktrin", nameEn: "Doctrine Study" },
      { slug: "apologetics", name: "Apologetics", nameEn: "Apologetics" },
      { slug: "kritik", name: "Kritik", nameEn: "Critique" },
    ],
  },
  {
    slug: "ruang-lensa",
    name: "Ruang Lensa",
    tagline: "Injil membaca dunia.",
    blurb:
      "Melihat budaya, tokoh, dan zaman lewat lensa Injil — sebuah cara berbeda untuk memandang yang biasa.",
    nameEn: "Gospel Lens",
    taglineEn: "The Gospel reads the world.",
    blurbEn:
      "Seeing culture, people, and time through the lens of the Gospel — a different way of looking at the familiar.",
    subcategories: [
      { slug: "lensa-injil-budaya", name: "Lensa Injil & Budaya", nameEn: "Gospel & Culture Lens" },
      { slug: "biografi-singkat", name: "Biografi Singkat", nameEn: "Short Biographies" },
    ],
  },
  {
    slug: "sinners-note",
    name: "Sinner's Note",
    tagline: "Catatan kecil seorang pendosa.",
    blurb:
      "Refleksi yang jujur dan tidak rapi — fragmen-fragmen iman, kegagalan, dan anugerah yang menemukan saya berulang kali.",
    nameEn: "Sinner's Note",
    taglineEn: "Small notes of a sinner.",
    blurbEn:
      "Honest and unpolished reflections — fragments of faith, failure, and grace found again and again.",
    subcategories: [
      { slug: "refleksi", name: "Refleksi", nameEn: "Reflection" },
      { slug: "catatan", name: "Catatan", nameEn: "Notes" },
    ],
  },
];

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function localizeCategory(cat: MainCategory, locale: string): MainCategory {
  if (locale !== "en") return cat;
  return {
    ...cat,
    name: cat.nameEn ?? cat.name,
    tagline: cat.taglineEn ?? cat.tagline,
    blurb: cat.blurbEn ?? cat.blurb,
    subcategories: cat.subcategories.map((sub) => ({
      ...sub,
      name: sub.nameEn ?? sub.name,
    })),
  };
}
