"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from './CartContext';
import Link from 'next/link';

export function CartDrawer() {
  const { cart, isOpen, setIsOpen, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-bg border-l border-line z-[101] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 border-b border-line flex items-center justify-between">
              <div>
                <h3 className="text-xl font-serif">Your Cart</h3>
                <p className="text-[10px] uppercase tracking-widest text-accent mt-1">Heritage Collection</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-grow overflow-y-auto p-8 space-y-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <p className="text-text-muted font-light mb-6">Your collection is currently empty.</p>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="button-outline"
                  >
                    Explore Shop
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-6 items-start">
                    <div className="w-24 aspect-[3/4] bg-surface relative ring-1 ring-line">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-sm uppercase tracking-wide font-medium">{item.name}</h4>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-text-muted hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="text-accent text-sm mb-4">₹{item.price.toLocaleString()}</p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border border-line">
                          <button 
                             onClick={() => updateQuantity(item.id, -1)}
                             className="p-1 hover:bg-white/5"
                          >
                             <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                          <button 
                             onClick={() => updateQuantity(item.id, 1)}
                             className="p-1 hover:bg-white/5"
                          >
                             <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 border-t border-line space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted">Subtotal</span>
                  <span className="text-2xl font-serif text-accent">₹{totalPrice.toLocaleString()}</span>
                </div>
                <Link 
                   href="/checkout"
                   onClick={() => setIsOpen(false)}
                   className="button-premium w-full group flex justify-center items-center"
                >
                   Finalize Selection
                   <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="text-[9px] text-center text-text-muted uppercase tracking-widest">
                  Complimentary Insured Shipping included
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
