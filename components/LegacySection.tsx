"use client";

import React from 'react';
import { motion } from 'framer-motion';

export function LegacySection({ timeline }: { timeline: any[] }) {
  return (
    <section id="legacy" className="py-24 bg-surface border-y border-line">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Visual Side */}
          <div className="relative">
            <div className="aspect-[4/5] relative overflow-hidden ring-1 ring-accent/20">
               <img 
                  src="/brand/legacy_portraits.png" 
                  alt="Ancestors of Choice"
                  className="w-full h-full object-cover grayscale sepia-[0.3] contrast-[1.1]"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            </div>
            
            {/* Floating Detail */}
            <motion.div 
               initial={{ x: 30, opacity: 0 }}
               whileInView={{ x: 0, opacity: 1 }}
               className="absolute -bottom-10 -right-10 bg-bg p-10 border border-line hidden md:block max-w-xs"
            >
               <h4 className="text-accent text-xs uppercase tracking-[0.3em] font-bold mb-4">The Principle</h4>
               <p className="text-text-muted text-sm italic font-serif leading-relaxed">
                 "A well-made garment is not a visual exercise, but a strategic declaration of one's place in the world."
               </p>
            </motion.div>
          </div>

          {/* Content Side */}
          <div>
            <p className="text-accent text-[12px] uppercase tracking-[0.4em] mb-4 font-semibold">Our Story</p>
            <h2 className="text-4xl md:text-6xl font-serif mb-12">Building a Dynasty</h2>
            
            <div className="space-y-12">
               {timeline.map((item, idx) => (
                  <motion.div 
                    key={item.year}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.2 }}
                    className="flex gap-8 group"
                  >
                     <div className="flex flex-col items-center">
                        <span className="text-accent text-lg font-serif">{item.year}</span>
                        <div className="w-[1px] flex-grow bg-line group-last:bg-transparent mt-4"></div>
                     </div>
                     <div className="pb-12">
                        <h3 className="text-xl font-medium text-text mb-2 tracking-wide uppercase">
                           {item.title}
                        </h3>
                        <p className="text-text-muted text-sm font-light leading-relaxed max-w-md">
                           {item.description}
                        </p>
                     </div>
                  </motion.div>
               ))}
            </div>

            <div className="mt-8">
               <a href="#about" className="text-accent text-xs uppercase tracking-[0.3em] font-bold flex items-center group">
                  Discover Full History 
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
               </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
