/**
 * Type definitions for UI components
 *
 * This file contains type definitions for all UI components,
 * including button variants, form components, and layout components.
 */
import { ComponentPropsWithoutRef } from "./index";

/**
 * Button component props
 */
export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

/**
 * Card component props
 */
export interface CardProps extends ComponentPropsWithoutRef<"div"> {
  title: string;
  subtitle?: string;
  description?: string;
  bgColor?: string;
  textColor?: string;
}

/**
 * Feature card specific props
 */
export interface FeatureCardProps extends CardProps {
  content: string;
  footer?: string;
  imgBorder?: string;
}

/**
 * Tilt card specific props
 */
export interface TiltCardProps extends CardProps {
  footer: string;
}

/**
 * Navigation menu props
 */
export interface NavItem {
  name: string;
  link: string;
  content?: NavItem[];
}

/**
 * Form component props
 */
export interface FormFieldProps {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
  error?: string;
}

/**
 * Modal component props
 */
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  showCloseButton?: boolean;
}

/**
 * Loading state props
 */
export interface LoadingProps {
  variant?: "spinner" | "skeleton" | "dots";
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Animation props for motion components
 */
export interface AnimationProps {
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
  variants?: any;
  viewport?: any;
  whileHover?: any;
  whileTap?: any;
}

/**
 * Carousel component props
 */
export interface CarouselProps {
  items: any[];
  autoplay?: boolean;
  interval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
}

/**
 * Image highlight component props
 */
export interface ImageHighlightProps extends ComponentPropsWithoutRef<"img"> {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Header component props
 */
export interface HeaderProps {
  title: string;
  children?: React.ReactNode;
}

/**
 * Container component props
 */
export interface ContainerProps extends ComponentPropsWithoutRef<"section"> {
  children: React.ReactNode;
  className?: string;
}
