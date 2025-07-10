import { initiatives, item, list } from "@/data/HomeData";
import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

import TiltCard from "./TiltCard";

export default function Initiatives() {
  const MotionTiltCard = motion.create(TiltCard);

  const ref = useRef(null);
  const inView = useInView(ref, { amount: "some" });

  return (
    <motion.div
      ref={ref}
      variants={list}
      className={cn("my-10 flex w-full flex-row justify-between gap-5")}
      initial="hidden"
      whileInView="visible"
    >
      {initiatives.map((e, i) => {
        return (
          <MotionTiltCard
            key={i}
            variants={item}
            bgColor={`${e.color}`}
            textColor="#FFF"
            title={e.title}
            content={e.content}
            footer={e.footer}
          ></MotionTiltCard>
        );
      })}
    </motion.div>
  );
}
