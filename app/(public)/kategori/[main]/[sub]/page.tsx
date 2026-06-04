import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { getPostsByMainCategory } from "@/lib/posts";
import { CategoryArchive } from "@/components/post/CategoryArchive";

// ISR — regenerate at most every 5 min.
export const revalidate = 300;

export function generateStaticParams() {
  const params: { main: string; sub: string }[] = [];
  for (const cat of CATEGORIES) {
    for (const sub of cat.subcategories) {
      params.push({ main: cat.slug, sub: sub.slug });
    }
  }
  return params;
}

export function generateMetadata({
  params,
}: {
  params: { main: string; sub: string };
}): Metadata {
  const cat = getCategory(params.main);
  if (!cat) return {};
  const sub = cat.subcategories.find((s) => s.slug === params.sub);
  if (!sub) return {};
  return {
    title: `${sub.name} — ${cat.name}`,
    description: cat.blurb,
  };
}

export default async function SubCategoryPage({
  params,
}: {
  params: { main: string; sub: string };
}) {
  const category = getCategory(params.main);
  if (!category) notFound();

  const subExists = category.subcategories.some((s) => s.slug === params.sub);
  if (!subExists) notFound();

  const posts = await getPostsByMainCategory(category.slug);

  return (
    <CategoryArchive
      category={category}
      posts={posts}
      initialSub={params.sub}
    />
  );
}
