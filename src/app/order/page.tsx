import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { Container } from "@/components/ui/Container";
import { IslamicPattern } from "@/components/ui/IslamicPattern";
import { copy, seo } from "@/data/site";
import { OrderExperience } from "./components/OrderExperience";

export const metadata: Metadata = {
  title: `إهداء المصحف | ${seo.title}`,
  description: seo.description,
};

export default function OrderPage() {
  return (
    <SiteShell>
      <section className="relative overflow-hidden bg-ivory pt-32 pb-24 sm:pt-36 sm:pb-32">
        <IslamicPattern opacity={0.04} />
        <Container className="relative">
          <header className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-4 text-[13px] font-medium tracking-[0.28em] text-gold-deep">حسنات</p>
            <h1 className="text-3xl sm:text-4xl">{copy.order.title}</h1>
            <p className="mt-4 text-muted">{copy.order.subtitle}</p>
          </header>
          <OrderExperience />
        </Container>
      </section>
    </SiteShell>
  );
}