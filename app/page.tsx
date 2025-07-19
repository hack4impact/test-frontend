"use client";

import ActionButtons from "@/components/features/home/ActionButton";
import FeaturedProjects from "@/components/features/home/FeaturedProjects";
import HeroSection from "@/components/features/home/HeroSection";
import ImpactSection from "@/components/features/home/ImpactSection";
import { GridPattern } from "@/components/layout/GridPattern";
import { AnimatedSectionTitle } from "@/components/shared/AnimatedSectionTitle";
import { useFeaturedProjects } from "@/hooks/useFeaturedProjects";

export default function Home() {
  const { projects, loading, error } = useFeaturedProjects();
  console.log(loading, error);

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
        {/*  Weird red flash issue, might be a dev thing, but should look into */}
        <FeaturedProjects projects={projects} />
        <ActionButtons />
      </div>
    </main>
  );
}
