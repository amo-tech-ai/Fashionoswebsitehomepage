import { useState } from "react";
import { 
  ArrowLeft, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  MoreHorizontal, 
  Plus, 
  Upload, 
  Users, 
  Sparkles, 
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  ChevronRight,
  Briefcase,
  DollarSign,
  AlertCircle,
  ListTodo,
  PieChart,
  Download,
  Send,
  Paperclip,
  Lightbulb,
  Palette,
  Package,
  Zap,
  Box,
  Archive,
  ExternalLink,
  ChevronDown,
  Check,
  PenTool,
  Cuboid,
  Radio,
  Flag,
  Search,
  Settings,
  BarChart3,
  Gem
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- Types ---

export type ActivationStatus = "Completed" | "In Progress" | "Planned";
export type ActivationCategory = "VIP" | "Runway" | "Website" | "Social" | "Print" | "Digital" | "Booth" | "Experience";

export interface ActivationData {
  id: string;
  name: string;
  sponsor: string;
  sponsorLogo: string;
  category: ActivationCategory;
  location?: string;
  platform?: string;
  budget: string;
  status: ActivationStatus;
  progress: number;
  startDate: string;
  endDate: string;
  image: string;
}

interface ActivationDetailProps {
  activation: ActivationData;
  onBack: () => void;
  onNavigate?: (screen: string) => void;
}

export function ActivationDetail({ activation, onBack, onNavigate }: ActivationDetailProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "timeline", label: "Timeline" },
    { id: "tasks", label: "Tasks" },
    { id: "deliverables", label: "Deliverables" },
    { id: "media", label: "Media" },
    { id: "team", label: "Team" },
    { id: "ai", label: "AI Insights", icon: Sparkles }
  ];

  // Mock Data for Tabs
  const tasks = [
    { id: 1, title: "Finalize lounge lighting plan", due: "Sep 8", priority: "High", owner: "Ava K." },
    { id: 2, title: "Approve furniture layout", due: "Sep 7", priority: "Medium", owner: "Luca R." },
    { id: 3, title: "Coordinate catering tasting", due: "Sep 9", priority: "Low", owner: "Sarah J." }
  ];

  const deliverables = [
    { id: 1, name: "Runway Branding", sponsor: "Gucci", type: "On-Site", due: "Sep 10", status: "Completed" },
    { id: 2, name: "VIP Lounge Setup", sponsor: "Chanel", type: "Experience", due: "Sep 12", status: "In Progress" },
    { id: 3, name: "Social Media Story Post (x3)", sponsor: "Chanel", type: "Digital", due: "Sep 14", status: "Pending" }
  ];

  const team = [
    { id: 1, name: "Ava Kim", role: "Production Lead", status: "Ready", image: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Luca Rivera", role: "Designer", status: "In Progress", image: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "Sarah Jenkins", role: "Sponsor Liaison", status: "Ready", image: "https://i.pravatar.cc/150?u=3" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans animate-in fade-in duration-500">
      
      {/* 1. PAGE HEADER */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <button 
                onClick={onBack}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-2"
              >
                <ArrowLeft className="w-4 h-4" /> Activations Manager
              </button>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-serif text-gray-900">{activation.name}</h1>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                  activation.status === "Completed" ? "bg-green-100 text-green-700 border-green-200" :
                  activation.status === "In Progress" ? "bg-indigo-100 text-indigo-700 border-indigo-200" :
                  "bg-gray-100 text-gray-700 border-gray-200"
                }`}>
                  {activation.status}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
                <FileText className="w-4 h-4" /> View Contract
              </button>
              <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
                <ListTodo className="w-4 h-4" /> Open Tasks
              </button>
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-sm">
                <Plus className="w-4 h-4" /> Add Deliverable
              </button>
            </div>
          </div>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-6 text-sm border-t border-gray-100 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-900 border border-gray-200">
                {activation.sponsorLogo}
              </div>
              <span className="text-gray-900 font-medium">{activation.sponsor}</span>
            </div>
            <div className="w-px h-4 bg-gray-200" />
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-4 h-4 text-gray-400" />
              <span>{activation.location || activation.platform}</span>
            </div>
            <div className="w-px h-4 bg-gray-200" />
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>{activation.startDate} – {activation.endDate}</span>
            </div>
            <div className="w-px h-4 bg-gray-200" />
            <div className="flex items-center gap-2 text-gray-600">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <span>Budget: <span className="font-medium text-gray-900">{activation.budget}</span></span>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="px-6 border-t border-gray-200">
          <div className="max-w-[1600px] mx-auto flex items-center gap-8 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            {/* Hero Banner */}
            <div className="relative h-[300px] rounded-xl overflow-hidden group shadow-sm">
              <img 
                src={activation.image} 
                alt={activation.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="max-w-2xl">
                    <h2 className="text-3xl font-serif mb-2">Enhance VIP experience & brand visibility</h2>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-white/80">
                        <span>Progress</span>
                        <span>{activation.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-white rounded-full" 
                          style={{ width: `${activation.progress}%` }} 
                        />
                      </div>
                      <p className="text-sm text-white/90 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400" /> On track for scheduled completion.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                  <h3 className="text-lg font-serif text-gray-900 mb-4">About Activation</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Full-scale {activation.category.toLowerCase()} activation for {activation.sponsor}. 
                    This project involves the complete design, fabrication, and management of the {activation.location} experience. 
                    Key objectives include maximizing brand impression during peak runway hours and providing an exclusive retreat for VIP guests.
                    The design aligns with the "Modern Luxury" theme of FashionOS 2025.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Objective</div>
                      <div className="text-sm font-medium text-gray-900">Brand Visibility</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Audience</div>
                      <div className="text-sm font-medium text-gray-900">VIP & Influencers</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Manager</div>
                      <div className="text-sm font-medium text-gray-900">Sarah Jenkins</div>
                    </div>
                  </div>
                </div>

                {/* Timeline Preview */}
                <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-serif text-gray-900">Milestone Timeline</h3>
                    <button onClick={() => setActiveTab('timeline')} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">View Detailed</button>
                  </div>
                  <div className="relative">
                    <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-100 -translate-y-1/2" />
                    <div className="relative flex justify-between">
                      {["Concept", "Design", "Production", "Execution", "Wrap"].map((step, i) => {
                        const status = i < 3 ? "completed" : i === 3 ? "current" : "pending";
                        return (
                          <div key={step} className="flex flex-col items-center gap-3 bg-white px-2 relative z-10">
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              status === "completed" ? "bg-indigo-600 border-indigo-600" :
                              status === "current" ? "bg-white border-indigo-600" :
                              "bg-white border-gray-300"
                            }`} />
                            <span className={`text-xs font-medium ${
                              status === "pending" ? "text-gray-400" : "text-gray-900"
                            }`}>{step}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4">Quick Links</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-200 text-xs font-bold">
                          {activation.sponsorLogo}
                        </div>
                        <span className="text-sm font-medium text-gray-900">Sponsor Profile</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-200">
                          <LayoutDashboard className="w-4 h-4 text-gray-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">Event Details</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-200">
                          <PieChart className="w-4 h-4 text-gray-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">ROI Dashboard</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-900 to-violet-900 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Sparkles className="w-24 h-24" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-4 h-4 text-indigo-200" />
                      <h3 className="font-serif">Gemini Insights</h3>
                    </div>
                    <p className="text-sm text-indigo-100 mb-4 leading-relaxed">
                      Activation is trending behind schedule by 8%. Lighting zone B requires extra staffing based on predicted flow.
                    </p>
                    <button onClick={() => setActiveTab('ai')} className="w-full py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-xs font-medium hover:bg-white/20 transition-colors">
                      View Optimization Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 p-8 shadow-sm overflow-hidden relative">
              
              {/* Subtle Background Texture */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(45deg,transparent_25%,#4f46e5_25%,#4f46e5_50%,transparent_50%,transparent_75%,#4f46e5_75%,#4f46e5_100%)] [background-size:24px_24px]" />

              <div className="flex items-center justify-between mb-16 relative z-10">
                <div>
                  <h3 className="text-xl font-serif text-gray-900">Project Flow</h3>
                  <p className="text-sm text-gray-500">Real-time activation milestones</p>
                </div>
                
                {/* Animated Gemini Hint Box */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="hidden md:flex items-center gap-3 bg-gradient-to-r from-indigo-50/90 to-white/90 backdrop-blur px-4 py-2 rounded-full border border-indigo-100 shadow-sm"
                >
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 4, repeatDelay: 1 }}
                  >
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                  </motion.div>
                  <span className="text-xs font-medium text-indigo-900">
                    Gemini predicts <span className="font-semibold">Production Setup</span> may run 1 day behind schedule.
                  </span>
                </motion.div>
              </div>

              {/* FLOWCHART DIAGRAM */}
              <div className="relative py-16 px-2 md:px-12 overflow-x-auto">
                
                <div className="min-w-[1100px] flex justify-between items-stretch gap-6 relative z-10">
                  {[
                    { 
                      step: "Step 1",
                      title: "Concept & Approval", 
                      desc: "Sponsor concept, goals, and activation brief approved.",
                      icon: Lightbulb,
                      gradient: "from-purple-600 to-indigo-600",
                      iconColor: "text-purple-600",
                      borderColor: "border-purple-200",
                      iconBg: "bg-purple-50"
                    },
                    { 
                      step: "Step 2",
                      title: "Design & Creative", 
                      desc: "Visual design, booth layout, and creative assets prepared.",
                      icon: Palette,
                      gradient: "from-indigo-600 to-blue-600",
                      iconColor: "text-indigo-600",
                      borderColor: "border-indigo-200",
                      iconBg: "bg-indigo-50"
                    },
                    { 
                      step: "Step 3",
                      title: "Production & Build", 
                      desc: "Fabrication of structures, signage, and branded elements.",
                      icon: Cuboid,
                      gradient: "from-blue-600 to-cyan-600",
                      iconColor: "text-blue-600",
                      borderColor: "border-blue-200",
                      iconBg: "bg-blue-50"
                    },
                    { 
                      step: "Step 4",
                      title: "Setup & Execution", 
                      desc: "Installation, rehearsals, and event-day activation management.",
                      icon: Zap,
                      gradient: "from-cyan-600 to-teal-600",
                      iconColor: "text-cyan-600",
                      borderColor: "border-cyan-200",
                      iconBg: "bg-cyan-50"
                    },
                    { 
                      step: "Step 5",
                      title: "Results & ROI", 
                      desc: "Performance metrics, engagement results, and ROI reporting.",
                      icon: BarChart3,
                      gradient: "from-teal-600 to-emerald-600",
                      iconColor: "text-teal-600",
                      borderColor: "border-teal-200",
                      iconBg: "bg-teal-50"
                    }
                  ].map((item, i, arr) => {
                    return (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                        className="flex-1 min-w-[200px] relative group"
                      >
                        {/* Panel Card */}
                        <div className="relative h-full min-h-[420px] rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-gray-100 shadow-[inset_0_0_20px_rgba(0,0,0,0.02),0_10px_30px_-10px_rgba(0,0,0,0.05)] flex flex-col items-center transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[inset_0_0_20px_rgba(0,0,0,0.02),0_20px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
                          
                          {/* 1. Top Icon Section */}
                          <div className="pt-10 pb-6 flex items-center justify-center w-full">
                             <div className={`w-20 h-20 rounded-2xl border-[1.5px] ${item.borderColor} ${item.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                               <item.icon className={`w-9 h-9 ${item.iconColor}`} strokeWidth={1.25} />
                             </div>
                          </div>

                          {/* 2. Rectangular Label Section */}
                          <div className="w-full px-6 my-2">
                             <div className={`w-full py-2 rounded-lg bg-gradient-to-r ${item.gradient} text-white shadow-md flex items-center justify-center relative overflow-hidden`}>
                               {/* Subtle shine effect */}
                               <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                               <span className="text-xs font-bold uppercase tracking-widest z-10">{item.step}</span>
                             </div>
                          </div>

                          {/* 3. Bottom Text Section */}
                          <div className="flex-1 flex flex-col justify-start items-center pt-6 px-6 text-center pb-10">
                            <h3 className="text-lg font-serif font-bold text-gray-900 mb-3 leading-tight">{item.title}</h3>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                          
                          {/* Subtle decorative bottom bar */}
                          <div className={`h-1.5 w-full bg-gradient-to-r ${item.gradient} opacity-20`} />

                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-serif text-gray-900">Task Manager</h3>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                Open Full Tasks Dashboard
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <div key={task.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all group relative">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${
                      task.priority === 'High' ? 'bg-red-50 text-red-600' :
                      task.priority === 'Medium' ? 'bg-amber-50 text-amber-600' :
                      'bg-blue-50 text-blue-600'
                    }`}>
                      {task.priority}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">
                    {task.title}
                  </h4>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-600">
                        {task.owner.split(' ')[0][0]}{task.owner.split(' ')[1]?.[0]}
                      </div>
                      <span className="text-xs text-gray-500">{task.owner}</span>
                    </div>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {task.due}
                    </span>
                  </div>
                </div>
              ))}
              <button className="border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-indigo-300 hover:text-indigo-600 transition-all p-6 min-h-[180px]">
                <Plus className="w-8 h-8 mb-2" />
                <span className="text-sm font-medium">Add New Task</span>
              </button>
            </div>
          </div>
        )}

        {/* Add other tabs as needed */}
        {(activeTab !== 'overview' && activeTab !== 'timeline' && activeTab !== 'tasks') && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400 bg-white rounded-xl border border-gray-200">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Archive className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Work in Progress</h3>
            <p className="text-sm">This section is currently under development.</p>
          </div>
        )}

      </div>
    </div>
  );
}