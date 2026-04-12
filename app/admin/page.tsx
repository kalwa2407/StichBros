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
import { motion } from 'framer-motion';

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

  return (
    <div className="space-y-12">
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#121212] border border-white/5 p-8 rounded-[2rem] hover:border-accent/20 transition-all group"
            >
               <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-accent/10 rounded-xl text-accent group-hover:bg-accent group-hover:text-black transition-colors">
                     <stat.icon size={20} />
                  </div>
                  <div className={`flex items-center space-x-1 text-[10px] font-bold ${stat.isUp ? 'text-green-500' : 'text-red-500'} uppercase tracking-tighter`}>
                     <span>{stat.change}</span>
                     {stat.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  </div>
               </div>
               <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-1">{stat.label}</p>
               <h3 className="text-3xl font-bold tracking-tight">{stat.value}</h3>
            </motion.div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Recent Orders Table */}
         <div className="lg:col-span-2 bg-[#121212] border border-white/5 rounded-[2.5rem] p-8">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-sm font-bold uppercase tracking-[0.3em]">Live Feed: Orders</h3>
               <button className="text-[10px] font-bold uppercase tracking-widest text-accent hover:underline">View All Orders</button>
            </div>

            <div className="space-y-4">
               {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/5 group">
                     <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-accent">
                           <ShoppingBag size={18} />
                        </div>
                        <div>
                           <p className="text-xs font-bold text-white uppercase tracking-widest">{order.id}</p>
                           <p className="text-[10px] text-gray-500">{order.customer} • {order.product}</p>
                        </div>
                     </div>
                     <div className="text-right flex items-center space-x-8">
                        <div>
                           <p className="text-xs font-bold text-white">{order.amount}</p>
                           <p className="text-[9px] text-gray-500 uppercase flex items-center justify-end"><Clock size={10} className="mr-1" /> {order.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest ${
                           order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' : 
                           order.status === 'Shipped' ? 'bg-blue-500/10 text-blue-500' : 
                           'bg-accent/10 text-accent'
                        }`}>
                           {order.status}
                        </span>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Inventory Summary */}
         <div className="bg-accent rounded-[2.5rem] p-8 text-black flex flex-col justify-between overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <Package size={120} />
            </div>
            
            <div className="relative z-10">
               <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-8">Low Stock Alert</h3>
               <div className="space-y-6">
                  <div className="flex justify-between items-end border-b border-black/10 pb-4">
                     <div>
                        <p className="text-sm font-bold">Consul Striped Oxford</p>
                        <p className="text-[10px] font-bold uppercase opacity-60">Sovereign Collection</p>
                     </div>
                     <span className="text-xs font-bold">2 Left</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-black/10 pb-4">
                     <div>
                        <p className="text-sm font-bold">Sovereign Sherwani</p>
                        <p className="text-[10px] font-bold uppercase opacity-60">Heritage Line</p>
                     </div>
                     <span className="text-xs font-bold">1 Left</span>
                  </div>
               </div>
            </div>

            <button className="relative z-10 w-full py-4 bg-black text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.4em] mt-8 hover:bg-gray-900 transition-colors">
               Manage Inventory
            </button>
         </div>
      </div>

    </div>
  );
}
