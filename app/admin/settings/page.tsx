"use client";

import React, { useState } from 'react';
import { Save, Store, Globe, Bell, Shield, Palette } from 'lucide-react';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [storeName, setStoreName] = useState('StitchBros');
  const [storeEmail, setStoreEmail] = useState('admin@stitchbros.com');
  const [storePhone, setStorePhone] = useState('+91 8840658081');
  const [currency, setCurrency] = useState('INR (₹)');
  const [freeShipping, setFreeShipping] = useState('50000');
  const [notifyOrders, setNotifyOrders] = useState(true);
  const [notifyStock, setNotifyStock] = useState(true);
  const [notifyReviews, setNotifyReviews] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const cardStyle: React.CSSProperties = {
    background: '#121212', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 20, padding: 32, marginBottom: 24,
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 16px', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 12, fontSize: 14, color: '#fff', outline: 'none', boxSizing: 'border-box' as const,
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 10, color: '#888', textTransform: 'uppercase' as const,
    letterSpacing: '0.15em', marginBottom: 8, fontWeight: 700,
  };

  const toggleStyle = (active: boolean): React.CSSProperties => ({
    width: 44, height: 24, borderRadius: 999, position: 'relative' as const, cursor: 'pointer',
    background: active ? '#C5A059' : 'rgba(255,255,255,0.1)', transition: 'all 0.2s', border: 'none', flexShrink: 0,
  });

  const toggleDot = (active: boolean): React.CSSProperties => ({
    position: 'absolute' as const, top: 3, left: active ? 23 : 3,
    width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left 0.2s',
  });

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Settings</h2>
          <p style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Manage your store configuration</p>
        </div>
        {saved && (
          <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e', padding: '10px 20px', borderRadius: 12, fontSize: 12, fontWeight: 700 }}>
            ✓ Settings saved!
          </div>
        )}
      </div>

      {/* Store Information */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#C5A059', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Store size={16} /> Store Information
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={labelStyle}>Store Name</label>
            <input style={inputStyle} value={storeName} onChange={e => setStoreName(e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Contact Email</label>
            <input style={inputStyle} value={storeEmail} onChange={e => setStoreEmail(e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Phone Number</label>
            <input style={inputStyle} value={storePhone} onChange={e => setStorePhone(e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Currency</label>
            <input style={inputStyle} value={currency} onChange={e => setCurrency(e.target.value)} disabled />
          </div>
        </div>
      </div>

      {/* Shipping */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#C5A059', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Globe size={16} /> Shipping & Delivery
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={labelStyle}>Free Shipping Threshold (₹)</label>
            <input style={inputStyle} type="number" value={freeShipping} onChange={e => setFreeShipping(e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Standard Delivery Fee (₹)</label>
            <input style={inputStyle} value="500" disabled />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#C5A059', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Bell size={16} /> Notifications
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[
            { label: 'New Order Alerts', desc: 'Get notified when a customer places an order', value: notifyOrders, setter: setNotifyOrders },
            { label: 'Low Stock Alerts', desc: 'Alert when product stock drops below threshold', value: notifyStock, setter: setNotifyStock },
            { label: 'Review Notifications', desc: 'Notify on new product reviews', value: notifyReviews, setter: setNotifyReviews },
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: idx < 2 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#e5e5e5', marginBottom: 4 }}>{item.label}</p>
                <p style={{ fontSize: 11, color: '#666' }}>{item.desc}</p>
              </div>
              <button onClick={() => item.setter(!item.value)} style={toggleStyle(item.value)}>
                <div style={toggleDot(item.value)} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#C5A059', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Shield size={16} /> Security & Access
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#e5e5e5', marginBottom: 4 }}>Maintenance Mode</p>
            <p style={{ fontSize: 11, color: '#666' }}>Temporarily disable the storefront for updates</p>
          </div>
          <button onClick={() => setMaintenanceMode(!maintenanceMode)} style={toggleStyle(maintenanceMode)}>
            <div style={toggleDot(maintenanceMode)} />
          </button>
        </div>
        <div style={{ padding: '16px 0' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#e5e5e5', marginBottom: 4 }}>Admin Credentials</p>
          <p style={{ fontSize: 11, color: '#666' }}>ID: Admin / Password: Admin123</p>
        </div>
      </div>

      {/* Save */}
      <button onClick={handleSave} style={{
        padding: '16px 40px', background: '#C5A059', color: '#000', fontWeight: 700,
        fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.2em',
        border: 'none', borderRadius: 16, cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <Save size={16} /> Save Settings
      </button>
    </div>
  );
}
