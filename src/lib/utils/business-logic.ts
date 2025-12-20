/**
 * Business Logic Utilities
 * 
 * Core business logic functions for FashionOS.
 * Calculations, validations, and domain-specific operations.
 */

import type { Database } from '@/lib/supabase/types';

type Event = Database['public']['Tables']['events']['Row'];
type Task = Database['public']['Tables']['tasks']['Row'];
type Sponsor = Database['public']['Tables']['sponsors']['Row'];
type BudgetItem = Database['public']['Tables']['budget_items']['Row'];

// ============================================================================
// EVENT CALCULATIONS
// ============================================================================

/**
 * Calculate event progress percentage
 */
export function calculateEventProgress(tasks: Task[]): number {
  if (tasks.length === 0) return 0;

  const completedTasks = tasks.filter(t => t.status === 'done').length;
  return Math.round((completedTasks / tasks.length) * 100);
}

/**
 * Calculate event health score (0-100)
 */
export function calculateEventHealthScore(
  event: Event,
  tasks: Task[],
  sponsors: Sponsor[],
  budgetItems: BudgetItem[]
): number {
  let score = 100;

  // Task completion (40 points)
  const taskCompletion = calculateEventProgress(tasks);
  score -= (100 - taskCompletion) * 0.4;

  // Budget utilization (30 points) - penalize over-budget
  const budgetUtilization = event.budget_total > 0 
    ? (event.budget_actual / event.budget_total) * 100 
    : 0;
  if (budgetUtilization > 100) {
    score -= (budgetUtilization - 100) * 0.3;
  } else if (budgetUtilization > 90) {
    score -= 5; // Warning zone
  }

  // Critical tasks (20 points)
  const criticalTasks = tasks.filter(t => t.is_critical_path);
  const completedCritical = criticalTasks.filter(t => t.status === 'done').length;
  const criticalCompletion = criticalTasks.length > 0 
    ? (completedCritical / criticalTasks.length) * 100 
    : 100;
  score -= (100 - criticalCompletion) * 0.2;

  // Overdue tasks (10 points penalty)
  const now = new Date();
  const overdueTasks = tasks.filter(
    t => t.deadline && new Date(t.deadline) < now && t.status !== 'done'
  );
  if (overdueTasks.length > 0) {
    score -= Math.min(overdueTasks.length * 2, 10);
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Calculate days until event
 */
export function getDaysUntilEvent(event: Event): number {
  const now = new Date();
  const eventDate = new Date(event.start_date);
  const diffTime = eventDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Get event status label with color
 */
export function getEventStatusDisplay(event: Event): {
  label: string;
  color: string;
  urgency: 'high' | 'medium' | 'low';
} {
  const daysUntil = getDaysUntilEvent(event);

  if (event.status === 'completed') {
    return { label: 'Completed', color: 'green', urgency: 'low' };
  }

  if (event.status === 'cancelled') {
    return { label: 'Cancelled', color: 'gray', urgency: 'low' };
  }

  if (event.status === 'active') {
    if (daysUntil <= 0) {
      return { label: 'In Progress', color: 'blue', urgency: 'high' };
    } else if (daysUntil <= 7) {
      return { label: `${daysUntil}d until event`, color: 'orange', urgency: 'high' };
    } else {
      return { label: `${daysUntil}d until event`, color: 'yellow', urgency: 'medium' };
    }
  }

  // Planning status
  if (daysUntil <= 14) {
    return { label: 'Urgent', color: 'red', urgency: 'high' };
  } else if (daysUntil <= 30) {
    return { label: 'Approaching', color: 'orange', urgency: 'medium' };
  } else {
    return { label: 'Planning', color: 'blue', urgency: 'low' };
  }
}

// ============================================================================
// TASK CALCULATIONS
// ============================================================================

/**
 * Calculate task urgency score
 */
export function calculateTaskUrgency(task: Task): number {
  let score = 0;

  // Priority scoring
  const priorityScores = {
    critical: 40,
    high: 30,
    medium: 20,
    low: 10,
  };
  score += priorityScores[task.priority];

  // Deadline scoring
  if (task.deadline) {
    const daysUntilDeadline = Math.ceil(
      (new Date(task.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilDeadline < 0) {
      score += 40; // Overdue
    } else if (daysUntilDeadline <= 1) {
      score += 30; // Due today/tomorrow
    } else if (daysUntilDeadline <= 3) {
      score += 20; // Due soon
    } else if (daysUntilDeadline <= 7) {
      score += 10; // Due this week
    }
  }

  // Critical path bonus
  if (task.is_critical_path) {
    score += 20;
  }

  // Blocked status penalty
  if (task.status === 'blocked') {
    score += 15;
  }

  return score;
}

/**
 * Sort tasks by urgency
 */
export function sortTasksByUrgency(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    return calculateTaskUrgency(b) - calculateTaskUrgency(a);
  });
}

/**
 * Get tasks by status counts
 */
export function getTaskStatusCounts(tasks: Task[]): Record<Task['status'], number> {
  return {
    to_do: tasks.filter(t => t.status === 'to_do').length,
    in_progress: tasks.filter(t => t.status === 'in_progress').length,
    done: tasks.filter(t => t.status === 'done').length,
    blocked: tasks.filter(t => t.status === 'blocked').length,
  };
}

/**
 * Check if task can be started (dependencies met)
 */
export function canStartTask(task: Task, allTasks: Task[]): boolean {
  if (task.status !== 'to_do') return false;

  // Check all dependencies are completed
  for (const depId of task.dependency_task_ids) {
    const depTask = allTasks.find(t => t.id === depId);
    if (!depTask || depTask.status !== 'done') {
      return false;
    }
  }

  return true;
}

// ============================================================================
// SPONSOR CALCULATIONS
// ============================================================================

/**
 * Calculate total confirmed sponsorship value
 */
export function calculateTotalSponsorValue(sponsors: Sponsor[]): number {
  return sponsors
    .filter(s => ['committed', 'confirmed'].includes(s.status))
    .reduce((sum, s) => sum + (s.value || 0), 0);
}

/**
 * Calculate sponsor pipeline metrics
 */
export function calculateSponsorPipeline(sponsors: Sponsor[]) {
  const total = sponsors.length;
  const confirmed = sponsors.filter(s => s.status === 'confirmed').length;
  const committed = sponsors.filter(s => s.status === 'committed').length;
  const negotiating = sponsors.filter(s => s.status === 'negotiating').length;
  const contacted = sponsors.filter(s => s.status === 'contacted').length;
  const leads = sponsors.filter(s => s.status === 'lead').length;

  const confirmationRate = total > 0 ? (confirmed / total) * 100 : 0;
  const totalValue = calculateTotalSponsorValue(sponsors);

  return {
    total,
    confirmed,
    committed,
    negotiating,
    contacted,
    leads,
    confirmationRate,
    totalValue,
  };
}

/**
 * Calculate sponsor tier distribution
 */
export function getSponsorTierDistribution(sponsors: Sponsor[]) {
  const distribution: Record<Sponsor['tier'], number> = {
    platinum: 0,
    gold: 0,
    silver: 0,
    bronze: 0,
    partner: 0,
  };

  sponsors.forEach(s => {
    distribution[s.tier]++;
  });

  return distribution;
}

// ============================================================================
// BUDGET CALCULATIONS
// ============================================================================

/**
 * Calculate budget summary
 */
export function calculateBudgetSummary(budgetItems: BudgetItem[]) {
  const planned = budgetItems.reduce((sum, item) => sum + (item.budgeted_amount || 0), 0);
  const actual = budgetItems.reduce((sum, item) => sum + (item.actual_amount || 0), 0);
  const remaining = planned - actual;
  const utilizationRate = planned > 0 ? (actual / planned) * 100 : 0;

  return {
    planned,
    actual,
    remaining,
    utilizationRate,
    isOverBudget: actual > planned,
    variance: actual - planned,
    variancePercentage: planned > 0 ? ((actual - planned) / planned) * 100 : 0,
  };
}

/**
 * Calculate budget by category
 */
export function calculateBudgetByCategory(budgetItems: BudgetItem[]) {
  const categories: Record<string, {
    planned: number;
    actual: number;
    remaining: number;
    items: number;
  }> = {};

  budgetItems.forEach(item => {
    if (!categories[item.category]) {
      categories[item.category] = {
        planned: 0,
        actual: 0,
        remaining: 0,
        items: 0,
      };
    }

    categories[item.category].planned += item.budgeted_amount || 0;
    categories[item.category].actual += item.actual_amount || 0;
    categories[item.category].items++;
  });

  // Calculate remaining for each category
  Object.keys(categories).forEach(category => {
    categories[category].remaining = 
      categories[category].planned - categories[category].actual;
  });

  return categories;
}

/**
 * Get budget health status
 */
export function getBudgetHealth(summary: ReturnType<typeof calculateBudgetSummary>): {
  status: 'healthy' | 'warning' | 'critical';
  message: string;
} {
  if (summary.utilizationRate > 100) {
    return {
      status: 'critical',
      message: `Over budget by ${Math.abs(summary.variancePercentage).toFixed(1)}%`,
    };
  } else if (summary.utilizationRate > 90) {
    return {
      status: 'warning',
      message: `${summary.utilizationRate.toFixed(1)}% of budget used`,
    };
  } else {
    return {
      status: 'healthy',
      message: `${summary.utilizationRate.toFixed(1)}% of budget used`,
    };
  }
}

// ============================================================================
// ROI CALCULATIONS
// ============================================================================

/**
 * Calculate event ROI
 */
export function calculateEventROI(
  totalCosts: number,
  totalRevenue: number
): {
  roi: number;
  netProfit: number;
  roiPercentage: number;
  isPositive: boolean;
} {
  const netProfit = totalRevenue - totalCosts;
  const roi = totalCosts > 0 ? (netProfit / totalCosts) * 100 : 0;

  return {
    roi,
    netProfit,
    roiPercentage: roi,
    isPositive: netProfit > 0,
  };
}

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Validate event dates
 */
export function validateEventDates(startDate: string, endDate: string | null): {
  valid: boolean;
  error?: string;
} {
  const start = new Date(startDate);
  const now = new Date();

  if (start < now) {
    return {
      valid: false,
      error: 'Event start date cannot be in the past',
    };
  }

  if (endDate) {
    const end = new Date(endDate);
    if (end < start) {
      return {
        valid: false,
        error: 'Event end date must be after start date',
      };
    }
  }

  return { valid: true };
}

/**
 * Validate budget amounts
 */
export function validateBudgetAmounts(
  budgeted: number,
  actual: number
): {
  valid: boolean;
  warning?: string;
} {
  if (actual > budgeted * 1.1) {
    return {
      valid: true,
      warning: 'Actual amount exceeds budget by more than 10%',
    };
  }

  return { valid: true };
}
