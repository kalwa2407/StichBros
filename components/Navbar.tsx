"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, Search, User } from 'lucide-react';
import { useCart } from './CartContext';

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { totalItems, setIsOpen } = useCart();

  const isHomePage = pathname === '/';
  const isAdmin = pathname.startsWith('/admin');
  const isBagPage = pathname === '/bag';

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMounted) return null;
  if (isAdmin) return null;

  const navStyle: React.CSSProperties = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
    transition: 'all 0.4s ease',
    padding: isHomePage && !isScrolled ? '28px 0' : '14px 0',
    background: isScrolled || !isHomePage ? 'rgba(8,8,8,0.95)' : 'transparent',
    backdropFilter: isScrolled || !isHomePage ? 'blur(12px)' : 'none',
    borderBottom: isScrolled || !isHomePage ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
  };

  if (isBagPage) {
    navStyle.background = 'rgba(8,8,8,0.98)';
    navStyle.backdropFilter = 'blur(12px)';
    navStyle.borderBottom = '1px solid rgba(255,255,255,0.05)';
  }

  return (
    <nav style={navStyle}>
      <div style={{ width: 'min(1400px, calc(100% - 32px))', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
        
        {/* Left Nav - Desktop only */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 600, color: 'rgba(255,255,255,0.5)' }} className="desktop-nav">
          <a href="/shop" style={{ color: 'inherit', textDecoration: 'none' }}>Collections</a>
          <a href="/#legacy" style={{ color: 'inherit', textDecoration: 'none' }}>Our Legacy</a>
          <a href="/shop" style={{ color: 'inherit', textDecoration: 'none' }}>Bespoke</a>
        </div>

        {/* Logo - centered on desktop via absolute, normal flow on mobile */}
        <a href="/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }} className="nav-logo">
          <span style={{ fontWeight: 700, letterSpacing: '0.2em', color: '#C5A059' }} className="nav-logo-text">
            STITCHBROS
          </span>
          <div style={{ width: 48, height: 1, marginTop: 3, background: 'rgba(197,160,89,0.4)' }} />
        </a>

        {/* Right Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, color: 'rgba(255,255,255,0.5)' }}>
          <button style={{ color: 'inherit', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} className="desktop-only">
            <Search size={18} strokeWidth={1.5} />
          </button>
          <button style={{ color: 'inherit', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} className="desktop-only">
            <User size={18} strokeWidth={1.5} />
          </button>
          <button onClick={() => setIsOpen(true)} style={{ color: 'inherit', background: 'none', border: 'none', cursor: 'pointer', padding: 0, position: 'relative' }}>
            <ShoppingBag size={18} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span style={{
                position: 'absolute', top: -8, right: -8,
                background: '#C5A059', color: '#000', fontSize: 8, fontWeight: 700,
                width: 16, height: 16, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {totalItems}
              </span>
            )}
          </button>
          <button style={{ color: 'inherit', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} className="mobile-only">
            <Menu size={18} />
          </button>
        </div>
      </div>

      <style>{`
        .nav-logo-text { font-size: 16px; }
        @media (min-width: 768px) {
          .nav-logo { position: absolute; left: 50%; transform: translateX(-50%); }
          .nav-logo-text { font-size: 22px; }
          .desktop-nav { display: flex !important; }
          .desktop-only { display: flex !important; }
          .mobile-only { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .desktop-only { display: none !important; }
          .mobile-only { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
