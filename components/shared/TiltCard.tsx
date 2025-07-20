"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MotionProps, motion, useMotionValue, useSpring } from "motion/react";
import { MouseEvent, useRef } from "react";

/**
 * Configuration for TiltCard component
 */
const TILT_CARD_CONFIG = {
  // Animation settings
  animation: {
    tiltRange: 5, // degrees of tilt
    scale: {
      hover: 1.03,
      tap: 0.99,
    },
    perspective: 1000,
    spring: {
      stiffness: 150,
      damping: 15,
    },
  },

  // Default styling
  defaults: {
    textColor: "text-white",
    hoverColor: "var(--color-brand-black)",
  },

  // Typography
  typography: {
    title: "text-[35px]",
    content: "text-[20px]",
    footer: "text-[30px]",
  },
} as const;

/**
 * Props for the TiltCard component
 */
export interface TiltCardProps {
  /** Card title */
  title: string;
  /** Main content text */
  content: string;
  /** Footer text */
  footer: string;
  /** Background color (CSS custom property or class) */
  bgColor: string;
  /** Text color class */
  textColor?: string;
  /** Additional CSS classes */
  className?: string;
  /** Ref for the component */
  ref?: React.Ref<HTMLDivElement>;
}

/**
 * Props that combine TiltCard props with motion props
 */
export interface MotionTiltCardProps
  extends TiltCardProps,
    Omit<MotionProps, keyof TiltCardProps> {}

/**
 * Calculate tilt values based on mouse position
 */
function calculateTilt(
  event: MouseEvent<HTMLDivElement>,
  element: HTMLDivElement,
  tiltRange: number,
) {
  const rect = element.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const xPercent = x / rect.width;
  const yPercent = y / rect.height;

  // Calculate rotation (inverted for natural feel)
  const xRotation = (0.5 - xPercent) * tiltRange;
  const yRotation = (yPercent - 0.5) * tiltRange;

  return { xRotation, yRotation };
}

/**
 * 3D tilt card component with smooth mouse-following animations
 *
 * Features:
 * - 3D tilt effect following mouse movement
 * - Smooth spring-based animations
 * - Hover state with color transitions
 * - Configurable tilt sensitivity
 * - Accessible structure
 *
 * @example
 * ```tsx
 * <TiltCard
 *   title="Chapter Network"
 *   content="We help new chapters..."
 *   footer="Our Chapters"
 *   bgColor="var(--color-brand-blue)"
 * />
 * ```
 */
function TiltCard({
  title,
  content,
  footer,
  bgColor,
  textColor = TILT_CARD_CONFIG.defaults.textColor,
  className,
  ref,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for smooth tilt animations
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Spring animations for smooth movement
  const springRotateX = useSpring(rotateX, TILT_CARD_CONFIG.animation.spring);
  const springRotateY = useSpring(rotateY, TILT_CARD_CONFIG.animation.spring);

  /**
   * Handle mouse movement for tilt effect
   */
  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const element = cardRef.current;
    if (!element) return;

    const { xRotation, yRotation } = calculateTilt(
      event,
      element,
      TILT_CARD_CONFIG.animation.tiltRange,
    );

    rotateX.set(yRotation);
    rotateY.set(xRotation);
  };

  /**
   * Reset tilt when mouse leaves
   */
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn("w-1/3", className)}
      style={{
        perspective: TILT_CARD_CONFIG.animation.perspective,
      }}
      whileHover={{ scale: TILT_CARD_CONFIG.animation.scale.hover }}
      whileTap={{ scale: TILT_CARD_CONFIG.animation.scale.tap }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          background: bgColor,
        }}
        whileHover={{
          background: TILT_CARD_CONFIG.defaults.hoverColor,
        }}
        className="h-full rounded-md border-none cursor-pointer"
      >
        <Card
          className={cn(
            "flex h-full border-none bg-transparent shadow-none flex-col",
            textColor,
          )}
        >
          <CardHeader className="h-1/5">
            <CardTitle
              className={cn(
                "h-full font-semibold",
                TILT_CARD_CONFIG.typography.title,
              )}
            >
              {title}
            </CardTitle>
          </CardHeader>

          <CardContent
            className={cn("mt-5 h-3/5", TILT_CARD_CONFIG.typography.content)}
          >
            {content}
          </CardContent>

          <CardFooter
            className={cn(
              "mt-10 h-min leading-none font-semibold items-end",
              TILT_CARD_CONFIG.typography.footer,
            )}
          >
            {footer}
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}

/**
 * Motion-enhanced TiltCard with full motion props support
 *
 * This component combines the base TiltCard with additional motion capabilities
 * for scroll animations and other motion effects.
 */
function MotionTiltCard({
  title,
  content,
  footer,
  bgColor,
  textColor,
  className,
  ref,
  ...motionProps
}: MotionTiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for tilt animations
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Spring animations
  const springRotateX = useSpring(rotateX, TILT_CARD_CONFIG.animation.spring);
  const springRotateY = useSpring(rotateY, TILT_CARD_CONFIG.animation.spring);

  /**
   * Handle mouse movement for tilt effect
   */
  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const element = cardRef.current;
    if (!element) return;

    const { xRotation, yRotation } = calculateTilt(
      event,
      element,
      TILT_CARD_CONFIG.animation.tiltRange,
    );

    rotateX.set(yRotation);
    rotateY.set(xRotation);
  };

  /**
   * Reset tilt when mouse leaves
   */
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn("w-full", className)}
      style={{
        perspective: TILT_CARD_CONFIG.animation.perspective,
      }}
      whileHover={{ scale: TILT_CARD_CONFIG.animation.scale.hover }}
      whileTap={{ scale: TILT_CARD_CONFIG.animation.scale.tap }}
      {...motionProps}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          background: bgColor,
        }}
        whileHover={{
          background: TILT_CARD_CONFIG.defaults.hoverColor,
        }}
        className="h-full rounded-md border-none cursor-pointer"
      >
        <Card
          className={cn(
            "flex h-full border-none bg-transparent shadow-none flex-col",
            textColor || TILT_CARD_CONFIG.defaults.textColor,
          )}
        >
          <CardHeader className="h-1/5">
            <CardTitle
              className={cn(
                "h-full font-semibold",
                TILT_CARD_CONFIG.typography.title,
              )}
            >
              {title}
            </CardTitle>
          </CardHeader>

          <CardContent
            className={cn("mt-5 h-3/5", TILT_CARD_CONFIG.typography.content)}
          >
            {content}
          </CardContent>

          <CardFooter
            className={cn(
              "mt-10 h-min leading-none font-semibold items-end",
              TILT_CARD_CONFIG.typography.footer,
            )}
          >
            {footer}
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}

TiltCard.displayName = "TiltCard";
MotionTiltCard.displayName = "MotionTiltCard";

export { TiltCard, MotionTiltCard };
