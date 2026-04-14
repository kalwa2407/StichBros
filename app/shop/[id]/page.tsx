"use client";

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { getProductById } from '@/lib/catalog';
import { useCart } from '@/components/CartContext';
import { ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw, ChevronRight, Star, ArrowLeft } from 'lucide-react';

export default function ProductDetailsPage() {
  const params = useParams();
  const product = useMemo(() => getProductById(params.id as string), [params.id]);
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [addedToBag, setAddedToBag] = useState(false);

  if (!product) {
    return <div style={{ minHeight: '100vh', paddingTop: 200, textAlign: 'center', color: '#fff', background: '#0a0a0a' }}>Product not found.</div>;
  }

  const handleAddToBag = () => {
    addToCart(product);
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', paddingTop: 80, paddingBottom: 120, color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ width: 'min(1400px, calc(100% - 40px))', margin: '0 auto' }}>
        
        {/* Breadcrumbs */}
        <nav style={{ fontSize: 11, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8, color: '#666', paddingTop: 16 }}>
          <a href="/" style={{ color: '#666', textDecoration: 'none' }}>Home</a>
          <span>/</span>
          <a href="/shop" style={{ color: '#666', textDecoration: 'none' }}>Clothing</a>
          <span>/</span>
          <span style={{ color: '#C5A059', fontWeight: 700 }}>{product.name}</span>
        </nav>

        {/* Mobile Back */}
        <a href="/shop" style={{ position: 'fixed', top: 80, left: 16, zIndex: 20, width: 40, height: 40, background: 'rgba(0,0,0,0.8)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)' }} className="mobile-back">
          <ArrowLeft size={18} />
        </a>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }} className="pdp-layout">
          
          {/* Images */}
          <div className="pdp-images">
            {/* Mobile: horizontal scroll */}
            <div style={{ display: 'flex', overflowX: 'auto', gap: 0, scrollSnapType: 'x mandatory' }} className="mobile-carousel">
              {product.images.map((img, idx) => (
                <div key={idx} style={{ flexShrink: 0, width: '100%', scrollSnapAlign: 'center', aspectRatio: '3/4' }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
            {/* Desktop: grid */}
            <div style={{ display: 'none', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }} className="desktop-gallery">
              {product.images.map((img, idx) => (
                <div key={idx} style={{ aspectRatio: '3/4', background: '#1a1a1a', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <img src={img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', cursor: 'zoom-in' }} onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.1)')} onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')} />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="pdp-info" style={{ padding: '0 4px' }}>
            <div className="pdp-info-sticky">
              
              {/* Brand & Title */}
              <div style={{ marginBottom: 16 }}>
                <h1 style={{ fontSize: 20, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#C5A059', marginBottom: 4 }}>{product.brand || "STITCHBROS"}</h1>
                <h2 style={{ fontSize: 16, color: '#ccc', fontWeight: 300 }}>{product.name}</h2>
                
                {/* Rating */}
                <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid rgba(255,255,255,0.1)', padding: '4px 10px', gap: 8, marginTop: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>4.8 <Star size={10} color="#22c55e" fill="#22c55e" /></span>
                  <div style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.1)' }} />
                  <span style={{ fontSize: 11, color: '#888' }}>1.2k Ratings</span>
                </div>
              </div>

              <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.05)', margin: '16px 0' }} />

              {/* Price */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 24, fontWeight: 700, fontStyle: 'italic', color: '#C5A059' }}>₹{product.price.toLocaleString()}</span>
                  <span style={{ fontSize: 16, color: '#666', textDecoration: 'line-through' }}>₹{Math.round(product.price * 1.5).toLocaleString()}</span>
                  <span style={{ fontSize: 14, color: '#f97316', fontWeight: 700 }}>(33% OFF)</span>
                </div>
                <p style={{ fontSize: 11, color: '#22c55e', fontWeight: 700, textTransform: 'uppercase', marginTop: 4 }}>Inclusive of all taxes</p>
              </div>

              {/* Size Selector */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fff' }}>Select Size</h3>
                  <button style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#C5A059', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>Size Chart <ChevronRight size={12} /></button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {product.sizes.map(size => (
                    <button key={size} onClick={() => setSelectedSize(size)} style={{
                      width: 50, height: 50, borderRadius: '50%', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                      border: selectedSize === size ? '2px solid #C5A059' : '1px solid rgba(255,255,255,0.15)',
                      background: selectedSize === size ? 'rgba(197,160,89,0.15)' : 'transparent',
                      color: selectedSize === size ? '#C5A059' : '#ccc',
                      transition: 'all 0.2s',
                    }}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Desktop Add to Bag */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 24 }} className="desktop-actions">
                <button onClick={handleAddToBag} style={{
                  flexGrow: 1, padding: '18px 24px', background: addedToBag ? '#22c55e' : '#C5A059', color: '#000',
                  fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.15em',
                  border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  transition: 'all 0.3s',
                }}>
                  <ShoppingBag size={18} />
                  {addedToBag ? '✓ Added to Bag!' : 'Add to Bag'}
                </button>
                <button style={{ padding: '18px 24px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#ccc', cursor: 'pointer' }}>
                  <Heart size={20} />
                </button>
              </div>

              <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.05)', margin: '16px 0' }} />

              {/* Product Details */}
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fff', marginBottom: 12 }}>Product Details</h3>
                <p style={{ fontSize: 13, color: '#999', lineHeight: 1.7 }}>{product.longDescription || product.description}</p>
              </div>

              {/* Specs Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 24 }}>
                {product.details.map(detail => (
                  <div key={detail.label}>
                    <p style={{ fontSize: 10, color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4, fontWeight: 700 }}>{detail.label}</p>
                    <p style={{ fontSize: 13, color: '#e5e5e5', fontWeight: 500 }}>{detail.value}</p>
                  </div>
                ))}
              </div>

              {/* Trust Marks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 12, color: '#999', paddingBottom: 80 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><Truck size={14} color="#666" /> Get it by Mon, May 24</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><ShieldCheck size={14} color="#666" /> 100% Original Products</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><RefreshCw size={14} color="#666" /> Easy 14 days returns and exchanges</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, background: '#121212',
        borderTop: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 100,
      }} className="mobile-bottom-bar">
        <div>
          <span style={{ fontSize: 10, color: '#888', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Size: {selectedSize || 'Select'}
          </span>
          <p style={{ fontSize: 18, fontWeight: 700, color: '#C5A059', fontStyle: 'italic' }}>₹{product.price.toLocaleString()}</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ padding: 12, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, background: 'transparent', color: '#888', cursor: 'pointer' }}>
            <Heart size={18} />
          </button>
          <button onClick={handleAddToBag} style={{
            padding: '12px 24px', background: addedToBag ? '#22c55e' : '#C5A059', color: '#000',
            fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em',
            border: 'none', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <ShoppingBag size={16} />
            {addedToBag ? 'Added!' : 'Add to Bag'}
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .pdp-layout { flex-direction: row !important; gap: 48px !important; }
          .pdp-images { width: 60% !important; }
          .pdp-info { width: 40% !important; }
          .pdp-info-sticky { position: sticky; top: 100px; }
          .mobile-carousel { display: none !important; }
          .desktop-gallery { display: grid !important; }
          .mobile-back { display: none !important; }
          .mobile-bottom-bar { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-actions { display: none !important; }
        }
        .mobile-carousel::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
