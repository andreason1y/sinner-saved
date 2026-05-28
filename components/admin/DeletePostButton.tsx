"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { deletePostAction } from "@/lib/actions/posts";

export function DeletePostButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!window.confirm(`Hapus "${title}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    startTransition(async () => {
      await deletePostAction(id);
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="inline-flex items-center gap-1 rounded-full border border-crimson-500/30 px-2.5 py-1 text-xs text-crimson-600 transition-colors hover:bg-crimson-500/5 disabled:opacity-50"
    >
      {isPending ? <Loader2 size={11} className="animate-spin" /> : <Trash2 size={11} />}
      Hapus
    </button>
  );
}
