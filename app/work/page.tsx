"use client";

import { ChapterCarousel } from "@/components/features/work/ChapterCarousel";
import { ChapterProjects } from "@/components/features/work/ChapterProjects";
import { MotionInitiativeCard } from "@/components/features/work/InitiativeCard";
import { GridPattern } from "@/components/layout/GridPattern";
import { AnimatedSectionTitle } from "@/components/shared/AnimatedSectionTitle";
import { useChapters } from "@/hooks/useChapters";
import { useNationalInitiatives } from "@/hooks/useNationalInitiatives";
import { Project } from "@/types/contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

export default function Work() {
  const { nationalInitiatives, loading, error } = useNationalInitiatives();

  // Renaming destructured variables
  const {
    chapters,
    loading: chapterLoading,
    error: chapterError,
  } = useChapters();

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
          {nationalInitiatives.map((item: Project, index) => {
            return (
              <MotionInitiativeCard
                key={index}
                title={item.name}
                content={documentToHtmlString(item.description.json)}
              />
            );
          })}{" "}
        </div>
        <AnimatedSectionTitle>Our Chapters</AnimatedSectionTitle>
        <ChapterCarousel chapters={chapters} />
        <AnimatedSectionTitle>Chapter Projects</AnimatedSectionTitle>
        <ChapterProjects />
      </div>
    </main>
  );
}
