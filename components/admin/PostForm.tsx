"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  createPostAction,
  updatePostAction,
  deletePostAction,
  uploadCoverImageAction,
} from "@/lib/actions/posts";
import { generateTagsAction, suggestSubcategoryAction } from "@/lib/actions/ai";
import { CATEGORIES } from "@/lib/categories";
import { PostEditor } from "./Editor";
import {
  Loader2,
  Save,
  Trash2,
  ExternalLink,
  Eye,
  CheckCircle2,
  ImageUp,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

type InitialPost = {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  cover?: string | null;
  mainCategory?: string;
  subCategory?: string;
  tags?: string[];
  status?: "draft" | "published";
  contentJson?: unknown;
};

export function PostForm({
  initial,
  mode,
  savedFlag,
}: {
  initial?: InitialPost;
  mode: "create" | "edit";
  savedFlag?: boolean;
}) {
  const router = useRouter();
  const [contentJson, setContentJson] = useState<unknown>(
    initial?.contentJson ?? null
  );
  // Editor outputs HTML too — we don't need to send it, server re-renders
  // from the JSON, but we keep it here for potential live previews.
  const [, setContentHtml] = useState("");
  const [cover, setCover] = useState(initial?.cover ?? "");
  const [uploading, setUploading] = useState(false);
  const [main, setMain] = useState(
    initial?.mainCategory ?? CATEGORIES[0].slug
  );
  const [showSaved, setShowSaved] = useState(false);

  const subOptions = useMemo(
    () => CATEGORIES.find((c) => c.slug === main)?.subcategories ?? [],
    [main]
  );

  const [sub, setSub] = useState(
    initial?.subCategory ??
      (CATEGORIES.find((c) => c.slug === (initial?.mainCategory ?? CATEGORIES[0].slug))
        ?.subcategories[0]?.slug ?? "")
  );
  const [tags, setTags] = useState(initial?.tags?.join(", ") ?? "");
  const [generatingTags, setGeneratingTags] = useState(false);
  const [suggestingSub, setSuggestingSub] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const excerptRef = useRef<HTMLTextAreaElement>(null);

  const handleGenerateTags = async () => {
    const title = titleRef.current?.value ?? "";
    const excerpt = excerptRef.current?.value ?? "";
    if (!title) return;
    setGeneratingTags(true);
    try {
      const res = await generateTagsAction(title, excerpt, main);
      if (res.tags) setTags(res.tags.join(", "));
      else if (res.error) window.alert(res.error);
    } finally {
      setGeneratingTags(false);
    }
  };

  const handleSuggestSub = async () => {
    const title = titleRef.current?.value ?? "";
    const excerpt = excerptRef.current?.value ?? "";
    setSuggestingSub(true);
    try {
      const res = await suggestSubcategoryAction(title, excerpt, main);
      if (res.slug) setSub(res.slug);
      else if (res.error) window.alert(res.error);
    } finally {
      setSuggestingSub(false);
    }
  };

  // Hydrate "Saved" toast from URL flag (after redirect from create)
  useEffect(() => {
    if (savedFlag) {
      setShowSaved(true);
      const t = setTimeout(() => setShowSaved(false), 2000);
      return () => clearTimeout(t);
    }
  }, [savedFlag]);

  // Bind the appropriate action
  const action = useMemo(() => {
    if (mode === "edit" && initial?.id) {
      return updatePostAction.bind(null, initial.id);
    }
    return createPostAction;
  }, [mode, initial?.id]);

  const [state, formAction] = useFormState(action, {} as { error?: string; ok?: boolean });

  // Show toast on successful update (edit mode stays on the page)
  useEffect(() => {
    if (state.ok) {
      setShowSaved(true);
      const t = setTimeout(() => setShowSaved(false), 2000);
      return () => clearTimeout(t);
    }
  }, [state.ok]);

  const onCoverFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.set("file", file);
      const res = await uploadCoverImageAction(fd);
      if ("url" in res && res.url) setCover(res.url);
      else if ("error" in res && res.error) window.alert(res.error);
    } finally {
      setUploading(false);
    }
  };

  const editorImageUpload = async (file: File) => {
    const fd = new FormData();
    fd.set("file", file);
    const res = await uploadCoverImageAction(fd);
    if ("url" in res && res.url) return res.url;
    throw new Error("error" in res ? res.error : "Upload gagal");
  };

  const [isDeleting, startDelete] = useTransition();

  return (
    <form action={formAction} className="relative">
      {/* Toast */}
      {showSaved && (
        <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-full bg-ink-900 px-4 py-2 text-xs font-medium text-parchment shadow-card-hover">
          <span className="inline-flex items-center gap-2">
            <CheckCircle2 size={14} className="text-sacred-300" />
            Tersimpan
          </span>
        </div>
      )}

      {/* Top bar */}
      <div className="sticky top-0 z-30 -mx-6 mb-8 flex items-center justify-between gap-3 border-b border-ink-900/10 bg-parchment/85 px-6 py-3 backdrop-blur lg:-mx-12 lg:px-12">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="text-xs uppercase tracking-[0.28em] text-ink-500 hover:text-ink-900"
          >
            ← Dashboard
          </Link>
          <span className="text-ink-300">/</span>
          <span className="text-xs uppercase tracking-[0.28em] text-ink-700">
            {mode === "create" ? "Tulisan baru" : "Edit tulisan"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {mode === "edit" && initial?.slug && initial.mainCategory && (
            <Link
              href={`/${initial.mainCategory}/${initial.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/15 px-3 py-1.5 text-xs text-ink-700 hover:bg-white"
            >
              <Eye size={12} />
              Pratinjau
              <ExternalLink size={11} className="opacity-60" />
            </Link>
          )}
          {mode === "edit" && initial?.id && (
            <DeleteButton
              id={initial.id}
              isDeleting={isDeleting}
              onDelete={(id) =>
                startDelete(async () => {
                  if (window.confirm("Hapus tulisan ini? Tidak bisa dibatalkan.")) {
                    await deletePostAction(id);
                    router.push("/admin");
                  }
                })
              }
            />
          )}
          <SaveButton mode={mode} />
        </div>
      </div>

      {state.error && (
        <p className="mb-6 rounded-lg border border-crimson-500/30 bg-crimson-500/5 px-4 py-3 text-sm text-crimson-600">
          {state.error}
        </p>
      )}

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Main column */}
        <div className="lg:col-span-8 space-y-6">
          <input type="hidden" name="content_json" value={JSON.stringify(contentJson ?? {})} />

          <Field label="Judul" name="title" required>
            <input
              ref={titleRef}
              name="title"
              defaultValue={initial?.title}
              placeholder="Mis. Apa arti charis dalam Efesus 2:8?"
              required
              className="serif-display w-full bg-transparent px-1 py-2 text-3xl tracking-tightest text-ink-900 outline-none placeholder:text-ink-300 sm:text-4xl"
            />
          </Field>

          <Field label="Excerpt" name="excerpt">
            <textarea
              ref={excerptRef}
              name="excerpt"
              defaultValue={initial?.excerpt}
              placeholder="Ringkasan 1–2 kalimat yang muncul di kartu dan halaman arsip."
              rows={2}
              className="w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm text-ink-800 outline-none focus:border-ink-900"
            />
          </Field>

          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.28em] text-ink-500">
              Konten
            </p>
            <PostEditor
              initialJson={initial?.contentJson}
              onChange={(json, html) => {
                setContentJson(json);
                setContentHtml(html);
              }}
              onUploadImage={editorImageUpload}
            />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:col-span-4">
          <SidebarBlock label="Status">
            <div className="flex gap-2">
              <RadioPill
                name="status"
                value="draft"
                defaultChecked={initial?.status !== "published"}
                label="Draft"
              />
              <RadioPill
                name="status"
                value="published"
                defaultChecked={initial?.status === "published"}
                label="Publish"
                variant="publish"
              />
            </div>
          </SidebarBlock>

          <SidebarBlock label="Cover image">
            {cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={cover}
                alt="cover"
                className="mb-3 aspect-[16/10] w-full rounded-xl object-cover"
              />
            ) : (
              <div className="mb-3 flex aspect-[16/10] w-full items-center justify-center rounded-xl border border-dashed border-ink-900/15 bg-parchment-deep/30 text-xs text-ink-400">
                Belum ada cover
              </div>
            )}
            <input type="hidden" name="cover" value={cover} />
            <div className="flex gap-2">
              <label
                className={cn(
                  "inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-ink-900/15 bg-white px-3 py-2 text-xs text-ink-700 transition-colors hover:bg-parchment-deep/40",
                  uploading && "opacity-60"
                )}
              >
                {uploading ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <ImageUp size={12} />
                )}
                {uploading ? "Mengunggah…" : "Unggah"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onCoverFile}
                  disabled={uploading}
                />
              </label>
              {cover && (
                <button
                  type="button"
                  onClick={() => setCover("")}
                  className="rounded-lg border border-ink-900/15 px-3 py-2 text-xs text-ink-600 hover:bg-parchment-deep/40"
                >
                  Hapus
                </button>
              )}
            </div>
            <input
              type="text"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
              placeholder="atau tempel URL gambar…"
              className="mt-2 w-full rounded-lg border border-ink-900/10 bg-white px-3 py-2 text-xs text-ink-800 outline-none focus:border-ink-900"
            />
          </SidebarBlock>

          <SidebarBlock label="Slug">
            <input
              name="slug"
              defaultValue={initial?.slug}
              placeholder="auto dari judul"
              className="w-full rounded-lg border border-ink-900/10 bg-white px-3 py-2 text-xs text-ink-800 outline-none focus:border-ink-900"
            />
            <p className="mt-1 text-[11px] text-ink-400">
              Kosongkan untuk auto-generate dari judul.
            </p>
          </SidebarBlock>

          <SidebarBlock label="Kategori utama">
            <select
              name="main_category"
              value={main}
              onChange={(e) => {
                const newMain = e.target.value;
                setMain(newMain);
                const firstSub =
                  CATEGORIES.find((c) => c.slug === newMain)
                    ?.subcategories[0]?.slug ?? "";
                setSub(firstSub);
              }}
              className="w-full rounded-lg border border-ink-900/10 bg-white px-3 py-2 text-xs text-ink-800 outline-none focus:border-ink-900"
            >
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </SidebarBlock>

          <SidebarBlock label="Sub-kategori">
            <div className="flex items-center gap-2">
              <select
                name="sub_category"
                value={sub}
                onChange={(e) => setSub(e.target.value)}
                className="flex-1 rounded-lg border border-ink-900/10 bg-white px-3 py-2 text-xs text-ink-800 outline-none focus:border-ink-900"
              >
                {subOptions.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleSuggestSub}
                disabled={suggestingSub}
                title="Suggest sub-kategori dengan AI"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-ink-900/10 bg-white text-ink-500 transition-colors hover:border-sacred-400 hover:text-sacred-600 disabled:opacity-50"
              >
                {suggestingSub ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : (
                  <Sparkles size={13} />
                )}
              </button>
            </div>
          </SidebarBlock>

          <SidebarBlock label="Tags">
            <input
              name="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="charis, paulus, soteriologi"
              className="w-full rounded-lg border border-ink-900/10 bg-white px-3 py-2 text-xs text-ink-800 outline-none focus:border-ink-900"
            />
            <div className="mt-1.5 flex items-center justify-between">
              <p className="text-[11px] text-ink-400">Pisahkan dengan koma.</p>
              <button
                type="button"
                onClick={handleGenerateTags}
                disabled={generatingTags}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-sacred-600 transition-colors hover:bg-sacred-50 disabled:opacity-50"
              >
                {generatingTags ? (
                  <Loader2 size={11} className="animate-spin" />
                ) : (
                  <Sparkles size={11} />
                )}
                {generatingTags ? "Generating…" : "Generate AI"}
              </button>
            </div>
          </SidebarBlock>
        </aside>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  required,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block" htmlFor={name}>
      <span className="text-xs uppercase tracking-[0.28em] text-ink-500">
        {label} {required && <span className="text-crimson-500">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function SidebarBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-ink-900/10 bg-white p-4">
      <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-ink-500">
        {label}
      </p>
      {children}
    </div>
  );
}

function RadioPill({
  name,
  value,
  defaultChecked,
  label,
  variant = "default",
}: {
  name: string;
  value: string;
  defaultChecked?: boolean;
  label: string;
  variant?: "default" | "publish";
}) {
  const checkedClass =
    variant === "publish"
      ? "peer-checked:border-emerald-600 peer-checked:bg-emerald-600 peer-checked:text-white"
      : "peer-checked:border-ink-900 peer-checked:bg-ink-900 peer-checked:text-parchment";
  return (
    <label className="cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <span
        className={`inline-flex items-center justify-center rounded-full border border-ink-900/15 bg-white px-3 py-1.5 text-xs text-ink-700 transition-colors ${checkedClass}`}
      >
        {label}
      </span>
    </label>
  );
}

function SaveButton({ mode }: { mode: "create" | "edit" }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-xs font-medium uppercase tracking-wider text-parchment transition-transform hover:scale-[1.02] disabled:opacity-60"
    >
      {pending ? (
        <Loader2 size={12} className="animate-spin" />
      ) : (
        <Save size={12} />
      )}
      {mode === "create" ? "Simpan" : "Simpan perubahan"}
    </button>
  );
}

function DeleteButton({
  id,
  isDeleting,
  onDelete,
}: {
  id: string;
  isDeleting: boolean;
  onDelete: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onDelete(id)}
      disabled={isDeleting}
      className="inline-flex items-center gap-1.5 rounded-full border border-crimson-500/30 px-3 py-1.5 text-xs text-crimson-600 transition-colors hover:bg-crimson-500/5 disabled:opacity-50"
    >
      {isDeleting ? (
        <Loader2 size={12} className="animate-spin" />
      ) : (
        <Trash2 size={12} />
      )}
      Hapus
    </button>
  );
}
