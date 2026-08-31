"use client"
import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { fadeUp, prefersReducedMotion, registerGsap } from "@/lib/animations";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "article" | "header" | "p" | "h2" | "h3";
};

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        el.style.opacity = "1";
        return;
      }
      fadeUp(el, {
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
    },
    { dependencies: [delay] },
  );

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}

export function useRefreshScroll() {
  useGSAP(() => {
    ScrollTrigger.refresh();
  });
}
