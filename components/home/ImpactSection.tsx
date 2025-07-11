import { childVariants, initiatives, parentVariants } from "@/data/data";
import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

import { MotionTiltCard } from "./TiltCard";

export default function ImpactSection() {
  const ref = useRef(null);
  useInView(ref, { amount: "some" });

  return (
    <motion.div
      ref={ref}
      variants={parentVariants}
      className={cn("my-10 flex w-full flex-row justify-between gap-5")}
      initial="hidden"
      whileInView="visible"
    >
      {initiatives.map((item, index) => {
        return (
          <MotionTiltCard
            key={index}
            variants={childVariants}
            bgColor={item.bgColor}
            textColor="text-white"
            title={item.title}
            content={item.content}
            footer={item.footer}
          ></MotionTiltCard>
        );
      })}
    </motion.div>
  );
}
