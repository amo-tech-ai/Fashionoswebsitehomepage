import { useEffect } from "react";
import { useAgentContext } from "../../lib/ai/AgentContext";
import { useSponsor } from "../../context/SponsorContext";
import { useEvent } from "../../context/EventContext";
import { HealthScore } from "./command-center/HealthScore";
import { PhaseTimeline } from "./command-center/PhaseTimeline";
import { CriticalBlockers } from "./command-center/CriticalBlockers";
import { DeepWorkLinks } from "./command-center/DeepWorkLinks";
import { AIThinkingIndicator } from "../shared/AIThinkingIndicator";
import { motion } from "motion/react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface EventCommandCenterProps {
  onNavigate?: (screen: string) => void;
}

export function CommandCenter({ onNavigate }: EventCommandCenterProps) {
  const { executiveInsight, runAnalysis, isAnalyzing } = useAgentContext();
  const { sponsors } = useSponsor();
  const { currentEvent, tasks, phases, isLoading } = useEvent();

  // Trigger AI Analysis when data loads
  useEffect(() => {
    if (currentEvent && !isLoading && !isAnalyzing) {
        runAnalysis({
            event: currentEvent,
            tasks,
            phases,
            sponsors,
            budget: []
        });
    }
  }, [currentEvent, isLoading, runAnalysis, sponsors, tasks, phases]); // Depend on data changes

  const handleBlockerResolve = (id: string) => {
    if (onNavigate) {
        onNavigate('tasks');
        toast.info("Navigating to critical task...");
    }
  };

  const handleDeepWorkNavigate = (section: string) => {
      if (onNavigate) onNavigate(section);
  };

  // Transform Executive Insight into Blocker format
  const blockers = executiveInsight ? [{
      id: executiveInsight.id,
      title: executiveInsight.executive_summary,
      subtitle: executiveInsight.recommended_action,
      agent: executiveInsight.source_agent
  }] : [];

  if (isLoading || !currentEvent) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-white">
              <div className="flex flex-col items-center gap-4">
                  <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                  <p className="text-sm text-gray-500 font-medium">Loading Command Center...</p>
              </div>
          </div>
      );
  }

  // Calculate Days to Show
  const daysToShow = Math.ceil((new Date(currentEvent.start_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div>
            <h1 className="font-serif text-xl text-black">{currentEvent.name}</h1>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Command Center</p>
        </div>
        <div className="text-right">
            <div className="text-sm font-medium text-black">{format(new Date(), 'MMMM d, yyyy')}</div>
            <div className="text-xs text-gray-400">{daysToShow > 0 ? `${daysToShow} Days to Show` : 'Event Completed'}</div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-20 space-y-16">
        
        {/* Layer 1: Pulse */}
        <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <HealthScore score={94} trend="stable" status="On Track" />
        </motion.section>

        {/* Layer 2: Timeline */}
        <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
        >
            <PhaseTimeline phases={phases} />
        </motion.section>

        {/* Layer 3: Critical Decisions (The "Silence" Rule means this might be empty) */}
        <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="min-h-[120px]"
        >
            {isAnalyzing ? (
               <AIThinkingIndicator isAnalyzing={isAnalyzing} intent="plan_event" />
            ) : (
                <CriticalBlockers blockers={blockers} onResolve={handleBlockerResolve} />
            )}
        </motion.section>

        {/* Layer 4: Deep Work Links */}
        <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
        >
            <DeepWorkLinks onNavigate={handleDeepWorkNavigate} />
        </motion.section>

      </main>
    </div>
  );
}
