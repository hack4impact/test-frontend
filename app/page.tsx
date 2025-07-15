"use client";

import FeaturedProjects from "@/components/features/home/FeaturedProjects";
import HeroSection from "@/components/features/home/HeroSection";
import ImpactSection from "@/components/features/home/ImpactSection";
import { GridPattern } from "@/components/layout/GridPattern";
import { AnimatedSectionTitle } from "@/components/shared/AnimatedSectionTitle";
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
    <main className="min-h-screen w-screen px-10 mx-auto flex size-full flex-col pt-20">
      <GridPattern
        gridColor="stroke-brand-blue-light"
        style={{ zIndex: -10 }}
      />
      <HeroSection />

      <div className="flex w-full flex-col">
        <AnimatedSectionTitle>Our Impact</AnimatedSectionTitle>
        <ImpactSection />

        <AnimatedSectionTitle>Featured Projects</AnimatedSectionTitle>
        <FeaturedProjects />

        <ActionButtons />
      </div>
    </main>
  );
}
