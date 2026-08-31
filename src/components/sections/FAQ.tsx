"use client"
import { useState } from "react";
import { faqItems } from "@/data/faq";
import { copy } from "@/data/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  return (
    <section id={copy.faq.id} className="bg-sand py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={copy.faq.eyebrow}
          title={copy.faq.title}
          subtitle={copy.faq.subtitle}
        />
        <div className="mx-auto mt-14 max-w-3xl divide-y divide-ink/10 border-y border-ink/10">
          {faqItems.map((item) => {
            const open = openId === item.id;
            return (
              <div key={item.id}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`faq-panel-${item.id}`}
                    id={`faq-button-${item.id}`}
                    onClick={() => setOpenId(open ? null : item.id)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-start"
                  >
                    <span className="text-[16px] font-medium text-ink sm:text-lg">
                      {item.question}
                    </span>
                    <span
                      className="relative size-8 shrink-0 rounded-full border border-ink/12"
                      aria-hidden="true"
                    >
                      <span className="absolute inset-x-2 top-1/2 h-px -translate-y-1/2 bg-ink" />
                      <span
                        className={cn(
                          "absolute inset-y-2 right-1/2 w-px translate-x-1/2 bg-ink transition-transform duration-300 ease-[var(--ease-out-soft)]",
                          open && "scale-y-0",
                        )}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-button-${item.id}`}
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-out-soft)]",
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 text-[15px] leading-relaxed text-muted">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
