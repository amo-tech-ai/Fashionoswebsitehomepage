import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Send, Calendar, MoreHorizontal, Sparkles, 
  ArrowRight, Phone, Mail, FileText, Plus, AlertCircle 
} from "lucide-react";
import { EventSponsor } from "../../../lib/types/events.types";
import { Button } from "../../ui/button";

interface CRMInspectorPanelProps {
  sponsor: EventSponsor | null;
  onClose: () => void;
}

export function CRMInspectorPanel({ sponsor, onClose }: CRMInspectorPanelProps) {
  
  // -- Empty State: AI Global Insights --
  if (!sponsor) {
    return (
      <div className="w-full h-full bg-white border-l border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100">
           <div className="flex items-center gap-2 text-purple-700 mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">AI Intelligence</span>
           </div>
           <h2 className="text-lg font-serif font-bold text-gray-900">Daily Briefing</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Insight 1 */}
            <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-xl p-4 shadow-sm">
               <h3 className="font-bold text-gray-900 text-sm mb-2">Opportunity</h3>
               <p className="text-sm text-gray-600 leading-relaxed mb-3">
                 <span className="font-bold text-gray-900">Dior</span> fit score increased to 92% after recent engagement.
               </p>
               <button className="text-xs font-bold text-purple-700 flex items-center gap-1 hover:gap-2 transition-all">
                  Generate Pitch <ArrowRight className="w-3 h-3" />
               </button>
            </div>

             {/* Insight 2 */}
             <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-100 rounded-xl p-4 shadow-sm">
               <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                 <AlertCircle className="w-4 h-4 text-amber-600" />
                 Risk Detected
               </h3>
               <p className="text-sm text-gray-600 leading-relaxed mb-3">
                 <span className="font-bold text-gray-900">Adidas</span> stalled in 'Discovery' for 14 days.
               </p>
               <button className="text-xs font-bold text-amber-700 flex items-center gap-1 hover:gap-2 transition-all">
                  View Sponsor <ArrowRight className="w-3 h-3" />
               </button>
            </div>

            {/* Activity Feed Mini */}
            <div>
               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Recent Activity</h3>
               <div className="space-y-4 relative pl-2">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-100" />
                  {[
                    { text: "Call with Gucci completed", time: "2:14 PM", color: "bg-emerald-100 text-emerald-700" },
                    { text: "Proposal sent to Prada", time: "Yesterday", color: "bg-blue-100 text-blue-700" },
                    { text: "Fendi viewed pitch deck", time: "2 days ago", color: "bg-purple-100 text-purple-700" }
                  ].map((item, i) => (
                    <div key={i} className="relative pl-6">
                       <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full flex items-center justify-center border-2 border-white ${item.color}`}>
                          <div className="w-1.5 h-1.5 bg-current rounded-full" />
                       </div>
                       <div>
                          <p className="text-sm font-medium text-gray-900">{item.text}</p>
                          <p className="text-xs text-gray-400">{item.time}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
        </div>
      </div>
    );
  }

  // -- Detail State: Selected Sponsor --
  const tierColors = {
    platinum: "bg-gray-100 text-gray-800 border-gray-200",
    gold: "bg-amber-50 text-amber-700 border-amber-200",
    silver: "bg-gray-50 text-gray-600 border-gray-200",
    bronze: "bg-orange-50 text-orange-700 border-orange-200"
  };

  return (
    <div className="w-full h-full bg-white border-l border-gray-200 flex flex-col animate-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#1A1A1A] text-white rounded-lg flex items-center justify-center text-xl font-serif">
              {sponsor.company_name.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-gray-900 leading-tight">
                {sponsor.company_name}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${tierColors[sponsor.tier]}`}>
                  {sponsor.tier}
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-gray-50 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 bg-[#1A1A1A] hover:bg-black text-white h-9 text-xs">
            <Send className="w-3 h-3 mr-1.5" />
            Proposal
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9 border-gray-200">
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* Deal Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
             <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Value</div>
             <div className="text-lg font-serif font-bold text-gray-900">${(sponsor.amount/1000).toFixed(0)}k</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
             <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Score</div>
             <div className="text-lg font-serif font-bold text-gray-900 flex items-center gap-1">
               {sponsor.fit_score || 85}
               <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded ml-1">High</span>
             </div>
          </div>
        </div>

        {/* AI Insight */}
        <div className="bg-indigo-50/50 rounded-xl p-4 border border-indigo-100">
           <div className="flex items-center gap-2 text-indigo-700 mb-2">
              <Sparkles className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Cura Insight</span>
           </div>
           <p className="text-xs text-gray-700 leading-relaxed font-medium">
             {sponsor.fit_score && sponsor.fit_score > 80 
                ? "Strong brand alignment. Emphasize sustainability in pitch."
                : "Moderate fit. Suggest offering 'Silver' tier."}
           </p>
        </div>

        {/* Next Steps */}
        <div>
           <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Next Steps</h3>
           <div className="space-y-2">
              <label className="flex items-center gap-3 p-2.5 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-colors">
                 <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                 <span className="text-xs text-gray-700 font-medium">Send updated deck</span>
              </label>
              <label className="flex items-center gap-3 p-2.5 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-colors">
                 <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                 <span className="text-xs text-gray-700 font-medium">Schedule follow-up</span>
              </label>
           </div>
        </div>

      </div>

      {/* Note Input */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
         <input 
           type="text" 
           placeholder="Add note..." 
           className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400"
         />
      </div>
    </div>
  );
}
