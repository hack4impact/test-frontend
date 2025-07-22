"use client";

import { CircleCarousel } from "@/components/about/CircleCarousel";
import { GridPattern } from "@/components/layout/GridPattern";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

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
  return (
    <div className="relative w-screen">
      {/* added the grid pattern */}
      <div className="absolute top-0 left-0 w-full h-full min-h-full z-[-10]">
        <GridPattern gridColor="stroke-brand-blue-light" />
      </div>

      <main className="px-10 min-h-screen flex flex-col min-w-[300px]">
        <div className="w-full flex flex-col">
          <h1 className="text-[48px] font-semibold pt-30">About Us</h1>

          <div className="flex flex-row gap-2 justify-between pt-10">
            <Image
              src="/blank.png"
              alt="INSERT PIC"
              width={650}
              height={500}
              className="border-3 border-[#0085FF] rounded-sm"
            />
            <Image
              src="/blank.png"
              alt="INSERT PIC"
              width={650}
              height={500}
              className="border-3 border-[#0085FF] rounded-sm"
            />
          </div>

          <h1 className="text-[48px] pt-10 font-semibold">Our Mission</h1>
          <div className="flex flex-row gap-2 justify-between pt-10">
            <p className="h-3/5 text-[20px]">
              To empower engineers, designers, activists, and humanitarians to
              create lasting and impactful social change, fostering the wider
              adoption of software as a tool for social good.
            </p>
          </div>

          <h1 className="text-[48px] pt-10 font-semibold">Our Values</h1>
          <div>
            {/* <Carousel /> */}
            <CircleCarousel items={values} />
          </div>

          <h1 className="text-[48px] pt-10 font-semibold">National Team</h1>
          <div className="w-full flex flex-wrap pt-10 justify-center gap-2 pb-10">
            {[...Array(8)].map((_, index) => (
              <div key={`blue-${index}`} className="basis-[calc(25%-1.5rem)]">
                <Image
                  src="/blank.png"
                  alt="INSERT PIC"
                  width={315}
                  height={250}
                  className="border-3 border-[#0085FF] rounded-sm"
                />
              </div>
            ))}
            {[...Array(8)].map((_, index) => (
              <div key={`green-${index}`} className="basis-[calc(25%-1.5rem)]">
                <Image
                  src="/blank.png"
                  alt="INSERT PIC"
                  width={315}
                  height={250}
                  className="border-3 border-[#10B875] rounded-sm"
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default About;
