import { childVariants } from "@/data/animation";
import { chapterFeatures } from "@/data/content";
import { cn } from "@/lib/utils";

import { MotionFeatureCard } from "../../shared/FeatureCard";

/**
 * Configuration for ChapterFeatures component
 */
const CHAPTER_FEATURES_CONFIG = {
  containerClasses: "my-10 flex w-full flex-col justify-between gap-5",

  // Animation settings
  animation: {
    initial: "hidden",
    whileInView: "visible",
    viewport: { amount: "some" },
    style: { opacity: 0 },
  },

  // Fallback data if none provided
  fallbackData: [
    {
      id: 1,
      title: "Sample Project",
      description: "Project Type",
      bgColor: "bg-brand-green",
      imgBorder: "border-brand-green-light",
      content:
        "This is a sample project description. Replace with actual chapter project data.",
    },
  ],
} as const;

/**
 * Interface for chapter feature data
 */
interface ChapterFeatureData {
  id?: number | string;
  title: string;
  description?: string;
  bgColor?: string;
  imgBorder?: string;
  content: string;
}

/**
 * Props for ChapterFeatures component
 */
interface ChapterFeaturesProps {
  /** Array of chapter features to display */
  features?: ChapterFeatureData[];
  /** Additional CSS classes */
  className?: string;
  /** Whether to show loading state */
  isLoading?: boolean;
}

/**
 * ChapterFeatures component that displays featured chapter projects
 *
 * Features:
 * - Displays chapter project cards with animations
 * - Scroll-triggered staggered animations
 * - Loading state support
 * - Fallback content when no features provided
 * - Customizable styling and colors
 *
 * @example
 * ```tsx
 * <ChapterFeatures />
 *
 * // With custom features
 * <ChapterFeatures features={customFeatures} />
 * ```
 */
export function ChapterFeatures({
  features,
  className,
  isLoading = false,
}: ChapterFeaturesProps = {}) {
  // Use provided features or fallback data
  const displayFeatures =
    features || chapterFeatures || CHAPTER_FEATURES_CONFIG.fallbackData;

  /**
   * Render loading skeleton
   */
  const renderLoadingSkeleton = () => (
    <div className={cn(CHAPTER_FEATURES_CONFIG.containerClasses, className)}>
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="h-48 w-full animate-pulse rounded-lg bg-gray-200"
          aria-label={`Loading chapter feature ${index + 1}`}
        />
      ))}
    </div>
  );

  /**
   * Render individual feature card
   */
  const renderFeatureCard = (feature: ChapterFeatureData, index: number) => (
    <MotionFeatureCard
      key={feature.id || index}
      variants={childVariants}
      {...CHAPTER_FEATURES_CONFIG.animation}
      title={feature.title}
      content={feature.content}
      bgColor={feature.bgColor}
      imgBorder={feature.imgBorder}
    />
  );

  /**
   * Render empty state
   */
  const renderEmptyState = () => (
    <div className={cn(CHAPTER_FEATURES_CONFIG.containerClasses, className)}>
      <div className="flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-lg text-gray-500">No chapter features available</p>
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

  return (
    <section
      className={cn(CHAPTER_FEATURES_CONFIG.containerClasses, className)}
      aria-labelledby="chapter-features-heading"
    >
      {/* Screen reader heading */}
      <h2 id="chapter-features-heading" className="sr-only">
        Chapter Featured Projects
      </h2>

      {displayFeatures.map((feature, index) =>
        renderFeatureCard(feature, index),
      )}
    </section>
  );
}
