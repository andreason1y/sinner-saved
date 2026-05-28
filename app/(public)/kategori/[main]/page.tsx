import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { getPostsByMainCategory } from "@/lib/posts";
import { CategoryArchive } from "@/components/post/CategoryArchive";

// ISR — regenerate the archive page at most every 5 min.
export const revalidate = 300;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ main: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { main: string };
}): Metadata {
  const cat = getCategory(params.main);
  if (!cat) return {};
  return { title: cat.name, description: cat.blurb };
}

export default async function CategoryPage({
  params,
}: {
  params: { main: string };
}) {
  const category = getCategory(params.main);
  if (!category) notFound();

  const posts = await getPostsByMainCategory(category.slug);

  return <CategoryArchive category={category} posts={posts} />;
}
