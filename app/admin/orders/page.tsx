"use client";

import React from 'react';
import { 
  ShoppingBag, 
  Search, 
  MapPin, 
  Clock, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle,
  Truck,
  MoreVertical,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function OrdersPage() {
  
  const orders = [
    { 
      id: 'ORD-7721', 
      customer: 'Araya Varma', 
      email: 'araya@example.com',
      destination: 'Mumbai, India',
      items: 1,
      total: '₹12,450',
      status: 'Processing',
      date: 'Apr 12, 2024 • 10:24 AM',
      method: 'Credit Card (Visa)'
    },
    { 
      id: 'ORD-7720', 
      customer: 'Kabir Singh', 
      email: 'kabir.s@example.com',
      destination: 'New Delhi, India',
      items: 2,
      total: '₹95,200',
      status: 'Shipped',
      date: 'Apr 11, 2024 • 04:15 PM',
      method: 'UPI'
    },
    { 
      id: 'ORD-7719', 
      customer: 'Rohan Mehta', 
      email: 'rohan.m@dynasty.co',
      destination: 'Bangalore, India',
      items: 3,
      total: '₹1,54,000',
      status: 'Delivered',
      date: 'Apr 10, 2024 • 11:32 AM',
      method: 'Net Banking'
    },
    { 
      id: 'ORD-7718', 
      customer: 'Ishani Roy', 
      email: 'ishani_roy@outlook.com',
      destination: 'Kolkata, India',
      items: 1,
      total: '₹58,000',
      status: 'Verification',
      date: 'Apr 09, 2024 • 09:20 PM',
      method: 'COD (Pending)'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Shipped': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'Processing': return 'text-accent bg-accent/10 border-accent/20';
      case 'Verification': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div>
            <h1 className="text-2xl font-bold tracking-tight mb-1">Order Fulfillment</h1>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">4 Orders requiring attention</p>
         </div>
         <div className="flex items-center space-x-4">
            <div className="relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
               <input 
                 type="text" 
                 placeholder="Search Order ID, Customer..."
                 className="bg-[#121212] border border-white/5 pl-12 pr-6 py-3 rounded-xl text-xs outline-none w-full md:w-80 transition-all"
               />
            </div>
         </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
         {orders.map((order, idx) => (
            <motion.div 
              key={order.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#121212] border border-white/5 rounded-3xl p-6 hover:border-accent/30 transition-all group"
            >
               <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                  
                  {/* ID & Date */}
                  <div className="lg:w-1/6">
                     <div className="flex items-center space-x-3 mb-2">
                        <ShoppingBag size={18} className="text-accent" />
                        <span className="text-sm font-bold tracking-widest uppercase">{order.id}</span>
                     </div>
                     <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter flex items-center">
                        <Clock size={10} className="mr-1" /> {order.date}
                     </p>
                  </div>

                  {/* Customer Info */}
                  <div className="lg:w-1/4">
                     <p className="text-xs font-bold text-white uppercase tracking-widest mb-1">{order.customer}</p>
                     <p className="text-[10px] text-gray-500 lowercase flex items-center">
                        <CreditCard size={10} className="mr-1" /> {order.method}
                     </p>
                  </div>

                  {/* Destination */}
                  <div className="lg:w-1/4">
                     <p className="text-xs text-gray-300 font-medium mb-1 flex items-center">
                        <MapPin size={12} className="mr-2 text-accent" /> {order.destination}
                     </p>
                     <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                        {order.items} Items • Secured Packing
                     </p>
                  </div>

                  {/* Price & Status */}
                  <div className="lg:w-1/6">
                     <p className="text-lg font-bold italic font-serif text-white mb-2">{order.total}</p>
                     <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                        {order.status}
                     </span>
                  </div>

                  {/* Actions */}
                  <div className="lg:flex-grow flex items-center justify-end space-x-4">
                     <button className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                        <span>Timeline</span>
                        <ChevronRight size={14} />
                     </button>
                     <button className="bg-white/5 border border-white/5 p-3 rounded-xl hover:bg-accent hover:text-black transition-all group-hover:bg-white/10">
                        <ExternalLink size={18} />
                     </button>
                     <button className="p-3 text-gray-500 hover:text-white">
                        <MoreVertical size={18} />
                     </button>
                  </div>
               </div>
            </motion.div>
         ))}
      </div>

      {/* Analytics Insight Card */}
      <div className="bg-gradient-to-r from-accent to-[#D4B26F] rounded-[2.5rem] p-8 text-black flex items-center justify-between">
         <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-black/10 rounded-2xl flex items-center justify-center">
               <Truck size={32} />
            </div>
            <div>
               <h3 className="text-lg font-bold tracking-tight">Exporting 14 Orders Today</h3>
               <p className="text-xs font-bold uppercase tracking-widest opacity-60">National Heritage Hub • Mumbai Distribution Center</p>
            </div>
         </div>
         <button className="bg-black text-white px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.4em] hover:scale-105 transition-transform shadow-2xl">
            Print Manifests
         </button>
      </div>

    </div>
  );
}
