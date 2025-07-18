"use client";

import { MotionToggle } from "@/components/features/apply/Toggle";
import { GridPattern } from "@/components/layout/GridPattern";
import { AnimatedSectionTitle } from "@/components/shared/AnimatedSectionTitle";
import { LayoutGroup } from "motion/react";

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutGroup>
      <div className="min-h-screen w-screen px-10">
        <GridPattern
          gridColor="stroke-brand-blue-light"
          style={{ zIndex: -10 }}
        />
        <main className="mx-auto flex size-full flex-col pt-20">
          <div className="h-[48px] flex flex-auto items-center mt-5">
            <AnimatedSectionTitle className="font-bold text-5xl">
              Apply
            </AnimatedSectionTitle>
            <div className="h-full flex flex-auto"></div>
            <MotionToggle layout layoutId="toggleContainer" />
          </div>
          {children}
        </main>
      </div>
    </LayoutGroup>
  );
}
