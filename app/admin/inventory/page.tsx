"use client";

import React, { useState } from 'react';
import { getHomepageData } from '@/lib/catalog';
import { 
  Package, Search, Plus, Eye, Edit3, Trash2, CheckCircle2
} from 'lucide-react';

export default function InventoryPage() {
  const data = getHomepageData();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  const categories = ['All', ...Array.from(new Set(data.products.map((p: any) => p.category)))];

  const products = data.products.filter((p: any) => 
    (categoryFilter === 'All' || p.category === categoryFilter) &&
    (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     p.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const thStyle: React.CSSProperties = {
    padding: '20px 24px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
    letterSpacing: '0.15em', color: '#666', borderBottom: '1px solid rgba(255,255,255,0.05)',
  };

  const tdStyle: React.CSSProperties = {
    padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.03)',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Inventory Manager</h1>
          <p style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700 }}>Total SKUs: {products.length}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#666' }} size={16} />
            <input 
              type="text" placeholder="Search products..."
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              style={{ background: '#121212', border: '1px solid rgba(255,255,255,0.05)', padding: '12px 16px 12px 44px', borderRadius: 12, fontSize: 12, color: '#fff', outline: 'none', width: 280 }}
            />
          </div>
          <a href="/admin/add-product" style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#C5A059', color: '#000', padding: '12px 20px', borderRadius: 12, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', textDecoration: 'none' }}>
            <Plus size={16} />
            <span>Add Product</span>
          </a>
        </div>
      </div>

      {/* Category Filters */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
        {categories.map((cat: any) => (
          <button 
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            style={{
              padding: '10px 24px', borderRadius: 999, fontSize: 10, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.15em', whiteSpace: 'nowrap',
              cursor: 'pointer', transition: 'all 0.2s', border: 'none',
              background: categoryFilter === cat ? '#C5A059' : '#121212',
              color: categoryFilter === cat ? '#000' : '#888',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: '#121212', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 24, overflow: 'hidden' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Product</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Stock</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Status</th>
              <th style={thStyle}></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} style={{ transition: 'background 0.2s' }} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 48, height: 64, background: 'rgba(255,255,255,0.05)', borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                      <img src={product.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 13, letterSpacing: '0.025em' }}>{product.name}</p>
                      <p style={{ fontSize: 10, color: '#666' }}>ID: {product.id}</p>
                    </div>
                  </div>
                </td>
                <td style={tdStyle}>
                  <span style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: 999, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888' }}>
                    {product.category}
                  </span>
                </td>
                <td style={tdStyle}>
                  <p style={{ fontWeight: 700, color: '#C5A059', fontStyle: 'italic' }}>₹{product.price.toLocaleString()}</p>
                </td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 64, height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 999, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: product.price > 50000 ? '25%' : '75%', background: product.price > 50000 ? '#f97316' : '#C5A059', borderRadius: 999 }} />
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#888' }}>
                      {product.price > 50000 ? '2' : '15'} Left
                    </span>
                  </div>
                </td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: '#22c55e', background: 'rgba(34,197,94,0.1)', padding: '4px 12px', borderRadius: 999 }}>
                    <CheckCircle2 size={12} />
                    Active
                  </span>
                </td>
                <td style={{ ...tdStyle, textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
                    <button title="View" style={{ padding: 8, borderRadius: 8, background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>
                      <Eye size={16} />
                    </button>
                    <button title="Edit" style={{ padding: 8, borderRadius: 8, background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>
                      <Edit3 size={16} />
                    </button>
                    <button title="Delete" style={{ padding: 8, borderRadius: 8, background: 'none', border: 'none', color: 'rgba(239,68,68,0.6)', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {products.length === 0 && (
          <div style={{ padding: 96, textAlign: 'center' }}>
            <Package style={{ margin: '0 auto 16px', color: '#444' }} size={48} />
            <p style={{ color: '#666', fontSize: 14 }}>No products match your search.</p>
          </div>
        )}

        {/* Footer */}
        <div style={{ padding: 24, background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontSize: 10, color: '#666', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Showing {products.length} of {data.products.length} Products
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ width: 32, height: 32, borderRadius: 8, background: '#C5A059', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
