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

interface FeatureProps {
  title: string;
  description: string;
  content: string;
  footer: string;
}

export default function Feature({
  title,
  description,
  content,
  footer,
}: FeatureProps) {
  return (
    <Card className="flex w-full flex-row bg-[#333] text-white transition-all hover:scale-103 hover:drop-shadow-xl">
      <div className="ml-5 h-full w-1/2 rounded-sm border-3 border-[#0085FF]" />
      <div className="flex w-1/2 flex-col">
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
      </div>
    </Card>
  );
}
