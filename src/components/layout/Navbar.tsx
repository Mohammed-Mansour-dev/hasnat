"use client"
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data/navigation";
import { copy } from "@/data/site";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname =usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useGSAP(
    () => {
      registerGsap();
      const overlay = overlayRef.current;
      const links = linksRef.current?.querySelectorAll("a, button");
      if (!overlay) return;
      if (!open) return;
      if (prefersReducedMotion()) {
        gsap.set(overlay, { opacity: 1 });
        return;
      }
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power3.out" });
      if (links?.length) {
        gsap.fromTo(
          links,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.06, delay: 0.08 },
        );
      }
    },
    { dependencies: [open] },
  );

  const inverted = pathname === "/" && !scrolled && !open;
  const solid = !inverted;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,height,backdrop-filter] duration-500 ease-[var(--ease-out-soft)]",
        solid
          ? "border-b border-ink/8 bg-ivory/90 shadow-[0_10px_30px_-24px_rgb(8_8_7_/_0.45)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[1180px] items-center justify-between px-5 sm:h-20 sm:px-8">
        <Logo inverted={inverted} />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="التنقل الرئيسي">
          {navItems.map((item) => (
            <AnchorLink
              key={item.href}
              href={item.href}
              className={cn(
                "text-[14px] font-medium transition-colors duration-300",
                inverted ? "text-ivory/82 hover:text-ivory" : "text-ink-soft hover:text-ink",
              )}
            >
              {item.label}
            </AnchorLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            href="/order"
            variant={inverted ? "gold" : "ink"}
            className="hidden min-h-11 px-5 text-sm sm:inline-flex"
            arrow
          >
            اهدِ مصحفًا
          </Button>
          <button
            type="button"
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-full lg:hidden",
              inverted ? "text-ivory" : "text-ink",
            )}
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          ref={overlayRef}
          className="fixed inset-0 top-[4.5rem] z-40 bg-ivory sm:top-20 lg:hidden"
        >
          <div
            ref={linksRef}
            className="flex flex-col gap-2 px-6 py-8 bg-sand h-fit"
          >
            {navItems.map((item) => (
              <AnchorLink
                key={item.href}
                href={item.href}
                onNavigate={() => setOpen(false)}
                className="border-b border-ink/8 py-4 text-2xl font-medium text-ink"
              >
                {item.label}
              </AnchorLink>
            ))}
            <div className="mt-8">
              <Button href="/order" variant="gold" className="w-full" arrow>
                {copy.finalCta.cta}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
