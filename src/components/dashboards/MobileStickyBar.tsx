import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { motion, AnimatePresence } from 'motion/react';

interface MobileStickyBarProps {
  onAskAI: () => void;
  onApproveChanges?: () => void;
  hasPendingChanges?: boolean;
  isVisible?: boolean;
}

export function MobileStickyBar({ 
  onAskAI, 
  onApproveChanges,
  hasPendingChanges = false,
  isVisible = true 
}: MobileStickyBarProps) {
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] backdrop-blur-lg"
        >
          {/* Safe area padding for iOS devices */}
          <div className="px-4 pt-3 pb-safe">
            <div className="flex gap-3 max-w-screen-sm mx-auto">
              
              {/* Ask AI Button */}
              <Button
                onClick={onAskAI}
                variant="outline"
                className={`
                  flex-1 h-12 rounded-full border-gray-300 gap-2 font-bold text-sm
                  ${hasPendingChanges ? 'flex-[2]' : ''}
                `}
              >
                <Sparkles className="w-4 h-4" />
                Ask AI
              </Button>

              {/* Approve Changes Button (conditional) */}
              {hasPendingChanges && onApproveChanges && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex-[3]"
                >
                  <Button
                    onClick={onApproveChanges}
                    className="w-full h-12 bg-[#111111] hover:bg-black text-white rounded-full shadow-lg shadow-black/20 gap-2 font-bold text-sm relative overflow-hidden"
                  >
                    {/* Pulse animation for attention */}
                    <span className="absolute inset-0 bg-indigo-500/20 animate-pulse" />
                    <CheckCircle2 className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Approve Changes</span>
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Pending Changes Indicator */}
            {hasPendingChanges && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="mt-2 text-center"
              >
                <p className="text-[10px] text-amber-600 font-medium">
                  2 AI recommendations pending approval
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
