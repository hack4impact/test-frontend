import { features } from "@/data/content";
import { cn } from "@/lib/utils";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

import {
  MotionFeatureCard,
  featureCardScrollProps,
  featureCardVariants,
} from "../../shared/FeatureCard";

/**
 * Configuration for FeaturedProjects component
 */
const FEATURED_PROJECTS_CONFIG = {
  containerClasses: "my-10 flex w-full flex-col justify-between gap-5",
  // This would typically come from your CMS or API
  fallbackProjects: features,
} as const;

/**
 * Interface for project data structure
 * This should match your CMS/API data structure
 */
interface ProjectData {
  name: string;
  description: string;
  footer?: string;
  bgColor?: string;
  textColor?: string;
  imgBorder?: string;
  link: string;
}

/**
 * Props for FeaturedProjects component
 */
interface FeaturedProjectsProps {
  /** Array of projects to display */
  projects?: ProjectData[];
  /** Additional CSS classes */
  className?: string;
  /** Whether to show loading state */
  isLoading?: boolean;
}

/**
 * FeaturedProjects component that displays a list of featured project cards
 *
 * Features:
 * - Displays project cards with scroll animations
 * - Fallback content when no projects provided
 * - Loading state support
 * - Consistent spacing and layout
 * - Accessible structure with proper semantics
 *
 * @example
 * ```tsx
 * <FeaturedProjects projects={projectsData} />
 * ```
 */
export default function FeaturedProjects({
  projects,
  className,
  isLoading = false,
}: FeaturedProjectsProps = {}) {
  // Use provided projects or fallback data
  const displayProjects = projects || FEATURED_PROJECTS_CONFIG.fallbackProjects;

  /**
   * Render loading skeleton
   */
  const renderLoadingSkeleton = () => (
    <div className={cn(FEATURED_PROJECTS_CONFIG.containerClasses, className)}>
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="h-48 w-full animate-pulse rounded-lg bg-gray-200"
          aria-label={`Loading project ${index + 1}`}
        />
      ))}
    </div>
  );

  /**
   * Render individual project card
   */
  const renderProjectCard = (project: ProjectData, index: number) => (
    <MotionFeatureCard
      key={index}
      title={project.name}
      content={documentToPlainTextString(project.description.json)}
      footer={project.footer}
      bgColor={project.bgColor}
      textColor={project.textColor}
      imgBorder={project.imgBorder}
      variants={featureCardVariants}
      link={project.link}
      {...featureCardScrollProps}
      transition={{
        ...featureCardVariants.visible.transition,
        delay: index * 0.1, // Stagger the animations
      }}
    />
  );

  /**
   * Render empty state
   */
  const renderEmptyState = () => (
    <div className={cn(FEATURED_PROJECTS_CONFIG.containerClasses, className)}>
      <div className="flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-lg text-gray-500">No featured projects available</p>
      </div>
    </div>
  );

  // Handle loading state
  if (isLoading) {
    return renderLoadingSkeleton();
  }

  // Handle empty state
  if (!displayProjects.length) {
    return renderEmptyState();
  }

  return (
    <section
      className={cn(FEATURED_PROJECTS_CONFIG.containerClasses, className)}
      aria-labelledby="featured-projects-heading"
    >
      {/* Screen reader heading - you might want to make this visible */}
      <h2 id="featured-projects-heading" className="sr-only">
        Featured Projects
      </h2>

      {displayProjects.map((project, index) =>
        renderProjectCard(project, index),
      )}
    </section>
  );
}
