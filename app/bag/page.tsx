"use client";

import React from 'react';
import { useCart } from '@/components/CartContext';
import { Minus, Plus, X, ShieldCheck, Truck, Tag, ShoppingBag, Heart, ChevronRight } from 'lucide-react';

export default function BagPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  const mrpTotal = Math.round(totalPrice * 1.5);
  const discount = mrpTotal - totalPrice;
  const deliveryCharges = totalPrice > 50000 ? 0 : 500;
  const finalTotal = totalPrice + deliveryCharges;

  if (cart.length === 0) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0a', paddingTop: 140, textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ maxWidth: 400, margin: '0 auto', padding: '0 16px' }}>
          <div style={{ width: 96, height: 96, borderRadius: '50%', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <ShoppingBag size={40} color="#444" />
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Your Bag is Empty</h2>
          <p style={{ fontSize: 14, color: '#888', marginBottom: 32 }}>Looks like you haven't added anything yet.</p>
          <a href="/shop" style={{ display: 'inline-block', padding: '14px 40px', background: '#C5A059', color: '#000', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.15em', textDecoration: 'none' }}>
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', paddingTop: 100, paddingBottom: 120, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 16px' }}>
        
        {/* Header */}
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#111', marginBottom: 20 }}>
          My Bag <span style={{ fontSize: 14, color: '#888', fontWeight: 400 }}>({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
        </h1>

        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }} className="bag-layout">
          
          {/* Left: Items */}
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
            
            {/* Delivery Banner */}
            <div style={{ background: '#fff', borderRadius: 8, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, border: '1px solid #e5e7eb' }}>
              <Truck size={18} color="#16a34a" />
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>Free delivery on orders above ₹50,000</p>
                <p style={{ fontSize: 11, color: '#999' }}>StitchBros Complimentary Shipping</p>
              </div>
            </div>

            {/* Savings */}
            <div style={{ background: '#f0fdf4', border: '1px solid #dcfce7', borderRadius: 8, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Tag size={14} color="#16a34a" />
              <p style={{ fontSize: 12, color: '#15803d', fontWeight: 500 }}>
                You're saving <strong>₹{discount.toLocaleString()}</strong> on this order!
              </p>
            </div>

            {/* Items */}
            {cart.map((item) => (
              <div key={item.id} style={{ background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                <div style={{ padding: '16px', display: 'flex', gap: 16 }}>
                  {/* Image */}
                  <a href={`/shop/${item.id}`} style={{ flexShrink: 0 }}>
                    <div style={{ width: 100, height: 130, background: '#f9fafb', borderRadius: 8, overflow: 'hidden', border: '1px solid #f0f0f0' }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </a>

                  {/* Details */}
                  <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <p style={{ fontSize: 10, color: '#999', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>StitchBros</p>
                          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#111', margin: '2px 0' }}>{item.name}</h3>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'transparent', cursor: 'pointer', color: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <X size={16} />
                        </button>
                      </div>

                      {/* Price */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: '#111' }}>₹{item.price.toLocaleString()}</span>
                        <span style={{ fontSize: 12, color: '#999', textDecoration: 'line-through' }}>₹{Math.round(item.price * 1.5).toLocaleString()}</span>
                        <span style={{ fontSize: 11, color: '#ea580c', fontWeight: 700, background: '#fff7ed', padding: '2px 6px', borderRadius: 4 }}>33% OFF</span>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: 999, overflow: 'hidden' }}>
                        <button onClick={() => updateQuantity(item.id, -1)} style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer', color: '#666', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Minus size={14} />
                        </button>
                        <span style={{ width: 32, textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#111' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer', color: '#666', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div style={{ borderTop: '1px solid #f0f0f0', display: 'flex' }}>
                  <button onClick={() => removeFromCart(item.id)} style={{ flex: 1, padding: '10px', fontSize: 12, fontWeight: 500, color: '#666', background: 'transparent', border: 'none', borderRight: '1px solid #f0f0f0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    <X size={14} /> Remove
                  </button>
                  <button style={{ flex: 1, padding: '10px', fontSize: 12, fontWeight: 500, color: '#666', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    <Heart size={14} /> Wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Price Summary (Desktop) */}
          <aside style={{ width: 340, flexShrink: 0, position: 'sticky', top: 100, display: 'flex', flexDirection: 'column', gap: 16 }} className="bag-sidebar">
            {/* Coupon */}
            <div style={{ background: '#fff', borderRadius: 8, padding: '16px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#999', fontWeight: 700, marginBottom: 12 }}>Coupons & Offers</h3>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '8px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Tag size={16} color="#666" />
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>Apply Coupon</span>
                </div>
                <ChevronRight size={16} color="#999" />
              </div>
            </div>

            {/* Price Breakdown */}
            <div style={{ background: '#fff', borderRadius: 8, padding: '20px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#999', fontWeight: 700, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #f0f0f0' }}>
                Price Details ({totalItems} {totalItems === 1 ? 'Item' : 'Items'})
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Total MRP</span>
                  <span style={{ color: '#111' }}>₹{mrpTotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Discount on MRP</span>
                  <span style={{ color: '#16a34a', fontWeight: 600 }}>-₹{discount.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Delivery Fee</span>
                  <span style={{ color: deliveryCharges === 0 ? '#16a34a' : '#111', fontWeight: deliveryCharges === 0 ? 600 : 400 }}>
                    {deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 16, color: '#111', paddingTop: 16, marginTop: 16, borderTop: '2px solid #111' }}>
                <span>Total Amount</span>
                <span>₹{finalTotal.toLocaleString()}</span>
              </div>

              <a href="/checkout" style={{
                display: 'block', width: '100%', padding: '14px', textAlign: 'center', marginTop: 20,
                background: '#C5A059', color: '#000', fontWeight: 700, fontSize: 12,
                textTransform: 'uppercase', letterSpacing: '0.15em', textDecoration: 'none',
              }}>
                Place Order
              </a>
            </div>

            {/* Trust */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#bbb', fontSize: 10, padding: 8 }}>
              <ShieldCheck size={12} /> 100% Secure Payments • PCI DSS Compliant
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile Sticky Bottom */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff',
        borderTop: '1px solid #e5e7eb', padding: '12px 16px', zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
      }} className="bag-mobile-bar">
        <div>
          <p style={{ fontSize: 11, color: '#999' }}>Total</p>
          <p style={{ fontSize: 18, fontWeight: 700, color: '#111' }}>₹{finalTotal.toLocaleString()}</p>
          <p style={{ fontSize: 10, color: '#16a34a', fontWeight: 600 }}>You save ₹{discount.toLocaleString()}</p>
        </div>
        <a href="/checkout" style={{
          padding: '12px 32px', background: '#C5A059', color: '#000', fontWeight: 700,
          fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none',
        }}>
          Place Order
        </a>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .bag-sidebar { display: none !important; }
        }
        @media (min-width: 1024px) {
          .bag-layout { flex-direction: row !important; }
          .bag-mobile-bar { display: none !important; }
        }
        @media (max-width: 1023px) {
          .bag-layout { flex-direction: column !important; }
        }
      `}</style>
    </div>
  );
}
