import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Circle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { useBrandShoot } from '../../context/BrandShootContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function ProductionTimeline({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { 
    activeProjects, 
    campaignPlan, 
    productionChecklist, 
    shotList, 
    galleryAssets 
  } = useBrandShoot();
  
  const project = activeProjects.length > 0 ? activeProjects[0] : null;

  // --- Metrics ---
  const totalAssets = shotList.length || 30;
  const videoAssets = shotList.filter(s => s.type === 'Video').length || 8;
  const photoAssets = totalAssets - videoAssets;
  
  // Progress
  const completedShots = shotList.filter(s => s.status === 'Completed').length;
  // const videoProgress = (completedShots / totalAssets) * 100 * 0.4; // Unused
  // const photoProgress = (completedShots / totalAssets) * 100 * 0.8; // Unused

  const displayProject = project || {
    name: campaignPlan?.strategy.title || "Summer '25 Campaign",
    status: "Production Readiness",
    date: new Date().toLocaleDateString(),
  };

  // --- Timeline Data ---
  const steps = [
    {
      id: 1,
      title: "Production Readiness",
      status: "active",
      badgeText: "Active Phase",
      date: "Oct 24 - Oct 30",
      items: [
        { label: `Shot list locked (${completedShots}/${totalAssets} Ready)`, checked: productionChecklist.shotListLocked, route: "shotlist" },
        { label: "Talent confirmed", checked: productionChecklist.talentConfirmed, route: "cura-casting" },
        { label: "Styling breakdown", checked: false, route: "sample-tracker" },
        { label: "Call sheet issued", checked: productionChecklist.callSheetIssued, route: "call-sheet" },
      ],
      aiNote: "3 talent profiles shortlisted to match Urban / Editorial direction.",
      cta: { label: "Review casting options", route: "cura-casting" }
    },
    {
      id: 2,
      title: "Capture Day",
      status: "upcoming",
      badgeText: "Upcoming",
      date: "Nov 02",
      location: "Milk Studios, NYC",
      items: [],
      aiNote: "Weather conditions optimal for outdoor lifestyle shots."
    },
    {
      id: 3,
      title: "Editing & Review",
      status: "upcoming",
      badgeText: "Upcoming",
      date: "Nov 03 - Nov 07",
      items: [
        { label: "Assets ingesting", checked: false },
        { label: "Client review", checked: false }
      ],
      aiNote: "Priority assets will be retouched first for early review.",
      cta: { label: "Review assets", route: "gallery" }
    },
    {
      id: 4,
      title: "Final Delivery",
      status: "upcoming",
      badgeText: "Upcoming",
      date: "Nov 08",
      items: [],
      cta: { label: "View final gallery", route: "gallery" }
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F5F1] font-sans text-[#111111] pb-24 lg:pb-0 relative">
      
      {/* --- Header --- */}
      <div className="bg-[#F8F5F1] sticky top-0 z-30 pt-6 pb-4 px-6 md:px-12 border-b border-transparent backdrop-blur-sm bg-opacity-95">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
           
           <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => onNavigate('overview')} className="-ml-2 hover:bg-black/5 rounded-full">
                 <ArrowLeft className="w-5 h-5 text-gray-500" />
              </Button>
              <div>
                 <div className="flex items-center gap-3 mb-1">
                    <h1 className="font-serif text-2xl text-[#111111]">{displayProject.name}</h1>
                    <Badge variant="secondary" className="bg-white border border-gray-100 text-[#111111] font-medium tracking-wide text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                        {displayProject.status}
                    </Badge>
                 </div>
                 <p className="text-sm text-[#6B6B6B]">Timeline optimized for your approved asset mix.</p>
              </div>
           </div>

           <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => onNavigate('tasks')} className="text-[#6B6B6B] hover:text-[#111111]">
                 View All Tasks
              </Button>
              <Button variant="outline" size="sm" className="bg-white border-gray-200 text-[#111111] hover:bg-gray-50 rounded-full px-6">
                 View Contract
              </Button>
           </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        
        {/* --- Left Column: Timeline --- */}
        <div className="lg:col-span-2 space-y-8 relative">
            {/* Vertical Line */}
            <div className="absolute left-[28px] top-8 bottom-8 w-[1px] bg-gray-200 hidden md:block z-0" />

            {steps.map((step) => (
                <TimelineCard 
                    key={step.id} 
                    step={step} 
                    onNavigate={onNavigate}
                />
            ))}
        </div>

        {/* --- Right Column: Decision Panel --- */}
        <div className="space-y-6">
            
            {/* Asset Mix Progress */}
            <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-white/50">
                <h3 className="font-serif text-lg text-[#111111] mb-6">Asset Mix Progress</h3>
                
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium text-[#111111]">Photos</span>
                            <span className="text-[#6B6B6B] tabular-nums">{photoAssets - 4} / {photoAssets}</span>
                        </div>
                        <Progress value={85} className="h-1.5 bg-gray-100" />
                    </div>
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium text-[#111111]">Video</span>
                            <span className="text-[#6B6B6B] tabular-nums">4 / {videoAssets}</span>
                        </div>
                        <Progress value={50} className="h-1.5 bg-gray-100" />
                    </div>
                </div>
                
                <p className="text-xs text-[#9CA3AF] mt-6 pt-4 border-t border-gray-50">
                    Progress based on approved scope.
                </p>
            </div>

            {/* AI Producer Insights */}
            <div className="bg-gradient-to-br from-[#1E1B4B] to-[#312E81] rounded-[24px] p-6 text-white shadow-lg shadow-indigo-900/10 relative overflow-hidden group">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Sparkles className="w-24 h-24" />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                            <Sparkles className="w-4 h-4 text-indigo-200" />
                        </div>
                        <span className="text-sm font-medium text-indigo-100">AI Producer</span>
                    </div>
                    
                    <p className="text-lg font-serif leading-snug mb-6 text-white/90">
                        "Adding 2 TikTok-native cuts could increase reach without extending shoot time."
                    </p>

                    <div className="flex flex-col gap-2">
                        <Button 
                            className="w-full bg-white text-indigo-950 hover:bg-indigo-50 border-0"
                            onClick={() => onNavigate('ai-optimization')}
                        >
                            Ask AI Producer
                        </Button>
                        <button className="text-xs text-indigo-300 hover:text-white py-2 transition-colors">
                            Dismiss Recommendation
                        </button>
                    </div>
                </div>
            </div>

            {/* Priority Assets */}
            <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-white/50">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif text-lg text-[#111111]">Priority Assets</h3>
                    <button className="text-xs font-medium text-[#6B6B6B] hover:text-[#111111]" onClick={() => onNavigate('gallery')}>
                        View All
                    </button>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                    {[1,2,3].map((i) => (
                        <div key={i} className="aspect-[3/4] rounded-lg bg-gray-100 overflow-hidden relative group cursor-pointer" onClick={() => onNavigate('gallery')}>
                            <ImageWithFallback 
                                src={`https://images.unsplash.com/photo-${i === 1 ? '1515886657613-9f3515b0c78f' : i === 2 ? '1529139574466-a3023c7e7f51' : '1550614000-4b9519e099f7'}?q=80&w=300&auto=format&fit=crop`}
                                alt="Asset preview"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                            />
                        </div>
                    ))}
                </div>
            </div>

        </div>

      </div>

      {/* Floating Action */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button 
            className="h-14 pl-6 pr-8 rounded-full bg-[#111111] hover:bg-black text-white shadow-xl shadow-black/10 flex items-center gap-3 transition-transform hover:scale-105"
            onClick={() => onNavigate('ai-thinking')}
        >
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span className="font-medium text-lg">Ask AI Producer</span>
        </Button>
      </div>

    </div>
  );
}

function TimelineCard({ step, onNavigate }: { step: any, onNavigate: (page: string) => void }) {
    const isActive = step.status === 'active';
    // const isCompleted = step.status === 'completed'; // Unused

    return (
        <div className="relative pl-0 md:pl-0 z-10">
            {/* Visual Timeline Marker (Desktop) */}
            <div className={`
                absolute left-[8px] top-8 w-10 h-10 rounded-full border-[3px] z-20 hidden md:flex items-center justify-center bg-[#F8F5F1] transition-colors duration-300
                ${isActive ? 'border-indigo-500 text-indigo-500' : 'border-gray-200 text-gray-300'}
            `}>
                <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-indigo-500' : 'bg-gray-300'}`} />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`
                    ml-0 md:ml-20 bg-white rounded-[24px] overflow-hidden border transition-all duration-300 relative group
                    ${isActive ? 'shadow-[0_8px_30px_rgba(0,0,0,0.04)] border-indigo-100/50 ring-1 ring-indigo-50' : 'shadow-sm border-transparent hover:border-gray-100'}
                `}
            >
                <div className="p-6 md:p-8">
                    {/* Header Row: Title + Badge */}
                    <div className="flex justify-between items-start mb-2">
                        <h3 className={`font-serif text-3xl ${isActive ? 'text-[#111111]' : 'text-gray-400'}`}>
                            {step.title}
                        </h3>
                        {isActive && (
                            <div className="bg-white border border-indigo-100 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-indigo-600 shadow-sm">
                                {step.badgeText}
                            </div>
                        )}
                         {!isActive && step.badgeText && (
                            <div className="bg-gray-50 border border-gray-100 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                {step.badgeText}
                            </div>
                        )}
                    </div>

                    {/* Date & Location Row */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="flex items-center gap-2 text-sm text-[#6B6B6B]">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {step.date}
                        </div>
                        {step.location && (
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-full text-xs font-medium text-gray-600 border border-gray-100">
                                <MapPin className="w-3.5 h-3.5" />
                                {step.location}
                            </div>
                        )}
                    </div>

                    {/* Content Body */}
                    <div className="space-y-6">
                        
                        {/* Checklist */}
                        {step.items.length > 0 && (
                            <div className="space-y-4">
                                {step.items.map((item: any, i: number) => (
                                    <div 
                                        key={i} 
                                        className={`flex items-center gap-3 group/item ${item.route ? 'cursor-pointer' : ''}`}
                                        onClick={() => item.route && onNavigate(item.route)}
                                    >
                                        <div className="shrink-0 transition-colors duration-300">
                                            {item.checked ? (
                                                <CheckCircle2 className="w-6 h-6 text-[#2FBF71]" />
                                            ) : (
                                                <Circle className="w-6 h-6 text-gray-200 group-hover/item:text-gray-300" />
                                            )}
                                        </div>
                                        <span className={`text-base font-medium ${item.checked ? 'text-[#111111]' : 'text-gray-500'} ${item.route ? 'group-hover/item:text-indigo-600 transition-colors' : ''}`}>
                                            {item.label}
                                        </span>
                                        {item.route && (
                                            <ArrowRight className="w-4 h-4 text-gray-300 opacity-0 group-hover/item:opacity-100 group-hover/item:text-indigo-400 transition-all ml-auto transform group-hover/item:translate-x-1" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* AI Note - Text Only, No Imagery */}
                        {step.aiNote && (
                            <div className={`
                                py-3 px-4 rounded-lg flex items-start gap-3 text-sm leading-relaxed mt-4
                                ${isActive ? 'bg-indigo-50/40 text-indigo-900' : 'bg-gray-50/50 text-gray-400'}
                            `}>
                                <Sparkles className={`w-4 h-4 shrink-0 mt-0.5 ${isActive ? 'text-indigo-500' : 'text-gray-400'}`} />
                                <span className={isActive ? 'font-medium' : ''}>
                                    "{step.aiNote}"
                                </span>
                            </div>
                        )}

                        {/* CTA */}
                        {step.cta && (
                            <div className="pt-2">
                                <button 
                                    onClick={() => onNavigate(step.cta.route)}
                                    className="text-sm font-semibold text-[#111111] hover:text-indigo-600 flex items-center gap-2 group/link transition-colors"
                                >
                                    {step.cta.label}
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                                </button>
                            </div>
                        )}

                    </div>

                </div>
            </motion.div>
        </div>
    );
}