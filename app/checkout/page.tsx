"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, MapPin, CreditCard, CheckCircle, ArrowRight, ChevronLeft } from 'lucide-react';
import { useCart } from '@/components/CartContext';

export default function CheckoutPage() {
  const { cart, totalPrice } = useCart();
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Confirmation

  const deliveryCharges = totalPrice > 50000 ? 0 : 500;
  const finalTotal = totalPrice + deliveryCharges;

  if (cart.length === 0 && step < 3) {
    return (
      <div className="min-h-screen bg-white pt-48 text-center text-black">
         <h2 className="text-xl font-bold">Your session has expired.</h2>
         <a href="/shop" className="text-accent underline block mt-4">Return to Shop</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-24 text-black">
      <div className="container max-w-4xl">
        
        {/* Progress Header */}
        <div className="flex items-center justify-center mb-12 space-x-4 md:space-x-12">
           {['Address', 'Payment', 'Success'].map((s, idx) => (
             <div key={s} className="flex items-center space-x-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= idx + 1 ? 'bg-accent text-black' : 'bg-gray-200 text-gray-400'}`}>
                   {idx + 1}
                </div>
                <span className={`text-[10px] uppercase tracking-widest font-bold ${step >= idx + 1 ? 'text-black' : 'text-gray-400'}`}>{s}</span>
                {idx < 2 && <div className="w-8 h-[1px] bg-gray-200 hidden md:block"></div>}
             </div>
           ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <main className="flex-grow w-full">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="address"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white p-8 border border-gray-100 rounded-sm shadow-sm space-y-8"
                >
                   <div className="flex items-center justify-between">
                      <h2 className="text-sm font-bold uppercase tracking-wider flex items-center">
                         <MapPin size={18} className="mr-2 text-accent" /> Select Delivery Address
                      </h2>
                      <button className="text-[10px] font-bold uppercase tracking-widest text-accent border border-accent px-4 py-2 hover:bg-accent hover:text-black transition-colors">
                        Add New Address
                      </button>
                   </div>

                   <div className="border-2 border-accent p-6 rounded-sm relative">
                      <div className="absolute top-4 right-4 bg-accent text-[9px] font-bold px-2 py-1 rounded-sm">HOME</div>
                      <h3 className="font-bold text-sm mb-2">Aman Talukdar</h3>
                      <p className="text-xs text-gray-600 leading-relaxed max-w-sm">
                         42, Heritage Enclave, Civil Lines,<br />
                         Lucknow, Uttar Pradesh - 226001<br />
                         Mobile: <span className="font-bold">8840658081</span>
                      </p>
                      <div className="pt-6 flex space-x-6">
                         <button className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Remove</button>
                         <button className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Edit</button>
                      </div>
                   </div>

                   <button 
                     onClick={() => setStep(2)}
                     className="w-full py-4 bg-accent text-black font-bold text-sm uppercase tracking-widest shadow-lg shadow-accent/20"
                   >
                     Deliver To This Address
                   </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white p-8 border border-gray-100 rounded-sm shadow-sm space-y-8"
                >
                   <div className="flex items-center justify-between border-b border-gray-50 pb-6">
                      <h2 className="text-sm font-bold uppercase tracking-wider flex items-center">
                         <CreditCard size={18} className="mr-2 text-accent" /> Choose Payment Mode
                      </h2>
                      <button onClick={() => setStep(1)} className="text-[10px] flex items-center text-gray-400 hover:text-accent group">
                         <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Address
                      </button>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['UPI (Google Pay, PhonePe)', 'Credit/Debit Card', 'Net Banking'].map((m) => (
                        <div key={m} className={`p-4 border-2 rounded-sm cursor-pointer transition-all ${m.includes('UPI') ? 'border-accent bg-accent/5' : 'border-gray-100 hover:border-gray-300'}`}>
                           <p className="text-[10px] font-bold uppercase tracking-tight mb-2">{m.split(' ')[0]}</p>
                           <p className="text-[9px] text-gray-400 leading-tight">{m}</p>
                        </div>
                      ))}
                   </div>

                   <div className="p-6 bg-gray-50 rounded-sm border border-gray-100 space-y-4">
                      <div className="flex items-center space-x-4">
                         <div className="w-10 h-6 bg-gray-200 rounded-sm"></div>
                         <span className="text-xs font-medium">HDFC Bank Debit Card ending in 4081</span>
                         <span className="text-[10px] text-accent font-bold uppercase ml-auto">SAVED</span>
                      </div>
                      <input 
                        type="password" 
                        placeholder="Enter CVV" 
                        className="w-full p-4 border border-gray-200 text-xs focus:ring-1 focus:ring-accent outline-none"
                        maxLength={3}
                      />
                   </div>

                   <button 
                     onClick={() => setStep(3)}
                     className="w-full py-4 bg-black text-white font-bold text-sm uppercase tracking-widest shadow-xl"
                   >
                     Pay ₹{finalTotal.toLocaleString()}
                   </button>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-12 border border-gray-100 rounded-sm shadow-sm text-center space-y-6"
                >
                   <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto text-white">
                      <CheckCircle size={40} />
                   </div>
                   <h2 className="text-2xl font-serif">Order Confirmed</h2>
                   <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
                      Thank you for your choice. A courier from the institutional fleet has been dispatched to collect your heritage pieces.
                   </p>
                   <div className="pt-8 space-y-4">
                      <div className="text-[10px] uppercase tracking-widest text-gray-400">Order ID: CHOICE-HNW-998142</div>
                      <a href="/shop" className="inline-block px-10 py-4 bg-accent text-black font-bold text-sm uppercase tracking-widest">
                         Continue Shopping
                      </a>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Right Sidebar - Dynamic Summary */}
          {step < 3 && (
            <aside className="w-full lg:w-80 flex-shrink-0 space-y-6">
              <div className="bg-white p-6 border border-gray-100 rounded-sm shadow-sm">
                 <h3 className="text-[11px] uppercase tracking-widest font-bold text-gray-400 mb-4 pb-4 border-b border-gray-50">Order Summary</h3>
                 <div className="space-y-4 mb-6 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {cart.map(item => (
                      <div key={item.id} className="flex space-x-3 text-xs">
                         <div className="w-10 h-14 bg-gray-50 shrink-0">
                            <img src={item.image} alt="" className="w-full h-full object-cover" />
                         </div>
                         <div className="flex-grow">
                            <p className="font-bold truncate">{item.name}</p>
                            <p className="text-gray-400">Qty: {item.quantity}</p>
                            <p className="font-bold mt-1">₹{item.price.toLocaleString()}</p>
                         </div>
                      </div>
                    ))}
                 </div>
                 
                 <div className="space-y-3 pt-4 border-t border-gray-50 text-[11px] font-medium">
                    <div className="flex justify-between">
                       <span className="text-gray-500 uppercase tracking-widest">Bag Total</span>
                       <span>₹{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-gray-500 uppercase tracking-widest">Convenience Fee</span>
                       <span className="text-green-500">{deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold pt-2 border-t border-gray-50">
                       <span className="uppercase tracking-widest">Order Total</span>
                       <span className="font-serif">₹{finalTotal.toLocaleString()}</span>
                    </div>
                 </div>
              </div>
              
              <div className="flex items-center space-x-2 text-[10px] text-gray-400 uppercase tracking-widest justify-center">
                 <ShieldCheck size={14} className="text-green-500" />
                 <span>100% Secure Checkout</span>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
