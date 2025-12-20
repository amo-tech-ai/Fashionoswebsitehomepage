export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface BaseAgentOutput {
  confidence: ConfidenceLevel;
  requires_action: boolean;
}

// 1. Event Planner Agent Output
export interface EventPlannerOutput extends BaseAgentOutput {
  agentId: 'event-planner';
  current_phase: string;
  health_status: 'green' | 'amber' | 'red';
  blocking_issue?: string;
  recommended_action?: string;
  impact_if_resolved?: string;
}

// 2. Ops Risk Agent Output
export interface OpsRiskOutput extends BaseAgentOutput {
  agentId: 'ops-risk';
  risk_level: 'amber' | 'red' | 'green';
  risk_description?: string;
  predicted_impact?: string;
  recommended_tradeoff?: string;
}

// 3. Budget Guardian Agent Output
export interface BudgetGuardianOutput extends BaseAgentOutput {
  agentId: 'budget-guardian';
  budget_status: 'on_track' | 'at_risk' | 'over';
  burn_rate_trend?: string;
  projected_variance?: string;
  recommended_adjustment?: string;
}

// 4. Sponsor Intelligence Agent Output
export interface SponsorIntelligenceOutput extends BaseAgentOutput {
  agentId: 'sponsor-intelligence';
  sponsor_name?: string;
  status: 'active' | 'pending' | 'at_risk';
  blocking_item?: string;
  recommended_action?: string;
  last_interaction_analysis?: string; // AI sentiment analysis
}

// 5. Attendee Flow Agent Output
export interface AttendeeFlowOutput extends BaseAgentOutput {
  agentId: 'attendee-flow';
  experience_risk: 'low' | 'medium' | 'high';
  bottleneck_description?: string;
  predicted_delay?: string;
  mitigation_option?: string;
}

// 6. Executive Insight (The Final Decision)
export interface ExecutiveInsight {
  id: string; // Unique ID for tracking
  type: 'blocker' | 'optimization' | 'alert'; 
  executive_summary: string;
  why_now: string;
  recommended_action: string;
  source_agent: string; // Which specialist generated this
  action_payload?: any; // Data needed to execute the action
}

export type AgentOutput = 
  | EventPlannerOutput 
  | OpsRiskOutput 
  | BudgetGuardianOutput 
  | SponsorIntelligenceOutput 
  | AttendeeFlowOutput;

// --- Dispatcher Types ---

export type GeminiModel = 
  | 'gemini-3-pro' // Complex reasoning, Code Execution
  | 'gemini-3-flash' // High speed, high volume
  | 'gemini-3-vision' // Multimodal
  | 'gemini-deep-research'; // Web scraping / Deep Research

export interface AIRequest {
  intent: string;
  model: GeminiModel;
  context: any; // The data payload
  systemInstruction?: string; // Override default prompt
}

export interface AIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  latency?: number;
}
