import React, { useState, useEffect } from 'react';
import { 
  QrCode, 
  Camera, 
  CheckCircle2, 
  Box, 
  ArrowLeft, 
  AlertTriangle, 
  Scan,
  Shirt,
  MoreVertical,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface SampleItem {
  id: string;
  name: string;
  sku: string;
  variant: string;
  image: string;
  status: 'awaiting' | 'on_set' | 'shot' | 'returned';
  isHero: boolean;
  priority: number;
}

import { useBrandShoot } from '../../context/BrandShootContext';

export function SmartSampleTracker({ onBack }: { onBack?: () => void }) {
  const { sampleList, setSampleList, updateChecklist } = useBrandShoot();
  const [isScanning, setIsScanning] = useState(false);
  
  // Use context state directly
  const samples = sampleList;
  
  // Sync checklist based on sample status
  useEffect(() => {
    // If we have at least one item on set, we consider the styling breakdown/sample intake active/done
    const hasItemsOnSet = samples.some(s => s.status === 'on_set' || s.status === 'shot');
    if (hasItemsOnSet) {
        updateChecklist('stylingBreakdown', true);
    }
  }, [samples, updateChecklist]);

  const handleStatusChange = (id: string, newStatus: SampleItem['status']) => {
    setSampleList(samples.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
  };

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      // Simulate finding a random pending item
      const pendingItems = samples.filter(s => s.status === 'awaiting' || s.status === 'on_set');
      if (pendingItems.length > 0) {
        handleStatusChange(pendingItems[0].id, 'shot');
      }
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] pb-24 font-sans text-gray-900 relative overflow-hidden">
      
      {/* Top Header */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-gray-100">
        <div className="px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <button onClick={onBack} className="p-2 -ml-2 text-gray-400 hover:text-gray-900">
               <ArrowLeft className="w-5 h-5" />
             </button>
             <div>
               <h1 className="font-serif text-lg font-medium leading-none mb-1">FW24 Campaign</h1>
               <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">Oct 24 • Day 2 of 3</p>
             </div>
          </div>
          <button 
            onClick={simulateScan}
            className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform"
          >
            <Scan className="w-5 h-5" />
          </button>
        </div>

        {/* Status Bar */}
        <div className="px-5 pb-4 flex items-center justify-between text-center divide-x divide-gray-100">
          <div className="flex-1">
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Total</div>
            <div className="text-lg font-serif font-medium">{stats.total}</div>
          </div>
          <div className="flex-1">
            <div className="text-xs text-green-600 uppercase tracking-wider mb-0.5 font-medium">Shot</div>
            <div className="text-lg font-serif font-medium text-green-700">{stats.shot}</div>
          </div>
          <div className="flex-1">
            <div className="text-xs text-amber-600 uppercase tracking-wider mb-0.5 font-medium">Pending</div>
            <div className="text-lg font-serif font-medium text-amber-700">{stats.pending}</div>
          </div>
          <div className="flex-1">
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Returned</div>
            <div className="text-lg font-serif font-medium text-gray-500">{stats.returned}</div>
          </div>
        </div>
      </div>

      {/* Main List */}
      <div className="p-5 space-y-4">
        <AnimatePresence>
          {samples.map((item) => (
            <SampleCard 
              key={item.id} 
              item={item} 
              onMarkShot={() => handleStatusChange(item.id, 'shot')}
              onReturn={() => handleStatusChange(item.id, 'returned')}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Sticky Warning Footer */}
      <AnimatePresence>
        {pendingHeroes > 0 && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-red-100 p-4 pb-8 z-40 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]"
          >
            <div className="max-w-md mx-auto flex items-start gap-3">
              <div className="p-2 bg-red-50 text-red-600 rounded-full shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900 mb-0.5">Critical Items Pending</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  You have <span className="font-bold text-gray-900">{pendingHeroes} Hero items</span> remaining. 
                  AI suggests prioritizing "Silk Pleated Trousers" next for optimal lighting match.
                </p>
              </div>
              <Button size="sm" variant="outline" className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800 text-xs h-8">
                View List
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Simulated Scanner Overlay */}
      <AnimatePresence>
        {isScanning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6"
          >
            <div className="w-full max-w-sm aspect-[3/4] border-2 border-white/30 rounded-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
              
              {/* Scanning Laser */}
              <motion.div 
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-0.5 bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.8)]"
              />
              
              <div className="absolute bottom-8 left-0 right-0 text-center">
                 <p className="text-white font-medium mb-2">Scanning Barcode...</p>
                 <p className="text-white/50 text-xs">Point camera at SKU tag</p>
              </div>
            </div>
            <button 
              onClick={() => setIsScanning(false)}
              className="mt-8 text-white/70 text-sm hover:text-white"
            >
              Cancel
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

function SampleCard({ item, onMarkShot, onReturn }: { item: SampleItem, onMarkShot: () => void, onReturn: () => void }) {
  const isShot = item.status === 'shot';
  
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        backgroundColor: isShot ? '#F0FDF4' : '#FFFFFF',
        borderColor: isShot ? '#DCFCE7' : '#F3F4F6'
      }}
      className={`
        relative p-3 rounded-2xl border shadow-sm flex items-start gap-4 overflow-hidden
        ${isShot ? 'shadow-none' : 'hover:shadow-md transition-shadow'}
      `}
    >
      {/* Background Pulse Animation on Success */}
      {isShot && (
        <motion.div 
          initial={{ opacity: 0.5, scale: 0.8 }}
          animate={{ opacity: 0, scale: 1.5 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-green-100 z-0"
        />
      )}

      {/* Image */}
      <div className="w-20 h-24 bg-gray-100 rounded-xl shrink-0 overflow-hidden relative z-10">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        {item.isHero && (
           <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent p-1">
             <div className="flex items-center gap-1 justify-center">
               <span className="text-[9px] font-bold text-white uppercase tracking-wider">Hero Item</span>
             </div>
           </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 py-1 relative z-10">
        <div className="flex justify-between items-start mb-1">
          <Badge variant="outline" className={`
            text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border-0
            ${item.status === 'shot' ? 'bg-green-100 text-green-700' : 
              item.status === 'on_set' ? 'bg-indigo-100 text-indigo-700' :
              item.status === 'returned' ? 'bg-gray-100 text-gray-500' :
              'bg-amber-100 text-amber-700'}
          `}>
            {item.status.replace('_', ' ')}
          </Badge>
          <button className="text-gray-300 hover:text-gray-600">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
        
        <h3 className="font-serif text-base font-medium text-gray-900 truncate pr-4">{item.name}</h3>
        <p className="text-xs text-gray-500 mb-0.5">{item.sku}</p>
        <p className="text-xs text-gray-400 mb-3">{item.variant}</p>

        {/* Actions */}
        <div className="flex items-center gap-2">
           {item.status === 'shot' ? (
             <div className="flex items-center gap-1.5 text-xs font-medium text-green-700 bg-white/50 px-2 py-1.5 rounded-lg border border-green-200">
               <CheckCircle2 className="w-3.5 h-3.5" />
               Captured 10:42 AM
               <button onClick={onReturn} className="ml-2 pl-2 border-l border-green-200 hover:text-green-900 text-[10px] uppercase font-bold">
                  Return
               </button>
             </div>
           ) : (
             <>
               <Button 
                 size="sm" 
                 onClick={onMarkShot}
                 className="h-8 bg-gray-900 hover:bg-black text-white text-xs px-3 rounded-lg flex-1"
               >
                 Mark Shot
               </Button>
               <Button 
                 size="sm" 
                 variant="outline"
                 className="h-8 w-8 p-0 rounded-lg border-gray-200 text-gray-500"
               >
                 <QrCode className="w-4 h-4" />
               </Button>
             </>
           )}
        </div>
      </div>
    </motion.div>
  );
}