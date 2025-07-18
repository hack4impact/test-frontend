import { cn } from "@/lib/utils";
import { AnimatePresence, LayoutGroup, Transition, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ref } from "react";

const MotionLink = motion.create(Link);
const hoverTransition: Transition = {
  duration: 0.1,
  ease: [0.3, 0, 0.2, 0.5],
  opacity: { duration: 0 },
};

export function Toggle({ ref }: { ref: Ref<HTMLDivElement> }) {
  const pathname = usePathname();

  return (
    <motion.div
      ref={ref}
      className="z-1 p-[2px] bg-brand-red-light/50 h-full flex flex-row gap-3 items-center border-2 border-brand-red rounded-md"
    >
      <div className="relative h-full content-center">
        <MotionLink
          whileHover={
            pathname != "/apply/chapters"
              ? {
                  background: "var(--color-brand-black)",
                  color: "white",
                }
              : {
                  scale: 1.05,
                }
          }
          initial={
            pathname == "/apply/chapters"
              ? { color: "white" }
              : {
                  color: "var(--color-brand-black)",
                }
          }
          animate={
            pathname == "/apply/chapters"
              ? { color: "white" }
              : {
                  color: "var(--color-brand-black)",
                }
          }
          href="/apply/chapters"
          className="bg-transparent flex flex-initial justify-center items-center h-full w-full py-1 px-2 rounded-sm text-2xl font-medium  "
        >
          Chapters
        </MotionLink>{" "}
        {pathname == "/apply/chapters" && (
          <motion.div
            layout
            layoutId="toggled"
            className={cn("rounded-sm absolute inset-0 z-[-1] bg-brand-red")}
            transition={hoverTransition}
          />
        )}
      </div>
      <div className="relative h-full content-center">
        <MotionLink
          whileHover={
            pathname != "/apply/nonprofits"
              ? {
                  background: "var(--color-brand-black)",
                  color: "white",
                }
              : {
                  scale: 1.05,
                }
          }
          initial={
            pathname == "/apply/nonprofits"
              ? { color: "white" }
              : {
                  color: "var(--color-brand-black)",
                }
          }
          animate={
            pathname == "/apply/nonprofits"
              ? { color: "white" }
              : {
                  color: "var(--color-brand-black)",
                }
          }
          href="/apply/nonprofits"
          className="bg-transparent flex flex-initial justify-center items-center h-full w-full py-1 px-2 rounded-sm text-2xl font-medium "
        >
          Nonprofits
        </MotionLink>{" "}
        {pathname == "/apply/nonprofits" && (
          <motion.div
            layout
            layoutId="toggled"
            className={cn("rounded-sm absolute inset-0 z-[-1] bg-brand-red")}
            transition={hoverTransition}
          />
        )}
      </div>
    </motion.div>
  );
}

export const MotionToggle = motion.create(Toggle);
