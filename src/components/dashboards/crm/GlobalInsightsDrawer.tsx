import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, AlertCircle, Activity, Phone, Mail, FileText, Plus } from "lucide-react";

interface GlobalInsightsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalInsightsDrawer({ isOpen, onClose }: GlobalInsightsDrawerProps) {
  // Copied from CRMSidebar and adapted for Drawer
  const activities = [
    { text: "Call with Gucci completed", time: "2:14 PM", icon: Phone, color: "bg-[#DCFCE7] text-[#166534]" },
    { text: "Proposal sent to Prada", time: "Yesterday", icon: Mail, color: "bg-blue-50 text-blue-700" },
    { text: "Marie from Chanel viewed pitch deck", time: "Yesterday", icon: FileText, color: "bg-[#F3E8FF] text-[#6B21A8]" },
    { text: "New sponsor lead added: Fendi", time: "2 days ago", icon: Plus, color: "bg-gray-100 text-gray-600" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full md:w-[400px] bg-[#1A1A1A] text-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Sparkles className="w-5 h-5 text-purple-200" />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-lg text-white">AI Intelligence</h2>
                  <p className="text-xs text-gray-400">Global Rail & Risk Analysis</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {/* High Level Insights */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Key Insights</h3>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2 text-[#DCFCE7] text-[10px] font-bold uppercase tracking-wider">
                     <Sparkles className="w-3 h-3" />
                     Opportunity
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    <span className="text-white font-bold">Dior</span> has a 92% probability of conversion. Suggest scheduling a follow-up this week.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2 text-[#FEF3C7] text-[10px] font-bold uppercase tracking-wider">
                     <AlertCircle className="w-3 h-3" />
                     Risk Detected
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    <span className="text-white font-bold">Adidas</span> shows no interaction in 14 days. Deal at risk.
                  </p>
                </div>
              </div>

              {/* Activity Feed */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Recent Activity</h3>
                <div className="space-y-4 relative pl-2">
                   {/* Line */}
                   <div className="absolute left-[19px] top-2 bottom-2 w-px bg-white/10" />
                   
                   {activities.map((item, i) => {
                     const Icon = item.icon;
                     return (
                       <div key={i} className="relative flex gap-3 group">
                         <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 relative z-10 border-2 border-[#1A1A1A] shadow-sm ${item.color}`}>
                           <Icon className="w-4 h-4" />
                         </div>
                         <div className="pt-1">
                           <div className="text-sm text-gray-200 font-medium group-hover:text-white transition-colors">
                             {item.text}
                           </div>
                           <div className="text-xs text-gray-500 mt-0.5 font-medium">{item.time}</div>
                         </div>
                       </div>
                     );
                   })}
                </div>
              </div>

            </div>
            
            {/* Footer Actions */}
            <div className="p-4 border-t border-white/10 bg-black/20">
              <button className="w-full py-3 bg-white text-black rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors shadow-lg">
                Generate Weekly Report
              </button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
