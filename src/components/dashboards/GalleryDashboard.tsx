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
  Maximize2
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
    url: `https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&q=80&w=800&h=1000`, // Fake URL structure, will be replaced by fallback
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
        // We iterate through new assets and try to assign them to a planned shot
        const unplannedShots = shotList.filter(s => s.status !== 'Completed');
        
        const matchedAssets = newAssets.map((asset, i) => {
            const shotMatch = unplannedShots[i % unplannedShots.length]; // Simple round-robin match
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
    <div className="min-h-screen bg-[#F8F5F1] font-sans text-[#111111]">
      
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
                    <ArrowLeft className="w-5 h-5 text-gray-500" />
                </Button>
                <div>
                    <h1 className="font-serif text-xl font-medium text-gray-900">Asset Review</h1>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>Summer 2025 Campaign</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span>Nov 02, 2025</span>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center gap-3">
                <div className="hidden md:flex bg-gray-100 rounded-lg p-1">
                    <button 
                        onClick={() => setActiveTab('raw')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === 'raw' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        RAW (142)
                    </button>
                    <button 
                        onClick={() => setActiveTab('selects')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === 'selects' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Selects (45)
                    </button>
                    <button 
                        onClick={() => setActiveTab('final')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === 'final' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Final (12)
                    </button>
                </div>
                <div className="w-px h-8 bg-gray-200 mx-2 hidden md:block" />
                <Button variant="outline" className="gap-2" onClick={simulateIngest} disabled={isIngesting}>
                    {isIngesting ? <Sparkles className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    <span className="hidden sm:inline">{isIngesting ? "Ingesting..." : "Simulate Ingest"}</span>
                </Button>
                <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Download All</span>
                </Button>
                <Button className="gap-2 bg-gray-900 text-white hover:bg-black">
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Share Review Link</span>
                </Button>
            </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-8">

        {/* AI Highlights Section */}
        {activeTab === 'selects' && (
            <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-900">Cura's Top Picks</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {assets.filter(a => a.aiScore > 90).slice(0, 3).map(asset => (
                        <div 
                            key={asset.id} 
                            onClick={() => setSelectedAssetId(asset.id)}
                            className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            <img src={asset.url} alt={asset.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform">
                                <div className="flex justify-between items-end">
                                    <Badge className="bg-white/20 backdrop-blur-md text-white border-white/20 hover:bg-white/30">
                                        Match Score: {asset.aiScore}%
                                    </Badge>
                                    <Button size="icon" variant="secondary" className="rounded-full w-8 h-8 bg-white text-black hover:bg-gray-200">
                                        <Maximize2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredAssets.map((asset) => (
                <div 
                    key={asset.id} 
                    className={`group relative rounded-lg overflow-hidden bg-white shadow-sm border transition-all duration-200 hover:shadow-md cursor-pointer
                        ${asset.status === 'Approved' ? 'border-green-200 ring-1 ring-green-100' : 
                          asset.status === 'Rejected' ? 'opacity-60 border-gray-100 grayscale-[0.5]' : 'border-gray-100'}
                    `}
                    onClick={() => setSelectedAssetId(asset.id)}
                >
                    <div className="aspect-[4/5] relative bg-gray-100">
                        <img loading="lazy" src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                        
                        {/* Status Overlay */}
                        <div className="absolute top-2 right-2 flex gap-1">
                            {asset.status === 'Approved' && <div className="bg-green-500 text-white p-1 rounded-full shadow-sm"><CheckCircle2 className="w-3 h-3" /></div>}
                            {asset.status === 'Rejected' && <div className="bg-red-500 text-white p-1 rounded-full shadow-sm"><XCircle className="w-3 h-3" /></div>}
                        </div>

                        {/* Linked Shot Badge */}
                        {asset.linkedShotId && (
                            <div className="absolute bottom-2 left-2 right-2">
                                <div className="bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-md flex items-center gap-1 truncate">
                                    <Sparkles className="w-3 h-3 text-indigo-400 shrink-0" />
                                    <span className="truncate">
                                        Matched: {shotList.find(s => s.id === asset.linkedShotId)?.name}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Hover Actions */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                            <Button size="sm" variant="secondary" className="h-8 px-3 text-xs">Review</Button>
                        </div>
                    </div>
                    
                    <div className="p-3">
                        <div className="flex justify-between items-center">
                            <p className="text-xs font-medium text-gray-900 truncate">{asset.name}</p>
                            <span className="text-[10px] text-gray-400">{asset.type}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>

      </div>

      {/* --- LIGHTBOX MODAL --- */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-200">
            
            {/* Close Button */}
            <button 
                onClick={() => setSelectedAssetId(null)}
                className="absolute top-4 right-4 z-50 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
                <XCircle className="w-8 h-8" />
            </button>

            {/* Navigation Buttons */}
            <button 
                onClick={(e) => { e.stopPropagation(); handleNavigate('prev'); }}
                className="absolute left-4 z-50 p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors disabled:opacity-20"
                disabled={currentAssetIndex === 0}
            >
                <ChevronLeft className="w-8 h-8" />
            </button>
            <button 
                onClick={(e) => { e.stopPropagation(); handleNavigate('next'); }}
                className="absolute right-4 z-50 p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors disabled:opacity-20"
                disabled={currentAssetIndex === assets.length - 1}
            >
                <ChevronRight className="w-8 h-8" />
            </button>

            {/* Content Container */}
            <div className="w-full h-full flex flex-col md:flex-row max-w-[1600px] mx-auto p-4 md:p-8 gap-8">
                
                {/* Image Area */}
                <div className="flex-1 flex items-center justify-center relative">
                    <img 
                        src={selectedAsset.url} 
                        alt={selectedAsset.name} 
                        className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
                    />
                </div>

                {/* Sidebar Controls */}
                <div className="w-full md:w-[320px] bg-[#111] border border-gray-800 rounded-2xl p-6 flex flex-col text-white shrink-0 h-fit">
                    
                    <div className="mb-6">
                        <h2 className="text-lg font-medium mb-1">{selectedAsset.name}</h2>
                        <div className="text-xs text-gray-400 flex justify-between">
                            <span>{selectedAsset.date}</span>
                            <span>{selectedAsset.type.toUpperCase()}</span>
                        </div>
                    </div>

                    {/* AI Insight */}
                    <div className="mb-6 p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-xl">
                        <div className="flex items-center gap-2 mb-2 text-indigo-400">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Cura Insight</span>
                        </div>
                        <p className="text-sm text-indigo-100 leading-relaxed">
                            {selectedAsset.aiReason}
                        </p>
                        {selectedAsset.linkedShotId && (
                            <div className="mt-3 pt-3 border-t border-indigo-500/20">
                                <p className="text-xs text-indigo-300">
                                    Linked to Shot: <span className="text-white font-medium">{shotList.find(s => s.id === selectedAsset.linkedShotId)?.name}</span>
                                </p>
                            </div>
                        )}
                        <div className="mt-3 flex items-center gap-2 text-xs text-indigo-300/80">
                            <div className="h-1 flex-1 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500" style={{ width: `${selectedAsset.aiScore}%` }} />
                            </div>
                            <span>{selectedAsset.aiScore}% Match</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mb-6">
                        <Button 
                            onClick={() => handleStatusUpdate(selectedAsset.id, 'Approved')}
                            className={`flex-1 ${selectedAsset.status === 'Approved' ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-800 hover:bg-green-900/50'}`}
                        >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Approve
                        </Button>
                        <Button 
                            onClick={() => handleStatusUpdate(selectedAsset.id, 'Rejected')}
                            className={`flex-1 ${selectedAsset.status === 'Rejected' ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-800 hover:bg-red-900/50'}`}
                        >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                        </Button>
                    </div>

                    <div className="space-y-3 pt-6 border-t border-gray-800">
                         <Button 
                            variant="outline" 
                            className="w-full border-gray-700 hover:bg-gray-800 text-gray-300 justify-start"
                            onClick={() => setIsResizeOpen(true)}
                        >
                            <Crop className="w-4 h-4 mr-2" />
                            AI Crop & Resize
                         </Button>
                         <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-800 text-gray-300 justify-start">
                            <Download className="w-4 h-4 mr-2" />
                            Download Original
                         </Button>
                    </div>

                </div>
            </div>
        </div>
      )}

      {/* --- AI RESIZE DRAWER (Inside/Outside Lightbox) --- */}
      <Sheet open={isResizeOpen} onOpenChange={setIsResizeOpen}>
        <SheetContent className="sm:max-w-lg z-[60]">
          <SheetHeader className="mb-6">
            <div className="flex items-center gap-2 text-indigo-600 mb-2">
              <Layers className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">Multi-Format Export</span>
            </div>
            <SheetTitle className="font-serif text-3xl">AI Crop & Resize</SheetTitle>
            <SheetDescription>
              Automatically generate social formats for {selectedAsset?.name}.
            </SheetDescription>
          </SheetHeader>

          {selectedAsset && (
            <div className="space-y-8">
               {/* Preview */}
               <div className="aspect-[4/5] w-full bg-gray-100 rounded-xl overflow-hidden relative">
                 <img src={selectedAsset.url} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 border-2 border-indigo-500/50 rounded-xl pointer-events-none"></div>
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md">
                    Original (4:5)
                 </div>
               </div>

               {/* Generation Options */}
               <div className="grid grid-cols-3 gap-4">
                  {['9:16 Story', '1:1 Square', '16:9 Landscape'].map((format, i) => (
                    <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center hover:border-indigo-200 transition-colors cursor-pointer group">
                       <div className={`w-8 h-8 bg-white rounded-lg mx-auto mb-3 border shadow-sm flex items-center justify-center group-hover:border-indigo-500 transition-colors ${
                           i === 0 ? 'aspect-[9/16]' : i === 1 ? 'aspect-square' : 'aspect-video'
                       }`}>
                           <Crop className="w-3 h-3 text-gray-400 group-hover:text-indigo-500" />
                       </div>
                       <div className="text-xs font-medium text-gray-900">{format}</div>
                    </div>
                  ))}
               </div>

               <div className="pt-4 border-t border-gray-100">
                 <Button 
                   onClick={() => {
                       setIsResizing(true);
                       setTimeout(() => {
                           setIsResizing(false);
                           setIsResizeOpen(false);
                       }, 2000);
                   }}
                   className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-base shadow-xl shadow-indigo-600/20"
                   disabled={isResizing}
                 >
                    {isResizing ? (
                        <>Generating Formats...</>
                    ) : (
                        <>Generate & Download All</>
                    )}
                 </Button>
               </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

    </div>
  );
}
