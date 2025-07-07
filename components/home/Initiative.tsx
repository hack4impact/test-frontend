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
import { useEffect, useRef } from "react";

interface InitiativeProps {
  title: string;
  content: string;
  footer: string;
  bg: string;
  color: string;
}

export default function Initiative({
  title,
  content,
  footer,
  bg,
  color,
}: InitiativeProps) {
  const boundingRef = useRef<DOMRect | null>(null);

  return (
    <Card
      onMouseLeave={(event) => {
        boundingRef.current = null;
      }}
      onMouseEnter={(event) => {
        boundingRef.current = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--filter", `drop-shadow(${bg})`);
      }}
      onMouseMove={(event) => {
        if (!boundingRef.current) return;

        const x = event.clientX - boundingRef.current.left;
        const y = event.clientY - boundingRef.current.top;
        const xPercent = x / boundingRef.current.width;
        const yPercent = y / boundingRef.current.height;
        const xRotation = (0.5 - xPercent) * 20;
        const yRotation = (yPercent - 0.5) * 20;

        event.currentTarget.style.setProperty(
          "--x-rotation",
          `${yRotation}deg`,
        );
        event.currentTarget.style.setProperty(
          "--y-rotation",
          `${xRotation}deg`,
        );

        // console.log(xRotation, yRotation)
      }}
      className={cn(
        `${bg} perspective[100px] min-h-100 w-1/3 rounded-md border-none shadow-none transition-transform ease-out hover:[transform:rotateX(var(--x-rotation))_rotateY(var(--y-rotation))_scale(1.05)]`,
        color,
      )}
    >
      <CardHeader>
        <CardTitle className="h-1/5 text-[35px] font-semibold">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-5 h-3/5 text-[20px]">
        <p>{content}</p>
      </CardContent>
      <CardFooter className="mt-10 h-1/5 text-[30px] leading-none font-semibold">
        {footer}
      </CardFooter>
    </Card>
  );
}
