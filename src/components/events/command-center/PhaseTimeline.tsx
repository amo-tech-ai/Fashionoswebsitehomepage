import { motion } from "motion/react";
import { Check } from "lucide-react";

interface Phase {
  id: string;
  label: string;
  status: 'completed' | 'active' | 'pending';
}

interface PhaseTimelineProps {
  phases: Phase[];
}

export function PhaseTimeline({ phases }: PhaseTimelineProps) {
  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <div className="relative flex items-center justify-between">
        {/* Line Background */}
        <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-100 -z-10" />

        {phases.map((phase, idx) => {
          const isCompleted = phase.status === 'completed';
          const isActive = phase.status === 'active';
          
          return (
            <div key={phase.id} className="flex flex-col items-center gap-3 bg-white px-2">
              <motion.div 
                className={`w-3 h-3 rounded-full border-2 transition-colors duration-300 ${
                  isCompleted ? 'bg-black border-black' : 
                  isActive ? 'bg-white border-black scale-125' : 
                  'bg-white border-gray-200'
                }`}
                layout
              >
                {isCompleted && <Check className="w-2 h-2 text-white absolute inset-0 m-auto" />}
              </motion.div>
              <span className={`text-xs tracking-wider uppercase font-medium transition-colors ${
                isActive ? 'text-black' : 'text-gray-400'
              }`}>
                {phase.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
