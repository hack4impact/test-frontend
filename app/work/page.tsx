"use client";

import Image from "next/image";
import Highlight from "@/components/home/Hero";
import Initiative from "@/components/home/TiltCard";

import { useEffect } from "react";
import Feature from "@/components/home/FeatureCard";
import { Button } from "@/components/ui/button";

export default function Work() {
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
    </>
  );
}
