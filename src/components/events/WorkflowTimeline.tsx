import { CheckCircle2, Lock, Circle } from "lucide-react";
import { motion } from "motion/react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";

interface WorkflowPhase {
  id: string;
  name: string;
  dateRange: string;
  progress: number;
  tasksComplete: number;
  tasksTotal: number;
  status: "complete" | "active" | "upcoming" | "locked";
}

interface WorkflowTimelineProps {
  phases: WorkflowPhase[];
  onPhaseClick?: (phaseId: string) => void;
}

export function WorkflowTimeline({ phases, onPhaseClick }: WorkflowTimelineProps) {
  
  // Phase colors based on progress
  const getPhaseColor = (status: string, progress: number) => {
    if (status === "complete") return "bg-green-500";
    if (status === "locked") return "bg-gray-300";
    if (progress > 50) return "bg-blue-500";
    if (progress > 0) return "bg-yellow-500";
    return "bg-gray-300";
  };

  // Phase icon
  const PhaseIcon = ({ status }: { status: string }) => {
    if (status === "complete") return <CheckCircle2 className="w-5 h-5 text-white" />;
    if (status === "locked") return <Lock className="w-5 h-5 text-gray-500" />;
    return <Circle className="w-5 h-5 text-white" />;
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-xl">Workflow Timeline</h2>
        <p className="text-sm text-gray-500 mt-1">
          Track progress across 5 event phases
        </p>
      </div>

      {/* Desktop: Horizontal Timeline */}
      <div className="hidden lg:block">
        <div className="flex items-center gap-0">
          {phases.map((phase, index) => (
            <div key={phase.id} className="flex-1">
              <motion.div
                className={`relative ${phase.status !== 'locked' ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                onClick={() => phase.status !== 'locked' && onPhaseClick?.(phase.id)}
                whileHover={phase.status !== 'locked' ? { y: -4 } : {}}
                transition={{ duration: 0.2 }}
              >
                {/* Phase Label */}
                <div className="text-center mb-2">
                  <div className="text-sm mb-1">
                    {phase.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {phase.dateRange}
                  </div>
                </div>

                {/* Progress Bar Segment */}
                <div className="relative h-10 flex items-center">
                  {/* Connecting Line (if not first) */}
                  {index > 0 && (
                    <div className="absolute left-0 -ml-2 w-2 h-0.5 bg-gray-300" />
                  )}
                  
                  {/* Progress Bar */}
                  <div className="relative w-full h-10 bg-gray-200 rounded-lg overflow-hidden">
                    <motion.div
                      className={`h-full ${getPhaseColor(phase.status, phase.progress)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${phase.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />

                    {/* Progress Text */}
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-white mix-blend-difference">
                      {phase.progress}%
                    </div>
                  </div>

                  {/* Status Icon */}
                  <div className={`absolute right-2 top-1/2 -translate-y-1/2`}>
                    <PhaseIcon status={phase.status} />
                  </div>
                </div>

                {/* Task Count */}
                <div className="text-center mt-2">
                  <Badge variant="outline" className="text-xs">
                    {phase.tasksComplete}/{phase.tasksTotal} tasks
                  </Badge>
                </div>

                {/* Active Indicator */}
                {phase.status === "active" && (
                  <motion.div
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet: Vertical Timeline */}
      <div className="lg:hidden space-y-4">
        {phases.map((phase) => (
          <motion.div
            key={phase.id}
            className={`p-4 bg-gray-50 rounded-lg ${phase.status !== 'locked' ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            onClick={() => phase.status !== 'locked' && onPhaseClick?.(phase.id)}
            whileTap={phase.status !== 'locked' ? { scale: 0.98 } : {}}
          >
            {/* Phase Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm">
                    {phase.name}
                  </h3>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      phase.status === 'complete' ? 'bg-green-100 text-green-700' :
                      phase.status === 'active' ? 'bg-blue-100 text-blue-700' :
                      phase.status === 'locked' ? 'bg-gray-100 text-gray-500' :
                      'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {phase.status}
                  </Badge>
                </div>
                <div className="text-xs text-gray-500">
                  {phase.dateRange}
                </div>
              </div>

              <PhaseIcon status={phase.status} />
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{phase.tasksComplete}/{phase.tasksTotal} tasks</span>
                <span>{phase.progress}%</span>
              </div>
              <Progress value={phase.progress} className="h-2" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 bg-green-500 rounded" />
          <span className="text-gray-600">Complete (100%)</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 bg-blue-500 rounded" />
          <span className="text-gray-600">In Progress (50-99%)</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 bg-yellow-500 rounded" />
          <span className="text-gray-600">Started (1-49%)</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 bg-gray-300 rounded" />
          <span className="text-gray-600">Locked (0%)</span>
        </div>
      </div>
    </Card>
  );
}
