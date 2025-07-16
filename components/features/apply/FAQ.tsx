import Expandable from "@/components/shared/Expandable";

export default function FAQ({
  expandedColor,
  closedColor,
  hoverColor,
  items,
}: {
  expandedColor?: string;
  closedColor?: string;
  hoverColor?: string;
  items: any;
}) {
  return (
    <div className="my-10">
      {items.faq.map((item: any, index: number) => {
        return (
          <Expandable
            expandedColor={expandedColor}
            closedColor={closedColor}
            hoverColor={hoverColor}
            title={item.question}
            content={item.answer}
            key={index}
            identifier={`q-${index}`}
          ></Expandable>
        );
      })}
    </div>
  );
}
