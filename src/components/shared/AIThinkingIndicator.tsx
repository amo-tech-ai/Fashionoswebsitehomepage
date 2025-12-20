import { motion, AnimatePresence } from "motion/react";
import { Sparkles, CheckCircle2, Circle, ChevronDown, ChevronRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

interface ThinkingStep {
  id: string;
  label: string;
  status: 'pending' | 'active' | 'complete';
}

interface AIThinkingIndicatorProps {
  isAnalyzing: boolean;
  intent?: string; // e.g., "analyze_risk", "plan_event"
}

export function AIThinkingIndicator({ isAnalyzing, intent = "analyze_risk" }: AIThinkingIndicatorProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [steps, setSteps] = useState<ThinkingStep[]>([]);
  const [elapsed, setElapsed] = useState(0);

  // Reset steps when analysis starts
  useEffect(() => {
    if (isAnalyzing) {
      setElapsed(0);
      setIsExpanded(true);
      setSteps(getStepsForIntent(intent));
      
      // Simulate progress through steps
      const interval = setInterval(() => {
        setElapsed(prev => prev + 0.1);
        
        setSteps(current => {
          const activeIndex = current.findIndex(s => s.status === 'active');
          if (activeIndex === -1) {
            // Start first step
            return current.map((s, i) => i === 0 ? { ...s, status: 'active' } : s);
          }
          
          // Randomly complete steps to simulate "work"
          if (Math.random() > 0.8 && activeIndex < current.length - 1) {
            return current.map((s, i) => {
              if (i === activeIndex) return { ...s, status: 'complete' };
              if (i === activeIndex + 1) return { ...s, status: 'active' };
              return s;
            });
          }
          return current;
        });
      }, 300);

      return () => clearInterval(interval);
    } else {
       // Complete all when done
       setSteps(prev => prev.map(s => ({ ...s, status: 'complete' })));
    }
  }, [isAnalyzing, intent]);

  if (!isAnalyzing && steps.every(s => s.status === 'complete')) return null;

  return (
    <div className="w-full max-w-md mx-auto my-6">
      <div className="bg-white border border-violet-100 rounded-xl overflow-hidden shadow-sm">
        {/* Header */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-3 flex items-center justify-between bg-violet-50/50 hover:bg-violet-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-full ${isAnalyzing ? 'bg-violet-100' : 'bg-emerald-100'}`}>
              {isAnalyzing ? (
                 <Loader2 className="w-4 h-4 text-violet-600 animate-spin" />
              ) : (
                 <Sparkles className="w-4 h-4 text-emerald-600" />
              )}
            </div>
            <div className="text-sm font-medium text-violet-900">
              {isAnalyzing ? `Reasoning with Gemini 3... (${elapsed.toFixed(1)}s)` : 'Analysis Complete'}
            </div>
          </div>
          {isExpanded ? <ChevronDown className="w-4 h-4 text-violet-400" /> : <ChevronRight className="w-4 h-4 text-violet-400" />}
        </button>

        {/* Steps List */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-4 py-3 space-y-3 bg-white border-t border-violet-100"
            >
              {steps.map((step) => (
                <div key={step.id} className="flex items-center gap-3 text-sm">
                  {step.status === 'complete' && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                  {step.status === 'active' && <Loader2 className="w-4 h-4 text-violet-500 animate-spin shrink-0" />}
                  {step.status === 'pending' && <Circle className="w-4 h-4 text-gray-200 shrink-0" />}
                  
                  <span className={`${
                    step.status === 'active' ? 'text-violet-700 font-medium' : 
                    step.status === 'complete' ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function getStepsForIntent(intent: string): ThinkingStep[] {
  switch (intent) {
    case 'plan_event':
      return [
        { id: '1', label: 'Analyzing critical path dependencies...', status: 'active' },
        { id: '2', label: 'Scanning vendor availability...', status: 'pending' },
        { id: '3', label: 'Calculating budget variance...', status: 'pending' },
        { id: '4', label: 'Generating executive summary...', status: 'pending' },
      ];
    case 'analyze_risk':
      return [
        { id: '1', label: 'Scanning operational parameters...', status: 'active' },
        { id: '2', label: 'Evaluating vendor contracts...', status: 'pending' },
        { id: '3', label: 'Predicting logistical bottlenecks...', status: 'pending' },
        { id: '4', label: 'Formulating mitigation strategies...', status: 'pending' },
      ];
    case 'audit_budget':
      return [
        { id: '1', label: 'Retrieving latest expense data...', status: 'active' },
        { id: '2', label: 'Comparing against baseline budget...', status: 'pending' },
        { id: '3', label: 'Forecasting Q4 spend...', status: 'pending' },
      ];
    default:
      return [
        { id: '1', label: 'Processing data...', status: 'active' },
        { id: '2', label: 'Applying reasoning models...', status: 'pending' },
        { id: '3', label: 'Finalizing output...', status: 'pending' },
      ];
  }
}
