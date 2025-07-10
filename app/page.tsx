"use client";

import { GridPattern } from "@/components/common/GridPattern";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import Initiatives from "@/components/home/Initiatives";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

// Animation configuration
const sectionAnimation = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { amount: 0.5 },
  transition: {
    type: "spring",
    damping: 10,
    stiffness: 100,
    delay: 0.25,
  },
} as const;

// Reusable animated section title component
const AnimatedSectionTitle = ({ children }: { children: React.ReactNode }) => (
  <motion.h1 {...sectionAnimation} className="text-5xl font-semibold">
    {children}
  </motion.h1>
);

// Action buttons component
const ActionButtons = () => (
  <div className="flex flex-row gap-5 pb-10">
    <Button className="h-12 rounded-sm bg-brand-blue text-2xl font-medium text-white hover:scale-105 ">
      See all chapters
    </Button>
    <Button className="h-12 rounded-sm bg-brand-green text-2xl font-medium text-white hover:scale-105 ">
      Propose a nonprofit project
    </Button>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen w-screen px-10">
      <GridPattern
        gridColor="stroke-brand-blue-light"
        style={{ zIndex: -10 }}
      />

      <main className="mx-auto flex size-full flex-col pt-20">
        <Hero />

        <div className="flex w-full flex-col">
          <AnimatedSectionTitle>Our Initiatives</AnimatedSectionTitle>
          <Initiatives />

          <AnimatedSectionTitle>Featured Projects</AnimatedSectionTitle>
          <Features />

          <ActionButtons />
        </div>
      </main>
    </div>
  );
}
