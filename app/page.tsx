"use client";

import Image from "next/image";
import Highlight from "../components/home/Highlight";
import Initiative from "@/components/home/Initiative";

import { useEffect } from "react";
import Feature from "@/components/home/Feature";
import { Button } from "@/components/ui/button";

export default function Home() {
  const chapterNetworkContent =
    "We help new chapters help their local community by providing established communication channels with veteran chapters and mentors";
  const nonprofitProjectsContent =
    "We help nonprofits do the good they are meant to be doing more  efficiently. By building them the custom software they need, they can  focus on their important work";
  const chapterResourcesContent =
    "Our 9 years of experience in building socially impactful technology  has given our chapters and members the tools to help nonprofits";

  const habitatContent =
    "Habitat for Humanity of Tompkins and Cortland Counties partner with first-time homebuyers in our community to help them build or improve a place they can call home. We built an administration and volunteer sign-ups portal allowing them to manage multiple forms at once and streamline administrative processes";
  const mapscoutContent =
    "MapScout is an interactive resource map that allows people looking for behavioral/mental health and trauma-specific services to be able to see what is offered near them and more easily navigate a system that is often confusing and overwhelming. We currently partner with two nonprofit organizations, PACTS and EPIC.";

  return (
    <>
      <div id="page" className="absolute h-10 w-screen"></div>
      <div className="min-h-screen w-screen px-10">
        <main className="flex size-full flex-col pt-20">
          <Highlight />
          <div className="flex h-svh w-full flex-col">
            <h1 className="text-[48px] font-semibold">Our Initiatives</h1>
            <div className="my-10 flex w-full flex-row justify-between gap-5">
              <Initiative
                bg="bg-[#0085FF]"
                color="text-[#FFF]"
                title="Chapter Network"
                content={chapterNetworkContent}
                footer="Our Chapters"
              ></Initiative>
              <Initiative
                bg="bg-[#10B875]"
                color="text-[#FFF]"
                title="Nonprofit Projects"
                content={nonprofitProjectsContent}
                footer="Our Projects"
              ></Initiative>
              <Initiative
                bg="bg-[#F2594B]"
                color="text-[#FFF]"
                title="Chapter Resources"
                content={chapterResourcesContent}
                footer="Our Resources"
              ></Initiative>
            </div>
            <h1 className="text-[48px] font-semibold">Featured Projects</h1>
            <div className="my-10 flex w-full flex-col justify-between gap-5">
              <Feature
                title="Habitat for Humanity"
                description="Volunteer Management System"
                content={habitatContent}
                footer="Visit Project"
              ></Feature>
              <Feature
                title="Mapscout"
                description="General Solution"
                content={mapscoutContent}
                footer="Visit Project"
              ></Feature>
            </div>
            <div className="flex flex-row gap-5 pb-10">
              <Button className="h-[50px] rounded-sm bg-[#0085FF] text-2xl font-medium text-[#FFF] hover:scale-105">
                See all chapters
              </Button>
              <Button className="h-[50px] rounded-sm bg-[#0085FF] text-2xl font-medium text-[#FFF] hover:scale-105">
                Propose a nonprofit project
              </Button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
