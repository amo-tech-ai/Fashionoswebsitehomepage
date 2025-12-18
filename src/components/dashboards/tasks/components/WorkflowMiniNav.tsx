import React from "react";
import { FlowStep } from "../types";

export function WorkflowMiniNav({ 
  steps, 
  activeStepId, 
  onSelectStep 
}: { 
  steps: FlowStep[], 
  activeStepId: string, 
  onSelectStep: (step: FlowStep) => void 
}) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 mb-6">
      {steps.map((step) => {
        const isActive = step.id === activeStepId;
        const Icon = step.icon;
        return (
          <button
            key={step.id}
            onClick={() => onSelectStep(step)}
            className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl border transition-all min-w-[200px] ${
              isActive 
                ? "bg-white border-indigo-200 shadow-md ring-1 ring-indigo-50" 
                : "bg-white/50 border-gray-200 hover:bg-white hover:border-gray-300"
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isActive ? "bg-indigo-50 text-indigo-600" : "bg-gray-50 text-gray-500"
            }`}>
              <Icon className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className={`text-[10px] font-bold uppercase tracking-wider ${
                isActive ? "text-indigo-600" : "text-gray-400"
              }`}>
                Step {step.stepNumber}
              </div>
              <div className={`text-xs font-bold truncate max-w-[120px] ${
                isActive ? "text-gray-900" : "text-gray-600"
              }`}>
                {step.title}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
