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
          whileHover={{
            scale: 1.05,
          }}
          // Remove all color animations to prevent fade effects
          href="/apply/chapters"
          className="bg-transparent flex flex-initial justify-center items-center h-full w-full py-1 px-2 rounded-sm text-2xl font-medium"
          style={{
            // Set static styles instead of animating them
            color:
              pathname == "/apply/chapters"
                ? "white"
                : "var(--color-brand-black)",
          }}
        >
          Chapters
        </MotionLink>
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
          whileHover={{
            scale: 1.05,
          }}
          // Remove all color animations to prevent fade effects
          href="/apply/nonprofits"
          className="bg-transparent flex flex-initial justify-center items-center h-full w-full py-1 px-2 rounded-sm text-2xl font-medium"
          style={{
            // Set static styles instead of animating them
            color:
              pathname == "/apply/nonprofits"
                ? "white"
                : "var(--color-brand-black)",
          }}
        >
          Nonprofits
        </MotionLink>
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
