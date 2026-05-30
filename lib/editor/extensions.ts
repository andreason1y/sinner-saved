import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import { FontSize } from "./font-size";

/**
 * Single source of truth for the editor's extension set.
 * Used by both the in-browser editor and the server-side `generateHTML`
 * pass so client and server render the same nodes/marks.
 */
export const buildExtensions = (placeholder?: string) => [
  StarterKit.configure({
    heading: { levels: [2, 3] },
    codeBlock: { HTMLAttributes: { class: "post-codeblock" } },
    blockquote: {},
    horizontalRule: {},
    bulletList: {},
    orderedList: {},
    bold: {},
    italic: {},
    code: {},
    history: {},
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    linkOnPaste: true,
    HTMLAttributes: {
      rel: "noopener noreferrer",
      target: "_blank",
    },
  }),
  Image.configure({
    HTMLAttributes: { loading: "lazy" },
  }),
  Typography,
  Placeholder.configure({
    placeholder:
      placeholder ?? "Mulai menulis… (Markdown shortcut: # / ** / > / `)",
  }),
  Underline,
  Highlight.configure({ multicolor: false }),
  Subscript,
  Superscript,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  TextStyle,
  FontSize,
];
