"use client";

import {
  motion,
  useScroll,
  useMotionValueEvent,
  LayoutGroup,
} from "motion/react";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuList,
  NavigationMenuContent,
} from "../ui/navigation-menu";

export default function Navbar() {
  const [scroll, setScroll] = useState<"expanded" | "compact">("expanded");
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", () => {
    console.log(scrollYProgress);
    if (scrollYProgress.get() > 0.05) setScroll("compact");
    else setScroll("expanded");
  });

  return (
    <motion.header
      animate={
        scroll == "compact"
          ? {
              width: "80vw",
              marginTop: "2vh",
              borderRadius: "5px",
              backgroundColor: "#0085FF",
              filter: "drop-shadow(0px 4px 4px #00000050)",
            }
          : {
              width: "100vw",
              marginTop: "0vh",
              borderRadius: "0px",
              backgroundColor: "#FFFFFF00",
              filter: "drop-shadow(0px 0px 0px)",
            }
      }
      transition={{
        duration: 0.3,
        type: "spring",
        filter: { type: false },
      }}
      className="fixed z-20 flex h-20 w-screen flex-row px-10 backdrop-blur-sm"
    >
      <motion.div className="h-full flex-initial content-center">
        <motion.img
          alt="Hack for Impact Logo"
          src={scroll == "compact" ? "/h4i.svg" : "/logo.svg"}
          className="min-h-10 flex-none"
        ></motion.img>
      </motion.div>

      <motion.div className="h-full w-1/6 flex-auto"></motion.div>
      <motion.div className="flex h-full flex-initial">
        <NavigationMenu
          viewport={false}
          className="flex h-full w-full max-w-none"
        >
          <NavigationMenuList className="flex h-full w-full">
            <NavigationMenuItem>
              <NavigationMenuLink
                className={`${
                  scroll == "compact"
                    ? "text-white hover:bg-white"
                    : "hover:bg-[#0085FF] hover:text-white focus:bg-[#0085FF] focus:text-white"
                } flex text-xl`}
              >
                About Us
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={`${
                  scroll == "compact"
                    ? "text-white hover:bg-white"
                    : "hover:bg-[#0085FF] hover:text-white focus:bg-[#0085FF] focus:text-white"
                } flex text-xl`}
              >
                Our Work
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={`${
                  scroll == "compact"
                    ? "bg-[#FFFFFF00] text-white hover:bg-white hover:text-black data-[state=open]:bg-white/50 data-[state=open]:text-black data-[state=open]:hover:bg-white data-[state=open]:hover:text-black"
                    : ""
                } flex text-xl`}
              >
                Apply
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuItem asChild>
                  <NavigationMenuLink className="text-xl">
                    Chapters
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem asChild>
                  <NavigationMenuLink className="text-xl">
                    Nonprofits
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuLink
              className={`${
                scroll == "compact"
                  ? "text-white hover:bg-white"
                  : "hover:bg-[#0085FF] hover:text-white focus:bg-[#0085FF] focus:text-white"
              } flex text-xl`}
            >
              Donate
            </NavigationMenuLink>
            <NavigationMenuLink
              className={`${
                scroll == "compact"
                  ? "text-white hover:bg-white"
                  : "hover:bg-[#0085FF] hover:text-white focus:bg-[#0085FF] focus:text-white"
              } flex text-xl`}
            >
              Log In
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>
      </motion.div>
    </motion.header>
  );
}
