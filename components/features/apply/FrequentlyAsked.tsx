"use client";

import Expandable from "@/components/shared/Expandable";
import { FAQ } from "@/types/contentful";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

export default function FrequentlyAsked({
  expandedColor,
  closedColor,
  hoverColor,
  items,
}: {
  expandedColor?: string;
  closedColor?: string;
  hoverColor?: string;
  items: FAQ[];
}) {
  return (
    <div className="my-10">
      {items.map((item: any, index: number) => {
        return (
          <Expandable
            expandedColor={expandedColor}
            closedColor={closedColor}
            hoverColor={hoverColor}
            title={item.question}
            content={documentToPlainTextString(item.answer.json)}
            key={index}
            identifier={`${index}`}
          ></Expandable>
        );
      })}
    </div>
  );
}
