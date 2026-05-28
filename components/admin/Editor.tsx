"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import { buildExtensions } from "@/lib/editor/extensions";
import {
  Bold,
  Italic,
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
} from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** Initial Tiptap JSON document. Optional. */
  initialJson?: unknown;
  /** Called whenever the document changes (debounced upstream if needed). */
  onChange: (json: unknown, html: string) => void;
  /** Image upload — receives a File, returns a public URL. */
  onUploadImage?: (file: File) => Promise<string>;
};

export function PostEditor({ initialJson, onChange, onUploadImage }: Props) {
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

  // Re-emit on first mount so the parent has both representations.
  useEffect(() => {
    if (editor) onChange(editor.getJSON(), editor.getHTML());
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
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
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
      <Toolbar
        editor={editor}
        onLink={promptLink}
        onImage={triggerImageUpload}
      />
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

function Toolbar({
  editor,
  onLink,
  onImage,
}: {
  editor: Editor;
  onLink: () => void;
  onImage: () => void;
}) {
  const Btn = ({
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
  }) => (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-md text-ink-700 transition-colors hover:bg-ink-900/5 hover:text-ink-900",
        active && "bg-ink-900 text-parchment hover:bg-ink-900 hover:text-parchment",
        disabled && "opacity-40 hover:bg-transparent hover:text-ink-700"
      )}
    >
      {children}
    </button>
  );

  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 border-b border-ink-900/10 bg-white/95 p-2 backdrop-blur">
      <Btn
        title="Heading 2"
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        active={editor.isActive("heading", { level: 2 })}
      >
        <Heading2 size={16} />
      </Btn>
      <Btn
        title="Heading 3"
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
        active={editor.isActive("heading", { level: 3 })}
      >
        <Heading3 size={16} />
      </Btn>
      <Divider />
      <Btn
        title="Bold (⌘B)"
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
      >
        <Bold size={16} />
      </Btn>
      <Btn
        title="Italic (⌘I)"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
      >
        <Italic size={16} />
      </Btn>
      <Btn
        title="Inline code"
        onClick={() => editor.chain().focus().toggleCode().run()}
        active={editor.isActive("code")}
      >
        <Code size={16} />
      </Btn>
      <Btn title="Link" onClick={onLink} active={editor.isActive("link")}>
        <LinkIcon size={16} />
      </Btn>
      <Divider />
      <Btn
        title="Bullet list"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive("bulletList")}
      >
        <List size={16} />
      </Btn>
      <Btn
        title="Numbered list"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive("orderedList")}
      >
        <ListOrdered size={16} />
      </Btn>
      <Btn
        title="Blockquote"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive("blockquote")}
      >
        <Quote size={16} />
      </Btn>
      <Btn
        title="Code block (untuk Yunani / Ibrani)"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        active={editor.isActive("codeBlock")}
      >
        <Code2 size={16} />
      </Btn>
      <Btn
        title="Horizontal rule"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Minus size={16} />
      </Btn>
      <Btn title="Sisipkan gambar" onClick={onImage}>
        <ImageIcon size={16} />
      </Btn>
      <div className="ml-auto flex items-center gap-1">
        <Btn
          title="Undo (⌘Z)"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo2 size={16} />
        </Btn>
        <Btn
          title="Redo (⌘⇧Z)"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo2 size={16} />
        </Btn>
      </div>
    </div>
  );
}

function Divider() {
  return <span className="mx-1 h-5 w-px bg-ink-900/10" aria-hidden />;
}
