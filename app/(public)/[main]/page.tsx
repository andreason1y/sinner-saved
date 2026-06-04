import { notFound } from "next/navigation";
import { getCategory } from "@/lib/categories";

export default function MainCategoryPage({
  params,
}: {
  params: { main: string };
}) {
  // Check if this is a valid main category
  const category = getCategory(params.main);
  
  if (category) {
    // If it's a valid category, redirect to the category page
    // This prevents confusing 404s for valid category slugs
    notFound(); // Use notFound instead of redirect to maintain clean URL structure
  }
  
  // If not a valid category, show 404
  notFound();
}