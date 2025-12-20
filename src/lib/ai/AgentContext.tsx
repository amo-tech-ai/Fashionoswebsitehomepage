import React, { createContext, useContext, useState, useCallback } from 'react';
import { 
  Event, 
  EventTask, 
  WorkflowPhase, 
  EventSponsor, 
  EventBudgetCategory, 
  VenueBooking 
} from '../types/events.types';
import { AgentOutput, ExecutiveInsight } from './types';
import { orchestrateAgents } from './orchestrator';

interface AgentContextType {
  executiveInsight: ExecutiveInsight | null;
  allInsights: AgentOutput[];
  isAnalyzing: boolean;
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  runAnalysis: (data: AnalysisData) => void;
  dismissInsight: () => void;
}

export interface AnalysisData {
  event: Event;
  tasks: EventTask[];
  phases: WorkflowPhase[];
  sponsors: EventSponsor[];
  budget: EventBudgetCategory[];
  venueBooking?: VenueBooking;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export function AgentProvider({ children }: { children: React.ReactNode }) {
  const [executiveInsight, setExecutiveInsight] = useState<ExecutiveInsight | null>(null);
  const [allInsights, setAllInsights] = useState<AgentOutput[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = useCallback(() => setIsDrawerOpen(prev => !prev), []);

  const runAnalysis = useCallback(async (data: AnalysisData) => {
    setIsAnalyzing(true);
    
    try {
      // The Orchestrator/Dispatcher now handles latency simulation
      const result = await orchestrateAgents(data);
      
      if (result) {
          setExecutiveInsight(result.executiveInsight);
          setAllInsights(result.allInsights);
      } else {
          setExecutiveInsight(null);
          setAllInsights([]);
      }
    } catch (error) {
      console.error("AI Analysis Failed:", error);
      // Fail gracefully
      setExecutiveInsight(null);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const dismissInsight = useCallback(() => {
    setExecutiveInsight(null);
    // We keep allInsights available for the drawer, just hide the main alert
  }, []);

  return (
    <AgentContext.Provider value={{ 
      executiveInsight, 
      allInsights, 
      isAnalyzing, 
      isDrawerOpen,
      toggleDrawer,
      runAnalysis,
      dismissInsight
    }}>
      {children}
    </AgentContext.Provider>
  );
}

export function useAgentContext() {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error('useAgentContext must be used within an AgentProvider');
  }
  return context;
}
