import { 
  Sparkles, 
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from "motion/react";
import { Button } from '../../ui/button';

interface ShotListAIProps {
  unplannedSamples: any[];
  onAddShot: (sample: any) => void;
}

export function ShotListAI({ unplannedSamples, onAddShot }: ShotListAIProps) {
  return (
    <AnimatePresence>
        {unplannedSamples.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-10"
            >
                <div className="bg-[#1E1E24] rounded-[24px] p-1 shadow-2xl shadow-indigo-900/10 max-w-3xl mx-auto overflow-hidden">
                    <div className="bg-[#1E1E24] rounded-[22px] border border-white/10 p-6 relative overflow-hidden flex flex-col md:flex-row items-center gap-6">
                         {/* Glow Effect */}
                        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-indigo-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/5 shrink-0">
                            <Sparkles className="w-6 h-6 text-indigo-200" />
                        </div>
                        
                        <div className="flex-1 text-center md:text-left relative z-10">
                            <h3 className="text-white font-serif text-lg mb-1">Missing Coverage Detected</h3>
                            <p className="text-gray-400 text-sm">
                                <span className="text-white font-medium">{unplannedSamples.length} samples</span> haven't been assigned a hero shot yet.
                                Recommend adding <span className="text-white italic">"{unplannedSamples[0].name}"</span> next.
                            </p>
                        </div>

                        <Button 
                            onClick={() => onAddShot(unplannedSamples[0])}
                            className="bg-white text-[#1E1E24] hover:bg-gray-100 border-0 rounded-xl px-6 py-6 h-auto font-bold shadow-lg shadow-black/20 shrink-0 relative z-10"
                        >
                            Add {unplannedSamples[0].name} Shot
                        </Button>
                    </div>
                </div>
            </motion.div>
        ) : (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-10 max-w-3xl mx-auto"
            >
                 <div className="bg-emerald-50/50 border border-emerald-100 rounded-[20px] p-4 flex items-center justify-center gap-3 text-emerald-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm font-medium">All samples have assigned shots. Coverage looks great.</span>
                 </div>
            </motion.div>
        )}
    </AnimatePresence>
  );
}
