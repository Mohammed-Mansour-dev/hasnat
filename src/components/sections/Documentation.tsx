"use client"
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { copy, images } from "@/data/site";
import { drawLine, fadeUp, gsap, prefersReducedMotion, registerGsap } from "@/lib/animations";
import { Container } from "@/components/ui/Container";
import { IslamicPattern } from "@/components/ui/IslamicPattern";

export function Documentation() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = root.current;
      if (!el) return;
      const phone = el.querySelector("[data-phone]");
      const card = el.querySelector("[data-doc-card]");
      const image = el.querySelector("[data-doc-image]");
      const line = el.querySelector("[data-doc-line]") as SVGLineElement | null;
      const deco = el.querySelector("[data-doc-deco]");

      if (line) {
        drawLine(line, {
          scrollTrigger: { trigger: el, start: "top 72%", once: true },
        });
      }

      if (prefersReducedMotion()) {
        gsap.set([phone, card, image], { opacity: 1, y: 0 });
        return;
      }

      fadeUp(phone, {
        scrollTrigger: { trigger: el, start: "top 72%", once: true },
      });
      fadeUp(card, {
        delay: 0.18,
        scrollTrigger: { trigger: el, start: "top 72%", once: true },
      });
      fadeUp(image, {
        delay: 0.32,
        scrollTrigger: { trigger: el, start: "top 72%", once: true },
      });
      if (deco) {
        gsap.to(deco, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.7 },
        });
      }
    },
    { scope: root },
  );

  return (
    <section
      id={copy.documentation.id}
      ref={root}
      className="relative overflow-hidden bg-ivory py-24 sm:py-32"
    >
      <div data-doc-deco className="pointer-events-none absolute inset-0">
        <IslamicPattern opacity={0.05} />
      </div>
      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="mb-4 text-[13px] font-medium tracking-[0.28em] text-gold-deep">
              {copy.documentation.eyebrow}
            </p>
            <h2 className="max-w-md text-3xl sm:text-4xl md:text-[2.45rem]">
              {copy.documentation.title}
            </h2>
            <svg className="mt-6 h-0.5 w-20 overflow-visible" viewBox="0 0 80 2" aria-hidden="true">
              <line
                data-doc-line
                x1="80"
                y1="1"
                x2="0"
                y2="1"
                stroke="#ECBD66"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink-soft sm:text-base">
              {copy.documentation.body}
            </p>
          </div>

          <div className="lg:col-span-6">
            <div data-phone className="mx-auto w-full max-w-85">
              <div className="rounded-[40px] border border-ink/10 bg-ink p-3 shadow-[--shadow-lift]">
                <div className="overflow-hidden rounded-[30px] bg-sand">
                  <div className="flex items-center justify-between px-5 pt-4 pb-3">
                    <div>
                      <p className="text-sm font-medium text-ink">{copy.documentation.mockSender}</p>
                      <p className="text-[11px] text-muted">{copy.documentation.mockTime}</p>
                    </div>
                    <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
                  </div>
                  <div data-doc-card className="px-4 pb-5">
                    <div className="rounded-[22px] bg-paper p-3 shadow-[--shadow-soft]">
                      <div data-doc-image className="overflow-hidden rounded-2xl">
                        <img
                          src={images.distribution}
                          alt=""
                          className="aspect-16/10 w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <p className="mt-3 text-[12px] text-muted">{copy.documentation.mockCaption}</p>
                      <p className="mt-2 text-[14px] leading-relaxed text-ink">
                        {copy.documentation.mockMessage}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
