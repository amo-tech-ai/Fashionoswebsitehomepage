import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Send, 
  Calendar, 
  FileText, 
  MoreHorizontal, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Paperclip, 
  ChevronRight,
  Phone,
  Mail,
  ShieldAlert,
  ArrowRight
} from "lucide-react";
import { EventSponsor } from "../../../lib/types/events.types";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";

interface SponsorDetailSidebarProps {
  sponsor: EventSponsor | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SponsorDetailSidebar({ sponsor, isOpen, onClose }: SponsorDetailSidebarProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'files'>('overview');
  const [note, setNote] = useState("");

  if (!sponsor) return null;

  const tierColors = {
    platinum: "bg-gray-100 text-gray-800 border-gray-200",
    gold: "bg-amber-50 text-amber-700 border-amber-200",
    silver: "bg-gray-50 text-gray-600 border-gray-200",
    bronze: "bg-orange-50 text-orange-700 border-orange-200"
  };

  const statusColors = {
    lead: "bg-blue-50 text-blue-700",
    qualified: "bg-indigo-50 text-indigo-700",
    discovery: "bg-purple-50 text-purple-700",
    proposal: "bg-amber-50 text-amber-700",
    negotiation: "bg-orange-50 text-orange-700",
    confirmed: "bg-emerald-50 text-emerald-700",
    fulfilled: "bg-green-50 text-green-700"
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/20 lg:bg-transparent cursor-default"
          />

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full md:w-[480px] bg-white shadow-2xl border-l border-gray-100 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex-shrink-0">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-900 text-white rounded-xl flex items-center justify-center text-2xl font-serif">
                    {sponsor.company_name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-serif font-bold text-gray-900 leading-tight">
                      {sponsor.company_name}
                    </h2>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${tierColors[sponsor.tier] || tierColors.silver}`}>
                        {sponsor.tier}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${statusColors[sponsor.status] || 'bg-gray-50 text-gray-600'}`}>
                        {sponsor.status}
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-gray-50 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Primary Actions */}
              <div className="flex gap-2">
                <Button className="flex-1 bg-[#1A1A1A] hover:bg-black text-white h-10">
                  <Send className="w-4 h-4 mr-2" />
                  Send Proposal
                </Button>
                <Button variant="outline" className="flex-1 border-gray-200 h-10">
                  <Calendar className="w-4 h-4 mr-2" />
                  Meeting
                </Button>
                <Button variant="ghost" size="icon" className="h-10 w-10 border border-gray-200 rounded-lg">
                  <MoreHorizontal className="w-4 h-4 text-gray-500" />
                </Button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-8">

                {/* AI Insights Card */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100 relative overflow-hidden">
                  <div className="flex items-start gap-3 relative z-10">
                    <div className="p-2 bg-white rounded-lg shadow-sm text-indigo-600">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-indigo-900 text-sm mb-1">Cura Insight</h3>
                      <p className="text-sm text-indigo-800/80 leading-relaxed mb-3">
                        {sponsor.fit_score && sponsor.fit_score > 80 
                          ? "Strong brand alignment detected. Suggest emphasizing the 'Sustainability' angle in your pitch deck to increase conversion probability by ~15%."
                          : "Moderate fit. Consider offering a flexible 'Silver' tier package to lower entry barrier."}
                      </p>
                      
                      {sponsor.fit_score && sponsor.fit_score > 90 && (
                        <div className="flex items-center gap-2 text-xs font-medium text-indigo-700 bg-white/60 px-3 py-1.5 rounded-lg inline-flex">
                          <ArrowRight className="w-3 h-3" />
                          Recommended: Schedule Demo
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Deal Value</div>
                    <div className="text-xl font-serif font-bold text-gray-900">${sponsor.amount.toLocaleString()}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Fit Score</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-serif font-bold text-gray-900">{sponsor.fit_score || 85}</span>
                      <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded">High</span>
                    </div>
                  </div>
                </div>

                {/* Next Steps Checklist */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Next Steps</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 transition-colors">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <span className="text-sm text-gray-700 font-medium flex-1">Send updated deck</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 transition-colors">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <span className="text-sm text-gray-700 font-medium flex-1">Schedule follow-up call</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 transition-colors opacity-50">
                      <input type="checkbox" checked readOnly className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <span className="text-sm text-gray-700 font-medium flex-1 line-through">Initial Outreach</span>
                    </label>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Activity Timeline</h3>
                  <div className="space-y-6 relative pl-2">
                    {/* Line */}
                    <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-100" />
                    
                    <div className="relative pl-6">
                      <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Email Sent: Q4 Proposal</p>
                          <p className="text-xs text-gray-500 mt-0.5">Sent to {sponsor.contact_name || 'Contact'}</p>
                        </div>
                        <span className="text-xs text-gray-400">2h ago</span>
                      </div>
                    </div>

                    <div className="relative pl-6">
                      <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Meeting Scheduled</p>
                          <p className="text-xs text-gray-500 mt-0.5">Demo with Marketing Team</p>
                        </div>
                        <span className="text-xs text-gray-400">Yesterday</span>
                      </div>
                    </div>

                    <div className="relative pl-6">
                      <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Lead Qualified</p>
                          <p className="text-xs text-gray-500 mt-0.5">Fit Score: {sponsor.fit_score}</p>
                        </div>
                        <span className="text-xs text-gray-400">Oct 24</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Sticky Input */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="relative">
                <input 
                  type="text" 
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a note..." 
                  className="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10"
                />
                <button 
                  disabled={!note}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-[#1A1A1A] text-white rounded-lg hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
