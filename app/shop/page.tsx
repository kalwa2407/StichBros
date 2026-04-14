"use client";

import React, { useState, useMemo } from 'react';
import { Filter, ChevronDown, ShoppingBag, Heart, X, SlidersHorizontal } from 'lucide-react';
import { getHomepageData } from '@/lib/catalog';
import { useCart } from '@/components/CartContext';

export default function ShopPage() {
  const data = getHomepageData();
  const { addToCart } = useCart();
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const categories = useMemo(() => {
    return ['All', ...new Set(data.products.map(p => p.category))];
  }, [data.products]);

  const filteredProducts = useMemo(() => {
    let result = [...data.products];
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (sortBy === 'Price: Low to High') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'Price: High to Low') result.sort((a, b) => b.price - a.price);
    return result;
  }, [selectedCategory, sortBy, data.products]);

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', paddingTop: 100, paddingBottom: 100, color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ width: 'min(1400px, calc(100% - 40px))', margin: '0 auto' }}>
        
        {/* Breadcrumbs */}
        <nav style={{ fontSize: 11, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8, color: '#666' }}>
          <a href="/" style={{ color: '#666', textDecoration: 'none' }}>Home</a>
          <span>/</span>
          <span style={{ color: '#C5A059', fontWeight: 700 }}>Clothing</span>
        </nav>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em' }}>STITCHBROS COLLECTION</h1>
            <span style={{ color: '#888', fontSize: 12 }}>{filteredProducts.length} items</span>
          </div>
        </div>

        <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          {/* Desktop Sidebar */}
          <aside style={{ width: 240, flexShrink: 0, paddingTop: 32, paddingRight: 32, borderRight: '1px solid rgba(255,255,255,0.05)', display: 'none' }} className="lg-sidebar">
            <div>
              <h3 style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#666', marginBottom: 20 }}>Categories</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {categories.map(cat => (
                  <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                    <input type="radio" name="category" checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)} style={{ accentColor: '#C5A059' }} />
                    <span style={{ fontSize: 13, color: selectedCategory === cat ? '#fff' : '#888', fontWeight: selectedCategory === cat ? 700 : 400 }}>{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main */}
          <main style={{ flexGrow: 1, paddingTop: 16 }}>
            {/* Sort (desktop) */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24, position: 'relative' }}>
              <button onClick={() => setShowSort(!showSort)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#fff', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer' }}>
                Sort: {sortBy} <ChevronDown size={14} />
              </button>
              {showSort && (
                <div style={{ position: 'absolute', top: '100%', right: 0, background: '#121212', border: '1px solid rgba(255,255,255,0.1)', zIndex: 30, minWidth: 200 }}>
                  {['Newest', 'Price: Low to High', 'Price: High to Low'].map(s => (
                    <button key={s} onClick={() => { setSortBy(s); setShowSort(false); }} style={{ display: 'block', width: '100%', padding: '12px 20px', textAlign: 'left', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: sortBy === s ? '#C5A059' : '#888', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Category Pills (mobile) */}
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 24, paddingBottom: 8 }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat)} style={{
                  padding: '8px 20px', borderRadius: 999, fontSize: 10, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap',
                  cursor: 'pointer', border: 'none',
                  background: selectedCategory === cat ? '#C5A059' : 'rgba(255,255,255,0.05)',
                  color: selectedCategory === cat ? '#000' : '#888',
                }}>
                  {cat}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, paddingBottom: 80 }} className="shop-grid">
              {filteredProducts.map((product) => (
                <div key={product.id}>
                  <a href={`/shop/${product.id}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ position: 'relative', aspectRatio: '3/4', background: '#1a1a1a', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                      
                      {product.price > 50000 && (
                        <div style={{ position: 'absolute', top: 12, left: 12, background: '#000', color: '#C5A059', padding: '4px 8px', fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Premium</div>
                      )}

                      <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); }} style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px', background: 'rgba(197,160,89,0.95)',
                        color: '#000', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em',
                        border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      }}>
                        <ShoppingBag size={14} /> Add to Bag
                      </button>
                    </div>

                    <div style={{ paddingTop: 12 }}>
                      <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#888', marginBottom: 2 }}>STITCHBROS</p>
                      <h3 style={{ fontSize: 12, fontWeight: 500, color: '#e5e5e5', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#C5A059' }}>₹{product.price.toLocaleString()}</span>
                        <span style={{ fontSize: 10, color: '#666', textDecoration: 'line-through' }}>₹{Math.round(product.price * 1.5).toLocaleString()}</span>
                        <span style={{ fontSize: 9, color: '#22c55e', fontWeight: 700 }}>33% OFF</span>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Filter Button */}
      <button onClick={() => setIsFilterOpen(true)} style={{
        position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 90,
        display: 'flex', alignItems: 'center', gap: 8, background: '#000', color: '#fff',
        padding: '14px 32px', borderRadius: 999, border: '1px solid rgba(197,160,89,0.3)',
        fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', cursor: 'pointer',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
      }}>
        <SlidersHorizontal size={14} /> Filter & Sort
      </button>

      {/* Mobile Filter Drawer */}
      {isFilterOpen && (
        <>
          <div onClick={() => setIsFilterOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100 }} />
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, maxHeight: '80vh', background: '#121212', borderTopLeftRadius: 24, borderTopRightRadius: 24, zIndex: 101, overflow: 'auto', padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Refine</h2>
              <button onClick={() => setIsFilterOpen(false)} style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={18} /></button>
            </div>

            <div style={{ marginBottom: 32 }}>
              <h3 style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#666', marginBottom: 16 }}>Sort</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Newest', 'Price: Low to High', 'Price: High to Low'].map(s => (
                  <button key={s} onClick={() => { setSortBy(s); setIsFilterOpen(false); }} style={{ padding: '14px 16px', border: sortBy === s ? '1px solid #C5A059' : '1px solid rgba(255,255,255,0.05)', background: sortBy === s ? 'rgba(197,160,89,0.1)' : 'transparent', color: sortBy === s ? '#C5A059' : '#888', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', textAlign: 'left' }}>{s}</button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 32 }}>
              <h3 style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#666', marginBottom: 16 }}>Categories</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                {categories.map(cat => (
                  <button key={cat} onClick={() => { setSelectedCategory(cat); setIsFilterOpen(false); }} style={{ padding: '14px 16px', border: selectedCategory === cat ? '1px solid #C5A059' : '1px solid rgba(255,255,255,0.05)', background: selectedCategory === cat ? 'rgba(197,160,89,0.1)' : 'transparent', color: selectedCategory === cat ? '#C5A059' : '#888', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer' }}>{cat}</button>
                ))}
              </div>
            </div>

            <button onClick={() => setIsFilterOpen(false)} style={{ width: '100%', padding: 16, background: '#C5A059', color: '#000', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', border: 'none', borderRadius: 12, cursor: 'pointer' }}>
              Apply Filters
            </button>
          </div>
        </>
      )}

      <style>{`
        @media (min-width: 768px) { .shop-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 20px !important; } }
        @media (min-width: 1280px) { .shop-grid { grid-template-columns: repeat(4, 1fr) !important; } }
        @media (min-width: 1024px) { .lg-sidebar { display: block !important; } }
      `}</style>
    </div>
  );
}
