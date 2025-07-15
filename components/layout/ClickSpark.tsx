"use client";

import React, { useCallback, useEffect, useRef } from "react";

/**
 * Props for the ClickSpark component
 */
interface ClickSparkProps {
  /** Color of the spark particles */
  sparkColor?: string;
  /** Size of each spark particle */
  sparkSize?: number;
  /** Radius of the spark explosion */
  sparkRadius?: number;
  /** Number of spark particles */
  sparkCount?: number;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Easing function for the animation */
  easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
  /** Extra scale factor for the effect */
  extraScale?: number;
  /** Child components to render */
  children?: React.ReactNode;
}

/**
 * Individual spark particle data
 */
interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
}

/**
 * ClickSpark component that creates animated spark effects on click
 *
 * Creates a canvas overlay that shows animated spark particles when clicked.
 * The sparks radiate outward from the click position with customizable
 * appearance and animation properties.
 *
 * @example
 * ```tsx
 * <ClickSpark sparkColor="#10b875">
 *   <div>Click anywhere for sparks!</div>
 * </ClickSpark>
 * ```
 */
const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColor = "#fff",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1.0,
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animationRef = useRef<number>(null);

  /**
   * Easing function based on the selected easing type
   */
  const easeFunc = useCallback(
    (t: number): number => {
      switch (easing) {
        case "linear":
          return t;
        case "ease-in":
          return t * t;
        case "ease-in-out":
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        case "ease-out":
        default:
          return t * (2 - t);
      }
    },
    [easing],
  );

  /**
   * Set up canvas resizing to match parent element
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let resizeTimeout: NodeJS.Timeout;

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    // Use ResizeObserver for efficient resize handling
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(parent);

    // Initial resize
    resizeCanvas();

    return () => {
      resizeObserver.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

  /**
   * Animation loop for rendering sparks
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = (timestamp: number) => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw sparks
      sparksRef.current = sparksRef.current.filter((spark: Spark) => {
        const elapsed = timestamp - spark.startTime;

        // Remove expired sparks
        if (elapsed >= duration) {
          return false;
        }

        // Calculate animation progress
        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        // Calculate spark position and size
        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        // Draw spark
        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      // Continue animation if there are sparks
      if (sparksRef.current.length > 0) {
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    // Start animation loop if we have sparks
    if (sparksRef.current.length > 0) {
      animationRef.current = requestAnimationFrame(draw);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [sparkColor, sparkSize, sparkRadius, duration, easeFunc, extraScale]);

  /**
   * Handle click events to create new sparks
   */
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const now = performance.now();

      // Create new sparks in a circle pattern
      const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
        x,
        y,
        angle: (2 * Math.PI * i) / sparkCount,
        startTime: now,
      }));

      sparksRef.current.push(...newSparks);

      // Start animation loop if not already running
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame((timestamp) => {
          const canvas = canvasRef.current;
          if (!canvas) return;

          const ctx = canvas.getContext("2d");
          if (!ctx) return;

          const draw = (ts: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            sparksRef.current = sparksRef.current.filter((spark: Spark) => {
              const elapsed = ts - spark.startTime;
              if (elapsed >= duration) return false;

              const progress = elapsed / duration;
              const eased = easeFunc(progress);
              const distance = eased * sparkRadius * extraScale;
              const lineLength = sparkSize * (1 - eased);

              const x1 = spark.x + distance * Math.cos(spark.angle);
              const y1 = spark.y + distance * Math.sin(spark.angle);
              const x2 =
                spark.x + (distance + lineLength) * Math.cos(spark.angle);
              const y2 =
                spark.y + (distance + lineLength) * Math.sin(spark.angle);

              ctx.strokeStyle = sparkColor;
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.stroke();

              return true;
            });

            if (sparksRef.current.length > 0) {
              animationRef.current = requestAnimationFrame(draw);
            } else {
              animationRef.current = null;
            }
          };

          draw(timestamp);
        });
      }
    },
    [
      sparkCount,
      sparkColor,
      sparkSize,
      sparkRadius,
      duration,
      easeFunc,
      extraScale,
    ],
  );

  return (
    <div className="relative h-full w-full" onClick={handleClick}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-20"
        aria-hidden="true"
      />
      {children}
    </div>
  );
};

export default ClickSpark;
