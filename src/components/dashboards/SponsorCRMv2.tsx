import React, { useState } from "react";
import { Search, Plus, Sparkles, LayoutGrid, List, Filter } from "lucide-react";
import { CRMPipelinev2 } from "./crm/CRMPipelinev2";
import { CRMListv2 } from "./crm/CRMListv2";
import { CRMInspectorPanel } from "./crm/CRMInspectorPanel";
import { useSponsor } from "../../context/SponsorContext";
import { CRMKPIsv2 } from "./crm/CRMKPIsv2";

interface SponsorCRMv2Props {
  onNavigate?: (screen: string) => void;
}

export function SponsorCRMv2({ onNavigate }: SponsorCRMv2Props) {
  const { sponsors } = useSponsor();
  const [viewMode, setViewMode] = useState<'pipeline' | 'list'>('pipeline');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedSponsorId, setSelectedSponsorId] = useState<string | null>(null);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);

  const selectedSponsor = sponsors.find(s => s.id === selectedSponsorId) || null;

  // Filter Logic
  const filteredSponsors = sponsors.filter(s => {
    if (activeFilter === 'closing-soon') return ['proposal', 'negotiation'].includes(s.status);
    if (activeFilter === 'at-risk') return s.fit_score && s.fit_score < 70;
    if (activeFilter === 'won') return s.status === 'confirmed' || s.status === 'fulfilled';
    return true;
  });

  const filters = [
    { id: 'all', label: 'All Sponsors' },
    { id: 'my', label: 'My Deals' },
    { id: 'closing-soon', label: 'Closing Soon' },
    { id: 'at-risk', label: 'At Risk' },
    { id: 'won', label: 'Closed Won' }
  ];

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-[#F7F7F5] font-sans">
      
      {/* 
        MAIN CONTENT AREA 
        - Full width (minus global sidebar)
      */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Header (Sticky) */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 shrink-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 md:mb-0">
            <div>
              <h1 className="text-xl font-serif font-bold text-[#1A1A1A]">Sponsor Overview</h1>
              <p className="text-xs text-gray-400 font-medium mt-0.5">
                {filteredSponsors.length} active deals • Total Pipeline ${(filteredSponsors.reduce((acc, s) => acc + s.amount, 0)/1000).toFixed(0)}k
              </p>
            </div>

            <div className="flex items-center gap-3">
               <div className="relative hidden sm:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search sponsors..." 
                    className="w-48 lg:w-64 pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:bg-white transition-all"
                  />
               </div>
               <button className="flex items-center gap-2 px-3 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-bold hover:bg-black transition-colors shadow-sm">
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">New Deal</span>
               </button>
               <button 
                 onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
                 className={`p-2 rounded-lg transition-colors ${isRightPanelOpen ? 'bg-purple-50 text-purple-700' : 'text-gray-400 hover:bg-gray-50'}`}
               >
                 <Sparkles className="w-4 h-4" />
               </button>
            </div>
          </div>
          
          {/* Controls Bar: Filters & View Toggle */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-100">
            
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`
                    px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all
                    ${activeFilter === filter.id 
                      ? 'bg-[#1A1A1A] text-white' 
                      : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'}
                  `}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* View Switcher */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg flex-shrink-0">
               <button 
                 onClick={() => setViewMode('pipeline')}
                 className={`p-1.5 rounded-md transition-all ${viewMode === 'pipeline' ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
               >
                 <LayoutGrid className="w-4 h-4" />
               </button>
               <button 
                 onClick={() => setViewMode('list')}
                 className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
               >
                 <List className="w-4 h-4" />
               </button>
            </div>

          </div>
        </div>

        {/* Scrollable Main Stage */}
        <div className="flex-1 overflow-x-auto overflow-y-auto p-6 scrollbar-hide bg-[#F7F7F5]">
          <div className="max-w-[1800px] mx-auto space-y-8">
             <CRMKPIsv2 />
             
             <div>
                {viewMode === 'pipeline' ? (
                  <CRMPipelinev2 
                    sponsors={filteredSponsors}
                    onSelectSponsor={(id) => {
                      setSelectedSponsorId(id);
                      setIsRightPanelOpen(true);
                    }} 
                  />
                ) : (
                  <CRMListv2 
                    sponsors={filteredSponsors}
                    onSelectSponsor={(id) => {
                      setSelectedSponsorId(id);
                      setIsRightPanelOpen(true);
                    }} 
                  />
                )}
             </div>
          </div>
        </div>

      </div>

      {/* 
        RIGHT INSPECTOR PANEL (Context)
        - Toggleable, Context-Aware
      */}
      <div className={`
        flex-shrink-0 bg-white border-l border-gray-200 transition-all duration-300 ease-in-out z-20
        fixed inset-y-0 right-0 shadow-2xl md:static md:shadow-none
        ${isRightPanelOpen ? 'w-full md:w-[380px] translate-x-0' : 'w-0 translate-x-full md:w-0 md:translate-x-0 opacity-0 overflow-hidden'}
      `}>
         <CRMInspectorPanel 
           sponsor={selectedSponsor} 
           onClose={() => {
             if (selectedSponsor) {
               setSelectedSponsorId(null); // Deselect returns to AI view
             } else {
               setIsRightPanelOpen(false); // Close panel if already in AI view
             }
           }} 
         />
      </div>

    </div>
  );
}
