import { NavItem } from "@/types";

export const navItems: NavItem[] = [
  { name: "About Us", link: "/about" },
  { name: "Our Work", link: "/work" },
  {
    name: "Apply",
    link: "/apply",
    content: [
      { name: "Chapters", link: "/apply/chapters" },
      { name: "Nonprofits", link: "/apply/nonprofits" },
    ],
  },
  {
    name: "Donate",
    link: "/donate",
  },
  {
    name: "Log In",
    link: "/login",
  },
];
