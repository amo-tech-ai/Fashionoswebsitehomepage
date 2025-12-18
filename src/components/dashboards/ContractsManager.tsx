import { useState, useEffect } from "react";
import { 
  FileText, 
  PenTool, 
  DollarSign, 
  File, 
  Download, 
  Eye, 
  Sparkles, 
  Plus, 
  Filter, 
  Upload, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ChevronRight,
  MoreHorizontal,
  Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useBrandShoot } from '../../context/BrandShootContext';

// --- Types ---

type ContractStatus = 'Signed' | 'Pending' | 'Draft';
type DeliverableStatus = 'Pending' | 'Completed' | 'In Progress';

interface Contract {
  id: string;
  sponsorName: string;
  sponsorLogo: string; // simple placeholder or initials
  eventName: string;
  value: string; // pre-formatted for simplicity
  status: ContractStatus;
  date: string;
}

interface Deliverable {
  id: string;
  name: string;
  category: string;
  sponsor: string;
  event: string;
  dueDate: string;
  status: DeliverableStatus;
  owner: string;
}

// --- Mock Data ---

const contractsData: Contract[] = [
  {
    id: "1",
    sponsorName: "Chanel",
    sponsorLogo: "C",
    eventName: "NYFW SS25 – Runway Show",
    value: "$150,000",
    status: "Signed",
    date: "Aug 15, 2024"
  },
  {
    id: "2",
    sponsorName: "Dior",
    sponsorLogo: "D",
    eventName: "VIP Lounge Experience",
    value: "$120,000",
    status: "Pending",
    date: "Sep 01, 2024"
  },
  {
    id: "3",
    sponsorName: "Prada",
    sponsorLogo: "P",
    eventName: "Runway Branding",
    value: "$95,000",
    status: "Draft",
    date: "Sep 10, 2024"
  },
  {
    id: "4",
    sponsorName: "Versace",
    sponsorLogo: "V",
    eventName: "After Party Sponsorship",
    value: "$80,000",
    status: "Signed",
    date: "Aug 20, 2024"
  },
  {
    id: "5",
    sponsorName: "Gucci",
    sponsorLogo: "G",
    eventName: "Pop-up Activation",
    value: "$110,000",
    status: "Pending",
    date: "Sep 05, 2024"
  }
];

const deliverablesData: Deliverable[] = [
  {
    id: "1",
    name: "Instagram Story Post",
    category: "Digital",
    sponsor: "Dior",
    event: "NYFW SS25",
    dueDate: "Sep 14",
    status: "Pending",
    owner: "Social Team"
  },
  {
    id: "2",
    name: "Runway Branding",
    category: "On-Site",
    sponsor: "Prada",
    event: "Runway Show",
    dueDate: "Sep 12",
    status: "Completed",
    owner: "Production Team"
  },
  {
    id: "3",
    name: "VIP Gift Bags",
    category: "Logistics",
    sponsor: "Chanel",
    event: "VIP Lounge",
    dueDate: "Sep 15",
    status: "In Progress",
    owner: "Events Team"
  },
  {
    id: "4",
    name: "Press Release Approval",
    category: "PR",
    sponsor: "Gucci",
    event: "Pop-up",
    dueDate: "Sep 10",
    status: "Pending",
    owner: "PR Dept"
  },
  {
    id: "5",
    name: "Logo Placement Check",
    category: "Branding",
    sponsor: "Versace",
    event: "After Party",
    dueDate: "Sep 16",
    status: "Pending",
    owner: "Creative"
  }
];

// --- Components ---

function KPICard({ title, value, icon: Icon, trend }: { title: string, value: string, icon: any, trend?: string }) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between relative overflow-hidden group"
    >
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">{title}</p>
          <h3 className="text-3xl font-serif font-bold text-gray-900 mt-2">{value}</h3>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg text-gray-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center gap-2 text-xs text-emerald-600 font-medium relative z-10">
           <span>{trend}</span>
        </div>
      )}
      {/* Decorative Gradient Blur */}
      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}

function ContractCard({ contract }: { contract: Contract }) {
  const statusColors = {
    Signed: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Pending: "bg-amber-50 text-amber-700 border-amber-100",
    Draft: "bg-gray-100 text-gray-600 border-gray-200"
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#F7F7F7] p-6 rounded-xl border border-gray-200/60 hover:border-indigo-200 hover:shadow-md transition-all group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-serif font-bold shadow-sm">
            {contract.sponsorLogo}
          </div>
          <div>
            <h4 className="font-bold text-gray-900">{contract.sponsorName}</h4>
            <p className="text-xs text-gray-500">{contract.date}</p>
          </div>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[contract.status]}`}>
          {contract.status}
        </span>
      </div>

      <div className="mb-6 flex-grow">
        <h5 className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-wide text-[10px]">Event</h5>
        <p className="text-gray-900 font-medium mb-4 line-clamp-1">{contract.eventName}</p>
        
        <h5 className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-wide text-[10px]">Value</h5>
        <p className="text-xl font-serif text-gray-900">{contract.value}</p>
      </div>

      <div className="flex gap-2 mt-auto pt-4 border-t border-gray-200/60">
        <button className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors flex items-center justify-center gap-2">
          <Eye className="w-4 h-4" /> View
        </button>
        <button className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors flex items-center justify-center gap-2">
          <Download className="w-4 h-4" /> PDF
        </button>
      </div>
    </motion.div>
  );
}

function DeliverablesTable({ data }: { data: Deliverable[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 font-medium text-gray-500">Deliverable</th>
              <th className="px-6 py-4 font-medium text-gray-500">Category</th>
              <th className="px-6 py-4 font-medium text-gray-500">Sponsor</th>
              <th className="px-6 py-4 font-medium text-gray-500">Event</th>
              <th className="px-6 py-4 font-medium text-gray-500">Due Date</th>
              <th className="px-6 py-4 font-medium text-gray-500">Status</th>
              <th className="px-6 py-4 font-medium text-gray-500">Owner</th>
              <th className="px-6 py-4 font-medium text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item, idx) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 text-gray-600">
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-900 font-medium">{item.sponsor}</td>
                <td className="px-6 py-4 text-gray-600">{item.event}</td>
                <td className="px-6 py-4 text-gray-500 font-mono text-xs">{item.dueDate}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    item.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                    item.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                    'bg-indigo-50 text-indigo-700 border-indigo-100'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[10px] text-gray-500 font-bold">
                    {item.owner.charAt(0)}
                  </div>
                  {item.owner}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-300 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-4 h-4" />
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

function AISuggestionsBar() {
  return (
    <div className="w-full rounded-xl bg-gradient-to-r from-indigo-100 via-purple-50 to-white p-4 border border-indigo-100 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm relative overflow-hidden">
      {/* Animated Shine */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 translate-x-[-200%] animate-shimmer" />
      
      <div className="flex items-center gap-4 relative z-10">
        <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-indigo-50 flex items-center justify-center text-indigo-600">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-indigo-900 text-sm">AI Analysis</h4>
          <div className="flex items-center gap-3 text-sm text-indigo-800/80">
            <span className="flex items-center gap-1"><AlertCircle className="w-3 h-3 text-amber-500" /> 3 deliverables at risk</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">Sponsor Dior pending approval</span>
          </div>
        </div>
      </div>

      <button className="px-4 py-2 bg-white text-indigo-700 text-sm font-medium rounded-lg border border-indigo-100 shadow-sm hover:bg-indigo-50 transition-colors relative z-10 whitespace-nowrap">
        View Recommendations
      </button>
    </div>
  );
}

// --- Main Component ---

export function ContractsManager() {
  const { proposal, activeProjects } = useBrandShoot();
  const [activeTab, setActiveTab] = useState<'overview' | 'contracts' | 'deliverables' | 'ai'>('overview');

  // Merge Context Proposal into Contracts Data
  const dynamicContracts: Contract[] = [...contractsData];
  
  if (proposal) {
    dynamicContracts.unshift({
      id: "proposal-new",
      sponsorName: "Current Client", // Could derive from signals
      sponsorLogo: "★",
      eventName: proposal.category,
      value: `$${proposal.totalCost.toLocaleString()}`,
      status: "Draft",
      date: new Date().toLocaleDateString()
    });
  }

  // Also map active projects as Signed contracts
  activeProjects.forEach(project => {
      // Avoid dupes if possible, but for now just push
      if (project.id !== 'proposal-new') {
        dynamicContracts.push({
            id: `contract-${project.id}`,
            sponsorName: project.client,
            sponsorLogo: project.client.charAt(0),
            eventName: project.name,
            value: "Confidential",
            status: "Signed",
            date: project.date
        });
      }
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20 animate-in fade-in duration-500">
      
      {/* 1. HEADER */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-serif font-bold text-gray-900">Contracts & Deliverables</h1>
              <p className="text-sm text-gray-500 mt-1">Manage agreements, deliverables, and brand obligations</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-500 hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
              </button>
              <button className="px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm">
                <Upload className="w-4 h-4" /> Upload PDF
              </button>
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-md">
                <Plus className="w-4 h-4" /> New Contract
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 border-b border-gray-100">
            {['Overview', 'Contracts', 'Deliverables', 'AI Insights'].map((tab) => {
               const id = tab.toLowerCase().replace(' ', '') as any;
               const isActive = activeTab === id;
               return (
                 <button
                   key={tab}
                   onClick={() => setActiveTab(id)}
                   className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                     isActive 
                       ? 'border-indigo-600 text-indigo-600' 
                       : 'border-transparent text-gray-500 hover:text-gray-700'
                   }`}
                 >
                   {tab}
                 </button>
               );
            })}
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 space-y-8">
        
        {/* KPI Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <KPICard title="Active Contracts" value={String(activeProjects.length + 5)} icon={FileText} trend="+2 this month" />
          <KPICard title="Pending Signature" value={proposal ? "1" : "0"} icon={PenTool} />
          <KPICard title="Payments Received" value="$420k" icon={DollarSign} trend="85% of total" />
          <KPICard title="Drafts" value={proposal ? "1" : "0"} icon={File} />
        </div>

        {/* AI Suggestion Bar */}
        <AISuggestionsBar />

        {/* Dynamic Tab Content */}
        <AnimatePresence mode="wait">
          {(activeTab === 'overview' || activeTab === 'contracts') && (
            <motion.div
              key="contracts-section"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                 <h2 className="text-lg font-serif font-bold text-gray-900">Recent Contracts</h2>
                 {activeTab === 'overview' && (
                   <button onClick={() => setActiveTab('contracts')} className="text-sm text-indigo-600 font-medium hover:underline flex items-center gap-1">
                     View All <ChevronRight className="w-4 h-4" />
                   </button>
                 )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dynamicContracts.slice(0, activeTab === 'overview' ? 6 : undefined).map(contract => (
                  <ContractCard key={contract.id} contract={contract} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence mode="wait">
           {(activeTab === 'overview' || activeTab === 'deliverables') && (
            <motion.div
              key="deliverables-section"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
               <div className="flex items-center justify-between pt-4">
                 <h2 className="text-lg font-serif font-bold text-gray-900">Deliverables Tracking</h2>
                 {activeTab === 'overview' && (
                   <button onClick={() => setActiveTab('deliverables')} className="text-sm text-indigo-600 font-medium hover:underline flex items-center gap-1">
                     View All <ChevronRight className="w-4 h-4" />
                   </button>
                 )}
              </div>
              <DeliverablesTable data={deliverablesData} />
            </motion.div>
           )}
        </AnimatePresence>

        {activeTab === 'aiinsights' && (
          <motion.div
            key="ai-section"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-xl border border-gray-200 text-center min-h-[300px] flex flex-col items-center justify-center"
          >
             <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-indigo-600" />
             </div>
             <h3 className="text-xl font-serif font-bold text-gray-900">Deep Insights</h3>
             <p className="text-gray-500 mt-2 max-w-md">
               Gemini is analyzing your contract obligations and deliverable timelines. 
               Full report will appear here.
             </p>
          </motion.div>
        )}

      </div>
    </div>
  );
}
