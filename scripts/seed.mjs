// SinnerSaved · Seed script
// -------------------------------------------------------------
// Run AFTER applying supabase/schema.sql in the Supabase SQL Editor.
//
//   node scripts/seed.mjs
//
// What it does:
//   1) Creates (or reuses) the admin user.
//   2) Promotes that user's profile row to role='admin'.
//   3) Inserts 9 sample posts as Tiptap JSON + rendered HTML.
// -------------------------------------------------------------

import { createClient } from "@supabase/supabase-js";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Typography from "@tiptap/extension-typography";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Load .env.local manually (no dotenv dep)
const __dirname = dirname(fileURLToPath(import.meta.url));
loadEnv(join(__dirname, "..", ".env.local"));

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_ROLE) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || "andreassina6a@gmail.com";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || "admin11!";
const ADMIN_NAME = process.env.SEED_ADMIN_NAME || "Andreas Sina";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const EXTS = [
  StarterKit.configure({ heading: { levels: [2, 3] } }),
  Link.configure({ openOnClick: false, autolink: true }),
  Image,
  Typography,
];

// Tiptap doc helpers
const doc = (...content) => ({ type: "doc", content });
const p = (text) => ({ type: "paragraph", content: text ? [{ type: "text", text }] : [] });
const h2 = (text) => ({ type: "heading", attrs: { level: 2 }, content: [{ type: "text", text }] });
const h3 = (text) => ({ type: "heading", attrs: { level: 3 }, content: [{ type: "text", text }] });
const blockquote = (text) => ({
  type: "blockquote",
  content: [{ type: "paragraph", content: [{ type: "text", text }] }],
});
const ul = (...items) => ({
  type: "bulletList",
  content: items.map((t) => ({
    type: "listItem",
    content: [{ type: "paragraph", content: [{ type: "text", text: t }] }],
  })),
});
const ol = (...items) => ({
  type: "orderedList",
  attrs: { start: 1 },
  content: items.map((t) => ({
    type: "listItem",
    content: [{ type: "paragraph", content: [{ type: "text", text: t }] }],
  })),
});
const codeBlock = (code, lang) => ({
  type: "codeBlock",
  attrs: { language: lang || null },
  content: [{ type: "text", text: code }],
});
const hr = () => ({ type: "horizontalRule" });

function makeBody(opening) {
  return doc(
    p(opening),
    h2("Membaca dengan tenang"),
    p(
      "Salah satu hal yang saya pelajari pelan-pelan adalah bahwa Alkitab tidak selalu memberi jawaban yang rapi. Ia justru sering memunculkan pertanyaan yang lebih besar dari yang kita bawa di awal. Dan itu bukan kelemahan; itu adalah caranya menarik kita masuk lebih dalam."
    ),
    blockquote(
      "Sebab firman Allah hidup dan kuat dan lebih tajam daripada pedang bermata dua manapun; ia menusuk amat dalam sampai memisahkan jiwa dan roh, sendi-sendi dan sumsum. — Ibrani 4:12"
    ),
    p(
      "Saya pikir di sinilah kerendahan hati menjadi alat eksegesis yang penting — sama pentingnya dengan kamus Yunani atau peta sejarah. Kalau kita masuk ke dalam teks dengan asumsi bahwa kita sudah tahu jawabannya, kita akan keluar dengan persis apa yang kita bawa masuk. Tidak lebih."
    ),
    h2("Tiga prinsip kecil"),
    ol(
      "Baca konteks sebelum baca ayat. Pasal sebelum kalimat. Kitab sebelum pasal.",
      "Tanya: kepada siapa awalnya teks ini ditulis? Apa yang sudah mereka tahu?",
      "Biarkan teks yang sulit tetap sulit dulu — jangan terburu-buru menjinakkannya."
    ),
    blockquote(
      "We need to learn to read the Bible as the Bible, not as a quarry from which to dig out our favorite stones. — Eugene Peterson"
    ),
    h3("Catatan sebuah kata"),
    p(
      "Kata Yunani untuk 'kasih karunia' adalah charis (χάρις). Tapi yang menarik bukan etimologinya — yang menarik adalah bagaimana Paulus terus-menerus mengulanginya di hampir setiap pembukaan suratnya, seolah-olah ia takut kita akan lupa."
    ),
    codeBlock(
      "χάρις ὑμῖν καὶ εἰρήνη ἀπὸ θεοῦ πατρὸς ἡμῶν\nκαὶ κυρίου Ἰησοῦ Χριστοῦ.",
      "Greek"
    ),
    p(
      "Charis hymin kai eirēnē — kasih karunia bagimu, dan damai sejahtera. Urutannya selalu sama: kasih karunia dulu. Damai datang sesudahnya, sebagai buah, bukan sebagai prasyarat."
    ),
    hr(),
    h2("Penutup yang tidak menutup"),
    p(
      "Tulisan ini bukan kesimpulan. Ia lebih seperti kursi kayu di pojok perpustakaan — tempat saya duduk sebentar, mencatat apa yang saya baca, lalu kembali ke rak untuk mencari kitab berikutnya. Saya berharap Anda yang membaca ini juga sedang melakukan hal yang sama, di pojok ruangan Anda sendiri."
    )
  );
}

function injectIds(html) {
  return html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (_m, lvl, attrs, inner) => {
    if (/\bid="/i.test(attrs)) return `<h${lvl}${attrs}>${inner}</h${lvl}>`;
    const text = inner.replace(/<[^>]*>/g, "").trim();
    const id = text
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 80);
    return `<h${lvl} id="${id}"${attrs}>${inner}</h${lvl}>`;
  });
}

function readingMinutes(html) {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return Math.max(1, Math.round(text.split(" ").length / 220));
}

const POSTS = [
  {
    title: "Ketika 'Agape' Tidak Sehalus Kedengarannya",
    slug: "ketika-agape-tidak-sehalus-kedengarannya",
    excerpt:
      "Kita sering menerjemahkan agape sebagai cinta tanpa syarat. Tapi di Yohanes 21, Yesus dan Petrus justru menukar-nukar kata kerja cinta. Apa yang sedang terjadi di sana?",
    cover:
      "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?w=1600&auto=format&fit=crop&q=80",
    main_category: "ruang-alkitab",
    sub_category: "makna-kata-asli",
    tags: ["yunani", "yohanes", "kasih"],
    opening:
      "Pertama kali saya mendengar khotbah tentang 'agape vs phileo' di Yohanes 21, saya langsung terpesona. Penjelasannya rapi: Yesus tiga kali bertanya 'apakah engkau mengasihi (agape) Aku?', dan Petrus tiga kali menjawab 'aku mengasihi-Mu (phileo).' Lalu di pertanyaan ketiga, Yesus turun ke level Petrus dan memakai phileo juga. Manis sekali. Tapi waktu saya buka teks Yunaninya, ceritanya tidak sesederhana itu.",
    published_at: "2026-05-22T09:00:00Z",
  },
  {
    title: "Mengapa Penebusan Substitusi Masih Penting",
    slug: "mengapa-penebusan-substitusi-masih-penting",
    excerpt:
      "Setiap generasi mencoba menggeser salib dari pusat. Tapi tanpa substitusi, Injil hanyalah motivasi moral yang sopan.",
    cover:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600&auto=format&fit=crop&q=80",
    main_category: "ruang-teologi",
    sub_category: "bedah-doktrin",
    tags: ["soteriologi", "salib"],
    opening:
      "Setiap dekade, ada satu generasi teolog yang mencoba menggeser salib dari pusat. Kadang dengan alasan pastoral — 'gambar Allah yang menghukum Anak-Nya itu kejam' — kadang dengan alasan filosofis. Saya mengerti niatnya. Tapi saya tetap belum yakin kita bisa kehilangan substitusi tanpa juga kehilangan Injil itu sendiri.",
    published_at: "2026-05-19T09:00:00Z",
  },
  {
    title: "Bonhoeffer dan Harga Sebuah Kasih Karunia",
    slug: "bonhoeffer-dan-harga-sebuah-kasih-karunia",
    excerpt:
      "Sebuah biografi singkat tentang teolog Jerman yang menulis 'Cost of Discipleship' — dan kemudian membayarnya dengan nyawa.",
    cover:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&auto=format&fit=crop&q=80",
    main_category: "ruang-lensa",
    sub_category: "biografi-singkat",
    tags: ["bonhoeffer", "discipleship"],
    opening:
      "Dietrich Bonhoeffer menulis Nachfolge — yang kita kenal sebagai The Cost of Discipleship — di tahun 1937. Ia berusia 31. Tujuh tahun kemudian, ia digantung di kamp Flossenbürg, dua minggu sebelum kamp itu dibebaskan oleh tentara Sekutu. Saya tidak bisa membaca bukunya tanpa mengingat ujung kalimat hidupnya.",
    published_at: "2026-05-15T09:00:00Z",
  },
  {
    title: "Saya Berdoa, Tapi Langit Diam",
    slug: "saya-berdoa-tapi-langit-diam",
    excerpt:
      "Catatan kecil dari sebuah malam yang panjang — ketika doa terasa seperti berbicara ke langit-langit kamar.",
    cover: null,
    main_category: "sinners-note",
    sub_category: "refleksi",
    tags: ["doa", "kekeringan rohani"],
    opening:
      "Pukul dua pagi. Saya berdoa, tapi rasanya seperti berbicara ke langit-langit kamar. Tidak ada gema, tidak ada hangat, tidak ada apa-apa. Saya bertanya pada diri sendiri: apakah Allah sedang diam, atau saya yang sudah lupa bagaimana cara mendengar?",
    published_at: "2026-05-12T09:00:00Z",
  },
  {
    title: "Yerusalem di Abad Pertama: Kota yang Dilihat Yesus",
    slug: "yerusalem-abad-pertama",
    excerpt:
      "Sebelum membaca Injil seperti dongeng modern, kita perlu mencium debu jalanan Yerusalem yang sesak — pajak, Romawi, dan harapan mesianis.",
    cover:
      "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=1600&auto=format&fit=crop&q=80",
    main_category: "ruang-alkitab",
    sub_category: "sejarah-budaya",
    tags: ["yerusalem", "konteks"],
    opening:
      "Kita sering membayangkan Yerusalem di zaman Yesus seperti latar drama Natal anak Sekolah Minggu — bersih, sunyi, dan agak sepia. Tapi Yerusalem abad pertama adalah kota yang sesak, sengit, dan secara politik genting. Sebuah kota yang sedang diduduki, dan rakyatnya tahu itu setiap kali mereka berjumpa tentara Romawi di tikungan jalan.",
    published_at: "2026-05-08T09:00:00Z",
  },
  {
    title: "Apologetika yang Tidak Berteriak",
    slug: "apologetika-yang-tidak-berteriak",
    excerpt:
      "Membela iman bukan tentang menang argumen di kolom komentar. Ini tentang menjawab dengan lemah lembut dan hormat — 1 Petrus 3:15.",
    cover:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&auto=format&fit=crop&q=80",
    main_category: "ruang-teologi",
    sub_category: "apologetics",
    tags: ["apologetika", "komunikasi"],
    opening:
      "Petrus menulis 'siap sedia memberi pertanggungan jawab kepada tiap-tiap orang yang meminta pertanggungan jawab dari kamu tentang pengharapan yang ada padamu' — lalu, hampir tidak ada yang mengutip lanjutannya — 'tetapi haruslah dengan lemah lembut dan hormat.' Apologetika yang baik bukan hanya tentang argumen yang benar; ia juga tentang cara menyampaikan yang manusiawi.",
    published_at: "2026-05-05T09:00:00Z",
  },
  {
    title: "Filter, Performance, dan Citra Allah",
    slug: "filter-performance-dan-citra-allah",
    excerpt:
      "Era media sosial menjual versi terbaik dari diri kita. Tapi Injil justru memulai dari versi terburuk — dan tetap menyebut kita berharga.",
    cover:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1600&auto=format&fit=crop&q=80",
    main_category: "ruang-lensa",
    sub_category: "lensa-injil-budaya",
    tags: ["budaya digital", "imago dei"],
    opening:
      "Setiap aplikasi yang kita buka pagi ini meminta hal yang sama dari kita: tampilkan versi yang lebih bersih dari dirimu. Lebih cerah, lebih percaya diri, lebih sukses. Filter bukan hanya menutupi pori-pori — ia juga, secara halus, menutupi anugerah.",
    published_at: "2026-05-02T09:00:00Z",
  },
  {
    title: "Catatan: Hari Ketika Saya Berhenti Berpura-pura",
    slug: "hari-ketika-saya-berhenti-berpura-pura",
    excerpt:
      "Iman saya dulu rapi. Lalu rapuh. Lalu jujur. Sebuah catatan tentang bagaimana saya akhirnya berhenti memakai topeng di hadapan Allah.",
    cover: null,
    main_category: "sinners-note",
    sub_category: "catatan",
    tags: ["kejujuran", "pertobatan"],
    opening:
      "Iman saya dulu sangat rapi. Saya tahu jawaban yang benar untuk hampir setiap pertanyaan; saya bisa mengutip ayat di tempat yang tepat; doa saya tersusun seperti sketsa pidato. Lalu hidup terjadi, dan semua kerapian itu rontok satu per satu. Yang tersisa, akhirnya, adalah doa yang sangat pendek: 'Tuhan, kasihanilah aku.'",
    published_at: "2026-04-29T09:00:00Z",
  },
  {
    title: "Roma 9: Ayat yang Membuat Banyak Orang Pulang",
    slug: "roma-9-ayat-yang-membuat-banyak-orang-pulang",
    excerpt:
      "Predestinasi, bejana kemurkaan, dan kedaulatan Allah. Pasal yang tidak ramah untuk dipajang — tapi kita tetap harus membacanya.",
    cover:
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1600&auto=format&fit=crop&q=80",
    main_category: "ruang-alkitab",
    sub_category: "ayat-ayat-sulit",
    tags: ["roma", "kedaulatan"],
    opening:
      "Kalau Anda membaca Roma satu kali dalam satu duduk — yang sebenarnya cara Paulus mengharapkan suratnya dibaca — Anda akan sampai di pasal 9 dengan kepala sedikit pusing. Argumennya berat, kalimatnya panjang, dan implikasinya tidak ramah untuk PR Sekolah Minggu.",
    published_at: "2026-04-25T09:00:00Z",
  },
];

async function ensureAdminUser() {
  // Try to find existing user
  const { data: list, error: listErr } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 200,
  });
  if (listErr) throw listErr;
  let user = list.users.find((u) => u.email === ADMIN_EMAIL);

  if (!user) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
      user_metadata: { display_name: ADMIN_NAME },
    });
    if (error) throw error;
    user = data.user;
    console.log(`✓ Admin user created: ${ADMIN_EMAIL}`);
  } else {
    console.log(`✓ Admin user exists: ${ADMIN_EMAIL}`);
  }

  // Promote profile to admin
  const { error: pErr } = await supabase
    .from("profiles")
    .upsert(
      {
        id: user.id,
        email: ADMIN_EMAIL,
        display_name: ADMIN_NAME,
        role: "admin",
      },
      { onConflict: "id" }
    );
  if (pErr) throw pErr;
  console.log(`✓ Profile role set to admin`);
  return user;
}

async function seedPosts(authorId) {
  for (const meta of POSTS) {
    const json = makeBody(meta.opening);
    let html;
    try {
      html = injectIds(generateHTML(json, EXTS));
    } catch (e) {
      console.error("HTML render failed for", meta.slug, e.message);
      continue;
    }
    const minutes = readingMinutes(html);

    const { error } = await supabase.from("posts").upsert(
      {
        title: meta.title,
        slug: meta.slug,
        excerpt: meta.excerpt,
        content_json: json,
        content_html: html,
        cover: meta.cover,
        main_category: meta.main_category,
        sub_category: meta.sub_category,
        tags: meta.tags,
        status: "published",
        reading_minutes: minutes,
        author_id: authorId,
        published_at: meta.published_at,
      },
      { onConflict: "slug" }
    );
    if (error) {
      console.error(`✗ ${meta.slug}: ${error.message}`);
    } else {
      console.log(`✓ ${meta.slug}`);
    }
  }
}

async function main() {
  console.log(`→ Connecting to ${SUPABASE_URL}`);
  // Sanity ping
  const { error: pingErr } = await supabase.from("posts").select("id").limit(1);
  if (pingErr) {
    console.error(
      "Cannot read posts table — did you run supabase/schema.sql in the SQL Editor?"
    );
    console.error("Detail:", pingErr.message);
    process.exit(1);
  }
  const user = await ensureAdminUser();
  await seedPosts(user.id);
  console.log("\nDone. Sign in at /admin/login with:");
  console.log(`  email:    ${ADMIN_EMAIL}`);
  console.log(`  password: ${ADMIN_PASSWORD}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

// ---- minimal .env loader (handles KEY=VALUE, ignores comments) -------
function loadEnv(path) {
  let raw;
  try {
    raw = readFileSync(path, "utf-8");
  } catch {
    return;
  }
  for (const line of raw.split(/\r?\n/)) {
    if (!line || line.trim().startsWith("#")) continue;
    const idx = line.indexOf("=");
    if (idx < 0) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    if (!process.env[key]) process.env[key] = val;
  }
}
