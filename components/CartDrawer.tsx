"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Tag } from 'lucide-react';
import { useCart } from './CartContext';
import Link from 'next/link';

export function CartDrawer() {
  const { cart, isOpen, setIsOpen, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  const deliveryCharges = totalPrice > 50000 ? 0 : 500;
  const savings = Math.round(totalPrice * 0.33);

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
            className="fixed top-0 right-0 bottom-0 w-full max-w-[420px] bg-white z-[101] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="px-4 py-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-gray-800" />
                <div>
                  <h3 className="text-base font-bold text-gray-900">Shopping Bag</h3>
                  <p className="text-[11px] text-gray-400">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500"
              >
                <X size={18} />
              </button>
            </div>

            {/* Savings Banner */}
            {cart.length > 0 && (
              <div className="px-4 py-2.5 bg-green-50 border-b border-green-100 flex items-center gap-2">
                <Tag size={14} className="text-green-600" />
                <p className="text-xs text-green-700 font-medium">
                  You save <span className="font-bold">₹{savings.toLocaleString()}</span> on this order!
                </p>
              </div>
            )}

            {/* Items */}
            <div className="flex-grow overflow-y-auto">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-8">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag size={32} className="text-gray-300" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Your bag is empty</h4>
                  <p className="text-sm text-gray-400 mb-6">Looks like you haven't added anything yet.</p>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="px-8 py-3 bg-accent text-black font-bold text-xs uppercase tracking-widest hover:bg-[#D4B26F] transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {cart.map((item) => (
                    <div key={item.id} className="p-4 flex gap-4 hover:bg-gray-50/50 transition-colors">
                      {/* Product Image */}
                      <div className="w-[90px] h-[110px] bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">StichBros</p>
                              <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <p className="text-[10px] text-gray-400 mt-0.5">Hand-crafted Legacy</p>
                        </div>

                        <div className="flex items-end justify-between mt-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-500 transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-gray-900">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-500 transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-sm font-bold text-gray-900">₹{item.price.toLocaleString()}</p>
                            <p className="text-[10px] text-gray-400 line-through">₹{(item.price * 1.5).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer / Price Summary */}
            {cart.length > 0 && (
              <div className="border-t border-gray-200 bg-gray-50">
                {/* Price Details */}
                <div className="px-4 py-4 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Delivery</span>
                    <span className={deliveryCharges === 0 ? 'text-green-600 font-medium' : ''}>
                      {deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>₹{(totalPrice + deliveryCharges).toLocaleString()}</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="px-4 pb-4 space-y-2">
                  <Link 
                     href="/checkout"
                     onClick={() => setIsOpen(false)}
                     className="flex items-center justify-center w-full py-3.5 bg-accent text-black font-bold text-xs uppercase tracking-widest hover:bg-[#D4B26F] transition-colors gap-2"
                  >
                     Proceed to Checkout
                     <ArrowRight size={14} />
                  </Link>
                  <Link
                     href="/bag"
                     onClick={() => setIsOpen(false)}
                     className="flex items-center justify-center w-full py-3 border border-gray-300 text-gray-700 font-semibold text-xs uppercase tracking-widest hover:border-gray-500 transition-colors"
                  >
                     View Bag
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
