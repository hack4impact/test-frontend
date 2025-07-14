"use client";

import { AnimatedSectionTitle } from "@/components/common/AnimatedSectionTitle";
import { GridPattern } from "@/components/common/GridPattern";
import { Button } from "@/components/ui/button";
import { ChapterFeatures } from "@/components/work/ChapterFeatures";
import { MotionInitiativeCard } from "@/components/work/InitiativeCard";
import { cn } from "@/lib/utils";
import { Transition, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Work() {
  const pathname = usePathname();
  const hoverTransition: Transition = {
    type: "spring",
    stiffness: 500,
    damping: 30,
    mass: 1,
  };

  return (
    <div className="min-h-screen w-screen px-10">
      <GridPattern
        gridColor="stroke-brand-blue-light"
        style={{ zIndex: -10 }}
      />

      <main className="mx-auto flex size-full flex-col pt-20">
        <div className="h-min flex flex-auto items-center mt-5">
          <AnimatedSectionTitle className="sticky font-bold">
            Apply
          </AnimatedSectionTitle>
          <div className="h-full flex flex-auto"></div>
          <div className="h-[48px] flex flex-row gap-5 items-center">
            <div className="relative h-full content-center">
              <MotionLink
                whileHover={{
                  scale: 1.05,
                  background: "var(--color-brand-black)",
                  color: "white",
                }}
                initial={
                  pathname == "/apply/chapters"
                    ? { color: "white" }
                    : { color: "var(--color-brand-black)" }
                }
                href="/apply/chapters"
                className="flex flex-initial justify-center items-center h-full w-full py-1 px-2 rounded-sm text-2xl font-medium  "
              >
                Chapters
              </MotionLink>
              {pathname == "/apply/chapters" && (
                <motion.div
                  layoutId="toggled"
                  className={cn(
                    "rounded-sm absolute inset-0 z-[-1]",
                    "bg-brand-green",
                  )}
                  initial={false}
                  transition={hoverTransition}
                />
              )}
            </div>
            <div className="relative h-full content-center">
              <MotionLink
                whileHover={{
                  scale: 1.05,
                  background: "var(--color-brand-black)",
                  color: "white",
                }}
                initial={
                  pathname == "/apply/nonprofits"
                    ? { color: "white" }
                    : { color: "var(--color-brand-black)" }
                }
                href="."
                className="flex flex-initial justify-center items-center h-full w-full py-1 px-2 rounded-sm text-2xl font-medium "
              >
                Nonprofits
              </MotionLink>
              {pathname == "/apply/nonprofits" && (
                <motion.div
                  whileHover={{
                    background: "var(--color-brand-black)",
                  }}
                  layoutId="toggled"
                  className={cn(
                    "rounded-sm absolute inset-0 z-[-1]",
                    "bg-brand-green",
                  )}
                  initial={false}
                  transition={hoverTransition}
                />
              )}
            </div>
          </div>
        </div>
        <div className="my-10 flex w-full flex-col">
          <AnimatedSectionTitle>Nonprofit Partners</AnimatedSectionTitle>
          <div
            className={cn(
              "border-3 my-10 justify-center items-center flex h-[30rem] w-full flex-row text-brand-black",
            )}
          >
            <div
              className={cn(
                "border-3 border-red-500 flex h-full w-1/2 items-center pr-15 pb-15",
              )}
            >
              <Button
                className={cn(
                  "h-[50px] w-2/5 min-w-[250px] rounded-sm bg-brand-green text-2xl font-medium text-white hover:scale-105",
                )}
              >
                Start a chapter
              </Button>
            </div>
            <div
              className={cn(
                "h-full w-1/2 rounded-sm border-3 border-brand-blue backdrop-blur-[2px]",
              )}
            ></div>
          </div>
          <AnimatedSectionTitle>
            Frequently Asked Questions
          </AnimatedSectionTitle>
          <div className="w-full h-[10rem] my-10 border-3"></div>
        </div>
      </main>
    </div>
  );
}

const MotionLink = motion.create(Link);
