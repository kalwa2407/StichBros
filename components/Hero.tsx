"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsMounted(true);
    setIsMobile(window.innerWidth < 768);

    const handleScroll = () => {
      if (window.innerWidth >= 768) {
        setScrollY(window.scrollY);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isMounted) {
    return (
      <section className="relative h-screen bg-black flex items-center justify-center">
         <div className="text-accent text-xs uppercase tracking-[0.5em] animate-pulse">
            Loading Heritage...
         </div>
      </section>
    );
  }

  const parallaxY = isMobile ? 0 : scrollY * 0.3;

  return (
    <section ref={sectionRef} className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Background with Parallax (desktop only - no jitter on mobile) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{ 
            backgroundImage: "url('/brand/hero_bg.png')",
            transform: `translate3d(0, ${parallaxY}px, 0) scale(1.15)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#080808]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      </div>

      {/* Main Content Area */}
      <div className="container relative z-10 text-center px-4 flex-grow flex flex-col items-center justify-center py-24">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.2 }}
        >
          <p className="text-accent text-[10px] md:text-[12px] uppercase tracking-[0.5em] mb-6 font-semibold">
            The Dynasty Series
          </p>
          <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-serif leading-[0.9] mb-6 md:mb-8 text-white">
            Preserving <br />
            <span className="italic text-accent">Wealth.</span>
          </h1>
           <div className="flex flex-col items-center">
              <div className="w-12 h-[1px] bg-accent/40 mb-6" />
              <p className="font-serif italic text-base md:text-xl text-accent/80 mb-3">
                 A Legacy of Elegance
              </p>
              <p className="text-white/60 max-w-md md:max-w-xl text-xs md:text-sm font-light leading-relaxed md:leading-loose tracking-wide text-center">
                StichBros delivers bespoke tailoring environments and comprehensive 
                wardrobe direction for discerning individuals and generations.
              </p>
              <div className="w-px h-10 md:h-16 bg-gradient-to-b from-accent/40 to-transparent my-8 md:my-10" />
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto px-4 sm:px-0">
                <a href="/shop" className="button-premium px-8 md:px-12 py-3 md:py-4 bg-accent text-black font-bold uppercase tracking-widest text-xs md:text-sm hover:scale-105 transition-transform text-center">
                   Explore Collection
                </a>
                <a href="#bespoke" className="button-outline px-8 md:px-12 py-3 md:py-4 border border-accent text-accent font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-accent hover:text-black transition-colors text-center">
                   Request Consultation
                </a>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Hero Footline - Desktop only */}
      <div className="relative z-10 w-full max-w-7xl px-8 pb-12 hidden lg:flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-accent/50 mt-auto">
         <span className="border-l border-accent/20 pl-4">National Heritage Purveyor</span>
         <div className="flex items-center space-x-12 border-r border-accent/20 pr-4">
            <span className="hover:text-accent transition-colors cursor-default">Bespoke 1/1</span>
            <span className="hover:text-accent transition-colors cursor-default">Artisanal Excellence</span>
            <span className="hover:text-accent transition-colors cursor-default">Est. 1924</span>
         </div>
      </div>
    </section>
  );
}
