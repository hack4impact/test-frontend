"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "motion/react";
import { Ref } from "react";

interface FeatureCardProps {
  title: string;
  content: string;
  footer: string;
  ref: Ref<HTMLDivElement>;
}

export default function FeatureCard({
  title,
  content,
  footer,
  ref,
}: FeatureCardProps) {
  return (
    <motion.div
      ref={ref}
      whileTap={{
        scale: 0.98,
      }}
      whileHover={{
        rotateZ: "0.5deg",
      }}
      transition={{
        type: "spring",
        damping: 10,
        stiffness: 100,
        duration: 0.25,
      }}
      className="w-full bg-transparent transition-shadow hover:shadow-[#00000050] hover:drop-shadow-xl"
    >
      <Card className="flex h-full w-full flex-row bg-[#333] text-white">
        <div className="ml-5 flex w-1/2 rounded-sm border-3 border-[#0085FF]" />
        <div className="flex w-1/2 flex-col">
          <CardHeader>
            <CardTitle className="h-1/5 text-[35px] font-semibold">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-5 h-3/5 text-[20px]">
            <p>{content}</p>
          </CardContent>
          <CardFooter className="mt-10 h-1/5 text-[30px] leading-none font-semibold">
            {footer}
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
}
