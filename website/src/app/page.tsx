import { Hero } from "@/components/sections/Hero";
import { WorkExamples } from "@/components/sections/WorkExamples";
import { ProblemPriced } from "@/components/sections/DragCheck";
import { PurchasingSpotlight } from "@/components/sections/PurchasingSpotlight";
import { Approach } from "@/components/sections/Approach";
import { Proof } from "@/components/sections/Proof";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <WorkExamples />
      <ProblemPriced />
      <PurchasingSpotlight />
      <Approach />
      <Proof />
      <WhoItsFor />
      <FinalCTA />
    </>
  );
}
