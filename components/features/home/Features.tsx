import { features, item } from "@/data/home-data";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

import { MotionFeatureCard } from "../../shared/FeatureCard";

export default function Features() {
  return (
    <motion.div
      className={cn("my-10 flex w-full flex-col justify-between gap-5")}
    >
      {features.map((e, i) => {
        return (
          <MotionFeatureCard
            style={{ opacity: 0 }}
            initial="hidden"
            whileInView="visible"
            variants={item}
            viewport={{ amount: "some" }}
            key={i}
            title={e.title}
            content={e.content}
            footer="Visit Project"
          ></MotionFeatureCard>
        );
      })}
    </motion.div>
  );
}
