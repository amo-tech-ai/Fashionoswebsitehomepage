import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, AlertCircle, CheckCircle2, DollarSign, Users, Calendar } from "lucide-react";
import { useAgentContext } from "../../lib/ai/AgentContext";
import { AgentOutput } from "../../lib/ai/types";

export function AICopilotDrawer() {
  const { isDrawerOpen, toggleDrawer, allInsights, isAnalyzing } = useAgentContext();

  const getAgentIcon = (agentId: string) => {
    switch (agentId) {
      case 'event-planner': return Calendar;
      case 'ops-risk': return AlertCircle;
      case 'budget-guardian': return DollarSign;
      case 'sponsor-intelligence': return Users; // Or Handshake
      case 'attendee-flow': return Users;
      default: return Sparkles;
    }
  };

  const getAgentName = (agentId: string) => {
      return agentId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const renderInsightContent = (insight: AgentOutput) => {
      // This is a simplified renderer. Ideally, each agent type has a specific card.
      if ('blocking_issue' in insight) {
          return (
              <div className="space-y-2">
                  <p className="text-sm font-medium text-red-600">{insight.blocking_issue}</p>
                  <p className="text-xs text-gray-500">{insight.recommended_action}</p>
              </div>
          );
      }
      if ('risk_description' in insight) {
        return (
            <div className="space-y-2">
                <p className="text-sm font-medium text-amber-600">{insight.risk_description}</p>
                <p className="text-xs text-gray-500">{insight.recommended_tradeoff}</p>
            </div>
        );
      }
      if ('budget_status' in insight) {
        return (
            <div className="space-y-2">
                <p className="text-sm font-medium text-red-600">
                    Budget {insight.budget_status === 'over' ? 'Exceeded' : 'At Risk'}
                </p>
                <p className="text-xs text-gray-500">{insight.recommended_adjustment}</p>
            </div>
        );
      }
      // Fallback
      return <p className="text-sm text-gray-600">Action required.</p>;
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleDrawer}
            className="fixed inset-0 bg-black/10 backdrop-blur-[1px] z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-screen w-96 bg-white border-l border-gray-100 shadow-2xl z-[60] flex flex-col"
          >
            {/* Header */}
            <div className="h-16 border-b border-gray-100 flex items-center justify-between px-6 shrink-0">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <h2 className="font-serif text-lg text-black tracking-tight">Co-Pilot</h2>
              </div>
              <button 
                onClick={toggleDrawer}
                className="text-gray-400 hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                  <p className="text-sm font-medium">Analyzing signals...</p>
                </div>
              ) : allInsights.length > 0 ? (
                <div className="space-y-6">
                  {allInsights.map((insight, idx) => {
                    const Icon = getAgentIcon(insight.agentId);
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-gray-50 rounded-lg p-4 border border-gray-100"
                      >
                        <div className="flex items-center gap-2 mb-3">
                            <div className={`p-1.5 rounded-md ${insight.requires_action ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                                <Icon className="w-3 h-3" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                                {getAgentName(insight.agentId)}
                            </span>
                        </div>
                        {renderInsightContent(insight)}
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-100" />
                  <p className="text-sm text-center">Systems Nominal.<br/>Silence is Golden.</p>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50/50 text-xs text-center text-gray-400">
                AI proposes. You decide.
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
