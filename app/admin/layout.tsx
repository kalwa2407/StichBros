"use client";

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut, 
  Bell,
  Search,
  ExternalLink,
  Lock,
  Eye,
  EyeOff,
  PlusCircle
} from 'lucide-react';
import { usePathname } from 'next/navigation';

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (userId === 'Admin' && password === 'Admin123') {
        sessionStorage.setItem('stichbros_admin', 'true');
        onLogin();
      } else {
        setError('Invalid credentials. Please try again.');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '380px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ width: 56, height: 56, background: 'rgba(197,160,89,0.1)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', border: '1px solid rgba(197,160,89,0.2)' }}>
            <Lock size={24} color="#C5A059" />
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: '#C5A059' }}>StitchBros</h1>
          <p style={{ fontSize: 10, color: '#666', textTransform: 'uppercase' as const, letterSpacing: '0.15em', marginTop: 4 }}>Admin Control Center</p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: '28px', display: 'flex', flexDirection: 'column' as const, gap: 20 }}>
          <div>
            <label style={{ display: 'block', fontSize: 10, color: '#888', textTransform: 'uppercase' as const, letterSpacing: '0.15em', marginBottom: 8, fontWeight: 600 }}>Admin ID</label>
            <input 
              type="text" value={userId} onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter Admin ID"
              style={{ width: '100%', padding: '12px 16px', background: '#080808', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 14, color: '#fff', outline: 'none', boxSizing: 'border-box' as const }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 10, color: '#888', textTransform: 'uppercase' as const, letterSpacing: '0.15em', marginBottom: 8, fontWeight: 600 }}>Password</label>
            <div style={{ position: 'relative' as const }}>
              <input 
                type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                style={{ width: '100%', padding: '12px 44px 12px 16px', background: '#080808', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 14, color: '#fff', outline: 'none', boxSizing: 'border-box' as const }}
                required
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute' as const, right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {error && <div style={{ background: 'rgba(255,50,50,0.1)', border: '1px solid rgba(255,50,50,0.2)', borderRadius: 8, padding: '10px 16px', fontSize: 12, color: '#ff6b6b' }}>{error}</div>}
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', background: '#C5A059', color: '#000', fontWeight: 700, fontSize: 12, textTransform: 'uppercase' as const, letterSpacing: '0.15em', border: 'none', borderRadius: 12, cursor: 'pointer', opacity: loading ? 0.6 : 1 }}>
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
        <p style={{ fontSize: 9, color: '#444', textAlign: 'center' as const, marginTop: 24, textTransform: 'uppercase' as const, letterSpacing: '0.15em' }}>Authorized Personnel Only</p>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const auth = sessionStorage.getItem('stichbros_admin');
    if (auth === 'true') setIsAuthenticated(true);
    setIsChecking(false);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('stichbros_admin');
    setIsAuthenticated(false);
  };

  if (isChecking) {
    return <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C5A059', fontSize: 12, letterSpacing: '0.5em', textTransform: 'uppercase' as const }}>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Package, label: 'Inventory', href: '/admin/inventory' },
    { icon: ShoppingBag, label: 'Orders', href: '/admin/orders' },
    { icon: PlusCircle, label: 'Add Product', href: '/admin/add-product' },
    { icon: Users, label: 'Customers', href: '/admin/customers' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  const sidebarStyle: React.CSSProperties = {
    width: 256, background: '#080808', borderRight: '1px solid rgba(255,255,255,0.05)',
    display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 50,
  };

  const mainStyle: React.CSSProperties = {
    flexGrow: 1, marginLeft: 256, padding: 48, minHeight: '100vh',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0C0C0C', color: '#e5e5e5', display: 'flex', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <div style={{ padding: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#C5A059', marginBottom: 48 }}>
            <div style={{ width: 32, height: 32, background: 'rgba(197,160,89,0.2)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>S</div>
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase' as const }}>StitchBros</span>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <a 
                  key={item.href} href={item.href}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 12,
                    background: isActive ? '#C5A059' : 'transparent',
                    color: isActive ? '#000' : '#888',
                    fontWeight: isActive ? 700 : 400,
                    fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.15em',
                    textDecoration: 'none', transition: 'all 0.2s',
                  }}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        <div style={{ marginTop: 'auto', padding: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <a href="/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#666', fontSize: 10, textTransform: 'uppercase' as const, letterSpacing: '0.15em', textDecoration: 'none' }}>
            <ExternalLink size={14} />
            <span>View Website</span>
          </a>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(239,68,68,0.6)', fontSize: 10, textTransform: 'uppercase' as const, letterSpacing: '0.15em', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.05)', width: '100%', background: 'none', border: 'none', cursor: 'pointer' }}>
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={mainStyle}>
        {/* Header */}
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 48 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.025em', marginBottom: 4 }}>Control Center</h1>
            <p style={{ fontSize: 11, color: '#666', textTransform: 'uppercase' as const, letterSpacing: '0.15em' }}>Managing the STITCHBROS Dynasty</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ position: 'relative' as const }}>
              <Search style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#666' }} size={16} />
              <input type="text" placeholder="Search..." style={{ background: '#121212', border: '1px solid rgba(255,255,255,0.05)', padding: '12px 12px 12px 40px', borderRadius: 12, fontSize: 12, color: '#fff', outline: 'none', width: 240 }} />
            </div>
            <button style={{ position: 'relative' as const, padding: 12, background: '#121212', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12, cursor: 'pointer', color: '#e5e5e5' }}>
              <Bell size={18} />
              <span style={{ position: 'absolute', top: 10, right: 10, width: 8, height: 8, background: '#C5A059', borderRadius: '50%', border: '2px solid #121212' }}></span>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderLeft: '1px solid rgba(255,255,255,0.05)', paddingLeft: 24 }}>
              <div style={{ textAlign: 'right' as const }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: '#fff', textTransform: 'uppercase' as const, letterSpacing: '0.15em' }}>Admin</p>
                <p style={{ fontSize: 8, color: '#C5A059', fontWeight: 700, textTransform: 'uppercase' as const }}>Superuser</p>
              </div>
              <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #C5A059, #D4B26F)', borderRadius: 12 }}></div>
            </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
