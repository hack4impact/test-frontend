"use client";

import { mobileNavItems, navItems } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import {
  Transition,
  Variants,
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
      filter: "drop-shadow(0px 0px 0px rgba(0,0,0,0))",
    },
    compact: {
      height: "60px",
      width: "80vw",
      marginTop: "2vh",
      borderRadius: "5px",
      backgroundColor: "var(--color-brand-blue)",
      filter: "drop-shadow(0px 4px 4px rgba(51,51,51,0.31))",
    },
  },

  // Transition configuration
  navTransition: {
    duration: 0.3,
    type: "spring" as const,
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
   * Switches to compact mode after scrolling 50px down the page
   */
  useMotionValueEvent(scrollY, "change", () => {
    const isScrolled = scrollY.get() > 50;
    setScrollState(isScrolled ? "compact" : "expanded");
  });

  /**
   * Generate CSS classes for navigation items
   * Different styles for expanded vs compact states
   */
  const getNavItemClasses = (isDropdown: boolean): string => {
    const baseClasses =
      "inline-flex h-full w-max items-center justify-center rounded-xs bg-transparent px-2 py-2 text-xl font-medium disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 relative";

    if (isCompact) {
      return cn(
        baseClasses,
        isDropdown
          ? "hover:bg-transparent hover:text-brand-black focus:bg-white focus:text-brand-black data-[state=open]:bg-transparent data-[state=open]:text-brand-black"
          : "hover:bg-transparent hover:text-brand-black focus:bg-transparent focus:text-brand-black",
      );
    }

    return cn(
      baseClasses,
      isDropdown
        ? "hover:bg-transparent hover:text-white focus:bg-brand-blue focus:text-white data-[state=open]:bg-transparent data-[state=open]:text-white"
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
   * Get classes for active navigation items for mobile navigation
   * Highlights current page with underline and brand colors
   */
  const getActiveMobileNavClasses = (links: string[]): string => {
    const baseActiveClasses = "underline-offset-5 decoration-2 underline";

    if (links.includes(pathname)) {
      return cn(baseActiveClasses, "text-brand-red");
    }

    return cn("text-white");
  };

  /**
   * Check if item should show hover effect
   */
  const shouldShowHover = (index: number): boolean => {
    const item = navItems[index];
    const itemValue = `item-${index}`;

    return (
      hoveredIndex === index ||
      Boolean(item.content && activeDropdown === itemValue)
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
        layoutId="navHovered"
        className={cn(
          "absolute inset-0 -z-1 rounded-sm",
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
        layoutId="subHovered"
        className="absolute inset-0 z-[-1] rounded-sm bg-brand-green"
        initial={false}
        transition={ANIMATION_CONFIG.hoverTransition}
      />
    );
  };

  /**
   * Return logo component based on version and color
   */
  const getLogo = (
    version: "full" | "hack" | "h4i" | "logomark",
    color: "color" | "white" | "black",
  ) => {
    const logoMap: Record<string, string | undefined> = {
      "full-color": "/hack4impact_logo.svg",
      "h4i-color": "/h4i_logo.svg",
      "h4i-white": "/h4i_logo_white.svg",
      "logomark-color": "/logomark.svg",
      "logomark-white": "/logomark_white.svg",
    };

    const logoSrc = logoMap[`${version}-${color}`];

    if (!logoSrc) return null;

    return (
      <img
        alt="Hack for Impact Logo"
        src={logoSrc}
        className="flex h-10 min-h-5 flex-none"
      />
    );
  };

  /**
   * Render the logo with appropriate size & version for current state
   */
  const renderLogo = () => {
    const logoColor = isCompact ? "white" : "color";

    return (
      <Link
        href="/"
        className="h-full flex-auto justify-start items-center flex"
      >
        {/* Desktop */}
        <div className="hidden lg:flex lg:flex-none">
          {getLogo(isCompact ? "h4i" : "full", logoColor)}
        </div>
        {/* Tablet */}
        <div className="hidden md:flex md:flex-none lg:hidden">
          {getLogo(isCompact ? "logomark" : "h4i", logoColor)}
        </div>
        {/* Mobile */}
        <div className="flex flex-none md:hidden">
          {getLogo("logomark", logoColor)}
        </div>
      </Link>
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
              <div className="relative z-50">
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

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const mobileHeaderVariants = {
    open: {
      height: "100%",
      transition: {
        when: "beforeChildren",
        duration: 0.05,
      },
    },
    closed: {
      height: "80px",
      transition: {
        when: "afterChildren",
        delay: 0.8,
        duration: 0.05,
      },
    },
  };

  const mobileNavVariants = {
    open: {
      opacity: 1,
      borderRadius: "0px",
      height: "100%",
      width: "100%",
      marginTop: "0px",
      marginRight: "0px",
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05,
        duration: 0.15,
      },
    },
    closed: {
      opacity: 1,
      borderRadius: "8px",
      height: "40px",
      width: "80px",
      marginTop: "20px",
      marginRight: "40px",
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        duration: 0.15,
      },
    },
  };

  const mobileNavItemVariants = {
    open: {
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
    closed: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
  };

  const openCloseVariants: Variants = {
    open: {
      rotate: 45,
    },
    closed: { rotate: 0 },
  };

  const renderIcon = () => {
    return (
      <motion.svg
        variants={openCloseVariants}
        className="w-5 h-5 text-white scale-200"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        transition={{ duration: 0.2 }}
      >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </motion.svg>
    );
  };

  return (
    <>
      {/* Mobile navigation */}
      <motion.header
        variants={mobileHeaderVariants}
        animate={isMobileNavOpen ? "open" : "closed"}
        className={cn(
          " w-[100vw] mt-0 rounded-none justify-end items-center sm:hidden flex z-50 fixed top-0 left-1/2 -translate-x-1/2 flex-col",
        )}
      >
        <motion.button
          className="z-55 absolute mt-5 mr-10 w-20 h-10 rounded-lg top-0 right-0 flex justify-center items-center"
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
        >
          {renderIcon()}
        </motion.button>

        <motion.ul
          initial={false}
          variants={mobileNavVariants}
          animate={isMobileNavOpen ? "open" : "closed"}
          className="z-50 gap-10 absolute top-0 right-0 flex bg-brand-blue justify-center items-center flex-col w-full h-full"
        >
          <motion.li
            initial={false}
            variants={mobileNavItemVariants}
            className="flex w-full justify-center items-center"
          >
            <Link
              href="/"
              onClick={() => setIsMobileNavOpen(false)}
              className="flex"
            >
              <motion.div>{getLogo("logomark", "white")}</motion.div>
            </Link>
          </motion.li>
          {mobileNavItems.map((item, index) => {
            return (
              <motion.li
                initial={false}
                variants={mobileNavItemVariants}
                key={index}
                className={cn(
                  "text-5xl text-white font-bold w-full flex justify-center items-center",
                  getActiveMobileNavClasses([item.link]),
                )}
              >
                <Link
                  href={item.link}
                  onClick={() => setIsMobileNavOpen(false)}
                  className="flex"
                >
                  {item.name}
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </motion.header>

      {/* Website navigation */}
      <motion.header
        variants={ANIMATION_CONFIG.navVariants}
        animate={scrollState}
        transition={ANIMATION_CONFIG.navTransition}
        className="hidden sm:flex z-50 fixed top-0 left-1/2 w-screen -translate-x-1/2  flex-row px-10 backdrop-blur-[1px]"
      >
        {/* Logo Section */}
        {renderLogo()}

        {/* Spacer */}
        <div
          className={cn(
            "h-full",
            isCompact ? "w-1/6 flex-none" : "w-1/6 md:flex-auto lg:flex-auto",
          )}
        />

        {/* Navigation Menu */}
        <div className="flex h-full flex-auto justify-end">
          <NavigationMenu
            value={activeDropdown || undefined}
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
    </>
  );
}
