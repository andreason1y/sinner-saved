import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { getPostsByMainCategory } from "@/lib/posts";
import { CategoryArchive } from "@/components/post/CategoryArchive";

// ISR — regenerate the archive page at most every 5 min.
export const revalidate = 300;

export function generateStaticParams() {
  const params: { main: string; sub: string }[] = [];
  
  CATEGORIES.forEach((category) => {
    category.subcategories.forEach((sub) => {
      params.push({ main: category.slug, sub: sub.slug });
    });
  });
  
  return params;
}

export function generateMetadata({
  params,
}: {
  params: { main: string; sub: string };
}): Metadata {
  const category = getCategory(params.main);
  if (!category) return {};
  
  const subcategory = category.subcategories.find((s) => s.slug === params.sub);
  if (!subcategory) return {};
  
  return { 
    title: `${subcategory.name} - ${category.name}`, 
    description: category.blurb 
  };
}

export default async function SubCategoryPage({
  params,
}: {
  params: { main: string; sub: string };
}) {
  try {
    const category = getCategory(params.main);
    if (!category) notFound();
    
    const subcategory = category.subcategories.find((s) => s.slug === params.sub);
    if (!subcategory) notFound();

    const allPosts = await getPostsByMainCategory(category.slug);
    const safePosts = Array.isArray(allPosts) ? allPosts : [];
    const filteredPosts = safePosts.filter((post) => post.subCategory === params.sub);

    return <CategoryArchive category={category} posts={filteredPosts} />;
  } catch (error) {
    console.error('Error in SubCategoryPage:', error);
    notFound();
  }
}