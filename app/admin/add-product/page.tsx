"use client";

import React, { useState, useRef } from 'react';
import { Upload, X, Plus, Save, ImageIcon, Tag, DollarSign, FileText, Layers, Percent } from 'lucide-react';
import { addDynamicProduct } from '@/lib/catalog';

export default function AddProductPage() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Shirts');
  const [price, setPrice] = useState('');
  const [discountPercent, setDiscountPercent] = useState('33');
  const [description, setDescription] = useState('');
  const [fabric, setFabric] = useState('');
  const [fit, setFit] = useState('');
  const [sizes, setSizes] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [specs, setSpecs] = useState<string[]>(['']);
  const [saved, setSaved] = useState(false);
  const [savedProducts, setSavedProducts] = useState<any[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const allSizes = ['S', 'M', 'L', 'XL', 'XXL', '38', '40', '42', '44', '46'];
  const categories = ['Shirts', 'Jackets', 'Formal', 'Coats', 'Abayas', 'Accessories', 'Collections'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const toggleSize = (size: string) => {
    setSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const addSpec = () => setSpecs([...specs, '']);
  const updateSpec = (idx: number, val: string) => {
    const updated = [...specs];
    updated[idx] = val;
    setSpecs(updated);
  };
  const removeSpec = (idx: number) => setSpecs(specs.filter((_, i) => i !== idx));

  const originalPrice = price ? Math.round(Number(price) / (1 - Number(discountPercent) / 100)) : 0;

  const handleSave = async () => {
    if (!name || !price) return;
    
    const product = {
      id: `custom-${Date.now()}`,
      name,
      category,
      collection: 'sovereign',
      price: Number(price),
      image: imagePreview || '/brand/items_mixed.png',
      description: description || `Premium ${category.toLowerCase()} by StitchBros.`,
      longDescription: description || `Premium ${category.toLowerCase()} by StitchBros. Handcrafted with the finest materials.`,
      sizes: sizes.length > 0 ? sizes : ['S', 'M', 'L', 'XL'],
      specs: specs.filter(Boolean),
      details: [
        { label: 'Fabric', value: fabric || 'Premium' },
        { label: 'Fit', value: fit || 'Tailored' },
      ],
      images: [imagePreview || '/brand/items_mixed.png'],
    };

    // Save to server (Redis) for cross-device persistence
    try {
      await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(product) });
    } catch (e) { console.error(e); }

    // Also save locally for same-session display
    addDynamicProduct(product);
    
    setSavedProducts(prev => [...prev, product]);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setName(''); setPrice(''); setDescription('');
      setFabric(''); setFit(''); setSizes([]); setSpecs(['']);
      setImagePreview(null); setDiscountPercent('33');
    }, 2500);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 16px', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 12, fontSize: 14, color: '#fff', outline: 'none', boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 8, fontSize: 10, color: '#888',
    textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 8, fontWeight: 700,
  };

  const cardStyle: React.CSSProperties = {
    background: '#121212', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 20, padding: 32,
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Add New Product</h2>
          <p style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Create a new item for your catalog</p>
        </div>
        {saved && (
          <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e', padding: '10px 20px', borderRadius: 12, fontSize: 12, fontWeight: 700 }}>
            ✓ Product added to catalog!
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24 }}>
        {/* Left - Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Basic Info */}
          <div style={cardStyle}>
            <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#C5A059', marginBottom: 24 }}>Basic Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={labelStyle}><Tag size={12} /> Product Name</label>
                <input style={inputStyle} value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Sovereign Silk Blazer" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={labelStyle}><Layers size={12} /> Category</label>
                  <select style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' as const }} value={category} onChange={e => setCategory(e.target.value)}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}><DollarSign size={12} /> Selling Price (₹)</label>
                  <input style={inputStyle} type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g. 2999" />
                </div>
              </div>

              {/* Discount */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={labelStyle}><Percent size={12} /> Discount %</label>
                  <input style={inputStyle} type="number" value={discountPercent} onChange={e => setDiscountPercent(e.target.value)} placeholder="e.g. 33" min="0" max="90" />
                </div>
                <div>
                  <label style={labelStyle}>Original MRP (auto)</label>
                  <div style={{ ...inputStyle, background: 'rgba(197,160,89,0.1)', color: '#C5A059', fontWeight: 700 }}>
                    ₹{originalPrice.toLocaleString()}
                  </div>
                </div>
              </div>

              <div>
                <label style={labelStyle}><FileText size={12} /> Description</label>
                <textarea style={{ ...inputStyle, minHeight: 100, resize: 'vertical' as const }} value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe the product's heritage and craftsmanship..." />
              </div>
            </div>
          </div>

          {/* Details */}
          <div style={cardStyle}>
            <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#C5A059', marginBottom: 24 }}>Product Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>Fabric / Material</label>
                <input style={inputStyle} value={fabric} onChange={e => setFabric(e.target.value)} placeholder="e.g. 100% Italian Silk" />
              </div>
              <div>
                <label style={labelStyle}>Fit</label>
                <input style={inputStyle} value={fit} onChange={e => setFit(e.target.value)} placeholder="e.g. Slim Tailored" />
              </div>
            </div>
            <div style={{ marginTop: 24 }}>
              <label style={labelStyle}>Specifications</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {specs.map((spec, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: 8 }}>
                    <input style={{ ...inputStyle, flex: 1 }} value={spec} onChange={e => updateSpec(idx, e.target.value)} placeholder="e.g. Hand-rolled silk lapels" />
                    {specs.length > 1 && (
                      <button onClick={() => removeSpec(idx)} style={{ padding: '0 12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12, color: '#ef4444', cursor: 'pointer' }}>
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
                <button onClick={addSpec} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: 'rgba(197,160,89,0.1)', border: '1px dashed rgba(197,160,89,0.3)', borderRadius: 12, color: '#C5A059', fontSize: 11, fontWeight: 600, cursor: 'pointer', width: 'fit-content' }}>
                  <Plus size={14} /> Add Spec
                </button>
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div style={cardStyle}>
            <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#C5A059', marginBottom: 24 }}>Available Sizes</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {allSizes.map(size => (
                <button key={size} onClick={() => toggleSize(size)} style={{
                  width: 48, height: 48, borderRadius: '50%',
                  border: sizes.includes(size) ? '2px solid #C5A059' : '1px solid rgba(255,255,255,0.1)',
                  background: sizes.includes(size) ? 'rgba(197,160,89,0.15)' : 'transparent',
                  color: sizes.includes(size) ? '#C5A059' : '#888',
                  fontWeight: 700, fontSize: 12, cursor: 'pointer', transition: 'all 0.2s',
                }}>
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Image + Preview + Save */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 120, alignSelf: 'flex-start' }}>
          <div style={cardStyle}>
            <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#C5A059', marginBottom: 24 }}>Product Image</h3>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            {imagePreview ? (
              <div style={{ position: 'relative' }}>
                <img src={imagePreview} alt="Preview" style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }} />
                <button onClick={() => setImagePreview(null)} style={{ position: 'absolute', top: 8, right: 8, width: 28, height: 28, borderRadius: '50%', background: 'rgba(0,0,0,0.7)', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button onClick={() => fileRef.current?.click()} style={{ width: '100%', aspectRatio: '3/4', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, cursor: 'pointer', background: 'rgba(255,255,255,0.02)', color: '#666' }}>
                <ImageIcon size={40} />
                <span style={{ fontSize: 12, fontWeight: 600 }}>Click to upload image</span>
                <span style={{ fontSize: 10, color: '#444' }}>JPG, PNG • Max 5MB</span>
              </button>
            )}
          </div>

          {/* Live Preview */}
          <div style={cardStyle}>
            <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#C5A059', marginBottom: 16 }}>Preview</h3>
            <div style={{ background: '#0a0a0a', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ aspectRatio: '4/3', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {imagePreview ? <img src={imagePreview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <ImageIcon size={32} color="#333" />}
              </div>
              <div style={{ padding: 16 }}>
                <p style={{ fontSize: 9, color: '#666', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em' }}>STITCHBROS</p>
                <p style={{ fontSize: 13, fontWeight: 600, marginTop: 2, color: '#e5e5e5' }}>{name || 'Product Name'}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#C5A059' }}>₹{price ? Number(price).toLocaleString() : '0'}</span>
                  {price && <span style={{ fontSize: 11, color: '#666', textDecoration: 'line-through' }}>₹{originalPrice.toLocaleString()}</span>}
                  {price && <span style={{ fontSize: 10, color: '#22c55e', fontWeight: 700 }}>{discountPercent}% OFF</span>}
                </div>
              </div>
            </div>
          </div>

          <button onClick={handleSave} disabled={!name || !price} style={{
            width: '100%', padding: 16,
            background: !name || !price ? '#333' : '#C5A059',
            color: !name || !price ? '#666' : '#000',
            fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.2em',
            border: 'none', borderRadius: 16, cursor: !name || !price ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <Save size={16} /> Add to Catalog
          </button>
        </div>
      </div>

      {/* Recently Added */}
      {savedProducts.length > 0 && (
        <div style={{ marginTop: 48 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24, color: '#C5A059' }}>
            Recently Added ({savedProducts.length})
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {savedProducts.map((p, idx) => (
              <div key={idx} style={{ background: '#121212', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
                  <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: 12 }}>
                  <p style={{ fontSize: 10, color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{p.category}</p>
                  <p style={{ fontSize: 13, fontWeight: 600, marginTop: 2, color: '#e5e5e5' }}>{p.name}</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#C5A059', marginTop: 4 }}>₹{p.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
