"use client"
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { copy, images } from "@/data/site";
import { drawLine, fadeUp, prefersReducedMotion, registerGsap } from "@/lib/animations";
import { Container } from "@/components/ui/Container";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { IslamicPattern } from "@/components/ui/IslamicPattern";

export function QuranQuote() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = root.current;
      if (!el) return;
      const line = el.querySelector("[data-quote-line]") as SVGLineElement | null;
      const card = el.querySelector("[data-quote-card]");
      const quote = el.querySelector("[data-quote-text]");
      const body = el.querySelector("[data-quote-body]");
      const note = el.querySelector("[data-quote-note]");

      if (line) {
        drawLine(line, {
          scrollTrigger: { trigger: el, start: "top 75%", once: true },
        });
      }
      if (prefersReducedMotion()) return;
      fadeUp(card, {
        delay: 0.1,
        scrollTrigger: { trigger: el, start: "top 75%", once: true },
      });
      fadeUp(quote, {
        delay: 0.28,
        scrollTrigger: { trigger: el, start: "top 75%", once: true },
      });
      fadeUp(body, {
        delay: 0.48,
        scrollTrigger: { trigger: el, start: "top 75%", once: true },
      });
      fadeUp(note, {
        delay: 0.62,
        scrollTrigger: { trigger: el, start: "top 75%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section
      id={copy.idea.id}
      ref={root}
      className="relative overflow-hidden bg-ivory py-24 sm:py-32"
    >
      <IslamicPattern className="opacity-80" opacity={0.05} />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="mb-4 text-[13px] font-medium tracking-[0.28em] text-gold-deep">
              {copy.idea.eyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-[2.6rem]">{copy.idea.title}</h2>
            <GoldDivider className="mt-6" />
            <div className="mt-8 overflow-hidden rounded-[28px] bg-sand">
              <img
                src={images.quranCloseup}
                alt="مصحف مفتوح بصفحات هادئة"
                className="aspect-4/3 h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <article
              data-quote-card
              className="rounded-[28px] border border-ink/8 bg-paper p-7 shadow-[--shadow-soft] sm:p-10"
            >
              <svg className="mb-6 h-0.5 w-16 overflow-visible" viewBox="0 0 64 2" aria-hidden="true">
                <line
                  data-quote-line
                  x1="64"
                  y1="1"
                  x2="0"
                  y2="1"
                  stroke="#ECBD66"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <blockquote
                data-quote-text
                className="text-xl leading-loose text-ink sm:text-[1.65rem]"
              >
                «{copy.idea.hadith}»
              </blockquote>
              <p
                data-quote-body
                className="mt-8 text-[15px] leading-relaxed text-ink-soft sm:text-base"
              >
                {copy.idea.body}
              </p>
              <p
                data-quote-note
                className="mt-5 text-sm text-muted"
              >
                {copy.idea.note}
              </p>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}
