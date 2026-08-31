"use client"

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { copy } from "@/data/site";
import { drawLine, fadeUp, prefersReducedMotion, registerGsap } from "@/lib/animations";
import { getLastOrder } from "@/lib/order";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { SubmittedOrder } from "@/data/types";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderFromUrl = searchParams.get("order") ?? undefined;

  const [order, setOrder] = useState<SubmittedOrder | null>(null);
  const root = useRef<HTMLElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const checkRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    setOrder(getLastOrder());
  }, []);

  useGSAP(
    () => {
      registerGsap();
      const circle = circleRef.current;
      const check = checkRef.current;
      const el = root.current;
      if (!el) return;
      if (circle) drawLine(circle, { duration: 0.8 });
      if (check) drawLine(check, { duration: 0.55, delay: 0.45 });
      if (!prefersReducedMotion()) {
        fadeUp(el.querySelector("[data-success-copy]"), { delay: 0.35 });
      }
    },
    { dependencies: [order] },
  );

  const orderNumber = order?.orderNumber ?? orderFromUrl ?? "HAS-0000";
  const whatsappHref = order ? buildWhatsAppUrl(order) : "https://wa.me/966543014733";

  return (
    <section ref={root} className="bg-ivory pt-32 pb-24 sm:pt-40 sm:pb-32">
      <Container className="max-w-xl text-center">
        <div className="mx-auto mb-8 flex size-24 items-center justify-center">
          <svg viewBox="0 0 96 96" className="size-24" aria-hidden="true">
            <circle
              ref={circleRef}
              cx="48"
              cy="48"
              r="30"
              fill="none"
              stroke="#ECBD66"
              strokeWidth="1.6"
            />
            <path
              ref={checkRef}
              d="M34 49.5 L43.5 59 L63 38"
              fill="none"
              stroke="#080807"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="sr-only">تم بنجاح</span>
        </div>

        <div data-success-copy>
          <h1 className="text-3xl sm:text-4xl">{copy.order.successTitle}</h1>
          <p className="mt-4 text-muted">{copy.order.successBody}</p>
          <p className="mt-2 text-muted">{copy.order.successHint}</p>
          <p className="mt-8 text-sm tracking-[0.2em] text-gold-deep">رقم الطلب</p>
          <p className="mt-2 font-medium text-2xl tabular-nums tracking-wide text-ink" dir="ltr">
            {orderNumber}
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button href={whatsappHref} variant="gold" arrow>
              {copy.order.whatsappCta}
            </Button>
            <Button href="/" variant="outlineDark">
              {copy.order.homeCta}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function SuccessPage() {
  return (
    <SiteShell>
      <Suspense fallback={<div className="bg-ivory pt-32 pb-24 min-h-screen" />}>
        <SuccessContent />
      </Suspense>
    </SiteShell>
  );
}