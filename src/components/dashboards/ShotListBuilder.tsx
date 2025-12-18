import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Image as ImageIcon, 
  Video, 
  Sparkles, 
  ChevronRight, 
  Trash2,
  Camera,
  ArrowLeft
} from 'lucide-react';
import { motion } from 'motion/react';

import { useBrandShoot, ShotItem } from '../../context/BrandShootContext';

export function ShotListBuilder({ onBack }: { onBack?: () => void }) {
  const { shotList, setShotList, updateChecklist, sampleList } = useBrandShoot();
  const [activeProduct, setActiveProduct] = useState<number | null>(null);

  // Sync checklist when shots exist
  React.useEffect(() => {
    if (shotList.length > 0) {
      updateChecklist('shotListLocked', true);
    } else {
      updateChecklist('shotListLocked', false);
    }
  }, [shotList.length]);

  // Cura Intelligence: Find samples not yet in shot list
  const unplannedSamples = sampleList.filter(sample => 
    !shotList.some(shot => shot.name.includes(sample.name) || shot.notes.includes(sample.name))
  );

  const products = [
    { id: 1, name: "Glow Serum", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=100&h=100" },
    { id: 2, name: "Silk Scarf", image: "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa3e?auto=format&fit=crop&q=80&w=100&h=100" },
    { id: 3, name: "Leather Tote", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=100&h=100" },
  ];

  // Helper to add new shot
  const addNewShot = () => {
    const newShot: ShotItem = {
        id: Date.now(),
        name: "New Planned Shot",
        type: "Photo",
        notes: "Add notes here...",
        scene: "Studio",
        talent: "TBD",
        status: "Planned",
        price: 200,
        image: null
    };
    setShotList([...shotList, newShot]);
  };

  const totalPrice = shotList.reduce((sum, shot) => sum + shot.price, 0);

  return (
    <div className="min-h-screen bg-[#F8F5F1] flex font-sans">
      
      {/* Products Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0 hidden lg:flex">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-serif font-medium text-gray-900 mb-4">Products</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {products.map((product) => (
            <div 
              key={product.id}
              onClick={() => setActiveProduct(product.id)}
              className={`p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-all ${
                activeProduct === product.id ? 'bg-gray-900 text-white shadow-md' : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover bg-white" />
              <span className="text-sm font-medium">{product.name}</span>
              {activeProduct === product.id && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
            </div>
          ))}
          
          <button className="w-full py-3 border border-dashed border-gray-300 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-400 transition-colors flex items-center justify-center gap-2 mt-4">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="flex justify-between items-end mb-10">
            <div>
              {onBack && (
                <button 
                  onClick={onBack}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-4 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm font-medium">Back to Timeline</span>
                </button>
              )}
              <h1 className="text-4xl font-serif text-gray-900 mb-2">Shot List Builder</h1>
              <p className="text-gray-500">Plan your creative direction and deliverables.</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Estimated Total</p>
              <p className="text-3xl font-serif font-medium text-gray-900">${totalPrice}</p>
            </div>
          </div>

          {/* AI Suggestion Bar */}
          {unplannedSamples.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 rounded-xl shadow-lg mb-8 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                   <p className="text-sm font-medium">Cura Suggestion: You have {unplannedSamples.length} samples without planned shots.</p>
                   <p className="text-xs text-gray-300">Try adding a shot for "{unplannedSamples[0].name}"</p>
                </div>
              </div>
              <button 
                onClick={() => {
                   const newShot: ShotItem = {
                      id: Date.now(),
                      name: `Hero Shot: ${unplannedSamples[0].name}`,
                      type: "Photo",
                      notes: `Focus on texture of ${unplannedSamples[0].name}.`,
                      scene: "Studio",
                      talent: "None",
                      status: "Planned",
                      price: 250,
                      image: unplannedSamples[0].image
                   };
                   setShotList([...shotList, newShot]);
                }}
                className="px-4 py-1.5 bg-white text-gray-900 text-xs font-bold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Add {unplannedSamples[0].name} Shot
              </button>
            </motion.div>
          )}

          {unplannedSamples.length === 0 && (
             <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 rounded-xl shadow-lg mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm font-medium">All samples are covered! Recommendation: Add +1 Lifestyle Shot for Reels.</p>
                </div>
                <button className="px-4 py-1.5 bg-white text-gray-900 text-xs font-bold rounded-lg hover:bg-gray-100 transition-colors">
                  Apply Suggestion
                </button>
              </div>
          )}

          {/* Shot List */}
          <div className="space-y-6">
            {shotList.map((shot) => (
              <motion.div 
                key={shot.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all relative group"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Thumbnail */}
                  <div className="w-full md:w-48 h-32 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 overflow-hidden shrink-0">
                    {shot.image ? (
                      <img src={shot.image} alt={shot.name} className="w-full h-full object-cover" />
                    ) : (
                      shot.type === 'Photo' ? <ImageIcon className="w-8 h-8" /> : <Video className="w-8 h-8" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-medium text-gray-900">{shot.name}</h3>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                          {shot.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full border ${
                          shot.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-100' :
                          shot.status === 'Shooting' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                          'bg-gray-50 text-gray-500 border-gray-200'
                        }`}>
                          {shot.status}
                        </span>
                        <button 
                            onClick={() => {
                                const newShots = shotList.filter(s => s.id !== shot.id);
                                setShotList(newShots);
                                if(newShots.length === 0) updateChecklist('shotListLocked', false);
                            }}
                            className="p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{shot.notes}</p>

                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                      <div className="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                        <span className="font-bold text-gray-700">Scene:</span> {shot.scene}
                      </div>
                      <div className="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                        <span className="font-bold text-gray-700">Talent:</span> {shot.talent}
                      </div>
                      <div className="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 ml-auto">
                        <span className="font-bold text-gray-900">${shot.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <button 
                onClick={addNewShot}
                className="w-full py-6 border-2 border-dashed border-gray-300 rounded-2xl text-gray-400 hover:border-gray-900 hover:text-gray-900 transition-all flex flex-col items-center justify-center gap-2 group"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-colors">
                <Plus className="w-5 h-5" />
              </div>
              <span className="font-medium">Add New Shot</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
