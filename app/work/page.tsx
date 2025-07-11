"use client";

import { AnimatedSectionTitle } from "@/components/common/AnimatedSectionTitle";
import { GridPattern } from "@/components/common/GridPattern";
import { MotionFeatureCard } from "@/components/home/FeatureCard";
import { InitiativeCard } from "@/components/work/InitiativeCard";
import { chapterFeatures, childVariants } from "@/data/data";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export default function Home() {
  return (
    <div className="min-h-screen w-screen px-10">
      <GridPattern
        gridColor="stroke-brand-blue-light"
        style={{ zIndex: -10 }}
      />

      <main className="mx-auto flex size-full flex-col pt-20">
        <AnimatedSectionTitle className="sticky mt-5 font-bold">
          Our Work
        </AnimatedSectionTitle>
        <div className="my-10 flex w-full flex-col">
          <AnimatedSectionTitle>National Initiatives</AnimatedSectionTitle>
          <div className="my-10 flex flex-col gap-5">
            <InitiativeCard imgBorder="border-brand-blue" />
            <InitiativeCard imgBorder="border-brand-red" />
          </div>
          <AnimatedSectionTitle>Our Chapters</AnimatedSectionTitle>
          <div className="my-10 flex flex-col gap-5"></div>
          <AnimatedSectionTitle>Featured Projects</AnimatedSectionTitle>
          <div
            className={cn("my-10 flex w-full flex-col justify-between gap-5")}
          >
            {chapterFeatures.map((item, index) => {
              return (
                <MotionFeatureCard
                  key={index}
                  style={{ opacity: 0 }}
                  initial="hidden"
                  whileInView="visible"
                  variants={childVariants}
                  viewport={{ amount: "some" }}
                  title={item.title}
                  content={item.content}
                  bgColor={item.bgColor}
                  imgBorder={item.imgBorder}
                />
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
