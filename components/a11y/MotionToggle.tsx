"use client";

import { useMotion } from "@/contexts/MotionContext";

export const MotionToggle = () => {
  const { reducedMotion, toggleReducedMotion } = useMotion();

  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={reducedMotion}
        onChange={toggleReducedMotion}
        className="sr-only"
      />
      <div
        className={`relative w-14 h-8 rounded-full transition-colors duration-200 ${
          reducedMotion ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200 ${
            reducedMotion ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </div>
      <span className="ml-3 text-sm font-medium">Reduced Motion</span>
    </label>
  );
};
