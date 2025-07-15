import { cn } from "@/lib/utils";
import { useId } from "react";

/**
 * Props for the GridPattern component
 */
interface GridPatternProps extends React.SVGProps<SVGSVGElement> {
  /** Grid cell width */
  width?: number;
  /** Grid cell height */
  height?: number;
  /** X offset for the pattern */
  x?: number;
  /** Y offset for the pattern */
  y?: number;
  /** Coordinates of squares to highlight */
  squares?: Array<[x: number, y: number]>;
  /** Stroke dash array for line styling */
  strokeDasharray?: string;
  /** Color for grid lines */
  gridColor?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Simple grid pattern component for background decoration
 *
 * Creates an SVG-based grid pattern that can be used as a background element.
 * Supports customizable grid size, spacing, and highlighted squares.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <GridPattern gridColor="stroke-brand-blue-light" style={{ zIndex: -10 }} />
 *
 * // With custom size
 * <GridPattern width={60} height={60} gridColor="stroke-gray-300" />
 *
 * // With highlighted squares
 * <GridPattern squares={[[0, 0], [1, 1]]} gridColor="stroke-brand-blue" />
 * ```
 */
export function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = "0",
  squares,
  gridColor,
  className,
  ...props
}: GridPatternProps) {
  const id = useId();

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30",
        gridColor || "stroke-gray-400/25",
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>

      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />

      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([squareX, squareY]) => (
            <rect
              strokeWidth="0"
              key={`${squareX}-${squareY}`}
              width={width - 1}
              height={height - 1}
              x={squareX * width + 1}
              y={squareY * height + 1}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
