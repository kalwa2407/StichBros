"use client";

import React, { useState } from 'react';
import { 
  ShoppingBag, Search, MapPin, Clock, CreditCard, 
  Truck, ChevronRight, ExternalLink, MoreVertical
} from 'lucide-react';

export default function OrdersPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  
  const initialOrders = [
    { id: 'ORD-7721', customer: 'Araya Varma', email: 'araya@example.com', destination: 'Mumbai, India', items: 1, total: '₹12,450', status: 'Processing', date: 'Apr 12, 2024 • 10:24 AM', method: 'Credit Card (Visa)' },
    { id: 'ORD-7720', customer: 'Kabir Singh', email: 'kabir.s@example.com', destination: 'New Delhi, India', items: 2, total: '₹95,200', status: 'Shipped', date: 'Apr 11, 2024 • 04:15 PM', method: 'UPI' },
    { id: 'ORD-7719', customer: 'Rohan Mehta', email: 'rohan.m@dynasty.co', destination: 'Bangalore, India', items: 3, total: '₹1,54,000', status: 'Delivered', date: 'Apr 10, 2024 • 11:32 AM', method: 'Net Banking' },
    { id: 'ORD-7718', customer: 'Ishani Roy', email: 'ishani_roy@outlook.com', destination: 'Kolkata, India', items: 1, total: '₹58,000', status: 'Verification', date: 'Apr 09, 2024 • 09:20 PM', method: 'COD (Pending)' },
  ];

  const filteredOrders = initialOrders.filter(order => 
    (filter === 'All' || order.status === filter) &&
    (order.id.toLowerCase().includes(search.toLowerCase()) || 
     order.customer.toLowerCase().includes(search.toLowerCase()))
  );

  const statusColor = (status: string) => {
    if (status === 'Delivered') return { bg: 'rgba(34,197,94,0.1)', color: '#22c55e', border: 'rgba(34,197,94,0.2)' };
    if (status === 'Shipped') return { bg: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: 'rgba(59,130,246,0.2)' };
    if (status === 'Verification') return { bg: 'rgba(249,115,22,0.1)', color: '#f97316', border: 'rgba(249,115,22,0.2)' };
    return { bg: 'rgba(197,160,89,0.1)', color: '#C5A059', border: 'rgba(197,160,89,0.2)' };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Order Fulfillment</h1>
          <p style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700 }}>4 Orders requiring attention</p>
        </div>
        <div style={{ position: 'relative' }}>
          <Search style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#666' }} size={16} />
          <input 
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search Order ID, Customer..."
            style={{ background: '#121212', border: '1px solid rgba(255,255,255,0.05)', padding: '12px 16px 12px 44px', borderRadius: 12, fontSize: 12, color: '#fff', outline: 'none', width: 300 }}
          />
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
        {['All', 'Processing', 'Verification', 'Shipped', 'Delivered'].map(status => (
          <button key={status} onClick={() => setFilter(status)} style={{
            padding: '10px 24px', borderRadius: 999, fontSize: 10, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.15em', whiteSpace: 'nowrap',
            cursor: 'pointer', border: 'none', transition: 'all 0.2s',
            background: filter === status ? '#C5A059' : '#121212',
            color: filter === status ? '#000' : '#888',
          }}>
            {status}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filteredOrders.length === 0 ? (
          <div style={{ padding: 80, textAlign: 'center', background: '#121212', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 24 }}>
            <ShoppingBag style={{ margin: '0 auto 16px', color: '#444' }} size={48} />
            <p style={{ color: '#666', fontSize: 14 }}>No orders found.</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const sc = statusColor(order.status);
            return (
              <div key={order.id} style={{ background: '#121212', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 24, padding: 24, transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 32 }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(197,160,89,0.3)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
              >
                {/* ID & Date */}
                <div style={{ flex: '0 0 160px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <ShoppingBag size={18} color="#C5A059" />
                    <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{order.id}</span>
                  </div>
                  <p style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={10} /> {order.date}
                  </p>
                </div>

                {/* Customer */}
                <div style={{ flex: '0 0 180px' }}>
                  <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4 }}>{order.customer}</p>
                  <p style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <CreditCard size={10} /> {order.method}
                  </p>
                </div>

                {/* Destination */}
                <div style={{ flex: '0 0 180px' }}>
                  <p style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <MapPin size={12} color="#C5A059" /> {order.destination}
                  </p>
                  <p style={{ fontSize: 10, color: '#666', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {order.items} Items • Secured
                  </p>
                </div>

                {/* Price & Status */}
                <div style={{ flex: '0 0 120px' }}>
                  <p style={{ fontSize: 18, fontWeight: 700, fontStyle: 'italic', marginBottom: 8 }}>{order.total}</p>
                  <span style={{ padding: '4px 12px', borderRadius: 999, fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>
                    {order.status}
                  </span>
                </div>

                {/* Actions */}
                <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12 }}>
                  <button style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#666', background: 'none', border: 'none', cursor: 'pointer' }}>
                    Timeline <ChevronRight size={14} />
                  </button>
                  <button style={{ padding: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12, cursor: 'pointer', color: '#888' }}>
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Analytics Banner */}
      <div style={{ background: 'linear-gradient(135deg, #C5A059, #D4B26F)', borderRadius: 28, padding: 32, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ width: 64, height: 64, background: 'rgba(0,0,0,0.1)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Truck size={32} />
          </div>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700 }}>Exporting 14 Orders Today</h3>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.6 }}>National Heritage Hub • Mumbai Distribution Center</p>
          </div>
        </div>
        <button style={{ background: '#000', color: '#fff', padding: '16px 32px', borderRadius: 16, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4em', cursor: 'pointer', border: 'none' }}>
          Print Manifests
        </button>
      </div>
    </div>
  );
}
