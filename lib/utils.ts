import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function splitText(elements: NodeListOf<Element>) {
  const words: HTMLSpanElement[] = [];

  elements.forEach((element) => {
    const text = element.textContent;

    if (!text) return;
    const splitWords = text.split(/(\s+)/); // Split on whitespace but keep the whitespace

    // Clear the original content
    element.innerHTML = "";

    splitWords.forEach((word) => {
      if (word.trim()) {
        // If it's not just whitespace
        const span = document.createElement("span");
        span.textContent = word;
        span.style.display = "inline-block";
        span.style.opacity = "0"; // Start invisible for animation
        element.appendChild(span);
        words.push(span);
      } else {
        // Add whitespace as text node to preserve spacing
        element.appendChild(document.createTextNode(word));
      }
    });
  });

  return { words };
}
