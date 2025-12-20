import { Search, Plus, Upload, Sparkles } from "lucide-react";
import { CRMKPIs } from "./crm/CRMKPIs";
import { CRMPipeline } from "./crm/CRMPipeline";
import { CRMList } from "./crm/CRMList";
import { CRMSidebar } from "./crm/CRMSidebar";
import { SmartContactInput } from "./crm/SmartContactInput";
import { SponsorDetailSidebar } from "./crm/SponsorDetailSidebar";
import { useSponsor } from "../../context/SponsorContext";
import { useState } from "react";

interface SponsorCRMProps {
  onNavigate?: (screen: string) => void;
}

export function SponsorCRM({ onNavigate }: SponsorCRMProps) {
  const { sponsors } = useSponsor();
  const [showSmartAdd, setShowSmartAdd] = useState(false);
  const [selectedSponsorId, setSelectedSponsorId] = useState<string | null>(null);

  const selectedSponsor = sponsors.find(s => s.id === selectedSponsorId) || null;

  return (
    <div className="min-h-screen bg-[#F7F7F5] font-sans pb-12">
      
      {/* Detail Sidebar (Overlay) */}
      <SponsorDetailSidebar 
        sponsor={selectedSponsor} 
        isOpen={!!selectedSponsorId} 
        onClose={() => setSelectedSponsorId(null)} 
      />

      {/* Header Bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                <span>Sponsors</span>
                <span className="text-gray-300">/</span>
                <span className="text-[#1A1A1A]">CRM Dashboard</span>
              </div>
              <h1 className="text-2xl font-serif font-medium text-[#1A1A1A]">Sponsor CRM</h1>
              <p className="text-sm text-gray-500 font-medium">Manage sponsors, leads, and partnerships</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-center w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search sponsors..." 
                  className="w-full pl-10 pr-4 py-2 bg-[#F7F7F5] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] focus:bg-white transition-all text-[#1A1A1A]"
                />
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4" />
                  Import CSV
                </button>
                <button 
                  onClick={() => setShowSmartAdd(!showSmartAdd)}
                  className="flex-1 sm:flex-none px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  New Sponsor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-8 space-y-6">
        {/* Smart Add Section */}
        {showSmartAdd && (
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm animate-in fade-in slide-in-from-top-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">AI Quick Add</h3>
                  <p className="text-sm text-gray-500">Paste a LinkedIn URL or website to instantly enrich profile.</p>
                </div>
              </div>
              <button 
                onClick={() => setShowSmartAdd(false)}
                className="text-sm text-gray-400 hover:text-gray-600"
              >
                Close
              </button>
            </div>
            <SmartContactInput />
          </div>
        )}

        {/* KPI Overview */}
        <CRMKPIs />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          {/* Main Column: Kanban & Table (9 cols) */}
          <div className="lg:col-span-9 space-y-8">
            <CRMPipeline 
              onNavigate={onNavigate} 
              onSelectSponsor={setSelectedSponsorId}
            />
            <CRMList 
              onNavigate={onNavigate} 
              onSelectSponsor={setSelectedSponsorId}
            />
          </div>

          {/* Sidebar Column (3 cols) */}
          <div className="lg:col-span-3">
            <CRMSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
