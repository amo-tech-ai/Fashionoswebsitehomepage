import { Check, Clock, Circle } from "lucide-react";

interface Phase {
  id: string;
  label: string;
  status: "completed" | "active" | "pending";
}

interface PhaseTimelineProps {
  phases: Phase[];
}

export function PhaseTimeline({ phases }: PhaseTimelineProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Production Timeline</h3>
      <div className="relative">
        {/* Line */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -z-10" />
        
        <div className="flex justify-between">
          {phases.map((phase) => {
            const isCompleted = phase.status === 'completed';
            const isActive = phase.status === 'active';
            
            return (
              <div key={phase.id} className="flex flex-col items-center gap-2 bg-white px-2">
                <div 
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center border-2 
                    ${isCompleted ? 'bg-black border-black text-white' : ''}
                    ${isActive ? 'bg-white border-black text-black' : ''}
                    ${phase.status === 'pending' ? 'bg-white border-gray-200 text-gray-300' : ''}
                  `}
                >
                  {isCompleted && <Check className="w-4 h-4" />}
                  {isActive && <Clock className="w-4 h-4 animate-pulse" />}
                  {phase.status === 'pending' && <Circle className="w-4 h-4" />}
                </div>
                <span className={`text-xs font-medium ${isActive ? 'text-black' : 'text-gray-500'}`}>
                  {phase.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
