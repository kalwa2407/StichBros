"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, ShoppingBag, Heart } from 'lucide-react';
import { getHomepageData } from '@/lib/catalog';
import { useCart } from '@/components/CartContext';

export default function ShopPage() {
  const data = getHomepageData();
  const { addToCart } = useCart();
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

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
    <div className="min-h-screen bg-white pt-32 pb-24 text-black">
      <div className="container max-w-[1400px]">
        {/* Myntra Breadcrumbs */}
        <nav className="text-[11px] mb-8 flex items-center space-x-2 text-gray-500 font-medium pt-4">
          <a href="/" className="hover:text-black">Home</a>
          <span>/</span>
          <span className="text-black font-bold">Clothing</span>
        </nav>

        <div className="flex items-center space-x-2 mb-8">
           <h1 className="text-lg font-bold uppercase tracking-wider">CHOICE Collection</h1>
           <span className="text-gray-400 font-normal"> - {filteredProducts.length} items</span>
        </div>

        <div className="flex border-t border-gray-100">
          {/* Myntra Filters Sidebar - Fixed Width */}
          <aside className="w-56 flex-shrink-0 pt-8 pr-6 border-r border-gray-100 hidden lg:block">
            <div className="sticky top-32 space-y-8">
              <div>
                <h3 className="text-xs font-bold uppercase mb-4 tracking-wider">Categories</h3>
                <div className="space-y-3">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
                      <input 
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                        className="w-4 h-4 accent-accent"
                      />
                      <span className={`text-sm transition-colors ${selectedCategory === cat ? 'text-black font-bold' : 'text-gray-600 group-hover:text-black'}`}>
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-xs font-bold uppercase mb-4 tracking-wider">Price Range</h3>
                <div className="space-y-3 text-sm text-gray-600">
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

          {/* Main Grid Content */}
          <main className="flex-grow pt-8 lg:pl-8">
            {/* Sort & Controls */}
            <div className="flex justify-end mb-8">
              <div className="relative group border border-gray-200 px-4 py-2 hover:bg-gray-50 cursor-pointer min-w-[200px]">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-gray-500">Sort by: </span>
                  <span className="font-bold flex items-center">{sortBy} <ChevronDown size={14} className="ml-1" /></span>
                </div>
                {/* Dropdown */}
                <div className="absolute top-full right-[-1px] left-[-1px] bg-white border border-gray-200 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-30">
                   {['Newest', 'Price: Low to High', 'Price: High to Low'].map(s => (
                     <button 
                       key={s} 
                       onClick={() => setSortBy(s)}
                       className="w-full px-4 py-3 text-left text-xs hover:bg-gray-50 transition-colors"
                     >
                       {s}
                     </button>
                   ))}
                </div>
              </div>
            </div>

            {/* Myntra Style Grid - 4 Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group relative"
                  >
                    <a href={`/shop/${product.id}`} className="block">
                      {/* Image Container */}
                      <div className="relative aspect-[3/4] bg-white overflow-hidden border border-gray-200 group-hover:border-accent transition-colors">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        
                        {/* Wishlist Icon */}
                        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors z-10">
                           <Heart size={16} />
                        </button>

                        {/* Add to Bag on Hover */}
                        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-xl z-20">
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              addToCart(product);
                            }}
                            className="w-full py-2.5 bg-accent text-black text-[11px] font-bold uppercase tracking-widest flex items-center justify-center space-x-2"
                          >
                            <ShoppingBag size={14} />
                            <span>Add to Bag</span>
                          </button>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="pt-4 px-3 pb-4 border border-t-0 border-gray-200 group-hover:shadow-2xl transition-all bg-white">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest mb-1">CHOICE</h4>
                        <h3 className="text-gray-500 text-[11px] truncate mb-2">{product.name}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold font-serif">₹{product.price.toLocaleString()}</span>
                          <span className="text-[10px] text-gray-400 line-through font-light">₹{(product.price * 1.5).toLocaleString()}</span>
                          <span className="text-[10px] text-orange-500 font-bold uppercase tracking-tighter">33% OFF</span>
                        </div>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {filteredProducts.length === 0 && (
               <div className="py-32 text-center">
                  <p className="text-gray-400">No items match your selection.</p>
                  <button onClick={() => setSelectedCategory('All')} className="text-accent underline font-bold text-sm mt-4">Clear Filters</button>
               </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
