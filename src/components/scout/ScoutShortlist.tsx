import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Check, 
  MapPin, 
  Star, 
  Zap, 
  ShieldCheck, 
  Info,
  ArrowRight,
  Trash2,
  Share2,
  MessageSquare,
  Building,
  Maximize,
  Coins
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useBrandShoot } from '../../context/BrandShootContext';
import { MOCK_LOCATIONS, Location } from './ScoutFinder';
import { toast } from "sonner@2.0.3";

export function ScoutShortlist({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { shortlistedLocations, setShortlistedLocations, confirmedLocation, setConfirmedLocation } = useBrandShoot();

  // Filter locations based on shortlist IDs
  const shortlist = MOCK_LOCATIONS.filter(loc => shortlistedLocations.includes(loc.id));

  const handleRemove = (id: string) => {
    setShortlistedLocations(shortlistedLocations.filter(lid => lid !== id));
    toast.info("Removed from shortlist");
  };

  const handleConfirm = (id: string) => {
    setConfirmedLocation(id);
    toast.success("Location confirmed for production!");
    
    // Simulate API call / delay then navigate
    setTimeout(() => {
        onNavigate('overview');
    }, 1500);
  };

  if (shortlist.length === 0) {
    return (
        <div className="min-h-screen bg-[#FDFBF9] flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-serif text-gray-900 mb-2">No Locations Shortlisted</h2>
            <p className="text-gray-500 mb-6 max-w-md">Go back to the finder to explore and shortlist locations for your shoot.</p>
            <Button onClick={() => onNavigate('scout-finder')} className="bg-gray-900 text-white">
                Back to Finder
            </Button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF9] font-sans flex flex-col">
      
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
             <Button variant="ghost" size="icon" onClick={() => onNavigate('scout-finder')}>
                <ArrowLeft className="w-5 h-5 text-gray-500" />
             </Button>
             <div>
               <h1 className="font-serif text-2xl text-gray-900">Compare Shortlist</h1>
               <div className="text-xs text-gray-500">
                  Comparing {shortlist.length} locations
               </div>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" className="gap-2" onClick={() => toast.success("Link copied to clipboard")}>
                <Share2 className="w-4 h-4" /> Share with Client
             </Button>
          </div>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="flex-1 overflow-x-auto p-6 md:p-10">
        <div className="flex gap-6 min-w-max mx-auto">
            
            {/* Legend Column (Optional/Hidden on mobile, often implied) */}
            
            {shortlist.map((loc) => (
                <LocationColumn 
                    key={loc.id} 
                    location={loc} 
                    onRemove={() => handleRemove(loc.id)}
                    onConfirm={() => handleConfirm(loc.id)}
                    isConfirmed={confirmedLocation === loc.id}
                />
            ))}
            
            {/* Add More Placeholder */}
            <div className="w-[300px] shrink-0 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center hover:border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => onNavigate('scout-finder')}>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="font-medium text-gray-900">Add Another</h3>
                <p className="text-sm text-gray-500 mt-1">Search for more options</p>
            </div>

        </div>
      </div>

    </div>
  );
}

function LocationColumn({ 
    location, 
    onRemove, 
    onConfirm,
    isConfirmed
}: { 
    location: Location; 
    onRemove: () => void;
    onConfirm: () => void;
    isConfirmed: boolean;
}) {
    return (
        <motion.div 
            layout
            className={`
                w-[340px] shrink-0 bg-white rounded-2xl border flex flex-col relative overflow-hidden transition-all duration-500
                ${isConfirmed ? 'border-green-500 ring-2 ring-green-500 ring-offset-4 shadow-xl' : 'border-gray-100 shadow-lg hover:shadow-xl'}
            `}
        >
            {isConfirmed && (
                <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-xs font-bold uppercase tracking-wider py-1 text-center z-10">
                    Confirmed Selection
                </div>
            )}

            {/* Image */}
            <div className="relative h-56 bg-gray-200">
                <img src={location.image} alt={location.name} className="w-full h-full object-cover" />
                <button 
                    onClick={onRemove}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-gray-900 shadow-sm">
                    ${location.price} / day
                </div>
            </div>

            {/* Header */}
            <div className="p-6 border-b border-gray-50">
                <h3 className="font-serif text-xl text-gray-900 mb-1">{location.name}</h3>
                <div className="text-xs text-gray-500 flex items-center gap-1 mb-4">
                    <MapPin className="w-3 h-3" /> {location.address}
                </div>
                <div className="flex items-center gap-2">
                    <div className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-md border border-purple-100">
                        {location.matchScore}% Match
                    </div>
                    <div className="px-2 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-md border border-gray-100">
                        {location.type}
                    </div>
                </div>
            </div>

            {/* Specs Table */}
            <div className="p-6 space-y-4 flex-1">
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                        <span className="text-gray-500 flex items-center gap-2"><Maximize className="w-4 h-4" /> Size</span>
                        <span className="font-medium text-gray-900">{location.specs.sqft} sqft</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                        <span className="text-gray-500 flex items-center gap-2"><ArrowRight className="w-4 h-4 rotate-90" /> Ceiling</span>
                        <span className="font-medium text-gray-900">{location.specs.ceiling}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                        <span className="text-gray-500 flex items-center gap-2"><Zap className="w-4 h-4" /> Power</span>
                        <span className="font-medium text-gray-900">{location.specs.power}</span>
                    </div>
                </div>

                <div className="pt-2">
                    <p className="text-xs text-gray-500 font-medium mb-2 uppercase tracking-wider">Top Features</p>
                    <div className="flex flex-wrap gap-2">
                        {location.features.map(f => (
                            <span key={f} className="text-[11px] px-2 py-1 bg-gray-50 text-gray-700 rounded border border-gray-100">
                                {f}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="p-6 border-t border-gray-50 bg-gray-50/50 mt-auto">
                <Button 
                    className={`w-full h-11 text-base ${isConfirmed ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-900 hover:bg-black'}`}
                    onClick={onConfirm}
                    disabled={isConfirmed}
                >
                    {isConfirmed ? (
                        <><Check className="w-4 h-4 mr-2" /> Confirmed</>
                    ) : (
                        "Confirm Selection"
                    )}
                </Button>
            </div>

        </motion.div>
    );
}
