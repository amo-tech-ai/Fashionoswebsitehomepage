import React from 'react';
import { Camera, Edit3, Eye, CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Badge } from '../ui/badge';

interface Stage {
  id: string;
  label: string;
  icon: React.ReactNode;
  status: 'completed' | 'active' | 'upcoming';
  progress?: number;
}

interface ProductionProgressStagesProps {
  currentStage?: 'capture' | 'editing' | 'review' | 'delivery';
  onNavigate?: (stage: string) => void;
}

export function ProductionProgressStages({ 
  currentStage = 'capture',
  onNavigate 
}: ProductionProgressStagesProps) {
  
  const stages: Stage[] = [
    {
      id: 'capture',
      label: 'Capture',
      icon: <Camera className="w-5 h-5" />,
      status: currentStage === 'capture' ? 'active' : 'completed',
      progress: currentStage === 'capture' ? 65 : 100
    },
    {
      id: 'editing',
      label: 'Editing',
      icon: <Edit3 className="w-5 h-5" />,
      status: currentStage === 'editing' ? 'active' : 
              currentStage === 'capture' ? 'upcoming' : 'completed',
      progress: currentStage === 'editing' ? 40 : currentStage === 'capture' ? 0 : 100
    },
    {
      id: 'review',
      label: 'Review',
      icon: <Eye className="w-5 h-5" />,
      status: ['capture', 'editing'].includes(currentStage) ? 'upcoming' :
              currentStage === 'review' ? 'active' : 'completed',
      progress: currentStage === 'review' ? 20 : ['capture', 'editing'].includes(currentStage) ? 0 : 100
    },
    {
      id: 'delivery',
      label: 'Final Delivery',
      icon: <CheckCircle2 className="w-5 h-5" />,
      status: currentStage === 'delivery' ? 'active' : 'upcoming',
      progress: currentStage === 'delivery' ? 80 : 0
    }
  ];

  return (
    <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
          Production Progress
        </h3>
        <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-[10px] font-mono">
          Stage {stages.findIndex(s => s.status === 'active') + 1} of {stages.length}
        </Badge>
      </div>

      {/* Desktop: Horizontal Flow */}
      <div className="hidden md:flex items-center gap-3">
        {stages.map((stage, index) => (
          <React.Fragment key={stage.id}>
            {/* Stage Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onNavigate && onNavigate(stage.id)}
              className={`
                flex-1 relative rounded-xl p-4 border transition-all duration-300 cursor-pointer
                ${stage.status === 'active' 
                  ? 'bg-indigo-50 border-indigo-200 shadow-md scale-105' 
                  : stage.status === 'completed'
                  ? 'bg-emerald-50 border-emerald-100 hover:shadow-md'
                  : 'bg-gray-50 border-gray-100 opacity-60 hover:opacity-100'}
              `}
            >
              {/* Status Indicator */}
              <div className={`
                absolute -top-2 -right-2 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center
                ${stage.status === 'completed' ? 'bg-emerald-500' :
                  stage.status === 'active' ? 'bg-indigo-500 animate-pulse' :
                  'bg-gray-300'}
              `}>
                {stage.status === 'completed' ? (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                ) : stage.status === 'active' ? (
                  <div className="w-2 h-2 rounded-full bg-white" />
                ) : (
                  <Circle className="w-3 h-3 text-white" />
                )}
              </div>

              {/* Icon & Label */}
              <div className="flex flex-col items-center gap-2 mb-3">
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center
                  ${stage.status === 'active' ? 'bg-indigo-100 text-indigo-600' :
                    stage.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
                    'bg-gray-100 text-gray-400'}
                `}>
                  {stage.icon}
                </div>
                <span className={`
                  text-xs font-bold uppercase tracking-wide text-center
                  ${stage.status === 'active' ? 'text-indigo-900' :
                    stage.status === 'completed' ? 'text-emerald-900' :
                    'text-gray-500'}
                `}>
                  {stage.label}
                </span>
              </div>

              {/* Progress Bar (only for active/completed) */}
              {(stage.status === 'active' || stage.status === 'completed') && (
                <div className="space-y-1">
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stage.progress}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`
                        h-full rounded-full
                        ${stage.status === 'active' ? 'bg-indigo-500' : 'bg-emerald-500'}
                      `}
                    />
                  </div>
                  <p className="text-[10px] font-mono text-gray-500 text-center">
                    {stage.progress}%
                  </p>
                </div>
              )}
            </motion.div>

            {/* Connector Arrow (not after last item) */}
            {index < stages.length - 1 && (
              <ArrowRight className={`
                w-4 h-4 shrink-0
                ${stage.status === 'completed' ? 'text-emerald-400' : 'text-gray-300'}
              `} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile: Vertical Stack */}
      <div className="md:hidden space-y-3">
        {stages.map((stage, index) => (
          <div
            key={stage.id}
            onClick={() => onNavigate && onNavigate(stage.id)}
            className={`
              flex items-center gap-4 p-3 rounded-xl border transition-all
              ${stage.status === 'active' 
                ? 'bg-indigo-50 border-indigo-200' 
                : stage.status === 'completed'
                ? 'bg-emerald-50 border-emerald-100'
                : 'bg-gray-50 border-gray-100 opacity-60'}
            `}
          >
            {/* Icon */}
            <div className={`
              w-10 h-10 rounded-lg flex items-center justify-center shrink-0
              ${stage.status === 'active' ? 'bg-indigo-100 text-indigo-600' :
                stage.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
                'bg-gray-100 text-gray-400'}
            `}>
              {stage.icon}
            </div>

            {/* Label & Progress */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <span className={`
                  text-sm font-bold
                  ${stage.status === 'active' ? 'text-indigo-900' :
                    stage.status === 'completed' ? 'text-emerald-900' :
                    'text-gray-500'}
                `}>
                  {stage.label}
                </span>
                <Badge variant="secondary" className={`
                  text-[10px] uppercase
                  ${stage.status === 'active' ? 'bg-indigo-100 text-indigo-700' :
                    stage.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                    'bg-gray-100 text-gray-500'}
                `}>
                  {stage.status === 'completed' ? 'Done' : 
                   stage.status === 'active' ? 'Active' : 'Pending'}
                </Badge>
              </div>

              {/* Progress Bar */}
              {(stage.status === 'active' || stage.status === 'completed') && (
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${stage.progress}%` }}
                      className={`
                        h-full rounded-full transition-all duration-500
                        ${stage.status === 'active' ? 'bg-indigo-500' : 'bg-emerald-500'}
                      `}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 w-8 text-right">
                    {stage.progress}%
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Asset Mix Summary */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          Asset Mix Progress
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Instagram', count: '12/15', color: 'indigo' },
            { label: 'TikTok', count: '8/10', color: 'pink' },
            { label: 'Amazon', count: '5/8', color: 'amber' },
            { label: 'Website', count: '3/5', color: 'emerald' }
          ].map((channel, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <p className="text-[10px] text-gray-500 mb-1">{channel.label}</p>
              <p className="text-sm font-bold text-gray-900 font-mono">{channel.count}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
