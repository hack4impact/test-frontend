"use client";

import { MotionToggle } from "@/components/features/apply/Toggle";
import { GridPattern } from "@/components/layout/GridPattern";
import { AnimatedSectionTitle } from "@/components/shared/AnimatedSectionTitle";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <main className="min-h-screen px-10">
      <GridPattern gridColor="stroke-brand-blue-light -z-10" />
      <div className="mx-auto flex size-full flex-col pt-20">
        <div className="h-[48px] flex flex-auto items-center mt-5">
          <AnimatedSectionTitle className="font-bold text-5xl">
            Apply
          </AnimatedSectionTitle>
          <div className="h-full flex flex-auto"></div>
          <MotionToggle />
        </div>
        {children}
      </div>
    </main>
  );
}
