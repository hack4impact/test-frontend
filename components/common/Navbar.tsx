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

const navigationMenuLinkStyle = cva("text-lg hover:scale-105 hover:text-[#FFF] hover:bg-[#0085FF] focus:scale-105 focus:text-[#FFF] focus:bg-[#0085FF]")

export default function Navbar() {
  return (
    <header className="fixed h-20 w-screen flex flex-row px-10">
      <div className="relative w-3/10 h-full flex-auto">
        <Link href="/" >
          <Image fill alt="Hack for Impact Logo" src="/hack.svg" className="object-contain">
          </Image>
        </Link>
      </div>
      <div className=" w-3/10 h-full flex-auto">
      </div>
      <NavigationMenu viewport={false} className="w-4/10 h-full min-w-fit max-w-none flex-auto">
        <NavigationMenuList className="w-full h-full gap-10">
          <NavigationMenuItem className="flex-auto">
            <NavigationMenuLink asChild className={navigationMenuLinkStyle()}>
              <Link href="/about" className="">About Us</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="flex-auto">
            <NavigationMenuLink asChild className={navigationMenuLinkStyle()}>
              <Link href="/work">Our Work</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="flex-auto">
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
            <NavigationMenuLink className={navigationMenuLinkStyle()}>
              Donate
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="flex-auto">
            <NavigationMenuLink className={navigationMenuLinkStyle()}>
              Log In
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu >
    </header >

  )
};
