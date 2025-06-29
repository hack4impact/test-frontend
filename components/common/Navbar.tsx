'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu"
import { cva } from "class-variance-authority";
import { useContext } from "react";
import { useScroll } from "@/lib/context/ScrollContext";

const navigationMenuLinkStyle = cva("text-lg hover:scale-105 hover:text-[#FFF] hover:bg-[#0085FF] focus:scale-105 focus:text-[#FFF] focus:bg-[#0085FF]")


export default function Navbar() {

  const scroll = useScroll();

  return (
    <header id="nav" className="duration-300 fixed h-20 w-screen flex flex-row px-10 transition-all">
      <div className={"relative h-full flex-auto " + (!scroll ? "w-3/10" : "w-1/5")}>
        <Link href="/" >
          <Image id="logo" fill alt="Hack for Impact Logo" src={!scroll ? "/logo.svg" : "/h4i.svg"} className="object-contain">
          </Image>
        </Link>
      </div>
      <div className={(!scroll ? "w-3/10" : "w-2/5") + " h-full flex-auto"} />
      <NavigationMenu viewport={false} className="w-4/10 h-full min-w-fit max-w-none flex-auto">
        <NavigationMenuList className="w-full h-full gap-10">
          <NavigationMenuItem className="flex-auto">
            <NavigationMenuLink asChild className={navigationMenuLinkStyle() + (scroll ? " text-white" : " text-black")}>
              <Link href="/about" className="">About Us</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="flex-auto">
            <NavigationMenuLink asChild className={navigationMenuLinkStyle() + (scroll ? " text-white" : " text-black")}>
              <Link href="/work">Our Work</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className={"flex-auto" + (scroll ? " text-white" : " text-black")}>
            <NavigationMenuTrigger className="text-lg">Apply</NavigationMenuTrigger>
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
            <NavigationMenuLink className={navigationMenuLinkStyle() + (scroll ? " text-white" : " text-black")}>
              Donate
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="flex-auto">
            <NavigationMenuLink className={navigationMenuLinkStyle() + (scroll ? " text-white" : " text-black")}>
              Log In
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu >
    </header >

  )
};
