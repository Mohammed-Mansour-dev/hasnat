import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { drawLine, registerGsap } from "@/lib/animations";

export function GoldDivider({ className }: { className?: string }) {
  const ref = useRef<SVGLineElement>(null);

  useGSAP(() => {
    registerGsap();
    const line = ref.current;
    if (!line) return;
    drawLine(line, {
      scrollTrigger: {
        trigger: line,
        start: "top 90%",
        once: true,
      },
    });
  });

  return (
    <svg
      className={cn("h-[2px] w-24 overflow-visible", className)}
      viewBox="0 0 96 2"
      fill="none"
      aria-hidden="true"
    >
      <line
        ref={ref}
        x1="96"
        y1="1"
        x2="0"
        y2="1"
        stroke="#ECBD66"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
