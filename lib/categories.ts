import type { MainCategory } from "./types";

export const CATEGORIES: MainCategory[] = [
  {
    slug: "ruang-alkitab",
    name: "Bacaan & Teks",
    tagline: "Baca pelan-pelan, satu ayat demi satu ayat.",
    blurb:
      "Bacaan Alkitab dari teks, konteks, sampai bahasa aslinya. Pelan-pelan saja, yang penting masuk.",
    nameEn: "Reading & Text",
    taglineEn: "Read slowly, one verse at a time.",
    blurbEn:
      "Reading Scripture from the text, the context, and its original language. Slowly, but it sinks in.",
    subcategories: [
      { slug: "tokoh-alkitab", name: "Tokoh Alkitab", nameEn: "Biblical Characters" },
      { slug: "biblical-facts", name: "Fakta Alkitab", nameEn: "Biblical Facts" },
      { slug: "sejarah-budaya", name: "Sejarah & Budaya", nameEn: "History & Culture" },
      { slug: "makna-kata-asli", name: "Makna Kata Asli", nameEn: "Original Word Meaning" },
      { slug: "di-balik-ayat", name: "Di Balik Ayat", nameEn: "Behind the Verse" },
      { slug: "ayat-ayat-sulit", name: "Ayat-ayat Sulit", nameEn: "Difficult Passages" },
    ],
  },
  {
    slug: "ruang-teologi",
    name: "Kebenaran Firman",
    tagline: "Mengerti yang kita percaya.",
    blurb:
      "Doktrin, apologetika, dan pertanyaan iman yang sering muncul, ditelusuri pelan-pelan supaya makin kenal Allah dan firman-Nya.",
    nameEn: "The Word's Truth",
    taglineEn: "Knowing what we believe.",
    blurbEn:
      "Doctrine, apologetics, and the questions of faith that keep coming up, worked through slowly so we know God and his word better.",
    subcategories: [
      { slug: "teologi", name: "Teologi", nameEn: "Theology" },
      { slug: "bedah-doktrin", name: "Bedah Doktrin", nameEn: "Doctrine Study" },
      { slug: "apologetics", name: "Apologetika", nameEn: "Apologetics" },
      { slug: "kritik", name: "Telaah", nameEn: "Review" },
    ],
  },
  {
    slug: "ruang-lensa",
    name: "Injil & Budaya",
    tagline: "Injil yang baca dunia.",
    blurb:
      "Melihat budaya, tokoh, dan zaman lewat Injil. Cara lain buat memandang hal-hal yang biasa kita lewatin.",
    nameEn: "Gospel & Culture",
    taglineEn: "The Gospel reading the world.",
    blurbEn:
      "Looking at culture, people, and the times through the Gospel. A different way of seeing what we usually walk past.",
    subcategories: [
      { slug: "lensa-injil-budaya", name: "Lensa Injil & Budaya", nameEn: "Gospel & Culture Lens" },
      { slug: "biografi-singkat", name: "Biografi Singkat", nameEn: "Short Biographies" },
    ],
  },
  {
    slug: "sinners-note",
    name: "Catatan Iman",
    tagline: "Catatan kecil seorang pendosa.",
    blurb:
      "Refleksi jujur dan nggak rapi: iman, kegagalan, dan anugerah yang menemukan saya berulang kali.",
    nameEn: "Notes of Faith",
    taglineEn: "Small notes of a sinner.",
    blurbEn:
      "Honest, unpolished reflections: faith, failure, and the grace that keeps finding me.",
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
