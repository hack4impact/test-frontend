"use client";

import { navItems } from "@/data/HomeData";
import { cn } from "@/lib/utils";
import {
  Transition,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useState } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

type ScrollState = "expanded" | "compact";

// Animation variants for navbar states
const navVariants = {
  expanded: {
    height: "80px",
    width: "100vw",
    marginTop: "0vh",
    borderRadius: "0px",
    backgroundColor: "#FFFFFF00",
    filter: "drop-shadow(0px 0px 0px)",
  },
  compact: {
    height: "60px",
    width: "80vw",
    marginTop: "2vh",
    borderRadius: "5px",
    backgroundColor: "#0085FF",
    filter: "drop-shadow(0px 4px 4px #00000050)",
  },
};

// Transition configuration
const navTransition: Transition = {
  duration: 0.3,
  type: "spring" as const,
  filter: { type: false },
};

export default function Navbar() {
  const [scrollState, setScrollState] = useState<ScrollState>("expanded");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();

  // Handle scroll state changes
  useMotionValueEvent(scrollYProgress, "change", () => {
    const isScrolled = scrollYProgress.get() > 0.05;
    setScrollState(isScrolled ? "compact" : "expanded");
  });

  const isCompact = scrollState === "compact";

  // Handle mouse leave for the entire navigation container
  const handleContainerMouseLeave = () => {
    setHoveredIndex(null);
  };

  // Handle mouse enter with slight delay to prevent flickering
  const handleItemMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  // Generate CSS classes for navigation items
  const getNavItemClasses = (isDropdown: boolean) => {
    const baseClasses = "flex text-xl";

    if (isCompact) {
      return isDropdown
        ? `${baseClasses} bg-transparent text-white hover:bg-transparent hover:text-black data-[state=open]:bg-transparent data-[state=open]:text-black data-[state=open]:hover:bg-transparent data-[state=open]:hover:text-black`
        : `${baseClasses} text-white hover:bg-transparent`;
    }

    return isDropdown
      ? baseClasses
      : `${baseClasses} hover:text-white focus:bg-[#0085FF] focus:text-white hover:bg-transparent`;
  };

  // Render navigation menu item with dropdown
  const renderDropdownItem = (item: any, index: number) => (
    <NavigationMenuItem key={index} className="relative">
      <NavigationMenuTrigger
        onMouseEnter={() => handleItemMouseEnter(index)}
        className={getNavItemClasses(true)}
      >
        {item.name}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        {item.content.map((subItem: any, subIndex: number) => (
          <NavigationMenuItem asChild key={subIndex}>
            <NavigationMenuLink className="text-xl">
              {subItem.name}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuContent>
      {renderHoverEffect(index)}
    </NavigationMenuItem>
  );

  // Render simple navigation menu item
  const renderSimpleItem = (item: any, index: number) => (
    <NavigationMenuItem key={index} className="relative">
      <NavigationMenuLink
        onMouseEnter={() => handleItemMouseEnter(index)}
        className={getNavItemClasses(false)}
      >
        {item.name}
      </NavigationMenuLink>
      {renderHoverEffect(index)}
    </NavigationMenuItem>
  );

  // Render hover effect overlay
  const renderHoverEffect = (index: number) => {
    if (hoveredIndex !== index) return null;

    return (
      <motion.div
        layoutId="hovered"
        className={cn(
          "absolute inset-0 z-[-1] rounded-md",
          isCompact ? "bg-white" : "bg-[#0085FF]",
        )}
        initial={false}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          mass: 1,
        }}
      />
    );
  };

  return (
    <motion.header
      variants={navVariants}
      animate={scrollState}
      transition={navTransition}
      className={cn(
        "z-15 fixed top-0 left-1/2 flex w-screen -translate-x-1/2 transform flex-row px-10 bg-white/50 backdrop-blur-[1px]",
      )}
    >
      {/* Logo Section */}
      <motion.div className="h-full flex-auto content-center">
        <motion.img
          alt="Hack for Impact Logo"
          src={isCompact ? "/h4i.svg" : "/logo.svg"}
          className="h-10 min-h-5 flex-none"
        />
      </motion.div>

      {/* Spacer */}
      <motion.div className="h-full w-1/6 flex-auto" />

      {/* Navigation Menu */}
      <motion.div className="flex h-full flex-auto">
        <NavigationMenu
          viewport={false}
          className="flex h-full w-full max-w-none justify-end"
        >
          <NavigationMenuList
            className="flex h-full w-full"
            onMouseLeave={handleContainerMouseLeave}
          >
            {navItems.map((item, index) =>
              item.content
                ? renderDropdownItem(item, index)
                : renderSimpleItem(item, index),
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </motion.div>
    </motion.header>
  );
}
