// SinnerSaved · Seed script
// -------------------------------------------------------------
// Run AFTER applying supabase/schema.sql in the Supabase SQL Editor.
//
//   node scripts/seed.mjs
//
// What it does:
//   1) Creates (or reuses) the admin user.
//   2) Promotes that user's profile row to role='admin'.
//   3) Wipes posts authored by the admin (idempotent re-seed).
//   4) Inserts the deep articles from scripts/articles.mjs as Tiptap JSON
//      + pre-rendered HTML.
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

import { ARTICLES } from "./articles.mjs";

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

async function ensureAdminUser() {
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

  const { error: pErr } = await supabase.from("profiles").upsert(
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

async function wipeSeedPosts(authorId) {
  const { error } = await supabase.from("posts").delete().eq("author_id", authorId);
  if (error) {
    console.warn(`(skip wipe) ${error.message}`);
    return;
  }
  console.log(`✓ Cleared previous seed posts`);
}

async function seedPosts(authorId) {
  for (const meta of ARTICLES) {
    let html;
    try {
      html = injectIds(generateHTML(meta.content_json, EXTS));
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
        content_json: meta.content_json,
        content_html: html,
        cover: meta.cover ?? null,
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
      console.log(`✓ ${meta.slug} (${minutes} min)`);
    }
  }
}

async function main() {
  console.log(`→ Connecting to ${SUPABASE_URL}`);
  const { error: pingErr } = await supabase.from("posts").select("id").limit(1);
  if (pingErr) {
    console.error(
      "Cannot read posts table — did you run supabase/schema.sql in the SQL Editor?"
    );
    console.error("Detail:", pingErr.message);
    process.exit(1);
  }
  const user = await ensureAdminUser();
  await wipeSeedPosts(user.id);
  await seedPosts(user.id);
  console.log("\nDone. Sign in at /admin/login with:");
  console.log(`  email:    ${ADMIN_EMAIL}`);
  console.log(`  password: ${ADMIN_PASSWORD}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

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
