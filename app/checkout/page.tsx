"use client";

import React, { useState } from 'react';
import { ShieldCheck, MapPin, CreditCard, CheckCircle, ArrowRight, ChevronLeft, Loader2 } from 'lucide-react';
import { useCart } from '@/components/CartContext';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart, totalItems } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const deliveryCharges = totalPrice > 50000 ? 0 : 500;
  const finalTotal = totalPrice + deliveryCharges;

  if (cart.length === 0 && step < 3) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0a', paddingTop: 200, textAlign: 'center', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
        <h2 style={{ fontSize: 20, marginBottom: 16 }}>Your collection is empty.</h2>
        <a href="/shop" style={{ color: '#C5A059', textDecoration: 'underline' }}>Return to Shop</a>
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

  const stepNames = ['Address', 'Payment', 'Success'];

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', paddingTop: 110, paddingBottom: 80, color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 16px' }}>
        
        {/* Progress */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, marginBottom: 48 }}>
          {stepNames.map((s, idx) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700,
                background: step >= idx + 1 ? '#C5A059' : '#1a1a1a',
                color: step >= idx + 1 ? '#000' : '#666',
                border: step >= idx + 1 ? 'none' : '1px solid rgba(255,255,255,0.1)',
              }}>
                {idx + 1}
              </div>
              <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: step >= idx + 1 ? '#C5A059' : '#666' }}>{s}</span>
              {idx < 2 && <div style={{ width: 40, height: 1, background: step >= idx + 2 ? '#C5A059' : 'rgba(255,255,255,0.1)' }} />}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }} className="checkout-layout">
          {/* Main */}
          <div style={{ flexGrow: 1 }}>
            {/* Step 1: Address */}
            {step === 1 && (
              <div style={{ background: '#121212', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                  <h2 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#C5A059', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <MapPin size={18} /> Delivery Address
                  </h2>
                  <button style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#C5A059', border: '1px solid rgba(197,160,89,0.4)', background: 'transparent', padding: '8px 16px', cursor: 'pointer', borderRadius: 8 }}>
                    Add New
                  </button>
                </div>

                <div style={{ border: '1px solid rgba(197,160,89,0.3)', padding: 24, borderRadius: 12, background: 'rgba(197,160,89,0.05)', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 12, right: 12, background: '#C5A059', color: '#000', fontSize: 9, fontWeight: 700, padding: '4px 8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Default</div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Aman Talukdar</h3>
                  <p style={{ fontSize: 13, color: '#999', lineHeight: 1.8, maxWidth: 300, marginBottom: 12 }}>
                    42, Heritage Enclave, Civil Lines,<br />
                    Lucknow, Uttar Pradesh - 226001<br />
                    Mobile: <span style={{ color: '#fff' }}>8840658081</span>
                  </p>
                  <button style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
                </div>

                <button onClick={() => setStep(2)} style={{
                  width: '100%', marginTop: 24, padding: 16, background: '#C5A059', color: '#000',
                  fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.15em',
                  border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                  Deliver To This Address <ArrowRight size={16} />
                </button>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div style={{ background: '#121212', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <h2 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#C5A059', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CreditCard size={18} /> Payment Method
                  </h2>
                  <button onClick={() => setStep(1)} style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <ChevronLeft size={14} /> Back
                  </button>
                </div>

                {/* Payment Options */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[{ key: 'card', label: 'Credit/Debit Card' }, { key: 'upi', label: 'UPI (GPay, PhonePe)' }].map(m => (
                    <button key={m.key} onClick={() => setPaymentMethod(m.key)} style={{
                      padding: 24, border: paymentMethod === m.key ? '1px solid #C5A059' : '1px solid rgba(255,255,255,0.05)',
                      background: paymentMethod === m.key ? 'rgba(197,160,89,0.1)' : 'transparent',
                      borderRadius: 12, cursor: 'pointer', textAlign: 'center',
                    }}>
                      <CreditCard size={24} color={paymentMethod === m.key ? '#C5A059' : '#666'} style={{ margin: '0 auto 8px' }} />
                      <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: paymentMethod === m.key ? '#C5A059' : '#888' }}>{m.label}</p>
                    </button>
                  ))}
                </div>

                {/* Card Details */}
                {paymentMethod === 'card' && (
                  <div style={{ padding: 24, background: '#0a0a0a', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                      <div style={{ width: 48, height: 32, background: '#fff', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#000' }}>VISA</div>
                      <span style={{ fontSize: 14, fontFamily: 'monospace', letterSpacing: '0.2em', color: '#fff' }}>**** **** **** 4081</span>
                      <span style={{ marginLeft: 'auto', fontSize: 9, color: '#C5A059', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', border: '1px solid rgba(197,160,89,0.3)', padding: '4px 8px', borderRadius: 4 }}>Saved</span>
                    </div>
                    <label style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>Security Code</label>
                    <input type="password" placeholder="CVV" maxLength={3} style={{ width: 120, padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none', fontFamily: 'monospace', letterSpacing: '0.3em' }} />
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div style={{ padding: 24, background: '#0a0a0a', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <label style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>Enter UPI ID</label>
                    <input type="text" placeholder="username@upi" style={{ width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                )}

                <button onClick={handlePayment} disabled={isProcessing} style={{
                  width: '100%', padding: 16, background: isProcessing ? '#888' : '#C5A059', color: '#000',
                  fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.15em',
                  border: 'none', cursor: isProcessing ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                  {isProcessing ? (
                    <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Processing Securely...</>
                  ) : (
                    <><ShieldCheck size={18} /> Pay ₹{finalTotal.toLocaleString()}</>
                  )}
                </button>
              </div>
            )}

            {/* Step 3: Success */}
            {step === 3 && (
              <div style={{ background: '#121212', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: 48, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 96, height: 96, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                  <CheckCircle size={48} color="#22c55e" strokeWidth={1.5} />
                </div>
                <h2 style={{ fontSize: 28, fontWeight: 600, color: '#fff', marginBottom: 12 }}>Payment Successful</h2>
                <p style={{ fontSize: 14, color: '#999', maxWidth: 400, lineHeight: 1.7, marginBottom: 32 }}>
                  Your order has been securely processed. Our concierge will be in touch with shipping updates.
                </p>
                <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12, padding: 24, width: '100%', maxWidth: 280, marginBottom: 32 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: 12 }}>
                    <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888' }}>Order ID</span>
                    <span style={{ fontSize: 12, fontFamily: 'monospace', color: '#C5A059' }}>CH-{Math.floor(Math.random() * 1000000)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888' }}>Amount</span>
                    <span style={{ fontSize: 12, color: '#fff' }}>₹{finalTotal.toLocaleString()}</span>
                  </div>
                </div>
                <a href="/shop" style={{ padding: '14px 32px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', textDecoration: 'none' }}>
                  Return to Collections
                </a>
              </div>
            )}
          </div>

          {/* Sidebar Summary */}
          {step < 3 && (
            <aside style={{ width: 380, flexShrink: 0, position: 'sticky', top: 100 }} className="checkout-sidebar">
              <div style={{ background: '#121212', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: 24 }}>
                <h3 style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: '#C5A059', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ShieldCheck size={14} /> Secure Selection
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20, maxHeight: '40vh', overflowY: 'auto' }}>
                  {cart.map(item => (
                    <div key={item.id} style={{ display: 'flex', gap: 16, alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <div style={{ width: 64, height: 80, background: '#0a0a0a', borderRadius: 8, overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(255,255,255,0.05)' }}>
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div>
                        <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fff', marginBottom: 4 }}>{item.name}</p>
                        <p style={{ fontSize: 10, color: '#888' }}>Qty: {item.quantity}</p>
                        <p style={{ fontSize: 13, fontStyle: 'italic', color: '#C5A059', marginTop: 4 }}>₹{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: 13 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888' }}>
                    <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Subtotal</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888' }}>
                    <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Shipping</span>
                    <span style={{ color: '#C5A059' }}>{deliveryCharges === 0 ? 'Complimentary' : `₹${deliveryCharges}`}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 700, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <span>Total</span>
                    <span style={{ color: '#C5A059' }}>₹{finalTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 1023px) {
          .checkout-sidebar { display: none !important; }
          .checkout-layout { flex-direction: column !important; }
        }
      `}</style>
    </div>
  );
}
