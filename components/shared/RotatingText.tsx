"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  type TargetAndTransition,
  Transition,
  type VariantLabels,
  motion,
} from "motion/react";
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

/**
 * Configuration for RotatingText component defaults
 */
const ROTATING_TEXT_CONFIG = {
  defaultTransition: {
    type: "spring" as const,
    damping: 25,
    stiffness: 300,
  },
  defaultInitial: { y: "100%", opacity: 0 },
  defaultAnimate: { y: 0, opacity: 1 },
  defaultExit: { y: "-120%", opacity: 0 },
  defaultRotationInterval: 2000,
  entranceAnimation: {
    animate: { opacity: 1, y: 0 },
    transition: {
      type: "spring" as const,
      damping: 10,
      stiffness: 100,
      delay: 0.3,
    },
  },
};

/**
 * Stagger direction options for character animations
 */
type StaggerDirection = "first" | "last" | "center" | "random" | number;

/**
 * Animation mode for text transitions
 */
type AnimationMode = "sync" | "wait";

/**
 * How to split text for animation
 */
type SplitType = "characters" | "lines";

/**
 * Structure for organizing text into words and characters
 */
interface WordStructure {
  characters: string[];
  needsSpace: boolean;
}

/**
 * Exposed methods for controlling the rotation programmatically
 */
export interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

/**
 * Props for the RotatingText component
 */
export interface RotatingTextProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof motion.span>,
    "children" | "transition" | "initial" | "animate" | "exit"
  > {
  /** Array of texts to rotate through */
  texts: Readonly<string[]>;
  /** Animation transition configuration */
  transition?: Transition;
  /** Initial animation state */
  initial?: boolean | VariantLabels | TargetAndTransition;
  /** Animate state */
  animate?: boolean | VariantLabels | TargetAndTransition;
  /** Exit animation state */
  exit?: VariantLabels | TargetAndTransition;
  /** AnimatePresence mode */
  animatePresenceMode?: AnimationMode;
  /** Whether AnimatePresence should animate on initial mount */
  animatePresenceInitial?: boolean;
  /** Time between rotations in milliseconds */
  rotationInterval?: number;
  /** Delay between character animations */
  staggerDuration?: number;
  /** Direction for stagger animation */
  staggerFrom?: StaggerDirection;
  /** Whether to loop back to beginning */
  loop?: boolean;
  /** Whether to auto-rotate */
  auto?: boolean;
  /** How to split text for animation */
  splitBy?: SplitType;
  /** Callback when moving to next text */
  onNext?: (index: number) => void;
  /** CSS class for main container */
  mainClassName?: string;
  /** CSS class for split level (words) */
  splitLevelClassName?: string;
  /** CSS class for element level (characters) */
  elementLevelClassName?: string;
  /** Ref for programmatic control */
  ref?: React.Ref<RotatingTextRef>;
}

/**
 * Rotating text component with smooth character-level animations
 *
 * Features:
 * - Character-by-character animation with stagger effects
 * - Programmatic control via ref methods
 * - Customizable animation timing and direction
 * - Auto-rotation with configurable intervals
 * - Accessibility support with screen reader text
 *
 * @example
 * ```tsx
 * <RotatingText
 *   texts={["Hello", "World", "React"]}
 *   rotationInterval={2000}
 *   staggerFrom="first"
 * />
 * ```
 */
function RotatingText({
  texts,
  transition = ROTATING_TEXT_CONFIG.defaultTransition,
  initial = ROTATING_TEXT_CONFIG.defaultInitial,
  animate = ROTATING_TEXT_CONFIG.defaultAnimate,
  exit = ROTATING_TEXT_CONFIG.defaultExit,
  animatePresenceMode = "wait",
  animatePresenceInitial = false,
  rotationInterval = ROTATING_TEXT_CONFIG.defaultRotationInterval,
  staggerDuration = 0,
  staggerFrom = "first",
  loop = true,
  auto = true,
  splitBy = "characters",
  onNext,
  mainClassName,
  splitLevelClassName,
  elementLevelClassName,
  ref,
  ...rest
}: RotatingTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);

  /**
   * Split text into individual characters using modern browser APIs
   * Handles complex Unicode characters correctly
   */
  const splitIntoCharacters = useCallback((text: string): string[] => {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text), (segment) => segment.segment);
    }
    // Fallback for browsers without Intl.Segmenter
    return text.split("");
  }, []);

  /**
   * Parse text into word structures for animation
   * Preserves spacing and handles line breaks
   */
  const parseTextStructure = useCallback(
    (text: string): WordStructure[] => {
      if (splitBy === "lines") {
        return [{ characters: splitIntoCharacters(text), needsSpace: false }];
      }

      const words = text.split(/(\s+)/);
      return words.map((word, index) => ({
        characters: splitIntoCharacters(word),
        needsSpace: index < words.length - 1 && !/\s/.test(word),
      }));
    },
    [splitBy, splitIntoCharacters],
  );

  /**
   * Calculate stagger delay for character animations
   */
  const getStaggerDelay = useCallback(
    (index: number, totalCount: number): number => {
      if (staggerDuration === 0) return 0;

      switch (staggerFrom) {
        case "first":
          return index * staggerDuration;
        case "last":
          return (totalCount - 1 - index) * staggerDuration;
        case "center":
          const center = Math.floor(totalCount / 2);
          return Math.abs(index - center) * staggerDuration;
        case "random":
          return Math.random() * staggerDuration * totalCount;
        default:
          if (typeof staggerFrom === "number") {
            return Math.abs(index - staggerFrom) * staggerDuration;
          }
          return index * staggerDuration;
      }
    },
    [staggerDuration, staggerFrom],
  );

  /**
   * Memoized text structure for current text
   */
  const elements = useMemo(() => {
    const currentText = texts[currentTextIndex] || "";
    return parseTextStructure(currentText);
  }, [texts, currentTextIndex, parseTextStructure]);

  /**
   * Handle index changes with callback
   */
  const handleIndexChange = useCallback(
    (newIndex: number) => {
      setCurrentTextIndex(newIndex);
      onNext?.(newIndex);
    },
    [onNext],
  );

  /**
   * Move to next text in rotation
   */
  const next = useCallback(() => {
    const nextIndex =
      currentTextIndex === texts.length - 1
        ? loop
          ? 0
          : currentTextIndex
        : currentTextIndex + 1;

    if (nextIndex !== currentTextIndex) {
      handleIndexChange(nextIndex);
    }
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  /**
   * Move to previous text in rotation
   */
  const previous = useCallback(() => {
    const prevIndex =
      currentTextIndex === 0
        ? loop
          ? texts.length - 1
          : currentTextIndex
        : currentTextIndex - 1;

    if (prevIndex !== currentTextIndex) {
      handleIndexChange(prevIndex);
    }
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  /**
   * Jump to specific text index
   */
  const jumpTo = useCallback(
    (index: number) => {
      const validIndex = Math.max(0, Math.min(index, texts.length - 1));
      if (validIndex !== currentTextIndex) {
        handleIndexChange(validIndex);
      }
    },
    [texts.length, currentTextIndex, handleIndexChange],
  );

  /**
   * Reset to first text
   */
  const reset = useCallback(() => {
    if (currentTextIndex !== 0) {
      handleIndexChange(0);
    }
  }, [currentTextIndex, handleIndexChange]);

  // Expose ref methods
  useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [
    next,
    previous,
    jumpTo,
    reset,
  ]);

  // Auto-rotation effect
  useEffect(() => {
    if (!auto) return;

    const intervalId = setInterval(next, rotationInterval);
    return () => clearInterval(intervalId);
  }, [next, rotationInterval, auto]);

  /**
   * Render individual character with animation
   */
  const renderCharacter = (
    char: string,
    charIndex: number,
    wordIndex: number,
    allElements: WordStructure[],
  ) => {
    const previousCharsCount = allElements
      .slice(0, wordIndex)
      .reduce((sum, word) => sum + word.characters.length, 0);

    const totalCharsCount = allElements.reduce(
      (sum, word) => sum + word.characters.length,
      0,
    );

    return (
      <motion.span
        key={charIndex}
        initial={initial}
        animate={animate}
        exit={exit}
        transition={{
          ...transition,
          delay: getStaggerDelay(
            previousCharsCount + charIndex,
            totalCharsCount,
          ),
        }}
        className={cn("inline-block", elementLevelClassName)}
      >
        {char}
      </motion.span>
    );
  };

  /**
   * Render word with all its characters
   */
  const renderWord = (wordObj: WordStructure, wordIndex: number) => (
    <motion.span
      key={wordIndex}
      className={cn("inline-flex", splitLevelClassName)}
    >
      {wordObj.characters.map((char, charIndex) =>
        renderCharacter(char, charIndex, wordIndex, elements),
      )}
      {wordObj.needsSpace && <span className="whitespace-pre"> </span>}
    </motion.span>
  );

  return (
    <motion.div
      animate={ROTATING_TEXT_CONFIG.entranceAnimation.animate}
      transition={ROTATING_TEXT_CONFIG.entranceAnimation.transition}
      aria-live="polite"
      aria-label="Rotating text animation"
    >
      <motion.span
        className={cn(
          "relative flex flex-wrap whitespace-pre-wrap",
          mainClassName,
        )}
        {...rest}
        layout
        transition={transition}
      >
        {/* Screen reader text */}
        <span className="sr-only">{texts[currentTextIndex]}</span>

        {/* Animated text */}
        <AnimatePresence
          mode={animatePresenceMode}
          initial={animatePresenceInitial}
        >
          <motion.span
            key={currentTextIndex}
            className={cn(
              splitBy === "lines"
                ? "flex w-full flex-col"
                : "relative flex flex-wrap whitespace-pre-wrap",
            )}
            layout
            aria-hidden="true"
          >
            {elements.map((wordObj, wordIndex) =>
              renderWord(wordObj, wordIndex),
            )}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </motion.div>
  );
}

RotatingText.displayName = "RotatingText";

export default RotatingText;
