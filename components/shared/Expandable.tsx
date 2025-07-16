import { expandableIcon, expandableTitle } from "@/data/animation";
import { AnimatePresence, Variants, motion } from "motion/react";
import { useState } from "react";

export default function Expandable({
  expandedColor = "var(--color-brand-blue)",
  closedColor = "var(--color-brand-blue-light)",
  hoverColor = "var(--color-brand-green)",
  title,
  content,
  identifier,
}: {
  expandedColor?: string;
  closedColor?: string;
  hoverColor?: string;
  title?: string;
  content?: string;
  identifier: string;
}) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const renderIcon = () => {
    return (
      <motion.svg
        variants={expandableIcon}
        className="w-5 h-5 text-brand-black scale-200"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        transition={{ duration: 0.2 }}
      >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </motion.svg>
    );
  };

  const customExpandableTitle: Variants | null = expandedColor
    ? {
        expanded: {
          background: expandedColor,
          color: "white",
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
        },
        closed: {
          background: closedColor,
          color: "var(--color-brand-black)",
          borderRadius: "8px",
        },
        expandedHover: { background: hoverColor, color: "white" },
        closedHover: {
          background: expandedColor,
          color: "white",
        },
      }
    : null;

  return (
    <div>
      <motion.div
        variants={customExpandableTitle || expandableTitle}
        onClick={() => setIsExpanded(!isExpanded)}
        initial="closed"
        animate={
          // Card color and radii for expanded card vs. not expanded card
          isExpanded ? "expanded" : "closed"
        }
        whileHover={
          // Hover state for expanded card vs. not expanded card

          isExpanded ? "expandedHover" : "closedHover"
        }
        className="flex flex-row mb-2 px-5 w-full h-20 justify-center items-center bg-brand-blue-light"
      >
        <p className="w-full h-full text-start content-center text-2xl color-brand-black font-medium">
          {title}
        </p>
        {renderIcon()}
      </motion.div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key={identifier}
            initial={{ height: 0 }}
            animate={{
              height: "auto",
              transition: {
                type: "spring",
              },
            }}
            exit={{ height: 0 }}
            className="w-full mb-5 rounded-b-md overflow-hidden"
          >
            <div className="p-5 w-full bg-brand-black min-h-20 text-start content-center text-2xl text-white color-white font-medium">
              <p>{content}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
