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

  // Dark navbar everywhere - transparent on home hero, solid dark when scrolled
  const navStyle: React.CSSProperties = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
    transition: 'all 0.4s ease',
    padding: isHomePage && !isScrolled ? '28px 0' : '14px 0',
    background: isScrolled || !isHomePage ? 'rgba(8,8,8,0.95)' : 'transparent',
    backdropFilter: isScrolled || !isHomePage ? 'blur(12px)' : 'none',
    borderBottom: isScrolled || !isHomePage ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
  };

  // Bag page uses light bg, so navbar needs different styling there
  if (isBagPage) {
    navStyle.background = 'rgba(8,8,8,0.98)';
    navStyle.backdropFilter = 'blur(12px)';
    navStyle.borderBottom = '1px solid rgba(255,255,255,0.05)';
  }

  const linkColor = '#C5A059';
  const mutedColor = 'rgba(255,255,255,0.5)';

  return (
    <nav style={navStyle}>
      <div style={{ width: 'min(1400px, calc(100% - 40px))', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Left Nav - Desktop */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 600, color: mutedColor }} className="desktop-nav">
          <a href="/shop" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Collections</a>
          <a href="/#legacy" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Our Legacy</a>
          <a href="/shop" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Bespoke</a>
        </div>

        {/* Logo */}
        <a href="/" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}>
          <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.2em', color: linkColor, transition: 'transform 0.3s' }}>
            STITCHBROS
          </span>
          <div style={{ width: 48, height: 1, marginTop: 4, background: 'rgba(197,160,89,0.4)' }} />
        </a>

        {/* Right Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, color: mutedColor }}>
          <button style={{ color: 'inherit', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button style={{ color: 'inherit', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} className="desktop-only">
            <User size={20} strokeWidth={1.5} />
          </button>
          <button onClick={() => setIsOpen(true)} style={{ color: 'inherit', background: 'none', border: 'none', cursor: 'pointer', padding: 0, position: 'relative', display: 'flex', alignItems: 'center', gap: 8 }}>
            <ShoppingBag size={20} strokeWidth={1.5} />
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
            <Menu size={20} />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .desktop-only { display: none !important; }
        }
        @media (min-width: 768px) {
          .mobile-only { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
