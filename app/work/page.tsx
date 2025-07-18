"use client";

import { ChapterCarousel } from "@/components/features/work/ChapterCarousel";
import { ChapterProjects } from "@/components/features/work/ChapterProjects";
import { MotionInitiativeCard } from "@/components/features/work/InitiativeCard";
import { GridPattern } from "@/components/layout/GridPattern";
import { AnimatedSectionTitle } from "@/components/shared/AnimatedSectionTitle";
import { useChapters } from "@/hooks/useChapters";
import { useNationalInitiatives } from "@/hooks/useNationalInitiatives";
import { cn } from "@/lib/utils";
import { Project, ProjectExtended } from "@/types/contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { useEffect, useMemo, useState } from "react";

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
          {/* Fixed: Use nationalInitiatives instead of empty array */}
          {loading ||
          !nationalInitiatives ||
          nationalInitiatives.length === 0 ? (
            // This will trigger the empty state in MotionInitiativeCard
            <MotionInitiativeCard item={{}} />
          ) : (
            nationalInitiatives.map((item: Project, index) => {
              return (
                <MotionInitiativeCard
                  key={index}
                  item={{ ...item, imgBorder: "border-brand-blue" }}
                />
              );
            })
          )}
        </div>

        <AnimatedSectionTitle>Our Chapters</AnimatedSectionTitle>
        <ChapterCarousel
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          chapters={chapters || []}
        />

        <AnimatedSectionTitle>
          {chapters && chapters[activeIndex]
            ? `${chapters[activeIndex].name} Projects`
            : "Chapter Projects"}
        </AnimatedSectionTitle>
        <ChapterProjects features={styledProjects} />
      </div>
    </main>
  );
}
