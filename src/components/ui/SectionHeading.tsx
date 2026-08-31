import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "start";
  light?: boolean;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-start",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-4 text-[13px] font-medium tracking-[0.28em]",
            light ? "text-gold-soft" : "text-gold-deep",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-3xl leading-snug sm:text-4xl md:text-[2.6rem]",
          light ? "text-ivory" : "text-ink",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            light ? "text-ivory/75" : "text-muted",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}
