import { motion } from "motion/react";
import { 
  Search, 
  Plus, 
  Upload, 
  MoreHorizontal, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Activity, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle,
  AlertCircle,
  Sparkles,
  ChevronRight,
  Filter
} from "lucide-react";

interface SponsorCRMProps {
  onNavigate?: (screen: string) => void;
}

export function SponsorCRM({ onNavigate }: SponsorCRMProps) {
  const kpis = [
    { label: "Total Sponsors", value: "84", trend: "+12% vs last season", positive: true },
    { label: "Deals In Pipeline", value: "32", trend: "4 closing this week", positive: true },
    { label: "Avg Fit Score", value: "82", trend: "+5 points", positive: true },
    { label: "Closed-Won", value: "$680k", trend: "Target: $1M", positive: true }
  ];

  const pipelineColumns = [
    { id: "leads", label: "New Leads", count: 12, color: "border-t-blue-500" },
    { id: "qualified", label: "Qualified", count: 8, color: "border-t-indigo-500" },
    { id: "discovery", label: "Discovery", count: 6, color: "border-t-purple-500" },
    { id: "proposal", label: "Proposal Sent", count: 4, color: "border-t-amber-500" },
    { id: "negotiation", label: "Negotiation", count: 3, color: "border-t-orange-500" },
    { id: "closed", label: "Closed-Won", count: 14, color: "border-t-green-500" }
  ];

  const pipelineCards = [
    { 
      id: 1, 
      brand: "Chanel", 
      value: "$75,000", 
      fit: 92, 
      action: "Review proposal draft", 
      column: "proposal", 
      category: "Luxury",
      catColor: "bg-gray-100 text-gray-700"
    },
    { 
      id: 2, 
      brand: "Dior", 
      value: "$150,000", 
      fit: 88, 
      action: "Prepare contract", 
      column: "negotiation",
      category: "Luxury",
      catColor: "bg-gray-100 text-gray-700" 
    },
    { 
      id: 3, 
      brand: "Puma", 
      value: "$40,000", 
      fit: 71, 
      action: "Set meeting", 
      column: "qualified",
      category: "Sportswear",
      catColor: "bg-orange-50 text-orange-700" 
    },
    { 
      id: 4, 
      brand: "Glossier", 
      value: "$25,000", 
      fit: 94, 
      action: "Send initial outreach", 
      column: "leads",
      category: "Beauty",
      catColor: "bg-pink-50 text-pink-700" 
    },
    { 
      id: 5, 
      brand: "Samsung", 
      value: "$100,000", 
      fit: 65, 
      action: "Schedule demo", 
      column: "discovery",
      category: "Tech",
      catColor: "bg-blue-50 text-blue-700" 
    }
  ];

  const tableData = [
    { brand: "Dior", category: "Luxury", budget: "75-100k", fit: 88, owner: "Sarah K.", status: "Proposal Sent" },
    { brand: "Puma", category: "Sportswear", budget: "20-40k", fit: 71, owner: "Daniel G.", status: "Qualified" },
    { brand: "Gucci", category: "Luxury", budget: "100-200k", fit: 94, owner: "Maria R.", status: "Discovery" },
    { brand: "Sephora", category: "Beauty", budget: "40-60k", fit: 85, owner: "Elena M.", status: "New Lead" },
    { brand: "Tesla", category: "Auto", budget: "150k+", fit: 62, owner: "James L.", status: "Negotiation" },
  ];

  const activities = [
    { text: "Call with Gucci completed", time: "2:14 PM", icon: Phone, color: "bg-[#DCFCE7] text-[#166534]" },
    { text: "Proposal sent to Prada", time: "Yesterday", icon: Mail, color: "bg-blue-50 text-blue-700" },
    { text: "Marie from Chanel viewed pitch deck", time: "Yesterday", icon: FileText, color: "bg-[#F3E8FF] text-[#6B21A8]" },
    { text: "New sponsor lead added: Fendi", time: "2 days ago", icon: Plus, color: "bg-gray-100 text-gray-600" },
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F5] font-sans pb-12">
      
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                <span>Sponsors</span>
                <span className="text-gray-300">/</span>
                <span className="text-[#1A1A1A]">CRM Dashboard</span>
              </div>
              <h1 className="text-2xl font-serif font-medium text-[#1A1A1A]">Sponsor CRM</h1>
              <p className="text-sm text-gray-500 font-medium">Manage sponsors, leads, and partnerships</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-center w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search sponsors..." 
                  className="w-full pl-10 pr-4 py-2 bg-[#F7F7F5] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] focus:bg-white transition-all text-[#1A1A1A]"
                />
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4" />
                  Import CSV
                </button>
                <button className="flex-1 sm:flex-none px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-sm">
                  <Plus className="w-4 h-4" />
                  New Sponsor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-8 space-y-6">
        
        {/* KPI Overview Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">{kpi.label}</div>
              <div className="flex items-end gap-3">
                <div className="text-2xl font-bold text-[#1A1A1A]">{kpi.value}</div>
                <div className={`text-xs mb-1.5 font-bold ${kpi.positive ? 'text-[#166534]' : 'text-[#991B1B]'}`}>
                  {kpi.trend}
                </div>
              </div>
              <div className="h-1 w-full bg-gray-100 mt-3 rounded-full overflow-hidden">
                <div className="h-full bg-[#1A1A1A] w-2/3 rounded-full group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          
          {/* Main Column: Kanban & Table (9 cols) */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* Kanban Board */}
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
                            onClick={() => onNavigate?.('sponsor-detail')}
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
                        
                        {/* Empty State Placeholder */}
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

            {/* Sponsor List Table */}
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
                            onClick={() => onNavigate?.('sponsor-detail')}
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

          </div>

          {/* Sidebar Column (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* AI Insights Card */}
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#333333] rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Sparkles className="w-24 h-24" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                    <Sparkles className="w-5 h-5 text-purple-200" />
                  </div>
                  <h3 className="font-serif font-bold text-lg">AI Insights</h3>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 transition-transform hover:scale-[1.02]">
                    <p className="text-sm text-gray-200 leading-relaxed font-medium">
                      <span className="text-white font-bold">Dior</span> has a <span className="text-[#DCFCE7] font-bold">92%</span> probability of conversion based on recent engagement.
                    </p>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 transition-transform hover:scale-[1.02]">
                    <div className="flex items-center gap-2 mb-1 text-[#FEF3C7] text-[10px] font-bold uppercase tracking-wider">
                      <AlertCircle className="w-3 h-3" />
                      Risk Alert
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed font-medium">
                      <span className="text-white font-bold">Adidas</span> shows risk: no interaction in 14 days.
                    </p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 transition-transform hover:scale-[1.02]">
                    <p className="text-sm text-gray-200 leading-relaxed font-medium">
                      <span className="text-white font-bold">Chanel's</span> engagement trend is <span className="text-[#DCFCE7] font-bold">+12%</span> week-over-week.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full py-2.5 bg-white text-black rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors shadow-sm">
                    Generate Proposal Suggestions
                  </button>
                  <button className="w-full py-2.5 bg-transparent border border-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
                    View Sponsor Fit Analysis
                  </button>
                </div>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-serif font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-gray-500" />
                Recent Activity
              </h3>
              <div className="space-y-6 relative pl-2">
                {/* Vertical Line */}
                <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gray-100" />
                
                {activities.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="relative flex gap-3 group">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 relative z-10 border-2 border-white shadow-sm ${item.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="pt-1">
                        <div className="text-sm text-[#1A1A1A] font-medium group-hover:text-black transition-colors">
                          {item.text}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5 font-medium">{item.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="w-full mt-4 py-2 text-xs text-gray-500 hover:text-black font-bold border-t border-gray-50 pt-3 uppercase tracking-wide">
                View All Activity
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
