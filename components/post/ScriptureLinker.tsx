"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { findScriptureRefs } from "@/lib/scripture/parse";
import { useLocale } from "@/components/i18n/LocaleProvider";

type Popover = { label: string; top: number; left: number } | null;

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
 * the prose into a link to an Indonesian Bible reader. Hovering (or focusing)
 * a reference shows a small popover with the normalized citation.
 *
 * We post-process the live DOM rather than the HTML string so we never break
 * existing markup (links, code blocks) and ship zero extra render cost on the
 * server.
 */
export function ScriptureLinker({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [pop, setPop] = useState<Popover>(null);
  const { t } = useLocale();

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

  // Popover follows the hovered/focused reference. It's purely informational
  // (the reference itself is the link), so keep it non-interactive.
  function showFor(target: HTMLElement) {
    const rect = target.getBoundingClientRect();
    const margin = 12;
    const left = Math.min(
      Math.max(rect.left + rect.width / 2, margin),
      window.innerWidth - margin
    );
    setPop({ label: target.dataset.ref ?? target.textContent ?? "", top: rect.top, left });
  }

  function onPointerOver(e: React.MouseEvent) {
    const el = (e.target as HTMLElement).closest(".scripture-ref");
    if (el instanceof HTMLElement) showFor(el);
  }
  function onPointerOut(e: React.MouseEvent) {
    if ((e.target as HTMLElement).closest(".scripture-ref")) setPop(null);
  }
  function onFocusIn(e: React.FocusEvent) {
    const el = (e.target as HTMLElement).closest(".scripture-ref");
    if (el instanceof HTMLElement) showFor(el);
  }

  // A fixed popover detaches from its anchor on scroll — dismiss it.
  useEffect(() => {
    if (!pop) return;
    const dismiss = () => setPop(null);
    window.addEventListener("scroll", dismiss, { passive: true, capture: true });
    return () => window.removeEventListener("scroll", dismiss, { capture: true });
  }, [pop]);

  return (
    <div
      ref={rootRef}
      onMouseOver={onPointerOver}
      onMouseOut={onPointerOut}
      onFocus={onFocusIn}
      onBlur={() => setPop(null)}
    >
      {children}

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
            className="pointer-events-none z-50 w-max max-w-[16rem] rounded-xl border border-ink-900/10 bg-white/95 px-4 py-2.5 shadow-card-hover backdrop-blur-xl dark:border-white/10 dark:bg-ink-900/95"
          >
            <p className="serif-display text-sm leading-tight text-ink-900 dark:text-ink-50">
              {pop.label}
            </p>
            <p className="mt-1 text-[11px] text-sacred-700 dark:text-sacred-300">
              {t.post.scriptureOpen}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
