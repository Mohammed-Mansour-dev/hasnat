"use client"
import { useEffect, type ReactNode } from "react";
import { useOrderStore } from "@/lib/order-store";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function SiteShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    void useOrderStore.persist.rehydrate();
  }, []);
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:right-4 focus:top-4 focus:z-60 focus:rounded-full focus:bg-ivory focus:px-4 focus:py-2 focus:text-ink"
      >
        تخطي إلى المحتوى
      </a>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
