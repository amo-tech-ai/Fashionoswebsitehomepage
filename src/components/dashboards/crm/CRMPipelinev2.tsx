import React from "react";
import { motion } from "motion/react";
import { Sparkles, AlertCircle } from "lucide-react";
import { EventSponsor } from "../../../lib/types/events.types";

interface CRMPipelinev2Props {
  sponsors: EventSponsor[];
  onSelectSponsor: (sponsorId: string) => void;
}

export function CRMPipelinev2({ sponsors, onSelectSponsor }: CRMPipelinev2Props) {
  
  const pipelineColumns = [
    { id: "lead", label: "New", color: "bg-blue-500" },
    { id: "qualified", label: "Qualified", color: "bg-indigo-500" },
    { id: "discovery", label: "Discovery", color: "bg-purple-500" },
    { id: "proposal", label: "Proposal", color: "bg-amber-500" },
    { id: "confirmed", label: "Closed", color: "bg-emerald-500" }
  ];

  return (
    <div className="flex gap-4 overflow-x-auto pb-6 min-h-[600px]">
      {pipelineColumns.map((col) => {
        // We map 'negotiation' to 'proposal' visually if needed, or just exclude it.
        // But better to just include it in 'Proposal' column logic if the user wants strictly 5 columns.
        // Let's assume 'negotiation' -> 'proposal' for this view or just show 'proposal'.
        // Actually, let's keep it simple: filter strictly by status.
        // If a sponsor is 'negotiation', it won't show up here unless we map it.
        // "Rule: Kanban columns: New, Qualified, Discovery, Proposal, Closed"
        // I will map 'negotiation' to 'proposal' for the column filter.
        
        const columnSponsors = sponsors.filter(s => {
            if (col.id === 'proposal') return s.status === 'proposal' || s.status === 'negotiation';
            if (col.id === 'confirmed') return s.status === 'confirmed' || s.status === 'fulfilled';
            return s.status === col.id;
        });
        
        const count = columnSponsors.length;

        return (
          <div key={col.id} className="min-w-[280px] w-[280px] flex-shrink-0 flex flex-col">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${col.color}`} />
                <span className="font-bold text-sm text-gray-900">{col.label}</span>
              </div>
              <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                {count}
              </span>
            </div>

            {/* Cards */}
            <div className="flex-1 space-y-3">
              {columnSponsors.map((sponsor) => (
                <motion.div
                  key={sponsor.id}
                  layoutId={`card-${sponsor.id}`}
                  onClick={() => onSelectSponsor(sponsor.id)}
                  whileHover={{ y: -2 }}
                  className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group relative overflow-hidden"
                >
                  {/* Hover Accent */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${col.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

                  <div className="flex justify-between items-start mb-2 pl-2">
                    <h3 className="font-serif font-bold text-gray-900 text-sm truncate pr-2">
                      {sponsor.company_name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pl-2">
                    <div className="text-sm font-semibold text-gray-900">
                       ${(sponsor.amount / 1000).toFixed(0)}k
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Tier Badge */}
                      <span className={`
                        text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border
                        ${sponsor.tier === 'platinum' ? 'bg-gray-100 text-gray-700 border-gray-200' :
                          sponsor.tier === 'gold' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                          'bg-gray-50 text-gray-500 border-gray-100'}
                      `}>
                        {sponsor.tier}
                      </span>
                    </div>
                  </div>

                  {/* Footer: Fit Score & Risk */}
                  <div className="mt-3 pt-2 border-t border-gray-50 flex items-center justify-between pl-2">
                     <div className="flex items-center gap-1">
                        {sponsor.fit_score && sponsor.fit_score > 85 ? (
                          <div className="flex items-center gap-1 text-[10px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded-full">
                            <Sparkles className="w-3 h-3" />
                            {sponsor.fit_score}
                          </div>
                        ) : (
                          <div className="text-[10px] font-bold text-gray-400">
                            Fit: {sponsor.fit_score || '-'}
                          </div>
                        )}
                     </div>

                     {sponsor.fit_score && sponsor.fit_score < 70 && (
                        <div className="flex items-center gap-1 text-amber-600">
                           <AlertCircle className="w-3 h-3" />
                        </div>
                     )}
                  </div>
                  
                </motion.div>
              ))}

              {count === 0 && (
                <div className="h-32 border border-dashed border-gray-200 rounded-xl flex items-center justify-center">
                  <span className="text-xs text-gray-400 font-medium">Empty</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
