"use client";

import React from 'react';
import { useCart } from '@/components/CartContext';
import { Minus, Plus, X, ShieldCheck, Truck, RefreshCw, ChevronRight } from 'lucide-react';

export default function BagPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  const mrpTotal = totalPrice * 1.5;
  const discount = mrpTotal - totalPrice;
  const deliveryCharges = totalPrice > 50000 ? 0 : 500;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-48 pb-24 text-center">
        <div className="container max-w-lg">
          <img src="/brand/items_mixed.png" alt="Empty Bag" className="w-32 mx-auto mb-8 opacity-20 grayscale" />
          <h2 className="text-xl font-bold mb-2">Hey, it feels so light!</h2>
          <p className="text-gray-500 text-sm mb-8">There is nothing in your bag. Let's add some heritage pieces.</p>
          <a href="/shop" className="inline-block px-10 py-4 border-2 border-accent text-black font-bold text-sm uppercase tracking-widest hover:bg-accent transition-colors">
            Go to Shop
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 text-black">
      <div className="container max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Bag Items */}
          <div className="flex-grow space-y-4">
             {/* Pincode Check Bar */}
             <div className="p-4 border border-gray-100 rounded flex items-center justify-between text-xs font-medium bg-gray-50/50">
                <span className="text-gray-600">Check delivery time & services</span>
                <button className="text-accent font-bold px-4 py-2 border border-accent rounded">Enter Pincode</button>
             </div>

             <div className="p-4 border border-gray-100 rounded flex items-center space-x-3 text-sm">
                <Truck size={18} className="text-gray-400" />
                <span className="font-bold text-xs uppercase tracking-tight">Choice Complimentary Shipping</span>
                <span className="text-gray-400 text-xs">For Silver Tier Legacy Members</span>
             </div>

             <div className="space-y-4">
               {cart.map((item) => (
                 <div key={item.id} className="p-6 border border-gray-100 rounded-sm bg-white shadow-sm hover:shadow-md transition-shadow relative group">
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X size={20} />
                    </button>
                    
                    <div className="flex gap-6">
                      <div className="w-32 aspect-[3/4] bg-white overflow-hidden border border-gray-50">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-grow space-y-1">
                        <h4 className="text-sm font-bold truncate">CHOICE</h4>
                        <h3 className="text-sm text-gray-600 mb-2 truncate">{item.name}</h3>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 bg-gray-50 inline-block px-2 py-1 mb-4">
                           Hand-crafted Legacy
                        </p>
                        
                        <div className="flex items-center space-x-4 mb-4">
                           <div className="flex items-center bg-gray-100 rounded px-2 py-1 space-x-4">
                              <span className="text-[11px] font-bold">Qty: {item.quantity}</span>
                              <div className="flex items-center border-l border-gray-200 pl-2">
                                 <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-accent"><Minus size={12} /></button>
                                 <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-accent"><Plus size={12} /></button>
                              </div>
                           </div>
                        </div>

                        <div className="flex items-center space-x-3">
                           <span className="text-sm font-bold font-serif">₹{item.price.toLocaleString()}</span>
                           <span className="text-xs text-gray-400 line-through">₹{(item.price * 1.5).toLocaleString()}</span>
                           <span className="text-xs text-orange-500 font-bold">33% OFF</span>
                        </div>

                        <div className="pt-4 flex items-center text-[10px] text-gray-500 space-x-4">
                           <div className="flex items-center"><RefreshCw size={12} className="mr-1" /> 14 Days Return</div>
                           <div className="flex items-center"><ShieldCheck size={12} className="mr-1" /> Quality Guard</div>
                        </div>
                      </div>
                    </div>
                 </div>
               ))}
             </div>
          </div>

          {/* Price Breakdown Sidebar */}
          <aside className="w-full lg:w-96 flex-shrink-0 space-y-6">
             <div className="p-6 border border-gray-100 rounded-sm bg-white shadow-sm space-y-6">
                <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-400">Coupons & Offers</h3>
                <div className="flex items-center justify-between group cursor-pointer">
                   <span className="text-sm font-bold flex items-center shrink-0">Apply Coupon</span>
                   <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
             </div>

             <div className="p-6 border border-gray-100 rounded-sm bg-white shadow-sm space-y-4">
                <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-400 pb-2 border-b border-gray-50">Price Details ({cart.length} Items)</h3>
                
                <div className="space-y-3 text-sm">
                   <div className="flex justify-between">
                      <span className="text-gray-600">Total MRP</span>
                      <span>₹{mrpTotal.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between">
                      <span className="text-gray-600">Discount on MRP</span>
                      <span className="text-green-500">-₹{discount.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between">
                      <span className="text-gray-600">Coupon Discount</span>
                      <span className="text-accent cursor-pointer">Apply Coupon</span>
                   </div>
                   <div className="flex justify-between">
                      <span className="text-gray-600">Convenience Fee <span className="text-accent font-bold ml-1 cursor-pointer">Know More</span></span>
                      <span>₹{deliveryCharges}</span>
                   </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-between font-bold text-lg">
                   <span>Total Amount</span>
                   <span className="font-serif">₹{(totalPrice + deliveryCharges).toLocaleString()}</span>
                </div>

                <a 
                  href="/checkout"
                  className="block w-full py-4 bg-accent text-black text-center font-bold text-sm uppercase tracking-widest shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                   Place Order
                </a>
             </div>

             <div className="space-y-4 pt-4">
                <div className="flex items-center justify-center space-x-6 grayscale opacity-40">
                   <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-6" />
                   <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" className="h-6" />
                   <img src="https://img.icons8.com/color/48/000000/upi.png" alt="UPI" className="h-6" />
                </div>
                <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest leading-relaxed">
                   100% Secure Payments • PCI DSS Compliant • Legacy Encrypted
                </p>
             </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
