import { useState } from "react";
import { Sparkles, ArrowRight, ShieldCheck, AlertTriangle, FileSearch } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Insight {
  id: string;
  type: 'risk' | 'opportunity' | 'compliance';
  title: string;
  description: string;
  impact: string;
}

export function AIContractAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [insights, setInsights] = useState<Insight[]>([]);

  const handleAnalysis = () => {
    setIsAnalyzing(true);
    // Mock Delay
    setTimeout(() => {
      setInsights([
        {
          id: '1',
          type: 'risk',
          title: 'Force Majeure Clause Missing',
          description: 'The standard Force Majeure clause is absent in the Dior sponsorship draft. This exposes the brand to risk if the event is cancelled due to weather.',
          impact: 'High Risk'
        },
        {
          id: '2',
          type: 'compliance',
          title: 'Deliverable Timeline Mismatch',
          description: 'The "Instagram Story" deliverable is due 2 days after the event date, but the contract specifies "Live Coverage".',
          impact: 'Medium'
        },
        {
          id: '3',
          type: 'opportunity',
          title: 'Upsell Opportunity Detected',
          description: 'Based on previous spending, Chanel has budget available for "VIP Lounge" add-ons.',
          impact: 'Revenue +$25k'
        }
      ]);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Hero Card */}
      <div className="w-full rounded-[24px] bg-gradient-to-r from-zinc-900 to-zinc-800 p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Sparkles className="w-7 h-7 text-amber-300" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-medium mb-2">Cura Legal Intelligence</h3>
              <p className="text-zinc-400 max-w-lg leading-relaxed text-sm">
                Gemini 3 Pro analyzes every contract clause against your brand's safety guidelines and financial targets.
              </p>
            </div>
          </div>

          <button 
            onClick={handleAnalysis}
            disabled={isAnalyzing}
            className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-lg disabled:opacity-50"
          >
            {isAnalyzing ? "Analyzing..." : "Run Deep Analysis"}
            {!isAnalyzing && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Results Grid */}
      <AnimatePresence>
        {insights.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {insights.map((insight) => (
              <motion.div 
                key={insight.id}
                layout
                className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${
                  insight.type === 'risk' ? 'bg-red-50 text-red-600' :
                  insight.type === 'opportunity' ? 'bg-emerald-50 text-emerald-600' :
                  'bg-amber-50 text-amber-600'
                }`}>
                  {insight.type === 'risk' ? <AlertTriangle className="w-5 h-5" /> :
                   insight.type === 'opportunity' ? <ShieldCheck className="w-5 h-5" /> :
                   <FileSearch className="w-5 h-5" />}
                </div>
                
                <h4 className="font-medium text-[#111111] mb-2">{insight.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {insight.description}
                </p>
                
                <div className="pt-4 border-t border-gray-50 flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                  <span className="text-gray-400">Impact</span>
                  <span className={
                    insight.type === 'risk' ? 'text-red-600' :
                    insight.type === 'opportunity' ? 'text-emerald-600' :
                    'text-amber-600'
                  }>{insight.impact}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Empty State / Placeholder */}
      {!isAnalyzing && insights.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <FileSearch className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p>Select "Run Deep Analysis" to scan all active drafts.</p>
        </div>
      )}
    </div>
  );
}
