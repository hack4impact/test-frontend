'use client'

import Image from "next/image";
import Highlight from "../components/home/Highlight";
import Initiative from "@/components/home/Initiative";

import { useEffect } from "react";

const chapterNetworkContent = "We help new chapters help their local community by providing established communication channels with veteran chapters and mentors";
const nonprofitProjectsContent = "We help nonprofits do the good they are meant to be doing more  efficiently. By building them the custom software they need, they can  focus on their important work";
const chapterResourcesContent = "Our 9 years of experience in building socially impactful technology  has given our chapters and members the tools to help nonprofits";

export default function Home() {

  return (
    <>
      <div id="page" className="absolute w-screen h-10 "></div>
      <div className="px-10 w-screen min-h-screen">
        <main className="pt-20 size-full flex flex-col">
          <Highlight />
          <div className="w-full h-svh flex flex-col">
            <h1 className="text-[48px] font-semibold">
              Our Initiatives
            </h1>
            <div className="w-full flex flex-row justify-between gap-5 mt-10">
              <Initiative bg="bg-[#0085FF]" color="text-[#FFF]" title="Chapter Network" content={chapterNetworkContent} footer="Our Chapters"></Initiative>
              <Initiative bg="bg-[#10B875]" color="text-[#FFF]" title="Nonprofit Projects" content={nonprofitProjectsContent} footer="Our Projects"></Initiative>
              <Initiative bg="bg-[#F2594B]" color="text-[#FFF]" title="Chapter Resources" content={chapterResourcesContent} footer="Our Resources"></Initiative>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
