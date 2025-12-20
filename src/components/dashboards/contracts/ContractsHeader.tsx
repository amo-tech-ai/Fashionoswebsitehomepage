import { 
  Search, 
  Plus, 
  Upload 
} from "lucide-react";

interface ContractsHeaderProps {
  activeTab: string;
  onTabChange: (tab: any) => void;
}

export function ContractsHeader({ activeTab, onTabChange }: ContractsHeaderProps) {
  return (
    <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100/50 sticky top-0 z-30">
      <div className="max-w-[1600px] mx-auto px-6 py-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-xl font-serif font-medium text-[#111111] mb-1">Contracts & Deliverables</h1>
            <p className="text-xs text-gray-500 font-medium">Manage agreements, deliverables, and brand obligations.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 border border-transparent hover:border-gray-200 rounded-full transition-all">
              <Search className="w-5 h-5" />
            </button>
            <button className="px-5 py-2 bg-white text-[#111111] border border-gray-200 rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Upload className="w-4 h-4" /> Upload PDF
            </button>
            <button className="px-5 py-2 bg-[#111111] text-white rounded-xl text-xs font-bold hover:bg-black transition-colors flex items-center gap-2 shadow-lg shadow-black/5">
              <Plus className="w-4 h-4" /> New Contract
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-8 border-b border-gray-200/50">
          {['Overview', 'Contracts', 'Deliverables', 'AI Insights'].map((tab) => {
             const id = tab.toLowerCase().replace(' ', '');
             const isActive = activeTab === id;
             return (
               <button
                 key={tab}
                 onClick={() => onTabChange(id)}
                 className={`pb-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                   isActive 
                     ? 'border-[#111111] text-[#111111]' 
                     : 'border-transparent text-gray-400 hover:text-gray-600'
                 }`}
               >
                 {tab}
               </button>
             );
          })}
        </div>
      </div>
    </div>
  );
}
