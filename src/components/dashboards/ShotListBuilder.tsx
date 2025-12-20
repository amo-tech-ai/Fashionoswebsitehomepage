import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useBrandShoot, ShotItem } from '../../context/BrandShootContext';

// Sub-components
import { ShotListHeader } from './production/ShotListHeader';
import { ShotCard } from './production/ShotCard';
import { ShotListAI } from './production/ShotListAI';
import { ProductPickerSheet } from './production/ProductPickerSheet';

export function ShotListBuilder({ onBack }: { onBack?: () => void }) {
  const { shotList, setShotList, updateChecklist, sampleList } = useBrandShoot();
  const [isProductSheetOpen, setIsProductSheetOpen] = useState(false);

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
    { id: 1, name: "Glow Serum", category: "Skincare", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=300&h=300" },
    { id: 2, name: "Silk Scarf", category: "Accessories", image: "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa3e?auto=format&fit=crop&q=80&w=300&h=300" },
    { id: 3, name: "Leather Tote", category: "Bags", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=300&h=300" },
  ];

  // Helper to add new shot
  const addNewShot = (product?: any) => {
    const newShot: ShotItem = {
        id: Date.now(),
        name: product ? `Hero Shot: ${product.name}` : "New Planned Shot",
        type: "Photo",
        notes: product ? `Focus on texture of ${product.name}.` : "Add creative direction notes...",
        scene: "Studio",
        talent: "TBD",
        status: "Planned",
        price: 250,
        image: product?.image || null
    };
    setShotList([...shotList, newShot]);
    setIsProductSheetOpen(false);
  };

  const totalPrice = shotList.reduce((sum, shot) => sum + shot.price, 0);
  const totalShots = shotList.length;

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-[#111111] overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* --- Header --- */}
      <ShotListHeader 
        onBack={onBack}
        totalShots={totalShots}
        totalPrice={totalPrice}
        onAddProduct={() => setIsProductSheetOpen(true)}
        onAddShot={() => addNewShot()}
      />

      <div className="max-w-[1600px] mx-auto px-6 md:px-8 py-10">
        
        {/* --- AI Intelligence Bar --- */}
        <ShotListAI 
          unplannedSamples={unplannedSamples}
          onAddShot={addNewShot}
        />

        {/* --- Shot Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {shotList.map((shot, i) => (
                <ShotCard 
                    key={shot.id} 
                    shot={shot} 
                    index={i} 
                    onDelete={() => {
                        const newShots = shotList.filter(s => s.id !== shot.id);
                        setShotList(newShots);
                    }} 
                />
            ))}
            
            {/* Add New Placeholder Card */}
            <button 
                onClick={() => addNewShot()}
                className="group relative min-h-[300px] rounded-[32px] border-2 border-dashed border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all flex flex-col items-center justify-center gap-4 text-center p-8"
            >
                <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-[#111111] group-hover:scale-110 transition-all">
                    <Plus className="w-8 h-8" />
                </div>
                <div>
                    <h3 className="text-lg font-serif text-gray-900 mb-1">Add Shot</h3>
                    <p className="text-sm text-gray-500">Create a new custom setup</p>
                </div>
            </button>
        </div>
      </div>

      {/* --- Product Picker Sheet --- */}
      <ProductPickerSheet 
        isOpen={isProductSheetOpen}
        onOpenChange={setIsProductSheetOpen}
        products={products}
        onSelectProduct={addNewShot}
      />

    </div>
  );
}
