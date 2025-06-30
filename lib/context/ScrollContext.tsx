'use client'

import { createContext, useState, useEffect, ReactNode, useContext, useRef } from "react";

const ScrollContext = createContext(false);

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [scroll, setScroll] = useState(false);
  const navRef = useRef<Element | null>(null);
  const pageRef = useRef<Element | null>(null);

  useEffect(() => {

    if (!navRef.current) {
      navRef.current = document.getElementById("nav");
    }

    if (!pageRef.current) {
      pageRef.current = document.getElementById("page");
    }

    if (!pageRef.current || !navRef.current) return;


    function updateNav(entries: IntersectionObserverEntry[]) {
      if (!pageRef.current || !navRef.current) return;

      const [entry] = entries;

      if (!entry.isIntersecting) {
        setScroll(true)
        navRef?.current.classList.add("bg-[#0085FF]", "mt-5", "w-[calc(100%-80px)]", "rounded-sm", "drop-shadow-md");
        navRef?.current.classList.remove("bg-transparent", "w-screen");
      } else {
        setScroll(false)
        navRef?.current.classList.remove("bg-[#0085FF]", "mt-5", "w-[calc(100%-80px)]", "rounded-sm", "drop-shadow-md");
        navRef?.current.classList.add("bg-transparent", "w-screen");
      }

    };

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5
    }

    const navObserver = new IntersectionObserver(updateNav, options);

    navObserver.observe(pageRef.current);

    return () => {
      navObserver.disconnect();
    };

  }, []);

  return (
    <ScrollContext value={scroll}>
      {children}
    </ScrollContext>);
}

export function useScroll() {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
}
