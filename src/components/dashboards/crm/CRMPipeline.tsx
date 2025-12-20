import React from "react";
import { motion } from "motion/react";
import { Sparkles, ChevronRight } from "lucide-react";
import { useSponsor } from "../../../context/SponsorContext";

interface CRMPipelineProps {
  onNavigate?: (screen: string) => void;
  onSelectSponsor?: (sponsorId: string) => void;
}

export function CRMPipeline({ onNavigate, onSelectSponsor }: CRMPipelineProps) {
  const { sponsors } = useSponsor();

  const pipelineColumns = [
    { id: "lead", label: "New Leads", count: 0, color: "border-t-blue-500" },
    { id: "qualified", label: "Qualified", count: 0, color: "border-t-indigo-500" },
    { id: "discovery", label: "Discovery", count: 0, color: "border-t-purple-500" },
    { id: "proposal", label: "Proposal Sent", count: 0, color: "border-t-amber-500" },
    { id: "negotiation", label: "Negotiation", count: 0, color: "border-t-orange-500" },
    { id: "confirmed", label: "Closed-Won", count: 0, color: "border-t-green-500" }
  ];

  // Prepare cards
  const pipelineCards = sponsors.map(s => {
    let catColor = "bg-gray-100 text-gray-700";
    if (s.tier === 'platinum') catColor = "bg-gray-100 text-gray-700";
    if (s.tier === 'gold') catColor = "bg-orange-50 text-orange-700";
    if (s.tier === 'silver') catColor = "bg-blue-50 text-blue-700";
    if (s.tier === 'bronze') catColor = "bg-pink-50 text-pink-700";

    let action = "Review";
    if (s.status === 'lead') action = "Send initial outreach";
    if (s.status === 'qualified') action = "Set meeting";
    if (s.status === 'discovery') action = "Schedule demo";
    if (s.status === 'proposal') action = "Review proposal draft";
    if (s.status === 'negotiation') action = "Prepare contract";
    if (s.status === 'confirmed') action = "Onboarding";

    return {
      id: s.id,
      brand: s.company_name,
      value: `$${s.amount.toLocaleString()}`,
      fit: s.fit_score || 85,
      action: action,
      column: s.status,
      category: s.tier.charAt(0).toUpperCase() + s.tier.slice(1),
      catColor: catColor
    };
  });

  // Calculate counts
  pipelineColumns.forEach(col => {
    col.count = pipelineCards.filter(c => c.column === col.id).length;
  });

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4 min-w-[1200px]">
        {pipelineColumns.map((col) => {
          const cards = pipelineCards.filter(c => c.column === col.id);
          return (
            <div key={col.id} className="flex-1 min-w-[240px]">
              <div className={`bg-white rounded-t-lg border-t-4 ${col.color} p-3 border-x border-b border-gray-100 shadow-sm mb-3`}>
                <div className="flex justify-between items-center">
                   <span className="font-semibold text-sm text-[#1A1A1A]">{col.label}</span>
                   <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-bold">{col.count}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                {cards.map((card) => (
                  <motion.div
                    key={card.id}
                    layoutId={`card-${card.id}`}
                    onClick={() => onSelectSponsor ? onSelectSponsor(card.id) : onNavigate?.('sponsor-detail')}
                    className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="font-serif font-bold text-[#1A1A1A] text-lg">{card.brand}</div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide font-bold ${card.catColor}`}>
                        {card.category}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center mb-3">
                      <div className="text-sm font-semibold text-[#1A1A1A]">{card.value}</div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 font-medium" title="Fit Score">
                        <Sparkles className="w-3 h-3 text-[#A855F7]" />
                        {card.fit}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-50">
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Next Step</div>
                      <div className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1 group-hover:underline">
                        {card.action}
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {cards.length === 0 && (
                  <div className="h-24 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-xs text-gray-400 font-medium">
                    No deals
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
