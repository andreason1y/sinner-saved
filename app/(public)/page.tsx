import { Hero } from "@/components/sections/Hero";
import { FeaturedBento } from "@/components/sections/FeaturedBento";
import { RuangAlkitab } from "@/components/sections/RuangAlkitab";
import { RuangTeologi } from "@/components/sections/RuangTeologi";
import { RuangLensa } from "@/components/sections/RuangLensa";
import { SinnersNote } from "@/components/sections/SinnersNote";
import {
  getFeaturedPosts,
  getPostsByMainCategory,
} from "@/lib/posts";

// Always fetch fresh on each request so newly-published posts appear
// immediately. Switch to `revalidate = 60` later if traffic warrants ISR.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featured, alkitab, teologi, lensa, sinnersNote] = await Promise.all([
    getFeaturedPosts(5),
    getPostsByMainCategory("ruang-alkitab", 3),
    getPostsByMainCategory("ruang-teologi", 4),
    getPostsByMainCategory("ruang-lensa", 4),
    getPostsByMainCategory("sinners-note", 4),
  ]);

  return (
    <>
      <Hero />
      <FeaturedBento posts={featured} />
      <RuangAlkitab posts={alkitab} />
      <RuangTeologi posts={teologi} />
      <RuangLensa posts={lensa} />
      <SinnersNote posts={sinnersNote} />
    </>
  );
}
