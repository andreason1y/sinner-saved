import { Suspense } from "react";
import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/posts";
import { SearchView } from "@/components/post/SearchView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cari Tulisan",
  description:
    "Cari di seluruh arsip SinnerSaved — berdasarkan judul, kutipan, tag, atau kategori.",
  openGraph: {
    title: "Cari Tulisan — SinnerSaved",
    description: "Cari di seluruh arsip SinnerSaved.",
    type: "website",
  },
};

export default async function CariPage() {
  const posts = await getPublishedPosts();
  return (
    <Suspense>
      <SearchView posts={posts} />
    </Suspense>
  );
}
