"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { renderTiptapToHtml, estimateReadingMinutes } from "@/lib/editor/render-html";
import { slugify } from "@/lib/toc";

type PostFormState = { error?: string; ok?: boolean; id?: string };

export async function requireAdmin() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Tidak ada session.");
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (profile?.role !== "admin") throw new Error("Bukan admin.");
  return { supabase, user };
}

function parseFormData(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = slugInput ? slugify(slugInput) : slugify(title);
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const cover = String(formData.get("cover") ?? "").trim() || null;
  const main_category = String(formData.get("main_category") ?? "");
  const sub_category = String(formData.get("sub_category") ?? "");
  const tagsCsv = String(formData.get("tags") ?? "");
  const tags = tagsCsv
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const status = (String(formData.get("status") ?? "draft") === "published"
    ? "published"
    : "draft") as "draft" | "published";

  let contentJson: unknown = {};
  const contentRaw = String(formData.get("content_json") ?? "");
  if (contentRaw) {
    try {
      contentJson = JSON.parse(contentRaw);
    } catch {
      contentJson = {};
    }
  }

  const title_en = String(formData.get("title_en") ?? "").trim() || null;
  const excerpt_en = String(formData.get("excerpt_en") ?? "").trim() || null;
  const content_html_en = String(formData.get("content_html_en") ?? "").trim() || null;

  return {
    title,
    slug,
    excerpt,
    cover,
    main_category,
    sub_category,
    tags,
    status,
    contentJson,
    title_en,
    excerpt_en,
    content_html_en,
  };
}

export async function createPostAction(
  _prev: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  try {
    const { supabase, user } = await requireAdmin();
    const parsed = parseFormData(formData);

    if (!parsed.title) return { error: "Judul wajib diisi." };
    if (!parsed.main_category)
      return { error: "Kategori utama wajib dipilih." };
    if (!parsed.sub_category)
      return { error: "Sub-kategori wajib dipilih." };

    const html = renderTiptapToHtml(parsed.contentJson);
    const reading_minutes = estimateReadingMinutes(html);

    const { data, error } = await supabase
      .from("posts")
      .insert({
        title: parsed.title,
        slug: parsed.slug,
        excerpt: parsed.excerpt,
        content_json: parsed.contentJson,
        content_html: html,
        cover: parsed.cover,
        main_category: parsed.main_category,
        sub_category: parsed.sub_category,
        tags: parsed.tags,
        status: parsed.status,
        reading_minutes,
        author_id: user.id,
        title_en: parsed.title_en,
        excerpt_en: parsed.excerpt_en,
        content_html_en: parsed.content_html_en,
      })
      .select("id")
      .single();

    if (error) return { error: error.message };

    revalidatePath("/", "layout");
    redirect(`/admin/posts/${data.id}/edit?saved=1`);
  } catch (e) {
    if ((e as { digest?: string })?.digest?.startsWith("NEXT_REDIRECT")) {
      throw e;
    }
    return { error: (e as Error).message };
  }
  return {};
}

export async function updatePostAction(
  id: string,
  _prev: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  try {
    const { supabase } = await requireAdmin();
    const parsed = parseFormData(formData);

    if (!parsed.title) return { error: "Judul wajib diisi." };
    const html = renderTiptapToHtml(parsed.contentJson);
    const reading_minutes = estimateReadingMinutes(html);

    const { error } = await supabase
      .from("posts")
      .update({
        title: parsed.title,
        slug: parsed.slug,
        excerpt: parsed.excerpt,
        content_json: parsed.contentJson,
        content_html: html,
        cover: parsed.cover,
        main_category: parsed.main_category,
        sub_category: parsed.sub_category,
        tags: parsed.tags,
        status: parsed.status,
        reading_minutes,
        title_en: parsed.title_en,
        excerpt_en: parsed.excerpt_en,
        content_html_en: parsed.content_html_en,
      })
      .eq("id", id);

    if (error) return { error: error.message };

    revalidatePath("/", "layout");
    revalidatePath(`/admin/posts/${id}/edit`);
    return { ok: true, id };
  } catch (e) {
    return { error: (e as Error).message };
  }
}

export async function deletePostAction(id: string) {
  await requireAdmin();
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
  revalidatePath("/admin");
  redirect("/admin");
}

/**
 * Server action used by the editor's image-picker. Uploads to the public
 * `post-covers` bucket via service-role (bypasses RLS, but only callable
 * server-side from an authenticated admin context).
 */
export async function uploadCoverImageAction(formData: FormData) {
  await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return { error: "Tidak ada file." };
  }

  const admin = createSupabaseAdminClient();
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeBase = file.name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .slice(0, 40);
  const filename = `${Date.now()}-${safeBase || "image"}.${ext}`;

  const bytes = new Uint8Array(await file.arrayBuffer());
  const { error: uploadError } = await admin.storage
    .from("post-covers")
    .upload(filename, bytes, {
      contentType: file.type || `image/${ext}`,
      upsert: false,
    });
  if (uploadError) return { error: uploadError.message };

  const { data } = admin.storage.from("post-covers").getPublicUrl(filename);
  return { url: data.publicUrl };
}
