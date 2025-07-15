import { childVariants, features } from "@/data/data";
import { cn } from "@/lib/utils";

import { MotionFeatureCard } from "../../shared/FeatureCard";

export default function FeaturedProjects() {
  return (
    <div className={cn("my-10 flex w-full flex-col justify-between gap-5")}>
      {features.map((item, index) => {
        return (
          <MotionFeatureCard
            style={{ opacity: 0 }}
            initial="hidden"
            whileInView="visible"
            variants={childVariants}
            viewport={{ amount: "some" }}
            key={index}
            title={item.title}
            content={item.content}
          ></MotionFeatureCard>
        );
      })}
    </div>
  );
}
