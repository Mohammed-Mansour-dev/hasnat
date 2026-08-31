"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { dedicationOptions, getDedicationById } from "@/data/dedication";
import { copy } from "@/data/site";
import { useOrderStore } from "@/lib/order-store";
import { Button } from "@/components/ui/Button";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  staggerReveal,
} from "@/lib/animations";
import { Check } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Dedication() {
  const rootRef = useRef<HTMLElement>(null);

  const selected = useOrderStore((s: any) => s.dedicationType);
  const setDedication = useOrderStore((s: any) => s.setDedication);
  const recipientName = useOrderStore((s: any) => s.recipientName);
  const setRecipientName = useOrderStore((s: any) => s.setRecipientName);

  const option = selected ? getDedicationById(selected) : undefined;

  // Direct GSAP Entrance Stagger
  useGSAP(
    () => {
      registerGsap();
      const root = rootRef.current;
      if (!root) return;

      if (prefersReducedMotion()) return;

      const revealElements = root.querySelectorAll("[data-ded-reveal]");
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
    { scope: rootRef }
  );

  return (
    <section
      id={copy.dedication.id}
      ref={rootRef}
      className="relative bg-sand py-24 sm:py-32 border-t border-b border-sand-deep/40 text-ink dir-rtl select-none"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-12">
        {/* Editorial Section Header */}
        <header data-ded-reveal className="max-w-2xl mx-auto text-center mb-16 sm:mb-20">
          {copy.dedication.eyebrow && (
            <p className="mb-3 text-[12px] font-semibold tracking-[0.25em] text-gold-deep uppercase">
              {copy.dedication.eyebrow}
            </p>
          )}
          <h2 className="text-3xl font-light leading-tight sm:text-4xl md:text-5xl text-ink tracking-tight">
            {copy.dedication.title}
          </h2>
          {copy.dedication.subtitle && (
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted font-normal max-w-xl mx-auto">
              {copy.dedication.subtitle}
            </p>
          )}
        </header>

        {/* Dedication Options Grid */}
        <div
          data-ded-reveal
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          role="listbox"
          aria-label={copy.dedication.title}
        >
          {dedicationOptions.map((item) => {
            const isSelected = selected === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => setDedication(item.id)}
                className={cn(
                  "group relative flex flex-col justify-between min-h-[170px] p-6 text-start transition-all duration-300 rounded-sm border cursor-pointer",
                  isSelected
                    ? "border-gold bg-ivory shadow-xs"
                    : "border-sand-deep/60 bg-ivory/50 hover:border-gold/60 hover:bg-ivory"
                )}
              >
                {/* Header row with status badge */}
                <div className="flex items-center justify-between w-full mb-4">
                  <h3 className="text-lg font-medium text-ink transition-colors duration-300">
                    {item.label}
                  </h3>
                  <span
                    className={cn(
                      "flex size-5 items-center justify-center rounded-full border transition-all duration-300",
                      isSelected
                        ? "border-gold bg-gold text-ink scale-100"
                        : "border-sand-deep/80 text-transparent scale-90 group-hover:border-gold/50"
                    )}
                    aria-hidden="true"
                  >
                    <Check className="size-3" strokeWidth={2.5} />
                  </span>
                </div>

                {/* Option description */}
                <p className="text-sm leading-relaxed text-muted font-normal">
                  {item.description}
                </p>

                {/* Subtle active line accent */}
                <div
                  className={cn(
                    "absolute bottom-0 inset-x-0 h-0.5 bg-gold transition-all duration-300",
                    isSelected ? "opacity-100 scale-x-100" : "opacity-0 scale-x-50"
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Dynamic Recipient Name Input */}
        {option?.requiresRecipient && (
          <div data-ded-reveal className="mx-auto mt-10 max-w-md">
            <div className="p-6 rounded-sm border border-sand-deep/60 bg-ivory shadow-xs">
              <label
                htmlFor="home-recipient"
                className="mb-2 block text-xs font-semibold tracking-wider text-gold-deep uppercase"
              >
                {option.recipientLabel}
              </label>
              <input
                id="home-recipient"
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder={option.recipientPlaceholder}
                className="h-12 w-full rounded-xs border border-sand-deep/80 bg-sand/30 px-4 text-sm text-ink outline-none transition-all duration-300 focus:border-gold focus:bg-ivory focus:ring-1 focus:ring-gold/30 placeholder:text-muted/50"
              />
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div data-ded-reveal className="mt-12 flex justify-center">
          <Button
            href="/order"
            variant="gold"
            arrow
            className="px-10 py-4 font-medium justify-center shadow-[0_6px_20px_rgba(197,168,128,0.2)]"
          >
            أكمل الإهداء
          </Button>
        </div>
      </div>
    </section>
  );
}