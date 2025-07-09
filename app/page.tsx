"use client";

import Image from "next/image";
import Hero from "../components/home/Hero";
import TiltCard from "@/components/home/TiltCard";

import { useEffect, useRef } from "react";
import Feature from "@/components/home/Feature";
import { Button } from "@/components/ui/button";
import { motion, Variants, AnimatePresence } from "motion/react";

export default function Home() {
  const initiatives = [
    {
      title: "Chapter Network",
      content:
        "We help new chapters help their local community by providing established communication channels with veteran chapters and mentors",
      footer: "Our Chapters",
      color: "#0085FF",
    },
    {
      title: "Nonprofit Projects",
      content:
        "We help nonprofits do the good they are meant to be doing more  efficiently. By building them the custom software they need, they can  focus on their important work",
      footer: "Our Projects",
      color: "#10B875",
    },
    {
      title: "Chapter Resources",
      content:
        "Our 9 years of experience in building socially impactful technology  has given our chapters and members the tools to help nonprofits",
      footer: "Our Resources",
      color: "#F2594B",
    },
  ];

  const habitatContent =
    "Habitat for Humanity of Tompkins and Cortland Counties partner with first-time homebuyers in our community to help them build or improve a place they can call home. We built an administration and volunteer sign-ups portal allowing them to manage multiple forms at once and streamline administrative processes";
  const mapscoutContent =
    "MapScout is an interactive resource map that allows people looking for behavioral/mental health and trauma-specific services to be able to see what is offered near them and more easily navigate a system that is often confusing and overwhelming. We currently partner with two nonprofit organizations, PACTS and EPIC.";
  const MotionTiltCard = motion.create(TiltCard);

  const list: Variants = {
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

  const item: Variants = {
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

  return (
    <div className="min-h-screen w-screen px-10">
      <main className="flex size-full flex-col pt-20">
        <Hero />

        <div className="flex w-full flex-col">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: "all" }}
            transition={{
              type: "spring",
              damping: 10,
              stiffness: 100,
            }}
            className="text-[48px] font-semibold"
          >
            Our Initiatives
          </motion.h1>
          <AnimatePresence>
            <motion.div
              key={initiatives.length}
              variants={list}
              className="my-10 flex w-full flex-row justify-between gap-5"
              initial="hidden"
              whileInView="visible"
              exit="hidden"
            >
              {initiatives.map((e, i) => {
                return (
                  <MotionTiltCard
                    key={i}
                    viewport={{ amount: "all" }}
                    variants={item}
                    bg={`bg-[${e.color}] hover:drop-shadow-[0px_4px_4px_${e.color}]`}
                    color="text-[#FFF]"
                    title={e.title}
                    content={e.content}
                    footer={e.footer}
                  ></MotionTiltCard>
                );
              })}
            </motion.div>
          </AnimatePresence>

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
            <Button className="h-[50px] rounded-sm bg-[#10B875] text-2xl font-medium text-[#FFF] hover:scale-105">
              Propose a nonprofit project
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
