"use client";

import { MotionExpandable } from "@/components/shared/Expandable";
import { cn } from "@/lib/utils";
import { FAQ } from "@/types/contentful";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

/**
 * Configuration for ImpactSection component
 */
const FAQ_CONFIG = {
  containerClasses: "my-10 flex w-full flex-col justify-between gap-5",

  // Animation variants for container
  containerVariants: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
  },

  // Animation variants for child cards
  cardVariants: {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 10,
        stiffness: 100,
        duration: 0.5,
      },
    },
  },
};

export default function FrequentlyAsked({
  expandedColor,
  closedColor,
  hoverColor,
  items,
}: {
  expandedColor?: string;
  closedColor?: string;
  hoverColor?: string;
  items: FAQ[];
}) {
  // Refs for animation control
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  /**
   * Render empty state
   */
  const renderEmptyState = () => (
    <div className={cn(FAQ_CONFIG.containerClasses)}>
      <div className="flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-lg text-gray-500">
          No frequently asked questions available
        </p>
      </div>
    </div>
  );

  if (!items.length) return renderEmptyState();

  return (
    <motion.div
      ref={containerRef}
      variants={FAQ_CONFIG.containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="my-10"
    >
      {items.map((item: FAQ, index: number) => {
        return (
          <MotionExpandable
            variants={FAQ_CONFIG.cardVariants}
            expandedColor={expandedColor}
            closedColor={closedColor}
            hoverColor={hoverColor}
            title={item.question}
            content={documentToPlainTextString(item.answer.json)}
            key={index}
            identifier={`${index}`}
          ></MotionExpandable>
        );
      })}
    </motion.div>
  );
}
