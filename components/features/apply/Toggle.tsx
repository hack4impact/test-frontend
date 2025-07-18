import { cn } from "@/lib/utils";
import { Transition, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MotionLink = motion.create(Link);
const hoverTransition: Transition = {
  duration: 0.2,
  ease: [0.4, 0, 0.2, 1],
};

export default function Toggle() {
  const pathname = usePathname();

  return (
    <div className="z-1 p-[2px] bg-brand-red-light/50 h-full flex flex-row gap-3 items-center border-2 border-brand-red rounded-md">
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
          href="/apply/chapters"
          className="bg-transparent flex flex-initial justify-center items-center h-full w-full py-1 px-2 rounded-sm text-2xl font-medium  "
        >
          Chapters
        </MotionLink>
        {pathname == "/apply/chapters" && (
          <motion.div
            layoutId="toggled"
            className={cn("rounded-sm absolute inset-0 z-[-1] bg-brand-red")}
            initial={false}
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
          href="/apply/nonprofits"
          className="bg-transparent flex flex-initial justify-center items-center h-full w-full py-1 px-2 rounded-sm text-2xl font-medium "
        >
          Nonprofits
        </MotionLink>
        {pathname == "/apply/nonprofits" && (
          <motion.div
            layoutId="toggled"
            className={cn("rounded-sm absolute inset-0 z-[-1] bg-brand-red")}
            initial={false}
            transition={hoverTransition}
          />
        )}
      </div>
    </div>
  );
}
