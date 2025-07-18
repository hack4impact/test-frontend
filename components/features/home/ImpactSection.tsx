import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

import { MotionTiltCard } from "../../shared/TiltCard";

/**
 * Configuration for ImpactSection component
 */
const IMPACT_SECTION_CONFIG = {
  // Container styling
  containerClasses: "my-10 flex w-full flex-row justify-between gap-5",

  // Animation variants for container
  containerVariants: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
  },

  // Animation variants for child cards
  cardVariants: {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 10,
        stiffness: 100,
        duration: 0.5,
      },
    },
  },

  // Viewport settings for animations
  viewport: {
    amount: 0.3, // Trigger when 30% visible
    once: false, // Allow multiple animations
  },

  // Default impact info (fallback data)
  fallbackData: [
    {
      title: "Chapter Network",
      content:
        "We help new chapters help their local community by providing established communication channels with veteran chapters and mentors",
      footer: "Our Chapters",
      bgColor: "var(--color-brand-blue)",
    },
    {
      title: "Nonprofit Projects",
      content:
        "We help nonprofits do the good they are meant to be doing more efficiently. By building them the custom software they need, they can focus on their important work",
      footer: "Our Projects",
      bgColor: "var(--color-brand-green)",
    },
    {
      title: "Chapter Resources",
      content:
        "Our 9 years of experience in building socially impactful technology has given our chapters and members the tools to help nonprofits",
      footer: "Our Resources",
      bgColor: "var(--color-brand-red)",
    },
  ],
} as const;

/**
 * Interface for impact data structure
 */
interface ImpactData {
  title: string;
  content: string;
  footer: string;
  bgColor: string;
  textColor?: string;
}

/**
 * Props for ImpactSection component
 */
interface ImpactSectionProps {
  /** Array of impact data to display */
  impactData?: ImpactData[];
  /** Additional CSS classes */
  className?: string;
  /** Whether to show loading state */
  isLoading?: boolean;
}

/**
 * ImpactSection component that displays impact information in tilt cards
 *
 * Features:
 * - Responsive grid of tilt cards
 * - Staggered scroll animations
 * - Loading state support
 * - Fallback content when no data provided
 * - Accessible structure with proper semantics
 *
 * @example
 * ```tsx
 * <ImpactSection impactData={customImpactData} />
 * ```
 */
export default function ImpactSection({
  impactData,
  className,
  isLoading = false,
}: ImpactSectionProps = {}) {
  // Use provided data or fallback
  const displayData = impactData || IMPACT_SECTION_CONFIG.fallbackData;

  // Refs for animation control
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  /**
   * Render loading skeleton
   */
  const renderLoadingSkeleton = () => (
    <div className={cn(IMPACT_SECTION_CONFIG.containerClasses, className)}>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="h-64 w-1/3 animate-pulse rounded-md bg-gray-200"
          aria-label={`Loading impact card ${index + 1}`}
        />
      ))}
    </div>
  );

  /**
   * Render individual impact card
   */
  const renderImpactCard = (item: ImpactData, index: number) => (
    <MotionTiltCard
      key={index}
      variants={IMPACT_SECTION_CONFIG.cardVariants}
      title={item.title}
      content={item.content}
      footer={item.footer}
      bgColor={item.bgColor}
      textColor={item.textColor || "text-white"}
      className="flex-1"
    />
  );

  /**
   * Render empty state
   */
  const renderEmptyState = () => (
    <div className={cn(IMPACT_SECTION_CONFIG.containerClasses, className)}>
      <div className="flex w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 py-12">
        <p className="text-lg text-gray-500">No impact data available</p>
      </div>
    </div>
  );

  // Handle loading state
  if (isLoading) {
    return renderLoadingSkeleton();
  }

  // Handle empty state
  if (!displayData.length) {
    return renderEmptyState();
  }

  return (
    <motion.section
      ref={containerRef}
      variants={IMPACT_SECTION_CONFIG.containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn(IMPACT_SECTION_CONFIG.containerClasses, className)}
      aria-labelledby="impact-section-heading"
    >
      {/* Screen reader heading - you might want to make this visible */}
      <h2 id="impact-section-heading" className="sr-only">
        Our Impact Areas
      </h2>

      {displayData.map((item, index) => renderImpactCard(item, index))}
    </motion.section>
  );
}
