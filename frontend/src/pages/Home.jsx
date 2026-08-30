import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import { SiteNav } from "@/components/home/SiteNav";
import { HeroSection } from "@/components/home/HeroSection";
import { ProblemBanner } from "@/components/home/ProblemBanner";
import { IntroSection } from "@/components/home/IntroSection";
import { LiveMapSection } from "@/components/home/LiveMapSection";
import { ProblemsSection } from "@/components/home/ProblemsSection";
import { PlatformFeaturesSection } from "@/components/home/PlatformFeaturesSection";
import { TimelineSection } from "@/components/home/TimelineSection";
import { CommandCenterSection, ImpactStatsSection } from "@/components/home/CommandCenterSection";
import { SolutionsSection } from "@/components/home/SolutionsSection";
import { NortheastSection, CtaSection } from "@/components/home/NortheastSection";
import { Footer } from "@/components/home/Footer";
import Login from "./Login";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const root = useRef(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    if (window.location.hash === "#login") {
      setIsLoginModalOpen(true);
    }
  }, []);

  useEffect(() => {
    if (isLoginModalOpen) {
      lenisRef.current?.stop();
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      lenisRef.current?.start();
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isLoginModalOpen]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = prefersReduced ? null : new Lenis({ lerp: 0.085, smoothWheel: true });
    lenisRef.current = lenis;
    let raf = 0;
    const rafLoop = (time) => {
      lenis?.raf(time);
      raf = requestAnimationFrame(rafLoop);
    };
    if (lenis) raf = requestAnimationFrame(rafLoop);

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .fromTo(".navbar", { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 })
        .fromTo(".hero-reveal", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, "-=.38")
        .fromTo(".hero-corridor-media", { scale: 1.05 }, { scale: 1.0, duration: 2.2, ease: "power2.out" }, "-=1.1");

      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 84%", once: true },
          }
        );
      });
      gsap.to(".hero-corridor-media", {
        yPercent: 4,
        ease: "none",
        scrollTrigger: { trigger: ".hero-corridor", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".northeast-media", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: ".northeast", start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.fromTo(
        ".steps-spine",
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".steps", start: "top 72%", end: "bottom 55%", scrub: true } }
      );
    }, root);

    return () => {
      ctx.revert();
      lenis?.destroy();
      lenisRef.current = null;
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={root} className="site-shell">
      <SiteNav onOpenLogin={() => setIsLoginModalOpen(true)} />

      <main>
        <HeroSection />
        <ProblemBanner />
        <IntroSection />
        <LiveMapSection />
        <ProblemsSection />
        <PlatformFeaturesSection />
        <TimelineSection />
        <CommandCenterSection />
        <ImpactStatsSection />
        <SolutionsSection onOpenLogin={() => setIsLoginModalOpen(true)} />
        <NortheastSection />
        <CtaSection onOpenLogin={() => setIsLoginModalOpen(true)} />
      </main>

      <Footer onOpenLogin={() => setIsLoginModalOpen(true)} />

      {isLoginModalOpen && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-[100] h-full w-full overflow-y-auto overscroll-contain bg-slate-950/80 backdrop-blur-md animate-in fade-in touch-pan-y"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div data-lenis-prevent="true" className="relative min-h-full w-full flex flex-col justify-between">
            <Login onClose={() => setIsLoginModalOpen(false)} isModal={true} />
          </div>
        </div>
      )}
    </div>
  );
}
