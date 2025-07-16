import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Link from "next/link";

/**
 * Configuration for ActionButtons component
 */
const ACTION_BUTTONS_CONFIG = {
  // Container styling
  containerClasses: "flex flex-row gap-5 pb-10",

  // Default button styling
  buttonClasses:
    "h-12 rounded-sm text-2xl font-medium text-white hover:scale-105 transition-transform duration-200",

  // Animation variants for container
  containerVariants: {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.4,
      },
    },
  },

  // Animation variants for individual buttons
  buttonVariants: {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 200,
      },
    },
  },

  // Viewport settings
  viewport: {
    amount: 0.3,
    once: true,
  },

  // Default actions for homepage
  defaultActions: [
    {
      id: "chapters",
      label: "See all chapters",
      href: "/chapters",
      variant: "primary" as const,
      bgColor: "bg-brand-blue",
    },
    {
      id: "apply",
      label: "Propose a nonprofit project",
      href: "/apply/nonprofits",
      variant: "secondary" as const,
      bgColor: "bg-brand-green",
    },
  ],
} as const;

/**
 * Action button configuration
 */
export interface ActionButton {
  /** Unique identifier for the button */
  id: string;
  /** Text to display on the button */
  label: string;
  /** URL to navigate to (internal or external) */
  href: string;
  /** Visual variant of the button */
  variant?: "primary" | "secondary" | "outline" | "ghost";
  /** Background color class (overrides variant) */
  bgColor?: string;
  /** Text color class */
  textColor?: string;
  /** Custom CSS classes */
  className?: string;
  /** Click handler (optional, for tracking/analytics) */
  onClick?: () => void;
  /** Whether the link opens in a new tab */
  external?: boolean;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Icon component to display (optional) */
  icon?: React.ComponentType<{ className?: string }>;
}

/**
 * Props for ActionButtons component
 */
export interface ActionButtonsProps {
  /** Array of actions to display */
  actions?: Readonly<ActionButton[]>;
  /** Additional CSS classes for container */
  className?: string;
  /** Layout direction */
  direction?: "row" | "column";
  /** Whether to animate on scroll */
  animated?: boolean;
  /** Alignment of buttons */
  alignment?: "start" | "center" | "end" | "between" | "around";
  /** Size variant for buttons */
  size?: "small" | "medium" | "large";
  /** Whether to show loading state */
  isLoading?: boolean;
}

/**
 * Get button styling based on variant and custom colors
 */
function getButtonStyling(
  action: ActionButton,
  size: ActionButtonsProps["size"] = "medium",
) {
  const sizeClasses = {
    small: "h-10 text-lg",
    medium: "h-12 text-2xl",
    large: "h-14 text-3xl",
  };

  const baseClasses = cn(
    sizeClasses[size],
    "inline-flex items-center justify-center rounded-sm font-medium text-white hover:scale-105 transition-transform hover:bg-brand-black duration-200 px-6 py-3 no-underline",
    action.className,
  );

  // Handle disabled state
  if (action.disabled) {
    return cn(baseClasses, "opacity-50 cursor-not-allowed pointer-events-none");
  }

  // Use custom background color if provided
  if (action.bgColor) {
    return cn(baseClasses, action.bgColor, action.textColor);
  }

  // Use variant-based styling
  const variantClasses = {
    primary: "bg-brand-blue",
    secondary: "bg-brand-green",
    outline:
      "border-2 border-brand-blue text-brand-blue bg-transparent hover:bg-brand-blue hover:text-white",
    ghost: "text-brand-blue bg-transparent hover:bg-brand-blue/10",
  };

  return cn(baseClasses, variantClasses[action.variant || "primary"]);
}

/**
 * Get container alignment classes
 */
function getAlignmentClasses(
  direction: ActionButtonsProps["direction"] = "row",
  alignment: ActionButtonsProps["alignment"] = "start",
) {
  const directionClass = direction === "row" ? "flex-row" : "flex-col";

  const alignmentClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
  };

  return cn("flex gap-5", directionClass, alignmentClasses[alignment]);
}

/**
 * Render individual action button
 */
function ActionButtonItem({
  action,
  size,
  animated = false,
}: {
  action: ActionButton;
  size: ActionButtonsProps["size"];
  animated: boolean;
}) {
  const buttonStyling = getButtonStyling(action, size);

  const ButtonComponent = animated ? motion.div : "div";
  const buttonProps = animated
    ? {
        variants: ACTION_BUTTONS_CONFIG.buttonVariants,
      }
    : {};

  const handleClick = (e: React.MouseEvent) => {
    if (action.disabled) {
      e.preventDefault();
      return;
    }
    action.onClick?.();
  };

  // Render button content
  const buttonContent = (
    <>
      {action.icon && <action.icon className="mr-2 h-6 w-6" />}
      {action.label}
    </>
  );

  return (
    <ButtonComponent {...buttonProps}>
      {action.external ? (
        <a
          href={action.href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonStyling}
          onClick={handleClick}
          aria-label={`${action.label} (opens in new tab)`}
          aria-disabled={action.disabled}
        >
          {buttonContent}
        </a>
      ) : (
        <Link
          href={action.href}
          className={buttonStyling}
          onClick={handleClick}
          aria-disabled={action.disabled}
        >
          {buttonContent}
        </Link>
      )}
    </ButtonComponent>
  );
}

/**
 * ActionButtons component for displaying call-to-action buttons
 *
 * Features:
 * - Flexible configuration with custom actions
 * - Multiple layout options (row/column, alignment)
 * - Scroll-triggered animations
 * - Support for internal and external links
 * - Loading states and disabled states
 * - Accessible button semantics
 * - Size variants and custom styling
 *
 * @example
 * ```tsx
 * // Basic usage with default actions
 * <ActionButtons />
 *
 * // Custom actions
 * <ActionButtons
 *   actions={[
 *     {
 *       id: "contact",
 *       label: "Contact Us",
 *       href: "/contact",
 *       variant: "primary"
 *     },
 *     {
 *       id: "learn",
 *       label: "Learn More",
 *       href: "/about",
 *       variant: "secondary"
 *     }
 *   ]}
 *   alignment="center"
 *   animated
 * />
 *
 * // Column layout with custom styling
 * <ActionButtons
 *   direction="column"
 *   size="large"
 *   className="items-stretch"
 * />
 * ```
 */
export default function ActionButtons({
  actions = ACTION_BUTTONS_CONFIG.defaultActions,
  className,
  direction = "row",
  animated = true,
  alignment = "start",
  size = "medium",
  isLoading = false,
}: ActionButtonsProps) {
  const containerClasses = cn(
    getAlignmentClasses(direction, alignment),
    "pb-10",
    className,
  );

  /**
   * Render loading skeleton
   */
  const renderLoadingSkeleton = () => (
    <div className={containerClasses}>
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="h-12 w-48 animate-pulse rounded-sm bg-gray-200"
          aria-label={`Loading button ${index + 1}`}
        />
      ))}
    </div>
  );

  /**
   * Render static buttons (no animation)
   */
  const renderStaticButtons = () => (
    <div className={containerClasses}>
      {actions.map((action) => (
        <ActionButtonItem
          key={action.id}
          action={action}
          size={size}
          animated={false}
        />
      ))}
    </div>
  );

  /**
   * Render animated buttons
   */
  const renderAnimatedButtons = () => (
    <motion.div
      className={containerClasses}
      variants={ACTION_BUTTONS_CONFIG.containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={ACTION_BUTTONS_CONFIG.viewport}
    >
      {actions.map((action) => (
        <ActionButtonItem
          key={action.id}
          action={action}
          size={size}
          animated={true}
        />
      ))}
    </motion.div>
  );

  // Handle loading state
  if (isLoading) {
    return renderLoadingSkeleton();
  }

  // Handle empty state
  if (!actions.length) {
    return (
      <div className={containerClasses}>
        <p className="text-gray-500">No actions available</p>
      </div>
    );
  }

  // Render based on animation preference
  return animated ? renderAnimatedButtons() : renderStaticButtons();
}

/**
 * Export action configuration for external use
 */
export const defaultHomeActions = ACTION_BUTTONS_CONFIG.defaultActions;
