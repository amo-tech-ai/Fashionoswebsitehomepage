import { useState, useEffect } from "react";
import { Sparkles, TrendingUp, AlertOctagon, LineChart } from "lucide-react";
import { motion } from "motion/react";
import { useAgentContext } from "../../../lib/ai/AgentContext"; // Using our new Agent Context

export function BudgetGuardianAlert() {
  const { isAnalyzing } = useAgentContext();
  // We'll simulate a local state for the "Finance Specific" AI Insight
  const [insight, setInsight] = useState<{status: string, message: string} | null>(null);

  useEffect(() => {
    // Simulate AI loading on mount
    const timer = setTimeout(() => {
        setInsight({
            status: "warning",
            message: "Projected spend for 'SS25 Campaign' is 15% over budget due to expedited shipping costs."
        })
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!insight) return null;

  return (
    <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-8 rounded-[24px] bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] p-6 text-white relative overflow-hidden shadow-lg"
    >
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center shrink-0 border border-white/10">
                <Sparkles className="w-6 h-6 text-amber-300" />
            </div>
            
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-serif text-lg font-medium">Budget Guardian Analysis</h3>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wide border border-amber-500/30">
                        Attention Needed
                    </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                    {insight.message}
                </p>
            </div>

            <div className="flex gap-3 shrink-0">
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium transition-colors border border-white/10">
                    Ignore
                </button>
                <button className="px-4 py-2 bg-white text-black hover:bg-gray-100 rounded-lg text-xs font-bold transition-colors flex items-center gap-2">
                    <LineChart className="w-3.5 h-3.5" />
                    Adjust Budget
                </button>
            </div>
        </div>
    </motion.div>
  );
}
