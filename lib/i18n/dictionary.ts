// Indonesian is the brand voice; English is a secondary surface for UI
// chrome (nav, eyebrows, CTAs). Editorial body copy stays in original lang.

export const LOCALES = ["id", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "id";

type Dict = {
  nav: {
    contact: string;
    search: string;
    openMenu: string;
    closeMenu: string;
    establishment: string;
    light: string;
    dark: string;
  };
  hero: {
    issue: string;
    tagline: string;
    intro: string;
    cta: string;
    explore: string;
  };
  feature: {
    eyebrow: string;
    title: string;
    archive: string;
    readMore: string;
    minutes: string;
    readingTime: (m: number) => string;
  };
  ruangAlkitab: {
    eyebrow: string;
    title: string;
    blurb: string;
    factsLabel: string;
    factsHint: string;
    didYouKnow: string;
    flipBack: string;
    latest: string;
    seeMore: string;
  };
  ruangTeologi: {
    eyebrow: string;
    title: string;
    blurb: string;
  };
  ruangLensa: {
    eyebrow: string;
    title: string;
    blurb: string;
  };
  sinnersNote: {
    eyebrow: string;
    title: string;
    blurb: string;
    sideText: string;
    readNote: string;
  };
  archive: {
    categoryLabel: (count: number) => string;
    all: string;
    emptyTitle: string;
    emptyBody: string;
  };
  post: {
    toc: string;
    backToCategory: string;
    relatedEyebrow: (catName: string) => string;
    relatedTitle: string;
    seeAll: string;
    aboutAuthor: string;
    languageNote: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    blurb: string;
    primaryEmail: string;
    cta: string;
    questions: string;
    feedback: string;
    suggestions: string;
    questionsBody: string;
    feedbackBody: string;
    suggestionsBody: string;
    fullPageTitle: string;
    fullPageIntro: string;
    sendEmail: string;
    or: string;
    closing: string;
  };
  footer: {
    tagline: string;
    builtWith: string;
    glory: string;
    sectionContact: string;
    sectionAbout: string;
  };
};

const id: Dict = {
  nav: {
    contact: "Kontak",
    search: "Cari",
    openMenu: "Buka menu",
    closeMenu: "Tutup menu",
    establishment: "est. 2026",
    light: "Mode terang",
    dark: "Mode gelap",
  },
  hero: {
    issue: "Issue 01 — Mei 2026",
    tagline: "Catatan iman seorang pendosa",
    intro:
      "SinnerSaved adalah tempat saya menulis pelan-pelan — tentang teks Alkitab, doktrin, budaya, dan catatan-catatan jujur seorang pendosa yang diselamatkan oleh kasih karunia.",
    cta: "Mulai membaca",
    explore: "Telusuri kategori →",
  },
  feature: {
    eyebrow: "Terbaru",
    title: "Yang sedang saya pikirkan.",
    archive: "Arsip lengkap →",
    readMore: "Baca tulisan ini",
    minutes: "menit baca",
    readingTime: (m) => `${m} menit baca`,
  },
  ruangAlkitab: {
    eyebrow: "01 / Ruang Alkitab",
    title: "Teks. Konteks. Bahasa asli.",
    blurb:
      "Membaca Kitab Suci dari latar sejarah, budaya, dan bahasa aslinya — tanpa kehilangan kehangatan iman.",
    factsLabel: "Biblical Facts",
    factsHint: "Hover atau klik untuk membuka",
    didYouKnow: "Tahukah kamu?",
    flipBack: "Balik kartu",
    latest: "Tulisan terbaru di Ruang Alkitab",
    seeMore: "Selengkapnya →",
  },
  ruangTeologi: {
    eyebrow: "02 / Ruang Teologi",
    title: "Berpikir dengan tertib di hadapan Allah.",
    blurb:
      "Bedah doktrin, apologetika, dan kritik yang sehat — supaya iman bukan sekadar perasaan, tapi keyakinan yang teruji.",
  },
  ruangLensa: {
    eyebrow: "03 / Ruang Lensa",
    title: "Injil membaca dunia.",
    blurb:
      "Melihat budaya, tokoh, dan zaman lewat lensa Injil — sebuah cara berbeda untuk memandang yang biasa.",
  },
  sinnersNote: {
    eyebrow: "04 / Sinner's Note",
    title: "Catatan kecil seorang pendosa.",
    blurb:
      "Refleksi yang jujur dan tidak rapi — fragmen-fragmen iman, kegagalan, dan anugerah yang menemukan saya berulang kali.",
    sideText: "By a sinner — saved by grace",
    readNote: "Baca catatan →",
  },
  archive: {
    categoryLabel: (count) => `Kategori · ${count} tulisan`,
    all: "Semua",
    emptyTitle: "Belum ada tulisan di sub-kategori ini.",
    emptyBody:
      "Saya menulis pelan-pelan — coba lagi dalam beberapa hari, atau jelajah sub-kategori lain di atas.",
  },
  post: {
    toc: "Daftar isi",
    backToCategory: "Kembali",
    relatedEyebrow: (n) => `Selanjutnya di ${n}`,
    relatedTitle: "Bacaan terkait.",
    seeAll: "Lihat semua →",
    aboutAuthor: "Tentang penulis",
    languageNote:
      "Tulisan ini dalam Bahasa Indonesia. Switch ke ID untuk navigasi yang sesuai.",
  },
  contact: {
    eyebrow: "Kontak",
    title: "Saya senang mendengar dari Anda.",
    blurb:
      "Kritik, saran, dan pertanyaan teologis sangat saya hargai. Tulisan ini ditulis pelan-pelan, dan dialog membuatnya lebih hidup. Kirim email — saya membaca semua, walau membalas mungkin butuh waktu.",
    primaryEmail: "andreassina6a@gmail.com",
    cta: "Kirim email",
    questions: "Pertanyaan",
    feedback: "Kritik",
    suggestions: "Saran",
    questionsBody:
      "Pertanyaan tentang teks Alkitab, doktrin, atau topik tulisan tertentu — sebanyak yang Anda mau.",
    feedbackBody:
      "Kritik yang membangun adalah hadiah. Kalau Anda menemukan kekeliruan eksegetis, historis, atau argumentatif, tolong tunjukkan.",
    suggestionsBody:
      "Topik yang ingin saya tulis berikutnya, perspektif yang belum saya jangkau, atau bacaan yang sebaiknya saya pelajari.",
    fullPageTitle: "Hubungi saya.",
    fullPageIntro:
      "Halaman ini adalah pintu yang sengaja saya buka. Tulisan SinnerSaved bukan monolog — saya berusaha menulis dengan rendah hati dan terbuka untuk diperbaiki. Kalau ada sesuatu yang Anda ingin sampaikan — kritik, saran, pertanyaan, atau sekadar percakapan — silakan kirim ke email di bawah.",
    sendEmail: "Kirim email",
    or: "atau",
    closing:
      "Saya membaca setiap pesan. Untuk pertanyaan teologis, mohon sertakan konteks — saya berusaha menjawab dengan hati-hati, bukan cepat.",
  },
  footer: {
    tagline:
      "Membaca Alkitab dengan jujur, berpikir dengan tertib, dan hidup dalam kasih karunia.",
    builtWith: "Built with Next.js · Tailwind · Framer Motion · Supabase",
    glory: "Soli Deo Gloria.",
    sectionContact: "Kontak",
    sectionAbout: "Tentang",
  },
};

const en: Dict = {
  nav: {
    contact: "Contact",
    search: "Search",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    establishment: "est. 2026",
    light: "Light mode",
    dark: "Dark mode",
  },
  hero: {
    issue: "Issue 01 — May 2026",
    tagline: "Notes of a sinner saved by grace",
    intro:
      "SinnerSaved is a place where I write slowly — about Scripture, doctrine, culture, and the honest notes of a sinner saved by grace.",
    cta: "Start reading",
    explore: "Browse categories →",
  },
  feature: {
    eyebrow: "Latest",
    title: "What I'm thinking about.",
    archive: "Full archive →",
    readMore: "Read this piece",
    minutes: "min read",
    readingTime: (m) => `${m} min read`,
  },
  ruangAlkitab: {
    eyebrow: "01 / Ruang Alkitab",
    title: "Text. Context. Original tongue.",
    blurb:
      "Reading Scripture from its historical, cultural, and original-language setting — without losing the warmth of faith.",
    factsLabel: "Biblical Facts",
    factsHint: "Hover or tap to flip",
    didYouKnow: "Did you know?",
    flipBack: "Flip card",
    latest: "Latest in Ruang Alkitab",
    seeMore: "See all →",
  },
  ruangTeologi: {
    eyebrow: "02 / Ruang Teologi",
    title: "Thinking carefully before God.",
    blurb:
      "Doctrine, apologetics, and healthy criticism — so faith is not just feeling, but conviction that holds up.",
  },
  ruangLensa: {
    eyebrow: "03 / Ruang Lensa",
    title: "The Gospel reads the world.",
    blurb:
      "Looking at culture, figures, and our age through the Gospel's lens — a different way of seeing the ordinary.",
  },
  sinnersNote: {
    eyebrow: "04 / Sinner's Note",
    title: "Small notes from a sinner.",
    blurb:
      "Honest, unpolished reflections — fragments of faith, failure, and grace that find me again and again.",
    sideText: "By a sinner — saved by grace",
    readNote: "Read note →",
  },
  archive: {
    categoryLabel: (count) =>
      `Category · ${count} ${count === 1 ? "piece" : "pieces"}`,
    all: "All",
    emptyTitle: "No pieces in this sub-category yet.",
    emptyBody:
      "I write slowly — try again in a few days, or explore another sub-category above.",
  },
  post: {
    toc: "Table of contents",
    backToCategory: "Back",
    relatedEyebrow: (n) => `More in ${n}`,
    relatedTitle: "Related reading.",
    seeAll: "See all →",
    aboutAuthor: "About the author",
    languageNote:
      "This piece is in Indonesian. Use the ID toggle for matching navigation.",
  },
  contact: {
    eyebrow: "Contact",
    title: "I'd love to hear from you.",
    blurb:
      "Criticism, suggestions, and theological questions are deeply welcome. These pieces are written slowly, and dialogue makes them more alive. Send an email — I read every one, though replies may take time.",
    primaryEmail: "andreassina6a@gmail.com",
    cta: "Send email",
    questions: "Questions",
    feedback: "Criticism",
    suggestions: "Suggestions",
    questionsBody:
      "Questions about a biblical text, doctrine, or a particular piece — as many as you'd like.",
    feedbackBody:
      "Constructive criticism is a gift. If you spot an exegetical, historical, or logical mistake, please point it out.",
    suggestionsBody:
      "Topics you'd like me to write about next, perspectives I'm missing, or books I should read.",
    fullPageTitle: "Get in touch.",
    fullPageIntro:
      "This page is a deliberately open door. SinnerSaved is not meant to be a monologue — I try to write humbly and stay open to correction. If there's anything you'd like to share — criticism, a suggestion, a question, or simply a conversation — please use the email below.",
    sendEmail: "Send email",
    or: "or",
    closing:
      "I read every message. For theological questions, please include context — I try to answer carefully, not quickly.",
  },
  footer: {
    tagline:
      "Reading Scripture honestly, thinking carefully, living in grace.",
    builtWith: "Built with Next.js · Tailwind · Framer Motion · Supabase",
    glory: "Soli Deo Gloria.",
    sectionContact: "Contact",
    sectionAbout: "About",
  },
};

export const DICTIONARIES: Record<Locale, Dict> = { id, en };
