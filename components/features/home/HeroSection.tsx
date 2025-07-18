"use client";

import { cn, splitText } from "@/lib/utils";
import { LayoutGroup, animate, stagger } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";

import RotatingText from "./RotatingText";

/**
 * Configuration for the HeroSection component
 */
const HERO_CONFIG = {
  // Text content for rotating animation
  rotatingTexts: [
    "Developers",
    "Designers",
    "Students",
    "Humanitarians",
    "Leaders",
    "Activists",
  ],

  // Animation settings
  animation: {
    rotationInterval: 2000,
    wordAnimationDelay: 0.1,
    spring: {
      damping: 10,
      stiffness: 100,
    },
    rotatingTextTransition: {
      type: "spring" as const,
      damping: 30,
      stiffness: 400,
    },
  },

  // Text styles and properties
  text: {
    mainHeadingSize: "text-[60px]",
    rotatingTextSize: "text-[75px]",
    subheadingSize: "text-[35px]/10",
  },
} as const;

/**
 * Main hero section for the homepage
 *
 * Features:
 * - Animated text entrance on font load
 * - Rotating text with smooth transitions
 * - Two-column layout with CTA button
 * - Responsive design with placeholder content area
 */
export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Initialize text animations once fonts are loaded
   * This ensures animations don't start before custom fonts are available
   */
  useEffect(() => {
    const initializeAnimations = async () => {
      try {
        await document.fonts.ready;

        const container = containerRef.current;
        if (!container) return;

        // Make content visible after fonts are loaded
        container.style.visibility = "visible";

        // Find all text elements to animate
        const textElements = container.querySelectorAll("#text");
        if (!textElements.length) return;

        // Split text into words for staggered animation
        const { words } = splitText(textElements);

        // Animate words in with staggered timing
        await animate(
          words,
          {
            opacity: [0, 1],
            y: [10, 0],
          },
          {
            type: "spring",
            damping: HERO_CONFIG.animation.spring.damping,
            stiffness: HERO_CONFIG.animation.spring.stiffness,
            delay: stagger(HERO_CONFIG.animation.wordAnimationDelay),
          },
        );
      } catch (error) {
        console.warn("Font loading or animation failed:", error);
        // Ensure content is visible even if animation fails
        const container = containerRef.current;
        if (container) {
          container.style.visibility = "visible";
        }
      }
    };

    initializeAnimations();
  }, []);

  /**
   * Render the main headline with rotating text
   */
  const renderHeadline = () => (
    <>
      <h1
        id="text"
        className={cn(
          HERO_CONFIG.text.mainHeadingSize,
          "leading-none font-bold",
        )}
      >
        We are
      </h1>

      <LayoutGroup>
        <RotatingText
          texts={HERO_CONFIG.rotatingTexts}
          mainClassName="px-1 pb-1 inline-flex bg-brand-blue overflow-hidden rounded-sm"
          staggerFrom="first"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          layoutId="rotatingText"
          splitLevelClassName={cn(
            "overflow-hidden leading-none pb-2 font-bold text-white",
            HERO_CONFIG.text.rotatingTextSize,
          )}
          transition={HERO_CONFIG.animation.rotatingTextTransition}
          rotationInterval={HERO_CONFIG.animation.rotationInterval}
        />
      </LayoutGroup>

      <h1
        id="text"
        className={cn(
          "mb-5 leading-none font-bold",
          HERO_CONFIG.text.mainHeadingSize,
        )}
      >
        for social change
      </h1>
    </>
  );

  /**
   * Render the subtitle and call-to-action
   */
  const renderSubheadingAndCTA = () => (
    <>
      <h2 id="text" className={cn("mb-10", HERO_CONFIG.text.subheadingSize)}>
        Building powerful nonprofit software as a tool for social good
      </h2>

      <Link
        href="/apply/nonprofits"
        className={cn(
          "h-[50px] w-2/5 min-w-[250px] rounded-sm inline-flex items-center justify-center",
          "bg-brand-green text-2xl font-medium text-white whitespace-nowrap",
          "hover:scale-105 hover:bg-brand-black transition-transform duration-200",
        )}
      >
        Work with us
      </Link>
    </>
  );

  /**
   * Render the content area (left side)
   */
  const renderContentArea = () => (
    <div className="flex h-full w-1/2 items-center pr-15 pb-15">
      <div
        ref={containerRef}
        className="h-fit max-h-[500px] w-full"
        style={{ visibility: "hidden" }} // Hidden until fonts load
      >
        {renderHeadline()}
        {renderSubheadingAndCTA()}
      </div>
    </div>
  );

  /**
   * Render the visual area (right side)
   * Currently a placeholder - could be replaced with actual content
   */
  const renderVisualArea = () => (
    <div className="flex h-full w-1/2 items-center pb-15">
      <div
        className={cn(
          "h-[500px] w-full rounded-sm",
          "border-3 border-brand-blue backdrop-blur-[2px]",
        )}
        aria-label="Visual content area"
      />
    </div>
  );

  return (
    <section
      className="flex h-svh w-full flex-row text-brand-black"
      aria-labelledby="hero-heading"
    >
      {renderContentArea()}
      {renderVisualArea()}
    </section>
  );
}
