import { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Calendar, 
  AlertCircle, 
  ArrowRight, 
  BarChart3, 
  Map, 
  Sparkles, 
  LayoutDashboard, 
  Globe, 
  Instagram, 
  Printer, 
  Monitor, 
  Users, 
  ShoppingBag,
  ListTodo,
  PieChart,
  ChevronRight
} from "lucide-react";

// Import the new detailed view and types
import { ActivationDetail, ActivationData, ActivationCategory, ActivationStatus } from "./ActivationDetail";

// --- Mock Data ---

const KPI_DATA = [
  { label: "Total Activations", value: "22", trend: "+4 this week", trendUp: true },
  { label: "Completed", value: "14", trend: "64% completion", trendUp: true },
  { label: "In Progress", value: "6", trend: "2 delayed", trendUp: false },
  { label: "Planned", value: "2", trend: "Next: Q3", trendUp: true },
];

const ACTIVATIONS: ActivationData[] = [
  {
    id: "1",
    name: "Chanel VIP Lounge",
    sponsor: "Chanel",
    sponsorLogo: "C",
    category: "VIP",
    location: "Hall B - VIP Zone",
    budget: "$120,000",
    status: "In Progress",
    progress: 68,
    startDate: "Sep 10",
    endDate: "Sep 12",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Gucci Runway Branding",
    sponsor: "Gucci",
    sponsorLogo: "G",
    category: "Runway",
    location: "Main Stage",
    budget: "$250,000",
    status: "Completed",
    progress: 100,
    startDate: "Sep 08",
    endDate: "Sep 08",
    image: "https://images.unsplash.com/photo-1509631179647-0177f6a864cd?q=80&w=2088&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Dior Website Takeover",
    sponsor: "Dior",
    sponsorLogo: "D",
    category: "Website",
    platform: "Homepage & Livestream",
    budget: "$45,000",
    status: "In Progress",
    progress: 45,
    startDate: "Sep 01",
    endDate: "Sep 15",
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Puma Social Media Collab",
    sponsor: "Puma",
    sponsorLogo: "P",
    category: "Social",
    platform: "Instagram / TikTok",
    budget: "$30,000",
    status: "Planned",
    progress: 15,
    startDate: "Sep 20",
    endDate: "Oct 05",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: "5",
    name: "Fendi Influencer Zone",
    sponsor: "Fendi",
    sponsorLogo: "F",
    category: "Experience",
    location: "Mezzanine Level",
    budget: "$75,000",
    status: "Completed",
    progress: 100,
    startDate: "Sep 09",
    endDate: "Sep 12",
    image: "https://images.unsplash.com/photo-1521572008054-9a58dedf2f9f?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "6",
    name: "Hermès Print Campaign",
    sponsor: "Hermès",
    sponsorLogo: "H",
    category: "Print",
    location: "Event Program / Signage",
    budget: "$25,000",
    status: "Completed",
    progress: 100,
    startDate: "Aug 15",
    endDate: "Sep 12",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop"
  },
  {
    id: "7",
    name: "Versace Digital Billboard",
    sponsor: "Versace",
    sponsorLogo: "V",
    category: "Digital",
    location: "Times Square Feed",
    budget: "$90,000",
    status: "In Progress",
    progress: 82,
    startDate: "Sep 05",
    endDate: "Sep 12",
    image: "https://images.unsplash.com/photo-1542204165-65926c4d5771?q=80&w=2070&auto=format&fit=crop"
  }
];

// --- Components ---

function StatusBadge({ status }: { status: ActivationStatus }) {
  const colors = {
    "Completed": "bg-green-100 text-green-700 border-green-200",
    "In Progress": "bg-indigo-100 text-indigo-700 border-indigo-200",
    "Planned": "bg-gray-100 text-gray-700 border-gray-200"
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[status]}`}>
      {status}
    </span>
  );
}

function CategoryIcon({ category }: { category: ActivationCategory }) {
  switch (category) {
    case "VIP": return <Users className="w-4 h-4" />;
    case "Runway": return <LayoutDashboard className="w-4 h-4" />;
    case "Website": return <Globe className="w-4 h-4" />;
    case "Social": return <Instagram className="w-4 h-4" />;
    case "Print": return <Printer className="w-4 h-4" />;
    case "Digital": return <Monitor className="w-4 h-4" />;
    case "Booth": return <ShoppingBag className="w-4 h-4" />;
    case "Experience": return <Sparkles className="w-4 h-4" />;
    default: return <LayoutDashboard className="w-4 h-4" />;
  }
}

interface ActivationsManagerProps {
  onNavigate?: (screen: string) => void;
}

export function ActivationsManager({ onNavigate }: ActivationsManagerProps) {
  const [selectedActivation, setSelectedActivation] = useState<ActivationData | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "In Progress", "Completed", "Planned", "Runway", "Website", "Social", "On-Site"];

  const filteredActivations = ACTIVATIONS.filter(item => {
    if (activeFilter === "All") return true;
    if (activeFilter === "On-Site") return ["VIP", "Booth", "Experience"].includes(item.category);
    if (["In Progress", "Completed", "Planned"].includes(activeFilter)) return item.status === activeFilter;
    return item.category === activeFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      <AnimatePresence mode="wait">
        {!selectedActivation ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
              <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                      <button onClick={() => onNavigate?.('events-list')} className="hover:text-indigo-600 transition-colors">Events</button>
                      <ChevronRight className="w-3 h-3" />
                      <span className="text-gray-900 font-medium">Activations</span>
                    </div>
                    <h1 className="text-2xl font-serif text-gray-900">Activations Manager</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage sponsor activations across event zones and digital channels</p>
                  </div>

                  <div className="flex items-center gap-3">
                     <div className="relative hidden md:block w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Search activations..." 
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                      />
                    </div>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap">
                      <Plus className="w-4 h-4" />
                      New Activation
                    </button>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto scrollbar-hide mt-6 pb-2">
                  {filters.map(filter => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                        activeFilter === filter 
                          ? "bg-gray-900 text-white border-gray-900" 
                          : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-8 space-y-8">
              
              {/* KPI Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {KPI_DATA.map((kpi, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden"
                  >
                    <div className="relative z-10">
                      <div className="text-sm text-gray-500 font-medium mb-1">{kpi.label}</div>
                      <div className="text-3xl font-serif text-gray-900 mb-2">{kpi.value}</div>
                      <div className={`text-xs font-medium flex items-center gap-1 ${kpi.trendUp ? 'text-green-600' : 'text-amber-600'}`}>
                        {kpi.trendUp ? '↑' : '↓'} {kpi.trend}
                      </div>
                    </div>
                    <div className="absolute right-0 top-0 w-24 h-24 bg-gray-50 rounded-full -mr-8 -mt-8 z-0 opacity-50" />
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-start">
                
                {/* Main Grid */}
                <div className="lg:col-span-2 xl:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                   <AnimatePresence mode="popLayout">
                     {filteredActivations.map((activation) => (
                       <ActivationCard 
                         key={activation.id} 
                         activation={activation} 
                         onClick={() => setSelectedActivation(activation)}
                       />
                     ))}
                   </AnimatePresence>
                   {/* Event Zone Map Card */}
                   <div className="md:col-span-2 xl:col-span-3 bg-white rounded-xl border border-gray-200 p-6 shadow-sm mt-4">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-lg font-serif text-gray-900">Event Zone Map</h3>
                          <p className="text-sm text-gray-500">Spatial visualization of on-site sponsor activations</p>
                        </div>
                        <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 flex items-center gap-1">
                          Open Detailed Layout <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="w-full h-64 bg-gray-100 rounded-lg relative border border-gray-200 overflow-hidden flex items-center justify-center">
                         <Map className="w-12 h-12 text-gray-300 mb-2" />
                         <div className="absolute inset-0 p-8">
                           {/* Abstract Map Visualization */}
                           <div className="w-full h-full border-2 border-dashed border-gray-300 rounded flex flex-col">
                             <div className="flex-1 flex">
                               <div className="w-1/3 border-r-2 border-dashed border-gray-300 flex items-center justify-center bg-indigo-50/50 text-xs text-indigo-800 font-medium p-2 text-center">
                                  VIP Area (3 Active)
                               </div>
                               <div className="flex-1 flex flex-col">
                                  <div className="h-2/3 border-b-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 text-xs text-gray-500">Runway Zone</div>
                                  <div className="flex-1 flex">
                                     <div className="flex-1 border-r-2 border-dashed border-gray-300 bg-purple-50/50 flex items-center justify-center text-[10px] text-purple-800">Booth A</div>
                                     <div className="flex-1 bg-purple-50/50 flex items-center justify-center text-[10px] text-purple-800">Booth B</div>
                                  </div>
                               </div>
                             </div>
                           </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* AI Sidebar */}
                <div className="space-y-6 sticky top-24">
                  <div className="bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                      <Sparkles className="w-32 h-32" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-6">
                        <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-sm">
                          <Sparkles className="w-4 h-4 text-indigo-200" />
                        </div>
                        <h3 className="font-medium text-lg font-serif">Gemini Insights</h3>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <p className="text-sm text-white/90 leading-snug">
                              <span className="font-medium text-white">VIP Lounge</span> activation is trending 10% behind schedule. Recommend expediting furniture vendor.
                            </p>
                          </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                          <div className="flex items-start gap-2">
                            <BarChart3 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                            <p className="text-sm text-white/90 leading-snug">
                              <span className="font-medium text-white">Digital activations</span> showing highest engagement potential based on pre-event traffic.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <button className="w-full py-2.5 bg-white text-indigo-900 text-xs font-medium rounded-lg hover:bg-indigo-50 transition-colors shadow-sm flex items-center justify-center gap-2">
                          <ListTodo className="w-3 h-3" /> Auto-create Tasks
                        </button>
                        <button className="w-full py-2.5 bg-indigo-900/50 text-white text-xs font-medium rounded-lg border border-white/20 hover:bg-indigo-900/70 transition-colors flex items-center justify-center gap-2">
                          <PieChart className="w-3 h-3" /> Optimization Plan
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <h3 className="font-medium text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-2">
                      <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors flex items-center justify-between group">
                        <span>Download Activation Report</span>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                      </button>
                      <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors flex items-center justify-between group">
                        <span>View Deliverables Master List</span>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                      </button>
                      <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors flex items-center justify-between group">
                        <span>Manage Sponsor Contracts</span>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="detail"
            className="min-h-screen bg-gray-50"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <ActivationDetail 
              activation={selectedActivation} 
              onBack={() => setSelectedActivation(null)} 
              onNavigate={onNavigate}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Using forwardRef to handle AnimatePresence properly
const ActivationCard = forwardRef<HTMLDivElement, { activation: ActivationData; onClick: () => void }>(
  ({ activation, onClick }, ref) => {
  return (
    <motion.div 
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden cursor-pointer group flex flex-col h-full"
    >
      <div className="h-32 relative overflow-hidden">
        <img src={activation.image} alt={activation.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-xs font-bold text-gray-900 shadow-md">
              {activation.sponsorLogo}
            </div>
            <div className="text-white">
              <div className="text-[10px] font-medium opacity-80 uppercase tracking-wider">{activation.sponsor}</div>
            </div>
          </div>
          <StatusBadge status={activation.status} />
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">{activation.name}</h3>
          <button className="text-gray-400 hover:text-gray-600 p-1 -mr-2">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <CategoryIcon category={activation.category} />
          <span>{activation.category}</span>
          <span>•</span>
          <span>{activation.location || activation.platform}</span>
        </div>

        <div className="mt-auto space-y-4">
           <div className="space-y-1.5">
             <div className="flex justify-between text-xs">
               <span className="text-gray-500">Progress</span>
               <span className="font-medium text-gray-900">{activation.progress}%</span>
             </div>
             <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
               <div 
                 className={`h-full rounded-full ${activation.status === 'Completed' ? 'bg-green-500' : 'bg-indigo-600'}`} 
                 style={{ width: `${activation.progress}%` }} 
               />
             </div>
           </div>

           <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
             <div className="text-gray-500">
               Budget: <span className="text-gray-900 font-medium">{activation.budget}</span>
             </div>
             <div className="flex items-center gap-1 text-gray-500">
               <Calendar className="w-3 h-3" />
               <span>{activation.endDate.split(' ')[0]} {activation.endDate.split(' ')[1]}</span>
             </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
});
ActivationCard.displayName = "ActivationCard";