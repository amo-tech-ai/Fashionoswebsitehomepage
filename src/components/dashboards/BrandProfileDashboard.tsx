import { useState } from "react";
import { 
  ArrowRight, 
  ArrowUpRight, 
  Globe, 
  Instagram, 
  Leaf, 
  MapPin, 
  Calendar, 
  Check, 
  TrendingUp, 
  AlertCircle, 
  ChevronRight, 
  Shirt, 
  Camera, 
  Zap, 
  BarChart3, 
  Users, 
  Layers, 
  ArrowUp,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function BrandProfileDashboard({ onNavigate }: { onNavigate?: (screen: string) => void }) {
  const [insights, setInsights] = useState([
    {
      id: 1,
      icon: <Shirt className="w-5 h-5 text-indigo-600" />,
      text: "Your silk products are trending vs category peers.",
      action: "Act on this",
      bg: "bg-indigo-50",
      border: "border-indigo-100"
    },
    {
      id: 2,
      icon: <AlertCircle className="w-5 h-5 text-amber-600" />,
      text: "Instagram engagement dipped last week after dark-toned posts.",
      action: "Act on this",
      bg: "bg-amber-50",
      border: "border-amber-100"
    }
  ]);

  const dismissInsight = (id: number) => {
    setInsights(prev => prev.filter(i => i.id !== id));
  };

  const IMAGES = {
    brandProfile: "https://images.unsplash.com/photo-1759563874678-844afcc582b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    header: "https://images.unsplash.com/photo-1761052677690-a89b46343aec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    collections: [
       { url: "https://images.unsplash.com/photo-1746864947008-e94699155fdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", label: "SS25 Runway" },
       { url: "https://images.unsplash.com/photo-1630701875820-1250d036825d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", label: "Core Accessories" },
       { url: "https://images.unsplash.com/photo-1645784127155-a9f8f8fe647b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", label: "Footwear Edit" },
       { url: "https://images.unsplash.com/photo-1582999226946-a7e53d258254?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", label: "Campaign" }
    ]
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] font-sans pb-20">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        
        {/* 3️⃣ Brand Header (Profile Identity) */}
        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row items-start gap-8 relative overflow-hidden">
           {/* Brand Profile Image */}
           <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md flex-shrink-0 overflow-hidden relative z-10">
              <img src={IMAGES.brandProfile} alt="Brand Profile" className="w-full h-full object-cover" />
           </div>

          <div className="space-y-4 max-w-2xl flex-1 relative z-10 pt-2">
            <div>
              <h1 className="font-serif text-4xl text-gray-900 mb-2">Aurelia Noir</h1>
              <p className="text-gray-500 text-lg">A contemporary womenswear brand focused on minimalist silhouettes and responsible production.</p>
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm text-gray-500">
               <div className="flex items-center gap-2"><Layers className="w-4 h-4 text-gray-400" /> Luxury Womenswear</div>
               <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-400" /> Paris, France</div>
               <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gray-400" /> Est. 2018</div>
               <div className="flex items-center gap-2"><Leaf className="w-4 h-4 text-green-600" /> Sustainability Focus</div>
            </div>
          </div>

           {/* Brand Header Visual Anchor */}
           <div className="hidden lg:block w-48 h-32 rounded-lg overflow-hidden border border-gray-100 shadow-sm relative flex-shrink-0">
               <img src={IMAGES.header} alt="Brand Visual" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-black/5" />
           </div>
        </div>

        {/* 4️⃣ Brand Health Snapshot (Always Visible) */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-8 w-full lg:w-auto">
              <div className="relative w-32 h-32 flex-shrink-0">
                 <svg className="w-full h-full -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="#f3f4f6" strokeWidth="12" fill="none" />
                    <circle cx="64" cy="64" r="56" stroke="#000" strokeWidth="12" fill="none" strokeDasharray="351.8" strokeDashoffset={351.8 - (351.8 * 82) / 100} />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-serif font-bold text-gray-900">82</span>
                    <span className="text-xs font-medium text-gray-400 uppercase">Score</span>
                 </div>
              </div>
              <div className="space-y-2">
                 <h2 className="font-serif text-2xl text-gray-900">Brand Health Score</h2>
                 <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-100">Strong · Improving</span>
                    <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                       <ArrowUp className="w-3 h-3" /> +10 since initial audit
                    </span>
                 </div>
                 <p className="text-gray-400 text-sm italic">Updated automatically as your brand evolves.</p>
              </div>
           </div>

           <div className="flex-1 w-full lg:w-auto border-t lg:border-t-0 lg:border-l border-gray-100 pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                 <div>
                    <div className="text-3xl font-serif text-gray-900 mb-1">82</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Website</div>
                 </div>
                 <div>
                    <div className="text-3xl font-serif text-gray-900 mb-1">78</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Instagram</div>
                 </div>
                 <div>
                    <div className="text-3xl font-serif text-gray-900 mb-1">85</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Market Position</div>
                 </div>
              </div>
              <button className="text-sm font-medium text-gray-500 hover:text-black flex items-center gap-2 group">
                 View Brand Health Timeline <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
           </div>
        </div>

        {/* New Persistent Collection Row */}
        <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
               <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Current Designs</h3>
               <span className="text-xs text-gray-400">Your current designs, as seen by buyers and collaborators.</span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
               {IMAGES.collections.map((col, idx) => (
                  <div key={idx} className="flex-shrink-0 w-40 group cursor-pointer">
                     <div className="aspect-[3/4] rounded-lg overflow-hidden relative shadow-sm border border-gray-100">
                        <img src={col.url} alt={col.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                     </div>
                     <p className="text-xs text-gray-500 font-medium mt-2 text-center">{col.label}</p>
                  </div>
               ))}
            </div>
        </div>

        {/* 5️⃣ Brand Metrics Overview (High-Level) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           {[
              { label: "Website Quality", value: "High", trend: "stable", desc: "Strong UX & visuals" },
              { label: "Instagram Engagement", value: "Improving", trend: "up", desc: "+12% vs last month" },
              { label: "Content Consistency", value: "Medium", trend: "neutral", desc: "Needs alignment" },
              { label: "Market Demand Fit", value: "Strong", trend: "up", desc: "Top 10% in category" }
           ].map((metric, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                 <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{metric.label}</span>
                    {metric.trend === "up" && <TrendingUp className="w-4 h-4 text-green-500" />}
                    {metric.trend === "stable" && <Check className="w-4 h-4 text-blue-500" />}
                    {metric.trend === "neutral" && <div className="w-4 h-1 bg-amber-400 rounded-full mt-2" />}
                 </div>
                 <div className="text-xl font-serif text-gray-900 mb-1">{metric.value}</div>
                 <p className="text-sm text-gray-500">{metric.desc}</p>
              </div>
           ))}
        </div>

        {/* 6️⃣ Active Insights & Alerts (AI-Driven) */}
        <div>
           <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Active Insights</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence>
                 {insights.map(insight => (
                    <motion.div 
                       key={insight.id}
                       initial={{ opacity: 0, height: 0 }}
                       animate={{ opacity: 1, height: 'auto' }}
                       exit={{ opacity: 0, height: 0 }}
                       className={`rounded-xl border p-6 flex items-start gap-4 ${insight.bg} ${insight.border}`}
                    >
                       <div className="mt-0.5">{insight.icon}</div>
                       <div className="flex-1">
                          <p className="text-gray-900 font-medium mb-3">{insight.text}</p>
                          <div className="flex gap-4">
                             <button className="text-xs font-bold text-gray-900 hover:opacity-70 uppercase tracking-wide border-b border-gray-900 pb-0.5">
                                {insight.action}
                             </button>
                             <button 
                                onClick={() => dismissInsight(insight.id)}
                                className="text-xs font-bold text-gray-400 hover:text-gray-600 uppercase tracking-wide"
                             >
                                Dismiss
                             </button>
                          </div>
                       </div>
                    </motion.div>
                 ))}
                 {insights.length === 0 && (
                    <div className="col-span-2 p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-400 text-sm">
                       All insights cleared. Check back later for more AI recommendations.
                    </div>
                 )}
              </AnimatePresence>
           </div>
        </div>

        {/* 7️⃣ Collections Performance */}
        <div>
           <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Collections Performance</h3>
              <button className="text-sm font-medium text-gray-500 hover:text-black">View All</button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                 { name: "SS25 — Core Essentials", fit: "High", content: "Medium", color: "bg-stone-100" },
                 { name: "FW24 — Midnight", fit: "Medium", content: "High", color: "bg-slate-100" },
                 { name: "Resort 24", fit: "High", content: "Low", color: "bg-orange-50" }
              ].map((col, i) => (
                 <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                    <div className="flex justify-between items-start mb-6">
                       <div className={`w-12 h-12 rounded-lg ${col.color} flex items-center justify-center`}>
                          <Shirt className="w-6 h-6 text-gray-700" />
                       </div>
                       <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors" />
                    </div>
                    <h4 className="font-serif text-lg text-gray-900 mb-1">{col.name}</h4>
                    <div className="flex gap-4 mt-4 text-sm">
                       <div>
                          <span className="text-gray-400 text-xs block mb-0.5">Brand Fit</span>
                          <span className="font-medium text-gray-900">{col.fit}</span>
                       </div>
                       <div>
                          <span className="text-gray-400 text-xs block mb-0.5">Content</span>
                          <span className="font-medium text-gray-900">{col.content}</span>
                       </div>
                    </div>
                    <button className="w-full mt-6 py-2 bg-gray-50 text-gray-600 rounded-lg text-xs font-bold uppercase hover:bg-gray-100 transition-colors">
                       Open Digital Showroom
                    </button>
                 </div>
              ))}
           </div>
        </div>

        {/* 8️⃣ Growth Opportunities (From Audit) */}
        <div>
           <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Growth Opportunities Identified</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col">
                 <div className="mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-3">
                       <Camera className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-gray-900">Visual Consistency</h4>
                 </div>
                 <p className="text-sm text-gray-500 mb-6 flex-1">Align website and Instagram visuals to increase premium perception.</p>
                 <div className="flex items-center justify-between text-xs font-medium text-gray-500 mb-4">
                    <span>Impact: High</span>
                    <span>Effort: Low</span>
                 </div>
                 <button className="w-full py-2 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
                    Create Campaign
                 </button>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col">
                 <div className="mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 mb-3">
                       <TrendingUp className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-gray-900">Market Gap: Silk</h4>
                 </div>
                 <p className="text-sm text-gray-500 mb-6 flex-1">Capitalize on rising demand for sustainable silk in your category.</p>
                 <div className="flex items-center justify-between text-xs font-medium text-gray-500 mb-4">
                    <span>Impact: High</span>
                    <span>Effort: Med</span>
                 </div>
                 <button className="w-full py-2 bg-white border border-gray-200 text-gray-900 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors">
                    Add to Plan
                 </button>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col">
                 <div className="mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mb-3">
                       <Zap className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-gray-900">Content Health</h4>
                 </div>
                 <p className="text-sm text-gray-500 mb-6 flex-1">Add lifestyle imagery to product pages to boost conversion.</p>
                 <div className="flex items-center justify-between text-xs font-medium text-gray-500 mb-4">
                    <span>Impact: Med</span>
                    <span>Effort: Low</span>
                 </div>
                 <button className="w-full py-2 bg-white border border-gray-200 text-gray-900 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors">
                    Plan Content Drop
                 </button>
              </div>
           </div>
        </div>

        {/* 9️⃣ Actions & Workflows */}
        <div className="bg-gray-900 rounded-xl p-8 shadow-lg text-white">
           <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                 <h3 className="font-serif text-2xl mb-2">Ready to improve your score?</h3>
                 <p className="text-gray-400">Actions taken here directly impact your Brand Health metrics.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
                 <button className="px-4 py-3 bg-white text-black rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors text-center">
                    Book Campaign
                 </button>
                 <button className="px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg text-sm font-bold hover:bg-gray-700 transition-colors text-center">
                    Find Stylists
                 </button>
                 <button className="px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg text-sm font-bold hover:bg-gray-700 transition-colors text-center">
                    Plan Content
                 </button>
                 <button className="px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg text-sm font-bold hover:bg-gray-700 transition-colors text-center">
                    Market Analysis
                 </button>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}