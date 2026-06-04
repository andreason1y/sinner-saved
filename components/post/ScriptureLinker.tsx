"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { findScriptureRefs } from "@/lib/scripture/parse";
import { getVerse } from "@/lib/scripture/verses";
import { useLocale } from "@/components/i18n/LocaleProvider";

type Popover = {
  ref: string;
  text: string | null;
  top: number;
  left: number;
} | null;

type Sheet = { ref: string; text: string | null; url: string } | null;

// Text nodes inside these elements are left untouched (already links, code
// samples, or headings used as TOC anchors).
const SKIP_ANCESTORS = new Set([
  "A",
  "CODE",
  "PRE",
  "SCRIPT",
  "STYLE",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
]);

function hasSkippedAncestor(node: Node, root: HTMLElement): boolean {
  let el = node.parentElement;
  while (el && el !== root) {
    if (SKIP_ANCESTORS.has(el.tagName)) return true;
    el = el.parentElement;
  }
  return false;
}

/**
 * Wraps post body content and, after render, turns every Bible reference in
 * the prose into a link to an Indonesian Bible reader.
 *
 * - Desktop (fine pointer): hovering/focusing a reference shows a popover.
 *   When the verse is in our curated set, the popover shows the full text;
 *   otherwise just the citation + "open in SABDA" hint. Clicking still opens
 *   the external reader.
 * - Mobile (coarse pointer, no hover): tapping a reference opens a bottom
 *   sheet with the verse text and an explicit button to open SABDA, instead
 *   of navigating away immediately.
 *
 * We post-process the live DOM rather than the HTML string so we never break
 * existing markup (links, code blocks) and ship zero extra render cost on the
 * server.
 */
export function ScriptureLinker({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [pop, setPop] = useState<Popover>(null);
  const [sheet, setSheet] = useState<Sheet>(null);
  const coarseRef = useRef(false);
  const { t } = useLocale();

  useEffect(() => {
    coarseRef.current =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none), (pointer: coarse)").matches;
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || root.dataset.scriptureLinked === "true") return;
    root.dataset.scriptureLinked = "true";

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) {
          return NodeFilter.FILTER_REJECT;
        }
        return hasSkippedAncestor(node, root)
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_ACCEPT;
      },
    });

    const targets: Text[] = [];
    let current = walker.nextNode();
    while (current) {
      targets.push(current as Text);
      current = walker.nextNode();
    }

    for (const node of targets) {
      const text = node.nodeValue ?? "";
      const refs = findScriptureRefs(text);
      if (refs.length === 0) continue;

      const frag = document.createDocumentFragment();
      let cursor = 0;
      for (const ref of refs) {
        if (ref.index > cursor) {
          frag.appendChild(
            document.createTextNode(text.slice(cursor, ref.index))
          );
        }
        const a = document.createElement("a");
        a.href = ref.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.className = "scripture-ref";
        a.dataset.ref = ref.canonical;
        a.textContent = ref.raw;
        frag.appendChild(a);
        cursor = ref.index + ref.length;
      }
      if (cursor < text.length) {
        frag.appendChild(document.createTextNode(text.slice(cursor)));
      }
      node.parentNode?.replaceChild(frag, node);
    }
  }, []);

  // Popover follows the hovered/focused reference (desktop only).
  function showFor(target: HTMLElement) {
    const rect = target.getBoundingClientRect();
    const margin = 12;
    const left = Math.min(
      Math.max(rect.left + rect.width / 2, margin),
      window.innerWidth - margin
    );
    const canonical = target.dataset.ref ?? target.textContent ?? "";
    setPop({
      ref: canonical,
      text: getVerse(canonical)?.text ?? null,
      top: rect.top,
      left,
    });
  }

  function onPointerOver(e: React.MouseEvent) {
    if (coarseRef.current) return;
    const el = (e.target as HTMLElement).closest(".scripture-ref");
    if (el instanceof HTMLElement) showFor(el);
  }
  function onPointerOut(e: React.MouseEvent) {
    if (coarseRef.current) return;
    if ((e.target as HTMLElement).closest(".scripture-ref")) setPop(null);
  }
  function onFocusIn(e: React.FocusEvent) {
    if (coarseRef.current) return;
    const el = (e.target as HTMLElement).closest(".scripture-ref");
    if (el instanceof HTMLElement) showFor(el);
  }

  // On touch devices, intercept the tap: open a bottom sheet instead of
  // navigating away. The sheet's button performs the actual navigation.
  function onClick(e: React.MouseEvent) {
    if (!coarseRef.current) return;
    const el = (e.target as HTMLElement).closest(".scripture-ref");
    if (!(el instanceof HTMLElement)) return;
    e.preventDefault();
    const canonical = el.dataset.ref ?? el.textContent ?? "";
    setSheet({
      ref: canonical,
      text: getVerse(canonical)?.text ?? null,
      url: el.getAttribute("href") ?? "#",
    });
  }

  // A fixed popover detaches from its anchor on scroll — dismiss it.
  useEffect(() => {
    if (!pop) return;
    const dismiss = () => setPop(null);
    window.addEventListener("scroll", dismiss, { passive: true, capture: true });
    return () => window.removeEventListener("scroll", dismiss, { capture: true });
  }, [pop]);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    if (!sheet) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sheet]);

  return (
    <div
      ref={rootRef}
      onMouseOver={onPointerOver}
      onMouseOut={onPointerOut}
      onFocus={onFocusIn}
      onBlur={() => setPop(null)}
      onClick={onClick}
    >
      {children}

      {/* Desktop popover */}
      <AnimatePresence>
        {pop && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            style={{
              position: "fixed",
              top: pop.top,
              left: pop.left,
              transform: "translate(-50%, calc(-100% - 10px))",
            }}
            className="pointer-events-none z-50 w-max max-w-[20rem] rounded-xl border border-ink-900/10 bg-white/95 px-4 py-3 shadow-card-hover backdrop-blur-xl dark:border-white/10 dark:bg-ink-900/95"
          >
            <p className="text-[10px] uppercase tracking-[0.28em] text-sacred-700 dark:text-sacred-300">
              {pop.ref}
            </p>
            {pop.text ? (
              <p className="serif-display mt-2 max-h-48 overflow-hidden text-sm leading-snug text-ink-800 dark:text-ink-100">
                {pop.text}
              </p>
            ) : (
              <p className="mt-1 text-[11px] text-sacred-700 dark:text-sacred-300">
                {t.post.scriptureOpen}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile bottom sheet */}
      <AnimatePresence>
        {sheet && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              aria-label="Tutup"
              className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm"
              onClick={() => setSheet(null)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="relative w-full max-w-lg rounded-t-3xl border-t border-ink-900/10 bg-parchment px-6 pb-8 pt-5 shadow-card-hover dark:border-white/10 dark:bg-ink-900"
            >
              <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-ink-900/15 dark:bg-white/15" />
              <div className="flex items-start justify-between gap-4">
                <p className="text-xs uppercase tracking-[0.28em] text-sacred-700 dark:text-sacred-300">
                  {sheet.ref}
                </p>
                <button
                  aria-label="Tutup"
                  onClick={() => setSheet(null)}
                  className="-mr-1 -mt-1 rounded-full p-1.5 text-ink-500 transition-colors hover:bg-ink-900/5 hover:text-ink-900 dark:text-ink-400 dark:hover:bg-white/10 dark:hover:text-ink-50"
                >
                  <X size={16} />
                </button>
              </div>

              {sheet.text ? (
                <p className="serif-display mt-3 text-lg leading-relaxed text-ink-900 dark:text-ink-50">
                  {sheet.text}
                </p>
              ) : (
                <p className="mt-3 text-sm text-ink-600 dark:text-ink-300">
                  Buka referensi ini di Alkitab SABDA untuk membaca teks lengkapnya.
                </p>
              )}

              <a
                href={sheet.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink-900 px-5 py-3 text-sm font-medium text-parchment transition-colors hover:bg-ink-800 dark:bg-ink-50 dark:text-ink-950 dark:hover:bg-white"
              >
                {t.post.scriptureOpen}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
