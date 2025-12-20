import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Circle,
  Sparkles,
  ArrowRight,
  Sun,
  Camera,
  Layers,
  ShoppingBag,
  Instagram,
  FileCheck,
  Clock,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { useBrandShoot } from '../../context/BrandShootContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

// --- Types ---
type TimelineStep = {
  id: number;
  title: string;
  status: 'active' | 'upcoming' | 'completed';
  type: 'readiness' | 'capture' | 'editing' | 'delivery';
  date: string;
  badgeText?: string;
  progress?: number;
  items?: { label: string; checked: boolean; route?: string }[];
  location?: string;
  aiNote?: string;
  cta?: { label: string; route: string };
  visuals?: { label: string; type: 'placeholder' | 'image'; src?: string }[];
};

export function ProductionTimeline({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { 
    activeProjects, 
    campaignPlan, 
    productionChecklist, 
    shotList 
  } = useBrandShoot();
  
  const project = activeProjects.length > 0 ? activeProjects[0] : null;

  // --- Metrics ---
  const totalAssets = shotList.length || 30;
  const videoAssets = shotList.filter(s => s.type === 'Video').length || 8;
  const photoAssets = totalAssets - videoAssets;
  
  const displayProject = project || {
    name: campaignPlan?.strategy.title || "Summer '25 Campaign",
    status: "Production Readiness",
  };

  // --- Timeline Data ---
  const steps: TimelineStep[] = [
    {
      id: 1,
      title: "Production Readiness",
      status: "active",
      type: 'readiness',
      badgeText: "In Progress",
      date: "Oct 24 - Oct 30",
      progress: 65,
      items: [
        { label: "Shot List Locked", checked: productionChecklist.shotListLocked, route: "shotlist" },
        { label: "Talent Confirmed", checked: productionChecklist.talentConfirmed, route: "cura-casting" },
        { label: "Styling Breakdown", checked: false, route: "sample-tracker" },
        { label: "Call Sheet Issued", checked: productionChecklist.callSheetIssued, route: "call-sheet" },
      ],
      aiNote: "3 talent profiles shortlisted to match Urban / Editorial direction.",
      cta: { label: "Review casting options", route: "cura-casting" }
    },
    {
      id: 2,
      title: "Capture Day",
      status: "upcoming",
      type: 'capture',
      badgeText: "Nov 02",
      date: "Nov 02",
      location: "Milk Studios, NYC",
      visuals: [
        { label: "Priority Look", type: "placeholder" },
        { label: "Hero Shot", type: "placeholder" },
        { label: "Lifestyle Frame", type: "placeholder" }
      ],
      aiNote: "Weather conditions optimal for outdoor lifestyle shots."
    },
    {
      id: 3,
      title: "Editing & Review",
      status: "upcoming",
      type: 'editing',
      badgeText: "Pending",
      date: "Nov 03 - Nov 07",
      cta: { label: "Review assets when ready", route: "gallery" }
    },
    {
      id: 4,
      title: "Final Delivery",
      status: "upcoming",
      type: 'delivery',
      badgeText: "Pending",
      date: "Nov 08",
      cta: { label: "View delivery gallery", route: "gallery" }
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-[#111111] pb-24 lg:pb-0 relative overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* --- Header --- */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100/50">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
           
           <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => onNavigate('overview')} className="-ml-2 hover:bg-black/5 rounded-full">
                 <ArrowLeft className="w-5 h-5 text-gray-500" />
              </Button>
              <div>
                 <div className="flex items-center gap-3 mb-0.5">
                    <h1 className="font-serif text-xl text-[#111111]">{displayProject.name}</h1>
                    <Badge variant="secondary" className="bg-[#F4F4F5] text-[#111111] font-medium tracking-wide text-[10px] uppercase px-2.5 py-0.5 rounded-full border-0">
                        {displayProject.status}
                    </Badge>
                 </div>
                 <p className="text-xs text-gray-500 font-medium">Production Control Room • Active</p>
              </div>
           </div>

           <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => onNavigate('tasks')} className="text-gray-500 hover:text-[#111111] text-xs font-medium">
                 Tasks & Deliverables
              </Button>
              <div className="h-4 w-px bg-gray-200" />
              <Button variant="outline" size="sm" className="bg-white border-gray-200 text-[#111111] hover:bg-gray-50 rounded-full px-5 h-9 text-xs font-bold" onClick={() => onNavigate('contracts')}>
                 View Contract
              </Button>
           </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        
        {/* --- Left Column: Timeline (70%) --- */}
        <div className="lg:col-span-8 space-y-12 relative">
            {/* Visual Guide Line */}
            <div className="absolute left-[28px] top-6 bottom-6 w-px bg-gray-100 hidden md:block z-0" />

            <div className="space-y-10">
              {steps.map((step) => (
                  <TimelineStepCard 
                      key={step.id} 
                      step={step} 
                      onNavigate={onNavigate}
                  />
              ))}
            </div>
        </div>

        {/* --- Right Column: Intelligence Panel (30%) --- */}
        <div className="lg:col-span-4 space-y-8">
            
             {/* 1. Asset Mix Progress */}
            <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="font-serif text-lg text-[#111111]">Asset Mix</h3>
                   <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-md">{totalAssets} Total</span>
                </div>
                
                <div className="space-y-8">
                    <div>
                        <div className="flex justify-between text-sm mb-3">
                            <span className="font-medium text-[#111111] flex items-center gap-2">
                                <Camera className="w-4 h-4 text-gray-400" />
                                Photography
                            </span>
                            <span className="text-gray-500 tabular-nums text-xs">{photoAssets - 4} / {photoAssets}</span>
                        </div>
                        <Progress value={85} className="h-1.5 bg-gray-100 [&>div]:bg-[#111111]" />
                    </div>
                    <div>
                        <div className="flex justify-between text-sm mb-3">
                            <span className="font-medium text-[#111111] flex items-center gap-2">
                                <Layers className="w-4 h-4 text-gray-400" />
                                Video Content
                            </span>
                            <span className="text-gray-500 tabular-nums text-xs">4 / {videoAssets}</span>
                        </div>
                        <Progress value={50} className="h-1.5 bg-gray-100 [&>div]:bg-[#111111]" />
                    </div>
                </div>
            </div>

            {/* 2. AI Producer Panel (Glassmorphic) */}
            <div className="sticky top-24 z-20">
                <div className="bg-[#1E1E24] text-white rounded-[24px] p-8 shadow-2xl shadow-indigo-900/20 relative overflow-hidden group">
                    {/* Abstract Background */}
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-purple-500/10 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/3" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-md shadow-inner border border-white/5">
                                <Sparkles className="w-4 h-4 text-indigo-200" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-indigo-200/80">Cura Intelligence</span>
                        </div>
                        
                        <p className="text-lg font-serif leading-relaxed mb-8 text-white/90">
                            "Based on recent engagement trends, adding <span className="text-white border-b border-white/30">2 TikTok-native cuts</span> could increase reach by ~15% without extending shoot time."
                        </p>

                        <div className="space-y-3">
                            <Button 
                                className="w-full h-12 bg-white text-[#1E1E24] hover:bg-gray-100 border-0 rounded-xl font-medium shadow-lg shadow-black/20"
                                onClick={() => onNavigate('ai-optimization')}
                            >
                                Review Recommendation
                            </Button>
                            <button className="w-full text-xs font-medium text-white/40 hover:text-white transition-colors py-2">
                                Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Priority Assets */}
            <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-serif text-lg text-[#111111]">Priority Shots</h3>
                    <button onClick={() => onNavigate('shotlist')} className="text-xs font-bold text-gray-400 hover:text-[#111111] uppercase tracking-wide">View All</button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                     {[
                        { label: "Hero: Product", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop" },
                        { label: "Hero: Lifestyle", img: "https://images.unsplash.com/photo-1529139574466-a3023c7e7f51?q=80&w=400&auto=format&fit=crop" },
                        { label: "Detail: Fabric", img: null },
                     ].map((item, i) => (
                        <div key={i} className="group cursor-pointer aspect-[3/4] relative rounded-xl bg-gray-50 overflow-hidden border border-gray-100" onClick={() => onNavigate('shotlist')}>
                            {item.img ? (
                                <ImageWithFallback 
                                    src={item.img}
                                    alt={item.label}
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gray-50 group-hover:bg-gray-100 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-300 shadow-sm">
                                       <Camera className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] text-gray-400 font-medium">Pending</span>
                                </div>
                            )}
                            <div className="absolute bottom-3 left-3 right-3">
                                <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-bold text-[#111111] shadow-sm truncate">
                                    {item.label}
                                </div>
                            </div>
                        </div>
                     ))}
                     
                     <div 
                       className="aspect-[3/4] rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-all group"
                       onClick={() => onNavigate('shotlist')}
                     >
                        <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-[#111111] group-hover:text-white flex items-center justify-center text-gray-400 transition-colors">
                           <ArrowRight className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-medium text-gray-500 group-hover:text-[#111111]">View List</span>
                     </div>
                </div>
            </div>

        </div>

      </div>
    </div>
  );
}

// --- Subcomponent: Step Card ---

function TimelineStepCard({ step, onNavigate }: { step: TimelineStep, onNavigate: (page: string) => void }) {
    const isActive = step.status === 'active';
    const isCompleted = step.status === 'completed';

    return (
        <div className="relative pl-0 md:pl-0 z-10 group/card">
            {/* Visual Timeline Marker (Desktop) */}
            <div className={`
                absolute left-[6px] top-8 w-12 h-12 rounded-full border-[4px] z-20 hidden md:flex items-center justify-center transition-all duration-300 bg-[#FAFAFA]
                ${isActive ? 'border-[#111111] text-[#111111] scale-110 shadow-lg' : 'border-gray-200 text-gray-300'}
                ${isCompleted ? 'bg-[#111111] border-[#111111] text-white' : ''}
            `}>
                {isCompleted ? (
                   <CheckCircle2 className="w-5 h-5" />
                ) : (
                   <span className="text-sm font-bold">{step.id.toString().padStart(2, '0')}</span>
                )}
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`
                    ml-0 md:ml-24 bg-white rounded-[32px] overflow-hidden border transition-all duration-300 relative
                    ${isActive ? 'shadow-xl shadow-gray-200/50 border-gray-100' : 'shadow-sm border-transparent hover:border-gray-200 opacity-60 hover:opacity-100 grayscale hover:grayscale-0'}
                `}
            >
                <div className="p-8 md:p-10">
                    {/* Header: Title + Status Pill */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                        <div>
                             <div className="flex items-center gap-3 mb-2">
                                <h3 className={`font-serif text-3xl ${isActive ? 'text-[#111111]' : 'text-gray-400'}`}>
                                    {step.title}
                                </h3>
                                {step.status === 'active' && (
                                    <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider border border-indigo-100">
                                        Active Phase
                                    </span>
                                )}
                             </div>
                             
                             <div className="flex items-center gap-6 text-sm text-gray-500 font-medium">
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-gray-400" />
                                    {step.date}
                                </span>
                                {step.location && (
                                    <span className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        {step.location}
                                    </span>
                                )}
                             </div>
                        </div>

                        {/* Step Specific Top Right Content */}
                        {isActive && step.progress && (
                            <div className="w-full md:w-56 bg-gray-50 rounded-2xl p-4 border border-gray-100">
                                <div className="flex justify-between text-xs mb-2 font-bold text-gray-500 uppercase tracking-wide">
                                    <span>Readiness</span>
                                    <span className="text-[#111111]">{step.progress}%</span>
                                </div>
                                <Progress value={step.progress} className="h-2 bg-gray-200 [&>div]:bg-[#111111]" />
                            </div>
                        )}
                    </div>

                    {/* Content based on Step Type */}
                    <div className="space-y-8">
                        
                        {/* 1. Readiness Type Content */}
                        {step.type === 'readiness' && step.items && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {step.items.map((item, i) => (
                                    <div 
                                        key={i} 
                                        className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${item.route ? 'cursor-pointer hover:border-gray-300 hover:bg-gray-50' : 'border-transparent'} ${item.checked ? 'bg-gray-50 border-transparent' : 'border-gray-100'}`}
                                        onClick={() => item.route && onNavigate(item.route)}
                                    >
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${item.checked ? 'bg-[#111111] border-[#111111] text-white' : 'border-gray-200 text-transparent'}`}>
                                            <CheckCircle2 className="w-4 h-4" />
                                        </div>
                                        <span className={`text-sm font-medium ${item.checked ? 'text-gray-900 line-through decoration-gray-300' : 'text-[#111111]'}`}>
                                            {item.label}
                                        </span>
                                        {item.route && (
                                            <ArrowRight className="w-4 h-4 text-gray-300 ml-auto" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* 2. Capture Type Content - Visual Placeholders */}
                        {step.type === 'capture' && step.visuals && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {step.visuals.map((vis, i) => (
                                    <div key={i} className="aspect-[3/4] bg-gray-50 rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center gap-3 hover:border-gray-300 transition-colors cursor-default">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-300">
                                           <Camera className="w-5 h-5" />
                                        </div>
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wide px-2 text-center">{vis.label}</span>
                                    </div>
                                ))}
                                <div className="aspect-[3/4] bg-[#111111] rounded-xl flex flex-col items-center justify-center gap-3 text-white shadow-lg cursor-pointer hover:bg-black transition-colors" onClick={() => onNavigate('shotlist')}>
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                       <MoreHorizontal className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wide">View All</span>
                                </div>
                            </div>
                        )}

                        {/* 3. Editing Type Content */}
                        {step.type === 'editing' && (
                             <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                <div className="space-y-4">
                                    <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-wide">
                                        <span>Retouch Queue (Priority)</span>
                                        <span>0 / 12</span>
                                    </div>
                                    <div className="flex h-3 bg-gray-200 rounded-full overflow-hidden gap-1 p-0.5">
                                        {[...Array(12)].map((_, i) => (
                                            <div key={i} className="flex-1 bg-white rounded-full opacity-50" />
                                        ))}
                                    </div>
                                </div>
                             </div>
                        )}

                         {/* 4. Delivery Type Content */}
                        {step.type === 'delivery' && (
                            <div className="flex flex-wrap gap-3">
                                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-100 text-sm font-medium text-gray-600">
                                    <Instagram className="w-4 h-4" /> Instagram Ready
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-100 text-sm font-medium text-gray-600">
                                    <ShoppingBag className="w-4 h-4" /> Shopify Optimization
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-100 text-sm font-medium text-gray-600">
                                    <FileCheck className="w-4 h-4" /> Usage Rights
                                </div>
                            </div>
                        )}

                        {/* AI Note - Specialized Box */}
                        {step.aiNote && (
                            <div className={`
                                flex items-start gap-4 p-5 rounded-2xl border transition-all
                                ${isActive ? 'bg-[#F8F5F1] border-gray-200' : 'bg-gray-50 border-gray-100 opacity-80'}
                            `}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isActive ? 'bg-[#111111] text-white' : 'bg-gray-200 text-gray-400'}`}>
                                    <Sparkles className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                    <p className={`text-sm italic leading-relaxed mb-3 ${isActive ? 'text-gray-700' : 'text-gray-500'}`}>
                                        "{step.aiNote}"
                                    </p>
                                    {step.status === 'active' && step.cta && (
                                        <button 
                                            onClick={() => onNavigate(step.cta!.route)}
                                            className="text-xs font-bold text-[#111111] uppercase tracking-wider flex items-center gap-2 hover:gap-3 transition-all group/cta"
                                        >
                                            {step.cta.label}
                                            <ArrowRight className="w-3 h-3" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                         {/* Standard CTA for upcoming steps */}
                        {!isActive && step.cta && (
                             <div className="pt-4 border-t border-gray-50">
                                <button 
                                    onClick={() => onNavigate(step.cta!.route)}
                                    className="text-sm font-bold text-[#111111] hover:text-gray-600 flex items-center gap-2 group/link transition-colors"
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
