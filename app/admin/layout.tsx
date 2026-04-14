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
  EyeOff
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
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-accent/20">
            <Lock size={24} className="text-accent" />
          </div>
          <h1 className="text-xl font-bold tracking-[0.3em] uppercase text-accent">StitchBros</h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Admin Control Center</p>
        </div>

        {/* Login Card */}
        <form onSubmit={handleSubmit} className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 md:p-8 space-y-5">
          <div>
            <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-2 font-semibold">Admin ID</label>
            <input 
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter Admin ID"
              className="w-full px-4 py-3 bg-[#080808] border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:border-accent/50 focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-2 font-semibold">Password</label>
            <div className="relative">
              <input 
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full px-4 py-3 bg-[#080808] border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:border-accent/50 focus:outline-none transition-colors pr-12"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5 text-xs text-red-400 font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-accent text-black font-bold text-xs uppercase tracking-widest hover:bg-[#D4B26F] transition-all disabled:opacity-60 rounded-xl"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <p className="text-[9px] text-gray-600 text-center mt-6 uppercase tracking-widest">
          Authorized Personnel Only
        </p>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const auth = sessionStorage.getItem('stichbros_admin');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setIsChecking(false);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('stichbros_admin');
    setIsAuthenticated(false);
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="text-accent text-xs uppercase tracking-[0.5em] animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Package, label: 'Inventory', href: '/admin/inventory' },
    { icon: ShoppingBag, label: 'Orders', href: '/admin/orders' },
    { icon: Users, label: 'Customers', href: '/admin/customers' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-gray-100 flex font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#080808] border-r border-white/5 flex flex-col fixed inset-y-0 z-50">
        <div className="p-8">
           <div className="flex items-center space-x-3 text-accent mb-12">
              <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center font-bold">S</div>
              <span className="text-sm font-bold tracking-[0.3em] uppercase">StitchBros</span>
           </div>

           <nav className="space-y-2">
              {menuItems.map((item) => (
                 <a 
                   key={item.href}
                   href={item.href}
                   className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                     pathname === item.href 
                     ? 'bg-accent text-black font-bold' 
                     : 'text-gray-400 hover:bg-white/5 hover:text-white'
                   }`}
                 >
                    <item.icon size={18} />
                    <span className="text-xs uppercase tracking-widest">{item.label}</span>
                 </a>
              ))}
           </nav>
        </div>

        <div className="mt-auto p-8 space-y-4">
           <a href="/" target="_blank" className="flex items-center space-x-3 text-gray-500 hover:text-accent transition-colors text-[10px] uppercase tracking-widest">
              <ExternalLink size={14} />
              <span>View Website</span>
           </a>
           <button 
             onClick={handleLogout}
             className="flex items-center space-x-3 text-red-400/60 hover:text-red-400 transition-colors text-[10px] uppercase tracking-widest pt-4 border-t border-white/5 w-full"
           >
              <LogOut size={14} />
              <span>Logout</span>
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow ml-64 p-12">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
           <div>
              <h1 className="text-2xl font-bold tracking-tight mb-1">Control Center</h1>
              <p className="text-xs text-gray-500 uppercase tracking-widest">Managing the STITCHBROS Dynasty</p>
           </div>

           <div className="flex items-center space-x-6">
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                 <input 
                   type="text" 
                   placeholder="Search Orders..."
                   className="bg-[#121212] border border-white/5 px-10 py-3 rounded-xl text-xs focus:ring-1 ring-accent/50 outline-none w-64"
                 />
              </div>
              <button className="relative p-3 bg-[#121212] border border-white/5 rounded-xl hover:border-accent/40 transition-colors">
                 <Bell size={18} />
                 <span className="absolute top-3 right-3 w-2 h-2 bg-accent rounded-full border-2 border-[#121212]"></span>
              </button>
              <div className="flex items-center space-x-3 border-l border-white/5 pl-6">
                 <div className="text-right">
                    <p className="text-[10px] font-bold text-white uppercase tracking-widest truncate max-w-[100px]">Admin</p>
                    <p className="text-[8px] text-accent font-bold uppercase tracking-tighter">Superuser</p>
                 </div>
                 <div className="w-10 h-10 bg-gradient-to-tr from-accent to-[#D4B26F] rounded-xl"></div>
              </div>
           </div>
        </header>

        {children}
      </main>

    </div>
  );
}
