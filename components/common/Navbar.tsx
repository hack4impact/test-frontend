"use client";

import { navItems } from "@/data/HomeData";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

export default function Navbar() {
  const [scroll, setScroll] = useState<"expanded" | "compact">("expanded");
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", () => {
    if (scrollYProgress.get() > 0.05) setScroll("compact");
    else setScroll("expanded");
  });

  const nav = {
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

  return (
    <motion.header
      variants={nav}
      animate={scroll == "compact" ? "compact" : "expanded"}
      transition={{
        duration: 0.3,
        type: "spring",
        filter: { type: false },
      }}
      className="fixed top-0 left-1/2 z-20 flex w-screen -translate-x-1/2 transform flex-row px-10"
    >
      <motion.div className="h-full flex-auto content-center">
        <motion.img
          alt="Hack for Impact Logo"
          src={scroll == "compact" ? "/h4i.svg" : "/logo.svg"}
          className="h-10 min-h-5 flex-none"
        ></motion.img>
      </motion.div>

      <motion.div className="h-full w-1/6 flex-auto"></motion.div>
      <motion.div className="flex h-full flex-auto">
        <NavigationMenu
          viewport={false}
          className="flex h-full w-full max-w-none justify-end"
        >
          <NavigationMenuList className="flex h-full w-full">
            {navItems.map((item, idx) => {
              if (item.content) {
                return (
                  <NavigationMenuItem key={idx}>
                    <NavigationMenuTrigger
                      className={`${
                        scroll == "compact"
                          ? "bg-transparent text-white hover:bg-white hover:text-black data-[state=open]:bg-white/50 data-[state=open]:text-black data-[state=open]:hover:bg-white data-[state=open]:hover:text-black"
                          : ""
                      } flex text-xl`}
                    >
                      {item.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      {item.content.map((item, idx) => {
                        return (
                          <NavigationMenuItem asChild key={idx}>
                            <NavigationMenuLink className="text-xl">
                              {item.name}
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        );
                      })}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              } else {
                return (
                  <NavigationMenuItem key={idx}>
                    <NavigationMenuLink
                      className={`${
                        scroll == "compact"
                          ? "text-white hover:bg-white"
                          : "hover:bg-[#0085FF] hover:text-white focus:bg-[#0085FF] focus:text-white"
                      } flex text-xl`}
                    >
                      {item.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              }
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </motion.div>
    </motion.header>
  );
}
