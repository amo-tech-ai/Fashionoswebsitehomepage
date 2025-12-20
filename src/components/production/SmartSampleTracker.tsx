import React, { useState, useMemo } from 'react';
import { 
  Scan, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Package, 
  Truck, 
  MapPin, 
  X,
  ChevronRight,
  MoreVertical,
  ArrowRight,
  Sparkles,
  Camera,
  RotateCcw,
  Box,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useBrandShoot, SampleItem } from '../../context/BrandShootContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

// --- Extended Types for Logistics ---
interface LogisticsSample extends SampleItem {
  eta?: string;
  risk?: 'High' | 'Medium' | 'None';
  location?: string;
  assignedShots?: string[];
}

const STATUS_COLUMNS = [
  { id: 'awaiting', label: 'Requested', color: 'bg-gray-100 text-gray-600', icon: Clock },
  { id: 'shipped', label: 'Shipped', color: 'bg-blue-50 text-blue-600', icon: Truck },
  { id: 'received', label: 'Received', color: 'bg-emerald-50 text-emerald-600', icon: Package },
  { id: 'on_set', label: 'On Set', color: 'bg-purple-50 text-purple-600', icon: Camera },
  { id: 'returned', label: 'Returned', color: 'bg-stone-100 text-stone-500', icon: RotateCcw },
];

export function SmartSampleTracker({ onBack }: { onBack?: () => void }) {
  const { sampleList, setSampleList } = useBrandShoot();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Hydrate context data with logistics mock fields
  const logisticsData: LogisticsSample[] = useMemo(() => {
    return sampleList.map(item => ({
      ...item,
      eta: item.status === 'awaiting' ? 'Tomorrow 10:00' : 'Arrived',
      risk: item.status === 'awaiting' && item.isHero ? 'High' : 'None',
      location: item.status === 'on_set' ? 'Studio A' : item.status === 'received' ? 'Prep Room' : 'Transit',
      assignedShots: ['Shot 4', 'Shot 12']
    }));
  }, [sampleList]);

  const selectedSample = logisticsData.find(s => s.id === selectedId);
  const highRiskCount = logisticsData.filter(s => s.risk === 'High').length;

  const handleStatusChange = (id: string, newStatus: SampleItem['status']) => {
    setSampleList(sampleList.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
  };

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      // Find a non-on-set item to "scan"
      const target = logisticsData.find(s => s.status !== 'on_set' && s.status !== 'returned');
      if (target) {
        handleStatusChange(target.id, 'on_set');
        setSelectedId(target.id);
      }
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] font-sans text-[#111111] overflow-hidden flex flex-col">
      
      {/* --- Top Header --- */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
           <div>
             <h1 className="font-serif text-xl font-bold text-[#111111]">Smart Sample Tracker</h1>
             <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="bg-[#111111] text-white border-0 text-[10px] uppercase tracking-wider px-2">
                    Shoot Day Live
                </Badge>
                <span className="text-xs text-gray-500 font-medium">Logistics • {logisticsData.length} SKUs</span>
             </div>
           </div>
        </div>

        <div className="flex items-center gap-3">
           <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search SKU..." 
                className="pl-9 pr-4 py-2 bg-gray-50 border-transparent rounded-full text-sm focus:bg-white focus:ring-1 focus:ring-[#111111] transition-all w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>
           <Button variant="outline" className="gap-2 border-gray-200">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filter</span>
           </Button>
           <Button 
             onClick={simulateScan}
             className="bg-[#111111] text-white hover:bg-black gap-2 shadow-lg shadow-black/10"
           >
             <Scan className="w-4 h-4" />
             Scan Check-In
           </Button>
        </div>
      </div>

      {/* --- Main Content Grid --- */}
      <div className="flex-1 overflow-hidden flex">
        
        {/* LEFT ZONE: Status Pipeline (Kanban) */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden bg-[#FDFBF9] p-6">
           <div className="flex gap-6 h-full min-w-max">
              {STATUS_COLUMNS.map(column => {
                  const items = logisticsData.filter(item => {
                      if (column.id === 'shipped') return item.status === 'awaiting' && !item.isHero; // Mock logic for demo
                      if (column.id === 'awaiting') return item.status === 'awaiting' && item.isHero; 
                      return item.status === column.id;
                  });

                  return (
                      <div key={column.id} className="w-[320px] flex flex-col h-full">
                          {/* Column Header */}
                          <div className="flex items-center justify-between mb-4 px-1">
                              <div className="flex items-center gap-2">
                                  <div className={`p-1.5 rounded-md ${column.color}`}>
                                      <column.icon className="w-4 h-4" />
                                  </div>
                                  <span className="font-bold text-sm text-gray-900 uppercase tracking-wide">{column.label}</span>
                              </div>
                              <Badge variant="secondary" className="bg-white border border-gray-200 text-gray-500 font-mono">
                                  {items.length}
                              </Badge>
                          </div>

                          {/* Drop Zone / List */}
                          <div className="flex-1 bg-gray-100/50 rounded-2xl border border-gray-200/50 p-3 overflow-y-auto space-y-3">
                              {items.map(item => (
                                  <motion.div
                                      layoutId={item.id}
                                      key={item.id}
                                      onClick={() => setSelectedId(item.id)}
                                      className={`
                                          relative bg-white p-3 rounded-xl border shadow-sm cursor-pointer hover:shadow-md transition-all group
                                          ${selectedId === item.id ? 'ring-2 ring-[#111111] border-transparent' : 'border-gray-100'}
                                          ${item.risk === 'High' ? 'border-amber-200 bg-amber-50/20' : ''}
                                      `}
                                  >
                                      <div className="flex gap-3">
                                          <div className="w-16 h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0 border border-gray-100 relative">
                                              <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                              {item.isHero && (
                                                  <div className="absolute bottom-0 inset-x-0 bg-black/60 p-0.5 text-center backdrop-blur-sm">
                                                      <span className="text-[8px] font-bold text-white uppercase tracking-wider">Hero</span>
                                                  </div>
                                              )}
                                          </div>
                                          <div className="flex-1 min-w-0">
                                              <div className="flex justify-between items-start mb-1">
                                                  <span className="text-[10px] font-mono text-gray-400">{item.sku}</span>
                                                  {item.risk === 'High' && (
                                                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                                                  )}
                                              </div>
                                              <h4 className="font-serif text-sm font-medium text-gray-900 leading-tight mb-2 truncate">{item.name}</h4>
                                              <div className="flex flex-wrap gap-1">
                                                  <Badge variant="outline" className="text-[9px] h-5 px-1.5 bg-gray-50 border-gray-100 text-gray-500">
                                                      {item.variant}
                                                  </Badge>
                                              </div>
                                          </div>
                                      </div>
                                  </motion.div>
                              ))}
                              {items.length === 0 && (
                                  <div className="h-24 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-xl text-gray-300 text-xs font-medium">
                                      No Items
                                  </div>
                              )}
                          </div>
                      </div>
                  );
              })}
           </div>
        </div>

        {/* RIGHT ZONE: Sidebar (Contextual) */}
        <div className="w-[400px] border-l border-gray-200 bg-white flex flex-col shadow-xl z-20">
            
            {/* AI Logistics Monitor (Always Visible at Bottom or Top?) -> Let's put it Top if no selection, or Bottom if selection */}
            {/* Actually, let's make it a dedicated section */}
            
            {selectedSample ? (
                <div className="flex-1 flex flex-col h-full">
                    {/* Sample Detail Header */}
                    <div className="p-6 border-b border-gray-100 flex items-start justify-between bg-gray-50/30">
                        <div>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedId(null)} className="h-8 -ml-2 text-gray-500 mb-2">
                                <ArrowRight className="w-4 h-4 mr-1 rotate-180" /> Back to Monitor
                            </Button>
                            <h2 className="font-serif text-2xl text-[#111111]">{selectedSample.name}</h2>
                            <p className="text-sm text-gray-500 font-mono mt-1">{selectedSample.sku}</p>
                        </div>
                        <Badge className={`
                            ${selectedSample.risk === 'High' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}
                            border-0 px-3 py-1
                        `}>
                            {selectedSample.risk === 'High' ? 'Risk Alert' : 'On Track'}
                        </Badge>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                        {/* Main Image */}
                        <div className="aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative group">
                            <ImageWithFallback src={selectedSample.image} alt={selectedSample.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Button variant="secondary" className="gap-2">
                                    <Scan className="w-4 h-4" /> Re-Scan
                                </Button>
                            </div>
                        </div>

                        {/* Metadata Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Size/Variant</span>
                                <p className="text-sm font-medium text-gray-900 mt-1">{selectedSample.variant}</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Location</span>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                    <p className="text-sm font-medium text-gray-900">{selectedSample.location}</p>
                                </div>
                            </div>
                        </div>

                        {/* Timeline / Assigned Shots */}
                        <div>
                            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Assigned Usage</h3>
                            <div className="space-y-2">
                                {selectedSample.assignedShots?.map((shot, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:border-gray-300 transition-colors cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                                                <Camera className="w-4 h-4 text-gray-400" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-700">{shot}</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-300" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* AI Alert Box */}
                        {selectedSample.risk === 'High' && (
                            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3">
                                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                                <div>
                                    <h4 className="text-sm font-bold text-amber-800 mb-1">Logistics Risk</h4>
                                    <p className="text-xs text-amber-700 leading-relaxed">
                                        This item is assigned to Shot 4 (Tomorrow 9AM) but has not yet been scanned at the studio.
                                    </p>
                                    <Button size="sm" className="mt-3 bg-amber-600 hover:bg-amber-700 text-white border-0 h-8 text-xs">
                                        Contact Courier
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Footer */}
                    <div className="p-4 border-t border-gray-200 bg-white">
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" className="w-full">Flag Issue</Button>
                            <Button 
                                className="w-full bg-[#111111] hover:bg-black text-white"
                                onClick={() => handleStatusChange(selectedSample.id, 'received')}
                            >
                                Mark Received
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 p-6 flex flex-col">
                    <div className="mb-8">
                        <div className="w-12 h-12 bg-[#111111] rounded-xl flex items-center justify-center text-white mb-4 shadow-lg shadow-black/20">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <h2 className="font-serif text-2xl text-gray-900 mb-2">AI Logistics</h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Cura is monitoring your inventory in real-time against the shoot schedule.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <span className="block text-2xl font-serif text-[#111111] mb-1">{logisticsData.length}</span>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total SKUs</span>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <span className="block text-2xl font-serif text-[#111111] mb-1">{Math.round((logisticsData.filter(s => s.status === 'on_set' || s.status === 'shot').length / logisticsData.length) * 100)}%</span>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Readiness</span>
                        </div>
                    </div>

                    {/* Insights List */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Live Insights</h3>
                        
                        {highRiskCount > 0 ? (
                            <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                    <span className="text-sm font-bold text-amber-800">{highRiskCount} Samples at Risk</span>
                                </div>
                                <p className="text-xs text-amber-700 mb-3">
                                    High priority items for tomorrow's first look have not arrived.
                                </p>
                                <Button size="sm" className="w-full bg-white border border-amber-200 text-amber-800 hover:bg-amber-100">
                                    View Delayed Items
                                </Button>
                            </div>
                        ) : (
                            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                <span className="text-sm font-medium text-emerald-800">All samples on track</span>
                            </div>
                        )}

                        <div className="p-4 border border-gray-100 rounded-2xl hover:border-gray-200 transition-colors cursor-pointer group">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-sm font-bold text-gray-900">Optimization</span>
                                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#111111] transition-colors" />
                            </div>
                            <p className="text-xs text-gray-500">
                                Batching "Accessories" shots could save 45 mins of setup time.
                            </p>
                        </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-gray-100 text-center">
                        <p className="text-[10px] text-gray-400 font-mono">Last synced: Just now</p>
                    </div>
                </div>
            )}
        </div>

      </div>

      {/* --- Scan Overlay --- */}
      <AnimatePresence>
        {isScanning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#111111] flex flex-col items-center justify-center"
          >
             <div className="w-full max-w-md px-6 relative">
                <div className="aspect-[3/4] bg-gray-900 rounded-[32px] overflow-hidden relative border border-white/20 shadow-2xl">
                    {/* Camera Feed Simulation */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-50" />
                    
                    {/* Scanner UI */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="w-64 h-64 border-2 border-white/30 rounded-3xl relative">
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-xl" />
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-xl" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-xl" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-xl" />
                            
                            <motion.div 
                                animate={{ top: ['0%', '100%', '0%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute left-2 right-2 h-0.5 bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)]"
                            />
                        </div>
                        <p className="text-white font-mono text-xs mt-8 tracking-widest uppercase animate-pulse">Searching for Tag...</p>
                    </div>
                </div>

                <div className="mt-8 text-center space-y-4">
                    <h3 className="text-2xl text-white font-serif">Scan Sample Tag</h3>
                    <p className="text-gray-400 text-sm">Align the QR code within the frame to check in.</p>
                    <Button 
                        variant="outline" 
                        className="border-white/20 text-white hover:bg-white/10 rounded-full px-8"
                        onClick={() => setIsScanning(false)}
                    >
                        Cancel
                    </Button>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
