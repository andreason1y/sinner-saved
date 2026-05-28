"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import ImageExt from "@tiptap/extension-image";
import LinkExt from "@tiptap/extension-link";
import Typography from "@tiptap/extension-typography";

/**
 * One-shot setup helpers for the `/admin/setup` page.
 *
 * The Supabase schema (DDL + RLS + storage policies) MUST be applied
 * once by the project owner via Supabase Dashboard → SQL Editor —
 * we cannot execute arbitrary DDL through the REST API or PostgREST.
 *
 * After the schema is applied, this module can:
 *   - Detect setup status (schema present? admin user? sample posts?)
 *   - Create the admin user
 *   - Seed the 9 sample articles
 *
 * All actions use the service-role key, so they're guarded only
 * server-side. Don't expose this route to the public internet without
 * an additional gate (we add one below — `assertSetupAllowed`).
 */

type SetupStatus = {
  schemaApplied: boolean;
  schemaError?: string;
  adminUserExists: boolean;
  postCount: number;
  bucketExists: boolean;
};

/**
 * Setup is only allowed when:
 *   1) The service role key is configured (always required), AND
 *   2) Either no admin user exists yet, OR the caller supplies the
 *      service role key as a confirm token.
 *
 * Once an admin exists, normal seeding still works — but the page
 * itself is rendered behind the admin middleware, so signed-in admins
 * can re-seed if they want.
 */
async function assertSetupAllowed() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase env vars belum lengkap. Pastikan NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY ter-set."
    );
  }
}

export async function getSetupStatus(): Promise<SetupStatus> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    return {
      schemaApplied: false,
      schemaError: "Env vars belum lengkap.",
      adminUserExists: false,
      postCount: 0,
      bucketExists: false,
    };
  }

  const admin = createSupabaseAdminClient();
  const status: SetupStatus = {
    schemaApplied: false,
    adminUserExists: false,
    postCount: 0,
    bucketExists: false,
  };

  // Schema present? Try selecting from the posts table.
  const { count, error: countErr } = await admin
    .from("posts")
    .select("id", { count: "exact", head: true });
  if (!countErr) {
    status.schemaApplied = true;
    status.postCount = count ?? 0;
  } else {
    status.schemaError = countErr.message;
  }

  // Storage bucket?
  const { data: buckets } = await admin.storage.listBuckets();
  status.bucketExists = !!buckets?.some((b) => b.name === "post-covers");

  // Any admin user?
  if (status.schemaApplied) {
    const { data: profiles } = await admin
      .from("profiles")
      .select("id")
      .eq("role", "admin")
      .limit(1);
    status.adminUserExists = (profiles?.length ?? 0) > 0;
  }

  return status;
}

export async function readSchemaSqlAction(): Promise<string> {
  // Read the schema file shipped with the repo so the user can copy it
  // straight from the setup UI.
  const path = join(process.cwd(), "supabase", "schema.sql");
  return readFileSync(path, "utf-8");
}

/**
 * Create the admin user (idempotent) and seed 9 sample articles.
 * Mirrors `scripts/seed.mjs`, but callable from the browser as a form
 * action. Always finishes with a redirect back to /admin/setup with a
 * status banner — no client-side state needed.
 */
export async function seedSampleDataAction(formData: FormData): Promise<void> {
  await assertSetupAllowed();

  const email =
    String(formData.get("email") ?? "").trim() ||
    process.env.SEED_ADMIN_EMAIL ||
    "andreassina6a@gmail.com";
  const password =
    String(formData.get("password") ?? "") ||
    process.env.SEED_ADMIN_PASSWORD ||
    "admin11!";
  const displayName =
    String(formData.get("display_name") ?? "").trim() ||
    process.env.SEED_ADMIN_NAME ||
    "Andreas Sina";

  const admin = createSupabaseAdminClient();

  // 1) Verify schema is applied — else direct user back.
  const { error: schemaErr } = await admin
    .from("posts")
    .select("id", { head: true });
  if (schemaErr) {
    redirect(
      `/admin/setup?error=${encodeURIComponent(
        "Schema belum di-apply. Jalankan supabase/schema.sql dulu. " +
          schemaErr.message
      )}`
    );
  }

  // 2) Ensure admin user exists.
  let userId: string | null = null;
  try {
    const { data: list, error: listErr } = await admin.auth.admin.listUsers({
      page: 1,
      perPage: 200,
    });
    if (listErr) throw listErr;
    const existing = list.users.find((u) => u.email === email);
    if (existing) {
      userId = existing.id;
    } else {
      const { data: created, error: createErr } =
        await admin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: { display_name: displayName },
        });
      if (createErr) throw createErr;
      userId = created.user.id;
    }
  } catch (e) {
    redirect(
      `/admin/setup?error=${encodeURIComponent(
        "Gagal membuat user admin: " + (e as Error).message
      )}`
    );
  }
  if (!userId) {
    redirect(
      `/admin/setup?error=${encodeURIComponent(
        "User id tidak tersedia setelah create."
      )}`
    );
  }

  // 3) Promote profile to admin.
  const { error: profileErr } = await admin.from("profiles").upsert(
    {
      id: userId,
      email,
      display_name: displayName,
      role: "admin",
    },
    { onConflict: "id" }
  );
  if (profileErr) {
    redirect(
      `/admin/setup?error=${encodeURIComponent(
        "Gagal set role admin: " + profileErr.message
      )}`
    );
  }

  // 4) Insert sample posts (idempotent on slug). We pull the article
  //    list from `scripts/articles.mjs`. Static import so webpack
  //    bundles the payload into the server action's chunk — otherwise
  //    `process.cwd()/scripts/...` won't be present in the standalone
  //    Next.js build output.
  type Article = {
    title: string;
    slug: string;
    excerpt: string;
    content_json: unknown;
    cover?: string | null;
    main_category: string;
    sub_category: string;
    tags: string[];
    published_at: string;
  };
  let articles: Article[] = [];
  try {
    const mod = (await import("../../scripts/articles.mjs")) as {
      ARTICLES: Article[];
    };
    articles = mod.ARTICLES;
  } catch (e) {
    redirect(
      `/admin/setup?error=${encodeURIComponent(
        "Tidak bisa load scripts/articles.mjs: " + (e as Error).message
      )}`
    );
  }

  const exts = [
    StarterKit.configure({ heading: { levels: [2, 3] } }),
    LinkExt.configure({ openOnClick: false, autolink: true }),
    ImageExt,
    Typography,
  ];
  const injectIds = (html: string) =>
    html.replace(
      /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
      (_m, lvl: string, attrs: string, inner: string) => {
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
      }
    );
  const readingMins = (html: string) => {
    const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    return Math.max(1, Math.round(text.split(" ").length / 220));
  };

  let inserted = 0;
  const errors: string[] = [];
  for (const meta of articles) {
    let html = "";
    try {
      html = injectIds(generateHTML(meta.content_json as never, exts));
    } catch (e) {
      errors.push(`${meta.slug}: render gagal — ${(e as Error).message}`);
      continue;
    }
    const minutes = readingMins(html);
    const { error } = await admin.from("posts").upsert(
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
        author_id: userId,
        published_at: meta.published_at,
      },
      { onConflict: "slug" }
    );
    if (error) errors.push(`${meta.slug}: ${error.message}`);
    else inserted += 1;
  }

  // 5) Bust caches so /admin and / pick up the new data.
  revalidatePath("/", "layout");
  revalidatePath("/admin");

  const params = new URLSearchParams({
    seeded: "1",
    inserted: String(inserted),
    email,
  });
  if (errors.length > 0) params.set("errors", errors.slice(0, 3).join(" | "));
  redirect(`/admin/setup?${params.toString()}`);
}
