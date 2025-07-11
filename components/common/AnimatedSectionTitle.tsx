import { cn } from "@/lib/utils";
import { motion } from "motion/react";

// Animation configuration
const sectionAnimation = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { amount: 0.5 },
  transition: {
    type: "spring",
    damping: 10,
    stiffness: 100,
    delay: 0.25,
  },
} as const;

interface AnimatedSectionTitleProps {
  className?: string;
  children: React.ReactNode;
}

// Reusable animated section title component
export const AnimatedSectionTitle = ({
  className = "font-semibold",
  children,
}: AnimatedSectionTitleProps) => (
  <motion.h1 {...sectionAnimation} className={cn(className, "text-5xl")}>
    {children}
  </motion.h1>
);
