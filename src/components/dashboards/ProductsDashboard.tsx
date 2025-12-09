import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Package, 
  AlertCircle, 
  CheckCircle2,
  LayoutGrid,
  List
} from 'lucide-react';

export function ProductsDashboard() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const products = [
    {
      id: 1,
      name: "Glow Serum",
      sku: "GS-001-2024",
      category: "Beauty",
      notes: "Fragile, Store upright",
      status: "Received",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      id: 2,
      name: "Silk Scarf",
      sku: "SS-BLU-002",
      category: "Apparel",
      notes: "Requires steaming before shoot",
      status: "Received",
      image: "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa3e?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      id: 3,
      name: "Leather Tote",
      sku: "LT-BRN-003",
      category: "Accessories",
      notes: "Stuffing required for shape",
      status: "Missing Info",
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      id: 4,
      name: "Gold Hoop Earrings",
      sku: "JW-GLD-004",
      category: "Jewelry",
      notes: "Use macro lens, high polish",
      status: "In Transit",
      image: "https://images.unsplash.com/photo-1630019852942-e5e1237d6d49?auto=format&fit=crop&q=80&w=400&h=400"
    },
  ];

  const categories = ["All", "Beauty", "Apparel", "Jewelry", "Accessories", "Home"];

  return (
    <div className="min-h-screen bg-[#F8F5F1] p-6 lg:p-12 font-sans text-gray-900">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-serif text-gray-900 mb-2">Products</h1>
          <p className="text-gray-500">Manage inventory for your upcoming shoots.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 w-64 shadow-sm"
            />
          </div>
          <div className="flex bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/10">
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 shrink-0 space-y-8">
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Categories</h3>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button key={cat} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${cat === 'All' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:bg-white/50'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Status</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="rounded border-gray-300 text-gray-900 focus:ring-gray-900" defaultChecked />
                Received
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="rounded border-gray-300 text-gray-900 focus:ring-gray-900" defaultChecked />
                In Transit
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="rounded border-gray-300 text-gray-900 focus:ring-gray-900" defaultChecked />
                Missing Info
              </label>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3">
                      <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-600 hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium shadow-sm backdrop-blur-md ${
                          product.status === 'Received' ? 'bg-white/90 text-green-700' : 
                          product.status === 'Missing Info' ? 'bg-white/90 text-red-700' :
                          'bg-white/90 text-blue-700'
                        }`}>
                          {product.status === 'Received' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                          {product.status}
                        </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="mb-1 text-xs font-bold text-gray-400 uppercase tracking-wider">{product.category}</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
                    <div className="text-sm text-gray-500 font-mono mb-4">{product.sku}</div>
                    
                    {product.notes && (
                      <div className="p-3 bg-gray-50 rounded-xl text-xs text-gray-600 italic border border-gray-100">
                        "{product.notes}"
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Add New Card */}
              <button className="flex flex-col items-center justify-center aspect-square rounded-2xl border-2 border-dashed border-gray-300 hover:border-gray-900 hover:bg-gray-50 transition-all group">
                 <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 group-hover:scale-110 transition-transform mb-4">
                    <Plus className="w-6 h-6 text-gray-900" />
                 </div>
                 <span className="font-medium text-gray-900">Add Product</span>
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">SKU</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Notes</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                          <span className="font-medium text-gray-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 font-mono">{product.sku}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          product.status === 'Received' ? 'bg-green-50 text-green-700' : 
                          product.status === 'Missing Info' ? 'bg-red-50 text-red-700' :
                          'bg-blue-50 text-blue-700'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 italic truncate max-w-xs">{product.notes}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-gray-900">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
