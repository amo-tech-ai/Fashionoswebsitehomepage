import { 
  Event, 
  EventTask, 
  WorkflowPhase, 
  EventSponsor, 
  EventBudgetCategory, 
  VenueBooking 
} from '../types/events.types';

import { 
  AgentOutput, 
  ExecutiveInsight,
  EventPlannerOutput,
  OpsRiskOutput,
  BudgetGuardianOutput,
  SponsorIntelligenceOutput,
  AttendeeFlowOutput,
  AIRequest,
  AIResponse
} from './types';

import { runEventPlannerAgent } from './agents/EventPlannerAgent';
import { runOpsRiskAgent } from './agents/OpsRiskAgent';
import { runBudgetGuardianAgent } from './agents/BudgetGuardianAgent';
import { runSponsorIntelligenceAgent } from './agents/SponsorIntelligenceAgent';
import { runAttendeeFlowAgent } from './agents/AttendeeFlowAgent';

// --- The Brain: AI Dispatcher ---

export class AIDispatcher {
  /**
   * Routes a request to the appropriate Gemini model and toolset.
   * In a real implementation, this would call the Next.js API route /api/ai/dispatch
   */
  static async dispatch<T>(request: AIRequest): Promise<AIResponse<T>> {
    console.log(`[AI Dispatcher] Routing to ${request.model} | Intent: ${request.intent}`);
    
    // Simulate Network Latency (variable based on model)
    const latency = request.model === 'gemini-3-flash' ? 400 : 1500;
    await new Promise(resolve => setTimeout(resolve, latency));

    try {
      let data: any;

      // Mock Response Routing
      switch (request.intent) {
        case 'analyze_risk':
          // Route to Thinking Model
          data = runOpsRiskAgent(request.context.event, request.context.venueBooking);
          break;
        
        case 'plan_event':
          data = runEventPlannerAgent(request.context.event, request.context.tasks, request.context.phases);
          break;

        case 'audit_budget':
          data = runBudgetGuardianAgent(request.context.event, request.context.budget);
          break;
          
        case 'enrich_sponsor':
          // Route to Deep Research
          data = runSponsorIntelligenceAgent(request.context.sponsors); 
          // Note: In reality, this would be a single sponsor lookup
          break;

        default:
          throw new Error(`Unknown intent: ${request.intent}`);
      }

      return {
        success: true,
        data: data as T,
        latency
      };

    } catch (error) {
      console.error("[AI Dispatcher] Error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown AI Error",
        latency
      };
    }
  }
}

// --- Orchestrator (Legacy Wrapper -> Now Async) ---

interface OrchestratorInput {
  event: Event;
  tasks: EventTask[];
  phases: WorkflowPhase[];
  sponsors: EventSponsor[];
  budget: EventBudgetCategory[];
  venueBooking?: VenueBooking;
}

export interface OrchestratorResult {
  executiveInsight: ExecutiveInsight | null;
  allInsights: AgentOutput[];
}

export async function orchestrateAgents(input: OrchestratorInput): Promise<OrchestratorResult> {
  // Parallel Execution using the Dispatcher
  const results = await Promise.all([
    AIDispatcher.dispatch<EventPlannerOutput>({ 
      intent: 'plan_event', 
      model: 'gemini-3-pro', 
      context: input 
    }),
    AIDispatcher.dispatch<OpsRiskOutput>({ 
      intent: 'analyze_risk', 
      model: 'gemini-3-pro', // Thinking model for risks
      context: input 
    }),
    AIDispatcher.dispatch<BudgetGuardianOutput>({ 
      intent: 'audit_budget', 
      model: 'gemini-3-flash', // Fast for numbers
      context: input 
    }),
    AIDispatcher.dispatch<SponsorIntelligenceOutput>({ 
      intent: 'enrich_sponsor', 
      model: 'gemini-deep-research', 
      context: input 
    }),
    // Keep Flow sync for now or add intent later
    Promise.resolve({ success: true, data: runAttendeeFlowAgent(input.event) }) 
  ]);

  // Unwrap Results
  const plannerResult = results[0].data as EventPlannerOutput;
  const risksResult = results[1].data as OpsRiskOutput;
  const budgetResult = results[2].data as BudgetGuardianOutput;
  const sponsorsResult = results[3].data as SponsorIntelligenceOutput;
  const flowResult = results[4].data as AttendeeFlowOutput;

  const allResults: AgentOutput[] = [
    plannerResult,
    risksResult,
    budgetResult,
    sponsorsResult,
    flowResult
  ].filter(Boolean); // Filter out any failed calls

  // 2. Filter: Only high confidence & actionable items
  const actionable = allResults.filter(r => 
    r && r.confidence === 'high' && 
    r.requires_action === true
  );

  // 3. The "Silence" Rule
  if (actionable.length === 0) {
    return { executiveInsight: null, allInsights: allResults };
  }

  // 4. Executive Insight Selection (Priority Heuristic)
  let selectedInsight: ExecutiveInsight | null = null;

  // Check Event Planner (Blockers)
  if (!selectedInsight && plannerResult?.requires_action && plannerResult.health_status === 'red') {
    selectedInsight = formatInsight(plannerResult);
  }

  // Check Budget (Critical Overspend)
  if (!selectedInsight && budgetResult?.requires_action && budgetResult.budget_status === 'over') {
    selectedInsight = formatInsight(budgetResult);
  }

  // Check Ops Risk (Critical)
  if (!selectedInsight && risksResult?.requires_action && risksResult.risk_level === 'red') {
    selectedInsight = formatInsight(risksResult);
  }

  // Fallback
  if (!selectedInsight && actionable.length > 0) {
      selectedInsight = formatInsight(actionable[0]);
  }

  return {
      executiveInsight: selectedInsight,
      allInsights: allResults
  };
}

function formatInsight(agentOutput: AgentOutput): ExecutiveInsight {
  const base = {
    id: `insight-${Date.now()}`,
    source_agent: agentOutput.agentId,
  };

  switch (agentOutput.agentId) {
    case 'event-planner':
      return {
        ...base,
        type: 'blocker',
        executive_summary: agentOutput.blocking_issue || 'Critical path blocked',
        why_now: agentOutput.impact_if_resolved || 'Delays event delivery',
        recommended_action: agentOutput.recommended_action || 'Resolve blocker',
        action_payload: { task: 'unknown' }
      };
    
    case 'ops-risk':
      return {
        ...base,
        type: 'alert',
        executive_summary: agentOutput.risk_description || 'Operational risk detected',
        why_now: agentOutput.predicted_impact || 'Impacts event success',
        recommended_action: agentOutput.recommended_tradeoff || 'Review logistics',
      };

    case 'budget-guardian':
      return {
        ...base,
        type: 'alert',
        executive_summary: `Budget ${agentOutput.budget_status === 'over' ? 'Exceeded' : 'At Risk'}`,
        why_now: agentOutput.projected_variance || 'Financial target missed',
        recommended_action: agentOutput.recommended_adjustment || 'Freeze spending',
      };

    case 'sponsor-intelligence':
      return {
        ...base,
        type: 'blocker',
        executive_summary: `Sponsor ${agentOutput.sponsor_name || 'Partner'} At Risk`,
        why_now: agentOutput.blocking_item || 'Contract stalled',
        recommended_action: agentOutput.recommended_action || 'Contact sponsor',
      };

    case 'attendee-flow':
      return {
        ...base,
        type: 'optimization',
        executive_summary: 'Experience Bottleneck Detected',
        why_now: agentOutput.predicted_delay || 'Guest delay predicted',
        recommended_action: agentOutput.mitigation_option || 'Adjust flow',
      };
  }
}
