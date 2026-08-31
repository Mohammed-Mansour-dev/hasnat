import { useId } from "react";
import { cn } from "@/lib/utils";

export function IslamicPattern({
  className,
  opacity = 0.07,
  color = "gold",
}: {
  className?: string;
  opacity?: number;
  color?: "gold" | "ink" | "ivory";
}) {
  const id = useId();
  const fill =
    color === "ink" ? "#080807" : color === "ivory" ? "#FCFAF5" : "#ECBD66";

  return (
    <svg
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={id}
          width="88"
          height="88"
          patternUnits="userSpaceOnUse"
        >
          <g fill="none" stroke={fill} strokeWidth="0.8" opacity={opacity}>
            <polygon points="44,8 68,20 76,44 68,68 44,80 20,68 12,44 20,20" />
            <rect x="28" y="28" width="32" height="32" />
            <rect
              x="28"
              y="28"
              width="32"
              height="32"
              transform="rotate(45 44 44)"
            />
            <circle cx="44" cy="44" r="6" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export function StarMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      className={cn("text-gold", className)}
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter">
        <polygon points="40,6 64.5,15.5 74,40 64.5,64.5 40,74 15.5,64.5 6,40 15.5,15.5" />
        <rect x="22" y="22" width="36" height="36" />
        <rect
          x="22"
          y="22"
          width="36"
          height="36"
          transform="rotate(45 40 40)"
        />
        <circle cx="40" cy="40" r="8.5" />
      </g>
    </svg>
  );
}
