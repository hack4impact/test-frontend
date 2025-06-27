'use client'

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

interface InitiativeProps {
  title: string,
  content: string,
  footer: string,
  bg: string,
  color: string,
}

export default function Initiative(
  { title,
    content,
    footer,
    bg,
    color, }: InitiativeProps
) {
  return (
    <Card className={cn("w-1/3 min-h-100 gap-0 rounded-md shadow-none border-none hover:scale-105 transition-all", bg, color)}>
      <CardHeader>
        <CardTitle className="h-1/5 text-[35px] font-semibold">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-3/5 mt-5 text-[20px]">
        <p>
          {content}
        </p>
      </CardContent>
      <CardFooter className="h-1/5 mt-10 text-[30px] font-semibold leading-none">
        {footer}
      </CardFooter>
    </Card>
  )
};
