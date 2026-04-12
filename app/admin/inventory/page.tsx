"use client";

import React, { useState } from 'react';
import { getHomepageData } from '@/lib/catalog';
import { 
  Package, 
  Search, 
  Filter, 
  MoreVertical, 
  Plus, 
  ArrowUpDown,
  Eye,
  Edit3,
  Trash2,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InventoryPage() {
  const data = getHomepageData();
  const [searchTerm, setSearchTerm] = useState('');
  
  const products = data.products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div>
            <h1 className="text-2xl font-bold tracking-tight mb-1">Inventory Manager</h1>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Total SKUs: {products.length}</p>
         </div>
         <div className="flex items-center space-x-4">
            <div className="relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-accent transition-colors" size={16} />
               <input 
                 type="text" 
                 placeholder="Search products..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="bg-[#121212] border border-white/5 pl-12 pr-6 py-3 rounded-xl text-xs focus:ring-1 ring-accent/50 outline-none w-full md:w-80 transition-all font-medium"
               />
            </div>
            <button className="p-3 bg-[#121212] border border-white/5 rounded-xl hover:border-accent/40 transition-colors text-gray-400">
               <Filter size={20} />
            </button>
            <button className="bg-accent text-black px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center space-x-2 shadow-xl shadow-accent/10 hover:scale-[1.02] transition-transform">
               <Plus size={16} />
               <span>Add Product</span>
            </button>
         </div>
      </div>

      {/* Inventory Table Card */}
      <div className="bg-[#121212] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-white/5 bg-white/[0.01]">
                     <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                        <div className="flex items-center space-x-2">
                           <span>Product</span>
                           <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-100" />
                        </div>
                     </th>
                     <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">Category</th>
                     <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">Price</th>
                     <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">Stock</th>
                     <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-500 text-center">Status</th>
                     <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-500"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5 text-sm">
                  <AnimatePresence>
                     {products.map((product, idx) => (
                        <motion.tr 
                          key={product.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="group hover:bg-white/[0.012] transition-colors"
                        >
                           <td className="p-6">
                              <div className="flex items-center space-x-4">
                                 <div className="w-12 h-16 bg-white/5 rounded overflow-hidden flex-shrink-0 grayscale group-hover:grayscale-0 transition-all">
                                    <img src={product.image} className="w-full h-full object-cover" alt="" />
                                 </div>
                                 <div>
                                    <p className="font-bold text-white tracking-wide">{product.name}</p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-tighter">ID: {product.id}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="p-6">
                              <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                 {product.category}
                              </span>
                           </td>
                           <td className="p-6">
                              <p className="font-serif italic font-bold text-accent">₹{product.price.toLocaleString()}</p>
                           </td>
                           <td className="p-6">
                              <div className="flex items-center space-x-2">
                                 <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <div className={`h-full ${product.price > 50000 ? 'bg-orange-500 w-1/4' : 'bg-accent w-3/4'} rounded-full`} />
                                 </div>
                                 <span className="text-[10px] font-bold text-gray-400">
                                    {product.price > 50000 ? '2' : '15'} Left
                                 </span>
                              </div>
                           </td>
                           <td className="p-6 text-center">
                              <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-green-500 bg-green-500/10 px-3 py-1 rounded-full uppercase tracking-tighter">
                                 <CheckCircle2 size={12} />
                                 <span>Active</span>
                              </span>
                           </td>
                           <td className="p-6 text-right">
                              <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <button title="View Line Sheet" className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all">
                                    <Eye size={16} />
                                 </button>
                                 <button title="Edit Product" className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all">
                                    <Edit3 size={16} />
                                 </button>
                                 <button title="Archive" className="p-2 hover:bg-white/10 rounded-lg text-red-500/60 hover:text-red-500 transition-all">
                                    <Trash2 size={16} />
                                 </button>
                              </div>
                           </td>
                        </motion.tr>
                     ))}
                  </AnimatePresence>
               </tbody>
            </table>
            
            {products.length === 0 && (
               <div className="py-24 text-center">
                  <Package className="mx-auto text-gray-700 mb-4" size={48} />
                  <p className="text-gray-500 text-sm font-light">No products match your search.</p>
               </div>
            )}
         </div>

         {/* Pagination Footer */}
         <div className="p-6 bg-white/[0.01] border-t border-white/5 flex items-center justify-between">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Showing {products.length} of {data.products.length} Products</p>
            <div className="flex items-center space-x-4">
               <button disabled className="text-[10px] font-bold uppercase tracking-widest text-gray-600 cursor-not-allowed">Previous</button>
               <div className="flex space-x-1">
                  <span className="w-8 h-8 rounded-lg bg-accent text-black flex items-center justify-center text-xs font-bold">1</span>
               </div>
               <button className="text-[10px] font-bold uppercase tracking-widest text-accent hover:underline">Next</button>
            </div>
         </div>
      </div>

    </div>
  );
}
