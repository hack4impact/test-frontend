"use client";

import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import { MotionProps, motion } from "motion/react";
import Link from "next/link";

/**
 * Configuration for FeatureCard component
 */
const FEATURE_CARD_CONFIG = {
  // Default styling
  defaults: {
    bgColor: "bg-brand-blue",
    textColor: "text-white",
    imgBorder: "border-brand-blue-light",
    footer: "Visit Project",
    link: "/",
  },

  // Animation presets
  animations: {
    // Hover and tap interactions
    interactions: {
      whileTap: { scale: 0.98 },
      whileHover: {
        rotateZ: "0.5deg",
        backgroundColor: "var(--color-brand-black)",
      },
      transition: {
        type: "spring" as const,
        damping: 10,
        stiffness: 100,
        duration: 0.25,
        backgroundColor: { duration: 0.2, ease: "easeInOut" }, // Specific transition for color, without it it breaks because of weird styling issues (could be refactored to be better)
      },
    },

    // Common scroll-triggered animations
    scrollAnimation: {
      initial: "hidden",
      whileInView: "visible",
      viewport: { amount: "some" as const },
      style: { opacity: 0 },
    },

    // Animation variants for scroll reveal
    variants: {
      hidden: {
        opacity: 0,
        y: 20,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring" as const,
          damping: 10,
          stiffness: 100,
        },
      },
    },
  },

  // Typography sizes
  typography: {
    title: "text-[35px]",
    content: "text-[20px]",
    footer: "text-[30px]",
  },
} as const;

/**
 * Props for the FeatureCard component
 */
export interface FeatureCardProps {
  /** Main title text */
  title: string;
  /** Main content/description text */
  content: string;
  /** Footer text (optional) */
  footer?: string;
  /** Background color class */
  bgColor?: string;
  /** Text color class */
  textColor?: string;
  /** Image border color class */
  imgBorder?: string;
  /** Additional CSS classes */
  className?: string;
  /** Ref for the component */
  ref?: React.Ref<HTMLDivElement>;
  /** Link navigation to project */
  link: string;
}

/**
 * Props that combine FeatureCard props with motion props
 */
export interface MotionFeatureCardProps
  extends FeatureCardProps,
    Omit<MotionProps, keyof FeatureCardProps> {}

/**
 * Base FeatureCard component with consistent styling and hover effects
 *
 * Features:
 * - Responsive layout with image placeholder and content
 * - Customizable colors and styling
 * - Built-in hover and tap animations
 * - Accessible card structure
 *
 * @example
 * ```tsx
 * <FeatureCard
 *   title="Project Name"
 *   content="Description of the project and its impact"
 *   footer="Learn More"
 *   bgColor="bg-brand-green"
 * />
 * ```
 */
function FeatureCard({
  title,
  content,
  footer = FEATURE_CARD_CONFIG.defaults.footer,
  bgColor = FEATURE_CARD_CONFIG.defaults.bgColor,
  textColor = FEATURE_CARD_CONFIG.defaults.textColor,
  imgBorder = FEATURE_CARD_CONFIG.defaults.imgBorder,
  className,
  link = FEATURE_CARD_CONFIG.defaults.link,
  ref,
}: FeatureCardProps) {
  return (
    <motion.div
      ref={ref}
      {...FEATURE_CARD_CONFIG.animations.interactions}
      className={cn(
        "w-full transition-shadow",
        "hover:shadow-brand-black/50 hover:drop-shadow-xl rounded-xl",
        bgColor || FEATURE_CARD_CONFIG.defaults.bgColor,
        textColor || FEATURE_CARD_CONFIG.defaults.textColor,
        className,
      )}
    >
      <Link
        href={link}
        className={cn("rounded-xl py-6 flex h-full w-full flex-row")}
      >
        {/* Image placeholder area */}
        <div
          className={cn("ml-5 flex w-1/2 rounded-sm border-3", imgBorder)}
          aria-label="Project image placeholder"
        />

        {/* Content area */}
        <div className="flex w-1/2 flex-col">
          <CardHeader className="h-1/5">
            <CardTitle
              className={cn(
                "h-full font-semibold",
                FEATURE_CARD_CONFIG.typography.title,
              )}
            >
              {title}
            </CardTitle>
          </CardHeader>

          <CardContent
            className={cn("mt-5 h-3/5", FEATURE_CARD_CONFIG.typography.content)}
          >
            {content}
          </CardContent>

          <CardFooter
            className={cn(
              "mt-10 h-1/5 leading-none font-semibold",
              FEATURE_CARD_CONFIG.typography.footer,
            )}
          >
            {footer}
          </CardFooter>
        </div>
      </Link>
    </motion.div>
  );
}

/**
 * Motion-enhanced FeatureCard with scroll animations and motion props support
 *
 * This component combines the base FeatureCard with Framer Motion capabilities,
 * providing scroll-triggered animations and full motion props support.
 *
 * @example
 * ```tsx
 * <MotionFeatureCard
 *   title="Project Name"
 *   content="Description text"
 *   initial="hidden"
 *   whileInView="visible"
 *   variants={customVariants}
 * />
 * ```
 */
function MotionFeatureCard({
  title,
  content,
  footer,
  bgColor,
  textColor,
  imgBorder,
  className,
  ref,
  link = FEATURE_CARD_CONFIG.defaults.link,
  ...motionProps
}: MotionFeatureCardProps) {
  return (
    <motion.div
      ref={ref}
      {...FEATURE_CARD_CONFIG.animations.interactions}
      {...motionProps}
      className={cn(
        "w-full transition-shadow",
        "hover:shadow-brand-black/50 hover:drop-shadow-xl rounded-xl",
        bgColor || FEATURE_CARD_CONFIG.defaults.bgColor,
        textColor || FEATURE_CARD_CONFIG.defaults.textColor,
        className,
      )}
    >
      <Link
        href={link ? link : "/"}
        className={cn("flex h-full w-full flex-row rounded-xl py-6")}
      >
        {/* Image placeholder area */}
        <div
          className={cn(
            "ml-5 md:flex hidden w-1/2 rounded-sm border-3",
            imgBorder || FEATURE_CARD_CONFIG.defaults.imgBorder,
          )}
          aria-label="Project image placeholder"
        />

        {/* Content area */}
        <div className="flex md:w-1/2 w-full flex-col">
          <CardHeader className="h-1/5">
            <CardTitle
              className={cn(
                "h-full font-semibold",
                FEATURE_CARD_CONFIG.typography.title,
              )}
            >
              {title}
            </CardTitle>
          </CardHeader>

          <div
            className={cn(
              "px-6 mt-5 h-3/5",
              FEATURE_CARD_CONFIG.typography.content,
            )}
          >
            {parse(content)}
          </div>

          <CardFooter
            className={cn(
              "mt-10 h-1/5 leading-none font-semibold",
              FEATURE_CARD_CONFIG.typography.footer,
            )}
          >
            {footer || FEATURE_CARD_CONFIG.defaults.footer}
          </CardFooter>
        </div>
      </Link>
    </motion.div>
  );
}

/**
 * Common animation variants for consistent scroll animations
 * Export this for use in components that render multiple FeatureCards
 */
export const featureCardVariants = FEATURE_CARD_CONFIG.animations.variants;

/**
 * Common scroll animation props for consistent behavior
 * Use this to quickly apply standard scroll animations
 */
export const featureCardScrollProps =
  FEATURE_CARD_CONFIG.animations.scrollAnimation;

export { FeatureCard, MotionFeatureCard };
