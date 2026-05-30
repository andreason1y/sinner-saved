"use client";

import { useEffect, useRef, useState } from "react";
import { Share2, Check } from "lucide-react";

export function ShareButton({
  title,
  label,
  copiedLabel,
}: {
  title: string;
  label: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  async function handleShare() {
    const url = window.location.href;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err) {
        // User cancelled the share sheet — not an error worth surfacing.
        if ((err as Error)?.name !== "AbortError") {
          // Fall back to copying the link if sharing failed for another reason.
          await copyLink(url);
        }
      }
      return;
    }

    await copyLink(url);
  }

  async function copyLink(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. non-secure context) — nothing else to do.
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label={label}
      className="group inline-flex items-center gap-2 rounded-full text-sacred-600 transition-colors hover:text-sacred-700 dark:text-sacred-300 dark:hover:text-sacred-200"
    >
      {copied ? <Check size={14} /> : <Share2 size={14} />}
      <span>{copied ? copiedLabel : label}</span>
    </button>
  );
}
