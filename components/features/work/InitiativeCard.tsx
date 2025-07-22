import { cn } from "@/lib/utils";
import { RichText } from "@/types";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import parse from "html-react-parser";
import { MotionProps, motion } from "motion/react";
import { useState } from "react";

import { CHAPTER_FEATURES_CONFIG } from "./ChapterProjects";

/**
 * Props for the InitiativeCard component
 */
interface InitiativeCardProps {
  item?: {
    /** Title of the initiative */ name?: string;
    /** Description content */
    description?: RichText;
    /** Footer action text */
    footer?: string;
    /** Border color class for the image area */
    imgBorder?: string;
  };
  /** Additional CSS classes */
  className?: string;
  /** Component ref */
  ref?: React.Ref<HTMLDivElement>;
}

/**
 * Props that combine InitiativeCard with motion props
 */
interface MotionInitiativeCardProps
  extends InitiativeCardProps,
    Omit<MotionProps, keyof InitiativeCardProps> {}

/**
 * Animation configuration for InitiativeCard
 */
const INITIATIVE_CARD_CONFIG = {
  animations: {
    container: {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      transition: { duration: 0.5 },
    },

    imageArea: {
      initial: { opacity: 0, x: -50 },
      whileInView: { opacity: 1, x: 0 },
      transition: { type: "spring", damping: 15, stiffness: 100 },
    },

    contentArea: {
      initial: { opacity: 0, x: 50 },
      whileInView: { opacity: 1, x: 0 },
      transition: { type: "spring", damping: 15, stiffness: 100 },
    },

    underline: {
      hovered: { width: "100%" },
      default: { width: "0%" },
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  },
} as const;

/**
 * Render empty state
 */
const renderEmptyState = () => (
  <div className={cn(CHAPTER_FEATURES_CONFIG.containerClasses)}>
    <div className="flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
      <p className="text-lg text-gray-500">No initiatives available</p>
    </div>
  </div>
);

/**
 * Base InitiativeCard component
 *
 * Displays an initiative with an image placeholder, title, content,
 * and an interactive footer with hover effects.
 *
 * @example
 * ```tsx
 * <InitiativeCard
 *   item={{
 *     name: "Chapter Network",
 *     content: richTextContent,
 *     footer: "Learn More",
 *     imgBorder: "border-brand-blue"
 *   }}
 * />
 * ```
 */
function InitiativeCard({ item, className, ref }: InitiativeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (!item || !item.name) {
    return renderEmptyState();
  }

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("w-full h-[200px] flex flex-row gap-5", className)}
    >
      {/* Image placeholder area */}
      <motion.div
        {...INITIATIVE_CARD_CONFIG.animations.imageArea}
        className={cn(
          "flex w-1/2 h-full border-3 rounded-sm backdrop-blur-[2px]",
          item.imgBorder,
        )}
        aria-label="Initiative image placeholder"
      />

      {/* Content area */}
      <motion.div
        {...INITIATIVE_CARD_CONFIG.animations.contentArea}
        className="flex w-1/2 h-full flex-col justify-stretch"
      >
        <h3 className="flex flex-none mb-2 text-4xl font-semibold">
          {item.name}
        </h3>

        <div className="flex flex-auto text-xl">
          {item.description &&
            parse(documentToHtmlString(item.description.json))}
        </div>

        {/* Footer with animated underline */}
        <div className="flex flex-none items-end text-2xl font-semibold">
          <p className="relative flex items-end">
            {item.footer || "Learn More"}
            <motion.span
              animate={
                isHovered
                  ? INITIATIVE_CARD_CONFIG.animations.underline.hovered
                  : INITIATIVE_CARD_CONFIG.animations.underline.default
              }
              transition={
                INITIATIVE_CARD_CONFIG.animations.underline.transition
              }
              className="absolute border-b-3 border-b-brand-blue"
            />
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Motion-enhanced InitiativeCard with full motion props support
 *
 * Combines the base InitiativeCard with Framer Motion capabilities
 * for additional animations and motion effects.
 */
function MotionInitiativeCard({
  item,
  className,
  ref,
  ...motionProps
}: MotionInitiativeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (!item || !item.name) {
    return renderEmptyState();
  }

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("w-full flex flex-row gap-5", className)}
      {...motionProps}
    >
      {/* Image placeholder area */}
      <motion.div
        {...INITIATIVE_CARD_CONFIG.animations.imageArea}
        className={cn(
          "flex w-1/2 place-self-stretch flex-auto border-3 rounded-sm backdrop-blur-[2px]",
          item.imgBorder,
        )}
        aria-label="Initiative image placeholder"
      />

      {/* Content area */}
      <motion.div
        {...INITIATIVE_CARD_CONFIG.animations.contentArea}
        className="flex w-1/2 h-full flex-col justify-stretch"
      >
        <h3 className="flex flex-none mb-2 text-4xl font-semibold">
          {item.name}
        </h3>

        <div className="flex flex-auto text-xl">
          {item.description &&
            parse(documentToHtmlString(item.description.json))}
        </div>

        {/* Footer with animated underline */}
        <div className="flex flex-none items-end text-2xl font-semibold">
          <p className="relative flex items-end">
            {item.footer || "Learn More"}
            <motion.span
              animate={
                isHovered
                  ? INITIATIVE_CARD_CONFIG.animations.underline.hovered
                  : INITIATIVE_CARD_CONFIG.animations.underline.default
              }
              transition={
                INITIATIVE_CARD_CONFIG.animations.underline.transition
              }
              className="absolute border-b-3 border-b-brand-blue"
            />
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export { InitiativeCard, MotionInitiativeCard };
