import { chapterFeatures, childVariants } from "@/data/data";
import { cn } from "@/lib/utils";

import { MotionFeatureCard } from "../common/FeatureCard";

export function ChapterFeatures() {
  return (
    <div className={cn("my-10 flex w-full flex-col justify-between gap-5")}>
      {chapterFeatures.map((item, index) => {
        return (
          <MotionFeatureCard
            key={index}
            style={{ opacity: 0 }}
            initial="hidden"
            whileInView="visible"
            variants={childVariants}
            viewport={{ amount: "some" }}
            title={item.title}
            content={item.content}
            bgColor={item.bgColor}
            imgBorder={item.imgBorder}
          />
        );
      })}
    </div>
  );
}
