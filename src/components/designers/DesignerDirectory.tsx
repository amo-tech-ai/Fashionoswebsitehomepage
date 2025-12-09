import { useState } from "react";
import { motion } from "motion/react";
import { 
  Search, 
  Filter, 
  Plus, 
  Upload, 
  MoreHorizontal, 
  Sparkles, 
  MapPin, 
  Tag, 
  Trophy, 
  TrendingUp, 
  Users, 
  Leaf, 
  Briefcase,
  ArrowRight,
  Grid,
  List
} from "lucide-react";

interface DesignerDirectoryProps {
  onNavigate?: (screen: string) => void;
}

export function DesignerDirectory({ onNavigate }: DesignerDirectoryProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterEmerging, setFilterEmerging] = useState(false);

  // Mock Data
  const kpis = [
    { label: "Total Designers", value: "248", sub: "+12 this month", icon: Users },
    { label: "New Arrivals", value: "34", sub: "Past 30 days", icon: Sparkles },
    { label: "Active in Events", value: "58", sub: "Runway confirmed", icon: Briefcase },
    { label: "Top Category", value: "Luxe", sub: "45% of directory", icon: Tag },
  ];

  const designers = [
    {
      id: 1,
      name: "Aurelia Noir",
      category: "Luxury Womenswear",
      city: "Paris, France",
      image: "AN", // Placeholder
      bgImage: "bg-zinc-900",
      tags: ["Emerging Talent", "Sustainable"],
      events: 4,
      collections: 2,
      status: "Active"
    },
    {
      id: 2,
      name: "Kaelo Studios",
      category: "Avant-Garde Streetwear",
      city: "Tokyo, Japan",
      image: "KS",
      bgImage: "bg-indigo-900",
      tags: ["Award Winner"],
      events: 6,
      collections: 3,
      status: "Active"
    },
    {
      id: 3,
      name: "Eylin & Co.",
      category: "Bridal Couture",
      city: "London, UK",
      image: "EC",
      bgImage: "bg-rose-900",
      tags: [],
      events: 2,
      collections: 1,
      status: "Pending"
    },
    {
      id: 4,
      name: "Vesper Line",
      category: "Minimalist Menswear",
      city: "Berlin, Germany",
      image: "VL",
      bgImage: "bg-slate-800",
      tags: ["Sustainable"],
      events: 3,
      collections: 4,
      status: "Active"
    },
    {
      id: 5,
      name: "Solstice",
      category: "Resort Wear",
      city: "Miami, USA",
      image: "SO",
      bgImage: "bg-orange-900",
      tags: ["Emerging Talent"],
      events: 1,
      collections: 1,
      status: "In Review"
    },
    {
      id: 6,
      name: "Maison 88",
      category: "Haute Couture",
      city: "Milan, Italy",
      image: "M8",
      bgImage: "bg-purple-900",
      tags: ["Legacy Brand"],
      events: 12,
      collections: 8,
      status: "Active"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F5] font-sans pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-[1800px] mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                <span>Directory</span>
                <span className="text-gray-300">/</span>
                <span className="text-[#1A1A1A]">Designers</span>
              </div>
              <h1 className="text-3xl font-serif font-medium text-[#1A1A1A] mb-1">Designer Directory</h1>
              <p className="text-sm text-gray-500 font-medium">Browse designers, fashion brands, and emerging talent</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Upload className="w-4 h-4" /> Import CSV
              </button>
              <button className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-sm">
                <Plus className="w-4 h-4" /> Add Designer
              </button>
            </div>
          </div>

          {/* KPI Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {kpis.map((kpi, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">{kpi.label}</div>
                  <div className="text-2xl font-serif font-bold text-[#1A1A1A]">{kpi.value}</div>
                  <div className="text-xs text-gray-400 mt-1 font-medium">{kpi.sub}</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                  <kpi.icon className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content */}
          <div className="flex-1">
            
            {/* Controls & Filters */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search designers, cities, categories..." 
                  className="w-full pl-10 pr-4 py-2 bg-[#F7F7F5] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] transition-all text-[#1A1A1A]"
                />
              </div>
              
              <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none cursor-pointer font-medium hover:border-gray-300">
                  <option>All Categories</option>
                  <option>Luxury</option>
                  <option>Streetwear</option>
                  <option>Bridal</option>
                </select>
                <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none cursor-pointer font-medium hover:border-gray-300">
                  <option>All Locations</option>
                  <option>Paris</option>
                  <option>New York</option>
                  <option>Milan</option>
                </select>
                
                <div className="h-8 w-px bg-gray-200 mx-1"></div>

                <button 
                  onClick={() => setFilterEmerging(!filterEmerging)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors flex items-center gap-2 ${filterEmerging ? 'bg-[#F3E8FF] border-purple-200 text-[#6B21A8]' : 'bg-white border-gray-200 text-gray-600'}`}
                >
                  <Sparkles className="w-4 h-4" /> Emerging Only
                </button>
                
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'}`}>
                    <Grid className="w-4 h-4" />
                  </button>
                  <button onClick={() => setViewMode('list')} className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'}`}>
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {designers.map((designer) => (
                <motion.div 
                  key={designer.id}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group cursor-pointer"
                  onClick={() => onNavigate?.('designer-profile')}
                >
                  <div className={`h-28 ${designer.bgImage} relative`}>
                    <div className="absolute -bottom-8 left-6">
                      <div className="w-16 h-16 rounded-full bg-white p-1 shadow-sm">
                        <div className="w-full h-full rounded-full bg-[#1A1A1A] text-white flex items-center justify-center font-serif text-xl font-medium">
                          {designer.image}
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3">
                      <button className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-white transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-10 px-6 pb-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-serif text-lg font-bold text-[#1A1A1A] group-hover:text-black transition-colors">{designer.name}</h3>
                        <div className="text-xs text-gray-500 flex items-center gap-1 font-medium mt-1">
                          <MapPin className="w-3 h-3" /> {designer.city}
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide border ${
                        designer.status === 'Active' ? 'bg-[#DCFCE7] text-[#166534] border-green-100' : 
                        designer.status === 'In Review' ? 'bg-[#FEF3C7] text-[#92400E] border-amber-100' : 
                        'bg-gray-50 text-gray-600 border-gray-200'
                      }`}>
                        {designer.status}
                      </span>
                    </div>

                    <div className="text-sm text-gray-600 mb-4 font-medium">{designer.category}</div>

                    {designer.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-5">
                        {designer.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-[#F7F7F5] border border-gray-200 rounded text-[10px] font-bold text-gray-600 uppercase tracking-wide">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <div className="flex gap-4 text-xs text-gray-500 font-medium">
                        <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {designer.events} Events</span>
                        <span className="flex items-center gap-1"><LayersIcon className="w-3 h-3" /> {designer.collections} Collections</span>
                      </div>
                      <button className="text-xs font-bold text-[#1A1A1A] hover:underline flex items-center gap-1">
                        Open Profile <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

          {/* Right Sidebar AI Panel */}
          <div className="w-full lg:w-80 space-y-6">
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#333333] rounded-2xl p-6 text-white relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 p-12 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="flex items-center gap-2 mb-4 relative z-10">
                <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 text-purple-200" />
                </div>
                <span className="text-xs font-bold text-purple-200 uppercase tracking-wider">Gemini Intelligence</span>
              </div>

              <div className="space-y-4 relative z-10 mb-6">
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-colors">
                  <p className="text-sm leading-relaxed font-medium text-gray-200">
                    Paris-based luxury labels are trending <span className="text-[#DCFCE7] font-bold">+14%</span> in online engagement this week.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-colors">
                  <p className="text-sm leading-relaxed font-medium text-gray-200">
                    Gemini can analyze designer portfolios instantly. Paste a URL to start.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <input type="text" placeholder="https://" className="w-full bg-black/20 border border-white/20 rounded px-2 py-1 text-xs text-white placeholder:text-white/40 focus:outline-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 relative z-10">
                <button className="w-full py-2 bg-white text-black rounded-lg text-xs font-bold hover:bg-gray-100 transition-colors shadow-sm">
                  Analyze Designer Fit
                </button>
                <button className="w-full py-2 bg-transparent border border-white/20 text-white rounded-lg text-xs font-medium hover:bg-white/10 transition-colors">
                  Predict Collab Success
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-serif font-bold text-[#1A1A1A] mb-4">Quick Filters</h3>
              <div className="space-y-3">
                {['Luxe', 'Streetwear', 'Haute Couture', 'Bridal', 'Sustainable', 'Emerging'].map(cat => (
                  <label key={cat} className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-[#1A1A1A] font-medium">
                    <input type="checkbox" className="rounded border-gray-300 text-black focus:ring-black" />
                    {cat}
                  </label>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function LayersIcon({ className }: { className?: string }) { return <Briefcase className={className} />; }
