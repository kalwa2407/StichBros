"use client";

import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut, 
  Bell,
  Search,
  ExternalLink
} from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

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
           <button className="flex items-center space-x-3 text-red-400/60 hover:text-red-400 transition-colors text-[10px] uppercase tracking-widest pt-4 border-t border-white/5 w-full">
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
                    <p className="text-[10px] font-bold text-white uppercase tracking-widest truncate max-w-[100px]">Aman Admin</p>
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
