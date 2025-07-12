import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Ref, useState } from "react";

export const MotionInitiativeCard = motion.create(InitiativeCard);

export function InitiativeCard({
  title = "National Initiative",
  content = "To empower engineers, designers, activists, and humanitarians to create lasting and impactful social change, fostering the wider adoption of software as a tool for social good.",
  footer = "Learn More",
  ref,
  imgBorder = "border-brand-black",
}: {
  title?: string;
  content?: string;
  footer?: string;
  ref?: Ref<HTMLDivElement>;
  imgBorder?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      ref={ref}
      className="w-full h-[200px] flex flex-row gap-5"
    >
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 100 }}
        className={cn(
          "flex w-1/2 h-full border-3 rounded-sm backdrop-blur-[2px]",
          imgBorder,
        )}
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 100 }}
        className="flex w-1/2 h-full flex-col justify-stretch"
      >
        <h3 className="flex flex-none mb-2 text-4xl font-semibold">{title}</h3>
        <p className="flex flex-auto text-xl">{content}</p>
        <motion.div
          className={cn("flex flex-none items-end text-2xl font-semibold")}
        >
          <p className="relative flex items-end">
            {footer}
            <motion.span
              animate={
                hovered
                  ? {
                      width: "100%",
                    }
                  : { width: "0%" }
              }
              className="absolute border-b-3 border-b-brand-blue"
            />
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
