import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Plus, 
  MapPin, 
  Star, 
  Users, 
  Filter, 
  ArrowLeft, 
  Check, 
  Heart, 
  Calendar as CalendarIcon, 
  Download, 
  Info, 
  Wifi, 
  Zap, 
  Mic2, 
  Layout, 
  Box, 
  Sun,
  ChevronRight,
  Sparkles,
  Maximize2
} from "lucide-react";

import { DeepResearchTool } from "../assistant/tools/DeepResearchTool";

interface VenueManagementProps {
  onNavigate?: (screen: string) => void;
}

export function VenueManagement({ onNavigate }: VenueManagementProps) {
  const [view, setView] = useState<"list" | "detail">("list");
  const [isFinderOpen, setIsFinderOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<VenueData | null>(null);
  const [activeTab, setActiveTab] = useState("gallery");

  const venues: VenueData[] = [
    {
      id: "1",
      name: "Skylight Clarkson",
      location: "SoHo, NYC",
      city: "NYC",
      capacity: 3200,
      rating: 4.8,
      type: "Industrial",
      tags: ["Runway Ready", "High Ceiling"],
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop",
      price: "$45,000 / day"
    },
    {
      id: "2",
      name: "Pier 59 Studios",
      location: "Chelsea Piers, NYC",
      city: "NYC",
      capacity: 1800,
      rating: 4.6,
      type: "Studio",
      tags: ["Waterfront", "Lighting Rig"],
      image: "https://images.unsplash.com/photo-1596700816999-52d3a948e678?q=80&w=2069&auto=format&fit=crop",
      price: "$32,000 / day"
    },
    {
      id: "3",
      name: "Carrousel du Louvre",
      location: "Paris, France",
      city: "Paris",
      capacity: 2400,
      rating: 4.9,
      type: "Historic",
      tags: ["Luxury", "Iconic"],
      image: "https://images.unsplash.com/photo-1470723710355-95304d8aece4?q=80&w=2070&auto=format&fit=crop",
      price: "€55,000 / day"
    },
    {
      id: "4",
      name: "The Glasshouse",
      location: "Hell's Kitchen, NYC",
      city: "NYC",
      capacity: 1500,
      rating: 4.7,
      type: "Modern",
      tags: ["Panoramic Views", "Terrace"],
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
      price: "$38,000 / day"
    },
    {
      id: "5",
      name: "Duggal Greenhouse",
      location: "Brooklyn Navy Yard",
      city: "NYC",
      capacity: 3000,
      rating: 4.5,
      type: "Industrial",
      tags: ["Waterfront", "Large Scale"],
      image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2162&auto=format&fit=crop",
      price: "$40,000 / day"
    },
    {
      id: "6",
      name: "Spring Studios",
      location: "Tribeca, NYC",
      city: "NYC",
      capacity: 1200,
      rating: 4.8,
      type: "Studio",
      tags: ["Fashion Week Staple", "Rooftop"],
      image: "https://images.unsplash.com/photo-1449247666642-4f01639f7274?q=80&w=2070&auto=format&fit=crop",
      price: "$28,000 / day"
    }
  ];

  const handleVenueClick = (venue: Venue) => {
    setSelectedVenue(venue);
    setView("detail");
    setActiveTab("gallery");
  };

  const handleBack = () => {
    setView("list");
    setTimeout(() => setSelectedVenue(null), 300);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <button onClick={() => onNavigate?.('events-list')} className="hover:text-indigo-600 transition-colors">Events</button>
                <span className="text-gray-300">/</span>
                <span className={`font-medium ${view === 'list' ? 'text-indigo-600' : 'text-gray-900'}`}>Venue Management</span>
                {view === 'detail' && selectedVenue && (
                  <>
                    <span className="text-gray-300">/</span>
                    <span className="text-indigo-600 font-medium">{selectedVenue.name}</span>
                  </>
                )}
              </div>
              <h1 className="text-2xl font-serif text-gray-900">
                {view === 'list' ? 'Find Your Perfect Venue' : selectedVenue?.name}
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-center w-full md:w-auto">
              {view === 'list' ? (
                <>
                  {/* AI Finder Toggle */}
                  <button 
                    onClick={() => setIsFinderOpen(!isFinderOpen)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                      isFinderOpen 
                        ? 'bg-purple-50 text-purple-700 border border-purple-200' 
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    AI Venue Finder
                  </button>

                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search venues..." 
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                    />
                  </div>
                  <button className="flex-1 sm:flex-none px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap">
                    <Plus className="w-4 h-4" />
                    Add Venue
                  </button>
                </>
              ) : (
                <div className="flex gap-2">
                   <button 
                    onClick={handleBack}
                    className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to List
                  </button>
                  <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-sm">
                    Select Venue
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === 'list' ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-[1920px] mx-auto px-4 md:px-6 py-6 space-y-6"
          >
            {/* AI Finder Panel */}
            <AnimatePresence>
               {isFinderOpen && (
                 <motion.div 
                   initial={{ height: 0, opacity: 0 }}
                   animate={{ height: "auto", opacity: 1 }}
                   exit={{ height: 0, opacity: 0 }}
                   className="overflow-hidden"
                 >
                    <div className="bg-purple-50/50 rounded-2xl p-6 border border-purple-100">
                       <h3 className="text-lg font-serif font-medium text-purple-900 mb-4">Deep Research: Venue Scout</h3>
                       <DeepResearchTool 
                         placeholder="Describe your ideal venue (e.g. 'Industrial warehouse in Brooklyn for 500 guests with high ceilings')..." 
                       />
                    </div>
                 </motion.div>
               )}
            </AnimatePresence>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm min-w-[140px]">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">Capacity: 200-5000</span>
                </div>
                
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm min-w-[140px]">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <select className="bg-transparent border-none focus:ring-0 p-0 text-gray-700 text-sm">
                    <option>Location: All</option>
                    <option>New York</option>
                    <option>Paris</option>
                    <option>Milan</option>
                    <option>London</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm min-w-[140px]">
                  <Layout className="w-4 h-4 text-gray-500" />
                  <select className="bg-transparent border-none focus:ring-0 p-0 text-gray-700 text-sm">
                    <option>Type: All</option>
                    <option>Runway</option>
                    <option>Presentation</option>
                    <option>Gala</option>
                  </select>
                </div>
              </div>
              
              <button className="w-full lg:w-auto px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                <Filter className="w-4 h-4" />
                Apply Filters
              </button>
            </div>

            {/* Venue Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {venues.map((venue, index) => (
                <motion.div
                  key={venue.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={venue.image} 
                      alt={venue.name} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-600 hover:text-red-500 transition-colors shadow-sm">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      {venue.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium uppercase tracking-wider rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-serif font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {venue.name}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {venue.location}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded border border-gray-100">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-medium text-gray-700">{venue.rating}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 my-4 py-4 border-y border-gray-100">
                      <div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Capacity</div>
                        <div className="flex items-center gap-2 text-sm text-gray-900 font-medium">
                          <Users className="w-4 h-4 text-gray-400" />
                          {venue.capacity.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Starting At</div>
                        <div className="flex items-center gap-2 text-sm text-gray-900 font-medium">
                          <span className="text-gray-400">$</span>
                          {venue.price}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-auto">
                      <button 
                        onClick={() => handleVenueClick(venue)}
                        className="flex-1 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors font-medium"
                      >
                        View Details
                      </button>
                      <button className="flex-1 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors font-medium">
                        Select
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <VenueDetail 
            venue={selectedVenue!} 
            onBack={handleBack}
            onNavigate={onNavigate}
          />
        )}
      </AnimatePresence>
    </div>
  );
}