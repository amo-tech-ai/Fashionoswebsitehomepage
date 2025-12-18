import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  MapPin,
  Search,
  Filter,
  Heart,
  Star,
  Zap,
  CheckCircle2,
  ChevronRight,
  Info,
  SlidersHorizontal,
  X,
  Map,
  List,
  Sparkles
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { useBrandShoot } from '../../context/BrandShootContext';
import { toast } from "sonner@2.0.3";

// --- Types ---
export interface Location {
  id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  address: string;
  matchScore: number;
  matchReason: string;
  features: string[];
  specs: {
    sqft: number;
    ceiling: string;
    power: string;
  };
  isShortlisted?: boolean;
}

// --- Mock Data ---
export const MOCK_LOCATIONS: Location[] = [
  {
    id: '1',
    name: 'The Concrete Loft',
    type: 'Industrial Studio',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1519642918688-7e43b19245d8?auto=format&fit=crop&q=80&w=800&h=600',
    address: 'Williamsburg, Brooklyn',
    matchScore: 98,
    matchReason: "Direct match for 'High Texture' and 'Natural Light' requirements.",
    features: ['South Facing Windows', 'Concrete Floors', 'Freight Elevator'],
    specs: { sqft: 2500, ceiling: "14ft", power: "100A 3-Phase" }
  },
  {
    id: '2',
    name: 'Casa Oculta',
    type: 'Private Residence',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800&h=600',
    address: 'Greenwich Village, NY',
    matchScore: 94,
    matchReason: "Warm plaster walls align perfectly with 'Calm Luxury' palette.",
    features: ['Plaster Walls', 'Mid-Century Furniture', 'Private Garden'],
    specs: { sqft: 1800, ceiling: "12ft", power: "Domestic" }
  },
  {
    id: '3',
    name: 'Studio 4B - Cyclorama',
    type: 'Photo Studio',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1534234828569-1f3555d4307b?auto=format&fit=crop&q=80&w=800&h=600',
    address: 'Long Island City, Queens',
    matchScore: 82,
    matchReason: "Good budget option, but requires set styling to achieve 'Warm' tone.",
    features: ['2-Wall Cyc', 'Full Grid', 'Drive-in Access'],
    specs: { sqft: 3000, ceiling: "18ft", power: "300A Camlock" }
  },
  {
    id: '4',
    name: 'The Greenhouse',
    type: 'Daylight Studio',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?auto=format&fit=crop&q=80&w=800&h=600',
    address: 'Bushwick, Brooklyn',
    matchScore: 88,
    matchReason: "Excellent natural light. Abundant plants add organic texture.",
    features: ['Glass Roof', 'Rustic Brick', 'Prop Library'],
    specs: { sqft: 2200, ceiling: "16ft", power: "100A" }
  }
];

export function ScoutFinder({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { shortlistedLocations, setShortlistedLocations } = useBrandShoot();
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [locations, setLocations] = useState(MOCK_LOCATIONS);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  // Sync local locations state with context shortlist
  useEffect(() => {
    setLocations(prevLocations => prevLocations.map(loc => ({
      ...loc,
      isShortlisted: shortlistedLocations.includes(loc.id)
    })));
  }, [shortlistedLocations]);

  const toggleShortlist = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    
    if (shortlistedLocations.includes(id)) {
        setShortlistedLocations(shortlistedLocations.filter(lid => lid !== id));
        toast.info("Removed from shortlist");
    } else {
        setShortlistedLocations([...shortlistedLocations, id]);
        toast.success("Added to shortlist");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#FDFBF9] overflow-hidden font-sans">
      
      {/* Header */}
      <div className="flex-none bg-white border-b border-gray-100 z-20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
                 <Button variant="ghost" size="icon" onClick={() => onNavigate('scout-setup')}>
                    <ArrowLeft className="w-5 h-5 text-gray-500" />
                 </Button>
                 <div>
                   <h1 className="font-serif text-2xl text-gray-900">Location Finder</h1>
                   <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> New York, NY</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span className="text-purple-600 font-medium">Filtered by AI Analysis</span>
                   </div>
                 </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100">
                    <button 
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <List className="w-4 h-4" />
                    </button>
                    <button 
                         onClick={() => setViewMode('map')}
                         className={`p-2 rounded-md transition-all ${viewMode === 'map' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <Map className="w-4 h-4" />
                    </button>
                </div>
                <Button 
                    className="bg-gray-900 text-white hover:bg-black"
                    onClick={() => onNavigate('scout-shortlist')}
                    disabled={shortlistedLocations.length === 0}
                >
                    Review Shortlist ({shortlistedLocations.length})
                </Button>
            </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex-none bg-white border-b border-gray-100 px-6 py-3 overflow-x-auto">
         <div className="max-w-7xl mx-auto flex items-center gap-3 min-w-max">
            <Button variant="outline" size="sm" className="h-8 gap-2 border-gray-200">
                <SlidersHorizontal className="w-3 h-3" /> Filters
            </Button>
            <div className="w-[1px] h-6 bg-gray-200 mx-1" />
            {["Natural Light", "Concrete Walls", "High Ceiling", "Industrial"].map(tag => (
                <Badge key={tag} variant="secondary" className="h-8 px-3 bg-gray-50 hover:bg-gray-100 text-gray-600 font-normal cursor-pointer transition-colors border-0">
                    {tag}
                </Badge>
            ))}
             <Badge variant="secondary" className="h-8 px-3 bg-purple-50 text-purple-700 font-medium border border-purple-100 cursor-pointer">
                <Sparkles className="w-3 h-3 mr-1" /> AI Recommended
            </Badge>
         </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto bg-[#F8F5F1] p-6 relative">
         <div className="max-w-7xl mx-auto">
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {locations.map((loc, idx) => (
                        <LocationCard 
                            key={loc.id} 
                            location={loc} 
                            index={idx}
                            onSelect={() => setSelectedLocation(loc)}
                            onToggleShortlist={(e) => toggleShortlist(e, loc.id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="bg-gray-200 rounded-2xl h-full w-full flex items-center justify-center min-h-[500px] border border-gray-300">
                    <div className="text-center">
                        <Map className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <h3 className="text-gray-500 font-medium">Map View Placeholder</h3>
                        <p className="text-gray-400 text-sm">Interactive map integration would load here.</p>
                    </div>
                </div>
            )}
         </div>
      </div>

      {/* Detail Sheet */}
      <Sheet open={!!selectedLocation} onOpenChange={(open) => !open && setSelectedLocation(null)}>
        <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto p-0">
            {selectedLocation && (
                <div className="flex flex-col h-full">
                    {/* Hero Image */}
                    <div className="relative h-64 w-full shrink-0">
                        <img 
                            src={selectedLocation.image} 
                            alt={selectedLocation.name} 
                            className="w-full h-full object-cover"
                        />
                        <button 
                            onClick={() => setSelectedLocation(null)}
                            className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 backdrop-blur-md transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                         <div className="absolute bottom-4 left-4">
                             <Badge className="bg-white/90 text-gray-900 backdrop-blur-md border-0 shadow-sm hover:bg-white">
                                {selectedLocation.type}
                             </Badge>
                         </div>
                    </div>

                    <div className="p-6 flex-1 space-y-8">
                        {/* Header Info */}
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="font-serif text-2xl text-gray-900">{selectedLocation.name}</h2>
                                <div className="text-right">
                                    <div className="font-bold text-lg text-gray-900">${selectedLocation.price}</div>
                                    <div className="text-xs text-gray-500">per day</div>
                                </div>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mb-4">
                                <MapPin className="w-4 h-4 mr-1" /> {selectedLocation.address}
                            </div>
                            
                            {/* AI Match Banner */}
                            <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 flex items-start gap-3">
                                <Sparkles className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                                <div>
                                    <div className="font-bold text-purple-900 text-sm mb-1">{selectedLocation.matchScore}% Match Score</div>
                                    <p className="text-sm text-purple-800 leading-relaxed">{selectedLocation.matchReason}</p>
                                </div>
                            </div>
                        </div>

                        {/* Specs Grid */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Specifications</h3>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-gray-50 p-3 rounded-lg text-center border border-gray-100">
                                    <div className="text-xs text-gray-400 mb-1">Space</div>
                                    <div className="font-medium text-gray-900">{selectedLocation.specs.sqft} sqft</div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg text-center border border-gray-100">
                                    <div className="text-xs text-gray-400 mb-1">Ceiling</div>
                                    <div className="font-medium text-gray-900">{selectedLocation.specs.ceiling}</div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg text-center border border-gray-100">
                                    <div className="text-xs text-gray-400 mb-1">Power</div>
                                    <div className="font-medium text-gray-900">{selectedLocation.specs.power}</div>
                                </div>
                            </div>
                        </div>

                        {/* Features List */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Features</h3>
                            <div className="flex flex-wrap gap-2">
                                {selectedLocation.features.map(feature => (
                                    <div key={feature} className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 border-t border-gray-100 bg-white sticky bottom-0">
                         <div className="flex gap-3">
                            <Button variant="outline" className="flex-1 h-12" onClick={() => {}}>
                                Contact Host
                            </Button>
                            <Button 
                                className={`flex-1 h-12 ${shortlistedLocations.includes(selectedLocation.id) ? 'bg-gray-100 text-gray-900 hover:bg-gray-200' : 'bg-gray-900 text-white hover:bg-black'}`}
                                onClick={(e) => toggleShortlist(e as any, selectedLocation.id)}
                            >
                                {shortlistedLocations.includes(selectedLocation.id) ? 'Remove from Shortlist' : 'Add to Shortlist'}
                            </Button>
                         </div>
                    </div>
                </div>
            )}
        </SheetContent>
      </Sheet>

    </div>
  );
}

// --- Sub-Components ---

function LocationCard({ 
    location, 
    index, 
    onSelect, 
    onToggleShortlist 
}: { 
    location: Location; 
    index: number; 
    onSelect: () => void;
    onToggleShortlist: (e: React.MouseEvent) => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full"
            onClick={onSelect}
        >
            {/* Image Area */}
            <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden">
                <img 
                    src={location.image} 
                    alt={location.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                
                {/* Match Score Badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm border border-white/50 flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${location.matchScore > 90 ? 'bg-green-500' : 'bg-amber-500'}`} />
                    <span className="text-xs font-bold text-gray-900">{location.matchScore}% Match</span>
                </div>

                {/* Shortlist Button */}
                <button 
                    onClick={onToggleShortlist}
                    className={`
                        absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all
                        ${location.isShortlisted 
                            ? 'bg-red-500 text-white shadow-md' 
                            : 'bg-black/30 text-white hover:bg-black/50'}
                    `}
                >
                    <Heart className={`w-4 h-4 ${location.isShortlisted ? 'fill-current' : ''}`} />
                </button>
            </div>

            {/* Info Area */}
            <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="font-serif text-lg font-medium text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors">
                        {location.name}
                    </h3>
                </div>
                <div className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                     <MapPin className="w-3 h-3" /> {location.address}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {location.features.slice(0, 2).map(f => (
                        <span key={f} className="text-[10px] bg-gray-50 text-gray-600 px-2 py-1 rounded border border-gray-100">
                            {f}
                        </span>
                    ))}
                    {location.features.length > 2 && (
                        <span className="text-[10px] bg-gray-50 text-gray-400 px-2 py-1 rounded border border-gray-100">
                            +{location.features.length - 2}
                        </span>
                    )}
                </div>

                <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-900">${location.price} <span className="text-gray-400 font-normal text-xs">/ day</span></div>
                    <div className="flex items-center text-xs font-medium text-gray-400 group-hover:text-indigo-600 transition-colors">
                        Details <ChevronRight className="w-3 h-3 ml-0.5" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}