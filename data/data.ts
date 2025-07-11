import { Variants } from "motion/react";

export const initiatives = [
  {
    title: "Chapter Network",
    content:
      "We help new chapters help their local community by providing established communication channels with veteran chapters and mentors",
    footer: "Our Chapters",
    bgColor: "var(--color-brand-blue)",
  },
  {
    title: "Nonprofit Projects",
    content:
      "We help nonprofits do the good they are meant to be doing more  efficiently. By building them the custom software they need, they can  focus on their important work",
    footer: "Our Projects",
    bgColor: "var(--color-brand-green)",
  },
  {
    title: "Chapter Resources",
    content:
      "Our 9 years of experience in building socially impactful technology  has given our chapters and members the tools to help nonprofits",
    footer: "Our Resources",
    bgColor: "var(--color-brand-red)",
  },
];

export const features = [
  {
    title: "Habitat for Humanity",
    description: "General VMS",
    content:
      "Habitat for Humanity of Tompkins and Cortland Counties partner with first-time homebuyers in our community to help them build or improve a place they can call home. We built an administration and volunteer sign-ups portal allowing them to manage multiple forms at once and streamline administrative processes",
  },
  {
    title: "MapScout",
    description: "Map Resource",
    content:
      "MapScout is an interactive resource map that allows people looking for behavioral/mental health and trauma-specific services to be able to see what is offered near them and more easily navigate a system that is often confusing and overwhelming. We currently partner with two nonprofit organizations, PACTS and EPIC.",
  },
];

export const chapterFeatures = [
  {
    title: "Project Name",
    description: "General VMS",
    bgColor: "bg-brand-green",
    imgBorder: "border-brand-green",
    content:
      "Description of the project. Describe the problem, research, design, development, solution, and handoff. Try to describe the impact that the project has on the nonprofit partner. Describe the work and field of impact that the nonprofit partner operates in as well.",
  },
  {
    title: "Project Name",
    description: "Map Resource",
    bgColor: "bg-brand-red",
    imgBorder: "border-brand-red",
    content:
      "Description of the project. Describe the problem, research, design, development, solution, and handoff. Try to describe the impact that the project has on the nonprofit partner. Describe the work and field of impact that the nonprofit partner operates in as well.",
  },
];

export const parentVariants: Variants = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

export const childVariants: Variants = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
    },
  },
  hidden: {
    opacity: 0,
    x: -10,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
    },
  },
};

export const navItems = [
  { name: "About Us", link: "/about" },
  { name: "Our Work", link: "/work" },
  {
    name: "Apply",
    link: "/apply",
    content: [
      { name: "Chapters", link: "/" },
      { name: "Nonprofits", link: "/" },
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
