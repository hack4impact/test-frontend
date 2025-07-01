"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { cva } from "class-variance-authority";
import { useContext } from "react";
import { useScroll } from "@/lib/context/ScrollContext";

const navigationMenuLinkStyle = cva(
  "text-xl hover:scale-105 hover:text-[#FFF] hover:bg-[#0085FF] focus:scale-105 focus:text-[#FFF] focus:bg-[#0085FF]",
);
const altNavigationMenuLinkStyle = cva(
  "text-xl hover:scale-105 hover:bg-[#FFF] hover:text-[#0085FF] focus:scale-105 focus:bg-[#FFF] focus:text-[#0085FF]",
);
const altNavigationTriggerStyle = cva(
  "data-[state=open]:hover:bg-[#FFF] data-[state=open]:text-[#0085FF] data-[state=open]:focus:bg-[#0085FF] data-[state=open]:bg-[#FFF]/50",
);

export default function Navbar() {
  const scroll = useScroll();

  return (
    <header
      id="nav"
      className="fixed z-20 flex h-20 w-screen flex-row px-10 transition-all duration-300"
    >
      <motion.div
        whileTap={{ scale: 0.95 }}
        className={`relative h-full flex-auto ${!scroll ? "w-3/10" : "w-1/10"}`}
      >
        <Link href="/">
          <Image
            id="logo"
            fill
            alt="Hack for Impact Logo"
            src={!scroll ? "/logo.svg" : "/h4i.svg"}
            className="object-contain"
          ></Image>
        </Link>
      </motion.div>
      <div className={(!scroll ? "w-3/10" : "w-5/10") + " h-full flex-auto"} />
      <NavigationMenu
        viewport={false}
        className="h-full w-4/10 max-w-none min-w-fit flex-auto"
      >
        <NavigationMenuList className="h-full w-full gap-10">
          <NavigationMenuItem className="flex-auto">
            <NavigationMenuLink
              asChild
              className={
                scroll
                  ? altNavigationMenuLinkStyle() + " text-white"
                  : navigationMenuLinkStyle() + " text-black"
              }
            >
              <Link href="/about" className="">
                About Us
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="flex-auto">
            <NavigationMenuLink
              asChild
              className={
                scroll
                  ? altNavigationMenuLinkStyle() + " text-white"
                  : navigationMenuLinkStyle() + " text-black"
              }
            >
              <Link href="/work">Our Work</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className={"flex-auto"}>
            <NavigationMenuTrigger
              className={
                scroll
                  ? altNavigationMenuLinkStyle() +
                    " text-xl text-white" +
                    altNavigationTriggerStyle()
                  : navigationMenuLinkStyle() + " text-xl text-black"
              }
            >
              Apply
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink asChild className="text-lg">
                <Link href="/apply/chapters">Chapters</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild className="text-lg">
                <Link href="/apply/nonprofits">Nonprofits</Link>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="flex-auto">
            <NavigationMenuLink
              className={
                scroll
                  ? altNavigationMenuLinkStyle() + " text-white"
                  : navigationMenuLinkStyle() + " text-black"
              }
            >
              Donate
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="flex-auto">
            <NavigationMenuLink
              className={
                scroll
                  ? altNavigationMenuLinkStyle() + " text-white"
                  : navigationMenuLinkStyle() + " text-black"
              }
            >
              Log In
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
