"use client";

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { getProductById } from '@/lib/catalog';
import { useCart } from '@/components/CartContext';
import { ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw, ChevronRight, Star, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductDetailsPage() {
  const params = useParams();
  const product = useMemo(() => getProductById(params.id as string), [params.id]);
  const { addToCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState("");
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return <div className="min-h-screen pt-48 text-center">Product not found.</div>;
  }

  // Handle Carousel Scroll
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-white pt-20 md:pt-24 pb-32 text-black overflow-x-hidden">
      <div className="container max-w-[1400px]">
        
        {/* Breadcrumbs - Hidden on Mobile */}
        <nav className="hidden md:flex text-[11px] mb-8 items-center space-x-2 text-gray-500 font-medium pt-8">
          <a href="/" className="hover:text-black">Home</a>
          <span>/</span>
          <a href="/shop" className="hover:text-black">Clothing</a>
          <span>/</span>
          <span className="text-black font-bold truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Mobile Back Button */}
        <div className="md:hidden flex items-center p-4 absolute top-20 left-0 z-20">
           <a href="/shop" className="p-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg">
              <ArrowLeft size={20} />
           </a>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Left: Image Carousel (High-End Swipe for Mobile, Grid for Desktop) */}
          <div className="lg:w-2/3">
             {/* Mobile Swipe Carousel */}
             <div className="md:hidden relative group">
                <div 
                  className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
                  style={{ scrollbarWidth: 'none' }}
                >
                  {product.images.map((img, idx) => (
                    <div key={idx} className="flex-shrink-0 w-full snap-center aspect-[3/4]">
                       <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                   {product.images.map((_, idx) => (
                     <div key={idx} className={`w-1.5 h-1.5 rounded-full ${idx === activeImage ? 'bg-accent w-4' : 'bg-white/50'} transition-all`} />
                   ))}
                </div>
             </div>

             {/* Desktop Grid */}
             <div className="hidden md:grid grid-cols-2 gap-4">
                {product.images.map((img, idx) => (
                    <div key={idx} className="aspect-[3/4] bg-gray-50 overflow-hidden border border-gray-100 cursor-zoom-in">
                      <img 
                        src={img} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                ))}
             </div>
          </div>

          {/* Right: Sticky Product Info */}
          <div className="lg:w-1/3 relative px-4 md:px-0">
            <div className="lg:sticky lg:top-32 space-y-8">
               
               {/* Brand & Title */}
               <div className="space-y-1 pt-4 md:pt-0">
                  <h1 className="text-xl md:text-2xl font-bold uppercase tracking-widest">{product.brand || "STITCHBROS"}</h1>
                  <h2 className="text-base md:text-lg text-gray-500 font-light">{product.name}</h2>
                  
                  {/* Rating Badge */}
                  <div className="inline-flex items-center border border-gray-100 px-2 py-1 space-x-2 mt-4">
                     <span className="text-xs font-bold flex items-center">4.8 <Star size={10} className="ml-1 text-green-600 fill-green-600" /></span>
                     <div className="w-[1px] h-3 bg-gray-200" />
                     <span className="text-xs text-gray-400">1.2k Ratings</span>
                  </div>
               </div>

               <div className="w-full h-[1px] bg-gray-100" />

               {/* Pricing */}
               <div className="space-y-1">
                  <div className="flex items-center space-x-4">
                     <span className="text-xl md:text-2xl font-bold italic font-serif text-accent">₹{product.price.toLocaleString()}</span>
                     <span className="text-base md:text-lg text-gray-400 line-through font-light">₹{(product.price * 1.5).toLocaleString()}</span>
                     <span className="text-base md:text-lg text-orange-500 font-bold">(33% OFF)</span>
                  </div>
                  <p className="text-green-600 text-[10px] md:text-[11px] font-bold uppercase">Inclusive of all taxes</p>
               </div>

               {/* Size Selector */}
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <h3 className="text-xs font-bold uppercase tracking-wider">Select Size</h3>
                     <button className="text-[10px] font-bold uppercase tracking-widest text-accent flex items-center">Size Chart <ChevronRight size={12} /></button>
                  </div>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                     {product.sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-12 h-12 md:w-14 md:h-14 rounded-full border text-[11px] font-bold flex items-center justify-center transition-all ${
                             selectedSize === size 
                             ? 'border-accent text-accent bg-accent/5 scale-110' 
                             : 'border-gray-200 text-gray-700 hover:border-accent'
                          }`}
                        >
                           {size}
                        </button>
                     ))}
                  </div>
               </div>

               {/* Primary Actions - Desktop */}
               <div className="hidden md:flex space-x-4">
                  <button 
                    onClick={() => addToCart(product)}
                    className="flex-grow py-5 bg-accent text-black font-bold flex items-center justify-center space-x-3 uppercase tracking-widest shadow-xl shadow-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                     <ShoppingBag size={20} />
                     <span>Add To Bag</span>
                  </button>
                  <button className="px-8 border border-gray-100 text-black font-bold uppercase tracking-widest flex items-center justify-center hover:border-black transition-colors">
                     <Heart size={20} />
                  </button>
               </div>

               <div className="w-full h-[1px] bg-gray-100" />

               {/* Descriptions */}
               <div className="space-y-6 pt-4">
                  <div>
                     <h3 className="font-bold text-xs uppercase tracking-wider mb-4">Product Details</h3>
                     <p className="text-gray-500 text-sm leading-relaxed font-light">
                        {product.longDescription || product.description}
                     </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-4 text-[11px]">
                     {product.details.map(detail => (
                        <div key={detail.label}>
                           <p className="text-gray-400 uppercase tracking-tighter mb-1 font-bold">{detail.label}</p>
                           <p className="font-medium text-gray-800">{detail.value}</p>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Trust Marks */}
               <div className="space-y-4 text-[11px] font-medium text-gray-700 pt-4 pb-12 md:pb-0">
                  <div className="flex items-center"><Truck size={14} className="mr-3 text-gray-400" /> Get it by Mon, May 24</div>
                  <div className="flex items-center"><ShieldCheck size={14} className="mr-3 text-gray-400" /> 100% Original Products</div>
                  <div className="flex items-center"><RefreshCw size={14} className="mr-3 text-gray-400" /> Easy 14 days returns and exchanges</div>
               </div>

            </div>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY BOTTOM ACTION BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4 flex items-center justify-between z-[100] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
         <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Selected Size: {selectedSize || 'None'}</span>
            <span className="text-lg font-bold font-serif text-accent">₹{product.price.toLocaleString()}</span>
         </div>
         <div className="flex space-x-3">
            <button className="p-3 border border-gray-100 rounded-lg">
               <Heart size={20} className="text-gray-400" />
            </button>
            <button 
              onClick={() => addToCart(product)}
              className="px-8 py-3 bg-accent text-black font-bold uppercase tracking-widest text-xs flex items-center space-x-2 rounded-lg"
            >
               <ShoppingBag size={16} />
               <span>Add to Bag</span>
            </button>
         </div>
      </div>
    </div>
  );
}
