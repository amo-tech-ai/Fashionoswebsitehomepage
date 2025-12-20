import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Check,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  DollarSign,
  Clock,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface ChangeItem {
  field: string;
  before: string;
  after: string;
  impact: 'positive' | 'neutral' | 'negative';
}

interface ProposalDiffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  changeTitle?: string;
  changeDescription?: string;
}

export function ProposalDiffModal({ 
  isOpen, 
  onClose, 
  onApprove,
  changeTitle = "Indoor/Outdoor Swap Due to Weather",
  changeDescription = "AI Producer recommends swapping Scene 2 (Outdoor Rooftop) with Scene 3 (Indoor Studio B) to avoid rain delay."
}: ProposalDiffModalProps) {
  
  const [isApproving, setIsApproving] = useState(false);

  // Mock change data
  const changes: ChangeItem[] = [
    {
      field: 'Scene 2 - Time',
      before: '2:00 PM',
      after: '10:00 AM',
      impact: 'positive'
    },
    {
      field: 'Scene 2 - Location',
      before: 'Rooftop (Outdoor)',
      after: 'Studio B (Indoor)',
      impact: 'neutral'
    },
    {
      field: 'Scene 3 - Time',
      before: '10:00 AM',
      after: '2:00 PM',
      impact: 'neutral'
    },
    {
      field: 'Scene 3 - Location',
      before: 'Studio B (Indoor)',
      after: 'Rooftop (Outdoor) - Weather Hold',
      impact: 'negative'
    }
  ];

  const costImpact = 'Same';
  const timelineImpact = 'No Change';
  const qualityImpact = '+5% (Better Indoor Lighting)';

  const handleApprove = () => {
    setIsApproving(true);
    setTimeout(() => {
      onApprove();
      setIsApproving(false);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
          >
            <div className="w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
              
              {/* Header */}
              <div className="px-6 md:px-8 py-6 border-b border-gray-100 flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0">
                    <Sparkles className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-serif text-2xl text-[#111111] mb-2">Preview Change</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">{changeDescription}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors shrink-0"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                
                {/* AI Context */}
                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-indigo-900 mb-2">AI Reasoning</h3>
                      <p className="text-sm text-indigo-800 leading-relaxed">
                        Weather data shows 85% chance of rain at 2:00 PM. Moving outdoor scene to morning 
                        (10:00 AM) captures optimal natural light while avoiding precipitation. Indoor scene 
                        moved to afternoon maintains schedule continuity with zero cost impact.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Impact Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <div className="flex items-center gap-2 mb-3">
                      <DollarSign className="w-5 h-5 text-gray-400" />
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Cost Impact</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Minus className="w-5 h-5 text-gray-400" />
                      <span className="text-xl font-serif text-gray-900">{costImpact}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Timeline</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Minus className="w-5 h-5 text-gray-400" />
                      <span className="text-xl font-serif text-gray-900">{timelineImpact}</span>
                    </div>
                  </div>

                  <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                      <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Quality</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                      <span className="text-xl font-serif text-emerald-900">{qualityImpact}</span>
                    </div>
                  </div>
                </div>

                {/* Before/After Split View */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                  {/* Column Headers */}
                  <div className="grid grid-cols-[1fr_auto_1fr] gap-0 bg-gray-50 border-b border-gray-200">
                    <div className="px-6 py-4 border-r border-gray-200">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Before</h3>
                    </div>
                    <div className="w-16" />
                    <div className="px-6 py-4">
                      <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider">After</h3>
                    </div>
                  </div>

                  {/* Change Rows */}
                  <div className="divide-y divide-gray-100">
                    {changes.map((change, index) => (
                      <div key={index} className="grid grid-cols-[1fr_auto_1fr] gap-0 items-center hover:bg-gray-50 transition-colors">
                        {/* Before Value */}
                        <div className="px-6 py-5 border-r border-gray-100">
                          <div className="mb-2">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                              {change.field}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-600 line-through decoration-gray-300">
                            {change.before}
                          </span>
                        </div>

                        {/* Arrow Icon */}
                        <div className="w-16 flex items-center justify-center">
                          <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center
                            ${change.impact === 'positive' ? 'bg-emerald-100' :
                              change.impact === 'negative' ? 'bg-amber-100' :
                              'bg-gray-100'}
                          `}>
                            <ArrowRight className={`
                              w-4 h-4
                              ${change.impact === 'positive' ? 'text-emerald-600' :
                                change.impact === 'negative' ? 'text-amber-600' :
                                'text-gray-400'}
                            `} />
                          </div>
                        </div>

                        {/* After Value */}
                        <div className="px-6 py-5">
                          <div className="mb-2 opacity-0">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                              {change.field}
                            </span>
                          </div>
                          <span className={`
                            text-sm font-bold
                            ${change.impact === 'positive' ? 'text-emerald-700' :
                              change.impact === 'negative' ? 'text-amber-700' :
                              'text-gray-900'}
                          `}>
                            {change.after}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Warning Note */}
                <div className="mt-6 bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-amber-900 mb-1">Approval Required</p>
                    <p className="text-xs text-amber-700 leading-relaxed">
                      This change will immediately update the call sheet and notify all crew members. 
                      The change cannot be reversed once approved.
                    </p>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="px-6 md:px-8 py-6 border-t border-gray-100 bg-gray-50 flex flex-col-reverse sm:flex-row gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={isApproving}
                  className="w-full sm:w-auto border-gray-300 h-12"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleApprove}
                  disabled={isApproving}
                  className="w-full sm:w-auto bg-[#111111] hover:bg-black text-white h-12 px-8 shadow-lg shadow-black/10 gap-2"
                >
                  {isApproving ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Sparkles className="w-4 h-4" />
                      </motion.div>
                      Applying Changes...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Approve Changes
                    </>
                  )}
                </Button>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
