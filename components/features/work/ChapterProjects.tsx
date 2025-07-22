import { childVariants } from "@/data/animation";
import { cn } from "@/lib/utils";
import { ProjectExtended } from "@/types/contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

import { MotionFeatureCard } from "../../shared/FeatureCard";

/**
 * Configuration for ChapterFeatures component
 */
export const CHAPTER_FEATURES_CONFIG = {
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
      content: "Project Type",
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
interface ChapterProjectsData {
  id?: number | string;
  name: string;
  description?: string;
  bgColor?: string;
  imgBorder?: string;
  link: string;
}

/**
 * Props for ChapterFeatures component
 */
interface ChapterProjectsProps {
  /** Array of chapter features to display */
  projects?: ProjectExtended[];
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
export function ChapterProjects({
  projects,
  className,
  isLoading = false,
}: ChapterProjectsProps = {}) {
  // Use provided features or fallback data
  const displayProjects = projects;
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
  const renderFeatureCard = (feature: ProjectExtended, index: number) => (
    <MotionFeatureCard
      key={index}
      variants={childVariants}
      {...CHAPTER_FEATURES_CONFIG.animation}
      title={feature.name}
      content={documentToHtmlString(feature.description.json)}
      bgColor={feature.bgColor}
      imgBorder={feature.imgBorder}
      link={feature.link}
    />
  );

  /**
   * Render empty state
   */
  const renderEmptyState = () => (
    <div className={cn(CHAPTER_FEATURES_CONFIG.containerClasses, className)}>
      <div className="flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-lg text-gray-500">No chapter projects available</p>
      </div>
    </div>
  );

  // Handle loading state
  if (isLoading) {
    return renderLoadingSkeleton();
  }

  // Handle empty state
  if (!displayProjects || !displayProjects.length) {
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

      {displayProjects.map((project, index) =>
        renderFeatureCard(project, index),
      )}
    </section>
  );
}
