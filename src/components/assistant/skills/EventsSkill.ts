/**
 * EventsSkill - AI Logic for Event Planning & Management
 * 
 * Provides intelligence for event planning, critical path analysis,
 * staffing optimization, and run of show generation.
 */

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done' | 'blocked';
  owner?: string;
  deadline?: string;
  dependencies?: string[]; // Task IDs this depends on
  priority: number; // 1-5
  estimatedHours: number;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  status: 'planning' | 'ready' | 'live' | 'completed';
  tasks: Task[];
  venue?: string;
  budget?: number;
  attendees?: number;
  
  // Enriched AI Fields
  theme?: string;
  models_count?: number;
  looks_count?: number;
}

export interface CriticalPathReport {
  totalTasks: number;
  completedTasks: number;
  completionPercentage: number;
  criticalPath: Task[];
  blockers: {
    task: Task;
    blockingTasks: Task[];
    impact: string;
    estimatedDelay: string;
  }[];
  nextMilestones: {
    task: Task;
    daysUntil: number;
    ready: boolean;
  }[];
  status: 'on_track' | 'at_risk' | 'critical';
  message: string;
  recommendations: string[];
}

export interface StaffingGap {
  role: string;
  required: number;
  assigned: number;
  gap: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  impact: string;
  suggestions: string[];
}

export interface RunOfShowBlock {
  id: string;
  time: string;
  duration: number; // minutes
  title: string;
  description: string;
  location: string;
  personnel: string[];
  notes?: string;
}

export interface RunOfShowDraft {
  eventName: string;
  eventDate: string;
  totalDuration: number; // minutes
  blocks: RunOfShowBlock[];
  setupTime: number;
  showTime: number;
  teardownTime: number;
  bufferTime: number;
  recommendations: string[];
}

export interface EventInsight {
  type: 'completion' | 'blocker' | 'staffing' | 'timeline';
  title: string;
  value: string | number;
  description: string;
  severity?: 'critical' | 'warning' | 'info' | 'success';
  action?: {
    label: string;
    target: string;
  };
}

// ============================================================================
// CORE AI ALGORITHMS
// ============================================================================

/**
 * Analyze critical path and identify blockers
 * 
 * Algorithm:
 * - Calculate completion %
 * - Find tasks with unmet dependencies (blockers)
 * - Estimate delay impact
 * - Identify critical path (longest chain)
 */
export function analyzeCriticalPath(event: Event): CriticalPathReport {
  const tasks = event.tasks || [];
  const total = tasks.length;
  
  if (total === 0) {
    return {
      totalTasks: 0,
      completedTasks: 0,
      completionPercentage: 0,
      criticalPath: [],
      blockers: [],
      nextMilestones: [],
      status: 'critical',
      message: 'No tasks defined for this event',
      recommendations: ['Create task list', 'Assign owners', 'Set deadlines']
    };
  }

  // Calculate completion
  const completed = tasks.filter(t => t.status === 'done').length;
  const percentage = Math.round((completed / total) * 100);

  // Find blockers (tasks with status='blocked' or unmet dependencies)
  const blockers = tasks
    .filter(t => t.status === 'blocked' || hasUnmetDependencies(t, tasks))
    .map(task => {
      const blockingTasks = getBlockingTasks(task, tasks);
      const estimatedDelay = calculateDelay(task, blockingTasks);
      
      return {
        task,
        blockingTasks,
        impact: task.priority <= 2 
          ? `HIGH PRIORITY BLOCKED: ${task.title}. Critical for event success.`
          : `Task blocked: ${task.title}. May affect timeline.`,
        estimatedDelay
      };
    });

  // Calculate critical path (longest dependency chain)
  const criticalPath = calculateCriticalPath(tasks);

  // Find next milestones (high-priority tasks due soon)
  const today = new Date();
  const nextMilestones = tasks
    .filter(t => t.status !== 'done' && t.deadline && t.priority <= 3)
    .map(task => {
      const deadline = new Date(task.deadline!);
      const daysUntil = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      const ready = hasMetDependencies(task, tasks);
      
      return { task, daysUntil, ready };
    })
    .sort((a, b) => a.daysUntil - b.daysUntil)
    .slice(0, 3);

  // Determine status
  let status: CriticalPathReport['status'];
  let message: string;
  const recommendations: string[] = [];

  const criticalBlockers = blockers.filter(b => b.task.priority <= 2).length;
  const daysToEvent = event.date ? calculateDaysUntil(event.date) : 999;

  if (criticalBlockers > 0 || percentage < 50 && daysToEvent < 14) {
    status = 'critical';
    message = `⚠️ CRITICAL: ${criticalBlockers} high-priority tasks blocked. Immediate action required.`;
    recommendations.push('Resolve critical blockers immediately');
    recommendations.push('Daily stand-ups to track progress');
    recommendations.push('Consider extending timeline if blockers persist');
  } else if (blockers.length > 0 || percentage < 70 && daysToEvent < 30) {
    status = 'at_risk';
    message = `${blockers.length} task${blockers.length > 1 ? 's' : ''} blocked. Event at risk if not resolved soon.`;
    recommendations.push(`Unblock ${blockers.length} pending tasks`);
    recommendations.push('Review dependencies and adjust if needed');
    recommendations.push('Allocate more resources to high-priority tasks');
  } else {
    status = 'on_track';
    message = `Event is ${percentage}% complete. On track for ${event.date}.`;
    recommendations.push('Continue current pace');
    recommendations.push('Monitor upcoming deadlines');
    recommendations.push('Review staffing needs weekly');
  }

  return {
    totalTasks: total,
    completedTasks: completed,
    completionPercentage: percentage,
    criticalPath,
    blockers,
    nextMilestones,
    status,
    message,
    recommendations
  };
}

/**
 * Helper: Check if task has unmet dependencies
 */
function hasUnmetDependencies(task: Task, allTasks: Task[]): boolean {
  if (!task.dependencies || task.dependencies.length === 0) return false;
  
  return task.dependencies.some(depId => {
    const depTask = allTasks.find(t => t.id === depId);
    return depTask && depTask.status !== 'done';
  });
}

/**
 * Helper: Check if task dependencies are met
 */
function hasMetDependencies(task: Task, allTasks: Task[]): boolean {
  return !hasUnmetDependencies(task, allTasks);
}

/**
 * Helper: Get tasks blocking this task
 */
function getBlockingTasks(task: Task, allTasks: Task[]): Task[] {
  if (!task.dependencies) return [];
  
  return task.dependencies
    .map(depId => allTasks.find(t => t.id === depId))
    .filter((t): t is Task => t !== undefined && t.status !== 'done');
}

/**
 * Helper: Calculate estimated delay
 */
function calculateDelay(task: Task, blockingTasks: Task[]): string {
  if (blockingTasks.length === 0) return '0 days';
  
  const totalHours = blockingTasks.reduce((sum, t) => sum + t.estimatedHours, 0);
  const days = Math.ceil(totalHours / 8); // 8-hour workdays
  
  return days === 1 ? '1 day' : `${days} days`;
}

/**
 * Helper: Calculate critical path (simplified)
 */
function calculateCriticalPath(tasks: Task[]): Task[] {
  // Find tasks with no dependencies - these are starting points
  const startTasks = tasks.filter(t => !t.dependencies || t.dependencies.length === 0);
  
  // For simplicity, return high-priority tasks in deadline order
  // Real implementation would use proper critical path algorithm
  return tasks
    .filter(t => t.priority <= 2 && t.status !== 'done')
    .sort((a, b) => {
      if (!a.deadline) return 1;
      if (!b.deadline) return -1;
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    })
    .slice(0, 5);
}

/**
 * Helper: Calculate days until date
 */
function calculateDaysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const today = new Date();
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * Identify staffing gaps for event
 * 
 * Algorithm:
 * - Compare required roles vs assigned
 * - Calculate gap severity
 * - Suggest hiring/reassignment
 */
export function identifyStaffingGaps(
  event: Event,
  requiredStaffing: Record<string, number>,
  currentStaffing: Record<string, number>
): StaffingGap[] {
  const gaps: StaffingGap[] = [];

  Object.keys(requiredStaffing).forEach(role => {
    const required = requiredStaffing[role];
    const assigned = currentStaffing[role] || 0;
    const gap = required - assigned;

    if (gap > 0) {
      // Determine severity
      let severity: StaffingGap['severity'];
      let impact: string;
      const suggestions: string[] = [];

      const gapPercentage = (gap / required) * 100;

      if (gapPercentage >= 50) {
        severity = 'critical';
        impact = `CRITICAL: Only ${assigned}/${required} ${role}(s) assigned. Cannot proceed without full team.`;
        suggestions.push(`Hire ${gap} ${role}(s) immediately`);
        suggestions.push('Consider event postponement if gap cannot be filled');
      } else if (gapPercentage >= 30) {
        severity = 'high';
        impact = `${assigned}/${required} ${role}(s) assigned. Risk of operational issues.`;
        suggestions.push(`Fill ${gap} ${role} position${gap > 1 ? 's' : ''} within 2 weeks`);
        suggestions.push('Identify backup options from network');
      } else {
        severity = 'medium';
        impact = `${assigned}/${required} ${role}(s) assigned. Adequate but tight staffing.`;
        suggestions.push(`Consider recruiting 1-2 more ${role}(s) as buffer`);
      }

      gaps.push({ role, required, assigned, gap, severity, impact, suggestions });
    }
  });

  // Sort by severity
  const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  gaps.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  return gaps;
}

/**
 * Generate run of show draft
 * 
 * Algorithm:
 * - Create timeline blocks
 * - Account for setup/teardown
 * - Add buffer time
 * - Suggest optimizations
 */
export function generateRunOfShow(event: Event, eventType: string = 'fashion_show'): RunOfShowDraft {
  const blocks: RunOfShowBlock[] = [];
  let currentTime = new Date(`${event.date}T09:00:00`); // Default start: 9am

  // Helper to add block
  const addBlock = (title: string, duration: number, description: string, location: string, personnel: string[]) => {
    blocks.push({
      id: `block-${blocks.length + 1}`,
      time: formatTime(currentTime),
      duration,
      title,
      description,
      location,
      personnel
    });
    currentTime = new Date(currentTime.getTime() + duration * 60000); // Add minutes
  };

  // Setup phase
  addBlock('Load-In & Setup', 180, 'Venue setup, lighting, staging', event.venue || 'Main Venue', ['Production Team', 'Tech Crew']);
  addBlock('Sound Check', 60, 'Audio system testing, music cues', 'Stage', ['Sound Engineer', 'DJ/Music Director']);
  addBlock('Lighting Check', 45, 'Lighting programming, runway lighting test', 'Runway', ['Lighting Director', 'Tech Crew']);

  // Pre-show
  addBlock('VIP Arrival', 30, 'Red carpet, press photos, VIP reception', 'Entrance Lounge', ['Event Staff', 'Security']);
  addBlock('General Doors Open', 30, 'Guest arrival, seating, welcome drinks', 'Main Venue', ['Ushers', 'Catering']);

  // Main event (fashion show example)
  if (eventType === 'fashion_show') {
    addBlock('Opening Remarks', 10, 'Welcome by host, brand introduction', 'Stage', ['Host/MC', 'AV Crew']);
    addBlock('Runway Show - Part 1', 20, 'First collection showcase, 20-25 looks', 'Runway', ['Models', 'Backstage Team', 'Photographer']);
    addBlock('Intermission', 15, 'Guest mingling, refreshments, social media moment', 'Lounge', ['Catering', 'Social Media Manager']);
    addBlock('Runway Show - Part 2', 20, 'Second collection showcase, finale looks', 'Runway', ['Models', 'Backstage Team', 'Photographer']);
    addBlock('Designer Walk', 5, 'Designer appearance, finale', 'Runway', ['Designer', 'Production Manager']);
  } else {
    addBlock('Main Presentation', 60, 'Core event programming', 'Main Stage', ['Presenters', 'AV Team']);
  }

  // Post-event
  addBlock('Networking Reception', 60, 'Guest mingling, cocktails, brand activation', 'Reception Area', ['Catering', 'Brand Ambassadors']);
  addBlock('Load-Out', 120, 'Teardown, equipment removal, venue cleanup', event.venue || 'Main Venue', ['Production Team', 'Venue Staff']);

  // Calculate totals
  const setupTime = blocks.slice(0, 3).reduce((sum, b) => sum + b.duration, 0);
  const showTime = blocks.slice(3, blocks.length - 2).reduce((sum, b) => sum + b.duration, 0);
  const teardownTime = blocks[blocks.length - 1].duration;
  const totalDuration = blocks.reduce((sum, b) => sum + b.duration, 0);
  const bufferTime = Math.round(totalDuration * 0.1); // 10% buffer

  // Generate recommendations
  const recommendations = [
    'Add 10% time buffer for delays',
    'Confirm all personnel availability 48h before event',
    'Schedule tech rehearsal day before show',
    'Prepare backup music/lighting cues',
    'Assign dedicated time-keeper to keep show on schedule'
  ];

  return {
    eventName: event.name,
    eventDate: event.date,
    totalDuration,
    blocks,
    setupTime,
    showTime,
    teardownTime,
    bufferTime,
    recommendations
  };
}

/**
 * Helper: Format time as HH:MM AM/PM
 */
function formatTime(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutesStr} ${ampm}`;
}

/**
 * Suggest next actions for event
 */
export function suggestNextActions(event: Event): { action: string; priority: number; deadline?: string }[] {
  const criticalPath = analyzeCriticalPath(event);
  const actions: { action: string; priority: number; deadline?: string }[] = [];

  // If critical blockers exist, those are top priority
  if (criticalPath.blockers.length > 0) {
    criticalPath.blockers.slice(0, 3).forEach(blocker => {
      actions.push({
        action: `Unblock: ${blocker.task.title}`,
        priority: 1,
        deadline: blocker.task.deadline
      });
    });
  }

  // Next milestones
  criticalPath.nextMilestones.slice(0, 2).forEach(milestone => {
    actions.push({
      action: milestone.ready 
        ? `Complete: ${milestone.task.title}` 
        : `Prep for: ${milestone.task.title}`,
      priority: 2,
      deadline: milestone.task.deadline
    });
  });

  // If completion < 50%, suggest task assignment review
  if (criticalPath.completionPercentage < 50) {
    actions.push({
      action: 'Review task assignments and deadlines',
      priority: 2
    });
  }

  return actions.slice(0, 5); // Top 5 actions
}

/**
 * Generate event insights for dashboard
 */
export function generateEventInsights(event: Event): EventInsight[] {
  const insights: EventInsight[] = [];
  const criticalPath = analyzeCriticalPath(event);

  // Insight 1: Completion Percentage
  insights.push({
    type: 'completion',
    title: 'Event Progress',
    value: `${criticalPath.completionPercentage}%`,
    description: `${criticalPath.completedTasks}/${criticalPath.totalTasks} tasks completed`,
    severity: criticalPath.completionPercentage >= 80 
      ? 'success' 
      : criticalPath.completionPercentage >= 60 
        ? 'info' 
        : 'warning'
  });

  // Insight 2: Blockers
  if (criticalPath.blockers.length > 0) {
    const critical = criticalPath.blockers.filter(b => b.task.priority <= 2).length;
    insights.push({
      type: 'blocker',
      title: 'Critical Blockers',
      value: critical,
      description: critical > 0 
        ? `${critical} high-priority task${critical > 1 ? 's' : ''} blocked`
        : `${criticalPath.blockers.length} task${criticalPath.blockers.length > 1 ? 's' : ''} blocked`,
      severity: critical > 0 ? 'critical' : 'warning',
      action: { label: 'View Blockers', target: 'eventdetail:blockers' }
    });
  } else {
    insights.push({
      type: 'blocker',
      title: 'No Blockers',
      value: 'Clear',
      description: 'All tasks proceeding on schedule',
      severity: 'success'
    });
  }

  // Insight 3: Days Until Event
  const daysUntil = calculateDaysUntil(event.date);
  insights.push({
    type: 'timeline',
    title: 'Days Until Event',
    value: daysUntil,
    description: daysUntil < 7 
      ? 'Final week - lock in all details'
      : daysUntil < 30 
        ? 'Entering final stretch'
        : 'Plenty of time to prepare',
    severity: daysUntil < 7 ? 'warning' : 'info'
  });

  // Insight 4: Next Milestone
  if (criticalPath.nextMilestones.length > 0) {
    const next = criticalPath.nextMilestones[0];
    insights.push({
      type: 'timeline',
      title: 'Next Milestone',
      value: next.task.title,
      description: `Due in ${next.daysUntil} day${next.daysUntil !== 1 ? 's' : ''}${next.ready ? ' - Ready to start' : ' - Dependencies pending'}`,
      severity: next.ready ? 'info' : 'warning',
      action: { label: 'View Task', target: `eventdetail:task-${next.task.id}` }
    });
  }

  // Insight 5: Staffing Check (AI Enhanced)
  if (event.models_count && event.models_count > 0) {
      // Rule of thumb: 1 dresser per 3 models
      const recommendedDressers = Math.ceil(event.models_count / 3);
      // Mock check against tasks (in real app, would check 'assigned' count)
      const hasDresserTask = event.tasks.some(t => t.title.toLowerCase().includes('dresser') || t.title.toLowerCase().includes('staffing'));
      
      if (!hasDresserTask) {
          insights.push({
            type: 'staffing',
            title: 'Staffing Alert',
            value: `${recommendedDressers} Dressers Needed`,
            description: `For ${event.models_count} models, you need at least ${recommendedDressers} dressers. No staffing task detected.`,
            severity: 'warning',
            action: { label: 'Add Staffing Task', target: 'eventdetail:staffing' }
          });
      }
  }

  // Insight 6: Creative Consistency (AI Enhanced)
  if (event.theme) {
      const hasLightingTask = event.tasks.some(t => t.title.toLowerCase().includes('lighting') || t.title.toLowerCase().includes('av'));
      if (!hasLightingTask) {
           insights.push({
            type: 'timeline',
            title: 'Theme Alignment',
            value: 'Missing AV Specs',
            description: `Theme "${event.theme}" requires specific lighting. No AV/Lighting task detected.`,
            severity: 'info',
            action: { label: 'Add AV Task', target: 'eventdetail:critical-path' }
          });
      }
  }

  return insights;
}
