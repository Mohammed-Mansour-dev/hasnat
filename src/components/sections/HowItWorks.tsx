"use client"
import { useCallback, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { copy } from "@/data/site";
import { steps } from "@/data/steps";
import { gsap, prefersReducedMotion, registerGsap, ScrollTrigger, staggerReveal } from "@/lib/animations";
import type { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

 function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "start";
  light?: boolean;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-start",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-4 text-[13px] font-medium tracking-[0.28em]",
            light ? "text-gold-soft" : "text-gold-deep",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-3xl leading-snug sm:text-4xl md:text-[2.6rem]",
          light ? "text-ivory" : "text-ink",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            light ? "text-ivory/75" : "text-muted",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}

export function HowItWorks() {
  const root = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const mobileFillRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const setStepRef = useCallback((node: HTMLLIElement | null, index: number) => {
    stepRefs.current[index] = node;
  }, []);

  useGSAP(
    () => {
      registerGsap();
      const el = root.current;
      const list = listRef.current;
      if (!el || !list) return;

      const stepEls = stepRefs.current.filter((node): node is HTMLLIElement => Boolean(node));
      const introEl = el.querySelector("[data-intro]");

      staggerReveal([introEl, ...stepEls].filter(Boolean) as Element[], {
        scrollTrigger: { trigger: el, start: "top 78%", once: true },
      });

      const reduced = prefersReducedMotion();
      setReducedMotion(reduced);
      if (reduced) return;

      if (progressFillRef.current) {
        gsap.fromTo(
          progressFillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: list, start: "top center", end: "bottom center", scrub: 0.4 },
          },
        );
      }

      if (mobileFillRef.current) {
        gsap.fromTo(
          mobileFillRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: list, start: "top center", end: "bottom center", scrub: 0.4 },
          },
        );
      }

      stepEls.forEach((stepEl, index) => {
        ScrollTrigger.create({
          trigger: stepEl,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActiveIndex(index);
          },
          onEnterBack: () => setActiveIndex(index),
        });
      });

      ScrollTrigger.refresh();
    },
    { scope: root, dependencies: [steps.length] },
  );

  const total = steps.length;

  return (
    <section id={copy.how.id} ref={root} className="bg-sand py-20 sm:py-28 lg:py-36">
      <div className="mx-auto w-full max-w-295 px-5 sm:px-8">
        <div className="lg:grid lg:grid-cols-[360px_1fr] lg:gap-20">
          {/* Sticky intro + progress */}
          <div data-intro className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow={copy.how.eyebrow}
              title={copy.how.title}
              subtitle={copy.how.subtitle}
              align="start"
            />

            {/* Desktop vertical progress */}
            <div
              className="mt-14 hidden items-start gap-6 lg:flex"
              role="group"
              aria-label={`الخطوة ${activeIndex + 1} من ${total}`}
            >
              <div aria-hidden="true" className="relative h-56 w-px shrink-0 bg-sand-deep">
                <div
                  ref={progressFillRef}
                  className="absolute inset-x-0 top-0 h-full w-px origin-top scale-y-0 bg-gold"
                />
              </div>
              <div className="pt-1">
                <p className="text-2xl text-ink">
                  {String(activeIndex + 1).padStart(2, "0")}
                  <span className="mx-1 text-gold-deep">/</span>
                  <span className="text-muted">{String(total).padStart(2, "0")}</span>
                </p>
                <p className="mt-2 max-w-[11rem] text-sm leading-relaxed text-muted">
                  {steps[activeIndex]?.title}
                </p>
              </div>
            </div>

            {/* Mobile horizontal progress */}
            <div
              className="mt-8 lg:hidden"
              role="group"
              aria-label={`الخطوة ${activeIndex + 1} من ${total}`}
            >
              <div className="flex items-center justify-between text-sm text-muted">
                <span>
                  <span className="text-ink">{String(activeIndex + 1).padStart(2, "0")}</span>
                  <span className="mx-1">/</span>
                  {String(total).padStart(2, "0")}
                </span>
              </div>
              <div aria-hidden="true" className="relative mt-3 h-px w-full bg-sand-deep">
                <div
                  ref={mobileFillRef}
                  className="absolute inset-y-0 right-0 h-px w-full origin-right scale-x-0 bg-gold"
                />
              </div>
            </div>
          </div>

          {/* Steps */}
          <ol ref={listRef} className="mt-14 lg:mt-0">
            {steps.map((step, index) => {
              const isActive = reducedMotion || index === activeIndex;
              const isDone = !reducedMotion && index < activeIndex;

              return (
                <li
                  key={step.number}
                  ref={(node) => setStepRef(node, index)}
                  data-step
                  className={cn(
                    "border-t border-sand-deep py-10 first:border-t-0",
                    "lg:flex lg:min-h-[70vh] lg:flex-col lg:justify-center lg:border-t-0 lg:border-b lg:py-0 lg:last:border-b-0",
                  )}
                >
                  <span
                    className={cn(
                      "block text-5xl leading-none transition-colors duration-500 sm:text-6xl lg:text-7xl",
                      isActive ? "text-gold-deep" : isDone ? "text-gold-soft" : "text-sand-deep",
                    )}
                  >
                    {String(step.number).padStart(2, "0")}
                  </span>
                  <h3
                    className={cn(
                      "mt-5 text-xl transition-colors duration-500 sm:text-2xl",
                      isActive ? "text-ink" : "text-muted",
                    )}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-3 max-w-md text-[15px] leading-relaxed text-muted transition-opacity duration-500 sm:text-base",
                      isActive ? "opacity-100" : "opacity-70",
                    )}
                  >
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}