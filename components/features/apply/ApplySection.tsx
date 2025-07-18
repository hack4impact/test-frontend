"use client";

import FrequentlyAsked from "@/components/features/apply/FrequentlyAsked";
import Toggle from "@/components/features/apply/Toggle";
import { GridPattern } from "@/components/layout/GridPattern";
import { AnimatedSectionTitle } from "@/components/shared/AnimatedSectionTitle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Application } from "@/types/contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import parse from "html-react-parser";
import { motion } from "motion/react";

export default function ApplySection({
  applyInfo,
}: {
  applyInfo: Application | null;
}) {
  if (applyInfo == null) return;

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
          <Toggle />
        </div>
        <div className="my-10 flex  w-full flex-col">
          <div
            className={cn(
              "border-3 mb-10 justify-center items-center flex flex-auto w-full flex-row text-brand-black",
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
                {applyInfo.headerTitle}
              </h3>
              <div className="whitespace-pre-line flex w-full text-2xl flex-col">
                {parse(documentToHtmlString(applyInfo.description.json))}
              </div>
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
                "h-[30rem] w-1/2 rounded-sm border-3 border-brand-blue backdrop-blur-[2px]",
              )}
            ></motion.div>
          </div>
          <AnimatedSectionTitle>
            Frequently Asked Questions
          </AnimatedSectionTitle>
          <FrequentlyAsked items={applyInfo.faqsCollection.items} />
        </div>
      </main>
    </div>
  );
}
