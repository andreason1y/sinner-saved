import { Hero } from "@/components/sections/Hero";
import { BibleReadingCard } from "@/components/sections/BibleReadingCard";
import { VerseOfDay } from "@/components/sections/VerseOfDay";
import { FeaturedBento } from "@/components/sections/FeaturedBento";
import { PopularPosts } from "@/components/sections/PopularPosts";
import { RuangAlkitab } from "@/components/sections/RuangAlkitab";
import { RuangTeologi } from "@/components/sections/RuangTeologi";
import { RuangLensa } from "@/components/sections/RuangLensa";
import { SinnersNote } from "@/components/sections/SinnersNote";
import { Contact } from "@/components/sections/Contact";
import {
  getFeaturedPosts,
  getPostsByMainCategory,
} from "@/lib/posts";
import { getPopularPosts } from "@/lib/popular";
import { JsonLd } from "@/components/seo/JsonLd";
import { websiteSchema, organizationSchema } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export const dynamic = "force-static";
// Refresh every 5 min in production. Public posts barely change between
// publishes; this keeps the homepage cached at the edge instead of
// re-rendering on every request.
export const revalidate = 300;

export default async function HomePage() {
  const [featured, popular, alkitab, teologi, lensa, sinnersNote] =
    await Promise.all([
      getFeaturedPosts(5),
      getPopularPosts(5),
      getPostsByMainCategory("ruang-alkitab", 3),
      getPostsByMainCategory("ruang-teologi", 4),
      getPostsByMainCategory("ruang-lensa", 4),
      getPostsByMainCategory("sinners-note", 4),
    ]);

  return (
    <>
      <JsonLd data={websiteSchema()} />
      <JsonLd data={organizationSchema()} />
      <Hero />
      <BibleReadingCard />
      <VerseOfDay />
      <FeaturedBento posts={featured} />
      <PopularPosts posts={popular} />
      <RuangAlkitab posts={alkitab} />
      <RuangTeologi posts={teologi} />
      <RuangLensa posts={lensa} />
      <SinnersNote posts={sinnersNote} />
      <Contact />
    </>
  );
}
