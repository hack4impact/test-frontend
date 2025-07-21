import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const wrap = (length: number, index: number) => {
  if (index < 0) {
    return length + (index % length);
  } else {
    return index % length;
  }
};

export function CircleCarousel() {
  const items = ["A", "B", "C", "D", "F"]; // Added more items to demonstrate
  const [centerIndex, setCenterIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [previousCardStates, setPreviousCardStates] = useState<
    Record<number, string>
  >({});

  // Controls the gap between cards
  const cardSpacing = 400;

  // Controls how much the side cards are scaled down (depth effect)
  const sideCardScale = 0.95;

  // Off-screen positions for entrance/exit animations
  const offScreenLeft = -800;
  const offScreenRight = 800;

  const handleChange = async (clickedIndex: number) => {
    if (isAnimating) return; // Prevent clicks during animation

    // Determine if we clicked left or right of center
    const totalCards = items.length;
    const leftIndex = wrap(totalCards, centerIndex - 1);
    const rightIndex = wrap(totalCards, centerIndex + 1);

    if (clickedIndex === leftIndex) {
      // Clicked left card - rotate left (decrement center)
      setIsAnimating(true);
      setCenterIndex(wrap(totalCards, centerIndex - 1));
      setTimeout(() => setIsAnimating(false), 300); // Match animation duration
    } else if (clickedIndex === rightIndex) {
      // Clicked right card - rotate right (increment center)
      setIsAnimating(true);
      setCenterIndex(wrap(totalCards, centerIndex + 1));
      setTimeout(() => setIsAnimating(false), 300); // Match animation duration
    }
    // If clicked center card, do nothing
  };

  /**
   * Scroll to the selected values card
   */
  const scrollToCard = useCallback((index: number) => {
    const targetCard = cardRefs.current[index];
    if (targetCard) {
      targetCard.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  }, []);

  /**
   * Set up card ref
   */
  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  };

  // Calculate positions for circular layout
  const getCardPosition = (index: number) => {
    const totalCards = items.length;
    const radius = 120; // Distance from center
    const angleStep = (2 * Math.PI) / totalCards;
    const angle = index * angleStep - Math.PI / 2; // Start from top

    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    return { x, y };
  };

  // Determine which cards are visible and their states
  const getCardState = (index: number) => {
    const totalCards = items.length;
    const center = centerIndex;
    const left = wrap(totalCards, centerIndex - 1);
    const right = wrap(totalCards, centerIndex + 1);

    let currentPosition: string;
    let cardState: any;

    if (index === center) {
      currentPosition = "center";
      cardState = {
        position: "center",
        x: 0,
        y: -15,
        scale: 1,
        zIndex: 3,
        visible: true,
        rotate: 0,
      };
    } else if (index === left) {
      currentPosition = "left";
      cardState = {
        position: "left",
        x: -cardSpacing,
        y: 15,
        scale: sideCardScale,
        zIndex: 2,
        visible: true,
        rotate: -5,
      };
    } else if (index === right) {
      currentPosition = "right";
      cardState = {
        position: "right",
        x: cardSpacing,
        y: 15,
        scale: sideCardScale,
        zIndex: 2,
        visible: true,
        rotate: 5,
      };
    } else {
      // Determine if this card should be off-screen left or right
      // Cards that would be "next" on the left side should be off-screen left
      const distanceFromCenter = (index - center + totalCards) % totalCards;
      const isOnLeftSide = distanceFromCenter > totalCards / 2;

      currentPosition = isOnLeftSide ? "offscreen-left" : "offscreen-right";
      cardState = {
        position: currentPosition,
        x: isOnLeftSide ? offScreenLeft : offScreenRight,
        y: 65,
        scale: sideCardScale,
        zIndex: 1,
        visible: true,
        rotate: isOnLeftSide ? -10 : 10,
      };
    }

    // Check if this card is transitioning between two off-screen positions
    const previousPosition = previousCardStates[index];
    const isOffscreenToOffscreen =
      (previousPosition === "offscreen-left" ||
        previousPosition === "offscreen-right") &&
      (currentPosition === "offscreen-left" ||
        currentPosition === "offscreen-right") &&
      previousPosition !== currentPosition;

    // Set transition based on whether it's an off-screen to off-screen transition
    cardState.transition = isOffscreenToOffscreen
      ? { duration: 0 } // No animation for off-screen to off-screen
      : { duration: 0.3, ease: "easeInOut" }; // Normal animation for all other cases

    return cardState;
  };

  return (
    <div className="relative w-full h-150 flex justify-center items-center border-2 border-gray-300 overflow-hidden">
      {items.map((item, index) => {
        const cardState = getCardState(index);

        // Update previous states after getting current state
        useEffect(() => {
          setPreviousCardStates((prev) => ({
            ...prev,
            [index]: cardState.position,
          }));
        }, [centerIndex, index, cardState.position]);

        return (
          <motion.div
            key={`${item}-${index}`} // Include index to help with animations
            ref={setCardRef(index)}
            onClick={() => handleChange(index)}
            style={{
              position: "absolute",
              zIndex: cardState.zIndex,
              transformOrigin: "center",
            }}
            className={`border-2 w-80 h-4/5 flex items-center justify-center bg-white rounded-lg cursor-pointer text-lg font-bold
              ${cardState.position === "center" ? "border-blue-500 bg-blue-50" : "border-gray-300"}
              ${cardState.visible ? "" : "pointer-events-none"}
            `}
            initial={{
              opacity: cardState.visible ? 1 : 0,
              scale: cardState.scale,
              x: cardState.x,
              y: cardState.y,
              rotateZ: cardState.rotate,
            }}
            animate={{
              opacity: cardState.visible ? 1 : 0,
              scale: cardState.scale,
              x: cardState.x,
              y: cardState.y,
              rotateZ: cardState.rotate,
            }}
            transition={cardState.transition}
          >
            {item}
          </motion.div>
        );
      })}

      {/* Instructions */}
      <div className="absolute bottom-4 text-sm text-gray-600 text-center">
        Click the left card to rotate left, right card to rotate right
      </div>
    </div>
  );
}

export default CircleCarousel;
