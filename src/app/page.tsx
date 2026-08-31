
import { Hero } from "@/components/hero/Hero";
import { SiteShell } from "@/components/layout/SiteShell";
import { Contact } from "@/components/sections/Contact";
import { Dedication } from "@/components/sections/Dedication";
import { Documentation } from "@/components/sections/Documentation";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Packages } from "@/components/sections/Packages";
import { QuranQuote } from "@/components/sections/QuranQuote";
import { Trust } from "@/components/sections/Trust";

export default function Home() {
  return (
      <SiteShell>
        <Hero />
        <QuranQuote />
        <HowItWorks />
        <Packages />
        <Dedication />
        <Documentation />
        <Trust />
        <Contact />
        <FAQ />
        <FinalCTA />
      </SiteShell>
  );
}
