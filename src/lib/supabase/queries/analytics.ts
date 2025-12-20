/**
 * Analytics Query Module
 * 
 * Advanced analytics and reporting queries.
 * Dashboard metrics, trends, and insights.
 */

import { supabase } from '../client';
import type { Database } from '../types';

type Event = Database['public']['Tables']['events']['Row'];
type Task = Database['public']['Tables']['tasks']['Row'];
type Sponsor = Database['public']['Tables']['sponsors']['Row'];

// ============================================================================
// EVENT ANALYTICS
// ============================================================================

/**
 * Get event performance metrics
 */
export async function getEventPerformanceMetrics(eventId: string) {
  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('*')
    .eq('id', eventId)
    .single();

  if (eventError) {
    console.error('[Supabase] Get event error:', eventError);
    throw eventError;
  }

  // Get tasks breakdown
  const { data: tasks, error: tasksError } = await supabase
    .from('tasks')
    .select('status, priority, is_critical_path')
    .eq('event_id', eventId);

  if (tasksError) {
    console.error('[Supabase] Get tasks error:', tasksError);
  }

  // Get sponsors breakdown
  const { data: sponsors, error: sponsorsError } = await supabase
    .from('sponsors')
    .select('status, value, tier')
    .eq('event_id', eventId);

  if (sponsorsError) {
    console.error('[Supabase] Get sponsors error:', sponsorsError);
  }

  // Get budget items
  const { data: budgetItems, error: budgetError } = await supabase
    .from('budget_items')
    .select('budgeted_amount, actual_amount, status')
    .eq('event_id', eventId);

  if (budgetError) {
    console.error('[Supabase] Get budget items error:', budgetError);
  }

  // Get assets
  const { data: assets, error: assetsError } = await supabase
    .from('assets')
    .select('status, ai_score')
    .eq('event_id', eventId);

  if (assetsError) {
    console.error('[Supabase] Get assets error:', assetsError);
  }

  // Calculate metrics
  const totalTasks = tasks?.length || 0;
  const completedTasks = tasks?.filter(t => t.status === 'done').length || 0;
  const criticalTasks = tasks?.filter(t => t.is_critical_path && t.status !== 'done').length || 0;

  const totalSponsors = sponsors?.length || 0;
  const confirmedSponsors = sponsors?.filter(s => s.status === 'confirmed').length || 0;
  const totalSponsorValue = sponsors?.reduce((sum, s) => sum + (s.value || 0), 0) || 0;

  const budgetPlanned = budgetItems?.reduce((sum, b) => sum + (b.budgeted_amount || 0), 0) || 0;
  const budgetActual = budgetItems?.reduce((sum, b) => sum + (b.actual_amount || 0), 0) || 0;

  const totalAssets = assets?.length || 0;
  const approvedAssets = assets?.filter(a => a.status === 'approved').length || 0;

  return {
    event: event as Event,
    tasks: {
      total: totalTasks,
      completed: completedTasks,
      completionRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
      criticalRemaining: criticalTasks,
    },
    sponsors: {
      total: totalSponsors,
      confirmed: confirmedSponsors,
      totalValue: totalSponsorValue,
      confirmationRate: totalSponsors > 0 ? (confirmedSponsors / totalSponsors) * 100 : 0,
    },
    budget: {
      planned: budgetPlanned,
      actual: budgetActual,
      remaining: budgetPlanned - budgetActual,
      utilizationRate: budgetPlanned > 0 ? (budgetActual / budgetPlanned) * 100 : 0,
    },
    assets: {
      total: totalAssets,
      approved: approvedAssets,
      approvalRate: totalAssets > 0 ? (approvedAssets / totalAssets) * 100 : 0,
    },
  };
}

/**
 * Get organization-wide analytics
 */
export async function getOrganizationAnalytics(organizationId: string) {
  // Get all events
  const { data: events, error: eventsError } = await supabase
    .from('events')
    .select('id, status, budget_total, budget_actual, start_date, created_at')
    .eq('organization_id', organizationId);

  if (eventsError) {
    console.error('[Supabase] Get events error:', eventsError);
    throw eventsError;
  }

  // Get all tasks
  const { data: tasks, error: tasksError } = await supabase
    .from('tasks')
    .select('event_id, status, priority, created_at')
    .in('event_id', events?.map(e => e.id) || []);

  if (tasksError) {
    console.error('[Supabase] Get tasks error:', tasksError);
  }

  // Get all sponsors
  const { data: sponsors, error: sponsorsError } = await supabase
    .from('sponsors')
    .select('event_id, status, value, created_at')
    .in('event_id', events?.map(e => e.id) || []);

  if (sponsorsError) {
    console.error('[Supabase] Get sponsors error:', sponsorsError);
  }

  const totalEvents = events?.length || 0;
  const activeEvents = events?.filter(e => e.status === 'active').length || 0;
  const completedEvents = events?.filter(e => e.status === 'completed').length || 0;

  const totalTasks = tasks?.length || 0;
  const completedTasks = tasks?.filter(t => t.status === 'done').length || 0;

  const totalSponsors = sponsors?.length || 0;
  const confirmedSponsors = sponsors?.filter(s => s.status === 'confirmed').length || 0;
  const totalRevenue = sponsors?.reduce((sum, s) => sum + (s.value || 0), 0) || 0;

  const totalBudget = events?.reduce((sum, e) => sum + (e.budget_total || 0), 0) || 0;
  const totalSpent = events?.reduce((sum, e) => sum + (e.budget_actual || 0), 0) || 0;

  return {
    events: {
      total: totalEvents,
      active: activeEvents,
      completed: completedEvents,
      planning: events?.filter(e => e.status === 'planning').length || 0,
    },
    tasks: {
      total: totalTasks,
      completed: completedTasks,
      completionRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
    },
    sponsors: {
      total: totalSponsors,
      confirmed: confirmedSponsors,
      revenue: totalRevenue,
    },
    budget: {
      total: totalBudget,
      spent: totalSpent,
      remaining: totalBudget - totalSpent,
    },
  };
}

/**
 * Get event timeline data (for charts)
 */
export async function getEventTimelineData(
  organizationId: string,
  days: number = 90
) {
  const since = new Date();
  since.setDate(since.getDate() - days);
  const sinceIso = since.toISOString();

  const { data, error } = await supabase
    .from('events')
    .select('created_at, status, budget_total')
    .eq('organization_id', organizationId)
    .gte('created_at', sinceIso)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('[Supabase] Get timeline data error:', error);
    throw error;
  }

  return data;
}

/**
 * Get task completion trends
 */
export async function getTaskCompletionTrends(
  eventId: string,
  days: number = 30
) {
  const since = new Date();
  since.setDate(since.getDate() - days);
  const sinceIso = since.toISOString();

  const { data, error } = await supabase
    .from('tasks')
    .select('created_at, updated_at, status, priority')
    .eq('event_id', eventId)
    .gte('created_at', sinceIso)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('[Supabase] Get task trends error:', error);
    throw error;
  }

  return data;
}

/**
 * Get sponsor pipeline metrics
 */
export async function getSponsorPipelineMetrics(eventId: string) {
  const { data, error } = await supabase
    .from('sponsors')
    .select('status, value, tier, created_at')
    .eq('event_id', eventId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('[Supabase] Get sponsor pipeline error:', error);
    throw error;
  }

  const pipeline = {
    lead: { count: 0, value: 0 },
    contacted: { count: 0, value: 0 },
    negotiating: { count: 0, value: 0 },
    committed: { count: 0, value: 0 },
    confirmed: { count: 0, value: 0 },
    declined: { count: 0, value: 0 },
  };

  data?.forEach(sponsor => {
    if (sponsor.status && pipeline[sponsor.status]) {
      pipeline[sponsor.status].count++;
      pipeline[sponsor.status].value += sponsor.value || 0;
    }
  });

  return pipeline;
}

// ============================================================================
// CRITICAL PATH ANALYSIS
// ============================================================================

/**
 * Get critical path analysis
 */
export async function getCriticalPathAnalysis(eventId: string) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('event_id', eventId)
    .eq('is_critical_path', true)
    .order('deadline', { ascending: true });

  if (error) {
    console.error('[Supabase] Get critical path error:', error);
    throw error;
  }

  const totalCritical = data?.length || 0;
  const completedCritical = data?.filter(t => t.status === 'done').length || 0;
  const blockedCritical = data?.filter(t => t.status === 'blocked').length || 0;
  const overdueCritical = data?.filter(t => 
    t.deadline && new Date(t.deadline) < new Date() && t.status !== 'done'
  ).length || 0;

  return {
    tasks: data as Task[],
    metrics: {
      total: totalCritical,
      completed: completedCritical,
      blocked: blockedCritical,
      overdue: overdueCritical,
      completionRate: totalCritical > 0 ? (completedCritical / totalCritical) * 100 : 0,
    },
  };
}

/**
 * Get risk assessment
 */
export async function getEventRiskAssessment(eventId: string) {
  const [performance, criticalPath] = await Promise.all([
    getEventPerformanceMetrics(eventId),
    getCriticalPathAnalysis(eventId),
  ]);

  const risks: { level: 'high' | 'medium' | 'low'; message: string }[] = [];

  // Task completion risk
  if (performance.tasks.completionRate < 30) {
    risks.push({ level: 'high', message: 'Task completion rate is critically low' });
  } else if (performance.tasks.completionRate < 60) {
    risks.push({ level: 'medium', message: 'Task completion rate needs improvement' });
  }

  // Critical path risk
  if (criticalPath.metrics.blocked > 0) {
    risks.push({ level: 'high', message: `${criticalPath.metrics.blocked} critical tasks are blocked` });
  }
  if (criticalPath.metrics.overdue > 0) {
    risks.push({ level: 'high', message: `${criticalPath.metrics.overdue} critical tasks are overdue` });
  }

  // Budget risk
  if (performance.budget.utilizationRate > 90) {
    risks.push({ level: 'high', message: 'Budget is nearly exhausted' });
  } else if (performance.budget.utilizationRate > 75) {
    risks.push({ level: 'medium', message: 'Budget utilization is high' });
  }

  // Sponsor risk
  if (performance.sponsors.confirmationRate < 50) {
    risks.push({ level: 'medium', message: 'Low sponsor confirmation rate' });
  }

  return {
    overallRisk: risks.some(r => r.level === 'high') ? 'high' : 
                 risks.some(r => r.level === 'medium') ? 'medium' : 'low',
    risks,
  };
}

// ============================================================================
// SEARCH & FILTERING
// ============================================================================

/**
 * Advanced event search with filters
 */
export async function searchEvents(
  organizationId: string,
  filters: {
    query?: string;
    status?: Event['status'][];
    type?: Event['type'][];
    dateFrom?: string;
    dateTo?: string;
  }
) {
  let query = supabase
    .from('events')
    .select('*')
    .eq('organization_id', organizationId);

  // Text search
  if (filters.query) {
    query = query.or(`name.ilike.%${filters.query}%,description.ilike.%${filters.query}%`);
  }

  // Status filter
  if (filters.status && filters.status.length > 0) {
    query = query.in('status', filters.status);
  }

  // Type filter
  if (filters.type && filters.type.length > 0) {
    query = query.in('type', filters.type);
  }

  // Date range filter
  if (filters.dateFrom) {
    query = query.gte('start_date', filters.dateFrom);
  }
  if (filters.dateTo) {
    query = query.lte('start_date', filters.dateTo);
  }

  query = query.order('start_date', { ascending: false });

  const { data, error } = await query;

  if (error) {
    console.error('[Supabase] Search events error:', error);
    throw error;
  }

  return data as Event[];
}

/**
 * Advanced task search with filters
 */
export async function searchTasks(
  eventId: string,
  filters: {
    query?: string;
    status?: Task['status'][];
    priority?: Task['priority'][];
    assignedTo?: string;
    criticalOnly?: boolean;
  }
) {
  let query = supabase
    .from('tasks')
    .select('*')
    .eq('event_id', eventId);

  // Text search
  if (filters.query) {
    query = query.or(`title.ilike.%${filters.query}%,description.ilike.%${filters.query}%`);
  }

  // Status filter
  if (filters.status && filters.status.length > 0) {
    query = query.in('status', filters.status);
  }

  // Priority filter
  if (filters.priority && filters.priority.length > 0) {
    query = query.in('priority', filters.priority);
  }

  // Assigned to filter
  if (filters.assignedTo) {
    query = query.eq('assigned_to', filters.assignedTo);
  }

  // Critical path only
  if (filters.criticalOnly) {
    query = query.eq('is_critical_path', true);
  }

  query = query.order('deadline', { ascending: true, nullsFirst: false });

  const { data, error } = await query;

  if (error) {
    console.error('[Supabase] Search tasks error:', error);
    throw error;
  }

  return data as Task[];
}

// ============================================================================
// ROI & FINANCIAL METRICS
// ============================================================================

/**
 * Calculate event ROI
 */
export async function calculateEventROI(eventId: string) {
  const performance = await getEventPerformanceMetrics(eventId);

  const totalCosts = performance.budget.actual;
  const totalRevenue = performance.sponsors.totalValue;
  const netProfit = totalRevenue - totalCosts;
  const roi = totalCosts > 0 ? (netProfit / totalCosts) * 100 : 0;

  return {
    totalRevenue,
    totalCosts,
    netProfit,
    roi,
    roiLabel: roi > 0 ? 'profitable' : roi === 0 ? 'break-even' : 'loss',
  };
}
