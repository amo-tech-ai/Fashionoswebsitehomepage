import { Event, EventTask, WorkflowPhase } from '../../types/events.types';
import { EventPlannerOutput } from '../types';

export function runEventPlannerAgent(
  event: Event,
  tasks: EventTask[],
  phases: WorkflowPhase[]
): EventPlannerOutput {
  // 1. Identify Current Phase
  const currentPhase = phases && phases.length > 0 
    ? (phases.find(p => p.status === 'active') || phases[0])
    : null;

  if (!currentPhase) {
    return {
      agentId: 'event-planner',
      confidence: 'low',
      requires_action: false,
      current_phase: 'Unknown',
      health_status: 'green'
    };
  }

  // 2. Detect Blockers (Overdue Critical Path Tasks)
  const today = new Date();
  const criticalBlockers = tasks.filter(t => 
    t.is_critical_path && 
    t.status !== 'done' && 
    t.deadline && 
    new Date(t.deadline) < today
  );

  // 3. Determine Health
  let health: 'green' | 'amber' | 'red' = 'green';
  let blockingIssue = undefined;
  let recommendedAction = undefined;
  let impact = undefined;
  let requiresAction = false;
  let confidence: 'high' | 'medium' | 'low' = 'high';

  if (criticalBlockers.length > 0) {
    health = 'red';
    requiresAction = true;
    const blocker = criticalBlockers[0];
    blockingIssue = `${blocker.title} is overdue`;
    recommendedAction = `Prioritize "${blocker.title}" immediately to unlock ${blocker.workflow_phase} phase.`;
    impact = `Delays ${currentPhase.name} completion by ${Math.ceil((today.getTime() - new Date(blocker.deadline!).getTime()) / (1000 * 60 * 60 * 24))} days.`;
  } else if (currentPhase.progress < 50 && new Date(currentPhase.dateRange.split(' ')[0]) < today) { // varied logic
     health = 'amber';
     blockingIssue = 'Phase velocity is slow';
     recommendedAction = 'Review task assignments for current phase.';
     impact = 'Risk of compressing downstream phases.';
     requiresAction = false; // Just a warning
  }

  return {
    agentId: 'event-planner',
    confidence,
    requires_action: requiresAction,
    current_phase: currentPhase.name,
    health_status: health,
    blocking_issue: blockingIssue,
    recommended_action: recommendedAction,
    impact_if_resolved: impact
  };
}
