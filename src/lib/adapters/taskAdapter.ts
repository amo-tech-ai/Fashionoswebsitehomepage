/**
 * Task Type Adapter
 * Converts between EventTask (new) and LegacyTask (existing UI) types
 */

import { EventTask } from '../types/events.types';

// Legacy task type from existing TasksAndDeliverables component
export interface LegacyTask {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  owner: string;
  status: 'Backlog' | 'In Progress' | 'Review' | 'Completed';
  category: string;
}

/**
 * Convert EventTask to LegacyTask for existing UI components
 */
export function eventTaskToLegacy(eventTask: EventTask): LegacyTask {
  return {
    id: eventTask.id,
    title: eventTask.title,
    priority: mapPriorityToLegacy(eventTask.priority),
    dueDate: eventTask.deadline || 'No deadline',
    owner: eventTask.assigned_to || 'Unassigned',
    status: mapStatusToLegacy(eventTask.status),
    category: mapCategoryToLegacy(eventTask.workflow_category)
  };
}

/**
 * Convert LegacyTask to EventTask partial for API calls
 */
export function legacyToEventTask(
  legacy: LegacyTask,
  eventId: string
): Partial<EventTask> {
  return {
    event_id: eventId,
    title: legacy.title,
    priority: mapPriorityFromLegacy(legacy.priority),
    deadline: legacy.dueDate !== 'No deadline' ? legacy.dueDate : undefined,
    assigned_to: legacy.owner !== 'Unassigned' ? legacy.owner : undefined,
    status: mapStatusFromLegacy(legacy.status),
    workflow_category: mapCategoryFromLegacy(legacy.category),
    is_critical_path: legacy.priority === 'High',
    dependency_task_ids: []
  };
}

/**
 * Convert array of EventTasks to LegacyTasks
 */
export function eventTasksToLegacy(eventTasks: EventTask[]): LegacyTask[] {
  return eventTasks.map(eventTaskToLegacy);
}

/**
 * Map priority: EventTask → LegacyTask
 */
function mapPriorityToLegacy(
  priority: EventTask['priority']
): LegacyTask['priority'] {
  switch (priority) {
    case 'critical':
      return 'High';
    case 'high':
      return 'High';
    case 'medium':
      return 'Medium';
    case 'low':
      return 'Low';
    default:
      return 'Medium';
  }
}

/**
 * Map priority: LegacyTask → EventTask
 */
function mapPriorityFromLegacy(
  priority: LegacyTask['priority']
): EventTask['priority'] {
  switch (priority) {
    case 'High':
      return 'high';
    case 'Medium':
      return 'medium';
    case 'Low':
      return 'low';
    default:
      return 'medium';
  }
}

/**
 * Map status: EventTask → LegacyTask
 */
function mapStatusToLegacy(
  status: EventTask['status']
): LegacyTask['status'] {
  switch (status) {
    case 'to_do':
      return 'Backlog';
    case 'in_progress':
      return 'In Progress';
    case 'done':
      return 'Completed';
    case 'cancelled':
      return 'Backlog'; // No "Cancelled" in legacy, map to Backlog
    default:
      return 'Backlog';
  }
}

/**
 * Map status: LegacyTask → EventTask
 */
function mapStatusFromLegacy(
  status: LegacyTask['status']
): EventTask['status'] {
  switch (status) {
    case 'Backlog':
      return 'to_do';
    case 'In Progress':
      return 'in_progress';
    case 'Review':
      return 'in_progress'; // No "Review" in EventTask, map to in_progress
    case 'Completed':
      return 'done';
    default:
      return 'to_do';
  }
}

/**
 * Map category: EventTask → LegacyTask (capitalize for display)
 */
function mapCategoryToLegacy(
  category: EventTask['workflow_category']
): string {
  switch (category) {
    case 'event_planning':
      return 'Event Planning';
    case 'sponsorship':
      return 'Sponsorship';
    case 'marketing':
      return 'Marketing';
    case 'operations':
      return 'Operations';
    case 'media':
      return 'Media';
    default:
      return 'General';
  }
}

/**
 * Map category: LegacyTask → EventTask
 */
function mapCategoryFromLegacy(
  category: string
): EventTask['workflow_category'] {
  const normalized = category.toLowerCase().replace(/\s+/g, '_');
  
  if (normalized.includes('event') || normalized.includes('planning')) {
    return 'event_planning';
  } else if (normalized.includes('sponsor')) {
    return 'sponsorship';
  } else if (normalized.includes('marketing')) {
    return 'marketing';
  } else if (normalized.includes('operation') || normalized.includes('logistics')) {
    return 'operations';
  } else if (normalized.includes('media') || normalized.includes('content')) {
    return 'media';
  } else {
    return 'event_planning'; // Default
  }
}

/**
 * Helper: Check if task is overdue
 */
export function isTaskOverdue(task: EventTask): boolean {
  if (!task.deadline || task.status === 'done') return false;
  return new Date(task.deadline) < new Date();
}

/**
 * Helper: Get task status color
 */
export function getTaskStatusColor(status: EventTask['status']): string {
  switch (status) {
    case 'to_do':
      return 'bg-gray-100 text-gray-700';
    case 'in_progress':
      return 'bg-blue-100 text-blue-700';
    case 'done':
      return 'bg-green-100 text-green-700';
    case 'cancelled':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

/**
 * Helper: Get priority color
 */
export function getTaskPriorityColor(priority: EventTask['priority']): string {
  switch (priority) {
    case 'critical':
      return 'bg-red-500 text-white';
    case 'high':
      return 'bg-orange-500 text-white';
    case 'medium':
      return 'bg-yellow-500 text-white';
    case 'low':
      return 'bg-green-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
}
