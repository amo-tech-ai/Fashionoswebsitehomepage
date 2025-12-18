import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { FlowStep } from "../types";

export function ProjectFlowCard({ 
  step, 
  onViewTasks, 
  onViewDeliverables 
}: { 
  step: FlowStep, 
  onViewTasks: () => void, 
  onViewDeliverables: () => void 
}) {
  const Icon = step.icon;
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden h-full min-w-[240px]"
    >
      <div className="p-6 flex flex-col flex-1">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 flex items-center justify-center mb-4 shadow-sm">
           <Icon className="w-5 h-5 text-indigo-600 stroke-1.5" />
        </div>
        <div className="mb-2">
           <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-2 py-1 rounded-full border border-indigo-100">Step {step.stepNumber}</span>
        </div>
        <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">{step.title}</h3>
        <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-3">{step.description}</p>
        
        <div className="pt-4 border-t border-gray-50 space-y-3">
           <button 
             onClick={onViewTasks}
             className="w-full py-2 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
           >
             View Tasks <ArrowRight className="w-3 h-3" />
           </button>
           <button 
             onClick={onViewDeliverables}
             className="w-full text-center text-xs text-gray-500 hover:text-indigo-600 transition-colors font-medium"
           >
             View {step.deliverables.length} Deliverables
           </button>
        </div>
      </div>
      <div className="h-1 w-full bg-gray-100">
         <div className="h-full bg-indigo-400 w-1/3 rounded-r-full" />
      </div>
    </motion.div>
  );
}
