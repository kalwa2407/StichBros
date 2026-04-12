"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from './CartContext';

export function ProductGrid({ products }: { products: any[] }) {
  const { addToCart } = useCart();

  return (
    <section id="collection" className="py-24 bg-bg">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
          <div>
            <p className="text-accent text-[12px] uppercase tracking-[0.4em] mb-4 font-semibold">The Collection</p>
            <h2 className="text-4xl md:text-6xl font-serif">Curated Masterpieces</h2>
          </div>
          <p className="text-text-muted max-w-sm text-sm font-light leading-relaxed">
            Every garment is a testament to our dynasty's commitment to precision, 
            crafted for those who build legacies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <a href={`/shop/${product.id}`} className="block">
                <div className="relative aspect-[3/4] overflow-hidden bg-white mb-6 border border-gray-200 group-hover:border-accent transition-all duration-300">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="p-4 bg-accent text-black rounded-full hover:scale-110 transition-transform"
                      title="Add to Cart"
                    >
                      <ShoppingCart size={20} />
                    </button>
                    <div className="p-4 bg-white/20 backdrop-blur-md text-white rounded-full hover:scale-110 transition-transform">
                      <ArrowRight size={20} />
                    </div>
                  </div>

                  {/* Tag */}
                  <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-accent px-3 py-1 text-[9px] uppercase tracking-widest border border-accent/20">
                    {product.category}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-serif text-text group-hover:text-accent transition-colors">
                      {product.name}
                    </h3>
                    <span className="text-accent font-medium text-lg">
                      ₹{product.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-text-muted text-sm font-light line-clamp-2">
                    {product.description}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2">
                    {product.specs.slice(0, 2).map((spec: string) => (
                        <span key={spec} className="text-[10px] text-text-muted/60 uppercase tracking-tighter border border-line-soft px-2 py-1">
                          {spec}
                        </span>
                    ))}
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
