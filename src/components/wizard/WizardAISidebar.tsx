import React from "react";
import { Sparkles, X, Check, ArrowRight, AlertCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AIRecommendation {
  id: string;
  title: string;
  reason: string;
  confidence: number; // 0-1
  actionLabel?: string;
}

interface WizardAISidebarProps {
  step: string;
  recommendation?: AIRecommendation;
  onApply: () => void;
  onIgnore: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function WizardAISidebar({ step, recommendation, onApply, onIgnore, isOpen, onToggle }: WizardAISidebarProps) {
  if (!recommendation) return null;

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={onToggle}
        className={`fixed bottom-24 right-4 z-40 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all md:hidden ${
          isOpen ? 'bg-gray-900 text-white' : 'bg-white text-indigo-600 border border-indigo-100'
        }`}
      >
        <Sparkles className="w-5 h-5" />
      </button>

      {/* Sidebar Panel */}
      <AnimatePresence>
        {(isOpen || window.innerWidth >= 768) && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className={`fixed md:absolute right-0 top-0 h-full w-80 bg-white border-l border-gray-200 shadow-xl md:shadow-none z-30 flex flex-col pt-20 md:pt-0 transform transition-transform duration-300 ${
              isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
            }`}
          >
            <div className="p-6 h-full overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-indigo-50 rounded-lg">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">Gemini Co-pilot</span>
                </div>
                <button onClick={onToggle} className="md:hidden text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Recommendation Card */}
              <div className="bg-gradient-to-b from-indigo-50/50 to-white rounded-2xl border border-indigo-100 p-5 shadow-sm mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase rounded-full">
                    Recommendation
                  </span>
                  <div className="text-xs font-medium text-gray-400 ml-auto">
                    {Math.round(recommendation.confidence * 100)}% Confidence
                  </div>
                </div>
                
                <h3 className="text-lg font-serif font-bold text-gray-900 mb-2 leading-tight">
                  {recommendation.title}
                </h3>
                
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {recommendation.reason}
                </p>

                <div className="flex gap-2">
                  <button 
                    onClick={onApply}
                    className="flex-1 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Check className="w-3.5 h-3.5" /> Apply
                  </button>
                  <button 
                    onClick={onIgnore}
                    className="px-3 py-2 bg-white border border-gray-200 text-gray-500 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Ignore
                  </button>
                </div>
              </div>

              {/* Contextual Insights */}
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Info className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Based on your <span className="font-semibold text-gray-900">Instagram feed</span>, your audience engages 40% more with lifestyle shots than packshots.
                  </p>
                </div>
                
                <div className="h-px bg-gray-100 w-full my-4" />
                
                <div className="flex gap-3">
                  <AlertCircle className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Your website uses a <span className="font-semibold text-gray-900">Minimal</span> aesthetic. We've filtered styles to match.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
