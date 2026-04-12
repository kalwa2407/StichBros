"use client";

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { getProductById } from '@/lib/catalog';
import { useCart } from '@/components/CartContext';
import { ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw, ChevronRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductDetailsPage() {
  const params = useParams();
  const product = useMemo(() => getProductById(params.id as string), [params.id]);
  const { addToCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState("");

  if (!product) {
    return <div className="min-h-screen pt-48 text-center">Product not found.</div>;
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-24 text-black">
      <div className="container max-w-[1400px]">
        
        {/* Breadcrumbs */}
        <nav className="text-[11px] mb-8 flex items-center space-x-2 text-gray-500 font-medium pt-8">
          <a href="/" className="hover:text-black">Home</a>
          <span>/</span>
          <a href="/shop" className="hover:text-black">Clothing</a>
          <span>/</span>
          <span className="text-black font-bold truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left: Image Gallery (Myntra 2-column Grid) */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
             {product.images.map((img, idx) => (
                <div key={idx} className="aspect-[3/4] bg-gray-50 overflow-hidden border border-gray-100 cursor-zoom-in">
                   <img 
                     src={img} 
                     alt={`${product.name} view ${idx + 1}`} 
                     className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                   />
                </div>
             ))}
          </div>

          {/* Right: Sticky Product Info */}
          <div className="lg:w-1/3 relative">
            <div className="lg:sticky lg:top-32 space-y-8">
               
               {/* Brand & Title */}
               <div className="space-y-1">
                  <h1 className="text-2xl font-bold uppercase tracking-widest">{product.brand || "CHOICE"}</h1>
                  <h2 className="text-lg text-gray-500 font-light">{product.name}</h2>
                  
                  {/* Rating Badge */}
                  <div className="inline-flex items-center border border-gray-100 px-2 py-1 space-x-2 mt-4 cursor-pointer hover:border-gray-300">
                     <span className="text-xs font-bold flex items-center">4.8 <Star size={10} className="ml-1 text-green-600 fill-green-600" /></span>
                     <div className="w-[1px] h-3 bg-gray-200" />
                     <span className="text-xs text-gray-400">1.2k Ratings</span>
                  </div>
               </div>

               <div className="w-full h-[1px] bg-gray-100" />

               {/* Pricing */}
               <div className="space-y-1">
                  <div className="flex items-center space-x-4">
                     <span className="text-2xl font-bold italic font-serif">₹{product.price.toLocaleString()}</span>
                     <span className="text-lg text-gray-400 line-through font-light">₹{(product.price * 1.5).toLocaleString()}</span>
                     <span className="text-lg text-orange-500 font-bold">(33% OFF)</span>
                  </div>
                  <p className="text-green-600 text-[11px] font-bold uppercase">Inclusive of all taxes</p>
               </div>

               {/* Size Selector */}
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <h3 className="text-xs font-bold uppercase tracking-wider">Select Size</h3>
                     <button className="text-[10px] font-bold uppercase tracking-widest text-accent flex items-center">Size Chart <ChevronRight size={12} /></button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                     {product.sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-14 h-14 rounded-full border text-xs font-bold flex items-center justify-center transition-all ${
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

               {/* Primary Actions */}
               <div className="flex space-x-4">
                  <button 
                    onClick={() => addToCart(product)}
                    className="flex-grow py-5 bg-accent text-black font-bold flex items-center justify-center space-x-3 uppercase tracking-widest shadow-xl shadow-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                     <ShoppingBag size={20} />
                     <span>Add To Bag</span>
                  </button>
                  <button className="px-8 border border-gray-200 text-black font-bold uppercase tracking-widest flex items-center justify-center space-x-2 hover:border-black transition-colors">
                     <Heart size={20} />
                     <span>Wishlist</span>
                  </button>
               </div>

               <div className="w-full h-[1px] bg-gray-100" />

               {/* Trust Marks */}
               <div className="space-y-4 text-xs font-medium text-gray-700">
                  <div className="flex items-center"><Truck size={16} className="mr-3 text-gray-400" /> Get it by Mon, May 24</div>
                  <div className="flex items-center"><ShieldCheck size={16} className="mr-3 text-gray-400" /> 100% Original Products</div>
                  <div className="flex items-center"><RefreshCw size={16} className="mr-3 text-gray-400" /> Easy 14 days returns and exchanges</div>
               </div>

               {/* Detailed Tabs/Sections */}
               <div className="space-y-6 pt-4">
                  <div>
                     <h3 className="font-bold text-sm uppercase tracking-wider mb-4">Product Details</h3>
                     <p className="text-gray-500 text-sm leading-relaxed font-light">
                        {product.longDescription || product.description}
                     </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-4 text-xs">
                     {product.details.map(detail => (
                        <div key={detail.label}>
                           <p className="text-gray-400 uppercase tracking-tighter mb-1">{detail.label}</p>
                           <p className="font-bold">{detail.value}</p>
                        </div>
                     ))}
                  </div>
               </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
