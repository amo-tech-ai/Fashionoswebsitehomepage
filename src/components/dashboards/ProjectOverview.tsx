import React, { useState } from 'react';
import { 
  AlertCircle, 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Zap, 
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  Package,
  Users,
  ShieldAlert
} from 'lucide-react';
import { motion } from 'motion/react';
import { useBrandShoot } from '../../context/BrandShootContext';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { AIProducerDrawer } from './AIProducerDrawer';
import { CriticalPathDetailModal } from './CriticalPathDetailModal';
import { ProposalDiffModal } from './ProposalDiffModal';
import { ProductionProgressStages } from './ProductionProgressStages';
import { MobileStickyBar } from './MobileStickyBar';

export function ProjectOverview({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { activeProjects, campaignPlan } = useBrandShoot();
  
  // Modal States
  const [isAIDrawerOpen, setIsAIDrawerOpen] = useState(false);
  const [isCriticalPathModalOpen, setIsCriticalPathModalOpen] = useState(false);
  const [isProposalDiffModalOpen, setIsProposalDiffModalOpen] = useState(false);
  const [hasPendingChanges, setHasPendingChanges] = useState(true); // Mock: AI has pending recommendations
  
  // Use the most relevant project or mock data if none exists
  const activeProject = activeProjects[0] || {
    name: "Andrewmaitenyi Summer '25",
    status: 'Shoot Day',
    date: 'Today',
    client: 'Andrewmaitenyi'
  };

  // Mock Data for Signals (Pulse Feed)
  const pulseFeed = [
    { id: 1, type: 'success', message: '5 Samples Received', time: '10m ago', source: 'Logistics' },
    { id: 2, type: 'warning', message: '1 Sample Delayed (Silk Scarf)', time: '30m ago', source: 'Logistics' },
    { id: 3, type: 'success', message: 'Contract Signed (Sarah K.)', time: '1h ago', source: 'Legal' },
    { id: 4, type: 'success', message: '3 Talent Confirmed', time: '2h ago', source: 'Casting' },
    { id: 5, type: 'neutral', message: 'Call Sheet Sent to Crew', time: '4h ago', source: 'Production' },
  ];

  // Mock Data for Immediate Actions
  const immediateActions = [
    { 
      id: 1, 
      title: 'Approve Indoor Swap', 
      reason: 'Rain expected at 2:00 PM', 
      deadline: 'By 12:00 PM', 
      action: 'Confirm Swap' 
    },
    { 
      id: 2, 
      title: 'Approve Backup Sample', 
      reason: 'Hero Scarf delayed', 
      deadline: 'Immediate', 
      action: 'View Options' 
    }
  ];

  const handleAIActionSelect = (action: string) => {
    if (action === 'fix-blocker') {
      setIsAIDrawerOpen(false);
      setIsCriticalPathModalOpen(true);
    } else if (action === 'adjust-timeline') {
      setIsAIDrawerOpen(false);
      setIsProposalDiffModalOpen(true);
    }
  };

  const handlePreviewFix = (fixId: string) => {
    setIsCriticalPathModalOpen(false);
    setIsProposalDiffModalOpen(true);
  };

  const handleApproveChange = () => {
    setIsProposalDiffModalOpen(false);
    // Show success state or refresh data
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] font-sans text-[#111111] p-4 lg:p-8">
      
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-serif font-bold text-[#111111]">{activeProject.name}</h1>
            <Badge variant="outline" className="bg-white border-gray-200 text-gray-500 uppercase tracking-wider text-[10px]">
              {activeProject.status}
            </Badge>
          </div>
          <p className="text-xs text-gray-400 font-mono uppercase tracking-wide">
            Last updated: Just now • Shoot Day 1 of 2
          </p>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-white border-gray-200 text-xs font-bold uppercase tracking-wider h-9">
                View Contract
            </Button>
            <Button 
                onClick={() => onNavigate('call-sheet')}
                className="bg-[#111111] text-white hover:bg-black text-xs font-bold uppercase tracking-wider h-9 shadow-lg shadow-black/10"
            >
                Live Control Room
            </Button>
        </div>
      </header>

      {/* --- MAIN GRID (12 Columns) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* --- LEFT COLUMN (8 Columns) --- */}
        <div className="lg:col-span-8 space-y-6">
            
            {/* SECTION 1: Campaign Snapshot */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center border-4 border-white shadow-sm shrink-0">
                        <AlertTriangle className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Overall Status</h2>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-serif text-[#111111]">At Risk</span>
                            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        </div>
                    </div>
                </div>

                <div className="h-10 w-px bg-gray-100 hidden md:block" />

                <div className="w-full md:w-auto">
                    <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Delivery Confidence</h2>
                    <span className="text-lg font-medium text-gray-700">Medium (72%)</span>
                </div>

                <div className="h-10 w-px bg-gray-100 hidden md:block" />

                <div className="w-full md:w-auto">
                    <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Shoot Day</h2>
                    <span className="text-lg font-medium text-gray-900">Today</span>
                </div>
            </section>

            {/* SECTION 3: Critical Path (Blockers) */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4" /> What's Blocking Delivery
                    </h3>
                </div>
                <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6 relative overflow-hidden group hover:bg-red-50 transition-colors cursor-pointer" onClick={() => onNavigate('sample-tracker')}>
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0 text-red-500 shadow-sm">
                                <Package className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-serif text-lg font-medium text-red-900">Silk Scarf (SKU-402) not received</h4>
                                <p className="text-sm text-red-700 mt-1">Required for Shot #4 (Tomorrow 9:00 AM)</p>
                                <div className="flex items-center gap-2 mt-3">
                                    <Badge variant="outline" className="bg-white/50 border-red-200 text-red-700 text-[10px]">
                                        Source: Sample Tracker
                                    </Badge>
                                    <Badge variant="outline" className="bg-red-100 border-red-200 text-red-800 text-[10px] font-bold">
                                        RISK: HIGH
                                    </Badge>
                                </div>
                            </div>
                        </div>
                        <Button className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-200 shrink-0">
                            Resolve with AI
                        </Button>
                    </div>
                </div>
            </section>

            {/* SECTION 4: Immediate Actions */}
            <section>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Decisions Needed Today
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {immediateActions.map(action => (
                        <Card key={action.id} className="p-5 hover:shadow-md transition-shadow border-gray-100 bg-white">
                            <div className="flex justify-between items-start mb-3">
                                <Badge variant="secondary" className="bg-gray-100 text-gray-600 font-mono text-[10px] uppercase">
                                    {action.deadline}
                                </Badge>
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            </div>
                            <h4 className="font-serif text-lg text-gray-900 mb-1">{action.title}</h4>
                            <p className="text-sm text-gray-500 mb-6">{action.reason}</p>
                            <Button variant="outline" className="w-full justify-between group hover:bg-gray-50 hover:text-black hover:border-gray-300">
                                {action.action}
                                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-black transition-colors" />
                            </Button>
                        </Card>
                    ))}
                </div>
            </section>

            {/* SECTION 5: Production Progress Stages */}
            <ProductionProgressStages 
                currentStage="capture"
                onNavigate={(stage) => onNavigate('production-timeline')}
            />

        </div>

        {/* --- RIGHT COLUMN (4 Columns) --- */}
        <div className="lg:col-span-4 space-y-6">
            
            {/* SECTION 5: AI Insight */}
            <section className="bg-[#111111] text-white rounded-2xl p-6 relative overflow-hidden shadow-2xl shadow-gray-200">
                <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                
                <div className="flex items-center gap-2 mb-4 text-indigo-300">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Executive Brief</span>
                </div>
                
                <p className="font-serif text-xl leading-relaxed mb-6 text-gray-100">
                    "Campaign is <span className="text-white font-bold border-b border-white/30">82% ready</span>. If Sample SKU-402 arrives by 10am, delivery remains on schedule."
                </p>

                <div className="space-y-2">
                    <Button 
                        onClick={() => setIsAIDrawerOpen(true)}
                        className="w-full bg-white text-black hover:bg-gray-200 text-xs font-bold uppercase tracking-wider h-10"
                    >
                        Ask AI a Question
                    </Button>
                    <Button variant="ghost" className="w-full text-gray-400 hover:text-white hover:bg-white/10 text-xs h-8">
                        Dismiss
                    </Button>
                </div>
            </section>

            {/* SECTION 2: Pulse Feed */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" /> Latest Signals
                    </h3>
                </div>
                
                <div className="space-y-6 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                    {pulseFeed.map((item, i) => (
                        <div key={item.id} className="relative pl-6 flex items-start gap-3 group">
                            <div className={`
                                absolute left-0 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center
                                ${item.type === 'success' ? 'bg-emerald-500' : 
                                  item.type === 'warning' ? 'bg-amber-500' : 'bg-gray-300'}
                            `}>
                                {item.type === 'success' && <CheckCircle2 className="w-2.5 h-2.5 text-white" />}
                                {item.type === 'warning' && <AlertTriangle className="w-2.5 h-2.5 text-white" />}
                            </div>
                            
                            <div className="flex-1">
                                <p className={`text-sm font-medium ${item.type === 'warning' ? 'text-amber-700' : 'text-gray-900'}`}>
                                    {item.message}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] text-gray-400 font-mono">{item.time}</span>
                                    <span className="text-[10px] text-gray-300">•</span>
                                    <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">{item.source}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <Button variant="ghost" className="w-full mt-6 text-xs text-gray-400 hover:text-gray-900 font-medium">
                    View Full History
                </Button>
            </section>

        </div>

      </div>

      {/* Modals */}
      <AIProducerDrawer 
        isOpen={isAIDrawerOpen}
        onClose={() => setIsAIDrawerOpen(false)}
        onActionSelect={handleAIActionSelect}
      />
      
      <CriticalPathDetailModal
        isOpen={isCriticalPathModalOpen}
        onClose={() => setIsCriticalPathModalOpen(false)}
        onPreviewFix={handlePreviewFix}
      />
      
      <ProposalDiffModal
        isOpen={isProposalDiffModalOpen}
        onClose={() => setIsProposalDiffModalOpen(false)}
        onApprove={handleApproveChange}
      />
      
      {/* Mobile Sticky Bottom Bar */}
      <MobileStickyBar
        onAskAI={() => setIsAIDrawerOpen(true)}
        onApproveChanges={() => setIsProposalDiffModalOpen(true)}
        hasPendingChanges={hasPendingChanges}
        isVisible={true}
      />
    </div>
  );
}