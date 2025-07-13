import { chapters } from "@/data/data";
import { cn } from "@/lib/utils";
import { motion, useInView, useScroll } from "motion/react";
import { Ref, RefObject, useEffect, useRef, useState } from "react";

export function ChapterCarousel() {
  const [chapterIndex, setChapterIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the corresponding card when chapterIndex changes
  useEffect(() => {
    const targetCard = cardRefs.current[chapterIndex];
    if (targetCard) {
      targetCard.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  }, [chapterIndex]);

  return (
    <div className="my-10 h-min w-full flex flex-col gap-2 items-center">
      <MotionSelector
        className="pt-2 pb-3 px-2 overscroll-contain border-x-3 border-brand-green "
        chapterIndex={chapterIndex}
        setChapterIndex={setChapterIndex}
      />
      <ChapterCards
        setChapterIndex={setChapterIndex}
        ref={carouselRef}
        chapterIndex={chapterIndex}
        cardRefs={cardRefs}
      />
    </div>
  );
}

interface ChapterProps {
  className?: string;
  chapter?: any;
  index?: number;
  chapterIndex: number;
  setChapterIndex: (index: number) => void;
}

interface ChapterCardProps extends ChapterProps {
  ref?: Ref<HTMLDivElement>;
}

function ChapterCards({
  setChapterIndex,
  chapterIndex,
  cardRefs,
  ref,
}: {
  setChapterIndex: (index: number) => void;
  chapterIndex: number;
  cardRefs: RefObject<(HTMLDivElement | null)[]>;
  ref?: Ref<HTMLDivElement>;
}) {
  return (
    <motion.div
      ref={ref}
      className="overscroll-contain flex flex-row w-full h-[400px] overflow-x-auto gap-2 snap-x snap-mandatory justify-start"
    >
      {chapters.map((chapter, index) => {
        return (
          <MotionChapterCard
            key={index}
            index={index}
            chapterIndex={chapterIndex}
            setChapterIndex={setChapterIndex}
            ref={(el: HTMLDivElement | null) => {
              if (cardRefs.current) {
                cardRefs.current[index] = el;
              }
            }}
            className="flex min-w-full w-full h-full rounded-md bg-brand-blue justify-center snap-start"
          />
        );
      })}
    </motion.div>
  );
}

const ChapterCard = ({
  index,
  className,
  ref,
  setChapterIndex,
}: ChapterCardProps) => {
  return (
    <div
      onMouseEnter={() => setChapterIndex(index!)}
      ref={ref}
      className={cn(className)}
    >
      <div className="text-9xl place-content-center">{index}</div>
    </div>
  );
};

const MotionChapterCard = motion.create(ChapterCard);

function Selector({
  className,
  chapterIndex,
  setChapterIndex,
  ref,
}: ChapterCardProps) {
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
            transition={{
              backgroundColor: { type: false },
              y: { type: "spring", damping: 20, stiffness: 300 },
            }}
            whileHover={{
              rotateZ: "5deg",
              backgroundColor: "var(--color-brand-black)",
              border: "none",
              y: 7,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() => {
              setChapterIndex(index);
              console.log(index, chapterIndex);
            }}
            className={cn(
              "scroll-ml-2 snap-start rounded-sm flex-none w-[120px] h-[80px] scroll-smooth",
            )}
          ></motion.button>
        );
      })}
    </div>
  );
}

const MotionSelector = motion.create(Selector);
