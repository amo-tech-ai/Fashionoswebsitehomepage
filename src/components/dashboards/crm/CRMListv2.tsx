import React from "react";
import { EventSponsor } from "../../../lib/types/events.types";
import { MoreHorizontal, Sparkles, AlertCircle } from "lucide-react";

interface CRMListv2Props {
  sponsors: EventSponsor[];
  onSelectSponsor: (sponsorId: string) => void;
}

export function CRMListv2({ sponsors, onSelectSponsor }: CRMListv2Props) {
  
  const statusColors: Record<string, string> = {
    lead: "bg-blue-50 text-blue-700",
    qualified: "bg-indigo-50 text-indigo-700",
    discovery: "bg-purple-50 text-purple-700",
    proposal: "bg-amber-50 text-amber-700",
    negotiation: "bg-orange-50 text-orange-700",
    confirmed: "bg-emerald-50 text-emerald-700",
    fulfilled: "bg-green-50 text-green-700"
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Company</th>
            <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Value</th>
            <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Fit Score</th>
            <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Last Activity</th>
            <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {sponsors.map((sponsor) => (
            <tr 
              key={sponsor.id} 
              onClick={() => onSelectSponsor(sponsor.id)}
              className="hover:bg-gray-50 cursor-pointer transition-colors group"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center font-serif font-bold text-xs">
                    {sponsor.company_name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{sponsor.company_name}</div>
                    <div className="text-xs text-gray-500">{sponsor.industry}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wide ${statusColors[sponsor.status] || 'bg-gray-100 text-gray-600'}`}>
                  {sponsor.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="font-mono text-sm font-medium text-gray-900">
                  ${sponsor.amount.toLocaleString()}
                </div>
              </td>
              <td className="px-6 py-4">
                 <div className="flex items-center gap-2">
                    {sponsor.fit_score && sponsor.fit_score > 80 ? (
                        <div className="flex items-center gap-1 text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full text-xs font-bold">
                            <Sparkles className="w-3 h-3" />
                            {sponsor.fit_score}
                        </div>
                    ) : (
                        <span className="text-sm text-gray-500">{sponsor.fit_score || '-'}</span>
                    )}
                 </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-500">2 days ago</div>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="p-2 hover:bg-gray-200 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {sponsors.length === 0 && (
          <div className="p-12 text-center text-gray-500 text-sm">
              No sponsors found matching filters.
          </div>
      )}
    </div>
  );
}
