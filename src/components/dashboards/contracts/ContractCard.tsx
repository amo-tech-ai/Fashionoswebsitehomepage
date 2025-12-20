import { Eye, Download } from "lucide-react";
import { motion } from "motion/react";

export interface Contract {
  id: string;
  sponsorName: string;
  sponsorLogo: string;
  eventName: string;
  value: string;
  status: 'Signed' | 'Pending' | 'Draft';
  date: string;
}

export function ContractCard({ contract }: { contract: Contract }) {
  const statusColors = {
    Signed: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Pending: "bg-amber-50 text-amber-700 border-amber-100",
    Draft: "bg-gray-50 text-gray-500 border-gray-200"
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-6 rounded-[24px] border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#111111] text-white rounded-full flex items-center justify-center font-serif text-lg font-medium shadow-sm">
            {contract.sponsorLogo}
          </div>
          <div>
            <h4 className="font-serif text-lg font-medium text-[#111111]">{contract.sponsorName}</h4>
            <p className="text-xs text-gray-500">{contract.date}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusColors[contract.status]}`}>
          {contract.status}
        </span>
      </div>

      <div className="mb-8 flex-grow">
        <div className="space-y-4">
            <div>
                <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Event</h5>
                <p className="text-sm text-[#111111] font-medium">{contract.eventName}</p>
            </div>
            <div>
                <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Value</h5>
                <p className="text-xl font-serif text-[#111111]">{contract.value}</p>
            </div>
        </div>
      </div>

      <div className="flex gap-3 mt-auto pt-5 border-t border-gray-50">
        <button className="flex-1 h-10 bg-[#F8F5F1] rounded-full text-xs font-medium text-[#111111] hover:bg-[#EBE5DE] transition-colors flex items-center justify-center gap-2">
          <Eye className="w-3.5 h-3.5" /> View
        </button>
        <button className="flex-1 h-10 bg-white border border-gray-200 rounded-full text-xs font-medium text-[#111111] hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
          <Download className="w-3.5 h-3.5" /> PDF
        </button>
      </div>
    </motion.div>
  );
}
