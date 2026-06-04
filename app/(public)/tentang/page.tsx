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
  "Kisah di balik SinnerSaved — seorang pendosa yang pernah jatuh, lari dari Tuhan, dan hidup dalam kesombongan, lalu dihancurkan dan dipulihkan oleh kasih karunia. Diselamatkan bukan karena layak, justru karena tidak layak (Roma 14:8).";
const SHARE_DESCRIPTION =
  "Pendosa yang pernah jatuh dan lari dari Tuhan, dihancurkan dari segala kebanggaan diri, lalu pelan-pelan dipulihkan oleh kasih karunia.";

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
    description: SHARE_DESCRIPTION,
    url: CANONICAL,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tentang · SinnerSaved",
    description: SHARE_DESCRIPTION,
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
    lede: "SinnerSaved lahir dari satu pengakuan yang sederhana: saya seorang pendosa yang diselamatkan oleh kasih karunia — bukan karena saya layak, tetapi justru karena saya tidak layak. Ini ruang untuk menulis pelan-pelan tentang Alkitab, doktrin, dan iman, dari seseorang yang pernah jatuh, lari dari Tuhan, dihancurkan, lalu dipulihkan.",
    sections: [
      {
        heading: "Pertanyaan yang tidak mau diam",
        paragraphs: [
          "Sejak bangku SMP, saya tidak bisa berhenti bertanya tentang agama. Siapa yang benar? Mengapa Allah disebut tiga? Saya membayangkan bagaimana rasanya memeluk berbagai keyakinan, lalu mencoba menimbang masing-masing dengan jujur.",
          "Ketika mulai mendalami kekristenan, saya justru menemukan begitu banyak denominasi dengan penekanan yang berbeda. Saya bahkan sempat mempelajari doktrin Saksi-Saksi Yehuwa dari dekat. Pencarian itu tidak rapi — tetapi sungguh-sungguh.",
        ],
      },
      {
        heading: "Ragu, lalu diyakinkan",
        paragraphs: [
          "Saya dibaptis di kelas tiga SMP, tetapi saat itu masih meragukan keilahian Yesus — cukup dalam, sampai di usia 18 tahun saya meminta dibaptis ulang. Kemudian saya bergumul lagi, kali ini meragukan keselamatan saya sendiri.",
          "Namun di tengah keraguan itu, saya akhirnya tiba pada keyakinan yang utuh: Yesus adalah Tuhan. Saya membaca Alkitab dengan rakus, mendengar siaran rohani setiap pagi, dan sempat mendambakan menjadi pelayan Tuhan sepenuh waktu.",
        ],
      },
      {
        heading: "Lalu saya jatuh",
        paragraphs: [
          "Tetapi kisah saya bukan garis lurus yang terus menanjak. Saya jatuh — berkali-kali — ke dalam dosa. Ada masa saya berlari dari Tuhan dan hidup dalam kesombongan, merasa cukup dengan diri sendiri, tanpa benar-benar melihat bahwa saya penuh dengan dosa dan kegagalan.",
        ],
      },
      {
        heading: "Dihancurkan untuk disadarkan",
        paragraphs: [
          "Akhirnya saya masuk seminari Alkitab. Di sanalah, alih-alih merasa makin hebat, saya merasa Tuhan menghancurkan saya berkeping-keping — meruntuhkan setiap kebanggaan diri yang selama ini menutupi kenyataan paling sederhana: bahwa saya tidak layak dan tidak pantas, hanya seorang pendosa.",
        ],
      },
      {
        heading: "Jalan yang tidak mulus",
        paragraphs: [
          "Selepas lulus pun perjalanan tidak menjadi mudah. Saya sempat melayani penuh waktu selama satu tahun, lalu masuk ke masa yang berat: kecewa pada manusia, kecewa pada mereka yang melayani, bahkan ada saat saya ingin meninggalkan Tuhan. Hidup terasa penuh pergumulan dan sukar.",
        ],
      },
      {
        heading: "Hanya pendosa yang butuh Tuhan",
        paragraphs: [
          "Di titik itulah Tuhan menyingkapkan sesuatu yang sederhana namun mematahkan: saya hanyalah orang berdosa yang tidak berkutik. Saya butuh Dia menahirkan saya lagi, butuh kembali kepada-Nya. Dan pelan-pelan — sungguh pelan — Dia memulihkan hidup saya.",
          "Itulah arti “sinner saved” bagi saya: bukan pendosa yang sudah selesai diperbaiki, melainkan pendosa yang terus-menerus diselamatkan, dipulihkan, dan dipegang oleh kasih karunia yang tidak pernah bisa saya hasilkan sendiri.",
        ],
      },
      {
        heading: "Hidup ini untuk Tuhan",
        paragraphs: [
          "Dari reruntuhan itu, pelan-pelan saya mengerti: hidup ini memang untuk Tuhan, sebab kita sudah ditebus. Kita bukan milik diri sendiri — apa pun yang kita punya: pendidikan, pekerjaan, keluarga, segalanya, adalah bagi Dia.",
          "Dan hidup bagi Tuhan bukan sekadar rajin ke gereja atau sibuk dalam pelayanan di dalam tembok gereja. Ia juga berarti memberitakan Injil — membawa kabar baik itu keluar, kepada dunia yang Dia kasihi. Di sanalah ayat yang saya pegang erat menemukan rumahnya.",
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
    lede: "SinnerSaved was born from one simple confession: I am a sinner saved by grace — not because I was worthy, but precisely because I was not. This is a place to write slowly about Scripture, doctrine, and faith, from someone who has fallen, run from God, been broken, and then been restored.",
    sections: [
      {
        heading: "Questions that wouldn't go quiet",
        paragraphs: [
          "Since junior high I couldn't stop asking about religion. Who is right? Why is God called three? I imagined what it would be like to hold different beliefs, then tried to weigh each one honestly.",
          "When I began to dig into Christianity, I found so many denominations with different emphases. I even studied the doctrine of the Jehovah's Witnesses up close. The search was messy — but it was sincere.",
        ],
      },
      {
        heading: "Doubt, then conviction",
        paragraphs: [
          "I was baptized in my last year of junior high, but at the time I still doubted the deity of Jesus — deeply enough that at eighteen I asked to be baptized again. Later I wrestled once more, this time doubting my own salvation.",
          "Yet in the middle of that doubt I finally arrived at a whole conviction: Jesus is Lord. I read the Bible hungrily, listened to Christian radio every morning, and once longed to serve God full-time.",
        ],
      },
      {
        heading: "Then I fell",
        paragraphs: [
          "But my story is not a straight line climbing upward. I fell — again and again — into sin. There was a season when I ran from God and lived in pride, content with myself, without truly seeing that I was full of sin and failure.",
        ],
      },
      {
        heading: "Broken to be awakened",
        paragraphs: [
          "Eventually I entered Bible seminary. And there, instead of feeling greater, I felt God break me to pieces — tearing down every bit of self-pride that had hidden the simplest truth: that I am unworthy and undeserving, only a sinner.",
        ],
      },
      {
        heading: "A road that wasn't smooth",
        paragraphs: [
          "Even after graduating, the road did not become easy. I served full-time for a year, then entered a heavy season: disappointed with people, disappointed with those who serve, even wanting at times to leave God. Life felt full of struggle and hardship.",
        ],
      },
      {
        heading: "Only a sinner who needs God",
        paragraphs: [
          "It was there that God revealed something simple yet shattering: I am only a sinner with nowhere to turn. I need Him to cleanse me again, to come back to Him. And slowly — very slowly — He is restoring my life.",
          "That is what “sinner saved” means to me: not a sinner who is finished being fixed, but a sinner who is continually being saved, restored, and held by a grace I could never produce on my own.",
        ],
      },
      {
        heading: "This life is for God",
        paragraphs: [
          "Out of that wreckage I slowly came to understand: this life really is for God, because we have been redeemed. We are not our own — whatever we have: our education, our work, our family, all of it, is for Him.",
          "And living for God is not merely attending church faithfully or staying busy with ministry inside its walls. It also means proclaiming the Gospel — carrying that good news outward, to the world He loves. That is where the verse I hold closely finds its home.",
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
