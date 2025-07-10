import { motion } from "motion/react";
import { features, item } from "@/data/HomeData";
import FeatureCard from "./FeatureCard";
import { cn } from "@/lib/utils";

export default function Features() {
  const MotionFeatureCard = motion.create(FeatureCard);
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
            description={e.description}
            content={e.content}
            footer="Visit Project"
          ></MotionFeatureCard>
        );
      })}
    </motion.div>
  );
}
