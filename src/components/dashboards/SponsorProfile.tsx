import { motion } from "motion/react";
import { 
  ArrowLeft,
  MoreHorizontal, 
  Upload, 
  Plus, 
  ExternalLink,
  Mail, 
  Phone, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  BarChart3, 
  Zap,
  FileText,
  ChevronRight,
  TrendingUp,
  Download,
  Filter
} from "lucide-react";
import { useState } from "react";

interface SponsorProfileProps {
  onNavigate?: (screen: string) => void;
}

export function SponsorProfile({ onNavigate }: SponsorProfileProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const kpis = [
    { label: "Total Value", value: "$150,000", sub: "Platinum Tier", color: "text-gray-900" },
    { label: "Impressions", value: "1.2M", sub: "+12% vs target", color: "text-indigo-600" },
    { label: "Deliverables", value: "14 / 18", sub: "Completed", color: "text-green-600" },
    { label: "Engagement", value: "5.1%", sub: "High Impact", color: "text-gray-900" }
  ];

  const contacts = [
    { name: "Marie Dupont", role: "Brand Director", email: "marie.d@chanel.com", phone: "+33 1 44 50 32 00" },
    { name: "Jean-Pierre Martin", role: "Partnerships Lead", email: "jp.martin@chanel.com", phone: "+33 1 44 50 32 05" },
    { name: "Sarah Williams", role: "Marketing Manager", email: "s.williams@chanel.com", phone: "+1 212 555 0123" }
  ];

  const deals = [
    { name: "Platinum Package Renewal", stage: "Negotiation", amount: "$150,000", prob: "75%", owner: "Sarah K." },
    { name: "Runway Branding Add-On", stage: "Proposal Sent", amount: "$45,000", prob: "62%", owner: "Daniel G." },
    { name: "Digital Social Campaign", stage: "Closed-Won", amount: "$25,000", prob: "100%", owner: "Maria R." }
  ];

  const deliverables = [
    { name: "VIP Lounge Setup", status: "Done", date: "Completed Aug 15", color: "bg-green-500" },
    { name: "Runway Branding Installation", status: "In Progress", date: "Due Sep 10", color: "bg-amber-500" },
    { name: "Social Content (3 posts)", status: "Pending", date: "Due Sep 12", color: "bg-gray-300" },
    { name: "Gift Bag Inclusion", status: "Pending", date: "Due Sep 14", color: "bg-gray-300" }
  ];

  const activations = [
    { name: "Chanel VIP Lounge", status: "In Progress", progress: 68, location: "Hall B" },
    { name: "Runway Branding", status: "Complete", progress: 100, location: "Main Stage" }
  ];

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "contacts", label: "Contacts" },
    { id: "deals", label: "Deals" },
    { id: "deliverables", label: "Deliverables" },
    { id: "activations", label: "Activations" },
    { id: "roi", label: "ROI" },
    { id: "files", label: "Files" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      
      {/* Hero Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-6">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <button onClick={() => onNavigate?.('sponsors')} className="hover:text-indigo-600 transition-colors">Sponsors</button>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">Chanel</span>
            <span className="text-gray-300">/</span>
            <span className="text-indigo-600">Profile</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-gray-900 text-white rounded-xl flex items-center justify-center text-3xl font-serif">
                C
              </div>
              <div>
                <h1 className="text-3xl font-serif text-gray-900 mb-1">Chanel</h1>
                <p className="text-gray-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Active Sponsor — Platinum Package
                </p>
                
                <div className="flex gap-2 mt-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md uppercase tracking-wider font-medium">Luxury</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md uppercase tracking-wider font-medium">Fashion</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md uppercase tracking-wider font-medium">Beauty</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Files
              </button>
              <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Create Activation
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm">
                <Plus className="w-4 h-4" />
                Add New Deal
              </button>
            </div>
          </div>

          {/* KPI Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {kpis.map((kpi, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="text-sm text-gray-500 mb-1">{kpi.label}</div>
                <div className={`text-2xl font-semibold ${kpi.color}`}>{kpi.value}</div>
                <div className="text-xs text-gray-400 mt-1">{kpi.sub}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 mt-8 border-b border-gray-200 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-8 space-y-8">
        
        {/* Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Brand Summary</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Chanel is a Platinum-tier luxury sponsor focused on runway visibility, high-end brand alignment, and premium activation experiences.
              Their primary goal for SS25 is to showcase the new "Coco Mademoiselle" fragrance line through immersive backstage experiences and a dedicated VIP lounge.
              They require high-touch account management and weekly ROI reporting.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Contract Status</div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Active - Signed until Dec 2025
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Next Review</div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                  <Calendar className="w-4 h-4 text-indigo-500" />
                  Oct 15, 2025
                </div>
              </div>
            </div>
          </div>

          {/* AI Insights Panel */}
          <div className="bg-gradient-to-br from-indigo-900 to-violet-800 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Sparkles className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 text-indigo-200" />
                </div>
                <h3 className="font-medium text-lg">AI Insights</h3>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex gap-3 items-start">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                  <p className="text-sm text-indigo-50 leading-snug">Chanel engagement trending <span className="text-white font-medium">+12%</span> this week.</p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                  <p className="text-sm text-indigo-50 leading-snug">Strong fit for backstage influencer moments based on recent social mentions.</p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                  <p className="text-sm text-indigo-50 leading-snug">High probability of renewing next season.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <button className="w-full py-2 bg-white text-indigo-900 text-xs font-medium rounded-lg hover:bg-indigo-50 transition-colors">
                  Generate Proposal Suggestions
                </button>
                <button className="w-full py-2 bg-indigo-800/50 text-indigo-100 text-xs font-medium rounded-lg border border-indigo-700/50 hover:bg-indigo-800 transition-colors">
                  View Sponsor Fit Report
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contacts Section */}
        <div>
          <h3 className="text-lg font-serif text-gray-900 mb-4">Contacts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contacts.map((contact, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-lg font-serif">
                    {contact.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{contact.name}</div>
                    <div className="text-sm text-gray-500">{contact.role}</div>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {contact.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" />
                    {contact.phone}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700">
                    View Contact
                  </button>
                  <button className="flex-1 py-1.5 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700">
                    Log Activity
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Col: Deals & Deliverables (2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Deals Section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-medium text-gray-900">Active Deals</h3>
                <button className="text-xs text-indigo-600 font-medium hover:text-indigo-800">View All Deals</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50/50 text-gray-500 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-3 font-medium">Deal Name</th>
                      <th className="px-6 py-3 font-medium">Stage</th>
                      <th className="px-6 py-3 font-medium">Amount</th>
                      <th className="px-6 py-3 font-medium">Probability</th>
                      <th className="px-6 py-3 font-medium">Owner</th>
                      <th className="px-6 py-3 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {deals.map((deal, i) => (
                      <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{deal.name}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            deal.stage === 'Closed-Won' ? 'bg-green-50 text-green-700' :
                            deal.stage === 'Negotiation' ? 'bg-amber-50 text-amber-700' :
                            'bg-indigo-50 text-indigo-700'
                          }`}>
                            {deal.stage}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{deal.amount}</td>
                        <td className="px-6 py-4 text-gray-600">{deal.prob}</td>
                        <td className="px-6 py-4 text-gray-600">{deal.owner}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-gray-400 hover:text-gray-600">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Deliverables Timeline */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-medium text-gray-900">Deliverables Progress</h3>
                <button className="text-xs text-indigo-600 font-medium hover:text-indigo-800">View All</button>
              </div>
              <div className="relative pl-4 border-l-2 border-gray-100 space-y-8">
                {deliverables.map((item, i) => (
                  <div key={i} className="relative">
                    <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white shadow-sm ${item.color}`} />
                    <div className="flex justify-between items-start">
                      <div>
                        <div className={`text-sm font-medium ${item.status === 'Done' ? 'text-gray-900' : 'text-gray-700'}`}>
                          {item.name}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">{item.date}</div>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide font-medium ${
                        item.status === 'Done' ? 'bg-green-50 text-green-700' :
                        item.status === 'In Progress' ? 'bg-amber-50 text-amber-700' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Col: Activations & ROI (1 col) */}
          <div className="space-y-6">
            
            {/* Activations Snapshot */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Activations</h3>
                <button onClick={() => onNavigate?.('activations')} className="text-xs text-indigo-600 font-medium hover:text-indigo-800">Manage</button>
              </div>
              <div className="space-y-3">
                {activations.map((act, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-indigo-200 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-sm text-gray-900 group-hover:text-indigo-600 transition-colors">{act.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                        act.status === 'Complete' ? 'bg-green-50 border-green-200 text-green-700' :
                        'bg-amber-50 border-amber-200 text-amber-700'
                      }`}>{act.status}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <span>{act.location}</span>
                      <span>{act.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${act.status === 'Complete' ? 'bg-green-500' : 'bg-amber-500'}`} 
                        style={{ width: `${act.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ROI Snapshot */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">ROI & Impact</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <Download className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Media Value</span>
                    <span className="font-medium text-gray-900">$420,000</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <div className="text-xs text-gray-500 mb-1">Engagement</div>
                    <div className="text-lg font-semibold text-gray-900">5.1%</div>
                    <div className="text-[10px] text-green-600 flex items-center justify-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +0.4%
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <div className="text-xs text-gray-500 mb-1">CTR</div>
                    <div className="text-lg font-semibold text-gray-900">2.8%</div>
                    <div className="text-[10px] text-green-600 flex items-center justify-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +0.2%
                    </div>
                  </div>
                </div>

                <button className="w-full py-2 text-sm bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Open Full ROI Dashboard
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}