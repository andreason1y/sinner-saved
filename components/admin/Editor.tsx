"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import { buildExtensions } from "@/lib/editor/extensions";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Link as LinkIcon,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  Minus,
  Image as ImageIcon,
  Undo2,
  Redo2,
  Code2,
  Highlighter,
  Superscript,
  Subscript,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Eraser,
  Type,
  IndentIncrease,
  IndentDecrease,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  initialJson?: unknown;
  onChange: (json: unknown, html: string) => void;
  onUploadImage?: (file: File) => Promise<string>;
  onEditorReady?: (editor: Editor) => void;
};

export function PostEditor({
  initialJson,
  onChange,
  onUploadImage,
  onEditorReady,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const editor = useEditor({
    extensions: buildExtensions("Mulai menulis tulisan Anda…"),
    content: (initialJson as never) ?? undefined,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "post-prose min-h-[420px] focus:outline-none px-1 py-6 max-w-none",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getJSON(), editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor) {
      onChange(editor.getJSON(), editor.getHTML());
      onEditorReady?.(editor);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  const promptLink = useCallback(() => {
    if (!editor) return;
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL:", previous ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const triggerImageUpload = useCallback(() => {
    if (!onUploadImage) {
      window.alert("Upload gambar belum dikonfigurasi.");
      return;
    }
    fileInputRef.current?.click();
  }, [onUploadImage]);

  const onFilePicked = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !editor || !onUploadImage) return;
    try {
      const url = await onUploadImage(file);
      editor.chain().focus().setImage({ src: url, alt: file.name }).run();
    } catch (err) {
      console.error(err);
      window.alert("Gagal mengunggah gambar.");
    }
  };

  if (!editor) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-900/10 bg-white shadow-card">
      <Toolbar editor={editor} onLink={promptLink} onImage={triggerImageUpload} />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFilePicked}
      />
      <div className="px-6 sm:px-10">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

/* ── Toolbar ──────────────────────────────────────────────────────────── */

function Toolbar({
  editor,
  onLink,
  onImage,
}: {
  editor: Editor;
  onLink: () => void;
  onImage: () => void;
}) {
  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-0.5 border-b border-ink-900/10 bg-white/95 p-2 backdrop-blur">
      {/* Headings */}
      <Btn
        title="Heading 2"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive("heading", { level: 2 })}
      >
        <Heading2 size={15} />
      </Btn>
      <Btn
        title="Heading 3"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor.isActive("heading", { level: 3 })}
      >
        <Heading3 size={15} />
      </Btn>
      <Divider />

      {/* Inline formatting */}
      <Btn
        title="Bold (⌘B)"
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
      >
        <Bold size={15} />
      </Btn>
      <Btn
        title="Italic (⌘I)"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
      >
        <Italic size={15} />
      </Btn>
      <Btn
        title="Underline (⌘U)"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        active={editor.isActive("underline")}
      >
        <Underline size={15} />
      </Btn>
      <Btn
        title="Strikethrough"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive("strike")}
      >
        <Strikethrough size={15} />
      </Btn>
      <Btn
        title="Highlight"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        active={editor.isActive("highlight")}
      >
        <Highlighter size={15} />
      </Btn>
      <ColorPicker editor={editor} />
      <Divider />

      {/* Superscript / Subscript */}
      <Btn
        title="Superscript (mis. ayat²)"
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        active={editor.isActive("superscript")}
      >
        <Superscript size={15} />
      </Btn>
      <Btn
        title="Subscript"
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        active={editor.isActive("subscript")}
      >
        <Subscript size={15} />
      </Btn>
      <Divider />

      {/* Font size */}
      <FontSizeSelect editor={editor} />
      <Divider />

      {/* Link / inline code */}
      <Btn title="Link" onClick={onLink} active={editor.isActive("link")}>
        <LinkIcon size={15} />
      </Btn>
      <Btn
        title="Inline code"
        onClick={() => editor.chain().focus().toggleCode().run()}
        active={editor.isActive("code")}
      >
        <Code size={15} />
      </Btn>
      <Divider />

      {/* Block elements */}
      <Btn
        title="Bullet list"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive("bulletList")}
      >
        <List size={15} />
      </Btn>
      <Btn
        title="Numbered list"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive("orderedList")}
      >
        <ListOrdered size={15} />
      </Btn>
      <Btn
        title="Blockquote"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive("blockquote")}
      >
        <Quote size={15} />
      </Btn>
      <Btn
        title="Code block (untuk Yunani / Ibrani)"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        active={editor.isActive("codeBlock")}
      >
        <Code2 size={15} />
      </Btn>
      <Btn
        title="Garis pemisah"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Minus size={15} />
      </Btn>
      <Divider />

      {/* Text align */}
      <Btn
        title="Rata kiri"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        active={editor.isActive({ textAlign: "left" })}
      >
        <AlignLeft size={15} />
      </Btn>
      <Btn
        title="Rata tengah"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        active={editor.isActive({ textAlign: "center" })}
      >
        <AlignCenter size={15} />
      </Btn>
      <Btn
        title="Rata kanan"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        active={editor.isActive({ textAlign: "right" })}
      >
        <AlignRight size={15} />
      </Btn>
      <Btn
        title="Justify"
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        active={editor.isActive({ textAlign: "justify" })}
      >
        <AlignJustify size={15} />
      </Btn>
      <Btn
        title="Tambah indentasi"
        onClick={() => {
          if (editor.can().sinkListItem("listItem")) {
            editor.chain().focus().sinkListItem("listItem").run();
          } else {
            editor.chain().focus().indent().run();
          }
        }}
      >
        <IndentIncrease size={15} />
      </Btn>
      <Btn
        title="Kurangi indentasi"
        onClick={() => {
          if (editor.can().liftListItem("listItem")) {
            editor.chain().focus().liftListItem("listItem").run();
          } else {
            editor.chain().focus().outdent().run();
          }
        }}
      >
        <IndentDecrease size={15} />
      </Btn>
      <Divider />

      {/* Clear formatting */}
      <Btn
        title="Hapus semua pemformatan"
        onClick={() =>
          editor.chain().focus().clearNodes().unsetAllMarks().run()
        }
      >
        <Eraser size={15} />
      </Btn>
      <Divider />

      {/* Image */}
      <Btn title="Sisipkan gambar" onClick={onImage}>
        <ImageIcon size={15} />
      </Btn>

      {/* Undo / Redo pushed to the right */}
      <div className="ml-auto flex items-center gap-0.5">
        <Btn
          title="Undo (⌘Z)"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo2 size={15} />
        </Btn>
        <Btn
          title="Redo (⌘⇧Z)"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo2 size={15} />
        </Btn>
      </div>
    </div>
  );
}

/* ── Shared button ────────────────────────────────────────────────────── */

function Btn({
  onClick,
  active,
  title,
  children,
  disabled,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "inline-flex h-7 w-7 items-center justify-center rounded-md text-ink-700 transition-colors hover:bg-ink-900/5 hover:text-ink-900",
        active &&
          "bg-ink-900 text-parchment hover:bg-ink-900 hover:text-parchment",
        disabled && "opacity-40 hover:bg-transparent hover:text-ink-700"
      )}
    >
      {children}
    </button>
  );
}

/* ── Color picker ────────────────────────────────────────────────────── */

const PRESET_COLORS = [
  "#000000", "#374151", "#6b7280", "#b91c1c",
  "#c2410c", "#ca8a04", "#15803d", "#1d4ed8",
  "#7c3aed", "#be185d",
];

function ColorPicker({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const current = editor.getAttributes("textStyle").color as string | undefined;
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function close(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={panelRef} className="relative">
      <button
        type="button"
        title="Warna teks"
        onMouseDown={(e) => {
          e.preventDefault();
          setOpen((v) => !v);
        }}
        className="inline-flex h-7 w-7 flex-col items-center justify-center gap-0.5 rounded-md text-ink-700 hover:bg-ink-900/5"
      >
        <Type size={12} />
        <span
          className="h-1 w-4 rounded-full"
          style={{ backgroundColor: current ?? "#000000" }}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-8 z-20 rounded-xl border border-ink-900/10 bg-white p-2 shadow-lg">
          <div className="grid grid-cols-5 gap-1">
            {PRESET_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                title={c}
                onMouseDown={(e) => {
                  e.preventDefault();
                  editor.chain().focus().setColor(c).run();
                  setOpen(false);
                }}
                className={cn(
                  "h-5 w-5 rounded-md border border-black/10 transition-transform hover:scale-110",
                  current === c && "ring-2 ring-blue-500 ring-offset-1"
                )}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <label title="Warna kustom" className="cursor-pointer">
              <input
                type="color"
                value={current ?? "#000000"}
                onChange={(e) =>
                  editor.chain().focus().setColor(e.target.value).run()
                }
                className="h-5 w-5 cursor-pointer rounded border-0 p-0"
              />
            </label>
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                editor.chain().focus().unsetColor().run();
                setOpen(false);
              }}
              className="text-[11px] text-ink-500 hover:text-ink-800"
            >
              Hapus warna
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Font size dropdown ───────────────────────────────────────────────── */

const FONT_SIZES = [
  { label: "Normal", value: "" },
  { label: "Kecil", value: "0.8em" },
  { label: "Besar", value: "1.15em" },
  { label: "Ekstra", value: "1.35em" },
];

function FontSizeSelect({ editor }: { editor: Editor }) {
  const current = editor.getAttributes("textStyle").fontSize ?? "";
  const savedSel = useRef<{ from: number; to: number } | null>(null);

  return (
    <select
      title="Ukuran teks"
      value={current}
      onMouseDown={() => {
        // Save selection before focus shifts to the <select> element
        const { from, to } = editor.state.selection;
        savedSel.current = { from, to };
      }}
      onChange={(e) => {
        const val = e.target.value;
        let c = editor.chain().focus();
        if (savedSel.current) {
          c = c.setTextSelection(savedSel.current);
        }
        if (!val) {
          c.unsetFontSize().run();
        } else {
          c.setFontSize(val).run();
        }
        savedSel.current = null;
      }}
      className="h-7 cursor-pointer rounded-md bg-transparent px-1 text-xs text-ink-700 outline-none hover:bg-ink-900/5"
    >
      {FONT_SIZES.map((s) => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
    </select>
  );
}

function Divider() {
  return <span className="mx-0.5 h-4 w-px shrink-0 bg-ink-900/10" aria-hidden />;
}
