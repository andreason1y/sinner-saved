import Link from "next/link";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Mail } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE, absoluteUrl } from "@/lib/site";
import {
  DEFAULT_LOCALE,
  LOCALES,
  type Locale,
} from "@/lib/i18n/dictionary";

const CANONICAL = absoluteUrl("/tentang");
const ADMIN_EMAIL = "andreassina6a@gmail.com";
const DESCRIPTION =
  "Kisah di balik SinnerSaved — seorang pendosa yang lama bergulat dengan pertanyaan iman, ragu, lalu yakin bahwa Yesus adalah Tuhan, dan kini belajar hidup sepenuhnya bagi Dia (Roma 14:8).";

function mailto(subject: string) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  return `mailto:${ADMIN_EMAIL}?${params.toString()}`;
}

export const metadata: Metadata = {
  title: "Tentang",
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Tentang · SinnerSaved",
    description:
      "Kisah di balik SinnerSaved — bergulat dengan pertanyaan iman, ragu, lalu yakin, dan belajar hidup bagi Tuhan.",
    url: CANONICAL,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tentang · SinnerSaved",
    description:
      "Kisah di balik SinnerSaved — bergulat dengan pertanyaan iman, ragu, lalu yakin, dan belajar hidup bagi Tuhan.",
  },
};

/**
 * Editorial copy lives inline (not in the global dictionary) because it is
 * long-form body text, per the i18n convention. Indonesian is the primary
 * voice; English mirrors it for the secondary surface.
 */
type AboutCopy = {
  eyebrow: string;
  title: string;
  lede: string;
  sections: { heading: string; paragraphs: string[] }[];
  verseRef: string;
  verse: string;
  signature: string;
  contactLead: string;
  contactCta: string;
};

const COPY: Record<Locale, AboutCopy> = {
  id: {
    eyebrow: "Tentang",
    title: "Tentang ruang ini",
    lede: "SinnerSaved adalah tempat seorang pendosa menulis pelan-pelan tentang Alkitab, doktrin, budaya, dan iman. Tidak ditulis dari atas mimbar, melainkan dari perjalanan panjang yang penuh pertanyaan, keraguan, dan kasih karunia yang tak henti menemukan.",
    sections: [
      {
        heading: "Pertanyaan yang tidak mau diam",
        paragraphs: [
          "Sejak bangku SMP, saya tidak bisa berhenti bertanya tentang agama. Siapa yang benar? Mengapa Allah disebut tiga? Saya membayangkan bagaimana rasanya memeluk keyakinan yang berbeda-beda, mencoba menimbang masing-masing dengan jujur.",
          "Ketika mulai mendalami kekristenan, saya justru menemukan begitu banyak denominasi dengan penekanan yang berbeda. Saya bahkan sempat ikut dan mempelajari doktrin Saksi-Saksi Yehuwa untuk memahaminya dari dekat. Pencarian itu tidak rapi — tetapi sungguh-sungguh.",
        ],
      },
      {
        heading: "Ragu, lalu diyakinkan",
        paragraphs: [
          "Saya dibaptis di kelas tiga SMP, tetapi saat itu saya masih meragukan keilahian Yesus. Keraguan itu cukup dalam sehingga di usia 18 tahun saya meminta dibaptis ulang. Bahkan kemudian saya kembali bergumul — kali ini meragukan keselamatan saya sendiri.",
          "Namun di tengah semua keraguan itu, saya akhirnya tiba pada keyakinan yang utuh: Yesus adalah Tuhan. Sejak itu saya membaca Alkitab dengan rakus — Perjanjian Baru pernah saya tuntaskan dalam satu minggu — mendengarkan siaran rohani setiap pagi, dan menggali doktrin demi mengenal kebenaran lebih dalam.",
        ],
      },
      {
        heading: "Panggilan yang berbelok",
        paragraphs: [
          "Di masa-masa mula yang menyala itu, saya mendambakan menjadi pelayan Tuhan sepenuh waktu — masuk sekolah teologi, lalu menjadi pendeta. Tetapi perjalanan hidup berkata lain. Saya menempuh kuliah hukum dan sempat bekerja.",
          "Pada akhirnya saya mengikuti seminari Alkitab non-gelar, dan justru di sanalah cara pandang saya terhadap hidup berubah. Saya mulai melihat bahwa hidup ini bukan tentang saya, melainkan tentang Dia.",
        ],
      },
      {
        heading: "Hidup ini untuk Tuhan",
        paragraphs: [
          "Saya semakin yakin hidup ini memang untuk Tuhan, sebab kita sudah ditebus. Pelan-pelan saya belajar bahwa kita bukan milik diri sendiri — apa pun yang kita punya: pendidikan, pekerjaan, keluarga, segalanya, adalah bagi Tuhan.",
          "Dan hidup bagi Tuhan bukan sekadar rajin ke gereja atau sibuk dalam pelayanan di dalam tembok gereja. Ia juga berarti memberitakan Injil — membawa kabar baik itu keluar, kepada dunia yang Dia kasihi.",
        ],
      },
    ],
    verseRef: "Roma 14:8",
    verse:
      "Sebab jika kita hidup, kita hidup untuk Tuhan, dan jika kita mati, kita mati untuk Tuhan. Jadi baik hidup, baik mati, kita adalah milik Tuhan.",
    signature: "— seorang pendosa yang diselamatkan oleh kasih karunia",
    contactLead: "Punya pertanyaan, kritik, atau sekadar ingin berbincang?",
    contactCta: "Kirim email",
  },
  en: {
    eyebrow: "About",
    title: "About this place",
    lede: "SinnerSaved is where a sinner writes slowly about Scripture, doctrine, culture, and faith. Not from a pulpit, but out of a long journey full of questions, doubt, and grace that keeps finding me.",
    sections: [
      {
        heading: "Questions that wouldn't go quiet",
        paragraphs: [
          "Since junior high I couldn't stop asking about religion. Who is right? Why is God called three? I imagined what it would be like to hold different beliefs, trying to weigh each one honestly.",
          "When I began to dig into Christianity, I found so many denominations with different emphases. I even attended and studied the doctrine of the Jehovah's Witnesses once, to understand it up close. The search was messy — but it was sincere.",
        ],
      },
      {
        heading: "Doubt, then conviction",
        paragraphs: [
          "I was baptized in my last year of junior high, but at the time I still doubted the deity of Jesus. The doubt ran deep enough that at eighteen I asked to be baptized again. Later I wrestled once more — this time doubting my own salvation.",
          "Yet in the middle of all that doubt, I finally arrived at a whole conviction: Jesus is Lord. From then on I read the Bible hungrily — I once finished the New Testament in a single week — listened to Christian radio every morning, and studied doctrine to know the truth more deeply.",
        ],
      },
      {
        heading: "A calling that turned",
        paragraphs: [
          "In those early, burning days I longed to serve God full-time — to enter seminary and become a pastor. But life took another turn. I studied law and worked for a while.",
          "In the end I took a non-degree Bible seminary, and it was there that my whole view of life shifted. I began to see that life is not about me, but about Him.",
        ],
      },
      {
        heading: "This life is for God",
        paragraphs: [
          "I'm more and more convinced this life really is for God, because we have been redeemed. Slowly I'm learning we are not our own — whatever we have: our education, our work, our family, all of it, belongs to the Lord.",
          "And to live for God is not merely to attend church faithfully or stay busy with ministry inside its walls. It also means proclaiming the Gospel — carrying that good news outward, to the world He loves.",
        ],
      },
    ],
    verseRef: "Romans 14:8",
    verse:
      "For if we live, we live to the Lord, and if we die, we die to the Lord. So then, whether we live or whether we die, we are the Lord's.",
    signature: "— a sinner saved by grace alone",
    contactLead: "Have a question, a critique, or simply want to talk?",
    contactCta: "Send an email",
  },
};

export default function TentangPage() {
  const cookieLocale = cookies().get("ss-locale")?.value;
  const locale: Locale =
    cookieLocale && (LOCALES as readonly string[]).includes(cookieLocale)
      ? (cookieLocale as Locale)
      : DEFAULT_LOCALE;
  const c = COPY[locale];

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: c.title,
    url: CANONICAL,
    description: DESCRIPTION,
    inLanguage: locale === "en" ? "en" : "id-ID",
    isPartOf: {
      "@type": "WebSite",
      name: SITE.name,
      url: SITE.url,
    },
    mainEntity: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      description: SITE.description,
      logo: absoluteUrl("/icon.png"),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE.name, item: SITE.url },
      { "@type": "ListItem", position: 2, name: c.title, item: CANONICAL },
    ],
  };

  return (
    <section className="relative pb-32 pt-28 sm:pt-32">
      <JsonLd data={aboutSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="mx-auto max-w-3xl px-5 lg:px-0">
        {/* Header */}
        <div className="flex items-center gap-4">
          <span className="kicker shrink-0 text-gold-600 dark:text-gold-300">
            {c.eyebrow}
          </span>
          <span className="h-px flex-1 bg-gold-leaf" />
        </div>
        <h1 className="serif-display mt-6 text-4xl font-medium leading-[1.06] text-ink-900 dark:text-ink-50 sm:text-6xl">
          {c.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-600 dark:text-ink-300 sm:text-xl">
          {c.lede}
        </p>

        {/* Story */}
        <div className="mt-14 space-y-12">
          {c.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="serif-display text-2xl text-ink-900 dark:text-ink-50 sm:text-3xl">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-base leading-relaxed text-ink-700 dark:text-ink-300 sm:text-lg"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Favorite verse — Romans 14:8 */}
        <figure className="mt-16 rounded-3xl border border-ink-900/10 bg-white/60 p-8 shadow-card dark:border-white/10 dark:bg-ink-900 sm:p-10">
          <blockquote className="serif-display text-2xl italic leading-snug text-ink-900 dark:text-ink-50 sm:text-3xl">
            “{c.verse}”
          </blockquote>
          <figcaption className="mt-5 kicker text-gold-600 dark:text-gold-300">
            {c.verseRef}
          </figcaption>
        </figure>

        <p className="mt-10 text-sm uppercase tracking-[0.28em] text-ink-400 dark:text-ink-500">
          {c.signature}
        </p>

        {/* Contact nudge */}
        <div className="mt-16 flex flex-col items-start gap-4 border-t border-ink-900/10 pt-10 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-base text-ink-600 dark:text-ink-300">
            {c.contactLead}
          </p>
          <a
            href={mailto("[SinnerSaved] Halo")}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-parchment transition-transform hover:scale-[1.02] dark:bg-ink-50 dark:text-ink-950"
          >
            <Mail size={14} />
            {c.contactCta}
          </a>
        </div>

        <p className="mt-4 text-xs text-ink-400 dark:text-ink-500">
          {ADMIN_EMAIL} ·{" "}
          <Link
            href="/kontak"
            className="link-underline hover:text-ink-700 dark:hover:text-ink-200"
          >
            /kontak
          </Link>
        </p>
      </div>
    </section>
  );
}
