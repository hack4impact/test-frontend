import { Variants } from "motion/react";

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

export const list: Variants = {
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

export const item: Variants = {
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
  },
};

export const expandableTitle: Variants = {
  expanded: {
    background: "var(--color-brand-blue)",
    color: "white",
    borderBottomLeftRadius: "0px",
    borderBottomRightRadius: "0px",
  },
  closed: {
    background: "var(--color-brand-blue-light)",
    color: "var(--color-brand-black)",
    borderRadius: "8px",
  },
  expandedHover: { background: "var(--color-brand-green)", color: "white" },
  closedHover: {
    background: "var(--color-brand-blue)",
    color: "white",
  },
};

export const expandableIcon: Variants = {
  expanded: {
    rotate: 45,
    color: "white",
  },
  closed: { rotate: 0, color: "var(--color-brand-black)" },
  expandedHover: {
    rotate: 45,
    color: "white",
  },
  closedHover: { rotate: 0, color: "white" },
};
