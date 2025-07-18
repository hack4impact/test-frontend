"use client";

import { ChapterCarousel } from "@/components/features/work/ChapterCarousel";
import {
  CHAPTER_FEATURES_CONFIG,
  ChapterProjects,
} from "@/components/features/work/ChapterProjects";
import { MotionInitiativeCard } from "@/components/features/work/InitiativeCard";
import { GridPattern } from "@/components/layout/GridPattern";
import { AnimatedSectionTitle } from "@/components/shared/AnimatedSectionTitle";
import { useChapters } from "@/hooks/useChapters";
import { useNationalInitiatives } from "@/hooks/useNationalInitiatives";
import { cn } from "@/lib/utils";
import { Project, ProjectExtended } from "@/types/contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { useEffect, useMemo, useState } from "react";

/**
 * Render empty state
 */
const renderState = (status: string) => (
  <div className={cn(CHAPTER_FEATURES_CONFIG.containerClasses)}>
    <div className="flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
      <p className="text-lg text-gray-500">{status}</p>
    </div>
  </div>
);

const addProjectStyling = (projects: Project[]): ProjectExtended[] => {
  const colors = ["bg-brand-blue", "bg-brand-green", "bg-brand-red"];
  const borders = [
    "border-brand-blue-light",
    "border-brand-green-light",
    "border-brand-red-light",
  ];

  return projects.map((project, index) => ({
    ...project,
    bgColor: colors[index % colors.length],
    imgBorder: borders[index % borders.length],
  }));
};

export default function Work() {
  const { nationalInitiatives, loading, error } = useNationalInitiatives();
  const [activeIndex, setActiveIndex] = useState(0);
  // Renaming destructured variables
  const {
    chapters,
    loading: chapterLoading,
    error: chapterError,
  } = useChapters();

  const styledProjects = useMemo(() => {
    // Add null/undefined checks
    if (
      !chapters ||
      !chapters[activeIndex] ||
      !chapters[activeIndex].projects
    ) {
      return [];
    }

    return addProjectStyling(chapters[activeIndex].projects.items);
  }, [chapters, activeIndex]);

  // Don't render until chapters are loaded
  if (chapterLoading) {
    renderState("Loading...");
  }

  if (chapterError) {
    renderState(`Error: ${chapterError.message}`);
  }

  if (!chapters || chapters.length === 0) {
    renderState("No chapters found");
  }

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
        <ChapterCarousel
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          chapters={chapters}
        />
        <AnimatedSectionTitle>Chapter Projects</AnimatedSectionTitle>
        <ChapterProjects features={styledProjects} />
      </div>
    </main>
  );
}
