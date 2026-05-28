"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

/**
 * Client-only "Copy SQL" affordance for the setup page. Keeps the schema
 * payload off the initial render of the server component until the user
 * actively wants it (toggleable preview), and provides clipboard support.
 */
export function SetupClient({ sql }: { sql: string }) {
  const [copied, setCopied] = useState(false);
  const [showSql, setShowSql] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(sql);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setShowSql(true); // fallback: let them select manually
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 bg-white px-4 py-2 text-xs font-medium uppercase tracking-wider text-ink-900 hover:border-ink-900/40"
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
        {copied ? "Tersalin" : "Copy schema.sql"}
      </button>
      <button
        type="button"
        onClick={() => setShowSql((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 bg-white px-4 py-2 text-xs font-medium uppercase tracking-wider text-ink-700 hover:border-ink-900/40"
      >
        {showSql ? "Sembunyikan SQL" : "Tampilkan SQL"}
      </button>
      {showSql && (
        <pre className="mt-3 max-h-96 w-full overflow-auto rounded-xl border border-ink-900/10 bg-ink-950 p-4 text-[11px] leading-relaxed text-parchment">
          {sql}
        </pre>
      )}
    </>
  );
}
