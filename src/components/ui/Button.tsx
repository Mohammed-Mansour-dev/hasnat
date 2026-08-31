import { ArrowLeft } from "lucide-react";
import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const variants = {
  gold:
    "bg-gold text-ink hover:bg-gold-soft shadow-[0_10px_24px_-16px_rgb(185_138_61_/_0.9)]",
  ink: "bg-ink text-ivory hover:bg-ink-soft",
  outline:
    "border border-ivory/45 bg-transparent text-ivory hover:border-ivory hover:bg-ivory/10",
  outlineDark:
    "border border-ink/12 bg-transparent text-ink hover:border-gold-deep hover:text-ink",
  ghost: "bg-transparent text-ink hover:text-gold-deep",
} as const;

type Variant = keyof typeof variants;

type Common = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  arrow?: boolean;
};

type ButtonAsButton = Common &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = Common & {
  href: string;
  type?: never;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function Button({
  children,
  className,
  variant = "gold",
  arrow = false,
  href,
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classes = cn(
    "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium tracking-wide transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-[var(--ease-out-soft)] active:scale-[0.96]",
    "hover:-translate-y-0.5",
    variants[variant],
    "disabled:pointer-events-none disabled:opacity-50",
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {arrow ? (
        <ArrowLeft className="size-4 transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:-translate-x-0.5" />
      ) : null}
    </>
  );

  if (href) {
    const { onClick } = props as ButtonAsLink;
    if (href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
      return (
        <a href={href} className={classes} onClick={onClick}>
          {content}
        </a>
      );
    }
    if (href.startsWith("/#") || href.startsWith("#")) {
      return (
        <a href={href} className={classes} onClick={onClick}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
