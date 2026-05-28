import { Hero } from "@/components/sections/Hero";
import { FeaturedBento } from "@/components/sections/FeaturedBento";
import { RuangAlkitab } from "@/components/sections/RuangAlkitab";
import { RuangTeologi } from "@/components/sections/RuangTeologi";
import { RuangLensa } from "@/components/sections/RuangLensa";
import { SinnersNote } from "@/components/sections/SinnersNote";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedBento />
      <RuangAlkitab />
      <RuangTeologi />
      <RuangLensa />
      <SinnersNote />
    </>
  );
}
