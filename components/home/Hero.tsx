"use client";

import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { animate, LayoutGroup, stagger } from "motion/react";
import { splitText } from "@/lib/utils";
import RotatingText from "./RotatingText";

export default function Hero() {
  const textRef = useRef<Element | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
  }, []);

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!containerRef.current) return;

      // Hide the container until the fonts are loaded
      containerRef.current.style.visibility = "visible";

      const { words } = splitText(
        containerRef.current.querySelectorAll("#text")!,
      );

      animate(
        words,
        { opacity: [0, 1], y: [10, 0] },
        {
          type: "spring",
          damping: 10,
          stiffness: 100,
          delay: stagger(0.1),
        },
      );
    });
  }, []);

  return (
    <div className="flex h-svh w-full flex-row">
      <div className="flex h-full w-1/2 items-center pr-15 pb-15">
        <div ref={containerRef} className="h-fit max-h-[500px] w-full">
          <h1 id="text" className="text-[60px] leading-none font-bold">
            We are
          </h1>
          <LayoutGroup>
            <RotatingText
              texts={[
                "Developers",
                "Designers",
                "Students",
                "Humanitarians",
                "Leaders",
                "Activists",
              ]}
              mainClassName=" p-1 inline-flex bg-[#0085FF] overflow-hidden rounded-lg"
              staggerFrom={"first"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              layoutId="rotatingText"
              splitLevelClassName=" overflow-hidden leading-none text-[75px] pb-2 font-bold text-[#FFF]"
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 400,
              }}
              rotationInterval={2000}
            ></RotatingText>
          </LayoutGroup>

          <h1 id="text" className="mb-5 text-[60px] leading-none font-bold">
            for social change
          </h1>
          <h2 id="text" className="mb-10 text-[35px]/10">
            Building powerful nonprofit software as a tool for social good
          </h2>
          <Button className="h-[50px] w-2/5 min-w-[250px] rounded-sm bg-[#0085FF] text-2xl font-medium text-[#FFF] hover:scale-105">
            Work with us
          </Button>
        </div>
      </div>
      <div className="flex h-full w-1/2 items-center pb-15">
        <div className="h-[500px] w-full rounded-sm border-3 border-[#0085FF]"></div>
      </div>
    </div>
  );
}
