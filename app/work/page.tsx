"use client";

import { AnimatedSectionTitle } from "@/components/common/AnimatedSectionTitle";
import { GridPattern } from "@/components/common/GridPattern";
import { MotionFeatureCard } from "@/components/home/FeatureCard";
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
        <div className="flex w-full flex-col">
          <AnimatedSectionTitle className="font-bold">
            Our Work
          </AnimatedSectionTitle>
          <AnimatedSectionTitle>National Initiatives</AnimatedSectionTitle>
          <AnimatedSectionTitle>Our Chapters</AnimatedSectionTitle>
          <AnimatedSectionTitle>Featured Projects</AnimatedSectionTitle>
          <motion.div
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
          </motion.div>
        </div>
      </main>
    </div>
  );
}
