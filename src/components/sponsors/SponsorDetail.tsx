import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  BarChart3, 
  FileText, 
  Layers, 
  PieChart, 
  Folder, 
  MoreHorizontal, 
  Plus, 
  Sparkles, 
  ArrowUpRight, 
  Mail, 
  Phone, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Filter, 
  Search,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  DollarSign,
  Briefcase,
  Paperclip,
  Share2,
  Edit,
  Star,
  MapPin,
  UploadCloud
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart as RePieChart,
  Pie
} from "recharts";

// --- Types & Mock Data ---

type Tab = 'overview' | 'contacts' | 'deals' | 'deliverables' | 'activations' | 'roi' | 'files';

const sponsorData = {
  name: "Chanel",
  tier: "Platinum",
  logo: "C", // Placeholder for letter logo
  industry: "Luxury Fashion",
  summary: "Luxury fashion house — active sponsor for NYFW SS25.",
  since: "2018",
  renewalProb: "High",
  kpis: {
    contractValue: "$150,000",
    deliverables: { completed: 14, total: 18 },
    activeActivations: 4,
    roi: "4.2x"
  }
};

const contacts = [
  { id: 1, name: "Marie Dupont", role: "Brand Director", email: "marie.d@chanel.com", phone: "+33 6 12 34 56 78", image: "MD", main: true },
  { id: 2, name: "Jean-Luc Picard", role: "Event Manager", email: "jl.picard@chanel.com", phone: "+33 6 98 76 54 32", image: "JL", main: false },
];

const deals = [
  { id: 1, name: "SS25 Runway Headline", stage: "Won", amount: "$150,000", prob: "100%", owner: "Alexandra M." },
  { id: 2, name: "FW25 Early Bird", stage: "Negotiation", amount: "$180,000", prob: "75%", owner: "Alexandra M." },
  { id: 3, name: "Digital Campaign Q4", stage: "Proposal Sent", amount: "$45,000", prob: "40%", owner: "Marco R." },
];

const deliverables = [
  { id: 1, name: "Logo on Step & Repeat", category: "On-Site", due: "Sep 10", status: "Completed", owner: "Ops Team" },
  { id: 2, name: "Social Media Teaser", category: "Digital", due: "Sep 05", status: "Completed", owner: "Marketing" },
  { id: 3, name: "VIP Gift Bags", category: "On-Site", due: "Sep 12", status: "In Review", owner: "Sponsorship" },
  { id: 4, name: "Post-Event Recap", category: "Reporting", due: "Sep 20", status: "Pending", owner: "Account Mgr" },
];

const activations = [
  { id: 1, name: "VIP Lounge Experience", zone: "Zone A - Mezzanine", budget: "$45,000", progress: 68, status: "Active" },
  { id: 2, name: "Runway Branding", zone: "Main Stage", budget: "$20,000", progress: 100, status: "Completed" },
  { id: 3, name: "Backstage Beauty Bar", zone: "Backstage", budget: "$15,000", progress: 30, status: "Active" },
];

const files = [
  { id: 1, name: "Chanel_SS25_Contract_Signed.pdf", type: "PDF", size: "2.4 MB", date: "Aug 15, 2024" },
  { id: 2, name: "Brand_Guidelines_2025.pdf", type: "PDF", size: "18 MB", date: "Aug 10, 2024" },
  { id: 3, name: "Logo_Pack_Vector.zip", type: "ZIP", size: "45 MB", date: "Aug 10, 2024" },
];

const chartDataROI = [
  { month: 'Jan', roi: 1.2 },
  { month: 'Feb', roi: 1.8 },
  { month: 'Mar', roi: 2.1 },
  { month: 'Apr', roi: 2.4 },
  { month: 'May', roi: 3.8 },
  { month: 'Jun', roi: 4.2 },
];

// --- Components ---

function KPICard({ label, value, sub, icon: Icon }: { label: string, value: string, sub?: string, icon: any }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</span>
        <div className="p-2 bg-gray-50 rounded-lg text-gray-500">
           <Icon className="w-4 h-4" />
        </div>
      </div>
      <div>
        <div className="text-2xl font-serif font-medium text-gray-900 mb-1">{value}</div>
        {sub && <div className="text-xs text-gray-500">{sub}</div>}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    'Completed': 'bg-emerald-50 text-emerald-700 border-emerald-100',
    'Won': 'bg-emerald-50 text-emerald-700 border-emerald-100',
    'Active': 'bg-indigo-50 text-indigo-700 border-indigo-100',
    'In Review': 'bg-amber-50 text-amber-700 border-amber-100',
    'Negotiation': 'bg-amber-50 text-amber-700 border-amber-100',
    'Pending': 'bg-gray-100 text-gray-600 border-gray-200',
    'Proposal Sent': 'bg-blue-50 text-blue-700 border-blue-100',
  };
  const defaultStyle = 'bg-gray-100 text-gray-600 border-gray-200';
  
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${styles[status as keyof typeof styles] || defaultStyle}`}>
      {status}
    </span>
  );
}

function GeminiInsight({ text, actions }: { text: string, actions: { label: string, icon?: any }[] }) {
  return (
    <div className="bg-gradient-to-br from-indigo-900 to-violet-800 rounded-xl p-6 text-white shadow-lg relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
        <Sparkles className="w-24 h-24" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-md border border-white/20">
            <Sparkles className="w-4 h-4 text-indigo-200" />
          </div>
          <span className="text-xs font-bold text-indigo-200 uppercase tracking-wider">AI Insight</span>
        </div>
        <p className="text-lg font-medium leading-relaxed mb-6 font-serif">{text}</p>
        <div className="flex flex-wrap gap-2">
          {actions.map((action, i) => (
            <button key={i} className="px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-xs font-medium transition-all flex items-center gap-2">
              {action.icon && <action.icon className="w-3 h-3" />}
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Tabs Content ---

function OverviewTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Left Column */}
      <div className="lg:col-span-2 space-y-6">
        {/* Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
             <h3 className="font-serif text-lg font-medium text-gray-900">Sponsor Profile</h3>
             <button className="text-gray-400 hover:text-indigo-600"><Edit className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-4">
                <div>
                   <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Industry</div>
                   <div className="text-sm font-medium text-gray-900">{sponsorData.industry}</div>
                </div>
                <div>
                   <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Partnership Since</div>
                   <div className="text-sm font-medium text-gray-900">{sponsorData.since}</div>
                </div>
             </div>
             <div className="space-y-4">
                <div>
                   <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Brand Fit Score</div>
                   <div className="flex items-center gap-2">
                      <div className="flex text-amber-400">
                         <Star className="w-4 h-4 fill-current" />
                         <Star className="w-4 h-4 fill-current" />
                         <Star className="w-4 h-4 fill-current" />
                         <Star className="w-4 h-4 fill-current" />
                         <Star className="w-4 h-4 fill-current text-gray-200" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">4.0/5.0</span>
                   </div>
                </div>
                <div>
                   <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Renewal Probability</div>
                   <div className="text-sm font-medium text-emerald-600">{sponsorData.renewalProb}</div>
                </div>
             </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-100">
             <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Description</div>
             <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
                Chanel is a French luxury fashion house founded in 1910 by Coco Chanel in Paris. It focuses on women's high fashion and ready-to-wear clothes, luxury goods, and accessories. A key partner for our high-end runway segments.
             </p>
          </div>
        </div>

        {/* Performance Snapshot */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
           <h3 className="font-serif text-lg font-medium text-gray-900 mb-6">Performance Snapshot</h3>
           <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={chartDataROI}>
                    <defs>
                       <linearGradient id="colorRoi" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Area type="monotone" dataKey="roi" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorRoi)" />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <GeminiInsight 
          text="Chanel engagement is trending +12% this week compared to category average. High probability of conversion for 2025 renewal."
          actions={[
             { label: "Generate Proposal", icon: FileText },
             { label: "Predict ROI", icon: TrendingUp }
          ]}
        />
        
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
           <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg font-medium text-gray-900">Active Activations</h3>
              <button className="p-1 hover:bg-gray-100 rounded-full"><Plus className="w-4 h-4 text-gray-500" /></button>
           </div>
           <div className="space-y-4">
              {activations.slice(0, 2).map(act => (
                 <div key={act.id} className="p-4 border border-gray-100 rounded-lg hover:border-gray-300 transition-colors group">
                    <div className="flex justify-between items-start mb-2">
                       <div className="font-medium text-gray-900">{act.name}</div>
                       <StatusBadge status={act.status} />
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
                       <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${act.progress}%` }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-xs text-gray-500">{act.progress}% Complete</span>
                       <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity">Manage</button>
                    </div>
                 </div>
              ))}
           </div>
           <button className="w-full mt-4 py-2 text-sm text-gray-600 font-medium hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              View All Activations
           </button>
        </div>
      </div>
    </div>
  );
}

function ContactsTab() {
   return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
         <div className="flex justify-end mb-6">
            <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
               <Plus className="w-4 h-4" /> Add Contact
            </button>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map(contact => (
               <div key={contact.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex items-start justify-between mb-4">
                     <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-serif font-medium text-gray-600">
                        {contact.image}
                     </div>
                     {contact.main && <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase rounded-full">Main Contact</span>}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{contact.name}</h3>
                  <div className="text-sm text-gray-500 mb-6">{contact.role}</div>
                  
                  <div className="space-y-3">
                     <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <a href={`mailto:${contact.email}`} className="hover:text-indigo-600 transition-colors">{contact.email}</a>
                     </div>
                     <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{contact.phone}</span>
                     </div>
                  </div>
                  
                  <div className="flex gap-2 mt-6 pt-6 border-t border-gray-100">
                     <button className="flex-1 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Log Meeting</button>
                     <button className="flex-1 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">Message</button>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}

function DealsTab() {
   return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
         {/* Pipeline Visual */}
         <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-serif text-lg font-medium text-gray-900 mb-6">Opportunity Pipeline</h3>
            <div className="flex items-center justify-between gap-2">
               {['Discovery', 'Proposal', 'Negotiation', 'Won'].map((stage, i) => (
                  <div key={stage} className="flex-1 flex flex-col gap-2 relative group cursor-pointer">
                     <div className={`h-2 rounded-full w-full ${i === 3 ? 'bg-emerald-500' : 'bg-gray-100 group-hover:bg-indigo-100 transition-colors'}`}></div>
                     <span className="text-xs font-medium text-gray-500 text-center uppercase tracking-wide">{stage}</span>
                     {i === 3 && (
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white shadow-lg border border-gray-100 rounded-lg p-3 w-40 z-10 hidden group-hover:block">
                           <div className="text-xs text-gray-400 mb-1">Total Value</div>
                           <div className="font-medium text-emerald-600">$150,000</div>
                           <div className="text-xs text-gray-400 mt-1">1 Deal</div>
                        </div>
                     )}
                  </div>
               ))}
            </div>
         </div>

         {/* Deals Table */}
         <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
               <h3 className="font-serif text-lg font-medium text-gray-900">Active Deals</h3>
               <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                  <Plus className="w-4 h-4" /> New Deal
               </button>
            </div>
            <table className="w-full text-left text-sm">
               <thead>
                  <tr className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                     <th className="px-6 py-4 font-serif text-gray-900">Deal Name</th>
                     <th className="px-6 py-4">Stage</th>
                     <th className="px-6 py-4">Amount</th>
                     <th className="px-6 py-4">Probability</th>
                     <th className="px-6 py-4">Owner</th>
                     <th className="px-6 py-4"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {deals.map(deal => (
                     <tr key={deal.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{deal.name}</td>
                        <td className="px-6 py-4"><StatusBadge status={deal.stage} /></td>
                        <td className="px-6 py-4 font-mono text-gray-600">{deal.amount}</td>
                        <td className="px-6 py-4 text-gray-500">{deal.prob}</td>
                        <td className="px-6 py-4 text-gray-600">{deal.owner}</td>
                        <td className="px-6 py-4 text-right"><button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-4 h-4" /></button></td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}

function DeliverablesTab() {
   return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
         {/* Progress Header */}
         <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 w-full">
               <div className="flex justify-between items-end mb-2">
                  <div>
                     <h3 className="font-serif text-lg font-medium text-gray-900">Overall Progress</h3>
                     <p className="text-sm text-gray-500">14 of 18 deliverables completed</p>
                  </div>
                  <span className="text-2xl font-medium text-indigo-600">78%</span>
               </div>
               <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '78%' }}></div>
               </div>
            </div>
            <div className="md:border-l md:border-gray-100 md:pl-6 w-full md:w-auto">
               <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 flex gap-3 max-w-sm">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <div>
                     <p className="text-xs font-bold text-amber-700 uppercase mb-0.5">Gemini Risk Alert</p>
                     <p className="text-sm text-amber-800 leading-snug">3 deliverables are at risk of missing deadlines. Recommended timeline adjustment.</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Table */}
         <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
               <thead>
                  <tr className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                     <th className="px-6 py-4 font-serif text-gray-900">Deliverable</th>
                     <th className="px-6 py-4">Category</th>
                     <th className="px-6 py-4">Due Date</th>
                     <th className="px-6 py-4">Status</th>
                     <th className="px-6 py-4">Owner</th>
                     <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {deliverables.map(item => (
                     <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                        <td className="px-6 py-4"><span className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-600 text-xs font-medium">{item.category}</span></td>
                        <td className="px-6 py-4 text-gray-500">{item.due}</td>
                        <td className="px-6 py-4"><StatusBadge status={item.status} /></td>
                        <td className="px-6 py-4 text-gray-600">{item.owner}</td>
                        <td className="px-6 py-4 text-right">
                           <button className="text-indigo-600 hover:text-indigo-800 font-medium text-xs">View Details</button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}

function ActivationsTab() {
   return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
         <div className="flex justify-end mb-6">
            <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
               <Plus className="w-4 h-4" /> New Activation
            </button>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activations.map(act => (
               <div key={act.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
                  <div className="h-32 bg-gray-100 relative">
                     <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                        <Briefcase className="w-8 h-8 opacity-50" />
                     </div>
                     <div className="absolute top-3 right-3">
                        <StatusBadge status={act.status} />
                     </div>
                  </div>
                  <div className="p-6">
                     <h3 className="font-serif text-lg font-medium text-gray-900 mb-1">{act.name}</h3>
                     <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <MapPinIcon className="w-3 h-3" /> {act.zone}
                     </div>
                     
                     <div className="space-y-4 mb-6">
                        <div>
                           <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-500">Progress</span>
                              <span className="font-medium text-gray-900">{act.progress}%</span>
                           </div>
                           <div className="w-full bg-gray-100 rounded-full h-1.5">
                              <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${act.progress}%` }}></div>
                           </div>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                           <span className="text-gray-500">Budget</span>
                           <span className="font-mono font-medium text-gray-900">{act.budget}</span>
                        </div>
                     </div>
                     
                     <div className="grid grid-cols-2 gap-2">
                        <button className="py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">View Tasks</button>
                        <button className="py-2 bg-gray-50 text-gray-900 rounded-lg text-xs font-medium hover:bg-gray-100 transition-colors">Details</button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}

function ROITab() {
   return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
         {/* KPI Bar */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KPICard label="Impressions" value="1.2M" sub="+12% vs last year" icon={Share2} />
            <KPICard label="Engagement" value="5.1%" sub="Top 5% of sponsors" icon={Users} />
            <KPICard label="Media Value" value="$420k" sub="Estimated" icon={DollarSign} />
            <KPICard label="ROI Multiplier" value="4.2x" sub="High Performance" icon={TrendingUp} />
         </div>

         {/* Charts Row */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-80">
               <h3 className="font-serif text-lg font-medium text-gray-900 mb-6">ROI Over Time</h3>
               <ResponsiveContainer width="100%" height="80%">
                  <LineChart data={chartDataROI}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                     <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                     <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                     <Tooltip />
                     <Line type="monotone" dataKey="roi" stroke="#4f46e5" strokeWidth={2} dot={{r: 4, fill: '#4f46e5'}} activeDot={{r: 6}} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
            
            <div className="space-y-6">
               <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex-1">
                  <h3 className="font-serif text-lg font-medium text-gray-900 mb-2">Media Value Attribution</h3>
                  <div className="space-y-3 mt-4">
                     {[
                        { label: 'Social Media', val: 45, color: 'bg-indigo-500' },
                        { label: 'On-Site Branding', val: 30, color: 'bg-purple-500' },
                        { label: 'Digital Press', val: 15, color: 'bg-emerald-500' },
                        { label: 'Direct', val: 10, color: 'bg-amber-500' }
                     ].map(item => (
                        <div key={item.label}>
                           <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-600">{item.label}</span>
                              <span className="font-medium text-gray-900">{item.val}%</span>
                           </div>
                           <div className="w-full bg-gray-100 rounded-full h-1.5">
                              <div className={`${item.color} h-1.5 rounded-full`} style={{ width: `${item.val}%` }} />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               
               <GeminiInsight 
                  text="Based on current trendlines, adding 1 activation zone could increase overall ROI by approximately ~18%."
                  actions={[
                     { label: "Generate ROI Report", icon: FileText },
                     { label: "Export PDF", icon: Download }
                  ]}
               />
            </div>
         </div>
      </div>
   );
}

function FilesTab() {
   return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
         <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
               <h3 className="font-serif text-lg font-medium text-gray-900">Document Repository</h3>
               <div className="flex items-center gap-2">
                  <div className="relative">
                     <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                     <input type="text" placeholder="Search files..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                  </div>
                  <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                     <UploadCloud className="w-4 h-4" /> Upload
                  </button>
               </div>
            </div>

            {/* Drag Drop Zone */}
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 mb-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer">
               <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-3">
                  <UploadCloud className="w-6 h-6" />
               </div>
               <p className="text-sm font-medium text-gray-900">Click to upload or drag and drop</p>
               <p className="text-xs text-gray-500 mt-1">PDF, DOCX, JPG, PNG up to 50MB</p>
            </div>

            {/* Files List */}
            <div className="space-y-3">
               {files.map(file => (
                  <div key={file.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors group">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
                           <FileText className="w-5 h-5" />
                        </div>
                        <div>
                           <div className="font-medium text-sm text-gray-900 group-hover:text-indigo-600 transition-colors">{file.name}</div>
                           <div className="text-xs text-gray-500 flex items-center gap-2">
                              <span>{file.size}</span>
                              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                              <span>{file.date}</span>
                           </div>
                        </div>
                     </div>
                     <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-white"><Download className="w-4 h-4" /></button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-white"><MoreHorizontal className="w-4 h-4" /></button>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}

// --- Icons Helpers ---
function MapPinIcon({ className }: { className?: string }) { return <MapPin className={className} />; }

// --- Main Page Component ---

interface SponsorDetailProps {
  onNavigate?: (screen: string) => void;
}

export function SponsorDetail({ onNavigate }: SponsorDetailProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const tabs: { id: Tab, label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'contacts', label: 'Contacts' },
    { id: 'deals', label: 'Deals' },
    { id: 'deliverables', label: 'Deliverables' },
    { id: 'activations', label: 'Activations' },
    { id: 'roi', label: 'ROI & Analytics' },
    { id: 'files', label: 'Files' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans text-gray-900">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 pt-6 pb-0">
          
          <div className="mb-6">
            <button 
              onClick={() => onNavigate?.('sponsors')}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sponsors
            </button>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8">
            <div className="flex items-start gap-5">
               <div className="w-20 h-20 rounded-xl bg-gray-900 text-white flex items-center justify-center text-3xl font-serif">
                  {sponsorData.logo}
               </div>
               <div>
                  <div className="flex items-center gap-3 mb-1">
                     <h1 className="text-2xl font-serif font-bold text-gray-900">{sponsorData.name}</h1>
                     <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase border border-indigo-100">{sponsorData.tier}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-3">{sponsorData.summary}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                     <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {sponsorData.industry}</span>
                     <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Since {sponsorData.since}</span>
                  </div>
               </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
               <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full border border-indigo-100 text-indigo-700 text-xs font-bold mr-2">
                  <Sparkles className="w-3 h-3" /> AI Powered
               </div>
               <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Edit Sponsor</button>
               <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Add Note</button>
               <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">New Activation</button>
            </div>
          </div>

          {/* KPI Row (Header) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
             <div className="px-4 py-3 border-l-2 border-gray-100">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Contract Value</div>
                <div className="text-lg font-medium text-gray-900">{sponsorData.kpis.contractValue}</div>
             </div>
             <div className="px-4 py-3 border-l-2 border-gray-100">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Deliverables</div>
                <div className="text-lg font-medium text-gray-900 flex items-center gap-2">
                   {sponsorData.kpis.deliverables.completed}/{sponsorData.kpis.deliverables.total}
                   <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-1.5 rounded">78%</span>
                </div>
             </div>
             <div className="px-4 py-3 border-l-2 border-gray-100">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Active Activations</div>
                <div className="text-lg font-medium text-gray-900">{sponsorData.kpis.activeActivations}</div>
             </div>
             <div className="px-4 py-3 border-l-2 border-gray-100">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">ROI Score</div>
                <div className="text-lg font-medium text-indigo-600">{sponsorData.kpis.roi}</div>
             </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
             {tabs.map(tab => (
                <button
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id)}
                   className={`pb-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                      activeTab === tab.id 
                      ? "border-gray-900 text-gray-900" 
                      : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"
                   }`}
                >
                   {tab.label}
                </button>
             ))}
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-8">
         <AnimatePresence mode="wait">
            <motion.div
               key={activeTab}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.2 }}
            >
               {activeTab === 'overview' && <OverviewTab />}
               {activeTab === 'contacts' && <ContactsTab />}
               {activeTab === 'deals' && <DealsTab />}
               {activeTab === 'deliverables' && <DeliverablesTab />}
               {activeTab === 'activations' && <ActivationsTab />}
               {activeTab === 'roi' && <ROITab />}
               {activeTab === 'files' && <FilesTab />}
            </motion.div>
         </AnimatePresence>
      </div>

    </div>
  );
}
