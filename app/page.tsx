"use client";

import React from 'react';
import { Hero } from '@/components/Hero';
import { ProductGrid } from '@/components/ProductGrid';
import { LegacySection } from '@/components/LegacySection';
import { getHomepageData } from '@/lib/catalog';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const data = getHomepageData();
  
  // Only show first 6 items on home
  const featuredProducts = data.products.slice(0, 6);

  return (
    <main className="min-h-screen bg-bg selection:bg-accent selection:text-black">
      <Hero />
      
      <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <ProductGrid products={featuredProducts} />
        
        {/* Browse Collection Button */}
        <div className="container pb-24 flex justify-center">
           <a 
            href="/shop" 
            className="group flex flex-col items-center space-y-4"
           >
              <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">Discover Full Catalog</span>
              <div className="w-48 h-[1px] bg-line relative overflow-hidden">
                 <div className="absolute inset-0 bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              </div>
              <div className="flex items-center space-x-2 text-text-muted group-hover:text-text transition-colors text-[10px] uppercase tracking-[0.2em]">
                 <span>Go to Shop</span>
                 <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
           </a>
        </div>
      </div>

      <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <LegacySection timeline={data.legacyTimeline} />
      </div>

      {/* Footer */}
      <footer className="py-24 border-t border-line text-center">
        <div className="container">
          <h2 className="text-3xl font-serif tracking-[0.2em] text-accent mb-8">CHOICE</h2>
          <div className="flex justify-center space-x-12 text-[10px] uppercase tracking-[0.3em] text-text-muted mb-12">
             <a href="#" className="hover:text-accent">Instagram</a>
             <a href="#" className="hover:text-accent">Concierge</a>
             <a href="#" className="hover:text-accent">Sustainability</a>
             <a href="#" className="hover:text-accent">Privacy</a>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted/40 font-mono">
             © 2024 CHOICE MENSWEAR. PRESERVING ART. BUILDING LEGACIES.
          </p>
        </div>
      </footer>
    </main>
  );
}
