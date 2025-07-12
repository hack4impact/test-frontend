"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Ref } from "react";

interface FeatureCardProps {
  title: string;
  content: string;
  footer?: string;
  ref: Ref<HTMLDivElement>;
  bgColor?: string;
  textColor?: string;
  imgBorder?: string;
}
export const MotionFeatureCard = motion.create(FeatureCard);

export function FeatureCard({
  title,
  content,
  footer = "Visit Project",
  ref,
  bgColor = "bg-brand-black",
  textColor = "text-white",
  imgBorder = "border-brand-blue",
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
      className="w-full bg-transparent transition-shadow hover:shadow-brand-black/50 hover:drop-shadow-xl"
    >
      <Card className={cn("flex h-full w-full flex-row", bgColor, textColor)}>
        <div className={cn("ml-5 flex w-1/2 rounded-sm border-3", imgBorder)} />
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
