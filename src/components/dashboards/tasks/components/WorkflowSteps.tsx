import { Check, Clock, Circle } from "lucide-react";
import { FlowStep } from "../types";
import { motion } from "motion/react";

interface WorkflowStepsProps {
  steps: FlowStep[];
  activeStepId: string | null;
  onStepClick: (step: FlowStep) => void;
}

export function WorkflowSteps({ steps, activeStepId, onStepClick }: WorkflowStepsProps) {
  return (
    <div className="w-full">
      <div className="relative flex justify-between items-start">
        {/* Connecting Line */}
        <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-100 -z-10" />

        {steps.map((step, index) => {
          const isActive = activeStepId === step.id;
          const isCompleted = step.status === 'completed';
          const isUpcoming = step.status === 'upcoming' || step.status === 'pending';

          return (
            <button
              key={step.id}
              onClick={() => onStepClick(step)}
              className="group flex flex-col items-center gap-3 relative"
            >
              {/* Step Circle */}
              <motion.div 
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isActive ? "#000" : isCompleted ? "#000" : "#fff",
                  borderColor: isActive ? "#000" : isCompleted ? "#000" : "#e5e7eb",
                }}
                className={`
                  w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors duration-300 z-10
                  ${isUpcoming ? 'bg-white border-gray-200 text-gray-300' : 'text-white'}
                `}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 text-white" />
                ) : isActive ? (
                  <span className="text-white text-sm font-medium">{index + 1}</span>
                ) : (
                    <span className={`text-sm font-medium ${isUpcoming ? 'text-gray-400' : 'text-black'}`}>
                        {index + 1}
                    </span>
                )}
              </motion.div>

              {/* Label & Progress */}
              <div className="flex flex-col items-center gap-1">
                <span className={`text-sm font-medium ${isActive ? 'text-black' : 'text-gray-500'}`}>
                  {step.title}
                </span>
                
                {!isUpcoming && (
                  <div className="flex items-center gap-1.5">
                    <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full" 
                        style={{ width: `${step.progress}%` }} 
                      />
                    </div>
                    <span className="text-[10px] font-medium text-gray-400">{step.progress}%</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
