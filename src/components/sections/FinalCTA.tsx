import { copy } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IslamicPattern } from "@/components/ui/IslamicPattern";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="gold-glow absolute inset-0" />
      <IslamicPattern opacity={0.07} />
      <Container className="relative text-center">
        <h2 className="mx-auto max-w-3xl text-3xl leading-snug sm:text-4xl md:text-[2.7rem]">
          {copy.finalCta.title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base text-muted sm:text-lg">
          {copy.finalCta.subtitle}
        </p>
        <div className="mt-10">
          <Button href="/order" variant="ink" arrow>
            {copy.finalCta.cta}
          </Button>
        </div>
      </Container>
    </section>
  );
}
