"use client";

import { AnimatedSectionTitle } from "@/components/common/AnimatedSectionTitle";
import { GridPattern } from "@/components/common/GridPattern";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import HeroSection from "@/components/home/HeroSection";
import ImpactSection from "@/components/home/ImpactSection";
import { Button } from "@/components/ui/button";

// Action buttons component
const ActionButtons = () => (
  <div className="flex flex-row gap-5 pb-10">
    <Button className="h-12 rounded-sm bg-brand-blue text-2xl font-medium text-white hover:scale-105 ">
      See all chapters
    </Button>
    <Button className="h-12 rounded-sm bg-brand-green text-2xl font-medium text-white hover:scale-105 ">
      Propose a nonprofit project
    </Button>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen w-screen px-10">
      <GridPattern
        gridColor="stroke-brand-blue-light"
        style={{ zIndex: -10 }}
      />

      <main className="mx-auto flex size-full flex-col pt-20">
        <HeroSection />

        <div className="flex w-full flex-col">
          <AnimatedSectionTitle>Our Impact</AnimatedSectionTitle>
          <ImpactSection />

          <AnimatedSectionTitle>Featured Projects</AnimatedSectionTitle>
          <FeaturedProjects />

          <ActionButtons />
        </div>
      </main>
    </div>
  );
}
