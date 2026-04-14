"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, Search, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartContext';

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { totalItems } = useCart();

  const isHomePage = pathname === '/';
  const isAdmin = pathname.startsWith('/admin');

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMounted) return null;
  if (isAdmin) return null;

  // Solid navbar for retail pages, cinematic/transparent for home
  const navbarBg = isHomePage 
    ? (isScrolled ? 'bg-black/90 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-8')
    : 'bg-white/95 backdrop-blur-md py-4 border-b border-gray-100 shadow-sm';

  const textColor = isHomePage && !isScrolled ? 'text-white' : (isHomePage ? 'text-accent' : 'text-black');
  const mutedTextColor = isHomePage && !isScrolled ? 'text-white/60' : (isHomePage ? 'text-accent/60' : 'text-gray-500');

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navbarBg}`}>
      <div className="container flex items-center justify-between">
        {/* Left Nav */}
        <div className={`hidden md:flex items-center space-x-6 text-[9px] uppercase tracking-[0.25em] font-semibold ${mutedTextColor}`}>
          <a href="/shop" className="hover:text-accent transition-colors">Collections</a>
          <a href="/#legacy" className="hover:text-accent transition-colors">Our Legacy</a>
          <a href="/shop" className="hover:text-accent transition-colors">Bespoke</a>
        </div>

        {/* Logo */}
        <a href="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center group">
          <span className={`text-2xl md:text-3xl font-bold tracking-[0.2em] transition-colors group-hover:scale-105 duration-300 ${isHomePage ? 'text-accent' : 'text-black'}`}>
            STITCHBROS
          </span>
          <div className={`w-12 h-[1px] mt-1 transition-colors ${isHomePage ? 'bg-accent/40' : 'bg-black/20'}`}></div>
        </a>

        {/* Right Icons */}
        <div className={`flex items-center space-x-6 ${mutedTextColor}`}>
          <button className="hover:text-accent transition-colors">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button className="hidden sm:block hover:text-accent transition-colors">
            <User size={20} strokeWidth={1.5} />
          </button>
          <a 
            href="/bag"
            className="flex items-center space-x-2 hover:text-accent transition-colors relative"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 bg-accent text-[8px] font-bold text-black w-4 h-4 flex items-center justify-center rounded-full"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </a>
          <button className="md:hidden">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
