import { chapters } from "@/data/data";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Ref, useState } from "react";

export function ChapterCarousel() {
  const [chapterIndex, setChapterIndex] = useState(0);

  return (
    <div>
      <MotionSelector
        className="mt-5 py-1"
        chapterIndex={chapterIndex}
        setChapterIndex={setChapterIndex}
      />
      <motion.div>
        <ChapterCard />
      </motion.div>
    </div>
  );
}

const ChapterCard = () => {
  return (
    <div>
      <div></div>
    </div>
  );
};

interface SelectorProps {
  className: string;
  chapterIndex: number;
  setChapterIndex: Function;

  ref: Ref<HTMLDivElement>;
}

function Selector({
  className,
  chapterIndex,
  setChapterIndex,
  ref,
}: SelectorProps) {
  return (
    <div
      ref={ref}
      className={cn(
        className,
        "flex flex-initial w-full h-min justify-center gap-2 border-3 overflow-x-auto ",
      )}
    >
      {chapters.map((_, index) => {
        return (
          <motion.button
            key={index}
            initial={
              index == chapterIndex
                ? { rotateZ: "5deg", background: "var(--color-brand-green)" }
                : { rotateZ: "0deg", background: "var(--color-brand-green)" }
            }
            animate={
              index == chapterIndex
                ? { rotateZ: "5deg", background: "var(--color-brand-green)" }
                : { rotateZ: "0deg", background: "var(--color-brand-green)" }
            }
            whileHover={{
              rotateZ: "5deg",
              background: "var(--color-brand-black)",
            }}
            onClick={() => {
              setChapterIndex(index);
              console.log(index, chapterIndex);
            }}
            className={cn(
              "rounded-xs flex-none w-[60px] h-[80px] scroll-smooth",
            )}
          ></motion.button>
        );
      })}
    </div>
  );
}

const MotionSelector = motion.create(Selector);
