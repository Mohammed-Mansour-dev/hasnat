import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  registered = true;
}

if (typeof window !== "undefined") {
  registerGsap();
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function toElements(targets: gsap.TweenTarget): Element[] {
  return (gsap.utils.toArray(targets) as Element[]).filter(Boolean);
}

function isInView(el: Element, offset = 0.92): boolean {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * offset && rect.bottom > 0;
}

export function fadeUp(
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars = {},
): gsap.core.Tween | undefined {
  registerGsap();
  const els = toElements(targets);
  if (!els.length) return;

  if (prefersReducedMotion()) {
    gsap.set(els, { opacity: 1, y: 0 });
    return;
  }

  const { scrollTrigger, ...rest } = vars;
  const triggerConfig =
    scrollTrigger && typeof scrollTrigger === "object"
      ? (scrollTrigger as ScrollTrigger.Vars)
      : null;

  if (triggerConfig) {
    const triggerEl =
      (typeof triggerConfig.trigger === "string"
        ? document.querySelector(triggerConfig.trigger)
        : (triggerConfig.trigger as Element | undefined)) ?? els[0];

    if (triggerEl && isInView(triggerEl)) {
      return gsap.fromTo(
        els,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", ...rest },
      );
    }

    gsap.set(els, { opacity: 0, y: 30 });
    const safety = window.setTimeout(() => {
      gsap.to(els, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out", overwrite: "auto" });
    }, 1800);

    ScrollTrigger.create({
      ...triggerConfig,
      trigger: triggerEl,
      once: true,
      onEnter: () => {
        window.clearTimeout(safety);
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          ...rest,
        });
      },
    });
    return;
  }

  return gsap.fromTo(
    els,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1, ease: "power3.out", ...rest },
  );
}

export function staggerReveal(
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars = {},
): gsap.core.Tween | undefined {
  registerGsap();
  const els = toElements(targets);
  if (!els.length) return;

  if (prefersReducedMotion()) {
    gsap.set(els, { opacity: 1, y: 0 });
    return;
  }

  const { scrollTrigger, ...rest } = vars;
  const triggerConfig =
    scrollTrigger && typeof scrollTrigger === "object"
      ? (scrollTrigger as ScrollTrigger.Vars)
      : null;

  if (triggerConfig) {
    const triggerEl =
      (typeof triggerConfig.trigger === "string"
        ? document.querySelector(triggerConfig.trigger)
        : (triggerConfig.trigger as Element | undefined)) ?? els[0];

    if (triggerEl && isInView(triggerEl)) {
      return gsap.fromTo(
        els,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12, ...rest },
      );
    }

    gsap.set(els, { opacity: 0, y: 24 });
    const safety = window.setTimeout(() => {
      gsap.to(els, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, overwrite: "auto" });
    }, 1800);

    ScrollTrigger.create({
      ...triggerConfig,
      trigger: triggerEl,
      once: true,
      onEnter: () => {
        window.clearTimeout(safety);
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          ...rest,
        });
      },
    });
    return;
  }

  return gsap.fromTo(
    els,
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12, ...rest },
  );
}

export function revealText(
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars = {},
): gsap.core.Tween | undefined {
  return fadeUp(targets, vars);
}

export function drawLine(
  line: SVGGeometryElement,
  vars: gsap.TweenVars = {},
): gsap.core.Tween | undefined {
  registerGsap();
  const length = line.getTotalLength();
  gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
  if (prefersReducedMotion()) {
    gsap.set(line, { strokeDashoffset: 0 });
    return;
  }
  return gsap.to(line, {
    strokeDashoffset: 0,
    duration: 1.25,
    ease: "power2.inOut",
    ...vars,
  });
}

export function parallax(
  target: gsap.TweenTarget,
  vars: { yPercent?: number; trigger?: Element | string } = {},
): ScrollTrigger | undefined {
  registerGsap();
  if (prefersReducedMotion()) return;
  const { yPercent = 12, trigger } = vars;
  return ScrollTrigger.create({
    trigger: trigger ?? (target as Element),
    start: "top bottom",
    end: "bottom top",
    scrub: 0.6,
    animation: gsap.fromTo(target, { yPercent: -yPercent }, { yPercent, ease: "none" }),
  });
}

export { gsap, ScrollTrigger };
