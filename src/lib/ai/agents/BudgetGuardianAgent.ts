import { Event, EventBudgetCategory } from '../../types/events.types';
import { BudgetGuardianOutput } from '../types';

export function runBudgetGuardianAgent(
  event: Event,
  categories: EventBudgetCategory[]
): BudgetGuardianOutput {
  const totalBudget = event.budget_total;
  const currentSpend = categories.reduce((sum, cat) => sum + cat.actual, 0);
  const burnRate = currentSpend / totalBudget;

  let status: 'on_track' | 'at_risk' | 'over' = 'on_track';
  let trend = 'Stable';
  let variance = undefined;
  let adjustment = undefined;
  let requiresAction = false;
  let confidence: 'high' | 'medium' | 'low' = 'high';

  // SCENARIO 1: Over Budget
  if (currentSpend > totalBudget) {
    status = 'over';
    requiresAction = true;
    trend = 'Critical Overspend';
    const overage = currentSpend - totalBudget;
    variance = `+$${overage.toLocaleString()} (${Math.round((overage/totalBudget)*100)}%)`;
    adjustment = 'Freeze all non-essential production spend immediately.';
  }
  // SCENARIO 2: Approaching Limit (High Burn Rate)
  else if (burnRate > 0.8 && event.progress_percentage < 60) {
    status = 'at_risk';
    requiresAction = true;
    trend = 'Accelerating (+12% vs plan)';
    const projected = totalBudget * 1.2;
    variance = `Projected +$${(projected - totalBudget).toLocaleString()} at current rate`;
    
    // Find highest spend category to cut
    const highestCat = [...categories].sort((a,b) => b.actual - a.actual)[0];
    adjustment = `Reduce ${highestCat.category} allocation by 10% to regain buffer.`;
  }

  return {
    agentId: 'budget-guardian',
    confidence,
    requires_action: requiresAction,
    budget_status: status,
    burn_rate_trend: trend,
    projected_variance: variance,
    recommended_adjustment: adjustment
  };
}
