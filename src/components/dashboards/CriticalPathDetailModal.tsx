import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  AlertTriangle,
  Package,
  Clock,
  TrendingDown,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface FixOption {
  id: string;
  title: string;
  description: string;
  impact: 'Low' | 'Medium' | 'High';
  riskNote: string;
  cost?: 'Up' | 'Same' | 'Down';
  timeline?: string;
  aiRecommended?: boolean;
}

interface CriticalPathDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPreviewFix: (fixId: string) => void;
}

export function CriticalPathDetailModal({ 
  isOpen, 
  onClose, 
  onPreviewFix 
}: CriticalPathDetailModalProps) {
  
  // Mock blocker data
  const blocker = {
    title: 'Silk Scarf (SKU-402) Not Received',
    what: 'The hero silk scarf required for Shot #4 has not been delivered to the studio.',
    why: 'Shot #4 is scheduled for tomorrow at 9:00 AM and is a primary asset for the Instagram campaign launch.',
    consequence: 'Missing this shot would require rescheduling the entire outdoor sequence, delaying final delivery by 3-5 days and potentially missing the campaign launch window.',
    source: 'Sample Tracker',
    detectedAt: '2 hours ago'
  };

  const fixOptions: FixOption[] = [
    {
      id: 'backup-sample',
      title: 'Use Backup Sample',
      description: 'A similar scarf (SKU-405) in ivory is already on-set and photographed well in test shots. Same fabric quality, slight color variance.',
      impact: 'Low',
      riskNote: 'Brand team approval needed for color swap. 95% visual similarity.',
      cost: 'Same',
      timeline: 'Immediate',
      aiRecommended: true
    },
    {
      id: 'rush-delivery',
      title: 'Rush Courier (2-Hour Delivery)',
      description: 'Original scarf can be retrieved from warehouse and delivered via express courier within 2 hours.',
      impact: 'Medium',
      riskNote: 'Requires delaying morning call time by 2 hours. Affects subsequent scheduling.',
      cost: 'Up',
      timeline: '+2 hours delay'
    },
    {
      id: 'reschedule-shot',
      title: 'Reschedule Shot #4',
      description: 'Move Shot #4 to afternoon or next available shoot day. Prioritize other scenes in the morning.',
      impact: 'High',
      riskNote: 'May impact final delivery timeline. Weather conditions for outdoor reshoot uncertain.',
      cost: 'Up',
      timeline: '+1-2 days'
    }
  ];

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
            <div className="w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
              
              {/* Header */}
              <div className="px-6 md:px-8 py-6 border-b border-gray-100 bg-red-50/30 flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-serif text-2xl text-[#111111] mb-2">{blocker.title}</h2>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="destructive" className="bg-red-600 text-white hover:bg-red-600 text-[10px] uppercase tracking-wider">
                        Critical Blocker
                      </Badge>
                      <span className="text-xs text-gray-500 font-medium">Detected {blocker.detectedAt} via {blocker.source}</span>
                    </div>
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
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                
                {/* Problem Breakdown */}
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">What's Blocked</h3>
                    <p className="text-gray-700 leading-relaxed">{blocker.what}</p>
                  </div>

                  <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-100">
                    <h3 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Why It Matters
                    </h3>
                    <p className="text-amber-900 leading-relaxed">{blocker.why}</p>
                  </div>

                  <div className="bg-red-50/50 rounded-2xl p-6 border border-red-100">
                    <h3 className="text-xs font-bold text-red-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <TrendingDown className="w-4 h-4" />
                      What Breaks If Ignored
                    </h3>
                    <p className="text-red-900 leading-relaxed">{blocker.consequence}</p>
                  </div>
                </div>

                {/* AI-Recommended Fixes */}
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="w-5 h-5 text-[#111111]" />
                    <h3 className="font-serif text-xl text-[#111111]">Recommended Solutions</h3>
                  </div>

                  <div className="space-y-4">
                    {fixOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`
                          relative rounded-2xl p-6 border transition-all cursor-pointer group
                          ${option.aiRecommended 
                            ? 'bg-emerald-50/50 border-emerald-200 hover:border-emerald-300 hover:shadow-md' 
                            : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-md'}
                        `}
                      >
                        {option.aiRecommended && (
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-emerald-600 text-white hover:bg-emerald-600 border-0 text-[10px] uppercase tracking-wider">
                              AI Recommended
                            </Badge>
                          </div>
                        )}

                        <div className="pr-32 md:pr-40">
                          <h4 className="font-serif text-lg text-[#111111] mb-2">{option.title}</h4>
                          <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            {option.description}
                          </p>

                          {/* Metadata Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                            <div className="bg-white/80 rounded-lg px-3 py-2 border border-gray-100">
                              <span className="block text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Impact</span>
                              <span className={`text-sm font-bold ${
                                option.impact === 'Low' ? 'text-emerald-600' :
                                option.impact === 'Medium' ? 'text-amber-600' :
                                'text-red-600'
                              }`}>
                                {option.impact}
                              </span>
                            </div>

                            {option.cost && (
                              <div className="bg-white/80 rounded-lg px-3 py-2 border border-gray-100">
                                <span className="block text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Cost</span>
                                <span className={`text-sm font-bold ${
                                  option.cost === 'Down' ? 'text-emerald-600' :
                                  option.cost === 'Same' ? 'text-gray-600' :
                                  'text-amber-600'
                                }`}>
                                  {option.cost}
                                </span>
                              </div>
                            )}

                            {option.timeline && (
                              <div className="bg-white/80 rounded-lg px-3 py-2 border border-gray-100">
                                <span className="block text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Timeline</span>
                                <span className="text-sm font-bold text-gray-900">{option.timeline}</span>
                              </div>
                            )}
                          </div>

                          {/* Risk Note */}
                          <div className="flex items-start gap-2 bg-white/60 rounded-lg p-3 border border-gray-100">
                            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                            <p className="text-xs text-gray-600 leading-relaxed">
                              <span className="font-bold text-gray-700">Risk Note: </span>
                              {option.riskNote}
                            </p>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="absolute bottom-6 right-6">
                          <Button
                            onClick={() => onPreviewFix(option.id)}
                            className={`
                              gap-2 shadow-lg group-hover:shadow-xl transition-all
                              ${option.aiRecommended 
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                                : 'bg-[#111111] hover:bg-black text-white'}
                            `}
                          >
                            Preview Change
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="px-6 md:px-8 py-4 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row gap-3 justify-between items-center">
                <p className="text-xs text-gray-500 font-medium">
                  All changes require approval before implementation
                </p>
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="w-full sm:w-auto border-gray-300"
                >
                  Dismiss
                </Button>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
