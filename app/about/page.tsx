"use client";

import { CircleCarousel } from "@/components/features/about/CircleCarousel";
import { GridPattern } from "@/components/layout/GridPattern";
import { AnimatedSectionTitle } from "@/components/shared/AnimatedSectionTitle";
import { useExecMembers } from "@/hooks/useExecMembers";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const colors = ["#F2594B", "#0085FF", "#10B875"];
const values = [
  {
    title: "Go For It",
    content:
      "Organizational roles do not determine the value of an idea: great ideas can come from anyone and anywhere. We grow because we are always trying something new.",
  },
  {
    title: "Be Open Minded",
    content:
      "Our process depends on openness to different people, topics, and perspectives. We embrace difference and work against intolerance to foster an inclusive environment. Our goal is to expose our members to the vast opportunities and daunting challenges in our work",
  },
  {
    title: "Go Beyond Technology",
    content:
      "Technology is only one tool we use in our greater mission for social impact. Technology alone is not enough. We learn from, work with, and are inspired by others who are tackling social problems using a multitude of tools.",
  },
  {
    title: "Engage Your Community",
    content:
      "Our community makes us special. The strength of our community comes from the contributions of its members. We welcome new members with warmth, and we make the effort to know each other beyond superficial details.",
  },
  {
    title: "Develop With Care",
    content:
      "We build with others in mind. Empathy and compassion are crucial to serving our partner organizations and members. When we embark on projects, we work to deeply understand the people who we are helping.",
  },
];

function About() {
  const { execMembers, loading, error } = useExecMembers();

  return (
    <main className="px-10 min-h-screen flex flex-col min-w-[300px] pt-20">
      <GridPattern
        gridColor="stroke-brand-blue-light"
        style={{ zIndex: -10 }}
      />
      <div className="w-full flex flex-col">
        <AnimatedSectionTitle className="sticky mt-5 font-bold text-5xl">
          About Us
        </AnimatedSectionTitle>

        <div className="flex flex-row gap-2 justify-between my-10">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
            viewport={{ amount: 0.6 }}
          >
            <Image
              src="/blank.png"
              alt="INSERT PIC"
              width={650}
              height={500}
              className="border-3 border-[#0085FF] rounded-sm"
            />
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
            viewport={{ amount: 0.6 }}
          >
            <Image
              src="/blank.png"
              alt="INSERT PIC"
              width={650}
              height={500}
              className="border-3 border-[#0085FF] rounded-sm"
            />
          </motion.div>
        </div>

        <AnimatedSectionTitle>Our Mission</AnimatedSectionTitle>
        <motion.div className="flex flex-row gap-2 justify-between mt-10 mb-20">
          <p className="h-3/5 text-[30px]">
            To empower engineers, designers, activists, and humanitarians to
            create lasting and impactful social change, fostering the wider
            adoption of software as a tool for social good.
          </p>
        </motion.div>

        <AnimatedSectionTitle>Our Values</AnimatedSectionTitle>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ amount: 0.7 }}
          className="my-10"
        >
          <CircleCarousel items={values} />
        </motion.div>

        <AnimatedSectionTitle>National Team</AnimatedSectionTitle>
        <div className="w-full flex flex-wrap pt-10 justify-evenly gap-2 pb-10">
          {execMembers.map((execMember, index) => (
            <div
              key={`green-${index}`}
              style={{ borderColor: colors[index % colors.length] }}
              className="overflow-clip border-3 rounded-sm md:rounded-md w-1/10 justify-center items-center"
            >
              <Image
                src={execMember.photo.url}
                alt={`Photo of ${execMember.photo.name}`}
                width={500}
                height={250}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default About;
