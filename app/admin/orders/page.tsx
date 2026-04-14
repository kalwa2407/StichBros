"use client";

import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Search, MapPin, Clock, CreditCard, 
  Truck, ChevronRight, ExternalLink, Package
} from 'lucide-react';

type Order = {
  id: string;
  customer: string;
  email: string;
  destination: string;
  items: { name: string; qty: number; price: number; image: string }[];
  itemCount: number;
  total: number;
  status: string;
  date: string;
  method: string;
};

export default function OrdersPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('stichbros_orders') || '[]');
      setOrders(stored);
    } catch (e) {
      setOrders([]);
    }
  }, []);

  const filteredOrders = orders.filter(order => 
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

  const updateStatus = (orderId: string, newStatus: string) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    setOrders(updated);
    localStorage.setItem('stichbros_orders', JSON.stringify(updated));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Order Fulfillment</h1>
          <p style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700 }}>
            {orders.length === 0 ? 'No orders yet' : `${orders.length} order${orders.length !== 1 ? 's' : ''} total`}
          </p>
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
        {['All', 'Processing', 'Shipped', 'Delivered'].map(status => (
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
            <Package style={{ margin: '0 auto 16px', color: '#444' }} size={48} />
            <p style={{ color: '#888', fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
              {orders.length === 0 ? 'No orders yet' : 'No matching orders'}
            </p>
            <p style={{ color: '#555', fontSize: 12 }}>
              {orders.length === 0 ? 'Orders will appear here when customers complete checkout' : 'Try a different filter'}
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const sc = statusColor(order.status);
            return (
              <div key={order.id} style={{ background: '#121212', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 20, padding: 24, transition: 'all 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(197,160,89,0.3)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
              >
                {/* Top Row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, background: 'rgba(197,160,89,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ShoppingBag size={18} color="#C5A059" />
                    </div>
                    <div>
                      <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{order.id}</span>
                      <p style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                        <Clock size={10} /> {order.date}
                      </p>
                    </div>
                  </div>
                  <span style={{ padding: '5px 14px', borderRadius: 999, fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>
                    {order.status}
                  </span>
                </div>

                {/* Customer + Items */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{order.customer}</p>
                    <p style={{ fontSize: 10, color: '#888', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <CreditCard size={10} /> {order.method}
                    </p>
                    <p style={{ fontSize: 10, color: '#888', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <MapPin size={10} color="#C5A059" /> {order.destination}
                    </p>
                  </div>

                  {/* Items thumbnails */}
                  <div style={{ display: 'flex', gap: 8 }}>
                    {order.items.slice(0, 3).map((item, idx) => (
                      <div key={idx} style={{ width: 48, height: 60, background: '#0a0a0a', borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div style={{ width: 48, height: 60, background: '#0a0a0a', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#888', border: '1px solid rgba(255,255,255,0.05)' }}>
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 20, fontWeight: 700, color: '#C5A059' }}>₹{order.total.toLocaleString()}</p>
                    <p style={{ fontSize: 10, color: '#888' }}>{order.itemCount} item{order.itemCount !== 1 ? 's' : ''}</p>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 8, marginTop: 16, borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: 16, flexWrap: 'wrap' }}>
                  {order.status === 'Processing' && (
                    <button onClick={() => updateStatus(order.id, 'Shipped')} style={{ padding: '8px 16px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 8, color: '#3b82f6', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Truck size={12} /> Mark Shipped
                    </button>
                  )}
                  {order.status === 'Shipped' && (
                    <button onClick={() => updateStatus(order.id, 'Delivered')} style={{ padding: '8px 16px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 8, color: '#22c55e', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Package size={12} /> Mark Delivered
                    </button>
                  )}
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                    {order.items.map((item, idx) => (
                      <span key={idx} style={{ fontSize: 10, color: '#666', padding: '6px 10px', background: 'rgba(255,255,255,0.03)', borderRadius: 6 }}>
                        {item.name} × {item.qty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Summary Banner */}
      {orders.length > 0 && (
        <div style={{ background: 'linear-gradient(135deg, #C5A059, #D4B26F)', borderRadius: 20, padding: 28, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 52, height: 52, background: 'rgba(0,0,0,0.1)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Truck size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>Total Orders: {orders.length}</h3>
              <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.6 }}>
                Revenue: ₹{orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
