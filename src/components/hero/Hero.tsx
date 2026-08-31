"use client"
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { hero } from "@/data/site";
import { fadeUp, gsap, prefersReducedMotion, registerGsap } from "@/lib/animations";
import { scrollToId } from "@/lib/lenis";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useEffect } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const saveData = Boolean(connection?.saveData);
    const slow = connection?.effectiveType === "2g" || connection?.effectiveType === "slow-2g";
    if (saveData || slow) return;
    setLoadVideo(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !loadVideo) return;
    const play = () => {
      void video.play().catch(() => undefined);
    };
    play();
  }, [loadVideo]);

  return (
    <div className="hero-zoom absolute inset-0 overflow-hidden">
      {/* Poster is the immediate, non-animated first paint — no flash, no fade-in delay */}
      <img
        src={hero.poster}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[center_38%] sm:object-center"
        fetchPriority="high"
      />
      {loadVideo ? (
        <video
          ref={videoRef}
          onPlaying={() => setVideoReady(true)}
          className="absolute inset-0 h-full w-full object-cover object-[center_38%] opacity-0 transition-opacity duration-[1200ms] ease-out sm:object-center"
          style={videoReady ? { opacity: 1 } : undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={hero.poster}
          aria-hidden="true"
        >
          <source src={hero.video} type="video/mp4" />
        </video>
      ) : null}

      {/* Layered, directional overlay — readability without a flat dark rectangle */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-ink/78 via-ink/15 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-ink/25 via-transparent to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 shadow-[inset_0_0_180px_70px_rgba(0,0,0,0.32)]"
      />
    </div>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = root.current;
      if (!el) return;
      const eyebrow = el.querySelector("[data-hero-eyebrow]");
      const title = el.querySelector("[data-hero-title]");
      const body = el.querySelector("[data-hero-body]");
      const primary = el.querySelector("[data-hero-primary]");
      const secondary = el.querySelector("[data-hero-secondary]");
      const scroll = el.querySelector("[data-hero-scroll]");
      const deco = el.querySelector("[data-hero-deco]");

      if (prefersReducedMotion()) {
        gsap.set([eyebrow, title, body, primary, secondary, scroll], {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
        });
        if (deco) gsap.set(deco, { scaleY: 1 });
        return;
      }

      // Eyebrow arrives quietly first
      fadeUp(eyebrow, { duration: 0.8, delay: 0.15 });

      // The headline is the hero moment: a controlled wipe reveal, not just a fade
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 26, clipPath: "inset(0 0 100% 0)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 1.3,
            delay: 0.35,
            ease: "power4.out",
          },
        );
      }

      // Supporting copy and actions arrive only once the message has landed
      fadeUp(body, { duration: 1, delay: 0.72 });
      fadeUp(primary, { duration: 0.85, delay: 0.95 });
      fadeUp(secondary, { duration: 0.85, delay: 1.05 });
      fadeUp(scroll, { duration: 0.8, delay: 1.3 });

      // Decorative rule grows once, marking the start of the content column
      if (deco) {
        gsap.fromTo(
          deco,
          { scaleY: 0 },
          { scaleY: 1, duration: 1, delay: 0.2, ease: "power2.out", transformOrigin: "top" },
        );
      }
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative isolate flex min-h-dvh items-end overflow-hidden pb-16 pt-32 sm:items-center sm:pb-24 sm:pt-28"
    >
      <HeroVideo />

      <div
        data-hero-deco
        className="pointer-events-none absolute inset-s-8 top-28 hidden h-16 w-px scale-y-0 bg-gold/70 lg:block"
        aria-hidden="true"
      />

      <Container className="relative z-10 w-full">
        <div className="max-w-3xl text-ivory">
          <p
            data-hero-eyebrow
            className="mb-5 text-[13px] font-medium tracking-[0.38em] text-gold-soft opacity-0"
          >
            {hero.eyebrow}
          </p>
          <h1
            data-hero-title
            className="max-w-xl text-[2.15rem] leading-[1.15] font-semibold tracking-tight text-balance opacity-0 sm:max-w-2xl sm:text-5xl md:max-w-3xl md:text-[3.4rem]"
          >
            {hero.title}
          </h1>
          <p
            data-hero-body
            className="mt-6 max-w-xl text-base leading-relaxed text-ivory/82 opacity-0 sm:text-lg"
          >
            {hero.description}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <div data-hero-primary className="opacity-0">
              <Button href="/order" variant="gold" arrow>
                {hero.primaryCta}
              </Button>
            </div>
            <div data-hero-secondary className="opacity-0">
              <Button
                href="/#idea"
                variant="outline"
                className="text-[13px] tracking-wide"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToId("idea");
                }}
              >
                {hero.secondaryCta}
              </Button>
            </div>
          </div>
        </div>

        <button
          type="button"
          data-hero-scroll
          onClick={() => scrollToId("idea")}
          className="mt-14 flex items-center gap-3 text-[12px] tracking-[0.22em] text-ivory/70 opacity-0 transition-colors duration-300 hover:text-ivory sm:mt-16"
          aria-label="انتقل إلى الفكرة"
        >
          <span className="relative h-10 w-px overflow-hidden bg-ivory/25">
            <span className="absolute inset-x-0 top-0 h-4 animate-[scroll-line_2.4s_ease-in-out_infinite] bg-gold" />
          </span>
          مرّر بهدوء
        </button>
      </Container>

      <style>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(220%); }
        }
        @keyframes hero-zoom {
          from { transform: scale(1.06); }
          to { transform: scale(1); }
        }
        @media (prefers-reduced-motion: no-preference) {
          .hero-zoom {
            animation: hero-zoom 14s ease-out forwards;
          }
        }
      `}</style>
    </section>
  );
}