import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import { MotionProps, motion } from "motion/react";
import { useState } from "react";

/**
 * Props for the InitiativeCard component
 */
interface InitiativeCardProps {
  /** Title of the initiative */
  title?: string;
  /** Description content */
  content: string;
  /** Footer action text */
  footer?: string;
  /** Border color class for the image area */
  imgBorder?: string;
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
 * Default configuration for InitiativeCard
 */
const INITIATIVE_CARD_CONFIG = {
  defaults: {
    title: "National Initiative",
    content:
      "To empower engineers, designers, activists, and humanitarians to create lasting and impactful social change, fostering the wider adoption of software as a tool for social good.",
    footer: "Learn More",
    imgBorder: "border-brand-black",
  },

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
 * Base InitiativeCard component
 *
 * Displays an initiative with an image placeholder, title, content,
 * and an interactive footer with hover effects.
 *
 * @example
 * ```tsx
 * <InitiativeCard
 *   title="Chapter Network"
 *   content="Supporting local chapters..."
 *   footer="Learn More"
 *   imgBorder="border-brand-blue"
 * />
 * ```
 */
function InitiativeCard({
  title = INITIATIVE_CARD_CONFIG.defaults.title,
  content = INITIATIVE_CARD_CONFIG.defaults.content,
  footer = INITIATIVE_CARD_CONFIG.defaults.footer,
  imgBorder = INITIATIVE_CARD_CONFIG.defaults.imgBorder,
  className,
  ref,
}: InitiativeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

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
          imgBorder,
        )}
        aria-label="Initiative image placeholder"
      />

      {/* Content area */}
      <motion.div
        {...INITIATIVE_CARD_CONFIG.animations.contentArea}
        className="flex w-1/2 h-full flex-col justify-stretch"
      >
        <h3 className="flex flex-none mb-2 text-4xl font-semibold">{title}</h3>

        <div className="flex flex-auto text-xl">{parse(content)}</div>

        {/* Footer with animated underline */}
        <div className="flex flex-none items-end text-2xl font-semibold">
          <p className="relative flex items-end">
            {footer}
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
  title,
  content,
  footer,
  imgBorder,
  className,
  ref,
  ...motionProps
}: MotionInitiativeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

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
          imgBorder || INITIATIVE_CARD_CONFIG.defaults.imgBorder,
        )}
        aria-label="Initiative image placeholder"
      />

      {/* Content area */}
      <motion.div
        {...INITIATIVE_CARD_CONFIG.animations.contentArea}
        className="flex w-1/2 h-full flex-col justify-stretch"
      >
        <h3 className="flex flex-none mb-2 text-4xl font-semibold">
          {title || INITIATIVE_CARD_CONFIG.defaults.title}
        </h3>

        <div className="flex flex-auto text-xl">
          {parse(content) || INITIATIVE_CARD_CONFIG.defaults.content}
        </div>

        {/* Footer with animated underline */}
        <div className="flex flex-none items-end text-2xl font-semibold">
          <p className="relative flex items-end">
            {footer || INITIATIVE_CARD_CONFIG.defaults.footer}
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
