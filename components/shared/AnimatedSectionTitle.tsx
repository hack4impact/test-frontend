import { cn } from "@/lib/utils";
import { MotionProps, Variants, motion } from "motion/react";

/**
 * Configuration for AnimatedSectionTitle component
 */
const ANIMATED_TITLE_CONFIG = {
  // Default animation settings
  defaultAnimation: {
    initial: { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { amount: 0.5 },
    transition: {
      type: "spring" as const,
      damping: 10,
      stiffness: 100,
      delay: 0.25,
    },
  },

  // Predefined animation variants
  variants: {
    // Smooth fade up
    fadeUp: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring" as const,
          damping: 15,
          stiffness: 120,
        },
      },
    },

    // Slide in from left
    slideLeft: {
      hidden: { opacity: 0, x: -30 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          type: "spring" as const,
          damping: 12,
          stiffness: 100,
        },
      },
    },

    // Scale up effect
    scaleUp: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring" as const,
          damping: 10,
          stiffness: 150,
        },
      },
    },

    // Character-by-character reveal
    reveal: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.05,
        },
      },
    },
  } satisfies Record<string, Variants>,

  // Default styles for different heading levels
  headingStyles: {
    h1: "text-5xl font-semibold",
    h2: "text-4xl font-semibold",
    h3: "text-3xl font-medium",
    h4: "text-2xl font-medium",
    h5: "text-xl font-medium",
    h6: "text-lg font-medium",
  },

  // Viewport settings
  viewport: {
    amount: 0.5,
    once: true,
  },
} as const;

/**
 * Valid HTML heading elements
 */
type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

/**
 * Available animation presets
 */
type AnimationPreset = keyof typeof ANIMATED_TITLE_CONFIG.variants;

/**
 * Props for AnimatedSectionTitle component
 */
export interface AnimatedSectionTitleProps {
  /** Content to display in the title */
  children: React.ReactNode;
  /** HTML heading level (default: h1) */
  as?: HeadingLevel;
  /** CSS classes to apply */
  className?: string;
  /** Animation preset to use */
  variant?: AnimationPreset;
  /** Custom animation variants */
  customVariants?: Variants;
  /** Animation delay in seconds */
  delay?: number;
  /** Whether to animate only once */
  once?: boolean;
  /** Viewport amount needed to trigger animation */
  viewportAmount?: number;
  /** Additional motion props */
  motionProps?: Omit<MotionProps, "children" | "className">;
  /** ID for accessibility and linking */
  id?: string;
}

/**
 * Animated section title component with flexible heading levels and animations
 *
 * Features:
 * - Multiple heading levels (h1-h6) with appropriate styling
 * - Predefined animation variants (fadeUp, slideLeft, scaleUp, reveal)
 * - Custom animation support
 * - Viewport-triggered animations
 * - Accessibility-friendly with proper semantics
 * - Highly customizable styling and behavior
 *
 * @example
 * ```tsx
 * // Basic usage
 * <AnimatedSectionTitle>Our Impact</AnimatedSectionTitle>
 *
 * // With heading level
 * <AnimatedSectionTitle as="h2">Featured Projects</AnimatedSectionTitle>
 *
 * // With animation variant
 * <AnimatedSectionTitle variant="slideLeft">Our Work</AnimatedSectionTitle>
 *
 * // With custom styling
 * <AnimatedSectionTitle
 *   as="h3"
 *   className="text-brand-blue"
 *   delay={0.5}
 * >
 *   Custom Title
 * </AnimatedSectionTitle>
 * ```
 */
export function AnimatedSectionTitle({
  children,
  as: Component = "h1",
  className,
  variant,
  customVariants,
  delay = 0.25,
  once = true,
  viewportAmount = 0.5,
  motionProps = {},
  id,
}: AnimatedSectionTitleProps) {
  // Determine which animation to use
  const animationVariants =
    customVariants ||
    (variant ? ANIMATED_TITLE_CONFIG.variants[variant] : null);

  // Get default styling for heading level
  const defaultHeadingStyle = ANIMATED_TITLE_CONFIG.headingStyles[Component];

  // Create motion component for the specific heading level
  const MotionHeading = motion.create(Component);

  /**
   * Animation props for variants-based animation
   */
  const variantAnimationProps = animationVariants
    ? {
        variants: animationVariants,
        initial: "hidden",
        whileInView: "visible",
        viewport: {
          amount: viewportAmount,
          once,
        },
      }
    : {};

  /**
   * Animation props for direct animation (no variants)
   */
  const directAnimationProps = !animationVariants
    ? {
        ...ANIMATED_TITLE_CONFIG.defaultAnimation,
        transition: {
          ...ANIMATED_TITLE_CONFIG.defaultAnimation.transition,
          delay,
        },
        viewport: {
          amount: viewportAmount,
          once,
        },
      }
    : {};

  return (
    <MotionHeading
      id={id}
      className={cn(defaultHeadingStyle, className)}
      {...variantAnimationProps}
      {...directAnimationProps}
      {...motionProps}
    >
      {children}
    </MotionHeading>
  );
}

/**
 * Character-level animated title for advanced effects
 *
 * This component splits the text into individual characters
 * for more granular animation control.
 */
export function AnimatedSectionTitleReveal({
  children,
  as: Component = "h1",
  className,
  delay = 0,
  once = true,
  viewportAmount = 0.5,
  motionProps = {},
  id,
}: Omit<AnimatedSectionTitleProps, "variant" | "customVariants">) {
  const defaultHeadingStyle = ANIMATED_TITLE_CONFIG.headingStyles[Component];
  const MotionHeading = motion.create(Component);

  // Convert children to string for character splitting
  const text = typeof children === "string" ? children : String(children);

  return (
    <MotionHeading
      id={id}
      className={cn(defaultHeadingStyle, className)}
      variants={ANIMATED_TITLE_CONFIG.variants.reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: viewportAmount, once }}
      {...motionProps}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 200,
                delay: delay + index * 0.02,
              },
            },
          }}
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </MotionHeading>
  );
}

/**
 * Export animation variants for use in other components
 */
export const titleAnimationVariants = ANIMATED_TITLE_CONFIG.variants;

/**
 * Export default animation for consistent usage
 */
export const defaultTitleAnimation = ANIMATED_TITLE_CONFIG.defaultAnimation;
