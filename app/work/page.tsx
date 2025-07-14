"use client";

import { AnimatedSectionTitle } from "@/components/common/AnimatedSectionTitle";
import { GridPattern } from "@/components/common/GridPattern";
import { ChapterCarousel } from "@/components/work/ChapterCarousel";
import { ChapterFeatures } from "@/components/work/ChapterFeatures";
import { MotionInitiativeCard } from "@/components/work/InitiativeCard";

export default function Work() {
  return (
    <main className="min-h-screen w-full px-10 mx-auto flex size-full flex-col pt-20">
      <GridPattern
        gridColor="stroke-brand-blue-light"
        style={{ zIndex: -10 }}
      />
      <AnimatedSectionTitle className="sticky mt-5 font-bold text-5xl">
        Our Work
      </AnimatedSectionTitle>
      <div className="my-10 flex w-full flex-col">
        <AnimatedSectionTitle>National Initiatives</AnimatedSectionTitle>
        <div className="my-10 flex flex-col gap-5">
          <MotionInitiativeCard imgBorder="border-brand-blue" />
          <MotionInitiativeCard imgBorder="border-brand-red" />
        </div>
        <AnimatedSectionTitle>Our Chapters</AnimatedSectionTitle>
        <ChapterCarousel />
        <AnimatedSectionTitle>Featured Projects</AnimatedSectionTitle>
        <ChapterFeatures />
      </div>
    </main>
  );
}
