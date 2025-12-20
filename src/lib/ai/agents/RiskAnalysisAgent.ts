/**
 * Risk Analysis Agent
 * 
 * Analyzes event data to identify risks, blockers, and optimization opportunities.
 * Uses Gemini AI with structured output for consistent risk detection.
 * 
 * Features:
 * - Critical path analysis
 * - Budget variance detection
 * - Timeline risk assessment
 * - Proactive alerts
 * - Actionable recommendations
 */

import { callGemini } from '../gemini';
import type { Event, EventTask } from '../../types/events.types';

export interface Risk {
  id: string;
  severity: 'critical' | 'warning' | 'suggestion';
  category: 'tasks' | 'budget' | 'timeline' | 'staffing' | 'logistics';
  title: string;
  description: string;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  urgency: 'now' | '3_days' | '7_days' | '14_days';
  recommended_actions: string[];
  risk_score: number; // 0-100
  affected_items?: string[];
}

export interface RiskAnalysisResult {
  risks: Risk[];
  health_score: number; // 0-100
  critical_count: number;
  warning_count: number;
  suggestion_count: number;
  confidence: number;
  generated_at: string;
}

/**
 * Analyze event for risks and opportunities
 */
export async function analyzeEventRisks(
  event: Event,
  tasks: EventTask[],
  budget?: {
    total: number;
    actual: number;
    by_category: Record<string, { budgeted: number; actual: number }>;
  }
): Promise<RiskAnalysisResult> {
  
  // Build comprehensive prompt
  const prompt = buildRiskAnalysisPrompt(event, tasks, budget);
  
  // Call Gemini with structured output
  const response = await callGemini(prompt, {
    features: ['text_generation', 'gemini_thinking', 'structured_output'],
    temperature: 0.3, // Lower temp for consistent risk analysis
  });

  // Parse structured data
  const risks = response.structuredData?.risks || [];
  const healthScore = response.structuredData?.health_score || 70;

  // Count by severity
  const criticalCount = risks.filter((r: Risk) => r.severity === 'critical').length;
  const warningCount = risks.filter((r: Risk) => r.severity === 'warning').length;
  const suggestionCount = risks.filter((r: Risk) => r.severity === 'suggestion').length;

  return {
    risks,
    health_score: healthScore,
    critical_count: criticalCount,
    warning_count: warningCount,
    suggestion_count: suggestionCount,
    confidence: response.confidence || 0.85,
    generated_at: new Date().toISOString(),
  };
}

/**
 * Build comprehensive risk analysis prompt
 */
function buildRiskAnalysisPrompt(
  event: Event,
  tasks: EventTask[],
  budget?: {
    total: number;
    actual: number;
    by_category: Record<string, { budgeted: number; actual: number }>;
  }
): string {
  const today = new Date();
  const eventDate = new Date(event.start_date);
  const daysUntilEvent = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  // Task analysis
  const overdueTasks = tasks.filter(t => {
    if (!t.deadline) return false;
    return new Date(t.deadline) < today && t.status !== 'done';
  });

  const criticalPathTasks = tasks.filter(t => t.is_critical_path);
  const criticalPathOverdue = criticalPathTasks.filter(t => {
    if (!t.deadline) return false;
    return new Date(t.deadline) < today && t.status !== 'done';
  });

  const blockedTasks = tasks.filter(t => t.status === 'blocked');

  // Budget analysis
  const budgetVariance = budget ? budget.actual - budget.total : 0;
  const budgetVariancePct = budget ? (budgetVariance / budget.total) * 100 : 0;

  const prompt = `
You are a risk analysis expert for event management. Analyze this event for risks, blockers, and optimization opportunities.

EVENT DETAILS:
- Name: ${event.name}
- Type: ${event.type}
- Status: ${event.status}
- Days until event: ${daysUntilEvent}
- Budget: $${event.budget_total.toLocaleString()} (Actual: $${event.budget_actual.toLocaleString()})
- Budget Variance: ${budgetVariancePct.toFixed(1)}%
- Progress: ${event.progress_percentage}%

TASK ANALYSIS:
- Total tasks: ${tasks.length}
- Overdue tasks: ${overdueTasks.length}
- Critical path tasks: ${criticalPathTasks.length}
- Critical path overdue: ${criticalPathOverdue.length}
- Blocked tasks: ${blockedTasks.length}
- Completed: ${tasks.filter(t => t.status === 'done').length}

${budget ? `
BUDGET BREAKDOWN:
${Object.entries(budget.by_category).map(([cat, amounts]) => {
  const variance = amounts.actual - amounts.budgeted;
  const pct = (variance / amounts.budgeted) * 100;
  return `- ${cat}: $${amounts.budgeted.toLocaleString()} budgeted, $${amounts.actual.toLocaleString()} actual (${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%)`;
}).join('\n')}
` : ''}

ANALYZE AND RETURN:
1. Identify 3-5 most critical risks
2. For each risk, provide:
   - Severity (critical/warning/suggestion)
   - Category (tasks/budget/timeline/staffing/logistics)
   - Clear title and description
   - Impact level (HIGH/MEDIUM/LOW)
   - Urgency (now/3_days/7_days/14_days)
   - 2-3 specific recommended actions
   - Risk score (0-100)
3. Calculate overall health score (0-100)
4. Focus on actionable insights, not just status reporting

Return as structured JSON matching the Risk interface.
`;

  return prompt.trim();
}

/**
 * Get critical path analysis
 */
export async function analyzeCriticalPath(
  tasks: EventTask[]
): Promise<{
  critical_path: EventTask[];
  bottlenecks: { task_id: string; dependent_count: number; impact_days: number }[];
  predicted_completion: string;
  optimization_recommendations: string[];
}> {
  
  const prompt = `
Analyze the critical path for these tasks and identify bottlenecks.

TASKS:
${tasks.map(t => `
- ID: ${t.id}
- Title: ${t.title}
- Critical Path: ${t.is_critical_path}
- Status: ${t.status}
- Deadline: ${t.deadline || 'None'}
- Dependencies: ${t.dependency_task_ids.join(', ') || 'None'}
`).join('\n')}

Identify:
1. Critical path tasks in order
2. Bottlenecks (tasks with many dependents)
3. Predicted completion date
4. Optimization recommendations

Return structured JSON.
`;

  const response = await callGemini(prompt, {
    features: ['structured_output', 'gemini_thinking'],
  });

  return response.structuredData || {
    critical_path: [],
    bottlenecks: [],
    predicted_completion: new Date().toISOString(),
    optimization_recommendations: [],
  };
}

/**
 * Detect budget anomalies
 */
export async function detectBudgetAnomalies(
  budgetCategories: { category: string; budgeted: number; actual: number }[]
): Promise<Risk[]> {
  
  const anomalies: Risk[] = [];

  budgetCategories.forEach(cat => {
    const variance = cat.actual - cat.budgeted;
    const variancePct = (variance / cat.budgeted) * 100;

    // Critical variance (>20%)
    if (Math.abs(variancePct) > 20) {
      anomalies.push({
        id: `budget-${cat.category}`,
        severity: 'critical',
        category: 'budget',
        title: `Budget Overrun: ${cat.category}`,
        description: `${cat.category} is ${variancePct.toFixed(1)}% over budget ($${Math.abs(variance).toLocaleString()})`,
        impact: 'HIGH',
        urgency: 'now',
        recommended_actions: [
          `Review ${cat.category} expenses for cost overruns`,
          'Identify areas to reduce spending',
          'Reallocate budget from other categories if needed',
        ],
        risk_score: Math.min(95, 70 + Math.abs(variancePct)),
      });
    }
    // Warning variance (10-20%)
    else if (Math.abs(variancePct) > 10) {
      anomalies.push({
        id: `budget-${cat.category}`,
        severity: 'warning',
        category: 'budget',
        title: `Budget Variance: ${cat.category}`,
        description: `${cat.category} is trending ${variancePct.toFixed(1)}% ${variance > 0 ? 'over' : 'under'} budget`,
        impact: 'MEDIUM',
        urgency: '3_days',
        recommended_actions: [
          `Monitor ${cat.category} spending closely`,
          'Review upcoming expenses in this category',
        ],
        risk_score: 50 + Math.abs(variancePct),
      });
    }
  });

  return anomalies;
}

/**
 * Calculate event health score
 */
export function calculateHealthScore(
  event: Event,
  tasks: EventTask[],
  risks: Risk[]
): number {
  let score = 100;

  // Deduct for progress below schedule
  const expectedProgress = 75; // Assume 75% expected at this point
  const progressGap = expectedProgress - event.progress_percentage;
  if (progressGap > 0) {
    score -= progressGap * 0.3; // 0.3 points per % behind
  }

  // Deduct for overdue tasks
  const overdueTasks = tasks.filter(t => {
    if (!t.deadline || t.status === 'done') return false;
    return new Date(t.deadline) < new Date();
  });
  score -= overdueTasks.length * 2; // 2 points per overdue task

  // Deduct for critical risks
  risks.forEach(risk => {
    if (risk.severity === 'critical') score -= 10;
    if (risk.severity === 'warning') score -= 5;
    if (risk.severity === 'suggestion') score -= 2;
  });

  // Deduct for budget variance
  const budgetVariance = ((event.budget_actual - event.budget_total) / event.budget_total) * 100;
  if (Math.abs(budgetVariance) > 10) {
    score -= Math.abs(budgetVariance) * 0.5;
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}
