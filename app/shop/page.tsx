"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, ShoppingBag, Heart, X, SlidersHorizontal } from 'lucide-react';
import { getHomepageData } from '@/lib/catalog';
import { useCart } from '@/components/CartContext';

export default function ShopPage() {
  const data = getHomepageData();
  const { addToCart } = useCart();
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(data.products.map(p => p.category))];
    return cats;
  }, [data.products]);

  const filteredProducts = useMemo(() => {
    let result = [...data.products];
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    }
    return result;
  }, [selectedCategory, sortBy, data.products]);

  return (
    <div className="min-h-screen bg-white pt-24 md:pt-32 pb-24 text-black">
      <div className="container max-w-[1400px]">
        {/* Breadcrumbs */}
        <nav className="text-[10px] md:text-[11px] mb-4 md:mb-8 flex items-center space-x-2 text-gray-400 font-medium">
          <a href="/" className="hover:text-black">Home</a>
          <span>/</span>
          <span className="text-black font-bold">Clothing</span>
        </nav>

        <div className="flex items-center justify-between mb-8">
           <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
              <h1 className="text-base md:text-lg font-bold uppercase tracking-widest">STITCHBROS COLLECTION</h1>
              <span className="text-gray-400 text-xs font-normal"> - {filteredProducts.length} items</span>
           </div>
        </div>

        <div className="flex border-t border-gray-100">
          {/* Desktop Filters Sidebar */}
          <aside className="w-64 flex-shrink-0 pt-8 pr-8 border-r border-gray-100 hidden lg:block">
            <div className="sticky top-32 space-y-10">
              <div>
                <h3 className="text-xs font-bold uppercase mb-6 tracking-widest text-gray-400 border-b border-gray-50 pb-2">Categories</h3>
                <div className="space-y-4">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
                      <input 
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                        className="w-4 h-4 accent-accent"
                      />
                      <span className={`text-sm tracking-wide transition-colors ${selectedCategory === cat ? 'text-black font-bold' : 'text-gray-500 group-hover:text-black'}`}>
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase mb-6 tracking-widest text-gray-400 border-b border-gray-50 pb-2">Price Range</h3>
                <div className="space-y-4 text-sm text-gray-500">
                   {['Below ₹10,000', '₹10,000 - ₹30,000', 'Above ₹50,000'].map(range => (
                     <label key={range} className="flex items-center space-x-3 cursor-pointer group">
                       <input type="checkbox" className="w-4 h-4 accent-accent" />
                       <span className="group-hover:text-black transition-colors">{range}</span>
                     </label>
                   ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-grow pt-4 md:pt-8 lg:pl-10">
            {/* Desktop Sort */}
            <div className="hidden lg:flex justify-end mb-10">
              <div className="relative group border border-gray-200 px-6 py-3 hover:bg-gray-50 cursor-pointer min-w-[220px]">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
                  <span className="text-gray-400">Sort: </span>
                  <span className="text-black flex items-center">{sortBy} <ChevronDown size={14} className="ml-2 text-accent" /></span>
                </div>
                <div className="absolute top-full right-[-1px] left-[-1px] bg-white border border-gray-200 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-30">
                   {['Newest', 'Price: Low to High', 'Price: High to Low'].map(s => (
                     <button 
                       key={s} 
                       onClick={() => setSortBy(s)}
                       className="w-full px-6 py-4 text-left text-[11px] font-bold uppercase tracking-widest hover:bg-accent/5 transition-colors border-b border-gray-50 last:border-0"
                     >
                       {s}
                     </button>
                   ))}
                </div>
              </div>
            </div>

            {/* Mobile Filter Floating Trigger */}
            <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] flex items-center bg-black text-white px-8 py-4 rounded-full shadow-2xl space-x-4 border border-accent/20">
               <button onClick={() => setIsFilterOpen(true)} className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.2em]">
                  <SlidersHorizontal size={14} />
                  <span>Filter & Sort</span>
               </button>
            </div>

            {/* Myntra-Style Grid - 2 Col on Mobile, 4 Col on Desktop */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-x-8 md:gap-y-12 pb-24">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group"
                  >
                    <a href={`/shop/${product.id}`} className="block">
                      {/* Image Container */}
                      <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden border border-transparent group-hover:border-accent transition-all duration-300">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        {/* Tags */}
                        {product.price > 50000 && (
                           <div className="absolute top-3 left-3 bg-black text-accent px-2 py-1 text-[8px] font-bold uppercase tracking-widest">Premium</div>
                        )}

                        {/* Quick View / Bag on Desktop */}
                        <div className="hidden md:block absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-xl z-20">
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              addToCart(product);
                            }}
                            className="w-full py-3 bg-accent text-black text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center space-x-2"
                          >
                            <ShoppingBag size={14} />
                            <span>Add to Bag</span>
                          </button>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="pt-4 space-y-1.5 px-1">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">STITCHBROS</h4>
                        <h3 className="text-black text-[11px] md:text-xs font-medium truncate">{product.name}</h3>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm md:text-base font-bold font-serif text-accent">₹{product.price.toLocaleString()}</span>
                          <span className="text-[9px] md:text-[10px] text-gray-400 line-through font-light italic">₹{(product.price * 1.5).toLocaleString()}</span>
                        </div>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      <AnimatePresence>
         {isFilterOpen && (
            <>
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 onClick={() => setIsFilterOpen(false)}
                 className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
               />
               <motion.div 
                 initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                 transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                 className="fixed bottom-0 left-0 right-0 h-[80vh] bg-white rounded-t-[2.5rem] z-[101] overflow-hidden flex flex-col pt-8"
               >
                  <div className="px-8 pb-8 flex items-center justify-between border-b border-gray-50">
                     <h2 className="text-sm font-bold uppercase tracking-[0.3em]">Refine Collection</h2>
                     <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-gray-50 rounded-full"><X size={20} /></button>
                  </div>

                  <div className="flex-grow overflow-y-auto p-8 space-y-12">
                     <section>
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-400 mb-6">Sort Selection</h3>
                        <div className="grid grid-cols-1 gap-4">
                           {['Newest', 'Price: Low to High', 'Price: High to Low'].map(s => (
                              <button 
                                key={s} onClick={() => { setSortBy(s); setIsFilterOpen(false); }}
                                className={`px-4 py-4 border text-[10px] font-bold uppercase tracking-widest text-left transition-all ${sortBy === s ? 'border-accent bg-accent/5 text-accent' : 'border-gray-100 text-gray-500'}`}
                              >
                                 {s}
                              </button>
                           ))}
                        </div>
                     </section>

                     <section>
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-400 mb-6">Categories</h3>
                        <div className="grid grid-cols-2 gap-4">
                           {categories.map(cat => (
                              <button 
                                key={cat} onClick={() => { setSelectedCategory(cat); setIsFilterOpen(false); }}
                                className={`px-4 py-4 border text-[10px] font-bold uppercase tracking-widest transition-all ${selectedCategory === cat ? 'border-accent bg-accent/5 text-accent' : 'border-gray-100 text-gray-500'}`}
                              >
                                 {cat}
                              </button>
                           ))}
                        </div>
                     </section>
                  </div>

                  <div className="p-8 border-t border-gray-50 bg-gray-50/50">
                     <button onClick={() => setIsFilterOpen(false)} className="w-full py-5 bg-black text-white text-[10px] font-bold uppercase tracking-[0.5em] rounded-xl shadow-xl">
                        Apply Filters
                     </button>
                  </div>
               </motion.div>
            </>
         )}
      </AnimatePresence>
    </div>
  );
}
