import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { 
  Calendar, 
  CheckSquare, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  BarChart3, 
  Users, 
  MapPin,
  ArrowRight,
  MoreHorizontal,
  ChevronDown,
  Zap,
  Package,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  ClipboardCheck,
  Building2,
  Palette,
  LayoutDashboard,
  Briefcase,
  Megaphone,
  Search,
  Filter,
  Plus
} from "lucide-react";

interface CommandCenterProps {
  onNavigate?: (screen: string) => void;
}

export function CommandCenter({ onNavigate }: CommandCenterProps) {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Helper to navigate safely
  const handleNav = (screen: string) => {
    if (onNavigate) onNavigate(screen);
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "tasks", label: "Tasks Flow" },
    { id: "sponsors", label: "Sponsors & Activations" },
    { id: "timeline", label: "Timeline" },
    { id: "ai", label: "AI Insights" },
    { id: "roi", label: "ROI Dashboard" }
  ];

  const kpis = [
    { label: "Event Progress", value: "78%", trend: "+12%", trendUp: true, type: "progress" },
    { label: "Tasks Active", value: "112", trend: "14 Overdue", trendUp: false, alert: true },
    { label: "Sponsors", value: "12", trend: "100% Active", trendUp: true },
    { label: "Attendees", value: "1,540", trend: "+15%", trendUp: true },
    { label: "Deliverables", value: "23", trend: "5 Pending", trendUp: false },
    { label: "Budget Used", value: "64%", trend: "On Track", trendUp: true },
  ];

  const workflowSteps = [
    { id: 1, title: "Pre-Production", desc: "Goals, Budget, Team", icon: ClipboardCheck, status: "Completed", progress: 100, overdue: 0 },
    { id: 2, title: "Venue & Logistics", desc: "Booking, Vendors, Safety", icon: Building2, status: "In Progress", progress: 65, overdue: 2 },
    { id: 3, title: "Creative Design", desc: "Concept, Assets, Run-of-Show", icon: Palette, status: "In Progress", progress: 40, overdue: 1 },
    { id: 4, title: "On-Site Ops", desc: "Install, Rehearsals, Show", icon: Zap, status: "Pending", progress: 0, overdue: 0 },
    { id: 5, title: "Post-Event", desc: "Reporting, ROI, Analytics", icon: BarChart3, status: "Pending", progress: 0, overdue: 0 },
  ];

  const alerts = [
    { id: 1, message: "Backstage congestion risk detected for Runway A", level: "High", time: "10m ago", relatedStep: "On-Site Ops" },
    { id: 2, message: "Lighting test overdue · Stage 1", level: "High", time: "45m ago", relatedStep: "Venue & Logistics" },
    { id: 3, message: "VIP check-in desk understaffed on Day 2", level: "Medium", time: "2h ago", relatedStep: "On-Site Ops" },
  ];

  const milestones = [
    { name: "Casting Day", status: "completed", date: "Aug 28", phase: "Pre-Production" },
    { name: "Stage Build", status: "active", date: "Sep 02", phase: "Venue & Logistics" },
    { name: "Tech Rehearsal", status: "upcoming", date: "Sep 08", phase: "On-Site Ops" },
    { name: "Showtime", status: "upcoming", date: "Sep 10", phase: "On-Site Ops" },
  ];

  const sponsors = [
    { name: "Chanel", tier: "Platinum", status: "Active", tasks: 4, pending: 2 },
    { name: "Dior", tier: "Gold", status: "On Track", tasks: 3, pending: 0 },
    { name: "Puma", tier: "Silver", status: "Review", tasks: 5, pending: 3 },
  ];

  const upcomingTasks = [
    { title: "Finalize model walk order", due: "Tomorrow", owner: "Ella", priority: "High", phase: "Creative Design" },
    { title: "Approve stage lighting plan", due: "2 Days Left", owner: "Marco", priority: "High", phase: "Venue & Logistics" },
    { title: "Confirm afterparty vendor", due: "Today", owner: "Events Team", priority: "Medium", phase: "Pre-Production" },
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F5] font-sans pb-20 relative">
      
      {/* 1. HEADER */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-[1800px] mx-auto px-4 md:px-6 pt-6 pb-0">
          <div className="flex flex-col lg:flex-row justify-between gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                <span>Events</span>
                <span className="text-gray-300">/</span>
                <span>NYFW SS25</span>
              </div>
              <h1 className="text-3xl font-serif font-medium text-[#1A1A1A] mb-2">Event Command Center</h1>
              <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                 <span className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 text-[#166534] rounded-full border border-green-100 text-xs uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#166534] animate-pulse" /> Active
                 </span>
                 <span>Skylight Clarkson, NYC</span>
                 <span className="text-gray-300">•</span>
                 <span>Sep 10 - 12, 2025</span>
              </div>
            </div>

            {/* KPI ROW - Compact in Header for Desktop */}
            <div className="flex-1 lg:max-w-4xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-0">
               {kpis.map((kpi, i) => (
                  <div key={i} className="bg-gray-50 lg:bg-transparent p-3 rounded-lg lg:border-r lg:last:border-r-0 border-gray-100 lg:rounded-none lg:px-6 flex flex-col justify-center">
                     <div className="text-xs text-gray-500 mb-1 font-medium">{kpi.label}</div>
                     <div className="text-xl font-semibold text-[#1A1A1A] mb-1">{kpi.value}</div>
                     {kpi.type === 'progress' ? (
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                           <div className="bg-[#1A1A1A] h-1 rounded-full" style={{ width: kpi.value }} />
                        </div>
                     ) : (
                        <div className={`text-[10px] font-bold flex items-center gap-1 ${kpi.alert ? 'text-[#991B1B]' : kpi.trendUp ? 'text-[#166534]' : 'text-gray-500'}`}>
                           {kpi.alert ? <AlertCircle className="w-3 h-3" /> : kpi.trendUp ? <TrendingUp className="w-3 h-3" /> : null}
                           {kpi.trend}
                        </div>
                     )}
                  </div>
               ))}
            </div>

            <div className="flex items-center gap-3 self-start lg:self-center">
               <button 
                 onClick={() => handleNav("tasks-event-planning")}
                 className="px-5 py-2.5 bg-[#1A1A1A] text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm flex items-center gap-2"
               >
                 Go to Workflows <ArrowRight className="w-4 h-4" />
               </button>
            </div>
          </div>

          {/* SUB NAVIGATION */}
          <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? "border-[#1A1A1A] text-[#1A1A1A]" 
                    : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT */}
      <div className="max-w-[1800px] mx-auto px-4 md:px-6 py-8 space-y-8">
        
        {/* EVENT WORKFLOW OVERVIEW */}
        <section>
           <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-serif font-medium text-[#1A1A1A]">Event Workflow Overview</h2>
              <button onClick={() => handleNav("tasks-event-planning")} className="text-sm text-[#1A1A1A] font-medium hover:underline">View All Flows</button>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {workflowSteps.map((step) => {
                 const Icon = step.icon;
                 return (
                    <motion.div 
                      key={step.id}
                      whileHover={{ y: -4 }}
                      className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all group cursor-pointer"
                      onClick={() => handleNav("tasks-event-planning")}
                    >
                       <div className="flex justify-between items-start mb-4">
                          <div className="p-2 bg-gray-50 rounded-lg text-gray-900 group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors">
                             <Icon className="w-5 h-5" />
                          </div>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                             step.status === 'Completed' ? 'bg-[#DCFCE7] text-[#166534]' : 
                             step.status === 'In Progress' ? 'bg-[#FEF3C7] text-[#92400E]' : 'bg-gray-50 text-gray-500'
                          }`}>
                             {step.status}
                          </span>
                       </div>
                       <div className="mb-4">
                          <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Step {step.id}</div>
                          <h3 className="font-semibold text-[#1A1A1A] leading-tight mb-1 text-base">{step.title}</h3>
                          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{step.desc}</p>
                       </div>
                       
                       {/* Mini Progress */}
                       <div className="w-full bg-gray-100 h-1 rounded-full mb-4 overflow-hidden">
                          <div className="bg-[#1A1A1A] h-full rounded-full" style={{ width: `${step.progress}%` }} />
                       </div>

                       <div className="grid grid-cols-2 gap-2">
                          <button className="py-2 text-xs font-semibold bg-[#1A1A1A] text-white rounded-lg hover:bg-gray-800 transition-colors">View Tasks</button>
                          <button className="py-2 text-xs font-semibold bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">Deliverables</button>
                       </div>
                    </motion.div>
                 );
              })}
           </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* LEFT COLUMN (8 Cols) */}
           <div className="lg:col-span-8 space-y-8">
              
              {/* CRITICAL ALERTS */}
              <div className="bg-white rounded-xl border border-red-100 shadow-sm overflow-hidden">
                 <div className="px-6 py-4 border-b border-red-50 bg-[#FEF2F2] flex items-center justify-between">
                    <h3 className="font-semibold text-[#991B1B] flex items-center gap-2">
                       <AlertTriangle className="w-5 h-5" /> Critical Alerts
                    </h3>
                    <span className="px-2.5 py-0.5 bg-red-100 text-[#991B1B] text-xs rounded-full font-bold uppercase tracking-wide">3 Active</span>
                 </div>
                 <div className="divide-y divide-gray-50">
                    {alerts.map(alert => (
                       <div key={alert.id} className="p-4 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex gap-4">
                             <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${alert.level === 'High' ? 'bg-[#991B1B]' : 'bg-[#D97706]'}`} />
                             <div>
                                <p className="text-sm font-medium text-[#1A1A1A]">{alert.message}</p>
                                <div className="flex items-center gap-2 mt-1">
                                   <span className={`text-xs font-bold uppercase ${alert.level === 'High' ? 'text-[#991B1B]' : 'text-[#D97706]'}`}>{alert.level} Risk</span>
                                   <span className="text-gray-300">•</span>
                                   <span className="text-xs text-gray-500">in {alert.relatedStep}</span>
                                   <span className="text-gray-300">•</span>
                                   <span className="text-xs text-gray-400 font-medium">{alert.time}</span>
                                </div>
                             </div>
                          </div>
                          <div className="flex gap-2 pl-6 sm:pl-0">
                             <button 
                               onClick={() => handleNav("tasks-event-planning")}
                               className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                             >
                                View Tasks
                             </button>
                             <button className="px-3 py-1.5 bg-[#F3E8FF] text-[#6B21A8] text-xs font-semibold rounded-lg hover:bg-purple-100 transition-colors flex items-center gap-1">
                                <Sparkles className="w-3 h-3" /> Suggest Fix
                             </button>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              {/* TIMELINE & UPCOMING TASKS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 
                 {/* Timeline */}
                 <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                       <h3 className="font-serif font-bold text-[#1A1A1A] flex items-center gap-2"><Clock className="w-5 h-5 text-gray-400" /> Timeline</h3>
                       <button className="text-xs text-[#1A1A1A] font-semibold hover:underline">View Full</button>
                    </div>
                    <div className="space-y-6 relative pl-4 border-l border-gray-100">
                       {milestones.map((m, i) => (
                          <div key={i} className="relative">
                             <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 bg-white ${
                                m.status === 'completed' ? 'border-[#166534]' : m.status === 'active' ? 'border-[#1A1A1A] ring-4 ring-gray-50' : 'border-gray-300'
                             }`} />
                             <div className="flex justify-between items-start group cursor-pointer" onClick={() => handleNav("tasks-event-planning")}>
                                <div>
                                   <div className={`text-sm font-bold ${m.status === 'active' ? 'text-[#1A1A1A]' : 'text-gray-600'}`}>{m.name}</div>
                                   <div className="text-xs text-gray-400 mt-0.5 font-medium">{m.date} • {m.phase}</div>
                                </div>
                                <button className="opacity-0 group-hover:opacity-100 text-xs text-[#1A1A1A] font-semibold transition-opacity">View Tasks</button>
                             </div>
                          </div>
                       ))}
                    </div>
                    <button className="w-full mt-6 py-2 bg-[#F3E8FF] text-[#6B21A8] text-xs font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-purple-100 transition-colors">
                       <Sparkles className="w-3 h-3" /> Analyze Timeline Risk
                    </button>
                 </div>

                 {/* Upcoming Tasks */}
                 <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col">
                    <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                       <h3 className="font-serif font-bold text-[#1A1A1A] flex items-center gap-2"><CheckSquare className="w-5 h-5 text-gray-400" /> Upcoming</h3>
                       <div className="flex gap-1">
                          <button className="p-1 hover:bg-gray-50 rounded"><Filter className="w-4 h-4 text-gray-400" /></button>
                       </div>
                    </div>
                    <div className="flex-1 p-2">
                       {upcomingTasks.map((task, i) => (
                          <div key={i} className="p-3 hover:bg-gray-50 rounded-lg transition-colors group cursor-pointer" onClick={() => handleNav("tasks-event-planning")}>
                             <div className="flex justify-between items-start mb-1">
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{task.phase}</div>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${task.priority === 'High' ? 'bg-[#FEE2E2] text-[#991B1B]' : 'bg-blue-50 text-blue-700'}`}>{task.priority}</span>
                             </div>
                             <h4 className="text-sm font-semibold text-[#1A1A1A] mb-2 group-hover:text-black transition-colors">{task.title}</h4>
                             <div className="flex items-center justify-between">
                                <div className="text-xs text-gray-500 flex items-center gap-2 font-medium">
                                   <Calendar className="w-3 h-3" /> {task.due}
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                   <span className="text-xs text-[#1A1A1A] font-semibold">Open Phase</span>
                                   <ArrowRight className="w-3 h-3 text-[#1A1A1A]" />
                                </div>
                             </div>
                          </div>
                       ))}
                    </div>
                    <div className="p-3 border-t border-gray-50 bg-gray-50/50 rounded-b-xl flex gap-2">
                       <button 
                         onClick={() => handleNav("tasks-event-planning")}
                         className="flex-1 py-2 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50 transition-colors"
                       >
                          Go to All Tasks
                       </button>
                       <button className="flex-1 py-2 bg-[#1A1A1A] text-white text-xs font-bold rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-1">
                          <Sparkles className="w-3 h-3" /> Auto-Group
                       </button>
                    </div>
                 </div>

              </div>
           </div>

           {/* RIGHT COLUMN (4 Cols) */}
           <div className="lg:col-span-4 space-y-8">
              
              {/* AI INSIGHTS - Luxury Card */}
              <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] rounded-2xl text-white overflow-hidden shadow-xl relative group">
                 {/* Decorative elements */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                 
                 <div className="p-6 relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                       <div className="p-2 bg-white/10 rounded-lg backdrop-blur-md border border-white/10 shadow-inner">
                          <Sparkles className="w-5 h-5 text-purple-200" />
                       </div>
                       <div>
                          <h3 className="font-serif font-bold text-lg text-white">Gemini Insights</h3>
                          <p className="text-xs text-gray-400 font-medium">Real-time event optimization</p>
                       </div>
                    </div>

                    <div className="space-y-3 mb-6">
                       <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                          <div className="text-[10px] font-bold text-purple-200 uppercase tracking-widest mb-2">Workflow Optimization</div>
                          <p className="text-sm text-gray-200 leading-relaxed mb-3">
                             Crew allocation in <span className="font-bold text-white">Venue Ops</span> is inefficient. Shifting 2 techs to Zone B could save 45 mins.
                          </p>
                          <div className="flex gap-2">
                             <button className="px-3 py-1.5 bg-white text-black text-xs font-bold rounded-lg hover:bg-gray-100 transition-colors">Assign to Phase</button>
                             <button className="px-3 py-1.5 bg-transparent border border-white/20 text-gray-300 text-xs font-medium rounded-lg hover:bg-white/5 transition-colors">Ignore</button>
                          </div>
                       </div>
                       
                       <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                          <div className="text-[10px] font-bold text-amber-200 uppercase tracking-widest mb-2 flex items-center gap-2">
                             <AlertTriangle className="w-3 h-3" /> Risk Prediction
                          </div>
                          <p className="text-sm text-gray-200 leading-relaxed">
                             VIP Check-in bottleneck predicted for Day 2 based on current attendee data.
                          </p>
                       </div>
                    </div>

                    <button className="w-full py-3 bg-[#F3E8FF] hover:bg-white text-[#6B21A8] hover:text-black text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg">
                       <Sparkles className="w-4 h-4" /> Run Full Diagnostics
                    </button>
                 </div>
              </div>

              {/* SPONSORS */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                 <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif font-bold text-[#1A1A1A] flex items-center gap-2"><Zap className="w-5 h-5 text-gray-400" /> Sponsors</h3>
                    <button onClick={() => handleNav("tasks-sponsorship")} className="text-xs text-[#1A1A1A] font-semibold hover:underline">View Workflow</button>
                 </div>
                 
                 <div className="space-y-3 mb-4">
                    {sponsors.map((s, i) => (
                       <div key={i} className="p-3 bg-[#F7F7F5] rounded-xl border border-gray-100 hover:border-gray-300 transition-colors cursor-pointer" onClick={() => handleNav("tasks-sponsorship")}>
                          <div className="flex justify-between items-center mb-2">
                             <span className="font-bold text-[#1A1A1A]">{s.name}</span>
                             <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border ${
                                s.tier === 'Platinum' ? 'bg-white border-gray-200 text-gray-700' : 'bg-[#FEF3C7] border-amber-200 text-[#92400E]'
                             }`}>{s.tier}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                             <span>{s.status}</span>
                             <div className="flex items-center gap-2">
                                <span className="text-[#1A1A1A] font-semibold">{s.tasks} tasks</span>
                                {s.pending > 0 && <span className="text-[#92400E] font-semibold">{s.pending} pending</span>}
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
                 
                 <button onClick={() => handleNav("tasks-sponsorship")} className="w-full py-2 text-xs font-bold text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    Open Sponsorship Workflow
                 </button>
                 <button onClick={() => handleNav("sponsor-detail")} className="w-full mt-2 py-2 text-xs font-bold text-white bg-[#1A1A1A] rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                    View Chanel Detail (Demo)
                 </button>
              </div>

           </div>

        </div>

      </div>

      {/* 3. FOOTER WORKFLOW MAP */}
      <div className="fixed bottom-0 left-0 lg:left-64 right-0 bg-white border-t border-gray-100 px-6 py-3 z-20 hidden md:flex items-center justify-between shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)]">
         <div className="flex items-center gap-6">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Event Progress</span>
            <div className="flex items-center">
               {workflowSteps.map((step, i) => (
                  <div key={step.id} className="flex items-center group cursor-pointer" onClick={() => handleNav("tasks-event-planning")}>
                     <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className={`w-2 h-2 rounded-full ${step.status === 'Completed' ? 'bg-[#166534]' : step.status === 'In Progress' ? 'bg-[#1A1A1A] animate-pulse' : 'bg-gray-300'}`} />
                        <span className={`text-xs font-bold ${step.status === 'Pending' ? 'text-gray-400' : 'text-gray-700'}`}>{step.title}</span>
                     </div>
                     {i < workflowSteps.length - 1 && <div className="w-4 h-px bg-gray-200 mx-1" />}
                     
                     {/* Hover Tooltip Custom */}
                     <div className="absolute bottom-14 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1A1A1A] text-white text-xs rounded-lg p-2 shadow-xl pointer-events-none">
                        <div className="font-bold mb-1">{step.title}</div>
                        <div className="text-gray-300">Progress: {step.progress}%</div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         <div className="text-xs text-gray-400 font-medium">
            Last updated: Just now
         </div>
      </div>

    </div>
  );
}
