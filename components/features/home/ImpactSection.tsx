import { childVariants, parentVariants } from "@/data/animation";
import { impactInfo } from "@/data/content";
import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

import { MotionTiltCard } from "../../shared/TiltCard";

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
      {impactInfo.map((item, index) => {
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
