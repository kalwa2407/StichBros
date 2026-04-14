"use client";

import React from 'react';
import { 
  TrendingUp, ShoppingBag, Users, CreditCard,
  ArrowUpRight, ArrowDownRight, Package, Clock, IndianRupee
} from 'lucide-react';

export default function AdminDashboard() {
  
  const stats = [
    { label: 'Total Revenue', value: '₹0', change: '0%', isUp: true, icon: IndianRupee },
    { label: 'Active Orders', value: '0', change: '0%', isUp: true, icon: ShoppingBag },
    { label: 'Products Listed', value: '12', change: 'Live', isUp: true, icon: Package },
    { label: 'Avg. Order Value', value: '₹0', change: 'N/A', isUp: true, icon: CreditCard },
  ];

  const recentOrders: any[] = [];

  const cardStyle: React.CSSProperties = {
    background: '#121212', border: '1px solid rgba(255,255,255,0.05)', padding: 32,
    borderRadius: 24, transition: 'all 0.2s',
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
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 700, color: '#888' }}>
                <span>{stat.change}</span>
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

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 0', color: '#444' }}>
            <ShoppingBag size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
            <p style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>No orders yet</p>
            <p style={{ fontSize: 11, color: '#555' }}>Orders will appear here in real-time</p>
          </div>
        </div>

        {/* Quick Stats Panel */}
        <div style={{ background: '#C5A059', borderRadius: 28, padding: 32, color: '#000', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, padding: 32, opacity: 0.1 }}>
            <TrendingUp size={120} />
          </div>
          
          <div style={{ position: 'relative', zIndex: 10 }}>
            <h3 style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4em', marginBottom: 32 }}>Store Overview</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: 16 }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700 }}>Total Products</p>
                  <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', opacity: 0.6 }}>Active Catalog</p>
                </div>
                <span style={{ fontSize: 24, fontWeight: 700 }}>12</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: 16 }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700 }}>Total Revenue</p>
                  <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', opacity: 0.6 }}>Lifetime Sales</p>
                </div>
                <span style={{ fontSize: 24, fontWeight: 700 }}>₹0</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700 }}>Pending Orders</p>
                  <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', opacity: 0.6 }}>Awaiting Fulfillment</p>
                </div>
                <span style={{ fontSize: 24, fontWeight: 700 }}>0</span>
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
