"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { copy } from "@/data/site";
import { formatPrice, formatQuantity } from "@/lib/format";
import { selectTotalPrice, useOrderStore } from "@/lib/order-store";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { packages, UNIT_PRICE_SAR } from "@/data/packages";
import { Check } from "lucide-react";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  staggerReveal,
} from "@/lib/animations";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Packages() {
  const rootRef = useRef<HTMLElement>(null);

  const quantity = useOrderStore((s: any) => s.packageQuantity);
  const setPackage = useOrderStore((s: any) => s.setPackage);
  const total = selectTotalPrice(quantity);

  // GSAP Entrance Animations
  useGSAP(
    () => {
      registerGsap();
      const root = rootRef.current;
      if (!root) return;

      if (prefersReducedMotion()) return;

      const revealElements = root.querySelectorAll("[data-pkg-reveal]");
      if (revealElements.length > 0) {
        staggerReveal(revealElements, {
          scrollTrigger: {
            trigger: root,
            start: "top 80%",
            once: true,
          },
        });
      }
    },
    { scope: rootRef },
  );

  return (
    <section
      id={copy.packages.id}
      ref={rootRef}
      className="relative bg-ivory py-24 sm:py-32 border-t border-sand-deep/40 text-ink dir-rtl select-none"
    >
      <Container>
        {/* Editorial Section Header */}
        <header
          data-pkg-reveal
          className="max-w-2xl mx-auto text-center mb-16 sm:mb-20"
        >
          {copy.packages.eyebrow && (
            <p className="mb-3 text-[12px] font-semibold tracking-[0.25em] text-gold-deep uppercase">
              {copy.packages.eyebrow}
            </p>
          )}
          <h2 className="text-3xl font-light leading-tight sm:text-4xl md:text-5xl text-ink tracking-tight">
            {copy.packages.title}
          </h2>
          {copy.packages.subtitle && (
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted font-normal max-w-xl mx-auto">
              {copy.packages.subtitle}
            </p>
          )}
        </header>

        {/* Package Grid */}
        <div
          data-pkg-reveal
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          role="listbox"
          aria-label={copy.packages.title}
        >
          {packages.map((item) => {
            const isSelected = quantity === item.quantity;
            return (
              <button
                key={item.quantity}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => setPackage(item.quantity)}
                className={cn(
                  "group relative flex flex-col justify-between min-h-[220px] p-6 text-start transition-all duration-300 rounded-sm border cursor-pointer",
                  isSelected
                    ? "border-gold bg-sand/40 shadow-xs"
                    : "border-sand-deep/50 bg-paper/60 hover:border-gold/60 hover:bg-paper",
                )}
              >
                {/* Checkmark Indicator Badge */}
                <div className="flex items-center justify-between w-full mb-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-muted/70">
                    باقة
                  </span>
                  <span
                    className={cn(
                      "flex size-6 items-center justify-center rounded-full border transition-all duration-300",
                      isSelected
                        ? "border-gold bg-gold text-ink scale-100"
                        : "border-sand-deep/80 text-transparent scale-90 group-hover:border-gold/50",
                    )}
                    aria-hidden="true"
                  >
                    <Check className="size-3.5" strokeWidth={2.5} />
                  </span>
                </div>

                {/* Quantity Count */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-light font-mono tabular-nums text-ink">
                      {item.quantity}
                    </span>
                    <span className="text-sm font-normal text-muted">
                      {item.quantity === 1 ? "مصحف" : "مصاحف"}
                    </span>
                  </div>
                </div>

                {/* Pricing Details */}
                <div className="mt-8 pt-4 border-t border-sand-deep/40 flex flex-col gap-0.5">
                  <span className="text-lg font-medium font-mono tabular-nums text-ink">
                    {formatPrice(item.price)}
                    <svg
                      className="riyal-svg"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1124.14 1256.39"
                      width="13"
                      height="14"
                      style={{ display: "inline-block", verticalAlign: "-0.125em" }}
                    >
                      <path
                        fill="currentColor"
                        d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"
                      ></path>
                      <path
                        fill="currentColor"
                        d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"
                      ></path>
                    </svg>
                  </span>
                  <span className="text-[12px] text-muted/80">
                    {UNIT_PRICE_SAR} {copy.packages.unitLabel}
                  </span>
                </div>

                {/* Subtle Bottom Accent Indicator */}
                <div
                  className={cn(
                    "absolute bottom-0 inset-x-0 h-0.5 bg-gold transition-all duration-300",
                    isSelected
                      ? "opacity-100 scale-x-100"
                      : "opacity-0 scale-x-50",
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Floating Selection Summary Bar */}
        <div
          data-pkg-reveal
          className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 p-6 sm:p-8 rounded-sm border border-sand-deep/60 bg-paper/90 backdrop-blur-xs shadow-xs"
        >
          <div className="space-y-1 text-start">
            <span className="text-xs font-medium uppercase tracking-wider text-gold-deep">
              اختيارك الحالي
            </span>
            <p className="text-xl font-light font-mono tabular-nums text-ink">
              {quantity
                ? `${formatQuantity(quantity)} · ${formatPrice(total)}`
                : "لم يُحدد بعد"}
                 <svg
                      className="riyal-svg"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1124.14 1256.39"
                      width="13"
                      height="14"
                      style={{ display: "inline-block", verticalAlign: "-0.125em" }}
                    >
                      <path
                        fill="currentColor"
                        d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"
                      ></path>
                      <path
                        fill="currentColor"
                        d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"
                      ></path>
                    </svg>
            </p>
          </div>

          <Button
            href="/order"
            variant="ink"
            arrow
            className="w-full sm:w-auto px-8 py-4 justify-center"
          >
            {copy.packages.cta}
          </Button>
        </div>
      </Container>
    </section>
  );
}
