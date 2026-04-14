"use client";

import React from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Tag, ShieldCheck } from 'lucide-react';
import { useCart } from './CartContext';

export function CartDrawer() {
  const { cart, isOpen, setIsOpen, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  const deliveryCharges = totalPrice > 50000 ? 0 : 500;
  const savings = Math.round(totalPrice * 0.33);
  const finalTotal = totalPrice + deliveryCharges;

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div onClick={() => setIsOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 100 }} />

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: 420,
        background: '#fff', zIndex: 101, display: 'flex', flexDirection: 'column',
        boxShadow: '-10px 0 40px rgba(0,0,0,0.3)', fontFamily: 'Inter, sans-serif',
      }}>
        {/* Header */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <ShoppingBag size={20} color="#333" />
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111' }}>Shopping Bag</h3>
              <p style={{ fontSize: 11, color: '#999' }}>{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} style={{ width: 36, height: 36, borderRadius: '50%', border: 'none', background: '#f5f5f5', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
            <X size={18} />
          </button>
        </div>

        {/* Savings Banner */}
        {cart.length > 0 && (
          <div style={{ padding: '10px 20px', background: '#f0fdf4', borderBottom: '1px solid #dcfce7', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Tag size={14} color="#16a34a" />
            <p style={{ fontSize: 12, color: '#15803d', fontWeight: 500 }}>
              You save <strong>₹{savings.toLocaleString()}</strong> on this order!
            </p>
          </div>
        )}

        {/* Items */}
        <div style={{ flexGrow: 1, overflowY: 'auto' }}>
          {cart.length === 0 ? (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <ShoppingBag size={32} color="#d1d5db" />
              </div>
              <h4 style={{ fontSize: 18, fontWeight: 700, color: '#111', marginBottom: 8 }}>Your bag is empty</h4>
              <p style={{ fontSize: 13, color: '#999', marginBottom: 24 }}>Add items to get started</p>
              <button onClick={() => setIsOpen(false)} style={{ padding: '12px 32px', background: '#C5A059', color: '#000', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', border: 'none', cursor: 'pointer' }}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <div>
              {cart.map((item, idx) => (
                <div key={item.id} style={{ padding: '16px 20px', display: 'flex', gap: 16, borderBottom: '1px solid #f5f5f5' }}>
                  {/* Image */}
                  <a href={`/shop/${item.id}`} onClick={() => setIsOpen(false)} style={{ flexShrink: 0 }}>
                    <div style={{ width: 90, height: 110, background: '#f9fafb', borderRadius: 8, overflow: 'hidden', border: '1px solid #f0f0f0' }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </a>

                  {/* Details */}
                  <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                        <div style={{ minWidth: 0 }}>
                          <p style={{ fontSize: 10, color: '#999', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>StitchBros</p>
                          <h4 style={{ fontSize: 13, fontWeight: 600, color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</h4>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} style={{ flexShrink: 0, width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p style={{ fontSize: 10, color: '#bbb', marginTop: 2 }}>Delivery by May 24</p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 12 }}>
                      {/* Quantity */}
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: 999, overflow: 'hidden' }}>
                        <button onClick={() => updateQuantity(item.id, -1)} style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                          <Minus size={12} />
                        </button>
                        <span style={{ width: 32, textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#111' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                          <Plus size={12} />
                        </button>
                      </div>
                      {/* Price */}
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>₹{(item.price * item.quantity).toLocaleString()}</p>
                        <p style={{ fontSize: 10, color: '#bbb', textDecoration: 'line-through' }}>₹{Math.round(item.price * 1.5 * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ borderTop: '1px solid #e5e7eb', background: '#fafafa' }}>
            {/* Price Summary */}
            <div style={{ padding: '16px 20px', fontSize: 13 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666', marginBottom: 8 }}>
                <span>Subtotal ({totalItems} items)</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666', marginBottom: 8 }}>
                <span>Delivery</span>
                <span style={{ color: deliveryCharges === 0 ? '#16a34a' : '#666', fontWeight: deliveryCharges === 0 ? 600 : 400 }}>
                  {deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#111', fontSize: 16, paddingTop: 12, borderTop: '1px solid #e5e7eb' }}>
                <span>Total</span>
                <span>₹{finalTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <a href="/checkout" onClick={() => setIsOpen(false)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '14px', background: '#C5A059', color: '#000', fontWeight: 700,
                fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none',
              }}>
                Proceed to Checkout <ArrowRight size={14} />
              </a>
              <a href="/bag" onClick={() => setIsOpen(false)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '12px', border: '1px solid #d1d5db', color: '#555', fontWeight: 600,
                fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none',
              }}>
                View Bag
              </a>
            </div>

            {/* Trust */}
            <div style={{ padding: '0 20px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#bbb', fontSize: 10 }}>
              <ShieldCheck size={12} /> 100% Secure Payments
            </div>
          </div>
        )}
      </div>
    </>
  );
}
