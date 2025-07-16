"use client";

import FAQ from "@/components/features/apply/FAQ";
import { GridPattern } from "@/components/layout/GridPattern";
import { AnimatedSectionTitle } from "@/components/shared/AnimatedSectionTitle";
import { Button } from "@/components/ui/button";
import { applyChapters } from "@/data/content";
import { cn } from "@/lib/utils";
import { Transition, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Work() {
  const pathname = usePathname();
  const hoverTransition: Transition = {
    duration: 0.2,
    ease: [0.4, 0, 0.2, 1],
  };

  return (
    <div className="min-h-screen w-screen px-10">
      <GridPattern
        gridColor="stroke-brand-blue-light"
        style={{ zIndex: -10 }}
      />

      <main className="mx-auto flex size-full flex-col pt-20">
        <div className="h-[48px] flex flex-auto items-center mt-5 ">
          <AnimatedSectionTitle className="sticky font-bold text-5xl">
            Apply
          </AnimatedSectionTitle>
          <div className="h-full flex flex-auto"></div>
          <div className="z-1 p-[2px] bg-brand-red-light/50 h-full flex flex-row gap-3 items-center border-2 border-brand-red rounded-md">
            <div className="relative h-full content-center">
              <MotionLink
                whileHover={
                  pathname != "/apply/chapters"
                    ? {
                        background: "var(--color-brand-black)",
                        color: "white",
                      }
                    : {
                        scale: 1.05,
                      }
                }
                initial={
                  pathname == "/apply/chapters"
                    ? { color: "white" }
                    : {
                        color: "var(--color-brand-black)",
                      }
                }
                href="/apply/chapters"
                className="bg-transparent flex flex-initial justify-center items-center h-full w-full py-1 px-2 rounded-sm text-2xl font-medium  "
              >
                Chapters
              </MotionLink>
              {pathname == "/apply/chapters" && (
                <motion.div
                  layoutId="toggled"
                  className={cn(
                    "rounded-sm absolute inset-0 z-[-1] bg-brand-red",
                  )}
                  initial={false}
                  transition={hoverTransition}
                />
              )}
            </div>
            <div className="relative h-full content-center">
              <MotionLink
                whileHover={
                  pathname != "/apply/nonprofits"
                    ? {
                        background: "var(--color-brand-black)",
                        color: "white",
                      }
                    : {
                        scale: 1.05,
                      }
                }
                initial={
                  pathname == "/apply/nonprofits"
                    ? { color: "white" }
                    : {
                        color: "var(--color-brand-black)",
                      }
                }
                href="/apply/nonprofits"
                className="bg-transparent flex flex-initial justify-center items-center h-full w-full py-1 px-2 rounded-sm text-2xl font-medium "
              >
                Nonprofits
              </MotionLink>
              {pathname == "/apply/nonprofits" && (
                <motion.div
                  layoutId="toggled"
                  className={cn(
                    "rounded-sm absolute inset-0 z-[-1] bg-brand-red",
                  )}
                  initial={false}
                  transition={hoverTransition}
                />
              )}
            </div>
          </div>
        </div>
        <div className="my-10 flex w-full flex-col">
          <div
            className={cn(
              "mb-10 justify-center items-center flex h-[30rem] w-full flex-row text-brand-black",
            )}
          >
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.5 }}
              transition={{
                type: "spring",
                damping: 10,
                stiffness: 100,
                delay: 0.25,
              }}
              className={cn(
                "gap-5 flex flex-col h-full w-1/2 items-center pr-5",
              )}
            >
              <h3 className="w-full text-5xl font-semibold">
                {applyChapters.tag}
              </h3>
              <p className="whitespace-pre-line flex w-full text-2xl">
                {applyChapters.info}
              </p>
              <div className="w-full h-min">
                <Button
                  className={cn(
                    "h-[50px] w-2/5 min-w-[250px] rounded-sm bg-brand-green text-2xl font-medium text-white hover:scale-105",
                  )}
                >
                  Start a chapter
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.5 }}
              transition={{
                type: "spring",
                damping: 10,
                stiffness: 100,
                delay: 0.25,
              }}
              className={cn(
                "h-full w-1/2 rounded-sm border-3 border-brand-blue backdrop-blur-[2px]",
              )}
            ></motion.div>
          </div>
          <AnimatedSectionTitle>
            Frequently Asked Questions
          </AnimatedSectionTitle>
          <FAQ items={applyChapters}></FAQ>
        </div>
      </main>
    </div>
  );
}

const MotionLink = motion.create(Link);
