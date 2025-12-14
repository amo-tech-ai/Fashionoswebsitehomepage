import { ArrowRight, CheckCircle, AlertCircle, Info } from "lucide-react";
import { motion } from "motion/react";

export interface Insight {
  text: string;
  type: "positive" | "negative" | "neutral";
}

export interface ScoreCardProps {
  title: string;
  score: number;
  status: "Excellent" | "Good" | "Needs Improvement";
  insights: Insight[];
  icon?: React.ReactNode;
  delay?: number;
}

export function ScoreCard({ title, score, status, insights, icon, delay = 0 }: ScoreCardProps) {
  const getStatusColor = (s: string) => {
    switch (s) {
      case "Excellent": return "text-emerald-600 bg-emerald-50 border-emerald-100";
      case "Good": return "text-amber-600 bg-amber-50 border-amber-100";
      case "Needs Improvement": return "text-rose-600 bg-rose-50 border-rose-100";
      default: return "text-gray-600 bg-gray-50 border-gray-100";
    }
  };

  const getBarColor = (s: string) => {
     switch (s) {
      case "Excellent": return "bg-emerald-500";
      case "Good": return "bg-amber-500";
      case "Needs Improvement": return "bg-rose-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow group cursor-default"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          {icon && <div className="p-2 bg-gray-50 rounded-lg text-gray-500">{icon}</div>}
          <div>
            <h3 className="font-serif text-lg text-gray-900">{title}</h3>
            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mt-1 ${getStatusColor(status)}`}>
              {status}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold text-gray-900 font-serif">{score}</span>
          <span className="text-xs text-gray-400 block -mt-1">/100</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-gray-100 rounded-full mb-6 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
          className={`h-full rounded-full ${getBarColor(status)}`} 
        />
      </div>

      {/* Insights */}
      <div className="space-y-3">
        {insights.map((insight, i) => (
          <div key={i} className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed">
            <div className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${
              insight.type === 'positive' ? 'bg-emerald-500' : 
              insight.type === 'negative' ? 'bg-rose-500' : 'bg-amber-500'
            }`} />
            <span>{insight.text}</span>
          </div>
        ))}
      </div>

      <button className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">
        View Details <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
      </button>
    </motion.div>
  );
}
