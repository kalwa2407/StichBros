"use client";

import React from 'react';
import { useCart } from '@/components/CartContext';
import { Minus, Plus, X, ShieldCheck, Truck, RefreshCw, ChevronRight, Heart, Tag, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function BagPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  const mrpTotal = Math.round(totalPrice * 1.5);
  const discount = mrpTotal - totalPrice;
  const deliveryCharges = totalPrice > 50000 ? 0 : 500;
  const finalTotal = totalPrice + deliveryCharges;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 md:pt-36 pb-24 text-center">
        <div className="max-w-md mx-auto px-4">
          <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-sm">
            <ShoppingBag size={40} className="text-gray-300" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Your Bag is Empty</h2>
          <p className="text-gray-500 text-sm mb-8">Looks like you haven't added anything to your bag yet.</p>
          <a href="/shop" className="inline-block px-10 py-4 bg-accent text-black font-bold text-sm uppercase tracking-widest hover:bg-[#D4B26F] transition-colors">
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 md:pt-28 pb-28 md:pb-24">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Page Header */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h1 className="text-lg md:text-2xl font-bold text-gray-900">
            Bag <span className="text-gray-400 text-sm md:text-base font-normal">({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-start">
          
          {/* Left: Cart Items */}
          <div className="flex-grow w-full space-y-3">
            
            {/* Delivery Info Bar */}
            <div className="bg-white rounded-lg p-3 md:p-4 flex items-center gap-3 border border-gray-100 shadow-sm">
              <Truck size={18} className="text-green-600 flex-shrink-0" />
              <div className="flex-grow">
                <p className="text-xs md:text-sm font-medium text-gray-900">Free delivery on orders above ₹50,000</p>
                <p className="text-[10px] md:text-xs text-gray-400">StichBros Complimentary Shipping</p>
              </div>
            </div>

            {/* Savings Banner */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-3 flex items-center gap-2">
              <Tag size={14} className="text-green-600 flex-shrink-0" />
              <p className="text-xs text-green-700 font-medium">
                You're saving <span className="font-bold">₹{discount.toLocaleString()}</span> on this order!
              </p>
            </div>

            {/* Cart Items */}
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-3 md:p-4">
                  <div className="flex gap-3 md:gap-4">
                    {/* Image */}
                    <Link href={`/shop/${item.id}`} className="block flex-shrink-0">
                      <div className="w-[80px] h-[100px] md:w-[120px] md:h-[150px] bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-contain p-1" 
                        />
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="flex-grow min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider">StichBros</p>
                          <h3 className="text-sm md:text-base font-medium text-gray-900 truncate">{item.name}</h3>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span className="text-sm md:text-base font-bold text-gray-900">₹{item.price.toLocaleString()}</span>
                        <span className="text-xs text-gray-400 line-through">₹{(item.price * 1.5).toLocaleString()}</span>
                        <span className="text-[10px] md:text-xs text-orange-600 font-bold bg-orange-50 px-1.5 py-0.5 rounded">33% OFF</span>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-500 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-gray-900">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-500 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Trust Badges - only show on md+ */}
                      <div className="hidden md:flex items-center gap-4 mt-3 text-[10px] text-gray-400">
                        <span className="flex items-center gap-1"><RefreshCw size={10} /> 14 Days Return</span>
                        <span className="flex items-center gap-1"><ShieldCheck size={10} /> Quality Assured</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="border-t border-gray-100 flex">
                  <button className="flex-1 py-2.5 text-xs font-medium text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-1.5 transition-colors border-r border-gray-100">
                    <X size={14} />
                    Remove
                  </button>
                  <button className="flex-1 py-2.5 text-xs font-medium text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-1.5 transition-colors">
                    <Heart size={14} />
                    Move to Wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Price Summary - Desktop */}
          <aside className="hidden lg:block w-96 flex-shrink-0 sticky top-28 space-y-4">
            {/* Coupon */}
            <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
              <h3 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-3">Coupons & Offers</h3>
              <div className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors">
                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-gray-500" />
                  <span className="text-sm font-semibold text-gray-900">Apply Coupon</span>
                </div>
                <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm space-y-4">
              <h3 className="text-xs uppercase tracking-widest font-bold text-gray-400 pb-3 border-b border-gray-100">
                Price Details ({totalItems} {totalItems === 1 ? 'Item' : 'Items'})
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total MRP</span>
                  <span className="text-gray-900">₹{mrpTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount on MRP</span>
                  <span className="text-green-600 font-medium">-₹{discount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className={deliveryCharges === 0 ? 'text-green-600 font-medium' : 'text-gray-900'}>
                    {deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 flex justify-between font-bold text-base text-gray-900">
                <span>Total Amount</span>
                <span>₹{finalTotal.toLocaleString()}</span>
              </div>

              <Link 
                href="/checkout"
                className="block w-full py-3.5 bg-accent text-black text-center font-bold text-sm uppercase tracking-widest hover:bg-[#D4B26F] transition-colors"
              >
                Place Order
              </Link>
            </div>

            {/* Trust */}
            <div className="flex items-center justify-center gap-4 opacity-40 grayscale py-2">
              <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-5" />
              <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" className="h-5" />
              <img src="https://img.icons8.com/color/48/000000/upi.png" alt="UPI" className="h-5" />
            </div>
            <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest">
              100% Secure Payments • PCI DSS Compliant
            </p>
          </aside>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Total</p>
            <p className="text-lg font-bold text-gray-900">₹{finalTotal.toLocaleString()}</p>
            <p className="text-[10px] text-green-600 font-medium">You save ₹{discount.toLocaleString()}</p>
          </div>
          <Link 
            href="/checkout"
            className="px-8 py-3 bg-accent text-black font-bold text-xs uppercase tracking-widest hover:bg-[#D4B26F] transition-colors"
          >
            Place Order
          </Link>
        </div>
      </div>
    </div>
  );
}
