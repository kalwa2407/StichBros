"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

export function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();
  const yBackground = useTransform(scrollY, [0, 1000], [0, 300]);

  useEffect(() => {
    setIsMounted(true);
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

  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Background with Parallax effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          className="absolute inset-[-10%] bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/brand/hero_bg.png')",
            y: yBackground,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
      </div>

      {/* Main Content Area */}
      <div className="container relative z-10 text-center px-4 flex-grow flex flex-col items-center justify-center py-24">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.2 }}
        >
          <p className="text-accent text-[12px] uppercase tracking-[0.5em] mb-6 font-semibold">
            The Dynasty Series
          </p>
          <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-serif leading-[0.9] mb-8 text-white">
            Preserving <br />
            <span className="italic text-accent">Wealth.</span>
          </h1>
           <div className="flex flex-col items-center">
              <div className="w-16 h-[1px] bg-accent/50 mb-8"></div>
              <p className="text-gray-400 max-w-lg text-sm font-medium leading-loose tracking-wide mb-10 bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/5 shadow-2xl">
                StichBros delivers bespoke tailoring environments and comprehensive 
                wardrobe direction for discerning individuals and generations.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <a href="/shop" className="button-premium px-12 py-4 bg-accent text-black font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform">
                   Explore Collection
                </a>
                <a href="#bespoke" className="button-outline px-12 py-4 border border-accent text-accent font-bold uppercase tracking-widest text-sm hover:bg-accent hover:text-black transition-colors">
                   Request Consultation
                </a>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Hero Footline - Now Relative to ensure NO overlap */}
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
