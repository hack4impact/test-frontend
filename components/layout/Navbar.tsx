"use client";

import { navItems } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import {
  Transition,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

/**
 * Possible states for the navbar based on scroll position
 */
type ScrollState = "expanded" | "compact";

/**
 * Animation configuration for navbar state transitions
 */
const ANIMATION_CONFIG = {
  // Navbar state variants
  navVariants: {
    expanded: {
      height: "80px",
      width: "100vw",
      marginTop: "0vh",
      borderRadius: "0px",
      backgroundColor: "transparent",
      filter: "drop-shadow(0px 0px 0px)",
    },
    compact: {
      height: "60px",
      width: "80vw",
      marginTop: "2vh",
      borderRadius: "5px",
      backgroundColor: "var(--color-brand-blue)",
      filter: "drop-shadow(0px 4px 4px #33333350)",
    },
  },

  // Transition configuration
  navTransition: {
    duration: 0.3,
    type: "spring" as const,
    filter: { type: false },
  } as Transition,

  // Hover effect transition
  hoverTransition: {
    type: "spring",
    stiffness: 500,
    damping: 30,
    mass: 1,
  } as Transition,
} as const;

/**
 * Responsive navigation bar that adapts based on scroll position
 *
 * Features:
 * - Scroll-based state changes (expanded/compact)
 * - Dropdown menu support
 * - Hover animations
 * - Active link highlighting
 * - Logo that changes based on state
 */
export default function Navbar() {
  // State management
  const [scrollState, setScrollState] = useState<ScrollState>("expanded");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredSubIndex, setHoveredSubIndex] = useState<number | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Hooks for navigation and scroll tracking
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // Derived state
  const isCompact = scrollState === "compact";

  /**
   * Reset navbar state when route changes
   */
  useEffect(() => {
    setScrollState("expanded");
    setHoveredIndex(null);
    setHoveredSubIndex(null);
    setActiveDropdown(null);
  }, [pathname]);

  /**
   * Handle scroll position changes
   * Switches to compact mode after scrolling 50px of the page
   */
  useMotionValueEvent(scrollY, "change", () => {
    const isScrolled = scrollY.get() > 50; // Use pixels instead of percentage
    setScrollState(isScrolled ? "compact" : "expanded");
  });

  /**
   * Generate CSS classes for navigation items
   * Different styles for expanded vs compact states
   */
  const getNavItemClasses = (isDropdown: boolean, logo?: boolean): string => {
    const baseClasses =
      "inline-flex h-full w-max items-center justify-center rounded-xs bg-transparent px-2 py-2 text-xl font-medium disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 relative";

    if (logo) return baseClasses;

    if (isCompact) {
      return cn(
        baseClasses,
        isDropdown
          ? "hover:bg-transparent hover:text-brand-black focus:bg-white focus:text-brand-black data-[state=open]:bg-transparent data-[state=open]:text-brand-black data-[state=open]:hover:bg-transparent data-[state=open]:hover:text-brand-black data-[state=open]:focus:bg-transparent data-[state=open]:focus:text-brand-black"
          : "hover:bg-transparent hover:text-brand-black focus:bg-transparent focus:text-brand-black",
      );
    }

    return cn(
      baseClasses,
      isDropdown
        ? "hover:bg-transparent hover:text-white focus:bg-brand-blue focus:text-white data-[state=open]:bg-transparent data-[state=open]:text-white data-[state=open]:hover:bg-transparent data-[state=open]:hover:text-white data-[state=open]:focus:bg-transparent data-[state=open]:focus:text-white"
        : "hover:bg-transparent hover:text-white focus:bg-transparent focus:text-white",
    );
  };

  /**
   * Get classes for active navigation items
   * Highlights current page with underline and brand colors
   */
  const getActiveNavClasses = (links: string[]): string => {
    const baseActiveClasses = "underline-offset-5 decoration-2 underline";

    if (links.includes(pathname)) {
      return cn(
        baseActiveClasses,
        isCompact ? "text-brand-blue-light" : "text-brand-blue",
      );
    }

    return cn(isCompact ? "text-white" : "text-brand-black");
  };

  /**
   * Check if item should show hover effect
   */
  const shouldShowHover = (index: number): boolean | undefined => {
    const item = navItems[index];
    const itemValue = `item-${index}`;

    return (
      hoveredIndex === index || (item.content && activeDropdown === itemValue)
    );
  };

  /**
   * Check if sub-item should show hover effect
   */
  const shouldShowSubHover = (subIndex: number): boolean => {
    return hoveredSubIndex === subIndex;
  };

  /**
   * Render animated hover effect overlay for main nav items
   */
  const renderHoverEffect = (index: number) => {
    if (!shouldShowHover(index)) return null;

    return (
      <motion.div
        layoutId="subHovered"
        className={cn(
          "absolute inset-0 z-[-1] rounded-sm",
          isCompact ? "bg-white" : "bg-brand-blue",
        )}
        initial={false}
        transition={ANIMATION_CONFIG.hoverTransition}
      />
    );
  };

  /**
   * Render animated hover effect overlay for dropdown sub-items
   */
  const renderSubHoverEffect = (subIndex: number) => {
    if (!shouldShowSubHover(subIndex)) return null;

    return (
      <motion.div
        layoutId="hovered"
        className="absolute inset-0 z-[-1] rounded-sm bg-brand-green"
        initial={false}
        transition={ANIMATION_CONFIG.hoverTransition}
      />
    );
  };

  /**
   * Render navigation item with dropdown menu
   */
  const renderDropdownItem = (item: NavItem, index: number) => {
    if (!item.content) return null;

    const itemValue = `item-${index}`;
    const subItemLinks = item.content.map((subItem) => subItem.link);

    return (
      <NavigationMenuItem key={index} className="relative" value={itemValue}>
        <NavigationMenuTrigger
          onMouseEnter={() => setHoveredIndex(index)}
          className={cn(
            getNavItemClasses(true),
            getActiveNavClasses(subItemLinks),
          )}
        >
          {item.name}
        </NavigationMenuTrigger>

        <NavigationMenuContent
          className="min-w-[200px]"
          onMouseLeave={() => setHoveredSubIndex(null)}
        >
          {item.content.map((subItem: NavItem, subIndex) => (
            <NavigationMenuItem asChild key={subIndex}>
              <div className="z-55">
                <NavigationMenuLink
                  href={subItem.link}
                  onMouseEnter={() => setHoveredSubIndex(subIndex)}
                  className="text-xl block p-3 hover:bg-transparent hover:text-white"
                >
                  {subItem.name}
                </NavigationMenuLink>
                {renderSubHoverEffect(subIndex)}
              </div>
            </NavigationMenuItem>
          ))}
        </NavigationMenuContent>

        {renderHoverEffect(index)}
      </NavigationMenuItem>
    );
  };

  /**
   * Render simple navigation item (no dropdown)
   */
  const renderSimpleItem = (item: NavItem, index: number) => (
    <NavigationMenuItem key={index} className="relative">
      <NavigationMenuLink
        href={item.link}
        onMouseEnter={() => setHoveredIndex(index)}
        className={cn(
          getNavItemClasses(false),
          getActiveNavClasses([item.link]),
        )}
      >
        {item.name}
      </NavigationMenuLink>
      {renderHoverEffect(index)}
    </NavigationMenuItem>
  );

  /**
   * Render the logo with appropriate size & version for current state
   */
  const renderLogo = () => (
    <Link
      href="/"
      className={cn("h-full flex-auto justify-start items-center flex")}
    >
      <div
        className={cn(
          " flex h-10 min-h-5 lg:hidden text-start",
          getNavItemClasses(false, true),
          getActiveNavClasses(["/"]),
        )}
      >
        Hack4Impact
      </div>
      <motion.img
        alt="Hack for Impact Logo"
        src={isCompact ? "/h4i.svg" : "/logo.svg"}
        className={cn("hidden lg:flex h-10 min-h-5 flex-none")}
      />
    </Link>
  );

  return (
    <motion.header
      variants={ANIMATION_CONFIG.navVariants}
      animate={scrollState}
      transition={ANIMATION_CONFIG.navTransition}
      className={cn(
        "z-50 fixed top-0 left-1/2 flex w-screen -translate-x-1/2 transform flex-row px-10 backdrop-blur-[1px]",
      )}
    >
      {/* Logo Section */}
      {renderLogo()}

      {/* Spacer */}
      <div
        className={cn(
          "h-full w-1 lg:flex-auto flex-none ",
          isCompact ? "md:w-2 hidden md:flex" : "md:w-1/6 flex",
        )}
      />

      {/* Navigation Menu */}
      <div className="flex h-full flex-auto">
        <NavigationMenu
          value={activeDropdown!}
          onValueChange={setActiveDropdown}
          viewport={false}
          className="flex h-full w-full max-w-none justify-end"
        >
          <NavigationMenuList
            className={cn(isCompact ? "gap-1" : "gap-1 md:gap-2 lg:gap-1")}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {navItems.map((item, index) =>
              item.content
                ? renderDropdownItem(item, index)
                : renderSimpleItem(item, index),
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </motion.header>
  );
}
