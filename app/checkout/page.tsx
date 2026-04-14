"use client";

import React, { useState } from 'react';
import { ShieldCheck, MapPin, CreditCard, CheckCircle, ArrowRight, ChevronLeft, Loader2 } from 'lucide-react';
import { useCart } from '@/components/CartContext';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart, totalItems } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderId, setOrderId] = useState('');

  const deliveryCharges = totalPrice > 50000 ? 0 : 500;
  const finalTotal = totalPrice + deliveryCharges;

  if (cart.length === 0 && step < 3) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0a', paddingTop: 200, textAlign: 'center', color: '#fff', fontFamily: 'Inter, sans-serif', padding: '200px 16px 0' }}>
        <h2 style={{ fontSize: 20, marginBottom: 16 }}>Your collection is empty.</h2>
        <a href="/shop" style={{ color: '#C5A059', textDecoration: 'underline' }}>Return to Shop</a>
      </div>
    );
  }

  const handlePayment = () => {
    setIsProcessing(true);
    const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(newOrderId);

    // Save real order to localStorage
    const order = {
      id: newOrderId,
      customer: 'Aman Talukdar',
      email: 'aman@stitchbros.com',
      destination: 'Lucknow, India',
      items: cart.map(item => ({ name: item.name, qty: item.quantity, price: item.price, image: item.image })),
      itemCount: totalItems,
      total: finalTotal,
      status: 'Processing',
      date: new Date().toLocaleString('en-IN', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      method: paymentMethod === 'card' ? 'Credit Card (Visa)' : 'UPI',
    };

    try {
      const existing = JSON.parse(localStorage.getItem('stichbros_orders') || '[]');
      existing.unshift(order);
      localStorage.setItem('stichbros_orders', JSON.stringify(existing));
    } catch (e) { console.error(e); }

    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      setStep(3);
    }, 2500);
  };

  const stepNames = ['Address', 'Payment', 'Success'];

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', paddingTop: 100, paddingBottom: 80, color: '#fff', fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 16px', boxSizing: 'border-box' }}>
        
        {/* Progress - mobile safe */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
          {stepNames.map((s, idx) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, flexShrink: 0,
                background: step >= idx + 1 ? '#C5A059' : '#1a1a1a',
                color: step >= idx + 1 ? '#000' : '#666',
                border: step >= idx + 1 ? 'none' : '1px solid rgba(255,255,255,0.1)',
              }}>
                {idx + 1}
              </div>
              <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, color: step >= idx + 1 ? '#C5A059' : '#666' }}>{s}</span>
              {idx < 2 && <div style={{ width: 20, height: 1, background: step >= idx + 2 ? '#C5A059' : 'rgba(255,255,255,0.1)', flexShrink: 0 }} />}
            </div>
          ))}
        </div>

        {/* Step 1: Address */}
        {step === 1 && (
          <div style={{ background: '#121212', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: '24px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 8 }}>
              <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#C5A059', display: 'flex', alignItems: 'center', gap: 8 }}>
                <MapPin size={16} /> Delivery Address
              </h2>
              <button style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#C5A059', border: '1px solid rgba(197,160,89,0.4)', background: 'transparent', padding: '6px 12px', cursor: 'pointer', borderRadius: 8 }}>
                Add New
              </button>
            </div>

            <div style={{ border: '1px solid rgba(197,160,89,0.3)', padding: '20px 16px', borderRadius: 12, background: 'rgba(197,160,89,0.05)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 10, right: 10, background: '#C5A059', color: '#000', fontSize: 8, fontWeight: 700, padding: '3px 6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Default</div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Aman Talukdar</h3>
              <p style={{ fontSize: 12, color: '#999', lineHeight: 1.8, marginBottom: 12 }}>
                42, Heritage Enclave, Civil Lines,<br />
                Lucknow, Uttar Pradesh - 226001<br />
                Mobile: <span style={{ color: '#fff' }}>8840658081</span>
              </p>
              <button style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
            </div>

            {/* Order Summary (mobile inline) */}
            <div style={{ marginTop: 24, padding: 16, background: '#0a0a0a', borderRadius: 12, border: '1px solid rgba(255,255,255,0.03)' }}>
              <h4 style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', fontWeight: 700, marginBottom: 12 }}>Order Summary</h4>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <div style={{ width: 40, height: 50, borderRadius: 6, overflow: 'hidden', flexShrink: 0, background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#e5e5e5', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                    <p style={{ fontSize: 10, color: '#888' }}>Qty: {item.quantity}</p>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#C5A059', flexShrink: 0 }}>₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 12, marginTop: 8, display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 700 }}>
                <span>Total</span>
                <span style={{ color: '#C5A059' }}>₹{finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <button onClick={() => setStep(2)} style={{
              width: '100%', marginTop: 20, padding: 14, background: '#C5A059', color: '#000',
              fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em',
              border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              borderRadius: 8,
            }}>
              Deliver To This Address <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <div style={{ background: '#121212', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#C5A059', display: 'flex', alignItems: 'center', gap: 8 }}>
                <CreditCard size={16} /> Payment
              </h2>
              <button onClick={() => setStep(1)} style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                <ChevronLeft size={14} /> Back
              </button>
            </div>

            {/* Payment Options - stacked on mobile */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }} className="payment-grid">
              {[{ key: 'card', label: 'Credit/Debit Card' }, { key: 'upi', label: 'UPI (GPay, PhonePe)' }].map(m => (
                <button key={m.key} onClick={() => setPaymentMethod(m.key)} style={{
                  padding: '16px', border: paymentMethod === m.key ? '1px solid #C5A059' : '1px solid rgba(255,255,255,0.05)',
                  background: paymentMethod === m.key ? 'rgba(197,160,89,0.1)' : 'transparent',
                  borderRadius: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
                }}>
                  <CreditCard size={18} color={paymentMethod === m.key ? '#C5A059' : '#666'} />
                  <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: paymentMethod === m.key ? '#C5A059' : '#888' }}>{m.label}</span>
                </button>
              ))}
            </div>

            {/* Card Details */}
            {paymentMethod === 'card' && (
              <div style={{ padding: 16, background: '#0a0a0a', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                  <div style={{ width: 44, height: 28, background: '#fff', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#000', flexShrink: 0 }}>VISA</div>
                  <span style={{ fontSize: 13, fontFamily: 'monospace', letterSpacing: '0.15em', color: '#fff' }}>**** 4081</span>
                  <span style={{ fontSize: 8, color: '#C5A059', fontWeight: 700, textTransform: 'uppercase', border: '1px solid rgba(197,160,89,0.3)', padding: '3px 6px', borderRadius: 4 }}>Saved</span>
                </div>
                <label style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>CVV</label>
                <input type="password" placeholder="•••" maxLength={3} style={{ width: 100, padding: '10px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none', fontFamily: 'monospace' }} />
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div style={{ padding: 16, background: '#0a0a0a', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
                <label style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>UPI ID</label>
                <input type="text" placeholder="username@upi" style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
              </div>
            )}

            {/* Total Bar */}
            <div style={{ padding: '12px 16px', background: 'rgba(197,160,89,0.08)', borderRadius: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: '#888' }}>Total Amount</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#C5A059' }}>₹{finalTotal.toLocaleString()}</span>
            </div>

            <button onClick={handlePayment} disabled={isProcessing} style={{
              width: '100%', padding: 14, background: isProcessing ? '#666' : '#C5A059', color: '#000',
              fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em',
              border: 'none', cursor: isProcessing ? 'not-allowed' : 'pointer', borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              {isProcessing ? (
                <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Processing...</>
              ) : (
                <><ShieldCheck size={16} /> Pay ₹{finalTotal.toLocaleString()}</>
              )}
            </button>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div style={{ background: '#121212', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: '40px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
              <CheckCircle size={40} color="#22c55e" strokeWidth={1.5} />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Payment Successful</h2>
            <p style={{ fontSize: 13, color: '#999', maxWidth: 320, lineHeight: 1.7, marginBottom: 24 }}>
              Your order has been placed. We'll keep you updated on shipping.
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12, padding: 20, width: '100%', maxWidth: 260, marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: 10 }}>
                <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888' }}>Order ID</span>
                <span style={{ fontSize: 12, fontFamily: 'monospace', color: '#C5A059' }}>{orderId}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888' }}>Amount</span>
                <span style={{ fontSize: 12, color: '#fff' }}>₹{finalTotal.toLocaleString()}</span>
              </div>
            </div>
            <a href="/shop" style={{ padding: '12px 28px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', borderRadius: 8 }}>
              Continue Shopping
            </a>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (min-width: 768px) {
          .payment-grid { flex-direction: row !important; }
          .payment-grid > button { flex: 1; flex-direction: column; text-align: center; padding: 24px !important; }
        }
      `}</style>
    </div>
  );
}
