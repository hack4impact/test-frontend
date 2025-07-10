"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { forwardRef } from "react";

export interface TiltCardProps {
  title: string;
  content: string;
  footer: string;
  bgColor: string;
  textColor: string;
}

const TiltCard = forwardRef<HTMLDivElement, TiltCardProps>(
  ({ title, content, footer, bgColor, textColor }, ref) => {
    return (
      // Container div provides perspective and handles mouseEvents
      <motion.div
        ref={ref}
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.98,
        }}
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const xPercent = x / rect.width;
          const yPercent = y / rect.height;
          const xRotation = (0.5 - xPercent) * 5;
          const yRotation = (yPercent - 0.5) * 5;

          event.currentTarget.style.setProperty(
            "--x-rotation",
            `${yRotation}deg`,
          );
          event.currentTarget.style.setProperty(
            "--y-rotation",
            `${xRotation}deg`,
          );
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.setProperty("--x-rotation", "0deg");
          event.currentTarget.style.setProperty("--y-rotation", "0deg");
        }}
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
        className="w-1/3"
      >
        <motion.div // Inner div is the one that actually does the rotation based on the outer div
          animate={{
            rotateX: "var(--x-rotation, 0deg)",
            rotateY: "var(--y-rotation, 0deg)",
          }}
          style={{
            background: bgColor,
          }}
          className={cn(`h-full rounded-md border-none`)}
        >
          <Card
            style={{
              color: textColor,
            }}
            className={`flex h-full border-none bg-transparent shadow-none`}
          >
            <CardHeader>
              <CardTitle className="h-1/5 flex-auto text-[35px] font-semibold">
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-5 h-3/5 flex-auto text-[20px]">
              <p>{content}</p>
            </CardContent>
            <CardFooter className="mt-10 h-1/5 flex-auto text-[30px] leading-none font-semibold">
              {footer}
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    );
  },
);

TiltCard.displayName = "TiltCard";

export default TiltCard;
