"use client";

import {
  motion,
  useScroll,
  useMotionValueEvent,
  LayoutGroup,
} from "motion/react";
import { useState } from "react";
import Image from "next/image";

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
              marginTop: "1vh",
              borderRadius: "5px",
            }
          : {
              width: "100vw",
              marginTop: "0vh",
              borderRadius: "0px",
            }
      }
      className="fixed z-20 flex h-20 w-screen flex-row border-3 backdrop-blur-sm"
    >
      <motion.div className="h-full flex-initial content-center border-1 border-e-red-300">
        <motion.img
          src={scroll == "compact" ? "/h4i.svg" : "/logo.svg"}
          className="h-10 flex-initial border-1"
        ></motion.img>
      </motion.div>

      <motion.div className="h-full w-1/6 flex-initial border-1"></motion.div>
      <motion.div className="w- 1/2 h-full flex-initial border-1"></motion.div>
    </motion.header>
  );
}
