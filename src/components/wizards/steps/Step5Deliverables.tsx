import React from "react";
import { FileText } from "lucide-react";
import { SectionTitle, GeminiButton, InsightBanner } from "../shared/WizardComponents";

export function Step5Deliverables() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center">
        <SectionTitle title="Deliverables Plan" subtitle="Track tasks across all production teams." />
        <GeminiButton label="Auto-Generate Plan" icon={FileText} />
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
         <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
               <tr>
                  <th className="px-6 py-4 font-bold text-[#1A1A1A]">Item</th>
                  <th className="px-6 py-4 font-bold text-[#1A1A1A]">Team / Owner</th>
                  <th className="px-6 py-4 font-bold text-[#1A1A1A]">Deadline</th>
                  <th className="px-6 py-4 font-bold text-[#1A1A1A]">Status</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
               {[
                 { task: "Runway Floorplan Final", team: "Production", date: "Sep 10", status: "Done" },
                 { task: "Lighting Plot", team: "Tech Director", date: "Sep 12", status: "Pending" },
                 { task: "Casting Confirmed", team: "Casting Dir", date: "Sep 14", status: "Risk" },
                 { task: "Sponsor Logos Vector", team: "Design", date: "Sep 15", status: "Pending" },
               ].map((row, i) => (
                 <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-[#1A1A1A]">{row.task}</td>
                    <td className="px-6 py-4 text-gray-600 flex items-center gap-2 font-medium">
                       <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500">
                          {row.team.charAt(0)}
                       </div>
                       {row.team}
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-mono text-xs">{row.date}</td>
                    <td className="px-6 py-4">
                       {row.status === 'Done' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#DCFCE7] text-[#166534]">Complete</span>}
                       {row.status === 'Pending' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FEF3C7] text-[#92400E]">Pending</span>}
                       {row.status === 'Risk' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FEE2E2] text-[#991B1B]">At Risk</span>}
                    </td>
                 </tr>
               ))}
            </tbody>
         </table>
      </div>

      <InsightBanner type="warning">
         <strong>Risk Detected:</strong> <em>Casting Confirmed</em> is due in 2 days but only 60% of models are locked. Recommended action: Send urgent follow-ups.
      </InsightBanner>
    </div>
  );
}
