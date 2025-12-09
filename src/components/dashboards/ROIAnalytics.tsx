import { useState } from "react";
import { 
  Download, 
  Calendar, 
  TrendingUp, 
  Eye, 
  DollarSign, 
  Ticket, 
  Sparkles, 
  ChevronRight,
  ArrowUpRight,
  MoreHorizontal,
  Filter
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { motion, AnimatePresence } from "motion/react";

// --- Mock Data ---

const dataImpressions = [
  { name: 'Day 1', value: 4000 },
  { name: 'Day 2', value: 3000 },
  { name: 'Day 3', value: 5500 },
  { name: 'Day 4', value: 4800 },
  { name: 'Day 5', value: 7200 },
  { name: 'Day 6', value: 6000 },
  { name: 'Day 7', value: 8500 },
];

const dataMediaValue = [
  { name: 'Social', value: 450000 },
  { name: 'Press', value: 300000 },
  { name: 'On-Site', value: 150000 },
  { name: 'Digital', value: 100000 },
];

const dataSponsorROI = [
  { name: 'Chanel', roi: 4.2, value: 420 },
  { name: 'Dior', roi: 3.8, value: 380 },
  { name: 'Gucci', roi: 3.5, value: 350 },
  { name: 'Prada', roi: 2.9, value: 290 },
  { name: 'Versace', roi: 3.1, value: 310 },
];

const sponsorTableData = [
  { id: 1, name: "Chanel", impressions: "1.2M", engagement: "5.1%", mediaValue: "$420k", roi: "4.2x", trend: "+12%" },
  { id: 2, name: "Dior", impressions: "980k", engagement: "4.8%", mediaValue: "$380k", roi: "3.8x", trend: "+8%" },
  { id: 3, name: "Gucci", impressions: "850k", engagement: "4.2%", mediaValue: "$350k", roi: "3.5x", trend: "-2%" },
  { id: 4, name: "Prada", impressions: "720k", engagement: "3.9%", mediaValue: "$290k", roi: "2.9x", trend: "+5%" },
  { id: 5, name: "Versace", impressions: "780k", engagement: "4.5%", mediaValue: "$310k", roi: "3.1x", trend: "+1%" },
];

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981'];

// --- Components ---

function KPICard({ title, value, trend, icon: Icon, gradient }: { title: string, value: string, trend: string, icon: any, gradient: string }) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className={`p-6 rounded-xl shadow-sm border border-white/50 relative overflow-hidden group ${gradient}`}
    >
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{title}</p>
          <h3 className="text-3xl font-serif font-bold text-gray-900 mt-2">{value}</h3>
        </div>
        <div className="p-2 bg-white/50 rounded-lg backdrop-blur-sm shadow-sm">
          <Icon className="w-5 h-5 text-gray-700" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 relative z-10">
        <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full flex items-center gap-1">
          <TrendingUp className="w-3 h-3" /> {trend}
        </span>
        <span className="text-xs text-gray-500 font-medium">vs last period</span>
      </div>
      
      {/* Decorative Glow */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/40 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500" />
    </motion.div>
  );
}

function InsightsPanel() {
  return (
    <div className="bg-gradient-to-br from-indigo-900 to-violet-900 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-md border border-white/20">
            <Sparkles className="w-5 h-5 text-indigo-200" />
          </div>
          <h3 className="font-serif text-xl font-medium">AI Insights</h3>
        </div>

        <div className="space-y-4 mb-6">
          {[
            { text: "Engagement trending +18% on Day 2 due to VIP arrivals.", type: "positive" },
            { text: "Chanel activation outperforming category average by 1.5x.", type: "positive" },
            { text: "Social sentiment dipped slightly during entry delays.", type: "warning" }
          ].map((insight, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/5 hover:bg-white/15 transition-colors cursor-pointer">
              <p className="text-sm leading-relaxed text-indigo-50">
                {insight.text}
              </p>
            </div>
          ))}
        </div>

        <button className="w-full py-2.5 bg-white text-indigo-900 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition-colors shadow-lg shadow-indigo-900/20">
          View Full Report
        </button>
      </div>
    </div>
  );
}

// --- Main Component ---

export function ROIAnalytics() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20 animate-in fade-in duration-500">
      
      {/* 1. HEADER */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-serif font-bold text-gray-900">ROI & Analytics</h1>
              <p className="text-sm text-gray-500 mt-1">Performance metrics across sponsors and activations</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm h-10 px-3 hover:border-gray-300 transition-colors cursor-pointer">
                <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Last 30 Days</span>
              </div>
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-md h-10">
                <Download className="w-4 h-4" /> Export Report
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 border-b border-gray-100">
            {['Overview', 'Sponsors', 'Events', 'Insights'].map((tab) => {
               const id = tab.toLowerCase();
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
        
        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard 
            title="Impressions" 
            value="2.4M" 
            trend="+12%" 
            icon={Eye} 
            gradient="bg-gradient-to-br from-purple-50 to-white"
          />
          <KPICard 
            title="Engagement" 
            value="4.7%" 
            trend="+0.8%" 
            icon={TrendingUp} 
            gradient="bg-gradient-to-br from-pink-50 to-white"
          />
          <KPICard 
            title="Media Value" 
            value="$680k" 
            trend="+24%" 
            icon={DollarSign} 
            gradient="bg-gradient-to-br from-indigo-50 to-white"
          />
          <KPICard 
            title="Ticket Sales" 
            value="$320k" 
            trend="+5%" 
            icon={Ticket} 
            gradient="bg-gradient-to-br from-blue-50 to-white"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Line Chart - Impressions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif font-bold text-gray-900">Impressions Over Time</h3>
              <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-5 h-5" /></button>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dataImpressions} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorImp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    itemStyle={{ color: '#4b5563' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorImp)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Pie Chart - Media Value */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif font-bold text-gray-900">Media Breakdown</h3>
              <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-5 h-5" /></button>
            </div>
            <div className="h-[300px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dataMediaValue}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {dataMediaValue.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
              {/* Center Label */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] text-center pointer-events-none">
                <p className="text-xs text-gray-400 font-medium uppercase">Total</p>
                <p className="text-xl font-bold text-gray-900">$1.0M</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Table + Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Sponsor ROI Table */}
          <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-serif font-bold text-gray-900 text-lg">Sponsor ROI Comparison</h3>
              <button className="text-sm text-indigo-600 font-medium hover:underline flex items-center gap-1">
                View All Sponsors <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-4 font-medium text-gray-500">Sponsor</th>
                    <th className="px-6 py-4 font-medium text-gray-500">Impressions</th>
                    <th className="px-6 py-4 font-medium text-gray-500">Engagement</th>
                    <th className="px-6 py-4 font-medium text-gray-500">Media Value</th>
                    <th className="px-6 py-4 font-medium text-gray-500">ROI %</th>
                    <th className="px-6 py-4 font-medium text-gray-500 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {sponsorTableData.map((row, idx) => (
                    <tr key={row.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4 font-bold text-gray-900">{row.name}</td>
                      <td className="px-6 py-4 text-gray-600">{row.impressions}</td>
                      <td className="px-6 py-4 text-gray-600">{row.engagement}</td>
                      <td className="px-6 py-4 text-gray-600">{row.mediaValue}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-emerald-600">{row.roi}</span>
                          <span className={`text-xs px-1.5 py-0.5 rounded ${
                            row.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                          }`}>
                            {row.trend}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors opacity-0 group-hover:opacity-100">
                           <ArrowUpRight className="w-4 h-4" />
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/30">
              <span className="text-xs text-gray-500">Showing 5 of 12 sponsors</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50">Prev</button>
                <button className="px-3 py-1 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded hover:bg-gray-50">Next</button>
              </div>
            </div>
          </div>

          {/* Insights Panel */}
          <div className="lg:col-span-1">
             <InsightsPanel />
          </div>

        </div>

      </div>
    </div>
  );
}
