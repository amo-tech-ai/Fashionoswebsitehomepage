import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Filter, 
  User, 
  Heart, 
  X, 
  Check, 
  MessageSquare, 
  ArrowRight,
  Star,
  MapPin,
  Calendar,
  Zap,
  ChevronRight,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Slider } from '../ui/slider';

// Mock Data for Models
const CANDIDATES = [
  {
    id: '1',
    name: 'Elara V.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
    matchScore: 98,
    matchReasons: ['Matches "Ethereal" vibe', 'Available for London shoot', 'Worked with similar luxury brands'],
    location: 'London, UK',
    height: '179cm',
    rate: '£2,500/day',
    tags: ['Editorial', 'Runway', 'Ethereal'],
    availability: 'High',
    isNew: true
  },
  {
    id: '2',
    name: 'Kai R.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80',
    matchScore: 94,
    matchReasons: ['Perfect for "Street Luxe"', 'Strong portfolio in menswear'],
    location: 'Berlin, DE',
    height: '185cm',
    rate: '€2,200/day',
    tags: ['Streetwear', 'Commercial', 'Edgy'],
    availability: 'Medium',
    isNew: false
  },
  {
    id: '3',
    name: 'Serafina M.',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
    matchScore: 89,
    matchReasons: ['Great "Classic Beauty" look', 'Budget aligned'],
    location: 'Paris, FR',
    height: '176cm',
    rate: '€1,800/day',
    tags: ['Classic', 'Beauty', 'Commercial'],
    availability: 'High',
    isNew: false
  },
  {
    id: '4',
    name: 'Leo T.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
    matchScore: 85,
    matchReasons: ['Matches mood board aesthetic', 'Available next week'],
    location: 'New York, USA',
    height: '188cm',
    rate: '$3,000/day',
    tags: ['Editorial', 'Runway', 'Versatile'],
    availability: 'Low',
    isNew: true
  }
];

import { useBrandShoot } from '../../context/BrandShootContext';

export function CuraCasting({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const { bookedTalent, setBookedTalent, updateChecklist } = useBrandShoot();
  const [activeTab, setActiveTab] = useState<'matches' | 'shortlist' | 'search'>('matches');
  const [searchQuery, setSearchQuery] = useState('');
  // Initialize shortlist with already booked talent if any, or empty
  const [shortlisted, setShortlisted] = useState<string[]>(bookedTalent.map(String));
  const [viewedProfile, setViewedProfile] = useState<string | null>(null);

  const handleShortlist = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (shortlisted.includes(id)) {
      setShortlisted(prev => prev.filter(item => item !== id));
    } else {
      setShortlisted(prev => [...prev, id]);
    }
  };

  const confirmBooking = () => {
    setBookedTalent(shortlisted);
    if (shortlisted.length > 0) {
      updateChecklist('talentConfirmed', true);
    } else {
      updateChecklist('talentConfirmed', false);
    }
    onNavigate?.('production-timeline');
  };

  const getMatchColor = (score: number) => {
    if (score >= 95) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 90) return 'text-indigo-600 bg-indigo-50 border-indigo-200';
    return 'text-amber-600 bg-amber-50 border-amber-200';
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] font-sans text-gray-900 pb-20">
      
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-medium text-gray-900 flex items-center gap-2">
                Cura
                <span className="text-xs font-sans font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Beta</span>
              </h1>
              <p className="text-xs text-gray-500">Intelligent Casting Agent • FW24 Campaign</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1 bg-gray-50 p-1 rounded-lg border border-gray-100">
              {['matches', 'shortlist', 'search'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {tab === 'shortlist' && shortlisted.length > 0 && (
                    <span className="ml-2 px-1.5 py-0.5 bg-gray-900 text-white text-[10px] rounded-full">{shortlisted.length}</span>
                  )}
                </button>
              ))}
            </div>
            <Button 
              variant="ghost"
              onClick={() => onNavigate?.('production-timeline')}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button 
              className="bg-gray-900 text-white hover:bg-black"
              onClick={confirmBooking}
            >
              Confirm Selection
            </Button>
          </div>
        </div>
        
        {/* Agent Insight Bar */}
        <div className="bg-indigo-50/50 border-b border-indigo-50 px-6 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
             <div className="flex items-center gap-3 text-indigo-900">
               <Zap className="w-4 h-4 text-indigo-600 fill-current" />
               <p className="text-sm font-medium">
                 <span className="opacity-70">Agent Insight:</span> Based on your mood board "Ethereal Future", I've prioritized models with strong movement portfolios.
               </p>
             </div>
             <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
               Refine Criteria <ChevronRight className="w-3 h-3" />
             </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Filters / Context Sidebar */}
          <div className="hidden lg:block lg:col-span-3 space-y-8">
             <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
               <h3 className="font-serif text-lg font-medium mb-4">Campaign Context</h3>
               <div className="space-y-4">
                 <div>
                   <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Aesthetic</label>
                   <div className="flex flex-wrap gap-2">
                     {['Ethereal', 'Minimalist', 'Calm Luxury', 'Future'].map(tag => (
                       <Badge key={tag} variant="secondary" className="bg-gray-50 text-gray-600 hover:bg-gray-100">{tag}</Badge>
                     ))}
                   </div>
                 </div>
                 <div>
                   <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Budget Range</label>
                   <p className="text-sm font-medium text-gray-900">$1,500 - $3,500 / day</p>
                 </div>
                 <div>
                   <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Location</label>
                   <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                     <MapPin className="w-3.5 h-3.5 text-gray-400" />
                     London, UK (+Travel)
                   </p>
                 </div>
               </div>
             </div>

             <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-serif text-lg font-medium mb-4">Refine Match</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Similarity Match</span>
                      <span className="text-sm text-gray-500">85%+</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 w-[85%] rounded-full" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                     <label className="flex items-center gap-2 text-sm text-gray-600">
                       <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                       Available on Shoot Dates
                     </label>
                     <label className="flex items-center gap-2 text-sm text-gray-600">
                       <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                       Within Budget
                     </label>
                     <label className="flex items-center gap-2 text-sm text-gray-600">
                       <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                       Has Runway Experience
                     </label>
                  </div>
                </div>
             </div>
          </div>

          {/* Candidates Grid */}
          <div className="lg:col-span-9">
            <div className="mb-6 flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Ask Cura to find specific traits (e.g., 'Freckles', 'Red hair', 'Dancer')..." 
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="h-11 px-4 border-gray-200 text-gray-600 hover:text-gray-900 bg-white">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence>
                {CANDIDATES.filter(c => activeTab === 'shortlist' ? shortlisted.includes(c.id) : true).map((candidate) => (
                  <motion.div
                    layout
                    key={candidate.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`
                      group bg-white rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer
                      ${shortlisted.includes(candidate.id) 
                        ? 'border-indigo-200 ring-1 ring-indigo-50 shadow-md' 
                        : 'border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-200 hover:-translate-y-1'}
                    `}
                    onClick={() => setViewedProfile(candidate.id)}
                  >
                    {/* Image Area */}
                    <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                      <img src={candidate.image} alt={candidate.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                      
                      {/* Match Badge */}
                      <div className="absolute top-3 left-3">
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-md ${getMatchColor(candidate.matchScore)}`}>
                          <Sparkles className="w-3 h-3" />
                          {candidate.matchScore}% Match
                        </div>
                      </div>

                      {/* Shortlist Button */}
                      <button 
                        onClick={(e) => handleShortlist(candidate.id, e)}
                        className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                          shortlisted.includes(candidate.id)
                            ? 'bg-indigo-600 text-white shadow-indigo-600/30'
                            : 'bg-white/30 text-white hover:bg-white hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${shortlisted.includes(candidate.id) ? 'fill-current' : ''}`} />
                      </button>

                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="font-serif text-xl font-medium mb-1">{candidate.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-white/80 font-medium mb-3">
                          <span>{candidate.location}</span>
                          <span>•</span>
                          <span>{candidate.height}</span>
                        </div>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {candidate.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded text-[10px] uppercase tracking-wide">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer / Match Reason */}
                    <div className="p-4 bg-white">
                       <div className="flex items-start gap-2 mb-3">
                         <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
                           <Zap className="w-3 h-3 text-indigo-600" />
                         </div>
                         <p className="text-xs text-gray-600 leading-relaxed">
                           <span className="font-semibold text-gray-900">Why Cura chose {candidate.name.split(' ')[0]}: </span>
                           {candidate.matchReasons[0]}
                         </p>
                       </div>
                       
                       <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-1">
                          <span className="text-xs font-medium text-gray-500">{candidate.rate}</span>
                          <div className="flex gap-2">
                             <button className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors">
                               <MessageSquare className="w-4 h-4" />
                             </button>
                             <button className="text-xs font-bold text-gray-900 hover:underline">View Profile</button>
                          </div>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {/* Empty State for Shortlist */}
            {activeTab === 'shortlist' && shortlisted.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="font-serif text-lg text-gray-900 mb-1">No shortlisted models yet</h3>
                <p className="text-gray-500 text-sm mb-6">Start browsing matches to build your casting list.</p>
                <Button onClick={() => setActiveTab('matches')} variant="outline">Browse Matches</Button>
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}