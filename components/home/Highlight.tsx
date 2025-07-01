"use client";

import { useEffect, useRef } from "react";
import { Button } from "../ui/button";

export default function Highlight() {
  const textRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!textRef.current) {
      textRef.current = document.getElementById("text");
    }

    return () => {
      return;
    };
  }, []);

  return (
    <div className="flex h-svh w-full flex-row">
      <div className="flex h-full w-1/2 items-center pr-15 pb-15">
        <div className="h-fit max-h-[500px] w-full">
          <h1 className="text-[50px] leading-none">We are</h1>
          <div>
            <h1
              id="text"
              className="text-[75px] leading-none font-bold text-[#0085FF]"
            >
              Designers
            </h1>
            <div></div>
          </div>
          <h1 className="mb-5 text-[60px] leading-none font-bold">
            for social change
          </h1>
          <h2 className="mb-10 text-[35px]/10">
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
