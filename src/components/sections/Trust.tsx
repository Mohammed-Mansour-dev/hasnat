"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { copy } from "@/data/site";
import { trust } from "@/data/trust";
import { StarMark } from "@/components/ui/IslamicPattern";
import {
  prefersReducedMotion,
  registerGsap,
  staggerReveal,
} from "@/lib/animations";
import { Check, ShieldCheck, ExternalLink } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Trust() {
  const rootRef = useRef<HTMLElement>(null);

  // GSAP Scroll Animation
  useGSAP(
    () => {
      registerGsap();
      const root = rootRef.current;
      if (!root) return;

      if (prefersReducedMotion()) return;

      const revealElements = root.querySelectorAll("[data-trust-reveal]");
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
      id={copy.trust.id}
      ref={rootRef}
      className="relative bg-sand py-24 sm:py-32 border-t border-b border-sand-deep/40 text-ink dir-rtl select-none overflow-hidden"
    >
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-10 lg:px-12">
        {/* Editorial Section Header */}
        <header data-trust-reveal className="max-w-2xl mx-auto text-center mb-16">
          {copy.trust.eyebrow && (
            <p className="mb-3 text-[12px] font-semibold tracking-[0.25em] text-gold-deep uppercase">
              {copy.trust.eyebrow}
            </p>
          )}
          <h2 className="text-3xl font-light leading-tight sm:text-4xl md:text-5xl text-ink tracking-tight">
            {copy.trust.title}
          </h2>
          {copy.trust.subtitle && (
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted font-normal max-w-xl mx-auto">
              {copy.trust.subtitle}
            </p>
          )}
        </header>

        {/* OFFICIAL DEDICATED REGISTRY SHEET */}
        <div
          data-trust-reveal
          className="relative mx-auto bg-paper/90 backdrop-blur-xs rounded-sm border border-sand-deep/80 p-8 sm:p-12 shadow-[0_12px_40px_rgba(17,17,17,0.03)]"
        >
          {/* Decorative Corner Framing */}
          <div className="absolute top-2 right-2 size-3 border-t border-r border-gold/60" />
          <div className="absolute top-2 left-2 size-3 border-t border-l border-gold/60" />
          <div className="absolute bottom-2 right-2 size-3 border-b border-r border-gold/60" />
          <div className="absolute bottom-2 left-2 size-3 border-b border-l border-gold/60" />

          {/* Certificate Top Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-sand-deep/50">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full border border-gold/40 bg-sand/50 flex items-center justify-center shrink-0">
                <StarMark className="size-6 text-gold" />
              </div>
              <div>
                <span className="text-xs font-semibold tracking-widest text-gold-deep uppercase block">
                  اعتماد رسمي موثق
                </span>
                <h3 className="text-xl font-medium text-ink mt-0.5">
                  سجل التوثيق والموثوقية
                </h3>
              </div>
            </div>

            {/* Verification Status Pill */}
            <div className="self-start sm:self-center inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-emerald-800/20 bg-emerald-500/10 text-emerald-800 text-xs font-medium">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-600 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-700" />
              </span>
              <span>ساري وموثق قانونياً</span>
            </div>
          </div>

          {/* Ledger Key-Value Rows */}
          <div className="divide-y divide-sand-deep/40 my-2">
            {/* Row 1: Store Name */}
            <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-sm text-muted font-normal">اسم المتجر المسجل</span>
              <span className="text-base font-medium text-ink">
                {trust.storeName}
              </span>
            </div>

            {/* Row 2: Authority & Certificate Number */}
            <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-sm text-muted font-normal">{trust.authority}</span>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-gold" />
                <span className="text-base font-medium   tabular-nums text-ink">
                  شهادة رقم {trust.certificateNumber}
                </span>
              </div>
            </div>

            {/* Row 3: Commercial Registration */}
            <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-sm text-muted font-normal">رقم السجل التجاري</span>
              <span className="text-base font-medium   tabular-nums text-ink">
                {trust.commercialRegistration}
              </span>
            </div>
          </div>

          {/* Certificate Footer Stamp Note */}
          <div className="pt-6 border-t border-sand-deep/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-muted">
            <div className="flex items-center gap-2">
              <Check className="size-4 text-gold shrink-0" />
              <span>تم التحقق من البيانات مباشرة مع المركز السعودي للأعمال</span>
            </div>

            <span className="  text-[11px] text-muted/60 uppercase">
              SECURE VERIFIED REGISTRY
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}