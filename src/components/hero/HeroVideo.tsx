"use client"
import { useEffect, useRef, useState } from "react";
import { hero } from "@/data/site";
import { prefersReducedMotion } from "@/lib/animations";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);

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
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={hero.poster}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      {loadVideo ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
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
      <div className="hero-overlay absolute inset-0" />
    </div>
  );
}
