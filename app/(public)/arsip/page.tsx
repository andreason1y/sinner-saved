import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/posts";
import { FullArchive } from "@/components/post/FullArchive";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Arsip Tulisan",
  description:
    "Semua tulisan yang pernah diterbitkan di SinnerSaved — dari tafsir Alkitab, doktrin, refleksi budaya, hingga catatan pribadi.",
  alternates: { canonical: "/arsip" },
  openGraph: {
    title: "Arsip Tulisan — SinnerSaved",
    description:
      "Semua tulisan yang pernah diterbitkan di SinnerSaved.",
    type: "website",
  },
};

export default async function ArsipPage() {
  const posts = await getPublishedPosts();
  return <FullArchive posts={posts} />;
}
