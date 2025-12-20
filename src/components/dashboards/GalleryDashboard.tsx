import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Upload, 
  CheckCircle2, 
  XCircle,
  MessageSquare, 
  Share2, 
  Grid, 
  List,
  Play,
  MoreHorizontal,
  Crop,
  Layers,
  ArrowLeft,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Image as ImageIcon
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useBrandShoot, GalleryAsset } from '../../context/BrandShootContext';

// --- Helper for Mocking AI Ingest ---
const generateMockAssets = (count: number): GalleryAsset[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: Date.now() + i,
    name: `CAM_${Math.floor(Math.random() * 1000)}.jpg`,
    type: 'image',
    status: 'Pending',
    aiScore: Math.floor(Math.random() * 20) + 80, // High scores
    aiReason: "Automated ingest match",
    url: `https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&q=80&w=800&h=1000`, 
    date: new Date().toLocaleDateString()
  }));
};

export function GalleryDashboard() {
  const { galleryAssets, setGalleryAssets, shotList } = useBrandShoot();
  const [activeTab, setActiveTab] = useState<'raw' | 'selects' | 'final'>('selects');
  
  // Initialize with some data if empty
  const [assets, setLocalAssets] = useState<GalleryAsset[]>(galleryAssets.length > 0 ? galleryAssets : []);
  
  // Sync to context when local changes (or direct)
  const setAssets = (newAssets: GalleryAsset[] | ((prev: GalleryAsset[]) => GalleryAsset[])) => {
      if (typeof newAssets === 'function') {
          setLocalAssets(prev => {
              const updated = newAssets(prev);
              setGalleryAssets(updated);
              return updated;
          });
      } else {
          setLocalAssets(newAssets);
          setGalleryAssets(newAssets);
      }
  };

  const [selectedAssetId, setSelectedAssetId] = useState<number | string | null>(null);
  const [isResizeOpen, setIsResizeOpen] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isIngesting, setIsIngesting] = useState(false);

  // --- Simulation Logic ---
  const simulateIngest = () => {
    setIsIngesting(true);
    setTimeout(() => {
        // Create assets
        const newAssets = generateMockAssets(5);
        
        // "Cura" Logic: Match to Shot List
        const matchedAssets = newAssets.map((asset, i) => {
            const shotMatch = shotList.find((s, idx) => idx === i % shotList.length);
            if (shotMatch) {
                return {
                    ...asset,
                    linkedShotId: shotMatch.id,
                    aiReason: `Matched to shot: "${shotMatch.name}" based on visual composition.`
                };
            }
            return asset;
        });

        setAssets(prev => [...matchedAssets, ...prev]);
        setIsIngesting(false);
    }, 2000);
  };

  // Derived State
  const selectedAsset = assets.find(a => a.id === selectedAssetId);
  const currentAssetIndex = assets.findIndex(a => a.id === selectedAssetId);

  // Handlers
  const handleNavigate = (direction: 'prev' | 'next') => {
    if (currentAssetIndex === -1) return;
    if (direction === 'prev' && currentAssetIndex > 0) {
        setSelectedAssetId(assets[currentAssetIndex - 1].id);
    } else if (direction === 'next' && currentAssetIndex < assets.length - 1) {
        setSelectedAssetId(assets[currentAssetIndex + 1].id);
    }
  };

  const handleStatusUpdate = (id: number | string, status: string) => {
    setAssets(prev => prev.map(a => a.id === id ? { ...a, status: status as any } : a));
  };

  // Filter Logic
  const filteredAssets = activeTab === 'raw' 
    ? assets // Show all for RAW
    : activeTab === 'final' 
        ? assets.filter(a => a.status === 'Approved') 
        : assets; // 'selects' shows all for review

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-[#111111] overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100/50">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => window.history.back()} className="-ml-2 hover:bg-black/5 rounded-full">
                    <ArrowLeft className="w-5 h-5 text-gray-400" />
                </Button>
                <div>
                    <h1 className="font-serif text-xl font-medium text-[#111111] mb-0.5">Asset Review</h1>
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                        <span className="bg-gray-100 px-1.5 py-0.5 rounded text-[#111111]">Summer 2025</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span>Nov 02, 2025</span>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="hidden md:flex bg-[#F4F4F5] rounded-full p-1">
                    <button 
                        onClick={() => setActiveTab('raw')}
                        className={`px-5 py-1.5 text-xs font-bold rounded-full transition-all ${activeTab === 'raw' ? 'bg-white text-[#111111] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                        RAW ({assets.length})
                    </button>
                    <button 
                        onClick={() => setActiveTab('selects')}
                        className={`px-5 py-1.5 text-xs font-bold rounded-full transition-all ${activeTab === 'selects' ? 'bg-white text-[#111111] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                        Selects ({assets.length - 20 > 0 ? assets.length - 20 : 0})
                    </button>
                    <button 
                        onClick={() => setActiveTab('final')}
                        className={`px-5 py-1.5 text-xs font-bold rounded-full transition-all ${activeTab === 'final' ? 'bg-white text-[#111111] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                        Final ({assets.filter(a => a.status === 'Approved').length})
                    </button>
                </div>
                
                <div className="flex items-center gap-2">
                    <Button 
                        variant="outline" 
                        className="gap-2 rounded-xl border-gray-200 hover:bg-white hover:text-[#111111] text-gray-600 h-10 px-5 text-xs font-bold" 
                        onClick={simulateIngest} 
                        disabled={isIngesting}
                    >
                        {isIngesting ? <Sparkles className="w-4 h-4 animate-spin text-indigo-500" /> : <Upload className="w-4 h-4" />}
                        <span className="hidden sm:inline">{isIngesting ? "Cura Ingesting..." : "Smart Import"}</span>
                    </Button>
                    <Button className="gap-2 bg-[#111111] text-white hover:bg-black rounded-xl h-10 px-5 shadow-lg shadow-black/5 text-xs font-bold">
                        <Share2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Share Review</span>
                    </Button>
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-8 py-10">

        {/* AI Highlights Section */}
        {activeTab === 'selects' && (
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-[#111111] flex items-center justify-center shadow-lg shadow-black/10">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-[#111111]">Cura's Top Picks</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {assets.filter(a => a.aiScore > 90).slice(0, 3).map(asset => (
                        <div 
                            key={asset.id} 
                            onClick={() => setSelectedAssetId(asset.id)}
                            className="group relative aspect-[4/5] rounded-[24px] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 border border-gray-100 hover:scale-[1.01]"
                        >
                            <img src={asset.url} alt={asset.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 border border-white/20 transform translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                 <div className="relative w-4 h-4 flex items-center justify-center">
                                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                        <path className="text-gray-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                                        <path className="text-[#111111]" strokeDasharray={`${asset.aiScore}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                                    </svg>
                                 </div>
                                 <span className="text-[10px] font-bold text-[#111111]">{asset.aiScore}% Match</span>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-white text-sm font-medium mb-1">Recommended for: Social</p>
                                        <p className="text-white/60 text-xs line-clamp-1">{asset.aiReason}</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-white text-[#111111] flex items-center justify-center hover:scale-110 transition-transform">
                                        <Maximize2 className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {filteredAssets.map((asset) => (
                <div 
                    key={asset.id} 
                    className={`group relative rounded-[20px] overflow-hidden bg-white shadow-sm border transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/40 cursor-pointer hover:-translate-y-1
                        ${asset.status === 'Approved' ? 'border-[#111111] ring-1 ring-[#111111]' : 
                          asset.status === 'Rejected' ? 'opacity-50 border-gray-100 grayscale' : 'border-gray-100 hover:border-gray-200'}
                    `}
                    onClick={() => setSelectedAssetId(asset.id)}
                >
                    <div className="aspect-[4/5] relative bg-gray-50">
                        <img loading="lazy" src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                        
                        {/* Status Overlay */}
                        <div className="absolute top-2 right-2 flex gap-1 z-10">
                            {asset.status === 'Approved' && <div className="bg-[#111111] text-white p-1 rounded-full shadow-lg"><CheckCircle2 className="w-3 h-3" /></div>}
                            {asset.status === 'Rejected' && <div className="bg-red-500 text-white p-1 rounded-full shadow-lg"><XCircle className="w-3 h-3" /></div>}
                        </div>

                        {/* Linked Shot Badge */}
                        {asset.linkedShotId && (
                            <div className="absolute bottom-2 left-2 right-2 z-10">
                                <div className="bg-black/40 backdrop-blur-md text-white text-[9px] px-2 py-1 rounded-lg flex items-center gap-1.5 truncate border border-white/10">
                                    <Sparkles className="w-2.5 h-2.5 text-white/80 shrink-0" />
                                    <span className="truncate font-medium opacity-90">
                                        {shotList.find(s => s.id === asset.linkedShotId)?.name}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Hover Actions */}
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[1px]">
                            {/* <Button size="sm" className="h-8 px-3 text-[10px] bg-white text-black hover:bg-gray-100 rounded-full font-bold shadow-xl">Inspect</Button> */}
                        </div>
                    </div>
                    
                    <div className="p-3 bg-white">
                        <div className="flex justify-between items-center mb-0.5">
                            <p className="text-[11px] font-bold text-[#111111] truncate max-w-[80px]">{asset.name}</p>
                            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{asset.type}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 font-medium">{asset.date}</p>
                    </div>
                </div>
            ))}
        </div>

      </div>

      {/* --- LIGHTBOX MODAL (Premium) --- */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111111]/98 animate-in fade-in duration-300 backdrop-blur-sm">
            
            {/* Close Button */}
            <button 
                onClick={() => setSelectedAssetId(null)}
                className="absolute top-6 right-6 z-50 p-3 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
                <XCircle className="w-8 h-8" />
            </button>

            {/* Navigation Buttons */}
            <button 
                onClick={(e) => { e.stopPropagation(); handleNavigate('prev'); }}
                className="absolute left-6 z-50 p-4 text-white/30 hover:text-white hover:bg-white/5 rounded-full transition-colors disabled:opacity-0 hidden md:flex items-center justify-center"
                disabled={currentAssetIndex === 0}
            >
                <ChevronLeft className="w-10 h-10" />
            </button>
            <button 
                onClick={(e) => { e.stopPropagation(); handleNavigate('next'); }}
                className="absolute right-6 z-50 p-4 text-white/30 hover:text-white hover:bg-white/5 rounded-full transition-colors disabled:opacity-0 hidden md:flex items-center justify-center"
                disabled={currentAssetIndex === assets.length - 1}
            >
                <ChevronRight className="w-10 h-10" />
            </button>

            {/* Content Container */}
            <div className="w-full h-full flex flex-col md:flex-row max-w-[1800px] mx-auto p-4 md:p-12 gap-8 md:gap-16">
                
                {/* Image Area */}
                <div className="flex-1 flex items-center justify-center relative min-h-0">
                    <img 
                        src={selectedAsset.url} 
                        alt={selectedAsset.name} 
                        className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
                    />
                </div>

                {/* Sidebar Controls */}
                <div className="w-full md:w-[400px] bg-[#1a1a1a] border border-white/5 rounded-[32px] p-8 flex flex-col text-white shrink-0 h-fit shadow-2xl md:max-h-full overflow-y-auto">
                    
                    <div className="mb-8 border-b border-white/10 pb-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/5">
                                <ImageIcon className="w-5 h-5 text-gray-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-serif font-medium text-white leading-none mb-1">{selectedAsset.name}</h2>
                                <p className="text-xs text-gray-500 font-medium">{selectedAsset.date}</p>
                            </div>
                        </div>
                    </div>

                    {/* AI Insight */}
                    <div className="mb-8 p-6 bg-[#111111] border border-white/5 rounded-[24px] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-600/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        
                        <div className="flex items-center gap-2 mb-3 text-indigo-400 relative z-10">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Cura Analysis</span>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed mb-6 relative z-10">
                            {selectedAsset.aiReason}
                        </p>
                        
                        <div className="relative z-10">
                            <div className="flex justify-between text-xs text-gray-400 mb-2 font-bold uppercase tracking-wide">
                                <span>Match Score</span>
                                <span>{selectedAsset.aiScore}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${selectedAsset.aiScore}%` }} />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-3 mb-8">
                        <Button 
                            onClick={() => handleStatusUpdate(selectedAsset.id, 'Approved')}
                            className={`h-14 rounded-xl text-sm font-bold transition-all ${selectedAsset.status === 'Approved' ? 'bg-white text-black hover:bg-gray-100' : 'bg-[#222] hover:bg-[#333] text-gray-300'}`}
                        >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Approve
                        </Button>
                        <Button 
                            onClick={() => handleStatusUpdate(selectedAsset.id, 'Rejected')}
                            className={`h-14 rounded-xl text-sm font-bold transition-all ${selectedAsset.status === 'Rejected' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-[#222] hover:bg-[#333] text-gray-300'}`}
                        >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                        </Button>
                    </div>

                    <div className="space-y-3">
                         <Button 
                            variant="outline" 
                            className="w-full h-14 border-white/10 hover:bg-white/5 text-gray-300 justify-start rounded-xl text-sm font-medium hover:text-white transition-colors"
                            onClick={() => setIsResizeOpen(true)}
                        >
                            <Crop className="w-4 h-4 mr-3" />
                            AI Crop & Resize
                         </Button>
                         <Button variant="outline" className="w-full h-14 border-white/10 hover:bg-white/5 text-gray-300 justify-start rounded-xl text-sm font-medium hover:text-white transition-colors">
                            <Download className="w-4 h-4 mr-3" />
                            Download Original
                         </Button>
                    </div>

                </div>
            </div>
        </div>
      )}

      {/* --- AI RESIZE DRAWER (Inside/Outside Lightbox) --- */}
      <Sheet open={isResizeOpen} onOpenChange={setIsResizeOpen}>
        <SheetContent className="sm:max-w-lg z-[60] bg-white border-l border-gray-100 p-0">
          <div className="p-8 h-full flex flex-col">
            <SheetHeader className="mb-8">
                <div className="flex items-center gap-2 text-[#111111] mb-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">Multi-Format Export</span>
                </div>
                <SheetTitle className="font-serif text-3xl text-[#111111]">AI Crop & Resize</SheetTitle>
                <SheetDescription className="text-base text-gray-500">
                Automatically generate optimized formats for social media.
                </SheetDescription>
            </SheetHeader>

            {selectedAsset && (
                <div className="space-y-8 flex-1 overflow-y-auto">
                {/* Preview */}
                <div className="aspect-[4/5] w-full bg-gray-50 rounded-[24px] overflow-hidden relative border border-gray-100">
                    <img src={selectedAsset.url} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 border-2 border-indigo-500/50 rounded-[24px] pointer-events-none"></div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-md font-medium">
                        Original (4:5)
                    </div>
                </div>

                {/* Generation Options */}
                <div className="grid grid-cols-3 gap-4">
                    {['9:16 Story', '1:1 Square', '16:9 Landscape'].map((format, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-2xl p-4 text-center hover:border-[#111111] hover:shadow-lg transition-all cursor-pointer group">
                        <div className={`w-10 h-10 bg-gray-50 rounded-lg mx-auto mb-3 border border-gray-100 flex items-center justify-center group-hover:bg-[#111111] group-hover:text-white transition-colors ${
                            i === 0 ? 'aspect-[9/16]' : i === 1 ? 'aspect-square' : 'aspect-video'
                        }`}>
                            <Crop className="w-4 h-4 text-gray-400 group-hover:text-white" />
                        </div>
                        <div className="text-xs font-bold text-gray-900">{format}</div>
                    </div>
                    ))}
                </div>

                <div className="pt-6 border-t border-gray-100 mt-auto">
                    <Button 
                    onClick={() => {
                        setIsResizing(true);
                        setTimeout(() => {
                            setIsResizing(false);
                            setIsResizeOpen(false);
                        }, 2000);
                    }}
                    className="w-full h-14 bg-[#111111] hover:bg-black text-white rounded-xl text-base font-bold shadow-xl shadow-black/10"
                    disabled={isResizing}
                    >
                        {isResizing ? (
                            <>
                                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                                Generating Formats...
                            </>
                        ) : (
                            <>Generate & Download All</>
                        )}
                    </Button>
                </div>
                </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

    </div>
  );
}
