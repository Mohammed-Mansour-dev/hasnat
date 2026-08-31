import type { ReactNode } from "react";
import { scrollToId } from "@/lib/lenis";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

function parseHash(href: string): { path: string; hash?: string } {
  const [path, hash] = href.split("#");
  return { path: path || "/", hash };
}

export function AnchorLink({
  href,
  children,
  className,
  onNavigate,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onNavigate?: () => void;
}) {
 const router = useRouter();
  const pathname = usePathname();
  const { path, hash } = parseHash(href);

 function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
  if (!hash) {
    onNavigate?.();
    return;
  }
  event.preventDefault();
  onNavigate?.();
  if (pathname === path) {
    scrollToId(hash);
    window.history.replaceState(null, "", `${path}#${hash}`);
    return;
  }

  // Next.js router.push does not return a promise, so use router.push + frame
  router.push(path);
  requestAnimationFrame(() => scrollToId(hash));
}
  return (
    <a href={href} onClick={handleClick} className={cn(className)}>
      {children}
    </a>
  );
}
