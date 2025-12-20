import { useState } from "react";
import { 
  FileText, 
  PenTool, 
  DollarSign, 
  File, 
  ChevronRight 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useBrandShoot } from '../../context/BrandShootContext';

// Local Components
import { ContractsHeader } from "./contracts/ContractsHeader";
import { KPICard } from "./contracts/KPICard";
import { ContractCard, Contract } from "./contracts/ContractCard";
import { DeliverablesTable, Deliverable } from "./contracts/DeliverablesTable";
import { AIContractAnalysis } from "./contracts/AIContractAnalysis";

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

// --- Main Component ---

export function ContractsManager() {
  const { proposal, activeProjects } = useBrandShoot();
  const [activeTab, setActiveTab] = useState<'overview' | 'contracts' | 'deliverables' | 'aiinsights'>('overview');

  // Merge Context Proposal into Contracts Data
  const dynamicContracts: Contract[] = [...contractsData];
  
  if (proposal) {
    dynamicContracts.unshift({
      id: "proposal-new",
      sponsorName: "Current Client", 
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
    <div className="min-h-screen bg-[#FAFAFA] pb-20 animate-in fade-in duration-500 font-sans text-[#111111]">
      
      {/* 1. HEADER */}
      <ContractsHeader activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 2. MAIN CONTENT */}
      <div className="max-w-[1600px] mx-auto px-6 py-8 space-y-10">
        
        {/* KPI Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard title="Active Contracts" value={String(activeProjects.length + 5)} icon={FileText} trend="+2 this month" />
          <KPICard title="Pending Signature" value={proposal ? "1" : "0"} icon={PenTool} />
          <KPICard title="Payments Received" value="$420k" icon={DollarSign} trend="85% of total" />
          <KPICard title="Drafts" value={proposal ? "1" : "0"} icon={File} />
        </div>

        {/* Dynamic Tab Content */}
        <AnimatePresence mode="wait">
          {(activeTab === 'overview' || activeTab === 'contracts') && (
            <motion.div
              key="contracts-section"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                 <h2 className="text-xl font-serif font-medium text-[#111111]">Recent Contracts</h2>
                 {activeTab === 'overview' && (
                   <button onClick={() => setActiveTab('contracts')} className="text-sm text-[#111111] font-medium hover:underline flex items-center gap-1">
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
              className="space-y-6"
            >
               <div className="flex items-center justify-between pt-4">
                 <h2 className="text-xl font-serif font-medium text-[#111111]">Deliverables Tracking</h2>
                 {activeTab === 'overview' && (
                   <button onClick={() => setActiveTab('deliverables')} className="text-sm text-[#111111] font-medium hover:underline flex items-center gap-1">
                     View All <ChevronRight className="w-4 h-4" />
                   </button>
                 )}
              </div>
              <DeliverablesTable data={deliverablesData} />
            </motion.div>
           )}
        </AnimatePresence>

        {activeTab === 'aiinsights' && (
           <AIContractAnalysis />
        )}

      </div>
    </div>
  );
}
