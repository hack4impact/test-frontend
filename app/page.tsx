"use client";

import Hero from "@/components/home/Hero";

import { Button } from "@/components/ui/button";
import { motion, Variants, useInView, AnimatePresence } from "motion/react";
import GridPattern from "@/components/common/GridPattern";
import { cn } from "@/lib/utils";
import Initiatives from "@/components/home/Initiatives";
import Features from "@/components/home/Features";

export default function Home() {
  return (
    <div className={cn("min-h-screen w-screen px-10")}>
      <GridPattern gridColor="#C0E1FF" className={cn("z-[-10]")} />
      <main className={cn("mx-auto flex size-full flex-col pt-20")}>
        <Hero />

        <div className={cn("flex w-full flex-col")}>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
            transition={{
              type: "spring",
              damping: 10,
              stiffness: 100,
              delay: 0.25,
            }}
            className={cn("text-[48px] font-semibold")}
          >
            Our Initiatives
          </motion.h1>

          <Initiatives />

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
            transition={{
              type: "spring",
              damping: 10,
              stiffness: 100,
              delay: 0.25,
            }}
            className={cn("text-[48px] font-semibold")}
          >
            Featured Projects
          </motion.h1>

          <Features />

          <div className={cn("flex flex-row gap-5 pb-10")}>
            <Button
              className={cn(
                "h-[50px] rounded-sm bg-[#0085FF] text-2xl font-medium text-[#FFF] hover:scale-105",
              )}
            >
              See all chapters
            </Button>
            <Button
              className={cn(
                "h-[50px] rounded-sm bg-[#10B875] text-2xl font-medium text-[#FFF] hover:scale-105",
              )}
            >
              Propose a nonprofit project
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
