"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, MapPin, CreditCard, CheckCircle, ArrowRight, ChevronLeft, Loader2 } from 'lucide-react';
import { useCart } from '@/components/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Success
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const deliveryCharges = totalPrice > 50000 ? 0 : 500;
  const finalTotal = totalPrice + deliveryCharges;

  if (cart.length === 0 && step < 3) {
    return (
      <div className="min-h-screen bg-bg pt-48 text-center text-white flex flex-col items-center">
         <h2 className="text-xl font-serif mb-4">Your collection is empty.</h2>
         <Link href="/shop" className="button-outline">Return to Shop</Link>
      </div>
    );
  }

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      setStep(3);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-bg pt-32 pb-24 text-white">
      <div className="container max-w-5xl mx-auto px-6">
        
        {/* Progress Header */}
        <div className="flex items-center justify-center mb-12 space-x-4 md:space-x-12">
           {['Address', 'Payment', 'Success'].map((s, idx) => (
             <div key={s} className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step >= idx + 1 ? 'bg-accent text-black shadow-[0_0_15px_rgba(212,178,111,0.5)]' : 'bg-surface text-text-muted border border-line'}`}>
                   {idx + 1}
                </div>
                <span className={`text-[10px] uppercase tracking-widest font-bold transition-colors ${step >= idx + 1 ? 'text-accent' : 'text-text-muted'}`}>{s}</span>
                {idx < 2 && <div className={`w-8 md:w-16 h-[1px] ${step >= idx + 2 ? 'bg-accent' : 'bg-line'} hidden md:block transition-colors`}></div>}
             </div>
           ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <main className="flex-grow w-full">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="address"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-surface/50 p-8 border border-line rounded-2xl shadow-2xl backdrop-blur-sm space-y-8"
                >
                   <div className="flex items-center justify-between">
                      <h2 className="text-sm font-bold text-accent uppercase tracking-wider flex items-center">
                         <MapPin size={18} className="mr-2" /> Select Delivery Address
                      </h2>
                      <button className="text-[10px] font-bold uppercase tracking-widest text-accent border border-accent/50 px-4 py-2 hover:bg-accent hover:text-black transition-colors rounded-lg">
                        Add New Address
                      </button>
                   </div>

                   <div className="border border-accent p-6 rounded-xl relative bg-accent/5">
                      <div className="absolute top-4 right-4 bg-accent text-black text-[9px] font-bold px-2 py-1 rounded-sm uppercase tracking-widest">Default</div>
                      <h3 className="font-serif text-lg mb-2 text-white">Aman Talukdar</h3>
                      <p className="text-xs text-text-muted leading-relaxed max-w-sm mb-4">
                         42, Heritage Enclave, Civil Lines,<br />
                         Lucknow, Uttar Pradesh - 226001<br />
                         Mobile: <span className="text-white font-medium">8840658081</span>
                      </p>
                      <div className="flex space-x-6">
                         <button className="text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-white transition-colors">Edit</button>
                      </div>
                   </div>

                   <button 
                     onClick={() => setStep(2)}
                     className="button-premium w-full group flex justify-center items-center"
                   >
                     Deliver To This Address
                     <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                   </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-surface/50 p-8 border border-line rounded-2xl shadow-2xl backdrop-blur-sm space-y-8"
                >
                   <div className="flex items-center justify-between border-b border-line pb-6">
                      <h2 className="text-sm font-bold text-accent uppercase tracking-wider flex items-center">
                         <CreditCard size={18} className="mr-2" /> Payment Method
                      </h2>
                      <button onClick={() => setStep(1)} className="text-[10px] uppercase tracking-widest flex items-center text-text-muted hover:text-white group">
                         <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform mr-1" /> Back
                      </button>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {['card', 'upi'].map((m) => (
                        <button 
                          key={m}
                          onClick={() => setPaymentMethod(m)}
                          className={`p-6 border rounded-xl cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${paymentMethod === m ? 'border-accent bg-accent/10 shadow-[0_0_15px_rgba(212,178,111,0.15)]' : 'border-line hover:border-white/20'}`}
                        >
                           {m === 'card' ? <CreditCard size={24} className={paymentMethod === m ? 'text-accent' : 'text-text-muted'} /> : <svg className={`w-6 h-6 ${paymentMethod === m ? 'text-accent' : 'text-text-muted'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>}
                           <p className={`text-[11px] font-bold uppercase tracking-widest ${paymentMethod === m ? 'text-accent' : 'text-text-muted'}`}>
                             {m === 'card' ? 'Credit/Debit Card' : 'UPI (GPay, PhonePe)'}
                           </p>
                        </button>
                      ))}
                   </div>

                   {paymentMethod === 'card' && (
                     <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                       <div className="p-6 bg-black rounded-xl border border-line space-y-4 relative overflow-hidden group hover:border-accent/50 transition-colors">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                          <div className="flex items-center space-x-4 relative z-10">
                             <div className="w-12 h-8 bg-gradient-to-r from-gray-200 to-white rounded flex items-center justify-center">
                               <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
                             </div>
                             <span className="text-sm font-medium font-mono text-white tracking-widest">**** **** **** 4081</span>
                              <span className="text-[10px] text-accent font-bold uppercase ml-auto tracking-widest border border-accent/30 px-2 py-1 rounded">Saved</span>
                          </div>
                          <div className="relative z-10">
                             <label className="text-[10px] text-text-muted uppercase tracking-widest mb-2 block">Security Code</label>
                             <input 
                               type="password" 
                               placeholder="CVV" 
                               className="w-1/3 p-3 bg-white/5 border border-line rounded-lg text-sm text-white focus:border-accent outline-none font-mono tracking-widest transition-colors"
                               maxLength={3}
                             />
                          </div>
                       </div>
                     </motion.div>
                   )}

                   {paymentMethod === 'upi' && (
                     <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                        <div className="p-6 bg-black rounded-xl border border-line">
                           <label className="text-[10px] text-text-muted uppercase tracking-widest mb-2 block">Enter UPI ID</label>
                           <input 
                             type="text" 
                             placeholder="username@upi" 
                             className="w-full p-4 bg-white/5 border border-line rounded-lg text-sm text-white focus:border-accent outline-none transition-colors"
                           />
                        </div>
                     </motion.div>
                   )}

                   <button 
                     onClick={handlePayment}
                     disabled={isProcessing}
                     className="button-premium w-full flex items-center justify-center relative overflow-hidden disabled:opacity-80"
                   >
                     {isProcessing ? (
                       <span className="flex items-center">
                          <Loader2 size={18} className="animate-spin mr-2" /> Processing Securely...
                       </span>
                     ) : (
                       <span className="flex items-center">
                          <ShieldCheck size={18} className="mr-2" /> Pay ₹{finalTotal.toLocaleString()}
                       </span>
                     )}
                   </button>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="bg-surface/50 p-12 border border-line rounded-2xl shadow-2xl backdrop-blur-sm text-center flex flex-col items-center"
                >
                   <div className="relative mb-8">
                     <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full"></div>
                     <motion.div 
                       initial={{ scale: 0 }} 
                       animate={{ scale: 1 }} 
                       transition={{ type: 'spring', delay: 0.2 }}
                       className="w-24 h-24 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center relative z-10 text-green-500"
                     >
                        <CheckCircle size={48} strokeWidth={1.5} />
                     </motion.div>
                   </div>
                   
                   <h2 className="text-3xl font-serif text-white mb-4">Payment Successful</h2>
                   <p className="text-text-muted text-sm max-w-md leading-relaxed mb-8">
                      Your order has been securely processed. Our concierge will be in touch with shipping updates.
                   </p>
                   
                   <div className="bg-black/50 border border-line rounded-xl p-6 w-full max-w-xs mb-8 space-y-3">
                      <div className="flex justify-between items-center border-b border-line pb-3">
                         <span className="text-[10px] uppercase tracking-widest text-text-muted">Order ID</span>
                         <span className="text-xs font-mono text-accent">CH-{(Math.random() * 1000000).toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] uppercase tracking-widest text-text-muted">Amount</span>
                         <span className="text-xs font-serif text-white">₹{finalTotal.toLocaleString()}</span>
                      </div>
                   </div>

                   <Link href="/shop" className="button-outline">
                      Return to Collections
                   </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Right Sidebar - Summary */}
          {step < 3 && (
            <aside className="w-full lg:w-96 flex-shrink-0 space-y-6 lg:sticky lg:top-32">
              <div className="bg-surface/50 p-6 border border-line rounded-2xl shadow-2xl backdrop-blur-sm">
                 <h3 className="text-[10px] uppercase tracking-widest font-bold text-accent mb-6 pb-4 border-b border-line flex items-center">
                    <ShieldCheck size={14} className="mr-2" /> Secure Selection
                 </h3>
                 
                 <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                    {cart.map(item => (
                      <div key={item.id} className="flex space-x-4 items-center">
                         <div className="w-16 h-20 bg-black rounded-lg shrink-0 border border-line overflow-hidden relative group">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                         </div>
                         <div className="flex-grow">
                            <p className="font-bold text-xs uppercase tracking-wider text-white line-clamp-1 mb-1">{item.name}</p>
                            <p className="text-[10px] text-text-muted uppercase tracking-widest mb-2">Qty: {item.quantity}</p>
                            <p className="font-serif italic text-accent text-sm">₹{item.price.toLocaleString()}</p>
                         </div>
                      </div>
                    ))}
                 </div>
                 
                 <div className="space-y-4 pt-6 border-t border-line text-xs font-medium">
                    <div className="flex justify-between text-text-muted">
                       <span className="uppercase tracking-widest text-[10px]">Subtotal</span>
                       <span>₹{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-text-muted">
                       <span className="uppercase tracking-widest text-[10px]">Shipping</span>
                       <span className="text-accent">{deliveryCharges === 0 ? 'Complimentary' : `₹${deliveryCharges}`}</span>
                    </div>
                    <div className="flex justify-between text-lg font-serif pt-4 border-t border-line text-white">
                       <span>Total</span>
                       <span className="text-accent">₹{finalTotal.toLocaleString()}</span>
                    </div>
                 </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
