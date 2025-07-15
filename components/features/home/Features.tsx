import { item } from "@/data/animation";
import { features } from "@/data/content";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

import { MotionFeatureCard } from "../../shared/FeatureCard";

/**
 * Configuration for Features component
 */
const FEATURES_CONFIG = {
  containerClasses: "my-10 flex w-full flex-col justify-between gap-5",

  // Animation settings
  animation: {
    initial: "hidden",
    whileInView: "visible",
    viewport: { amount: "some" },
    style: { opacity: 0 },
  },

  // Default footer text
  defaultFooter: "Visit Project",

  // Fallback data if none provided
  fallbackData: [
    {
      id: 1,
      title: "Sample Project",
      description: "Sample Type",
      content:
        "This is a sample project description. Replace with actual project data.",
    },
  ],
} as const;

/**
 * Interface for feature data
 */
interface FeatureData {
  id?: number | string;
  title: string;
  description?: string;
  content: string;
  footer?: string;
  bgColor?: string;
  imgBorder?: string;
}

/**
 * Props for Features component
 */
interface FeaturesProps {
  /** Array of features to display */
  features?: FeatureData[];
  /** Footer text for all cards */
  footer?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show loading state */
  isLoading?: boolean;
  /** Whether to animate the container */
  animated?: boolean;
}

/**
 * Features component that displays a list of project features
 *
 * Features:
 * - Displays feature cards with scroll animations
 * - Customizable footer text
 * - Loading state support
 * - Fallback content when no features provided
 * - Optional container animation
 *
 * @example
 * ```tsx
 * <Features />
 *
 * // With custom features and footer
 * <Features
 *   features={customFeatures}
 *   footer="Learn More"
 * />
 *
 * // With container animation
 * <Features animated />
 * ```
 */
export default function Features({
  features: providedFeatures,
  footer = FEATURES_CONFIG.defaultFooter,
  className,
  isLoading = false,
  animated = false,
}: FeaturesProps = {}) {
  // Use provided features or fallback data
  const displayFeatures =
    providedFeatures || features || FEATURES_CONFIG.fallbackData;

  /**
   * Render loading skeleton
   */
  const renderLoadingSkeleton = () => (
    <div className={cn(FEATURES_CONFIG.containerClasses, className)}>
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="h-48 w-full animate-pulse rounded-lg bg-gray-200"
          aria-label={`Loading feature ${index + 1}`}
        />
      ))}
    </div>
  );

  /**
   * Render individual feature card
   */
  const renderFeatureCard = (feature: FeatureData, index: number) => (
    <MotionFeatureCard
      key={feature.id || index}
      variants={item}
      {...FEATURES_CONFIG.animation}
      title={feature.title}
      content={feature.content}
      footer={feature.footer || footer}
      bgColor={feature.bgColor}
      imgBorder={feature.imgBorder}
    />
  );

  /**
   * Render empty state
   */
  const renderEmptyState = () => (
    <div className={cn(FEATURES_CONFIG.containerClasses, className)}>
      <div className="flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-lg text-gray-500">No features available</p>
      </div>
    </div>
  );

  // Handle loading state
  if (isLoading) {
    return renderLoadingSkeleton();
  }

  // Handle empty state
  if (!displayFeatures.length) {
    return renderEmptyState();
  }

  // Choose container component based on animation preference
  const Container = animated ? motion.div : "div";
  const containerProps = animated
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { amount: 0.3 },
        transition: { duration: 0.5 },
      }
    : {};

  return (
    <Container
      className={cn(FEATURES_CONFIG.containerClasses, className)}
      {...containerProps}
      role="region"
      aria-labelledby="features-heading"
    >
      {/* Screen reader heading */}
      <h2 id="features-heading" className="sr-only">
        Project Features
      </h2>

      {displayFeatures.map((feature, index) =>
        renderFeatureCard(feature, index),
      )}
    </Container>
  );
}
