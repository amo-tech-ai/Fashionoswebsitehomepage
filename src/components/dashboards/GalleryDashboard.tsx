import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Upload, 
  CheckCircle2, 
  MessageSquare, 
  Share2, 
  Grid, 
  List,
  Image as ImageIcon,
  Play,
  MoreHorizontal
} from 'lucide-react';

export function GalleryDashboard() {
  const [activeTab, setActiveTab] = useState<'raw' | 'edited' | 'final'>('edited');

  const tabs = [
    { id: 'raw', label: 'RAW Uploads', count: 142 },
    { id: 'edited', label: 'Edited', count: 45 },
    { id: 'final', label: 'Final Delivery', count: 12 },
  ];

  // Mock Data
  const assets = [
    { id: 1, name: "DSC_8842.jpg", type: "image", status: "Approved", url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400&h=500" },
    { id: 2, name: "DSC_8845.jpg", type: "image", status: "Needs Revision", url: "https://images.unsplash.com/photo-1529139574466-a302d2d3f524?auto=format&fit=crop&q=80&w=400&h=500" },
    { id: 3, name: "DSC_8849.jpg", type: "image", status: "In Editing", url: "https://images.unsplash.com/photo-1485230405346-71acb9518d9c?auto=format&fit=crop&q=80&w=400&h=500" },
    { id: 4, name: "BTS_Clip_1.mp4", type: "video", status: "Approved", url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=400&h=500" },
    { id: 5, name: "DSC_8852.jpg", type: "image", status: "Approved", url: "https://images.unsplash.com/photo-1509631179647-b820f191b680?auto=format&fit=crop&q=80&w=400&h=500" },
    { id: 6, name: "DSC_8855.jpg", type: "image", status: "Approved", url: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&q=80&w=400&h=500" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5F1] p-6 lg:p-12 font-sans text-gray-900">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
        <div>
          <h1 className="text-4xl font-serif text-gray-900 mb-2">Gallery & Deliverables</h1>
          <p className="text-gray-500">Review, approve, and download your assets.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 hover:bg-gray-50 shadow-sm">
             <Download className="w-4 h-4" />
             <span>Download All</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 shadow-lg shadow-gray-900/10">
             <Share2 className="w-4 h-4" />
             <span>Share Gallery</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-gray-200 mb-8">
        {tabs.map((tab) => (
            <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-4 text-sm font-medium relative transition-colors ${
                    activeTab === tab.id ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
                }`}
            >
                {tab.label}
                <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                    {tab.count}
                </span>
                {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                )}
            </button>
        ))}
      </div>

      {/* Filters & Toolbar */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                type="text" 
                placeholder="Search assets..." 
                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 w-64 shadow-sm"
                />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 shadow-sm">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
            </button>
        </div>
        <div className="flex bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
            <button className="p-2 bg-gray-100 text-gray-900 rounded-lg">
                <Grid className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
                <List className="w-4 h-4" />
            </button>
        </div>
      </div>

      {/* Content Area */}
      {activeTab === 'raw' && (
        <div className="border-2 border-dashed border-gray-300 rounded-3xl h-64 flex flex-col items-center justify-center text-gray-400 bg-gray-50/50 mb-8 hover:bg-gray-50 transition-colors cursor-pointer">
            <Upload className="w-8 h-8 mb-4" />
            <p className="text-lg font-medium text-gray-600">Drag and drop RAW files here</p>
            <p className="text-sm">or click to browse</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {assets.map((asset) => (
            <div key={asset.id} className="group relative bg-white p-3 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden relative mb-3">
                    <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                    
                    {asset.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg">
                                <Play className="w-5 h-5 text-gray-900 ml-1" />
                            </div>
                        </div>
                    )}

                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        <button className="p-2 bg-white/90 rounded-full hover:text-blue-600 shadow-sm">
                            <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-white/90 rounded-full hover:text-gray-900 shadow-sm">
                            <MessageSquare className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="px-1">
                    <div className="flex items-start justify-between mb-1">
                        <h3 className="text-sm font-medium text-gray-900 truncate pr-2">{asset.name}</h3>
                        <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                         <span className="text-xs text-gray-500 uppercase">{asset.type}</span>
                         <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            asset.status === 'Approved' ? 'bg-green-50 text-green-700' :
                            asset.status === 'Needs Revision' ? 'bg-red-50 text-red-700' :
                            'bg-blue-50 text-blue-700'
                         }`}>
                            {asset.status}
                         </span>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}
