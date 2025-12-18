import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Info, 
  ChevronRight, 
  AlertCircle, 
  CheckCircle2, 
  X,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from '../ui/dialog';

interface BudgetWatchdogProps {
  currentTotal: number;
  budgetTarget?: number;
  onAdjustScope?: () => void;
}

export function BudgetWatchdog({ 
  currentTotal, 
  budgetTarget = 2500, // Default mock target
  onAdjustScope 
}: BudgetWatchdogProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const percentage = Math.min((currentTotal / budgetTarget) * 100, 100);
  const isOverBudget = currentTotal > budgetTarget;
  const overagePercent = isOverBudget ? Math.round(((currentTotal - budgetTarget) / budgetTarget) * 100) : 0;

  const handleApplySavings = () => {
    if (onAdjustScope) {
      onAdjustScope();
      setIsExpanded(false); // Close modal on success
    }
  };

  // Determine color based on percentage
  const getProgressColor = () => {
    if (percentage < 80) return "bg-emerald-500";
    if (percentage < 100) return "bg-emerald-500"; // Still green until over
    return "bg-amber-500"; // Gentle amber, no red
  };

  const getStatusColor = () => {
    if (percentage < 100) return "text-emerald-700 bg-emerald-50 border-emerald-200";
    return "text-amber-700 bg-amber-50 border-amber-200";
  };

  return (
    <>
      {/* Inline Component */}
      <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gray-100 rounded-md">
              <ShieldCheck className="w-4 h-4 text-gray-600" />
            </div>
            <span className="text-sm font-semibold text-gray-900">Budget Watchdog</span>
          </div>
          <button 
            onClick={() => setIsExpanded(true)}
            className="text-xs font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors"
          >
            Details <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Budget Bar */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-xs font-medium text-gray-600">
            <span>${currentTotal.toLocaleString()}</span>
            <span className="text-gray-400">Target: ${budgetTarget.toLocaleString()}</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className={`h-full rounded-full ${getProgressColor()}`}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* AI Insight (Contextual) */}
        <AnimatePresence mode="wait">
          {isOverBudget ? (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`rounded-lg p-3 text-xs leading-relaxed border ${getStatusColor()}`}
            >
              <div className="flex gap-2">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Plan is {overagePercent}% above typical spend.</p>
                  <p className="opacity-90">Considering removing add-ons to align with Q3 averages?</p>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onAdjustScope}
                  className="h-7 text-xs bg-white border-amber-200 text-amber-800 hover:bg-amber-100"
                >
                  Adjust Scope
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 text-xs text-amber-800 hover:text-amber-900 hover:bg-amber-100/50"
                >
                  Proceed Anyway
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Great job. You are within the healthy spend range.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Expanded Modal View */}
      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-serif text-xl">
              <ShieldCheck className="w-5 h-5 text-gray-900" />
              Budget Analysis
            </DialogTitle>
            <DialogDescription>
              AI-driven breakdown of your campaign spend relative to historical data.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-6">
            {/* Big Stat */}
            <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Projected Total</p>
              <div className="text-4xl font-serif font-medium text-gray-900">
                ${currentTotal.toLocaleString()}
              </div>
              <div className={`inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-xs font-bold ${isOverBudget ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                {isOverBudget ? (
                  <>
                    <TrendingUp className="w-3 h-3" />
                    +{overagePercent}% vs Target
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3 h-3" />
                    Within Budget
                  </>
                )}
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-900">Spend Distribution</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Production Team</span>
                  <span className="font-medium text-gray-900">60%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-900 w-[60%]" />
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Post-Production</span>
                  <span className="font-medium text-gray-900">25%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-400 w-[25%]" />
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Add-Ons & Fees</span>
                  <span className="font-medium text-gray-900">15%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                   <div className="h-full bg-gray-300 w-[15%]" />
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
              <h4 className="text-sm font-bold text-indigo-900 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> AI Recommendation
              </h4>
              <p className="text-sm text-indigo-800/80 leading-relaxed">
                To stay within the ${budgetTarget.toLocaleString()} target, consider removing one add-on to save $300 immediately.
              </p>
            </div>
          </div>

          <DialogFooter>
             <Button variant="outline" onClick={() => setIsExpanded(false)}>Close</Button>
             <Button 
               className="bg-gray-900 text-white hover:bg-black"
               onClick={handleApplySavings}
               disabled={!isOverBudget}
             >
               Apply AI Savings
             </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}