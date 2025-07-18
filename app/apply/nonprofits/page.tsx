"use client";

import ApplySection from "@/components/features/apply/ApplySection";
import { MotionToggle } from "@/components/features/apply/Toggle";
import { GridPattern } from "@/components/layout/GridPattern";
import { AnimatedSectionTitle } from "@/components/shared/AnimatedSectionTitle";
import { useNonprofitApplyContent } from "@/hooks/useApplyContent";
import { Application } from "@/types/contentful";

export default function Work() {
  const { nonprofitApply, loading, error } = useNonprofitApplyContent();
  console.log(loading, error);
  const nonprofitInfo: Application | null = nonprofitApply;

  if (nonprofitInfo == null) return;

  return (
    <div className="min-h-screen w-screen px-10">
      <GridPattern
        gridColor="stroke-brand-blue-light"
        style={{ zIndex: -10 }}
      />

      <main className="mx-auto flex size-full flex-col pt-20">
        <div className="h-[48px] flex flex-auto items-center mt-5 ">
          <AnimatedSectionTitle className="font-bold text-5xl">
            Apply
          </AnimatedSectionTitle>
          {/* Spacer */}
          <div className="h-full flex flex-auto"></div>
          <MotionToggle layoutId="toggle" />
        </div>
        <ApplySection applyInfo={nonprofitApply} />
      </main>
    </div>
  );
}
