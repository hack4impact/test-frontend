import { chapters } from "@/data/data";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Ref, useState } from "react";

export function ChapterCarousel() {
  const [chapterIndex, setChapterIndex] = useState(0);

  return (
    <div>
      <MotionSelector
        className="pt-2 pb-4 px-2 "
        chapterIndex={chapterIndex}
        setChapterIndex={setChapterIndex}
      />
      <motion.div>
        <MotionChapterCard />
      </motion.div>
    </div>
  );
}

interface ChapterProps {
  className: string;
  chapterIndex: number;
  setChapterIndex: Function;

  ref: Ref<HTMLDivElement>;
}

const ChapterCard = ({
  className,
  ref,
  chapterIndex,
  setChapterIndex,
}: ChapterProps) => {
  return (
    <div>
      <div></div>
    </div>
  );
};

const MotionChapterCard = motion.create(ChapterCard);

function Selector({
  className,
  chapterIndex,
  setChapterIndex,
  ref,
}: ChapterProps) {
  return (
    <div
      ref={ref}
      className={cn(
        className,
        "  mask-x-to-90% mask-x-from-70% flex relative flex-initial w-full h-min justify-start gap-2 overflow-x-auto snap-x snap-mandatory",
      )}
    >
      {chapters.map((_, index) => {
        return (
          <motion.button
            key={index}
            initial={{
              rotateZ: "0deg",
              backgroundColor: "var(--color-brand-green-light)",
              borderColor: "var(--color-brand-green)",
              borderWidth: "3px",
              y: 0,
            }}
            animate={
              index == chapterIndex
                ? {
                    backgroundColor: "var(--color-brand-blue)",
                    border: "none",
                    y: -7,
                  }
                : {
                    backgroundColor: "var(--color-brand-green-light)",
                    borderColor: "var(--color-brand-green)",
                    borderWidth: "3px",
                    y: 0,
                  }
            }
            transition={{ backgroundColor: { type: false } }}
            whileHover={{
              rotateZ: "5deg",
              backgroundColor: "var(--color-brand-black)",
              border: "none",
              y: -3,
            }}
            onClick={() => {
              setChapterIndex(index);
              console.log(index, chapterIndex);
            }}
            className={cn(
              "snap-start scroll-ml-2 rounded-sm flex-none w-[120px] h-[80px] scroll-smooth",
            )}
          ></motion.button>
        );
      })}
    </div>
  );
}

const MotionSelector = motion.create(Selector);
