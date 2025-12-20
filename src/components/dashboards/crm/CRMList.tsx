import React from "react";
import { Filter, MoreHorizontal } from "lucide-react";
import { useSponsor } from "../../../context/SponsorContext";

interface CRMListProps {
  onNavigate?: (screen: string) => void;
  onSelectSponsor?: (sponsorId: string) => void;
}

export function CRMList({ onNavigate, onSelectSponsor }: CRMListProps) {
  const { sponsors } = useSponsor();

  const tableData = sponsors.map(s => ({
    id: s.id, // Added ID
    brand: s.company_name,
    category: s.tier.charAt(0).toUpperCase() + s.tier.slice(1),
    budget: `$${s.amount.toLocaleString()}`,
    fit: s.fit_score || 85,
    owner: s.contact_name || "Unassigned",
    status: s.status.charAt(0).toUpperCase() + s.status.slice(1)
  }));

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-serif font-bold text-[#1A1A1A]">All Sponsors</h3>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-500 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-500 transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#F9FAFB] text-gray-500 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wide">Brand</th>
              <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wide">Category</th>
              <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wide">Budget</th>
              <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wide">Fit Score</th>
              <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wide">Owner</th>
              <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wide">Status</th>
              <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wide text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {tableData.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4 font-bold text-[#1A1A1A]">{row.brand}</td>
                <td className="px-6 py-4 text-gray-600 font-medium">{row.category}</td>
                <td className="px-6 py-4 text-gray-600 font-medium">{row.budget}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                    row.fit >= 90 ? 'bg-[#DCFCE7] text-[#166534]' :
                    row.fit >= 80 ? 'bg-[#F3E8FF] text-[#6B21A8]' :
                    'bg-[#FEF3C7] text-[#92400E]'
                  }`}>
                    {row.fit}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 font-medium">{row.owner}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      row.status === 'Proposal Sent' ? 'bg-[#D97706]' :
                      row.status === 'Qualified' ? 'bg-[#1A1A1A]' :
                      row.status === 'Discovery' ? 'bg-[#A855F7]' :
                      'bg-gray-400'
                    }`} />
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => onSelectSponsor ? onSelectSponsor(row.id) : onNavigate?.('sponsor-detail')}
                    className="text-[#1A1A1A] hover:underline font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
