import { brand } from "@/data/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export function Logo({
  className,
  inverted = false,
  withEnglish = false,
}: {
  className?: string;
  inverted?: boolean;
  withEnglish?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-2.5 no-underline", className)}
      aria-label={`${brand.name} — ${brand.englishName}`}
    >
      <Image
        src="/images/logo.png"
        alt="Hasnat"
        className="size-16"
        priority
        width={200}
        height={200}
      />
    </Link>
  );
}

export function LogoImage({ className }: { className?: string }) {
  return (
    <img
      src={brand.logo}
      alt={brand.name}
      className={cn("h-10 w-auto object-contain object-right", className)}
    />
  );
}
