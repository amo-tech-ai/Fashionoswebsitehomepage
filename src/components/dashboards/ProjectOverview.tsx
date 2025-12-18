import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileImage, 
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Zap,
  Package,
  Camera,
  Edit3,
  Send,
  MapPin,
  Users as UsersIcon,
  Sun,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { useBrandShoot } from '../../context/BrandShootContext';

export function ProjectOverview({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { activeProjects, campaignPlan, shortlistedLocations, confirmedLocation, wizardData } = useBrandShoot();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTimelineEvent, setSelectedTimelineEvent] = useState<any | null>(null);

  // Focus on the most recent project (usually the one just created)
  const focusProject = activeProjects.length > 0 ? activeProjects[0] : null;

  // Derive status from wizard if we have a draft but no active project yet
  const hasDraft = !!wizardData && activeProjects.length === 3; // 3 is the default hardcoded count

  const handleProjectClick = (project: any) => {
    if (project.status === 'Editing' || project.status === 'Completed' || project.status === 'Review') {
        onNavigate('gallery');
    } else if (project.status === 'Pre-Production' || project.status === 'Shooting' || project.status === 'Scheduled' || project.status === 'AI Generated') {
        onNavigate('production-timeline');
    }
  };

  // New badge logic: if the project was created today
  const isNewProject = focusProject && new Date(focusProject.date).getDate() === new Date().getDate();

  const stats = [
    { label: "Active Projects", value: activeProjects.length.toString(), trend: "+2 this week", icon: TrendingUp },
    { label: "Pending Review", value: "8", trend: "Needs attention", icon: AlertCircle },
    { label: "Shoots this Week", value: "3", trend: "On schedule", icon: Calendar },
    { label: "Completed", value: "156", trend: "+12% vs last month", icon: CheckCircle2 },
  ];

  // Generate Timeline based on Project Status
  const getTimeline = (project: any) => {
    if (!project) return [];
    
    // Simulate dates based on project start date
    const startDate = new Date(project.date);
    const addDays = (days: number) => {
      const d = new Date(startDate);
      d.setDate(d.getDate() + days);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return [
      { step: 'Contract Signed', date: addDays(0), status: 'completed', icon: FileImage },
      { step: 'Products Shipped', date: addDays(2), status: project.status === 'Pre-Production' ? 'current' : 'completed', icon: Package },
      { step: 'Studio Shoot', date: addDays(7), status: project.status === 'Shooting' ? 'current' : (project.progress > 30 ? 'completed' : 'upcoming'), icon: Camera },
      { step: 'Post-Production', date: addDays(10), status: project.status === 'Editing' ? 'current' : (project.progress > 70 ? 'completed' : 'upcoming'), icon: Edit3 },
      { step: 'Final Delivery', date: addDays(14), status: project.status === 'Completed' ? 'completed' : 'upcoming', icon: Send },
    ];
  };

  const timeline = getTimeline(focusProject);

  return (
    <div className="min-h-screen bg-[#F8F5F1] p-6 lg:p-12 font-sans text-gray-900">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-serif text-gray-900 mb-2">Project Overview</h1>
          <p className="text-gray-500">Manage your shoots, deliverables, and client progress.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 w-64 shadow-sm"
            />
          </div>
          <button className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 shadow-sm">
            <Filter className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onNavigate('brand-shoot-start')} // Link to new AI flow
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/10"
          >
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>New AI Shoot</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[#F8F5F1] rounded-xl text-gray-900">
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                stat.trend.includes('+') ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
              }`}>
                {stat.trend}
              </span>
            </div>
            <div className="text-3xl font-serif font-medium text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Active Shoots Column */}
        <div className="xl:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-medium text-gray-900">Active Shoots</h2>
            <button className="text-sm text-gray-500 hover:text-gray-900 font-medium">View All</button>
          </div>

          <div className="space-y-4">
            {/* Draft Project Card */}
            {hasDraft && (
               <div 
                 onClick={() => onNavigate('proposal')}
                 className="group bg-gradient-to-r from-gray-900 to-gray-800 p-5 rounded-2xl shadow-md border border-gray-800 hover:shadow-lg transition-all flex flex-col md:flex-row gap-6 items-center relative overflow-hidden cursor-pointer"
               >
                 <div className="absolute top-0 right-0 bg-yellow-400 text-black text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-sm z-10">
                    DRAFT
                 </div>
                 <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden bg-gray-800 shrink-0 flex items-center justify-center border border-gray-700">
                    <Sparkles className="w-8 h-8 text-yellow-400" />
                 </div>
                 
                 <div className="flex-1 w-full text-white">
                   <div className="flex justify-between items-start mb-2">
                     <div>
                       <h3 className="text-lg font-medium mb-1 text-white">{wizardData?.category || "New Campaign"}</h3>
                       <p className="text-sm text-gray-400">AI Generated Draft • Not Launched</p>
                     </div>
                   </div>
                   
                   <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                     <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-yellow-400" /> {wizardData?.style || "Style"}</span>
                     <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Drafted just now</span>
                   </div>

                   <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                     <div className="h-full bg-yellow-400 rounded-full" style={{ width: '50%' }}></div>
                   </div>
                 </div>

                 <button className="px-4 py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-gray-100 transition-colors">
                    Resume
                 </button>
               </div>
            )}

            {activeProjects.map((shoot, idx) => (
              <div 
                key={shoot.id} 
                onClick={() => handleProjectClick(shoot)}
                className={`group bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-center relative overflow-hidden ${
                  (shoot.status === 'Editing' || shoot.status === 'Completed' || shoot.status === 'Review') ? 'cursor-pointer' : ''
                }`}
              >
                {idx === 0 && isNewProject && (
                  <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-sm z-10">
                    NEW
                  </div>
                )}
                <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                  <img src={shoot.image} alt={shoot.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{shoot.name}</h3>
                      <p className="text-sm text-gray-500">{shoot.client} • {shoot.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      shoot.status === 'Shooting' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                      shoot.status === 'Editing' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                      'bg-gray-50 text-gray-700 border-gray-100'
                    }`}>
                      {shoot.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1"><FileImage className="w-3 h-3" /> {shoot.deliverables}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Updated 2h ago</span>
                  </div>

                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-900 rounded-full" style={{ width: `${shoot.progress}%` }}></div>
                  </div>
                </div>

                <button className="p-3 hover:bg-gray-50 rounded-full border border-transparent hover:border-gray-200 transition-colors">
                   <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables / Timeline Column */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-medium text-gray-900">Production Timeline</h2>
            <button className="text-sm text-gray-500 hover:text-gray-900 font-medium">
              {focusProject?.name || "Select Project"}
            </button>
          </div>

          <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100">
            {focusProject ? (
              <div className="relative pl-4 space-y-8 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                {timeline.map((step, idx) => (
                  <div 
                    key={idx} 
                    className={`relative flex items-center gap-4 ${step.step === 'Studio Shoot' ? 'cursor-pointer hover:bg-gray-50 p-2 -ml-2 rounded-lg transition-colors group' : ''}`}
                    onClick={() => {
                       if (step.step === 'Studio Shoot') setSelectedTimelineEvent(step);
                    }}
                  >
                    <div className={`
                      relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2
                      ${step.status === 'completed' ? 'bg-green-50 border-green-200 text-green-600' : 
                        step.status === 'current' ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 
                        'bg-white border-gray-200 text-gray-300'}
                    `}>
                      {step.status === 'completed' ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <step.icon className="w-4 h-4" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className={`text-sm font-medium ${step.status === 'upcoming' ? 'text-gray-400' : 'text-gray-900'} ${step.step === 'Studio Shoot' ? 'group-hover:text-indigo-600' : ''}`}>
                          {step.step}
                        </span>
                        <span className="text-xs text-gray-400">{step.date}</span>
                      </div>
                      {step.status === 'current' && (
                        <span className="text-[10px] font-medium px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full">
                          In Progress
                        </span>
                      )}
                      {step.step === 'Studio Shoot' && (
                        <button 
                          onClick={(e) => {
                              e.stopPropagation();
                              onNavigate('call-sheet');
                          }}
                          className="text-[10px] text-indigo-600 font-medium block mt-0.5 hover:text-indigo-800 transition-colors"
                        >
                          View Dynamic Call Sheet
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
               <div className="text-center py-8 text-gray-400">No active projects</div>
            )}
            
            <button 
                onClick={() => onNavigate('gallery')}
                className="w-full mt-8 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
                View All Deliverables
            </button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
             <button onClick={() => onNavigate('shotlist')} className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group">
                <div className="w-10 h-10 bg-[#F8F5F1] rounded-xl flex items-center justify-center mb-3 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                    <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="text-sm font-medium text-gray-900">Shot List</div>
             </button>
             <button onClick={() => onNavigate('sample-tracker')} className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group">
                <div className="w-10 h-10 bg-[#F8F5F1] rounded-xl flex items-center justify-center mb-3 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                    <ShoppingBag className="w-5 h-5" />
                </div>
                <div className="text-sm font-medium text-gray-900">Sample Tracker</div>
             </button>
             <button onClick={() => onNavigate('billing')} className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group">
                <div className="w-10 h-10 bg-[#F8F5F1] rounded-xl flex items-center justify-center mb-3 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                    <TrendingUp className="w-5 h-5" />
                </div>
                <div className="text-sm font-medium text-gray-900">Billing</div>
             </button>
             <button onClick={() => onNavigate('cura-casting')} className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group">
                <div className="w-10 h-10 bg-[#F8F5F1] rounded-xl flex items-center justify-center mb-3 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-sm font-medium text-gray-900">Cura Casting</div>
             </button>
             <button onClick={() => onNavigate('casting-matchmaker')} className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group">
                <div className="w-10 h-10 bg-[#F8F5F1] rounded-xl flex items-center justify-center mb-3 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <UsersIcon className="w-5 h-5" />
                </div>
                <div className="text-sm font-medium text-gray-900">Matchmaker AI</div>
             </button>
             <button 
                onClick={() => {
                    if (confirmedLocation) toast.success("Location already confirmed!");
                    else if (shortlistedLocations.length > 0) onNavigate('scout-shortlist');
                    else onNavigate('scout-setup');
                }} 
                className={`p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group relative overflow-hidden`}
             >
                {confirmedLocation && <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 z-0" />}
                
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors relative z-10 ${
                    confirmedLocation ? 'bg-emerald-100 text-emerald-600' : 
                    shortlistedLocations.length > 0 ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white' : 
                    'bg-[#F8F5F1] group-hover:bg-emerald-600 group-hover:text-white'
                }`}>
                    {confirmedLocation ? <CheckCircle2 className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                </div>
                
                <div className="relative z-10">
                    <div className="text-sm font-medium text-gray-900">
                        {confirmedLocation ? 'Location Secured' : shortlistedLocations.length > 0 ? 'Review Shortlist' : 'Scout Location'}
                    </div>
                    {shortlistedLocations.length > 0 && !confirmedLocation && (
                        <div className="text-xs text-emerald-600 mt-0.5 font-medium">{shortlistedLocations.length} candidates</div>
                    )}
                    {confirmedLocation && (
                        <div className="text-xs text-gray-500 mt-0.5">Ready for call sheet</div>
                    )}
                </div>
             </button>
          </div>
        </div>

      </div>
      {/* --- CALL SHEET DRAWER --- */}
      <Sheet open={selectedTimelineEvent !== null} onOpenChange={(open) => !open && setSelectedTimelineEvent(null)}>
         <SheetContent className="sm:max-w-md">
           <SheetHeader className="mb-6">
             <div className="flex items-center gap-2 text-indigo-600 mb-2">
               <Calendar className="w-5 h-5" />
               <span className="text-sm font-bold uppercase tracking-wider">Production Day</span>
             </div>
             <SheetTitle className="font-serif text-3xl">Call Sheet</SheetTitle>
             <SheetDescription>
               Schedule for {selectedTimelineEvent?.date || "Production Day"}.
             </SheetDescription>
           </SheetHeader>
           
           <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3 mb-4">
                 <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                 <div>
                    <div className="text-sm font-medium text-gray-900">Milk Studios, Studio A</div>
                    <div className="text-xs text-gray-500">450 W 15th St, New York, NY</div>
                 </div>
              </div>
              <div className="flex items-start gap-3">
                 <UsersIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                 <div>
                    <div className="text-sm font-medium text-gray-900">Crew Size: 8</div>
                    <div className="text-xs text-gray-500">Photographer, Digitech, 2x Assist, Stylist, H&M, Model</div>
                 </div>
              </div>
           </div>

           <div className="relative pl-6 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-indigo-100">
              {[
                { time: "08:00 AM", event: "Crew Call", details: "Coffee & Gear Setup", icon: Clock },
                { time: "09:00 AM", event: "Talent Arrival", details: "Hair & Makeup begins", icon: UsersIcon },
                { time: "10:00 AM", event: "First Look", details: "White Cyc - Product Focus", icon: Camera },
                { time: "01:00 PM", event: "Lunch Break", details: "Catered by Tartine", icon: Sun },
                { time: "02:00 PM", event: "Second Look", details: "Lifestyle Set", icon: Camera },
                { time: "05:00 PM", event: "Wrap", details: "File backup & breakdown", icon: CheckCircle2 }
              ].map((item, i) => (
                 <div key={i} className="relative">
                    <div className="absolute -left-[23px] w-6 h-6 bg-white border-2 border-indigo-100 rounded-full flex items-center justify-center">
                       <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-xs font-bold text-indigo-600 mb-0.5">{item.time}</span>
                       <span className="text-sm font-medium text-gray-900">{item.event}</span>
                       <span className="text-xs text-gray-500">{item.details}</span>
                    </div>
                 </div>
              ))}
           </div>
           
           <div className="mt-8 pt-6 border-t border-gray-100">
              <button className="w-full py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-black transition-colors">
                Download Full Call Sheet (PDF)
              </button>
           </div>
         </SheetContent>
      </Sheet>

    </div>
  );
}

function Users(props: any) {
    return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
}

function ShoppingBag(props: any) {
    return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
    )
}
