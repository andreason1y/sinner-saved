import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { TagArchive } from "@/components/post/TagArchive";
import { SITE } from "@/lib/site";

// ISR — regenerate tag archives at most every 5 min.
export const revalidate = 300;

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: { tag: string };
}): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag);
  return {
    title: `#${tag}`,
    description: `Tulisan dengan tag “${tag}” di ${SITE.name}.`,
    alternates: { canonical: `/tag/${encodeURIComponent(tag)}` },
  };
}

export default async function TagPage({
  params,
}: {
  params: { tag: string };
}) {
  const tag = decodeURIComponent(params.tag);
  const posts = await getPostsByTag(tag);

  // Unknown tag with no posts → 404 (keeps arbitrary URLs out of the index).
  if (posts.length === 0) {
    const known = await getAllTags();
    const exists = known.some((x) => x.toLowerCase() === tag.toLowerCase());
    if (!exists) notFound();
  }

  return <TagArchive tag={tag} posts={posts} />;
}
