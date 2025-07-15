import { chapters } from "@/data/data";
import { cn } from "@/lib/utils";
import { motion, useInView, useScroll } from "motion/react";
import { Ref, RefObject, useEffect, useRef, useState } from "react";

export function ChapterCarousel() {
  const [chapterIndex, setChapterIndex] = useState<number>(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [interacted, setInteracted] = useState<boolean>(false);

  // Scroll to the corresponding card when chapterIndex changes
  useEffect(() => {
    const targetCard = cardRefs.current[chapterIndex];
    if (targetCard && interacted) {
      targetCard.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  }, [chapterIndex, interacted]);

  return (
    <div
      onMouseEnter={() => {
        if (!interacted) setInteracted(true);
      }}
      className="my-10 h-min w-full flex flex-col gap-2 items-center justify-center"
    >
      <MotionSelector
        className="pt-2 pb-3 px-2 border-x-3  "
        chapterIndex={chapterIndex}
        setChapterIndex={setChapterIndex}
      />
      <ChapterCards
        setInteracted={setInteracted}
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
  chapter?: ChapterDataType;
  index?: number;
  chapterIndex: number;
  interacted?: boolean;
  setChapterIndex: (index: number) => void;
  setInteracted: (interact: boolean) => void;
}

interface ChapterCardProps extends ChapterProps {
  ref?: Ref<HTMLDivElement>;
}

interface ChapterDataType {
  university: string;
  est: number;
  location: string;
  website: string;
  github: string;
}

function ChapterCards({
  interacted,
  setInteracted,
  setChapterIndex,
  chapterIndex,
  cardRefs,
  ref,
}: {
  interacted?: boolean;
  setInteracted: (interact: boolean) => void;
  setChapterIndex: (index: number) => void;
  chapterIndex: number;
  cardRefs: RefObject<(HTMLDivElement | null)[]>;
  ref?: Ref<HTMLDivElement>;
}) {
  return (
    <motion.div
      ref={ref}
      className="overscroll-x-none flex flex-row w-full h-[400px] overflow-x-auto snap-x snap-mandatory justify-start"
    >
      {chapters.map((chapter, index) => {
        return (
          <MotionChapterCard
            setInteracted={setInteracted}
            chapter={chapter}
            key={index}
            index={index}
            chapterIndex={chapterIndex}
            setChapterIndex={setChapterIndex}
            ref={(el: HTMLDivElement | null) => {
              if (cardRefs.current) {
                cardRefs.current[index] = el;
              }
            }}
          />
        );
      })}
    </motion.div>
  );
}

const ChapterCard = ({
  ref,
  chapter,
  index,
  className,
  interacted,
  setInteracted,
  setChapterIndex,
}: ChapterCardProps) => {
  if (!chapter) return;

  return (
    <motion.div
      whileHover={{
        background: "var(--color-brand-black)",
      }}
      onMouseEnter={() => {
        setChapterIndex(index!);
        // if (!interacted) setInteracted(true);
      }}
      ref={ref}
      className={cn(
        className,
        " flex p-3 flex-none w-full h-full rounded-md bg-brand-blue justify-center snap-start mr-2 last:mr-0",
      )}
    >
      <a
        href="https://upenn.hack4impact.org"
        className="w-1/2 h-full rounded-sm flex flex-col p-2 gap-1 text-white mr-2"
      >
        <h1 className="text-3xl font-semibold w-full">{chapter.university}</h1>
        <p className="text-2xl w-full font-thin italic">
          Est. {chapter.est} in {chapter.location}
        </p>
        <div className="flex flex-auto"></div>
        <p className="text-3xl font-semibold w-full">Visit Chapter Website</p>
        <motion.div className="w-full h-10 border-1 rounded-sm"></motion.div>
      </a>
      <div className="w-1/2 h-full border-3 text-9xl place-content-center rounded-sm border-brand-blue-light"></div>
    </motion.div>
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
        chapterIndex == 0 ? "border-l-brand-red" : "border-l-brand-green",
        chapterIndex == chapters.length - 1
          ? "border-r-brand-red"
          : "border-r-brand-green",
        "overscroll-x-none flex relative flex-initial w-full h-min justify-start overflow-x-auto snap-x snap-mandatory",
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
              "scroll-ml-2 snap-start rounded-sm flex-none w-[120px] h-[80px] scroll-smooth mr-2 last:mr-0",
            )}
          ></motion.button>
        );
      })}
    </div>
  );
}

const MotionSelector = motion.create(Selector);
