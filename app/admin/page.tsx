"use client";

import React from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Clock
} from 'lucide-react';

export default function AdminDashboard() {
  
  const stats = [
    { label: 'Total Revenue', value: '₹12.4L', change: '+12.5%', isUp: true, icon: TrendingUp },
    { label: 'Active Orders', value: '48', change: '+4.2%', isUp: true, icon: ShoppingBag },
    { label: 'New Customers', value: '1,240', change: '+18.1%', isUp: true, icon: Users },
    { label: 'Avg. Order Value', value: '₹24,500', change: '-2.4%', isUp: false, icon: CreditCard },
  ];

  const recentOrders = [
    { id: 'ORD-7721', customer: 'Araya Varma', product: 'Regency White Shirt', status: 'Processing', amount: '₹12,450', date: '2 mins ago' },
    { id: 'ORD-7720', customer: 'Kabir Singh', product: 'Sovereign Sherwani', status: 'Shipped', amount: '₹92,000', date: '45 mins ago' },
    { id: 'ORD-7719', customer: 'Rohan Mehta', product: 'Patriarch Overcoat', status: 'Delivered', amount: '₹82,000', date: '2 hours ago' },
    { id: 'ORD-7718', customer: 'Ishani Roy', product: 'Onyx Gold Abaya', status: 'Verification', amount: '₹58,000', date: '5 hours ago' },
  ];

  const cardStyle: React.CSSProperties = {
    background: '#121212', border: '1px solid rgba(255,255,255,0.05)', padding: 32,
    borderRadius: 24, transition: 'all 0.2s',
  };

  const statusColor = (status: string) => {
    if (status === 'Delivered') return { bg: 'rgba(34,197,94,0.1)', color: '#22c55e' };
    if (status === 'Shipped') return { bg: 'rgba(59,130,246,0.1)', color: '#3b82f6' };
    return { bg: 'rgba(197,160,89,0.1)', color: '#C5A059' };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      
      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
        {stats.map((stat, idx) => (
          <div key={idx} style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <div style={{ padding: 12, background: 'rgba(197,160,89,0.1)', borderRadius: 12, color: '#C5A059' }}>
                <stat.icon size={20} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 700, color: stat.isUp ? '#22c55e' : '#ef4444' }}>
                <span>{stat.change}</span>
                {stat.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              </div>
            </div>
            <p style={{ fontSize: 10, color: '#666', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 4 }}>{stat.label}</p>
            <h3 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.025em' }}>{stat.value}</h3>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        {/* Recent Orders */}
        <div style={{ ...cardStyle, borderRadius: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em' }}>Live Feed: Orders</h3>
            <a href="/admin/orders" style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#C5A059', textDecoration: 'none' }}>View All</a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {recentOrders.map((order) => {
              const sc = statusColor(order.status);
              return (
                <div key={order.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: 16, border: '1px solid rgba(255,255,255,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.05)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C5A059' }}>
                      <ShoppingBag size={18} />
                    </div>
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em' }}>{order.id}</p>
                      <p style={{ fontSize: 10, color: '#666' }}>{order.customer} • {order.product}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: 12, fontWeight: 700 }}>{order.amount}</p>
                      <p style={{ fontSize: 9, color: '#666', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}><Clock size={10} /> {order.date}</p>
                    </div>
                    <span style={{ padding: '4px 12px', borderRadius: 999, fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', background: sc.bg, color: sc.color }}>
                      {order.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div style={{ background: '#C5A059', borderRadius: 28, padding: 32, color: '#000', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, padding: 32, opacity: 0.1 }}>
            <Package size={120} />
          </div>
          
          <div style={{ position: 'relative', zIndex: 10 }}>
            <h3 style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4em', marginBottom: 32 }}>Low Stock Alert</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: 16 }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700 }}>Regency White Shirt</p>
                  <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', opacity: 0.6 }}>Sovereign Collection</p>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700 }}>2 Left</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: 16 }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700 }}>Sovereign Sherwani</p>
                  <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', opacity: 0.6 }}>Heritage Line</p>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700 }}>1 Left</span>
              </div>
            </div>
          </div>

          <a href="/admin/inventory" style={{ position: 'relative', zIndex: 10, display: 'block', width: '100%', padding: 16, background: '#000', color: '#fff', borderRadius: 16, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4em', marginTop: 32, textAlign: 'center', textDecoration: 'none' }}>
            Manage Inventory
          </a>
        </div>
      </div>
    </div>
  );
}
