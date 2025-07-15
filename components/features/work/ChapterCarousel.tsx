import { chapters } from "@/data/content";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Chapter data structure
 */
interface ChapterData {
  university: string;
  est: number;
  location: string;
  website: string;
  github: string;
}

/**
 * Configuration for ChapterCarousel
 */
const CAROUSEL_CONFIG = {
  animations: {
    card: {
      hover: {
        background: "var(--color-brand-black)",
      },
      transition: {
        duration: 0.3,
      },
    },

    selector: {
      active: {
        backgroundColor: "var(--color-brand-blue)",
        border: "none",
        y: -7,
      },
      inactive: {
        backgroundColor: "var(--color-brand-green-light)",
        borderColor: "var(--color-brand-green)",
        borderWidth: "3px",
        y: 0,
      },
      hover: {
        rotateZ: "5deg",
        backgroundColor: "var(--color-brand-black)",
        border: "none",
        y: 7,
      },
      tap: {
        scale: 0.95,
      },
      transition: {
        backgroundColor: { type: false },
        y: { type: "spring", damping: 20, stiffness: 300 },
      },
    },
  },

  containerClasses:
    "my-10 h-min w-full flex flex-col gap-2 items-center justify-center",
  cardsClasses:
    "overscroll-x-none flex flex-row w-full h-[400px] overflow-x-auto snap-x snap-mandatory justify-start",
  selectorClasses:
    "pt-2 pb-3 px-2 border-x-3 overscroll-x-none flex relative flex-initial w-full h-min justify-start overflow-x-auto snap-x snap-mandatory",
} as const;

/**
 * Individual chapter card component
 */
interface ChapterCardProps {
  chapter: ChapterData;
  index: number;
  isActive?: boolean;
  onHover: (index: number) => void;
  ref: (el: HTMLDivElement | null) => void;
}

function ChapterCard({ chapter, index, onHover, ref }: ChapterCardProps) {
  return (
    <motion.div
      ref={ref}
      whileHover={CAROUSEL_CONFIG.animations.card.hover}
      transition={CAROUSEL_CONFIG.animations.card.transition}
      onMouseEnter={() => onHover(index)}
      className={cn(
        "flex p-3 flex-none w-full h-full rounded-md bg-brand-blue justify-center snap-start mr-2 last:mr-0",
      )}
    >
      <a
        href={chapter.website}
        target="_blank"
        rel="noopener noreferrer"
        className="w-1/2 h-full rounded-sm flex flex-col p-2 gap-1 text-white mr-2"
        aria-label={`Visit ${chapter.university} chapter website`}
      >
        <h3 className="text-3xl font-semibold w-full">{chapter.university}</h3>
        <p className="text-2xl w-full font-thin italic">
          Est. {chapter.est} in {chapter.location}
        </p>
        <div className="flex flex-auto" />
        <p className="text-3xl font-semibold w-full">Visit Chapter Website</p>
        <div className="w-full h-10 border-1 rounded-sm" />
      </a>

      {/* Image placeholder */}
      <div
        className="w-1/2 h-full border-3 text-9xl place-content-center rounded-sm border-brand-blue-light"
        aria-label={`${chapter.university} chapter logo`}
      />
    </motion.div>
  );
}

/**
 * Selector button component
 */
interface SelectorButtonProps {
  index: number;
  isActive: boolean;
  onClick: (index: number) => void;
}

function SelectorButton({ index, isActive, onClick }: SelectorButtonProps) {
  return (
    <motion.button
      initial={{
        rotateZ: "0deg",
        backgroundColor: "var(--color-brand-green-light)",
        borderColor: "var(--color-brand-green)",
        borderWidth: "3px",
        y: 0,
      }}
      animate={
        isActive
          ? CAROUSEL_CONFIG.animations.selector.active
          : CAROUSEL_CONFIG.animations.selector.inactive
      }
      whileHover={CAROUSEL_CONFIG.animations.selector.hover}
      whileTap={CAROUSEL_CONFIG.animations.selector.tap}
      transition={CAROUSEL_CONFIG.animations.selector.transition}
      onClick={() => onClick(index)}
      className="scroll-ml-2 snap-start rounded-sm flex-none w-[120px] h-[80px] scroll-smooth mr-2 last:mr-0"
      aria-label={`Go to ${chapters[index]?.university} chapter`}
    />
  );
}

/**
 * Selector component with navigation buttons
 */
interface SelectorProps {
  activeIndex: number;
  onIndexChange: (index: number) => void;
}

function Selector({ activeIndex, onIndexChange }: SelectorProps) {
  const getBorderClass = (position: "left" | "right") => {
    if (position === "left") {
      return activeIndex === 0 ? "border-l-brand-red" : "border-l-brand-green";
    }
    return activeIndex === chapters.length - 1
      ? "border-r-brand-red"
      : "border-r-brand-green";
  };

  return (
    <div
      className={cn(
        CAROUSEL_CONFIG.selectorClasses,
        getBorderClass("left"),
        getBorderClass("right"),
      )}
    >
      {chapters.map((_, index) => (
        <SelectorButton
          key={index}
          index={index}
          isActive={index === activeIndex}
          onClick={onIndexChange}
        />
      ))}
    </div>
  );
}

/**
 * ChapterCarousel component that displays chapters with navigation
 *
 * Features:
 * - Horizontal scrolling carousel of chapter cards
 * - Interactive selector buttons
 * - Smooth scrolling to selected chapter
 * - Hover effects and animations
 * - Keyboard navigation support
 *
 * @example
 * ```tsx
 * <ChapterCarousel />
 * ```
 */
export function ChapterCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  /**
   * Scroll to the selected chapter card
   */
  const scrollToCard = useCallback(
    (index: number) => {
      const targetCard = cardRefs.current[index];
      if (targetCard && hasInteracted) {
        targetCard.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }
    },
    [hasInteracted],
  );

  /**
   * Handle index changes and scroll to card
   */
  const handleIndexChange = (index: number) => {
    setActiveIndex(index);
    scrollToCard(index);
  };

  /**
   * Handle card hover
   */
  const handleCardHover = (index: number) => {
    setActiveIndex(index);
  };

  /**
   * Handle first interaction
   */
  const handleFirstInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  /**
   * Set up card ref
   */
  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  };

  // Scroll to card when index changes
  useEffect(() => {
    scrollToCard(activeIndex);
  }, [activeIndex, hasInteracted, scrollToCard]);

  return (
    <div
      className={CAROUSEL_CONFIG.containerClasses}
      onMouseEnter={handleFirstInteraction}
      role="region"
      aria-label="Chapter carousel"
    >
      {/* Selector */}
      <Selector activeIndex={activeIndex} onIndexChange={handleIndexChange} />

      {/* Chapter Cards */}
      <div className={CAROUSEL_CONFIG.cardsClasses}>
        {chapters.map((chapter, index) => (
          <ChapterCard
            key={index}
            chapter={chapter}
            index={index}
            isActive={index === activeIndex}
            onHover={handleCardHover}
            ref={setCardRef(index)}
          />
        ))}
      </div>
    </div>
  );
}
