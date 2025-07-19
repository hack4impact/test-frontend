"use client";

import { MotionConfig, useReducedMotion } from "framer-motion";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface MotionContextType {
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
}

const MotionContext = createContext<MotionContextType | undefined>(undefined);

export const useMotion = () => {
  const context = useContext(MotionContext);
  if (!context) {
    throw new Error("useMotion must be used within a MotionProvider");
  }
  return context;
};

interface MotionProviderProps {
  children: ReactNode;
}

export const MotionProvider = ({ children }: MotionProviderProps) => {
  const [reducedMotion, setReducedMotion] = useState(false);

  // Load preference from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("reducedMotion");
    if (saved !== null) {
      setReducedMotion(JSON.parse(saved));
    } else {
      // Respect system preference
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      setReducedMotion(prefersReduced);
    }
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    localStorage.setItem("reducedMotion", JSON.stringify(reducedMotion));
  }, [reducedMotion]);

  const toggleReducedMotion = () => {
    setReducedMotion((prev) => !prev);
    console.log(reducedMotion);
  };

  return (
    <MotionContext.Provider value={{ reducedMotion, toggleReducedMotion }}>
      <MotionConfig reducedMotion={reducedMotion ? "always" : "never"}>
        {children}
      </MotionConfig>
    </MotionContext.Provider>
  );
};
