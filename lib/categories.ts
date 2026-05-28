import type { MainCategory } from "./types";

export const CATEGORIES: MainCategory[] = [
  {
    slug: "ruang-alkitab",
    name: "Ruang Alkitab",
    tagline: "Teks. Konteks. Bahasa asli.",
    blurb:
      "Membaca Kitab Suci dari latar sejarah, budaya, dan bahasa aslinya — tanpa kehilangan kehangatan iman.",
    subcategories: [
      { slug: "biblical-facts", name: "Biblical Facts" },
      { slug: "sejarah-budaya", name: "Sejarah & Budaya" },
      { slug: "makna-kata-asli", name: "Makna Kata Asli" },
      { slug: "di-balik-ayat", name: "Di Balik Ayat" },
      { slug: "ayat-ayat-sulit", name: "Ayat-ayat Sulit" },
    ],
  },
  {
    slug: "ruang-teologi",
    name: "Ruang Teologi",
    tagline: "Berpikir dengan tertib di hadapan Allah.",
    blurb:
      "Bedah doktrin, apologetika, dan kritik yang sehat — supaya iman bukan sekadar perasaan, tapi keyakinan yang teruji.",
    subcategories: [
      { slug: "teologi", name: "Teologi" },
      { slug: "bedah-doktrin", name: "Bedah Doktrin" },
      { slug: "apologetics", name: "Apologetics" },
      { slug: "kritik", name: "Kritik" },
    ],
  },
  {
    slug: "ruang-lensa",
    name: "Ruang Lensa",
    tagline: "Injil membaca dunia.",
    blurb:
      "Melihat budaya, tokoh, dan zaman lewat lensa Injil — sebuah cara berbeda untuk memandang yang biasa.",
    subcategories: [
      { slug: "lensa-injil-budaya", name: "Lensa Injil & Budaya" },
      { slug: "biografi-singkat", name: "Biografi Singkat" },
    ],
  },
  {
    slug: "sinners-note",
    name: "Sinner's Note",
    tagline: "Catatan kecil seorang pendosa.",
    blurb:
      "Refleksi yang jujur dan tidak rapi — fragmen-fragmen iman, kegagalan, dan anugerah yang menemukan saya berulang kali.",
    subcategories: [
      { slug: "refleksi", name: "Refleksi" },
      { slug: "catatan", name: "Catatan" },
    ],
  },
];

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}
