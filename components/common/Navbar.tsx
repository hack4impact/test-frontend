"use client";

import { navItems } from "@/data/data";
import { cn } from "@/lib/utils";
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

type ScrollState = "expanded" | "compact";

// Animation variants for navbar states
const navVariants = {
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
};

// Transition configuration
const navTransition: Transition = {
  duration: 0.3,
  type: "spring" as const,
  filter: { type: false },
};

const hoverTransition: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 1,
};

export default function Navbar() {
  const [scrollState, setScrollState] = useState<ScrollState>("expanded");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredSubIndex, setHoveredSubIndex] = useState<number | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const pathname = usePathname();
  const { scrollYProgress } = useScroll();

  // Reset navbar to expanded state on route change
  useEffect(() => {
    setScrollState("expanded");
    setHoveredIndex(null);
    setHoveredSubIndex(null);
    setActiveDropdown(null);
  }, [pathname]);

  // Handle scroll state changes
  useMotionValueEvent(scrollYProgress, "change", () => {
    const isScrolled = scrollYProgress.get() > 0.05;
    setScrollState(isScrolled ? "compact" : "expanded");
  });

  const isCompact = scrollState === "compact";

  // Generate CSS classes for navigation items
  const getNavItemClasses = (isDropdown: boolean) => {
    const baseClasses =
      "inline-flex h-full w-max items-center justify-center rounded-xs bg-transparent px-2 py-2 text-xl font-medium disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 relative";

    if (isCompact) {
      return cn(
        baseClasses,
        isDropdown
          ? "hover:bg-transparent hover:text-brand-black focus:bg-white focus:text-brand-black data-[state=open]:bg-transparent data-[state=open]:text-brand-black data-[state=open]:hover:bg-transparent data-[state=open]:hover:text-brand-black data-[state=open]:focus:bg-transparent data-[state=open]:focus:text-brand-black"
          : " hover:bg-transparent hover:text-brand-black focus:bg-transparent focus:text-brand-black",
      );
    }

    return cn(
      baseClasses,
      isDropdown
        ? " hover:bg-transparent hover:text-white focus:bg-brand-blue focus:text-white data-[state=open]:bg-transparent data-[state=open]:text-white data-[state=open]:hover:bg-transparent data-[state=open]:hover:text-white data-[state=open]:focus:bg-transparent data-[state=open]:focus:text-white"
        : " hover:bg-transparent hover:text-white focus:bg-transparent focus:text-white",
    );
  };

  const getActiveNavClasses = (link: string[]) => {
    const baseActiveClasses = "underline-offset-5 decoration-2 underline";
    if (link.includes(pathname)) {
      return cn(
        baseActiveClasses,
        isCompact ? "text-brand-blue-light" : "text-brand-blue ",
      );
    } else {
      return cn(isCompact ? "text-white" : "text-brand-black");
    }
  };

  // Check if item should show hover effect
  const shouldShowHover = (index: number) => {
    const item = navItems[index];
    const itemValue = `item-${index}`;

    // Show hover if:
    // 1. Mouse is hovering over the item
    // 2. Item has dropdown and dropdown is open
    return (
      hoveredIndex === index || (item.content && activeDropdown === itemValue)
    );
  };

  // Check if item should show hover effect
  const shouldShowSubHover = (subIndex: number) => {
    const item = navItems[subIndex];
    const itemValue = `item-${subIndex}`;

    // Show hover if:
    // 1. Mouse is hovering over the item
    return hoveredSubIndex === subIndex;
  };

  // Render hover effect overlay
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
        transition={hoverTransition}
      />
    );
  };

  // Render hover effect overlay for dropdown menu items
  const renderSubHoverEffect = (subIndex: number) => {
    if (!shouldShowSubHover(subIndex)) return null;

    return (
      <motion.div
        layoutId="hovered"
        className={cn("absolute inset-0 z-[-1] rounded-sm", "bg-brand-green")}
        initial={false}
        transition={hoverTransition}
      />
    );
  };

  // Render navigation menu item with dropdown
  const renderDropdownItem = (item: any, index: number) => {
    const itemValue = `item-${index}`;
    const subItemLinks: string[] = item.content.map(
      (subItem: { name: string; link: string }) => subItem.link,
    );

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
          {item.content.map((subItem: any, subIndex: number) => (
            <NavigationMenuItem asChild key={subIndex}>
              <div className="z-55">
                <NavigationMenuLink
                  href={item.link}
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

  // Render simple navigation menu item
  const renderSimpleItem = (item: any, index: number) => (
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

  return (
    <motion.header
      variants={navVariants}
      animate={scrollState}
      transition={navTransition}
      className={cn(
        "z-50 fixed top-0 left-1/2 flex w-screen -translate-x-1/2 transform flex-row px-10 bg-white/50 backdrop-blur-[1px]",
      )}
    >
      {/* Logo Section */}
      <Link href="/" className="h-full flex-auto content-center">
        <motion.img
          alt="Hack for Impact Logo"
          src={isCompact ? "/h4i.svg" : "/logo.svg"}
          className="h-10 min-h-5 flex-none"
        />
      </Link>

      {/* Spacer */}
      <div className="h-full w-1/6 flex-auto" />

      {/* Navigation Menu */}
      <div className="flex h-full flex-auto">
        <NavigationMenu
          value={activeDropdown!}
          onValueChange={setActiveDropdown}
          viewport={false}
          className="flex h-full w-full max-w-none justify-end"
        >
          <NavigationMenuList
            className="flex h-full w-full"
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
